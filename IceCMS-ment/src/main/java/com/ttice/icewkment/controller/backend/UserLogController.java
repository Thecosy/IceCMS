package com.ttice.icewkment.controller.backend;

import cn.hutool.core.lang.Assert;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ttice.icewkment.Util.JwtUtil;
import com.ttice.icewkment.commin.lang.Result;
import com.ttice.icewkment.entity.*;
import com.ttice.icewkment.mapper.*;
import com.ttice.icewkment.service.RoleService;
import com.ttice.icewkment.service.UserService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@io.swagger.annotations.Api(tags = "用户登录验证接口")
@RestController
@RequestMapping("/UserLog")
public class UserLogController {

  @Autowired private UserService userService;

  @Autowired private UserMapper userMapper;

  @Autowired private UserRoleMapper userRoleMapper;

  @Autowired private RoleMapper roleMapper;

  @Autowired private RoleService roleService;

  @Autowired private VipOrderInfoMapper vipOrderInfoMapper;

  @Autowired private EmailDetectionMapper emailDetectionMapper;

  @ApiOperation(value = "后台登录")
  @ApiImplicitParam(name = "user", value = "用户对象", required = true)
  @GetMapping("/loginAdmin") // 登录
  public Result loginAdmin(User user) {
    // 进行登录核验操作
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    // 用户名判断
    wrapper.eq("USERNAME", user.getUsername());
    User userjudje = userService.getOne(wrapper);
    if (userjudje == null) {
      return Result.fail(("用户名不存在"));
    }
    Assert.notNull(user, "用户名不存在");
    if (!userjudje.getPassword().equals(user.getPassword())) {
      return Result.fail(("密码不正确"));
    }
    // 添加token
    String token = JwtUtil.createToken(userjudje.getUserId());
    // 根据userid获取QueryWrapper对象
    QueryWrapper<User> wrappertoken = new QueryWrapper<>();
    wrappertoken.eq("user_id", userjudje.getUserId());
    // 实体类
    User doc = new User();
    // new Date()更新登录时间
    doc.setLastLogin(new Date());
    // 这一步进行成功之后在数据库保存生成的token操作
    userService.update(doc, wrappertoken);
    // 返回状态
    HashMap<String, String> myMap = new HashMap<>();
    myMap.put("token", token);
    myMap.put("name", userjudje.getName());
    myMap.put("profile", userjudje.getProfile());
    myMap.put("email", userjudje.getEmail());
    myMap.put("userid", userjudje.getUserId().toString());

    // 判断账号是否是管理员权限
    Integer userId = userjudje.getUserId();

    QueryWrapper<UserRole> UserRolewrapper = new QueryWrapper<>();
    // 用户名判断
    UserRolewrapper.eq("user_id", userId);
    UserRole userRole = userRoleMapper.selectOne(UserRolewrapper);

    Integer roleId = userRole.getRoleId();

    QueryWrapper<Role> Rolewrapper = new QueryWrapper<>();
    // 用户名判断
    Rolewrapper.eq("id", roleId);
    Role role = roleMapper.selectOne(Rolewrapper);

    String name = role.getName();
    if (Objects.equals(name, "管理员")) {

      return Result.succ(200, "成功登录", myMap);
    } else {
      return Result.fail(("无权限"));
    }
  }

  @ApiOperation(value = "根据用户名判断是否是管理员")
  @ApiImplicitParam(name = "userid", value = "用户名id", required = true)
  @GetMapping("/CheckAdmin/{userid}")
  public Result CheckAdmin(@PathVariable Integer userid) {
    QueryWrapper<UserRole> wrapper = new QueryWrapper<>();
    wrapper.eq("user_id", userid);
    UserRole userRole = userRoleMapper.selectOne(wrapper);
    Integer roleId = userRole.getRoleId();
    if (roleId == 2) {
      return Result.succ(200, "是管理员", null);
    } else {
      return Result.fail(("不是管理员"));
    }
  }

