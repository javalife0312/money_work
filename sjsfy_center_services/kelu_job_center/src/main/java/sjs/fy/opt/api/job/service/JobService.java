package sjs.fy.opt.api.job.service;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.*;
import org.apache.hadoop.io.IOUtils;
import org.ini4j.Ini;
import org.ini4j.Wini;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import sjs.fy.opt.api.common.DBService;
import sjs.fy.opt.api.service.ExcelService;
import sjs.fy.opt.api.service.IniService;
import sjs.fy.opt.api.constant._Constant;

import java.io.*;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by Administrator on 2017/2/27.
 */
@Component
public class JobService {
    private String PTBurnJobServicesDir = "C:\\PTBurnJobs\\";
    private volatile Map<Integer,Map<String,Object>> QUANJU_JOBS = new ConcurrentHashMap<>();
    private volatile Map<Integer,Map<String,Object>> QUANJU_JOBING = new ConcurrentHashMap<>();
    private int JOB_QUENE_SIZE = 10;
    private String DOWNLOAD_DIR = "C:\\PTBurnJobs\\download\\";

    @Autowired
    DBService dbService;
    @Autowired
    IniService iniService;
    @Autowired
    ExcelService excelService;


    /**
     * 整个刻录服务的入口程序
     * 1、读取需要刻录的任务信息
     * 2、将刻录任务放入download队列进行下载
     * 3、生成job文件
     * 4、将job文件同步到刻录机器进行刻录
     */
    public void startJobs(){
        //系统&设备状态检测
        Runnable systemCheck = new Runnable() {
            @Override
            public void run() {
                Timer timer = new Timer();
                timer.schedule(new TimerTask() {
                    public void run() {
                        try {
                            SystemStatus systemStatus = systemServiceCheck();
                            if(systemStatus==null || !systemStatus.getSysErrorNumber().equals("0")){
                                System.out.println("刻录系统，目前处于故障状态，请管理员处理");
                            }else{
                                DeviceStatus deviceStatus = deviceServiceCheck(systemStatus.getStatusFile());
                                if(deviceStatus==null && !"0".equals(deviceStatus.getSysErrorNumber())){
                                    System.out.println("刻录设备，目前处于故障状态，请管理员处理");
                                }
                            }
                        } catch (Exception e) {
                            System.out.println("刻录系统，目前处于故障状态，请管理员处理");
                            e.printStackTrace();
                        }
                    }
                }, _Constant.DELAY_TIME ,  _Constant.PERIOD_TIME);
            }
        };

        Runnable preJobs = new Runnable() {
            @Override
            public void run() {
                Timer timer = new Timer();
                timer.schedule(new TimerTask() {
                    public void run() {
                        try {
                            preJob();
                            for(Integer id : QUANJU_JOBS.keySet()){
                                download2(id);
                                createJob(QUANJU_JOBS.get(id));
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }, _Constant.DELAY_TIME ,  _Constant.PERIOD_TIME);
            }
        };

//        new Thread(systemCheck).start();
        new Thread(preJobs).start();

    }

    private void listWaitingJobs(){
        
    }

    /**
     * 检测系统设备状态当前如何
     * @return
     * @throws Exception
     */
    public SystemStatus systemServiceCheck() throws Exception {

        String filepath = PTBurnJobServicesDir + "Status\\SystemStatus.txt";
        Wini wini = iniService.getWini(filepath);

        String sysErrorString = wini.get("System","SysErrorString");
        String sysErrorNumber = wini.get("System","SysErrorNumber");
        String statusFile = wini.get("System","StatusFile");

        return new SystemStatus(sysErrorString,sysErrorNumber,statusFile);
    }

    /**
     * 实时监控 读取系统状态和设备硬件信息
     * @param keluStatusFile
     * @return
     * @throws Exception
     */
    public DeviceStatus deviceServiceCheck(String keluStatusFile) throws Exception{
        String filepath = PTBurnJobServicesDir + "Status\\" + keluStatusFile;
        Wini wini = iniService.getWini(filepath);

        String sysErrorString = wini.get("System","SysErrorString");
        String sysErrorNumber = wini.get("System","SysErrorNumber");
        String systemStatus = wini.get("System","SystemStatus");

        return new DeviceStatus(sysErrorString,sysErrorNumber,systemStatus);
    }

    /**
     * 从刻录信息表中提取需要刻录的信息
     * 如果任务列表大于 JOB_QUENE_SIZE 则等待下一轮的排队
     */
    private void preJob(){
        String sql = "select id,device_host,anjianbianhao,anyou,kaitingshijian,faguan,`status` from sjsfy_opt_shipin.sjsfy_kelu_keluinfo where `status`="+_Constant.KELU_INFO_STATUS_SHANGCHUAN_LUZHI+" order by id";
        List<Map<String,Object>> jobs = dbService.listInfos(sql);
        for(Map<String,Object> job : jobs){
            if(QUANJU_JOBS.size()<JOB_QUENE_SIZE){
                if(!QUANJU_JOBS.containsKey(Integer.valueOf(job.get("id").toString())) && !QUANJU_JOBING.containsKey(Integer.valueOf(job.get("id").toString()))){
                    QUANJU_JOBS.put(Integer.valueOf(job.get("id").toString()),job);
                }
            }
        }
    }

//    /**
//     * 从队列中获取需要下载的文件
//     */
//    private void download(Integer id) throws Exception{
//        Map<String,Object> job = QUANJU_JOBS.get(id);
//        if(job.get("status").toString().equals(_Constant.KELU_INFO_STATUS_SHANGCHUAN_LUZHI+"")){
//            String download_hdfs_path = _Constant.HDSF_MASTER + "/" + job.get("device_host") + "/" + job.get("id")+"_"+job.get("anjianbianhao");
//            String dowload_local_path = _Constant.LOCAL_PATH_KELU + "/" + job.get("id")+"_"+job.get("anjianbianhao");
//
//            Configuration configuration = new Configuration();
//            configuration.set("fs.defaultFS", _Constant.HDSF_MASTER);
//            FileSystem fileSystem = FileSystem.get(configuration);
//
//            File file = new File(dowload_local_path);
//            if(file.exists()){
//                File[] list = file.listFiles();
//                for(File del : list){
//                    del.delete();
//                }
//                file.delete();
//            }
//            if(fileSystem.exists(new Path(download_hdfs_path))){
////                fileSystem.copyToLocalFile(new Path(download_hdfs_path),new Path(_Constant.LOCAL_PATH_KELU));
//                job.put("status",_Constant.KELU_INFO_STATUS_XIAZAI_LUZHI);
//                QUANJU_JOBS.put(id,job);
//                dbService.executeSql("update sjsfy_opt_shipin.sjsfy_kelu_keluinfo set status="+_Constant.KELU_INFO_STATUS_XIAZAI_LUZHI + " where id=" + id);
//            }
//        }
//    }

    /**
     * 从队列中获取需要下载的文件
     */
    private boolean download2(Integer id) throws IOException {

        Map<String,Object> job = QUANJU_JOBS.get(id);
        if(job.get("status").toString().equals(_Constant.KELU_INFO_STATUS_SHANGCHUAN_LUZHI+"")){
            String download_hdfs_path = _Constant.HDSF_MASTER + "/sjsfy/" + job.get("device_host") + "/" + job.get("id")+"_"+job.get("anjianbianhao");
            String dowload_local_path = _Constant.LOCAL_PATH_KELU + "/" + job.get("id")+"_"+job.get("anjianbianhao") + "/";

            Configuration configuration = new Configuration();
            configuration.set("fs.defaultFS", _Constant.HDSF_MASTER);
            FileSystem fileSystem = FileSystem.get(configuration);

            InputStream in = null;
            OutputStream outputStream = null;

            FileStatus[] fileStatuses = fileSystem.listStatus(new Path(download_hdfs_path));
            for(FileStatus fileStatus : fileStatuses){
                try{
                    in = fileSystem.open(fileStatus.getPath());
                    File outdir = new File(dowload_local_path);
                    if(!outdir.exists()){
                        outdir.mkdir();
                    }
                    outputStream = new FileOutputStream(dowload_local_path + fileStatus.getPath().getName());
                    IOUtils.copyBytes(in,outputStream,4096,false);
                }catch (Exception e){
                    e.printStackTrace();
                    return false;
                }finally {
                    IOUtils.closeStream(in);
                    IOUtils.closeStream(outputStream);
                }

            }
        }
        return true;
    }

    /**
     * 生成刻录的Job文件
     * @param job
     * @throws Exception
     */
    private void createJob(Map<String,Object> job){
        File job_file = new File(PTBurnJobServicesDir + job.get("id") + ".JRQ");
        BufferedWriter bufferedWriter = null;
        try{
            String[] header = {"anhao","anyou","kaitingshijian","jingbanren"};
            String[] data = {job.get("anjianbianhao").toString(),job.get("anyou").toString(),job.get("kaitingshijian").toString(),job.get("faguan").toString()};
            excelService.createJobExcel(job.get("id").toString(),header,data);
            excelService.createJobLabel(job.get("id").toString());

            if(job_file.exists()){
                job_file.delete();
            }
            if (!job_file.exists()){
                job_file = new File(PTBurnJobServicesDir + job.get("id") + ".JRQ");
                job_file.createNewFile();

                bufferedWriter = new BufferedWriter(new FileWriter(job_file));
                bufferedWriter.write("JobID="+job.get("id")+"\n");

                String dowload_local_path = _Constant.LOCAL_PATH_KELU + "/" + job.get("id")+"_"+job.get("anjianbianhao");
                bufferedWriter.write("Data="+dowload_local_path+"\n");
                bufferedWriter.write("PrintLabel="+_Constant.LOCAL_PATH_KELU_LABEL+"\\"+job.get("id")+".std\n");
                bufferedWriter.write("VolumeName="+job.get("id")+"\n");
                bufferedWriter.write("BurnSpeed="+8+"\n");
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        finally{
            if(bufferedWriter!=null){
                try{
                    bufferedWriter.flush();
                    bufferedWriter.close();
                }catch (Exception e){
                    e.printStackTrace();
                }

            }
        }
        QUANJU_JOBING.put(Integer.valueOf(job.get("id").toString()),job);
        QUANJU_JOBS.remove(Integer.valueOf(job.get("id").toString()));
        dbService.executeSql("update sjsfy_opt_shipin.sjsfy_kelu_keluinfo set status="+_Constant.KELU_INFO_STATUS_XIAZAI_LUZHI + " where id=" + job.get("id"));
    }

    public static void main(String[] args) throws Exception{
        Configuration configuration = new Configuration();
        configuration.set("fs.defaultFS", "hdfs://193.1.51.43:9000");
        FileSystem fileSystem = FileSystem.get(configuration);

        Path hdfs = new Path("/template");

        FileStatus[] fileStatuses = fileSystem.listStatus(hdfs);
        for(FileStatus fileStatus : fileStatuses){
            try{
                InputStream in = fileSystem.open(fileStatus.getPath());
                OutputStream outputStream = new FileOutputStream("D:\\test\\" + fileStatus.getPath().getName());
                IOUtils.copyBytes(in,outputStream,4096,false);
            }catch (Exception e){
                e.printStackTrace();
            }

        }
    }
}

/**
 * PTBurnJobs - SystemStatus服务
 */
class SystemStatus implements Serializable{
    private String sysErrorString;
    private String sysErrorNumber;
    private String statusFile;

    public SystemStatus(String sysErrorString, String sysErrorNumber,String statusFile) {
        this.sysErrorString = sysErrorString;
        this.sysErrorNumber = sysErrorNumber;
        this.statusFile = statusFile;
    }

    public String getSysErrorString() {
        return sysErrorString;
    }

    public String getSysErrorNumber() {
        return sysErrorNumber;
    }

    public String getStatusFile() {
        return statusFile;
    }
}

/**
 * PTBurnJobs - DeviceStatus 服务
 */
class DeviceStatus implements Serializable{
    private String sysErrorString;
    private String sysErrorNumber;
    private String systemStatus;

    public DeviceStatus(String sysErrorString, String sysErrorNumber,String systemStatus) {
        this.sysErrorString = sysErrorString;
        this.sysErrorNumber = sysErrorNumber;
        this.systemStatus = systemStatus;
    }

    public String getSysErrorString() {
        return sysErrorString;
    }

    public String getSysErrorNumber() {
        return sysErrorNumber;
    }

    public String getSystemStatus() {
        return systemStatus;
    }
}

///**
// * PTBurnJobs - 刻录任务的实体
// */
//class KeluJob implements Serializable{
//    private int id;
//    private String device_host;
//    private String luxiangqujian;
//    private String anjianbianhao;
//    private String anyou;
//    private String fileName;
//    private String downloadStatus;
//
//    public KeluJob(int id, String device_host, String luxiangqujian, String anjianbianhao, String anyou, String fileName, String downloadStatus) {
//        this.id = id;
//        this.device_host = device_host;
//        this.luxiangqujian = luxiangqujian;
//        this.anjianbianhao = anjianbianhao;
//        this.anyou = anyou;
//        this.fileName = fileName;
//        this.downloadStatus = downloadStatus;
//    }
//
//    public int getId() {
//        return id;
//    }
//
//    public void setId(int id) {
//        this.id = id;
//    }
//
//    public String getDevice_host() {
//        return device_host;
//    }
//
//    public void setDevice_host(String device_host) {
//        this.device_host = device_host;
//    }
//
//    public String getLuxiangqujian() {
//        return luxiangqujian;
//    }
//
//    public void setLuxiangqujian(String luxiangqujian) {
//        this.luxiangqujian = luxiangqujian;
//    }
//
//    public String getAnjianbianhao() {
//        return anjianbianhao;
//    }
//
//    public void setAnjianbianhao(String anjianbianhao) {
//        this.anjianbianhao = anjianbianhao;
//    }
//
//    public String getAnyou() {
//        return anyou;
//    }
//
//    public void setAnyou(String anyou) {
//        this.anyou = anyou;
//    }
//
//    public String getFileName() {
//        return fileName;
//    }
//
//    public void setFileName(String fileName) {
//        this.fileName = fileName;
//    }
//
//    public String getDownloadStatus() {
//        return downloadStatus;
//    }
//
//    public void setDownloadStatus(String downloadStatus) {
//        this.downloadStatus = downloadStatus;
//    }
//}
