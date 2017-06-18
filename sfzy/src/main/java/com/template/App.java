package com.template;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
/**
 * Hello world!
 *
 */

@Configuration
@EnableAutoConfiguration
@ComponentScan(basePackages="com.template")
public class App {

    public static void main(String[] args) {
        SpringApplication.run(App.class);
    }

//    /**
//     * 配置过滤器
//     * @return
//     */
//    @Bean
//    public FilterRegistrationBean someFilterRegistration() {
//        FilterRegistrationBean registration = new FilterRegistrationBean();
//        registration.setFilter(sessionFilter());
//        registration.addUrlPatterns("/*");
//        registration.addInitParameter("paramName", "paramValue");
//        registration.setName("sessionFilter");
//        return registration;
//    }
//
//    /**
//     * 创建一个bean
//     * @return
//     */
//    @Bean(name = "sessionFilter")
//    public Filter sessionFilter() {
//        return new SessionCheckFilter();
//    }

}
