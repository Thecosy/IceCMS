package com.ttice.icewkment.controller.frontend;

import cn.hutool.core.lang.Assert;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.api.R;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tencentcloudapi.cms.v20190321.models.Logo;
import com.ttice.icewkment.Util.*;
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

    @Autowired
    private UserMapper userMapper;

    @Autowired
    MailUtils mailUtils;

    @Autowired
    private EmailDetectionMapper emailDetectionMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRoleMapper userRoleMapper;

    @Autowired
    private SettingMapper settingMapper;

    @Autowired
    private WeChatUtils weChatUtils;

    @Autowired
    private WxLoginMapper wxLoginMapper;

    @Autowired
    private SendMessageUtil sendMessageUtil;

    @Autowired
    private UserOrderInfoMapper userOrderInfoMapper;

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
            myMap.put("gender", String.valueOf(user.getGender()));
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
        } else {
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
            // user1.setProfile(user.getProfile());
            user1.setName("微信用户");
            // user1.setGender(user.getGender());
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
            wxLoginMapper.update(wxLogin, wxLoginQueryWrapper);
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
        //    QueryWrapper<User> wrapper = new QueryWrapper<>();
        //    wrapper.eq("USERNAME", Newuser.getUsername());
        //    Integer Count = userMapper.selectCount(wrapper);
        //    if (Count >= 1) {
        //      return Result.fail(("用户名重复"));
        //    }
        // 检查邮箱是否重复
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("email", Newuser.getEmail());
        Integer Count = userMapper.selectCount(wrapper);
        if (Count >= 1) {
            return Result.fail(("邮箱重复"));
        }
        //随机生成数字用户名
        UUID uuid = UUID.randomUUID();
        int hashCode = uuid.hashCode(); // 取UUID的哈希码
        String randomUsername = String.format("%08d", Math.abs(hashCode % 1000000)); // 格式化为8位数字字符串
        // 验证数据库中是否已经存在这个用户名，如果存在就重新生成一个
        QueryWrapper<User> wrapper1 = new QueryWrapper<>();
        wrapper1.eq("USERNAME", randomUsername);
        Integer Count1 = userMapper.selectCount(wrapper1);
        while (Count1 >= 1) {
            uuid = UUID.randomUUID();
            hashCode = uuid.hashCode(); // 取UUID的哈希码
            randomUsername = String.format("%08d", Math.abs(hashCode % 1000000)); // 格式化为8位数字字符串
            wrapper1 = new QueryWrapper<>();
            wrapper1.eq("USERNAME", randomUsername);
            Count1 = userMapper.selectCount(wrapper1);
        }

        // 用户名判断
        User user = new User();

        //    user.setUsername(Newuser.getUsername());
        // 密码加密
        user.setPassword(hashPassword(Newuser.getPassword()));
        // 默认信息
        user.setIntro("这个人很懒，什么都没有留下！");
        user.setCreateTime(new Date());
        user.setName("新用户");
        user.setUsername(randomUsername);
        //    user.setGender(Newuser.getGender());
        //    user.setName(Newuser.getName());
        //    user.setHeight(Newuser.getHeight());
        //    user.setUserage(Newuser.getUserage());
        //    user.setBirthday(Newuser.getBirthday());
        //    user.setAcademic(Newuser.getAcademic());
        //    user.setMonthly(Newuser.getMonthly());
        //    user.setPermanent(Newuser.getPermanent());

        user.setEmail(Newuser.getEmail());

        String is_valid_code = String.valueOf(Newuser.getStatus());

        // 检查邮箱是否存在验证码 验证码是否过期
        try {
            QueryWrapper<EmailDetection> wrapper2 = new QueryWrapper<>();
            wrapper2.eq("email", Newuser.getEmail());
            Integer isEmails = emailDetectionMapper.selectCount(wrapper2);
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
                }
            }
        } catch (Exception e) {
            return Result.fail("邮箱验证时出错");
        }
    }

    @ApiOperation(value = "邮箱找回密码")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "email", value = "邮箱", required = true, dataType = "String", paramType = "query"),
            @ApiImplicitParam(name = "code", value = "验证码", required = true, dataType = "String", paramType = "query"),
            @ApiImplicitParam(name = "password", value = "新密码", required = true, dataType = "String", paramType = "query")
    })
    @PostMapping("/FindPassword")
    public Result FindPassword(@RequestParam(name = "email") String email, @RequestParam(name = "code") String code, @RequestParam(name = "password") String password) {
        // 检查邮箱是否存在验证码 验证码是否过期
        try {
            QueryWrapper<EmailDetection> wrapper2 = new QueryWrapper<>();
            wrapper2.eq("email", email);
            Integer isEmails = emailDetectionMapper.selectCount(wrapper2);
            if (isEmails == null || isEmails == 0) {
                return Result.fail("验证邮箱不存在");
            } else {
                EmailDetection isEmail = emailDetectionMapper.getOneEmail(email);
                // 邮箱存在验证码，继续验证是否过期
                Date expirationTime = new Date(isEmail.getTime().getTime() + 1800000); // 验证码过期时间为发送时间 + 30 分钟
                if (new Date().after(expirationTime)) { // 当前时间晚于过期时间，则说明验证码已过期
                    return Result.fail("邮箱验证码无效或已过期");
                }
                if (code.equals(isEmail.getCode())) {
                    // 修改密码
                    QueryWrapper<User> wrapper = new QueryWrapper<>();
                    wrapper.eq("email", email);
                    User user = userMapper.selectOne(wrapper);
                    user.setPassword(hashPassword(password));
                    userMapper.updateById(user);
                    return Result.succ(200, "修改成功", null);
                } else {
                    return Result.fail("验证码错误");
                }
            }
        } catch (Exception e) {
            return Result.fail("邮箱验证时出错");
        }
    }

    @ApiOperation(value = "找回密码发送邮箱验证码")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "email", value = "邮箱", required = true, dataType = "String", paramType = "query")
    })
    @PostMapping("/FindPasswordSendEmail")
    public Result FindPasswordSendEmail(@RequestParam(name = "email") String email) {
        // 检查邮箱是否存在验证码 验证码是否过期
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
            QueryWrapper<User> wrapper = new QueryWrapper<>();
            wrapper.eq("email", email);
            Integer isEmails = userMapper.selectCount(wrapper);
            if (isEmails == null || isEmails == 0) {
                return Result.fail("邮箱不存在");
            } else {
                // 构建 HTML 格式的邮件内容
                String emailContent = "<div style='font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.6; padding: 20px; background-color: #f9f9f9; border-radius: 8px; border: 1px solid #ddd;'>"
                        + "<div style='text-align: center; padding: 10px 0; background-color: #007bff; border-radius: 8px 8px 0 0;'>"
                        + "    <img src='" + setting.getSitLogo() + "' alt='" + setting.getSitTitle() + " Logo' style='height: 40px; width: 40px; border-radius: 50%; margin-bottom: 10px;'>"
                        + "    <h1 style='color: #fff; margin: 0; font-size: 24px;'>" + setting.getSitTitle() + "</h1>"
                        + "</div>"
                        + "<div style='padding: 20px; background-color: #ffffff; border-radius: 0 0 8px 8px;'>"
                        + "    <p>尊敬的用户，</p>"
                        + "    <p>您正在找回此邮箱绑定 <b>" + setting.getSitTitle() + "</b> 的密码。请使用以下验证码完成您的邮箱验证过程。</p>"
                        + "    <div style='text-align: center; margin: 20px 0;'>"
                        + "        <p style='display: inline-block; font-size: 18px; color: #d9534f; background-color: #fbe9e7; padding: 10px 20px; border-radius: 4px;'><b>验证码: " + code + "</b></p>"
                        + "    </div>"
                        + "    <p>该验证码有效期为30分钟。请勿向任何人泄露此验证码。</p>"
                        + "    <p>如果您未请求此验证码，请忽略此邮件。</p>"
                        + "    <hr style='border: none; border-top: 1px solid #eee; margin: 20px 0;'>"
                        + "    <p style='text-align: center;'>"
                        + "        <small style='color: #888;'>此邮件由 " + setting.getSitTitle() + " 系统自动生成，请勿回复。</small>"
                        + "    </p>"
                        + "    <br>"
                        + "    <p>此致，<br>"
                        + "        " + setting.getSitTitle() + " 团队</p>"
                        + "</div>"
                        + "</div>";

                // 发送邮件
                Email email1 = new Email();
                email1.setTos(new String[]{email})
                        .setSubject("验证码")
                        .setContent(emailContent); // 设置内容类型为 HTML


                int IsSend = mailUtils.sendEmailUseHtml(email1, setting.getSitTitle());

                if (IsSend == 1) {
                    return Result.succ(200, "成功发送", null);
                } else {
                    return Result.fail("发送失败");
                }
            }
        } catch (Exception e) {
            return Result.fail("邮箱验证时出错");
        }
    }

    @ApiOperation(value = "手机号找回密码")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "phone", value = "手机号", required = true, dataType = "String", paramType = "query"),
            @ApiImplicitParam(name = "code", value = "验证码", required = true, dataType = "String", paramType = "query"),
            @ApiImplicitParam(name = "password", value = "新密码", required = true, dataType = "String", paramType = "query")
    })
    @PostMapping("/FindPasswordPhone")
    public Result FindPasswordPhone(@RequestParam(name = "phone") String phone, @RequestParam(name = "code") String code, @RequestParam(name = "password") String password) {
        // 检查手机号是否存在验证码 验证码是否过期
        try {
            QueryWrapper<User> wrapper = new QueryWrapper<>();
            wrapper.eq("phone", phone);
            Integer isPhones = userMapper.selectCount(wrapper);
            if (isPhones == null || isPhones == 0) {
                return Result.fail("手机号不存在");
            } else {
                // 发送验证码
                boolean IsSend = sendMessageUtil.checkSmsCode(phone, code);
                if (IsSend) {
                    // 修改密码
                    QueryWrapper<User> wrapper1 = new QueryWrapper<>();
                    wrapper1.eq("phone", phone);
                    User user = userMapper.selectOne(wrapper1);
                    user.setPassword(hashPassword(password));
                    userMapper.updateById(user);
                    return Result.succ(200, "修改成功", null);
                } else {
                    return Result.fail("验证码错误");
                }
            }
        } catch (Exception e) {
            return Result.fail("手机号验证时出错");
        }
    }


    @ApiOperation(value = "找回密码发送手机号验证码")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "email", value = "邮箱", required = true, dataType = "String", paramType = "query")
    })
    @PostMapping("/FindPasswordSendCode")
    public Result FindPasswordSendCode(@RequestParam(name = "email") String email) {
        // 检查邮箱是否存在验证码 验证码是否过期
        try {
            QueryWrapper<User> wrapper = new QueryWrapper<>();
            wrapper.eq("email", email);
            Integer isEmails = userMapper.selectCount(wrapper);
            if (isEmails == null || isEmails == 0) {
                return Result.fail("邮箱不存在");
            } else {
                // 发送验证码
                boolean IsSend = sendMessageUtil.sendSmsCode(email);
                if (IsSend) {
                    return Result.succ(200, "成功发送", null);
                } else {
                    return Result.fail("发送失败");
                }
            }
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
        data.put("othername", user.getName() != null ? user.getName() : null);
        data.put("academic", user.getAcademic() != null ? user.getAcademic() : null);
        data.put("monthly", user.getMonthly() != null ? user.getMonthly() : null);
        data.put("permanent", user.getPermanent() != null ? user.getPermanent() : null);
        return data;
    }

    @ApiOperation(value = "获取当前登录用户的详细信息")
    @GetMapping("/getCurrentUserInfo")
    public Result getCurrentUserInfo(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || token.isEmpty()) {
            return Result.fail("未登录");
        }
        
        try {
            // 从token中解析用户ID
            Integer userId = JwtUtil.getUserIdFromToken(token);
            if (userId == null) {
                return Result.fail("Token无效");
            }
            
            User user = userMapper.selectById(userId);
            if (user == null) {
                return Result.fail("用户不存在");
            }
            
            Map<String, Object> data = new HashMap<>();
            data.put("userid", user.getUserId());
            data.put("username", user.getUsername());
            data.put("name", user.getName());
            data.put("profile", user.getProfile());
            data.put("email", user.getEmail());
            data.put("intro", user.getIntro());
            data.put("gender", user.getGender());
            data.put("phone", user.getPhone());
            data.put("height", user.getHeight());
            data.put("birthday", user.getBirthday());
            data.put("academic", user.getAcademic());
            data.put("monthly", user.getMonthly());
            data.put("permanent", user.getPermanent());
            data.put("userage", user.getUserage());
            data.put("createTime", user.getCreateTime());
            data.put("lastLogin", user.getLastLogin());
            data.put("integral", user.getIntegral());
            data.put("vipDisableTip", user.getVipDisableTip());
            data.put("vipValidDate", user.getVipValidDate());
            data.put("vipExpireDate", user.getVipExpireDate());
            
            return Result.succ(200, "获取成功", data);
        } catch (Exception e) {
            return Result.fail("获取用户信息失败");
        }
    }

    @ApiOperation(value = "短信登录")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "phone", value = "手机号", required = true, dataType = "String", paramType = "query"),
    })
    @PostMapping("/Messagelogin/{phone}") // 短信登录
    public Result Messagelogin(@PathVariable("phone") String phone) {

        boolean IsSend = sendMessageUtil.sendSmsCode(phone);
        if (IsSend) {
            return Result.succ(200, "成功发送", null);
        } else {
            return Result.fail("发送失败");
        }
    }

    @ApiOperation(value = "短信登录验证")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "phone", value = "手机号", required = true, dataType = "String", paramType = "query"),
            @ApiImplicitParam(name = "code", value = "验证码", required = true, dataType = "String", paramType = "query")
    })
    @PostMapping("/MessageloginCheck/{phone}/{code}") // 短信登录验证
    public Result MessageloginCheck(@PathVariable("phone") String phone, @PathVariable("code") String code) {
        boolean IsCheck = sendMessageUtil.checkSmsCode(phone, code);
        if (IsCheck) {
            QueryWrapper<User> wrapper = new QueryWrapper<>();
            wrapper.eq("phone", phone);
            User user = userMapper.selectOne(wrapper);
            // 判断如果user存在就返回这个user的信息登录，如果没有就新建一个用户并且设置手机号
            if (user == null) {
                // 新增一个用户
                User user1 = new User();
                // user1.setProfile(user.getProfile());
                user1.setName("手机用户");
                // user1.setGender(user.getGender());
                user1.setPhone(phone);
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
                // 返回状态
                // 添加token
                String token = JwtUtil.createToken(user1.getUserId());

                HashMap<String, String> myMap = new HashMap<>();
                myMap.put("token", token);
                myMap.put("name", user1.getName());
                myMap.put("profile", user1.getProfile());
                myMap.put("email", user1.getEmail());
                myMap.put("intro", user1.getIntro());
                return Result.succ(200, "成功登录", myMap);
            } else {
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
                myMap.put("email", user.getEmail());
                myMap.put("intro", user.getIntro());
                return Result.succ(200, "成功登录", myMap);
            }
        }
        return Result.fail("验证码错误");
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
            // 邮箱判断
            // 进行登录核验操作
            QueryWrapper<User> wrapper1 = new QueryWrapper<>();
            // 用户名判断
            wrapper1.eq("email", user.getUsername());
            User userjudje1 = userService.getOne(wrapper1);
            if (userjudje1 == null) {
                return Result.fail(("用户名邮箱不存在"));
            } else userjudje = userjudje1;
        }
        Assert.notNull(user, "用户名不存在");
        boolean verifyPassword = verifyPassword(userjudje.getPassword(), user.getPassword());
        if (!verifyPassword) {
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
            if (!claims) {
                // 前端接收后进行处理
                Result.fail(403, "Token已过期", null);
            }
            // 验证之前密码是否正确
            QueryWrapper<User> wrapper = new QueryWrapper<>();
            wrapper.eq("user_id", userid);
            User usercheak = userMapper.selectOne(wrapper);
            String hashedPassword = usercheak.getPassword();
            if (verifyPassword(hashedPassword, yuanPassWord)) {
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

                // 构建 HTML 格式的邮件内容
                String emailContent = "<div style='font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.6; padding: 20px; background-color: #f9f9f9; border-radius: 8px; border: 1px solid #ddd;'>"
                        + "<div style='text-align: center; padding: 10px 0; background-color: #007bff; border-radius: 8px 8px 0 0;'>"
                        + "    <img src='" + setting.getSitLogo() + "' alt='" + setting.getSitTitle() + " Logo' style='height: 40px; width: 40px; border-radius: 50%; margin-bottom: 10px;'>"
                        + "    <h1 style='color: #fff; margin: 0; font-size: 24px;'>" + setting.getSitTitle() + "</h1>"
                        + "</div>"
                        + "<div style='padding: 20px; background-color: #ffffff; border-radius: 0 0 8px 8px;'>"
                        + "    <p>尊敬的用户，</p>"
                        + "    <p>感谢您注册 <b>" + setting.getSitTitle() + "</b> 。请使用以下验证码完成您的邮箱验证过程。</p>"
                        + "    <div style='text-align: center; margin: 20px 0;'>"
                        + "        <p style='display: inline-block; font-size: 18px; color: #d9534f; background-color: #fbe9e7; padding: 10px 20px; border-radius: 4px;'><b>验证码: " + code + "</b></p>"
                        + "    </div>"
                        + "    <p>该验证码有效期为30分钟。请勿向任何人泄露此验证码。</p>"
                        + "    <p>如果您未请求此验证码，请忽略此邮件。</p>"
                        + "    <hr style='border: none; border-top: 1px solid #eee; margin: 20px 0;'>"
                        + "    <p style='text-align: center;'>"
                        + "        <small style='color: #888;'>此邮件由 " + setting.getSitTitle() + " 系统自动生成，请勿回复。</small>"
                        + "    </p>"
                        + "    <br>"
                        + "    <p>此致，<br>"
                        + "        " + setting.getSitTitle() + " 团队</p>"
                        + "</div>"
                        + "</div>";
                // 发送邮件
                Email email1 = new Email();
                email1.setTos(new String[]{email})
                        .setSubject("验证码")
                        .setContent(emailContent); // 设置内容类型为 HTML
                int IsSend = mailUtils.sendEmailUseHtml(email1, setting.getSitTitle());
                int r = mailUtils.sendCommonEmail(email1, setting.getSitTitle());
                System.out.println(r);
                if (r == 1) {
                    return Result.succ("验证码已发送");
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

    @ApiOperation(value = "获取当前用户的订单信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", value = "页码", required = false, dataType = "int", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "limit", value = "每页数量", required = false, dataType = "int", paramType = "query", defaultValue = "10")
    })
    @GetMapping("/getCurrentUserOrders")
    public Result getCurrentUserOrders(
            @RequestHeader(value = "Authorization", required = false) String token,
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "limit", defaultValue = "10") Integer limit) {
        
        if (token == null || token.isEmpty()) {
            return Result.fail("未登录");
        }
        
        try {
            // 从token中解析用户ID
            Integer userId = JwtUtil.getUserIdFromToken(token);
            if (userId == null) {
                return Result.fail("Token无效");
            }
            
            // 创建分页对象
            Page<OrderInfo> pageInfo = new Page<>(page, limit);
            
            // 创建查询条件
            QueryWrapper<OrderInfo> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("user_id", userId);
            queryWrapper.orderByDesc("create_time"); // 按创建时间倒序
            
            // 分页查询
            Page<OrderInfo> orderPage = userOrderInfoMapper.selectPage(pageInfo, queryWrapper);
            
            // 构建返回数据
            Map<String, Object> data = new HashMap<>();
            data.put("records", orderPage.getRecords()); // 订单列表
            data.put("total", orderPage.getTotal()); // 总记录数
            data.put("current", orderPage.getCurrent()); // 当前页
            data.put("size", orderPage.getSize()); // 每页大小
            data.put("pages", orderPage.getPages()); // 总页数
            
            return Result.succ(200, "获取成功", data);
        } catch (Exception e) {
            e.printStackTrace();
            return Result.fail("获取订单信息失败");
        }
    }
}
