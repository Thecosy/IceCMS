package com.ttice.icewkment.configuration;

import com.github.xiaoymin.knife4j.spring.annotations.EnableKnife4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Knife4jSwagger2Config
 *
 * @author admin
 * @since 2022-02-19
 */
@EnableSwagger2
@EnableKnife4j
@Configuration
public class Knife4jOrSwagger2Config {

  @Bean(value = "frontendApi")
  public Docket frontendApi() {
    return new Docket(DocumentationType.SWAGGER_2)
            .apiInfo(apiInfo())
            .groupName("前端分组")
            .select()
            // 前端控制器的包路径
            .apis(RequestHandlerSelectors.basePackage("com.ttice.icewkment.controller.frontend"))
            .paths(PathSelectors.any())
            .build();
  }

  @Bean(value = "backendApi")
  public Docket backendApi() {
    return new Docket(DocumentationType.SWAGGER_2)
            .apiInfo(apiInfo())
            .groupName("后台分组")
            .select()
            // 后台控制器的包路径
            .apis(RequestHandlerSelectors.basePackage("com.ttice.icewkment.controller.backend"))
            .paths(PathSelectors.any())
            .build();
  }

  private ApiInfo apiInfo() {
    return new ApiInfoBuilder()
        .title("Spring Boot IceCMS API V3.4")
        .description("IceCMS RESTful APIs")
        .version("3.4")
        .build();
  }
}
