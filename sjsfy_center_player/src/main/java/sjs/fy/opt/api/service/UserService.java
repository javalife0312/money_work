//package sjs.fy.opt.api.service;
//
//import sjs.fy.opt.api.constant._Constants;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
//import java.io.File;
//import java.nio.file.Paths;
//import java.util.List;
//import java.util.Map;
//
///**
// * Created by Administrator on 2016/12/7.
// */
//@Component
//public class UserService {
//    @Autowired
//    private DBService dbService;
//    @Autowired
//    private PropertyService propertyService;
//
//    private String data_base = "sjsfy_opt_shipin";
//
//    /**
//     * 判定用户是否存在
//     * @param username
//     * @param password
//     * @return
//     */
//    public boolean exists(String username,String password){
//        String sql = "select * from " + data_base + ".sjsfy_kelu_userinfo where `username`='"+username+"' and `password`='"+password+"'";
//        List<Map<String,Object>> result = dbService.listInfos(sql);
//        if(result==null || result.isEmpty()){
//            return false;
//        }else {
//            return true;
//        }
//    }
//
//    /**
//     * 注册或者更新用户信息
//     * 1、如果用户名字存在直接更新
//     * 2、如果用户名不存在新增
//     * @param username
//     * @param password
//     * @return
//     */
//    public boolean save_or_update(String username,String password){
//        String sql = "select * from " + data_base + ".sjsfy_kelu_userinfo where `username`='"+username+"'";
//        List<Map<String,Object>> result = dbService.listInfos(sql);
//        if(result==null || result.isEmpty()){
//            //新增操作
//            sql = "insert into " + data_base + ".sjsfy_kelu_userinfo(username,password) values('"+username+"','"+password+"')";
//            System.out.println(sql);
//            dbService.executeSql(sql);
//        }else {
//            //更新操作
//            sql = "update " + data_base + ".sjsfy_kelu_userinfo set password='"+password+"' where username='"+username+"'";
//            System.out.println(sql);
//            dbService.executeSql(sql);
//        }
//        return true;
//    }
//
//    /**
//     * 获取用户信息
//     * @param username
//     * @return
//     */
//    public List<Map<String,Object>> getUserInfo(String username){
//        String sql = "select * from " + data_base + ".sjsfy_kelu_userinfo where `username`='"+username+"'";
//        List<Map<String,Object>> result = dbService.listInfos(sql);
//        return result;
//    }
//}
