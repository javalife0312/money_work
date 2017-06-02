package sjs.fy.opt.api.service;

import org.springframework.stereotype.Component;
import java.util.Map;

/**
 * Created by Administrator on 2016/11/12.
 */
@Component
public class PropertyService {
    /**
     * 从配置文件中读取信息，防止空指针异常
     * @param key
     * @return
     */
    public String getConfig(Map<String,Object> configs, String key){
        if(configs!=null && configs.containsKey(key)){
            return configs.get(key).toString();
        }else{
            return "";
        }
    }
}