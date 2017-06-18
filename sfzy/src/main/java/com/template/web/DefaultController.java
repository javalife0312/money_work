package com.template.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

/**
 * Created by jinguowei on 16/1/13.
 */

@Controller
public class DefaultController {

    @Value("${application.hello:Hello}")
    private String hello;

    @RequestMapping("/")
    public String helloJsp(Map<String, Object> map) {
        System.out.println("System Started !! Welcome to SFZY");
        map.put("hello", hello);
        return "login/login";
    }

}
