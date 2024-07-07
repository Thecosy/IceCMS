package com.ttice.icewkment.controller.frontend;

import cn.hutool.core.lang.Assert;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.Util.Argon2Util;
import com.ttice.icewkment.Util.JwtUtil;
import com.ttice.icewkment.Util.MailUtils;
import com.ttice.icewkment.Util.WeChatUtils;
import com.ttice.icewkment.commin.lang.Result;
import com.ttice.icewkment.entity.*;
import com.ttice.icewkment.mapper.*;
import com.ttice.icewkment.service.UserService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.ttice.icewkment.Util.Argon2Util.hashPassword;
import static com.ttice.icewkment.Util.Argon2Util.verifyPassword;

/**
 * 前端控制器
 *
 * @author admin
 * @since 2022-02-19
 */
@io.swagger.annotations.Api(tags = "Web用户接口")
@RestController
@RequestMapping("/Websuser")
public class WebUserController {

  @Autowired private UserMapper userMapper;

  @Autowired MailUtils mailUtils;

  @Autowired private EmailDetectionMapper emailDetectionMapper;

  @Autowired private UserService userService;

  @Autowired private UserRoleMapper userRoleMapper;

  @Autowired private SettingMapper settingMapper;

  @Autowired private WeChatUtils weChatUtils;

  @Autowired private  WxLoginMapper wxLoginMapper;

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

  @ApiOperation(value = "微信登录")
  @PostMapping("/WeChatLogin") // 登录
  public Result WeChatLogin() {
    return Result.succ(200, "成功登录", weChatUtils.generateWechatRrCode());
  }

  @ApiOperation(value = "微信登录验证")
  @PostMapping("/WeChatLoginCheck/{scene}") // 登录
  public Result WeChatLoginCheck(@PathVariable String scene) {
    // 查询WxLogin中scene的一条记录
    QueryWrapper<WxLogin> wxLoginQueryWrapper = new QueryWrapper<>();
    wxLoginQueryWrapper.eq("scene", scene);
    WxLogin wxLogin = wxLoginMapper.selectOne(wxLoginQueryWrapper);
    if (wxLogin.getStatus().equals("1")) {
      User user = userService.GetUserInfoById(wxLogin.getUserId());
      String token = JwtUtil.createToken(wxLogin.getUserId());
      // 返回状态
      HashMap<String, String> myMap = new HashMap<>();
      myMap.put("token", token);
      myMap.put("name", user.getName());
      myMap.put("profile", user.getProfile());
      //        myMap.put("profile", userjudje.getProfile());
      myMap.put("email", user.getEmail());
      myMap.put("intro", user.getIntro());
      //        myMap.put("age", userjudje.getUserAge().toString());
      myMap.put("gender", user.getGender());
      myMap.put("userid", user.getUserId().toString());
      myMap.put("username", user.getUsername());
      return Result.succ(200, "成功登录", myMap);
    } else {
      return Result.fail(("未登录"));
    }
  }

  @ApiOperation(value = "微信登录注册")
  @PostMapping("/CreateWeChatLogin")
  public Result CreateWeChatLogin(@RequestParam(name = "scene") String scene, @RequestParam(name = "code") String code) throws Exception {
    // 获取openid
    String openid = weChatUtils.getOpenid(code);
    // 检查openid是否重复
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.eq("openid", openid);
    Integer Count = userMapper.selectCount(wrapper);
    if (Count >= 1) {
      //只需修改登录表
      //查询WxLogin中scene的一条记录
      QueryWrapper<WxLogin> wxLoginQueryWrapper = new QueryWrapper<>();
      wxLoginQueryWrapper.eq("scene", scene);
      WxLogin wxLogin = wxLoginMapper.selectOne(wxLoginQueryWrapper);
      //修改status为1
      wxLogin.setStatus("1");
      User user1 = userMapper.selectOne(wrapper);
      wxLogin.setUserId(user1.getUserId());
      wxLoginMapper.updateById(wxLogin);

      return Result.succ(200, "openid重复", null);
    }else {
      //修改登录表和注册一个新用户
      // 查询WxLogin中scene的一条记录
      QueryWrapper<WxLogin> wxLoginQueryWrapper = new QueryWrapper<>();
      wxLoginQueryWrapper.eq("scene", scene);
      WxLogin wxLogin = wxLoginMapper.selectOne(wxLoginQueryWrapper);
      // 修改status为1
      wxLogin.setStatus("1");
      // 新增一个用户
      User user1 = new User();
      user1.setOpenid(openid);
//        user1.setProfile(user.getProfile());
//        user1.setName(user.getName());
//        user1.setGender(user.getGender());
      user1.setCreateTime(new Date());
      user1.setLastLogin(new Date());
      user1.setVipDisableTip(true);
      user1.setVipValidDate(new Date());
      user1.setVipExpireDate(new Date());
      user1.setIntegral(0);
      user1.setMonthly("0");
      user1.setPermanent("0");
      user1.setIntro("这个人很懒，什么都没有留下！");
      user1.setAcademic("0");
      user1.setBirthday("0");
      user1.setHeight("0");
      user1.setUserage(0);
      user1.setEmail("0");
      // 随机用户名
      UUID uuid = UUID.randomUUID();
      // Convert UUID to string and replace all "-" characters with "".
      String randomUsername = uuid.toString().replace("-", "");
      user1.setUsername(randomUsername);
      user1.setPassword(null);
      user1.setStatus(0);
      user1.setRole("0");
      userMapper.insert(user1);
      wxLogin.setUserId(user1.getUserId());
      wxLoginMapper.update(wxLogin,wxLoginQueryWrapper);
      return Result.succ(200, "成功登录", weChatUtils.generateWechatRrCode());
    }
  }

