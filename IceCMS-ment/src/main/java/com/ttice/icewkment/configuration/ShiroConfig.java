package com.ttice.icewkment.configuration;

import com.ttice.icewkment.shiro.AccountRealm;
import com.ttice.icewkment.shiro.JwtFilter;
import org.apache.shiro.mgt.DefaultSessionStorageEvaluator;
import org.apache.shiro.mgt.DefaultSubjectDAO;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.session.mgt.SessionManager;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.spring.web.config.DefaultShiroFilterChainDefinition;
import org.apache.shiro.spring.web.config.ShiroFilterChainDefinition;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.crazycake.shiro.RedisCacheManager;
import org.crazycake.shiro.RedisSessionDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import javax.servlet.Filter;

/** shiro启用注解拦截控制器 */
@Configuration
public class ShiroConfig {

  @Autowired private JwtFilter jwtFilter;

  @Bean
  public SessionManager sessionManager(RedisSessionDAO redisSessionDAO) {
    DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
    sessionManager.setSessionDAO(redisSessionDAO);
    return sessionManager;
  }

  @Bean
  public DefaultWebSecurityManager securityManager(
      AccountRealm accountRealm,
      SessionManager sessionManager,
      RedisCacheManager redisCacheManager) {
    DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager(accountRealm);
    securityManager.setSessionManager(sessionManager);
    // 配置缓存管理类，先注释掉
    //        securityManager.setCacheManager(redisCacheManager);
    /*
     * 关闭shiro自带的session，详情见文档
     */
    DefaultSubjectDAO subjectDAO = new DefaultSubjectDAO();
    DefaultSessionStorageEvaluator defaultSessionStorageEvaluator =
        new DefaultSessionStorageEvaluator();
    defaultSessionStorageEvaluator.setSessionStorageEnabled(false);
    subjectDAO.setSessionStorageEvaluator(defaultSessionStorageEvaluator);
    securityManager.setSubjectDAO(subjectDAO);
    return securityManager;
  }

  @Bean
  public ShiroFilterChainDefinition shiroFilterChainDefinition() {
    DefaultShiroFilterChainDefinition chainDefinition = new DefaultShiroFilterChainDefinition();
    Map<String, String> filterMap = new LinkedHashMap<>();
    // 需要进行角色验证的页面，这个要放在前面  已解决，先执行拦截再授权，就会执行doGetAuthorizationInfo方法
    // test 所以可以这样写？
    // filterMap.put("/WebArticle/**","jwt");
    // filterMap.put("/WebArticle/**","perms[admin:all]");
    // 需要身份检验的页面
    filterMap.put("/article/**", "jwt");
    filterMap.put("/articleClass/**", "jwt");
    filterMap.put("/ArticleComment/**", "jwt");
    filterMap.put("/resource/**", "jwt");
    filterMap.put("/ResourceClass/**", "jwt");
    filterMap.put("/ResourceComment/**", "jwt");
    filterMap.put("/Sitting/**", "jwt");
    filterMap.put("/Tag/**", "jwt");
    filterMap.put("/squareClass/**", "jwt");
    filterMap.put("/square/**", "jwt");

    // user主要需要未登录登录认证所以放开
    // filterMap.put("/User/**", "jwt");
    // 主要通过注解方式校验权限
    chainDefinition.addPathDefinitions(filterMap);
    return chainDefinition;
  }

  // shiro拦截器
  @Bean("shiroFilterFactoryBean")
  public ShiroFilterFactoryBean shiroFilterFactoryBean(
      SecurityManager securityManager, ShiroFilterChainDefinition shiroFilterChainDefinition) {
    ShiroFilterFactoryBean shiroFilter = new ShiroFilterFactoryBean();
    shiroFilter.setSecurityManager(securityManager);
    // 拦截
    Map<String, Filter> filters = new HashMap<>();
    filters.put("jwt", jwtFilter);
    shiroFilter.setFilters(filters);
    Map<String, String> filterMap = shiroFilterChainDefinition.getFilterChainMap();
    shiroFilter.setFilterChainDefinitionMap(filterMap);
    return shiroFilter;
  }

  @Bean
  public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(
      @Qualifier("securityManager") SecurityManager securityManager) {
    AuthorizationAttributeSourceAdvisor advisor = new AuthorizationAttributeSourceAdvisor();
    advisor.setSecurityManager(securityManager);
    return advisor;
  }
}
