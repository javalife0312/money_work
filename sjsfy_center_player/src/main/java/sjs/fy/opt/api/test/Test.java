package sjs.fy.opt.api.test;

import uk.co.caprica.vlcj.discovery.NativeDiscovery;
import uk.co.caprica.vlcj.player.MediaPlayerFactory;
import uk.co.caprica.vlcj.player.headless.HeadlessMediaPlayer;
import uk.co.caprica.vlcj.runtime.RuntimeUtil;

/**
 * Created by Administrator on 2017/3/4.
 */
public class Test {
    public static void main(String[] args) {
        //自动登录
        if(RuntimeUtil.isMac()){
        }else if(RuntimeUtil.isNix()){
        }else if(RuntimeUtil.isWindows()){
            new NativeDiscovery().discover();

//            MediaPlayerFactory mediaPlayerFactory = new MediaPlayerFactory();
//            HeadlessMediaPlayer headlessMediaPlayer =  mediaPlayerFactory.newHeadlessMediaPlayer();
//
//            String savefile = "D:\\work\\git\\vlcj_player\\src\\main\\java\\com\\sjs\\fy\\api\\test\\Test.mp4";
//            String[] playOptions = {
//                    "--subsdec-encoding=GB18030",
//                    ":sout=#transcode{vcodec=mp4v,vb=4096,scale=1,acodec=mpga,ab=128,channels=2,samplerate=44100}:duplicate{dst=file{dst=" + savefile + "},dst=display}"
////                       ":sout=#duplicate{dst=file{dst=" + savefile + "},dst=display}"
////                    , ":input-slave=alsa://hw:0,0"
//            };
//            String murl = "rtsp://video.fjtu.com.cn/vs01/yhhy/yhhy_01.rm";
//            headlessMediaPlayer.playMedia(murl,playOptions);

        }
    }
}
