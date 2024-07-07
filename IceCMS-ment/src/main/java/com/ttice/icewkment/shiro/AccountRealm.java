package com.ttice.icewkment.shiro;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.Util.JwtUtil;
import com.ttice.icewkment.entity.Role;
import com.ttice.icewkment.entity.User;
import com.ttice.icewkment.entity.UserRole;
import com.ttice.icewkment.mapper.RoleMapper;
import com.ttice.icewkment.mapper.UserRoleMapper;
import com.ttice.icewkment.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AccountRealm extends AuthorizingRealm {

  @Autowired JwtUtil jwtUtil;

  @Autowired UserService userService;

  @Autowired UserRoleMapper userRoleMapper;

  @Autowired RoleMapper roleMapper;

  // 为了让realm支持jwt的凭证校验
  @Override
  public boolean supports(AuthenticationToken token) {
    return token instanceof JwtToken;
  }

  // 权限校验
  @Override
  protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
    System.out.println("此处先进行权限检验");

    // 拿到，当前用户登录的对象
    Subject subject = SecurityUtils.getSubject();
    Object currentUser = subject.getPrincipal(); // 拿到user对象
    User user = new User();
    BeanUtils.copyProperties(currentUser, user);
    // 获取username
    String username = user.getUsername();
    // 根据username查取userid
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.select().eq("USERNAME", username);
    User userids = userService.getOne(wrapper);
    Integer userId = userids.getUserId();
    // 根据userId查询中间表获取对应权限
    QueryWrapper<UserRole> UserRolewrapper = new QueryWrapper<>();
    UserRolewrapper.select().eq("user_id", userId);
    UserRole userRole = userRoleMapper.selectOne(UserRolewrapper);
    Integer roleId = userRole.getRoleId();
    // 根据RoleId查询对应权限
    QueryWrapper<Role> Rolewrapper = new QueryWrapper<>();
    Rolewrapper.select().eq("id", roleId);
    Role role = roleMapper.selectOne(Rolewrapper);
    String sort = role.getSort();
    // 设置用户权限
    System.out.println(sort);
    SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
    try {
      info.addStringPermission(sort);
    } catch (Exception e) {
      System.out.println("没有此权限");
      e.printStackTrace();
    }
    return info;
  }

  // 登录认证校验
  @Override
  protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token)
      throws AuthenticationException {
    JwtToken jwtToken = (JwtToken) token;

    String userId = jwtUtil.getClaimByToken((String) jwtToken.getPrincipal()).getSubject();
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.select().eq("user_id", userId);
    User user = userService.getOne(wrapper);
    if (user == null) {
      throw new UnknownAccountException("账户不存在");
    }
    //        if (user.getStatus() == -1 ) {
    //            throw new LockedAccountException("账户已被锁定");
    //        }
    AccountProfile profile = new AccountProfile();
    BeanUtils.copyProperties(user, profile);
    return new SimpleAuthenticationInfo(profile, jwtToken.getCredentials(), getName());
  }
}
