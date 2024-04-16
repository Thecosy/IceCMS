package com.ttice.icewkment.controller.frontend;

import com.ttice.icewkment.Util.MailUtils;
import com.ttice.icewkment.commin.lang.Result;
import com.ttice.icewkment.entity.Email;
import com.ttice.icewkment.entity.EmailDetection;
import com.ttice.icewkment.entity.User;
import com.ttice.icewkment.mapper.EmailDetectionMapper;
import com.ttice.icewkment.mapper.UserMapper;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

  // 生成随机验证码的方法
  private String generateCode() {
    int length = 6; // 验证码长度
    String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // 可用字符集合
    Random random = new Random();

    StringBuilder result = new StringBuilder();
    for (int i = 0; i < length; i++) {
      result.append(characters.charAt(random.nextInt(characters.length())));
    }

    return result.toString();
  }

  @ApiOperation(value = "修改用户信息")
  @PostMapping("/ChangeUser")
  public Result ChangeUser(@RequestBody User user) {
    userMapper.updateById(user);
    return Result.succ(200, "修改成功", null);
  }

  @ApiOperation(value = "testemail")
  @GetMapping("/testemail/{email}")
  public Integer testemail(@PathVariable("email") String email) {
    String regex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
    Pattern pattern = Pattern.compile(regex);
    Matcher matcher = pattern.matcher(email);

    if (matcher.matches()) {
      // 邮箱格式正确

      // 将电子邮件地址保存到数据库中

      EmailDetection validation = new EmailDetection();
      validation.setEmail(email);
      String code = generateCode();
      validation.setCode(code); // 生成验证码
      validation.setTime(new Time(System.currentTimeMillis())); // 记录当前时间
      emailDetectionMapper.insert(validation); // 将验证信息插入到数据库中

      Email email1 = new Email(); // 发送邮件
      email1.setTos(new String[] {email}).setSubject("验证码").setContent(code);

      int r = mailUtils.sendCommonEmail(email1);
      System.out.println(r);
      return 1;
    } else {
      // 邮箱格式不正确
      return 0;
    }
  }
}