  @ApiOperation(value = "注册账号")
  @ApiImplicitParams({
          @ApiImplicitParam(name = "username", value = "用户名", required = true, dataType = "String", paramType = "query"),
          @ApiImplicitParam(name = "password", value = "密码", required = true, dataType = "String", paramType = "query"),
          @ApiImplicitParam(name = "gender", value = "性别", required = false, dataType = "String", paramType = "query"),
          @ApiImplicitParam(name = "name", value = "姓名", required = false, dataType = "String", paramType = "query"),
          @ApiImplicitParam(name = "height", value = "身高", required = false, dataType = "Integer", paramType = "query"),
          @ApiImplicitParam(name = "userage", value = "年龄", required = false, dataType = "Integer", paramType = "query"),
          @ApiImplicitParam(name = "birthday", value = "生日", required = false, dataType = "Date", paramType = "query"),
          @ApiImplicitParam(name = "academic", value = "学历", required = false, dataType = "String", paramType = "query"),
          @ApiImplicitParam(name = "monthly", value = "月收入", required = false, dataType = "String", paramType = "query"),
          @ApiImplicitParam(name = "permanent", value = "永久地址", required = false, dataType = "String", paramType = "query"),
          @ApiImplicitParam(name = "email", value = "邮箱", required = false, dataType = "String", paramType = "query"),
          @ApiImplicitParam(name = "status", value = "验证码状态", required = false, dataType = "Integer", paramType = "query")
  })
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
    user.setPassword(Argon2Util.hashPassword(Newuser.getPassword()));
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

    String is_valid_code = String.valueOf(Newuser.getStatus());

