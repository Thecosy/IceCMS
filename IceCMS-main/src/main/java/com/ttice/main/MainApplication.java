package com.ttice.main;


import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@ComponentScan(basePackages = "com.ttice")
@SpringBootApplication
@EnableConfigurationProperties
// 指定要扫描的Mapper类的包的路径
@MapperScan("com.ttice.**.mapper")
//引入Spring Task
@EnableScheduling
public class MainApplication {

    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class, args);
        System.out.println("(♥◠‿◠)ﾉﾞ ICE启动成功   ლ(´ڡ`ლ)ﾞ  \n" +
                "  ___ ___ ___ ___ __  __ ___  \n" +
                "  |_ _/ __| __/ __|  \\/  / __| \n" +
                "  | | (__| _| (__| |\\/| \\__ \\ \n" +
                "  |___\\___|___\\___|_|  |_|___/ \n" +
                "  ''-'   `'-'    `-..-'            ");
    }

}
