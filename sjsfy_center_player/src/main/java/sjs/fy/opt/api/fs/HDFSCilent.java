//package sjs.fy.opt.api.fs;
//
//import org.apache.hadoop.conf.Configuration;
//import org.apache.hadoop.fs.FileSystem;
//import org.apache.hadoop.fs.Path;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import sjs.fy.opt.api.constant._Constants;
//import sjs.fy.opt.api.service.DBService;
//
//import javax.annotation.PostConstruct;
//import java.io.*;
//import java.util.List;
//import java.util.Map;
//import java.util.Timer;
//import java.util.TimerTask;
//import java.util.concurrent.ConcurrentHashMap;
//
//
//@Component
//public class HDFSCilent {
//	private Map<String,Map<String,Object>> cache = new ConcurrentHashMap<>();
//
//	@Autowired
//	DBService dbService;
//
//	@PostConstruct
//	public void  init(){
//		//hdfs
//		Runnable hdfs = new Runnable() {
//			@Override
//			public void run() {
//				Timer timer = new Timer();
//				timer.schedule(new TimerTask() {
//					public void run() {
//						try {
//							String sql = "select id,device_host,kelu_dir,`status` from sjsfy_opt_shipin.sjsfy_kelu_keluinfo where `status`=" + _Constants.KELU_INFO_STATUS_WANCHENG_LUZHI;
//							List<Map<String,Object>> infos =  dbService.listInfos(sql);
//							for(Map<String,Object> info : infos){
//								cache.put(info.get("id").toString(),info);
//							}
//							for(String id : cache.keySet()){
//								boolean success = copyFiles(cache.get(id).get("kelu_dir").toString(),cache.get("device_host").toString());
//								if(success){
//									if(success){
//										success = updateStatus(id);
//										if(success){
//											cache.remove(id);
//										}
//									}
//								}
//							}
//						} catch (Exception e) {
//							System.out.println("文件上传系统故障，目前处于故障状态，请管理员处理");
//							e.printStackTrace();
//						}
//					}
//				}, 1000*30 , 1000*60*5);
//			}
//		};
//		new Thread(hdfs).start();
//	}
//
//	/**
//	 * @param args
//	 */
//	public static void main(String[] args) throws Exception{
//
//		HDFSCilent hdfsCilent = new HDFSCilent();
//		String dir = "D:\\soft-work\\work\\git\\sjsfy_center_player\\icon";
//		try{
//			boolean success = hdfsCilent.copyFiles(dir,_Constants.HDSF_URL);
//		}catch (Exception e){
//			e.printStackTrace();
//		}
//
////		Configuration configuration = new Configuration();
////		configuration.set("fs.defaultFS", "hdfs://192.168.1.53:9000");
////		FileSystem fileSystem = FileSystem.get(configuration);
//////		fileSystem.copyFromLocalFile(new Path("D:\\soft-work\\work\\git\\sjsfy_center_player\\src\\main\\java\\sjs\\fy\\opt\\api\\exception\\TerminalPlayerException.java"),new Path("/jgw/test/"));
////		boolean flag = fileSystem.exists(new Path("hdfs://192.168.1.53:9000/jgw/test"));
////		System.out.println(flag);
//
//	}
//
//
//	/**
//	 * 将本地目录下的文件上传到Hdfs路径
//	 * @param dir
//	 * @return
//	 */
//	public boolean copyFiles(String dir,String ip) throws Exception{
//		Configuration configuration = new Configuration();
//		configuration.set("fs.defaultFS", _Constants.HDSF_MASTER);
//		File fileDir = new File(dir);
//		//约定目录仅有一层
//		if(fileDir.isDirectory()){
//			File[] localFiles = fileDir.listFiles();
//			for(File localFile : localFiles){
//				FileSystem fileSystem = FileSystem.get(configuration);
//				if(!fileSystem.exists(new Path(local2hdfs_dir(ip,fileDir.getName()).toString()))){
//					fileSystem.mkdirs(new Path(local2hdfs_dir(ip,fileDir.getName())));
//				}
//				System.out.println(localFile.getAbsoluteFile());
//				fileSystem.copyFromLocalFile(false,new Path(localFile.getAbsolutePath()),new Path(local2hdfs_dir(ip,fileDir.getName())));
//			}
//		}
//		return true;
//	}
//
////	/**
////	 * 将文件上传到HDFS之后删除本地文件
////	 * @param dir
////	 * @return
////	 */
////	private boolean deleteDir(String dir) throws Exception{
////		File fileDir = new File(dir);
////		//约定目录仅有一层
////		if(fileDir.isDirectory()){
////			File[] localFiles = fileDir.listFiles();
////			for(File localFile : localFiles){
////				localFile.deleteOnExit();
////			}
////			fileDir.deleteOnExit();
////		}
////		return true;
////	}
//
//
//	/**
//	 * 上传完成之后更新状态
//	 * @param id
//	 * @return
//	 */
//	private boolean updateStatus(String id) throws Exception{
//		String sql = "update sjsfy_opt_shipin.sjsfy_kelu_keluinfo set `status`="+ _Constants.KELU_INFO_STATUS_SHANGCHUAN_LUZHI +" where id="+id;
//		dbService.executeSql(sql);
//		return true;
//	}
//
//
////	/**
////	 * 将本地文件转换成hdfs文件
////	 * @param fileName
////	 * @param ip
////	 * @param dir
////	 * @return
////	 */
////	private String local2hdfs(String fileName,String ip,String dir){
////		StringBuffer result = new StringBuffer(_Constants.HDSF_MASTER).append("/");
////		result.append(ip).append("/");
////		result.append(dir).append("/");
////		result.append(fileName);
////		return result.toString();
////	}
//
//	/**
//	 * 将本地文件转换成hdfs文件
//	 * @param ip
//	 * @param dir
//	 * @return
//	 */
//	private String local2hdfs_dir(String ip,String dir){
//		StringBuffer result = new StringBuffer(ip);
//		result.append(dir);
//		return result.toString();
//	}
//}
