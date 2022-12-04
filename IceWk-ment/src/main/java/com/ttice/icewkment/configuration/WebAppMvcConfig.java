package com.ttice.icewkment.configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

/**
 * <p>
 *  Knife4jWebMvcConfig and upimg
 * </p>
 *
 * @author admin
 * @since 2022-02-19
 */

@Configuration
public class WebAppMvcConfig implements WebMvcConfigurer {

    @Autowired
    private ApplicationConfig applicationConfig;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

//        /**
//         * 注册自定义的显示 ResponseResult 注解的拦截器
//         */
//        registry.addInterceptor(new ResponseResultInterceptor())
//                // 拦截配置
//                .addPathPatterns("/**")
//                // 排除配置
//                .excludePathPatterns("/error", "/login**");
//
        registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");

        /** 配置knife4j 显示文档 */
        registry.addResourceHandler("doc.html")
                .addResourceLocations("classpath:/META-INF/resources/");

        /**
         * 配置swagger-ui显示文档
         */
        registry.addResourceHandler("swagger-ui.html")
                .addResourceLocations("classpath:/META-INF/resources/");
        /** 公共部分内容 */
        registry.addResourceHandler("/webjars/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/");

        //appConfig.getResPhysicalPath() 这表示项目所在的文件夹，下面会有介绍
        String webPath = applicationConfig.getResPhysicalPath();

        File file = new File(webPath + "/logistics/");
        if (!file.exists()) {
            file.mkdirs();
        }
        System.out.println("静态资源处理：" + webPath + "/logistics/");

        registry.addResourceHandler("/logistics/**").addResourceLocations("file:" + webPath + "/logistics/");
        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
    }
}


