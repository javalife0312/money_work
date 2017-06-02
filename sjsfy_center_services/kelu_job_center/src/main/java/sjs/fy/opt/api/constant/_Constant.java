package sjs.fy.opt.api.constant;

/**
 * Created by yangjianzhang on 16/7/20.
 */
public class _Constant {
    public static final int DELAY_TIME = 1000*3;
    public static final int PERIOD_TIME = 1000*60*1;

    public static final String HDSF_URL="hdfs://193.1.51.43:9000/sjsfy/";
    public static final String HDSF_MASTER="hdfs://193.1.51.43:9000";
    public static final String LOCAL_PATH="sjsfy_kelu";
    public static final String LOCAL_PATH_KELU="D:\\sjsfy_kelu_jobs";
    public static final String LOCAL_PATH_KELU_LABEL="D:\\sjsfy_kelu_labels";


    public static final int KELU_INFO_STATUS_START_LUZHI=2;     //播放器点击开始录制
    public static final int KELU_INFO_STATUS_ZHANTING_LUZHI=3;  //播放器点击暂停录制
    public static final int KELU_INFO_STATUS_WANCHENG_LUZHI=4;  //播放器点击完成录制
    public static final int KELU_INFO_STATUS_SHANGCHUAN_LUZHI=5;//完成上传

    public static final int KELU_INFO_STATUS_XIAZAI_LUZHI=6;    //完成下载


    public static final int KELU_INFO_STATUS_START_KELU=6;      //上传文件成功之后开始刻录
    public static final int KELU_INFO_STATUS_DONE=1;            //刻录完成之后，任务完成
}
