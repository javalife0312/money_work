package sjs.fy.opt.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import sjs.fy.opt.api.constant._Constants;
import uk.co.caprica.vlcj.component.EmbeddedMediaPlayerComponent;
import uk.co.caprica.vlcj.discovery.NativeDiscovery;

import java.io.File;
import java.util.Map;


/**
 * Created by Administrator on 2016/11/20.
 */
@Component
public class CameraOptService {
    static {
        new NativeDiscovery().discover();
    }

    EmbeddedMediaPlayerComponent playerComponent = new EmbeddedMediaPlayerComponent();

    @Autowired
    PropertyService propertyService;
    @Autowired
    DBService dbService;

    /**
     * 获取播放的摄像机URL
     * @param configs
     * @return
     */
    private String getMurl(Map<String,Object> configs){
        String murl = "rtsp://" + configs.get("shexiangji_username") + ":" + configs.get("shexiangji_password") + "@" + configs.get("shexiangji_ip");
        return murl;

    }

    /**
     * 播放
     * @param configs
     * @return
     * 将文件保存到：配置的跟目录的 sjsfy_kelu/案号/文件
     */
    public boolean play(Map<String,Object> configs){
        String panfu = configs.get("diannaozhuji_panfu").toString();
        String root_dir = _Constants.LOCAL_PATH;
        String filepath = panfu + File.separator + root_dir;
        File file = new File(filepath);
        if(!file.exists()){
            file.mkdirs();
        }
        filepath = filepath + File.separator + configs.get("sys_luzhi_pk_id")+"_"+configs.get("anhao") + File.separator;
        file = new File(filepath);
        if(!file.exists()){
            file.mkdirs();
        }
        String filename = System.currentTimeMillis() + ".mp4";
        String savefile = filepath + filename;
        System.out.println(savefile);

        String[] playOptions = {
                "--subsdec-encoding=GB18030",
                ":sout=#transcode{vcodec=mp4v,vb=4096,scale=1,acodec=mpga,ab=128,channels=2,samplerate=44100}:duplicate{dst=file{dst=" + savefile + "},dst=display}",
                ":input-slave=alsa://hw:0,0"};
//        String[] playOptions = {
//                "--subsdec-encoding=GB18030",
//                ":sout=#transcode{vcodec=mp4v,vb=4096,scale=1,acodec=mpga,ab=128,channels=2,samplerate=44100}:duplicate{dst=file{dst=" + savefile + "},dst=display}"
//        };

//        String[] playOptions = {};
        String murl = getMurl(configs);
        getPlayerComponent().getMediaPlayer().playMedia(murl,playOptions);
        String sql = "insert into sjsfy_opt_shipin.sjsfy_kelu_kelufile(filename,filepart) values('"+propertyService.getConfig(configs,"filepath")+"','"+filename+"')";
        dbService.executeSql(sql);
        return true;
    }

    /**
     * 停止
     * @return
     */
    public boolean stop(){
        getPlayerComponent().getMediaPlayer().stop();
        return true;
    }

    /**
     * 获取播放器组件
     * @return
     */
    public EmbeddedMediaPlayerComponent getPlayerComponent(){
        return playerComponent;
    }


    public static void main(String[] args) {
        System.out.println("File.separator = "+File.separator);
        System.out.println("File.separatorChar = "+File.separatorChar);
        System.out.println("File.pathSeparator = "+File.pathSeparator);
        System.out.println("File.pathSeparatorChar = "+File.pathSeparatorChar);
    }

}