  @ApiOperation(value = "登录")
  @ApiImplicitParam(name = "username", value = "用户对象", required = true)
  @PostMapping("/login") // 登录
  public Result login(User user) {

    // 进行登录核验操作
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    // 用户名判断
    wrapper.eq("USERNAME", user.getUsername());
    User userjudje = userService.getOne(wrapper);
    if (userjudje == null) {
      return Result.fail(("用户名不存在"));
    }
    Assert.notNull(user, "用户名不存在");
    if (!userjudje.getPassword().equals(user.getPassword())) {
      return Result.fail(("密码不正确"));
    }
    // 添加token
    String token = JwtUtil.createToken(userjudje.getUserId());
    // 根据userid获取QueryWrapper对象
    QueryWrapper<User> wrappertoken = new QueryWrapper<>();
    wrappertoken.eq("user_id", userjudje.getUserId());
    // 实体类
    User doc = new User();
    // new Date()更新登录时间
    doc.setLastLogin(new Date());
    // 这一步进行成功之后在数据库保存生成的token操作
    userService.update(doc, wrappertoken);
    // 返回状态
    HashMap<String, String> myMap = new HashMap<>();
    myMap.put("token", token);
    myMap.put("name", userjudje.getName());
    myMap.put("profile", userjudje.getProfile());
    //        myMap.put("profile", userjudje.getProfile());
    myMap.put("email", userjudje.getEmail());
    myMap.put("intro", userjudje.getIntro());
    //        myMap.put("age", userjudje.getUserAge().toString());
    myMap.put("gender", String.valueOf(userjudje.getGender()));
    myMap.put("userid", userjudje.getUserId().toString());
    myMap.put("username", userjudje.getUsername());
    return Result.succ(200, "成功登录", myMap);
  }

  @ApiOperation(value = "注册账号")
  @ApiImplicitParam(name = "Newuser", value = "用户对象", required = true)
  @GetMapping("/Create")
  public Result Create(User Newuser) {

    // 检查用户名是否重复
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.eq("USERNAME", Newuser.getUsername());
    Integer Count = userMapper.selectCount(wrapper);
    if (Count >= 1) {
      return Result.fail(("用户名重复"));
    }
    // 用户名判断
    User user = new User();

    user.setUsername(Newuser.getUsername());
    user.setPassword(Newuser.getPassword());
    // 默认信息
    user.setIntro("这个人很懒，什么都没有留下！");
    user.setCreateTime(new Date());
    user.setName("新用户");
    user.setGender(Newuser.getGender());
    user.setName(Newuser.getName());
    user.setHeight(Newuser.getHeight());
    user.setUserage(Newuser.getUserage());
    user.setBirthday(Newuser.getBirthday());
    user.setAcademic(Newuser.getAcademic());
    user.setMonthly(Newuser.getMonthly());
    user.setPermanent(Newuser.getPermanent());

    user.setEmail(Newuser.getEmail());

    Integer is_valid_code = Newuser.getStatus();

    // 检查邮箱是否存在验证码 验证码是否过期
    QueryWrapper wrapper1 = new QueryWrapper<>();
    wrapper1.eq("email", Newuser.getEmail());
    Integer isEmails = emailDetectionMapper.selectCount(wrapper1);
    if (isEmails == null) {
      return Result.fail("邮箱不存在");
    } else {

      EmailDetection isEmail = emailDetectionMapper.getOneEmail(Newuser.getEmail());
      // 邮箱存在验证码，继续验证是否过期
      Date expirationTime = new Date(isEmail.getTime().getTime() + 600000); // 验证码过期时间为发送时间 + 50 分钟
      //            if (new Date().after(expirationTime)) { // 当前时间晚于过期时间，则说明验证码已过期
      //                return Result.fail("验证码无效或已过期");
      //            }
      if (!is_valid_code.equals(isEmail.getCode())) {
        return Result.fail("验证码无效");
      }
    }
    // czp改
    user.setProfile("https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg");
    // 会员禁用
    user.setVipDisableTip(true);

    userMapper.insert(user);

    // 赋予订阅者权限
    UserRole userRole = new UserRole();
    userRole.setRoleId(1);
    userRole.setUserId(user.getUserId());
    userRoleMapper.insert(userRole);

    // 添加token
    String token = JwtUtil.createToken(user.getUserId());
    // 根据userid获取QueryWrapper对象
    QueryWrapper<User> wrappertoken = new QueryWrapper<>();
    wrappertoken.eq("user_id", user.getUserId());
    // 实体类
    User doc = new User();
    // new Date()更新登录时间
    doc.setLastLogin(new Date());
    // 这一步进行成功之后在数据库保存生成的token操作
    userService.update(doc, wrappertoken);
    // 返回状态
    HashMap<String, String> myMap = new HashMap<>();
    myMap.put("token", token);
    myMap.put("name", user.getName());
    myMap.put("profile", user.getProfile());
    myMap.put("username", user.getUsername());
    myMap.put("email", user.getEmail());
    myMap.put("userid", user.getUserId().toString());
    return Result.succ(200, "成功注册", myMap);
  }
}