    // 检查邮箱是否存在验证码 验证码是否过期
    try {
      QueryWrapper<EmailDetection> wrapper1 = new QueryWrapper<>();
      wrapper1.eq("email", Newuser.getEmail());
      Integer isEmails = emailDetectionMapper.selectCount(wrapper1);
      if (isEmails == null || isEmails == 0) {
        return Result.fail("邮箱不存在");
      } else {
        EmailDetection isEmail = emailDetectionMapper.getOneEmail(Newuser.getEmail());
        // 邮箱存在验证码，继续验证是否过期
        Date expirationTime = new Date(isEmail.getTime().getTime() + 1800000); // 验证码过期时间为发送时间 + 30 分钟
        if (new Date().after(expirationTime)) { // 当前时间晚于过期时间，则说明验证码已过期
          return Result.fail("验证码无效或已过期");
        }
        if (is_valid_code.equals(isEmail.getCode())) {
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

        } else {
          return Result.fail("验证码错误");
      }}
    } catch (Exception e) {
      return Result.fail("邮箱验证时出错");
    }
  }

  @ApiOperation(value = "根据id获取用户信息")
  @ApiImplicitParam(name = "id", value = "id", required = true)
  @GetMapping("/getUserInfobyid/{id}")
  public Map getUserInfobyid(@PathVariable("id") Integer id) {
    User user = userMapper.selectById(id);
    Map<String, Object> data = new HashMap<>();
    data.put("name", user.getUsername());
    data.put("id", user.getUserId());
    data.put("profile", user.getProfile());
    data.put("gender", user.getGender());
    data.put("height", user.getUserId() != null ? user.getUserId().toString() : null);
    data.put("birthday", user.getBirthday() != null ? user.getBirthday() : null);
    data.put("academic", user.getAcademic() != null ? user.getAcademic() : null);
    data.put("monthly", user.getMonthly() != null ? user.getMonthly() : null);
    data.put("permanent", user.getPermanent() != null ? user.getPermanent() : null);
    return data;
  }

  @ApiOperation(value = "登录")
  @ApiImplicitParams({
          @ApiImplicitParam(name = "username", value = "用户名", required = true, dataType = "String", paramType = "query"),
          @ApiImplicitParam(name = "password", value = "密码", required = true, dataType = "String", paramType = "query")
  })
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
    if (verifyPassword(user.getPassword(),userjudje.getPassword())) {
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
    myMap.put("gender", userjudje.getGender());
    myMap.put("userid", userjudje.getUserId().toString());
    myMap.put("username", userjudje.getUsername());
    return Result.succ(200, "成功登录", myMap);
  }

  @ApiOperation(value = "修改密码")
  @ApiImplicitParams({
          @ApiImplicitParam(name = "jwt", value = "jwt", required = true),
          @ApiImplicitParam(name = "yuanPassWord", value = "原密码", required = true),
          @ApiImplicitParam(name = "NewPassWord", value = "新密码", required = true),
          @ApiImplicitParam(name = "userid", value = "用户id", required = true)
  })
  @PostMapping("/ChangePassword/{jwt}/{yuanPassWord}/{NewPassWord}/{userid}")
  public Result ChangePassword(
          @PathVariable("jwt") String jwt,
          @PathVariable("yuanPassWord") String yuanPassWord,
          @PathVariable("NewPassWord") String NewPassWord,
          @PathVariable("userid") Integer userid) {
    // 登录状态检验jwt
    if (org.apache.commons.lang.StringUtils.isEmpty(jwt)) {
      // 前端接收后进行处理
      Result.fail(403, "jwt为空", null);
    } else {
      // 校验jwt
      boolean claims = JwtUtil.checkToken(jwt);
      // 校验是否为空和时间是否过期
      // 如果过期了就真的没有一点退路了吗？
      if (!claims) {
        // 前端接收后进行处理
        Result.fail(403, "Token已过期", null);
      }
      // 验证之前密码是否正确
      QueryWrapper<User> wrapper = new QueryWrapper<>();
      wrapper.eq("user_id", userid);
      User usercheak = userMapper.selectOne(wrapper);
      String password = usercheak.getPassword();
      if (verifyPassword(yuanPassWord,password)) {
        User user = new User();
        user.setUserId(userid);
        user.setPassword(hashPassword(NewPassWord));
        userMapper.updateById(user);
        return Result.succ(200, "修改成功", null);
      }
      return Result.fail(400, "原密码不正确", null);
    }
    return Result.fail(402, "失败", null);
  }

  @ApiOperation(value = "修改用户信息")
  @PostMapping("/ChangeUser")
  public Result ChangeUser(@RequestBody User user) {
    userMapper.updateById(user);
    return Result.succ(200, "修改成功", null);
  }

  @ApiOperation(value = "邮箱验证")
  @GetMapping("/testemail/{email}")
  public Result testemail(@PathVariable("email") String email) {
    String regex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
    Pattern pattern = Pattern.compile(regex);
    Matcher matcher = pattern.matcher(email);

    // 邮箱格式正确
    if (matcher.matches()) {
      try {
        // 将电子邮件地址保存到数据库中
        EmailDetection validation = new EmailDetection();
        validation.setEmail(email);
        UUID uuid = UUID.randomUUID();
        int hashCode = uuid.hashCode(); // 取UUID的哈希码
        String code = String.format("%06d", Math.abs(hashCode % 1000000)); // 格式化为6位数字字符串
        validation.setCode(code); // 生成验证码
        validation.setTime(new Time(System.currentTimeMillis())); // 记录当前时间
        emailDetectionMapper.insert(validation); // 将验证信息插入到数据库中

        Setting setting = settingMapper.selectOne(null);
        // 构建邮件内容
        String emailContent = "尊敬的用户，\n\n"
                + "感谢您注册"+ setting.getSitTitle() +"。请使用以下验证码完成您的邮箱验证过程。\n\n"
                + "验证码: " + code + "\n\n"
                + "该验证码有效期为30分钟。请勿向任何人泄露此验证码。\n\n"
                + "如果您未请求此验证码，请忽略此邮件。\n\n";

        // 发送邮件
        Email email1 = new Email();
        email1.setTos(new String[] {email}).setSubject("验证码").setContent(emailContent);


        int r = mailUtils.sendCommonEmail(email1, setting.getSitTitle());
        System.out.println(r);

        if (r == 1) {
          return Result.succ( "验证码已发送");
        } else {
          return Result.fail("发送邮件失败");
        }
      } catch (Exception e) {
        return Result.fail("处理请求时出错: " + e.getMessage());
      }
    } else {
      // 邮箱格式不正确
      return Result.fail("邮箱格式不正确");
    }
  }
}
