package com.ttice.icewkment.configuration;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * <p>
 *  本地文件映射为网络文件配置类
 *  由于使用了cos对象云存储所以暂时不需要（暂时不需要）
 *  要做本地功能的根据FileUtils的class调用配置
 * </p>
 *
 * @author admin
 * @since 2022-02-19
 */
@Configuration
public class ApplicationConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        /*
         * 说明：增加虚拟路径(经过本人测试：在此处配置的虚拟路径，用springboot内置的tomcat时有效，
         * 用外部的tomcat也有效;所以用到外部的tomcat时不需在tomcat/config下的相应文件配置虚拟路径了,阿里云linux也没问题)
         */
        //Windows下
        //registry.addResourceHandler("/uploads2/**").addResourceLocations("file:D:/uploads2/");
        //Mac或Linux下(没有CDEF盘符)
        registry.addResourceHandler("/uploads/**").addResourceLocations("file:/users/macbook/");
        WebMvcConfigurer.super.addResourceHandlers(registry);
    }
}
