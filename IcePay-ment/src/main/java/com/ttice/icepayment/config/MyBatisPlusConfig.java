package com.ttice.icepayment.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@MapperScan("com.ttice.icepayment.mapper")
@EnableTransactionManagement //启用事务管理
public class MyBatisPlusConfig {


}
