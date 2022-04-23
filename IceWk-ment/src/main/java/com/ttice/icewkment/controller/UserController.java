package com.ttice.icewkment.controller;

import cn.hutool.core.lang.Assert;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.Util.JwtUtil;
import com.ttice.icewkment.commin.lang.Result;
import com.ttice.icewkment.entity.User;
import com.ttice.icewkment.service.UserService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@io.swagger.annotations.Api(tags = "用户登陆验证接口")
@RestController
@RequestMapping("/User")
public class UserController {

    @Autowired
    private UserService userService;

//
//    @ApiOperation(value = "登陆")
//    @GetMapping("/login")//登陆
//    public Result register(String account, String password) {
//        //检查用户名是否被占用
//        User user = sysDao.selectByAccount(account);
//        if(user!=null) {
//            return new ResponseVo<>( -1, "用户名被占用");
//        }
//        //添加用户信息
//        user = new User();
//        //设置用户名
//        user.setAccount(account);
//        //密码加密后再保存
//        String salt = Md5Util.salt();
//        String md5Password = Md5Util.md5(password+salt);
//        user.setPassword(md5Password);
//        user.setSalt(salt);
//        //设置注册时间
//        user.setCreatetime(new Date());
//        //添加到数据库
//        int row = sysDao.insertSelective(user);
//        //返回信息
//        if(row>0) {
//            //生成token给用户
//            String token = JwtUtil.createToken(user);
//            return new ResponseVo<>(0,"注册成功", token);
//        }else {
//            return new ResponseVo<>( -1, "注册失败");
//        }
//        //返回状态
//        return Result.succ(200,"成功登陆",token);
//        return null;
//    }

    @ApiOperation(value = "登陆")
    @GetMapping("/login")//登陆
    public Result login(User user) {

        //进行登陆核验操作
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        //用户名判断
        wrapper.eq("USERNAME", user.getUsername());
        User userjudje = userService.getOne(wrapper);
        if (userjudje == null){
            return Result.fail(("用户名不存在"));
        }
        Assert.notNull(user,"用户名不存在");
        if(!userjudje.getPassword().equals(user.getPassword())) {
            return Result.fail(("密码不正确"));
        }
        //添加token
        String token = JwtUtil.createToken(userjudje.getUserId());
        //根据userid获取QueryWrapper对象
        QueryWrapper<User> wrappertoken = new QueryWrapper<>();
        wrappertoken.eq("user_id", userjudje.getUserId());
        //实体类
        User doc = new User();
        //new Date()更新登陆时间
        doc.setLastLogin(new Date());
        //这一步进行成功之后在数据库保存生成的token操作
        userService.update(doc,wrappertoken);
        //返回状态
        HashMap<String, String> myMap = new HashMap<>();
        myMap.put("token", token);
        myMap.put("name", userjudje.getName());
        myMap.put("profile", userjudje.getProfile());
        myMap.put("email", userjudje.getEmail());
        myMap.put("userid", userjudje.getUserId().toString());
        return Result.succ(200,"成功登陆",myMap);
//        return Result.succ(200,"成功登陆",token);
    }

    @ApiOperation(value = "验证Token")
    @ApiImplicitParam(name = "request",value = "header里的token值",required = true)
    @GetMapping("/checkToken")
    public Boolean checkToken(HttpServletRequest request){
        String token = request.getHeader("token");
        return JwtUtil.checkToken(token);
    }


}
