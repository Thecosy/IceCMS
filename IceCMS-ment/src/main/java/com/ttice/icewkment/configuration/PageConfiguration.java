package com.ttice.icewkment.configuration;

import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 分页功能实现类
 *
 * @author admin
 * @since 2022-02-19
 */
@Configuration
public class PageConfiguration {
  @Bean
  public PaginationInterceptor paginationInterceptor() {
    return new PaginationInterceptor();
  }
}
