package com.ttice.icewkment.controller;

import cn.hutool.core.lang.Assert;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.ttice.icewkment.Util.JwtUtil;
import com.ttice.icewkment.commin.lang.Result;
import com.ttice.icewkment.entity.OrderInfo;
import com.ttice.icewkment.entity.Role;
import com.ttice.icewkment.entity.User;
import com.ttice.icewkment.entity.UserRole;
import com.ttice.icewkment.mapper.RoleMapper;
import com.ttice.icewkment.mapper.UserMapper;
import com.ttice.icewkment.mapper.UserRoleMapper;
import com.ttice.icewkment.mapper.VipOrderInfoMapper;
import com.ttice.icewkment.service.UserService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@io.swagger.annotations.Api(tags = "用户登陆验证接口")
@RestController
@RequestMapping("/User")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserRoleMapper userRoleMapper;

    @Autowired
    private RoleMapper roleMapper;

    @Autowired
    private VipOrderInfoMapper vipOrderInfoMapper;

    @ApiOperation(value = "后台登陆")
    @ApiImplicitParam(name = "user",value = "用户对象",required = true)
    @GetMapping("/loginAdmin")//登陆
    public Result loginAdmin(User user) {
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

        //判断账号是否是管理员权限
        Integer userId = userjudje.getUserId();

        QueryWrapper<UserRole> UserRolewrapper = new QueryWrapper<>();
        //用户名判断
        UserRolewrapper.eq("user_id", userId);
        UserRole userRole = userRoleMapper.selectOne(UserRolewrapper);

        Integer roleId = userRole.getRoleId();

        QueryWrapper<Role> Rolewrapper = new QueryWrapper<>();
        //用户名判断
        Rolewrapper.eq("id", roleId);
        Role role = roleMapper.selectOne(Rolewrapper);

        String name = role.getName();
        if (Objects.equals(name, "管理员")){

            return Result.succ(200,"成功登陆",myMap);
        }else{
            return Result.fail(("无权限"));
        }

    }

    @ApiOperation(value = "登陆")
    @ApiImplicitParam(name = "user",value = "用户对象",required = true)
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
    }

    @ApiOperation(value = "注册账号")
    @ApiImplicitParam(name = "Newuser",value = "用户对象",required = true)
    @GetMapping("/Create")
    public Result Create(User Newuser) {

        //检查用户名是否重复
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("USERNAME",Newuser.getUsername());
        Integer Count = userMapper.selectCount(wrapper);
        if (Count >= 1){
            return Result.fail(("用户名重复"));
        }
        //用户名判断
        User user = new User();

        user.setUsername(Newuser.getUsername());
        user.setPassword(Newuser.getPassword());
        //默认信息
        user.setIntro("这个人很懒，什么都没有留下！");
        user.setCreated(new Date());
        user.setUsername("新用户");
        //会员禁用
        user.setVipDisableTip(true);

        userMapper.insert(user);

        //赋予订阅者权限
        UserRole userRole = new UserRole();
        userRole.setRoleId(1);
        userRole.setUserId(user.getUserId());
        userRoleMapper.insert(userRole);

        //添加token
        String token = JwtUtil.createToken(user.getUserId());
        //根据userid获取QueryWrapper对象
        QueryWrapper<User> wrappertoken = new QueryWrapper<>();
        wrappertoken.eq("user_id", user.getUserId());
        //实体类
        User doc = new User();
        //new Date()更新登陆时间
        doc.setLastLogin(new Date());
        //这一步进行成功之后在数据库保存生成的token操作
        userService.update(doc, wrappertoken);
        //返回状态
        HashMap<String, String> myMap = new HashMap<>();
        myMap.put("token", token);
        myMap.put("name", user.getName());
        myMap.put("profile", user.getProfile());
        myMap.put("email", user.getEmail());
        myMap.put("userid", user.getUserId().toString());

        return Result.succ(200, "成功注册", myMap);
    }

    @ApiOperation(value = "根据用户id获取用户信息")
    @ApiImplicitParam(name = "id",value = "id",required = true)
    @GetMapping("/GetUserInfoByid/{id}")
    public User GetUserInfoByid(
            @PathVariable("id") String id
    ){
       QueryWrapper<User> wrapper = new QueryWrapper<>();
       wrapper.eq("user_id",id);
        return userMapper.selectOne(wrapper);
    }

    @ApiOperation(value = "修改用户信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "user",value = "用户对象",required = true),
            @ApiImplicitParam(name = "jwt",value = "jwt",required = true)
    })
    @PostMapping("/ChangeUser/{jwt}")
    public Result ChangeUser(
            @RequestBody User user,
            @PathVariable("jwt") String jwt
    ){
        //登陆状态检验jwt
        if(org.apache.commons.lang.StringUtils.isEmpty(jwt)){
            //前端接收后进行处理
            Result.fail(403,"jwt为空",null);
        }else{
            //校验jwt
            boolean claims = JwtUtil.checkToken(jwt);
            //校验是否为空和时间是否过期
            //如果过期了就真的没有一点退路了吗？
            if(!claims){
                //前端接收后进行处理
                Result.fail(403,"Token已过期",null);
            }
            userMapper.updateById(user);
            return  Result.succ(200, "修改成功", null);
        }
        return Result.fail(400,"失败",null);
    }

    @ApiOperation(value = "修改密码")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "jwt",value = "jwt",required = true),
            @ApiImplicitParam(name = "yuanPassWord",value = "原密码",required = true),
            @ApiImplicitParam(name = "NewPassWord",value = "新密码",required = true),
            @ApiImplicitParam(name = "userid",value = "用户id",required = true)
    })
    @PostMapping("/ChangePassword/{jwt}/{yuanPassWord}/{NewPassWord}/{userid}")
    public Result ChangePassword(
            @PathVariable("jwt") String jwt,
            @PathVariable("yuanPassWord") String yuanPassWord,
            @PathVariable("NewPassWord") String NewPassWord,
            @PathVariable("userid") Integer userid
    ){
        //登陆状态检验jwt
        if(org.apache.commons.lang.StringUtils.isEmpty(jwt)){
            //前端接收后进行处理
            Result.fail(403,"jwt为空",null);
        }else{
            //校验jwt
            boolean claims = JwtUtil.checkToken(jwt);
            //校验是否为空和时间是否过期
            //如果过期了就真的没有一点退路了吗？
            if(!claims){
                //前端接收后进行处理
                Result.fail(403,"Token已过期",null);
            }
            //验证之前密码是否正确
            QueryWrapper<User> wrapper = new QueryWrapper<>();
            wrapper.eq("user_id",userid);
            User usercheak = userMapper.selectOne(wrapper);
            String password = usercheak.getPassword();
            if(Objects.equals(password, yuanPassWord)) {
                User user = new User();
                user.setUserId(userid);
                user.setPassword(NewPassWord);
                userMapper.updateById(user);
                return Result.succ(200, "修改成功", null);
            }
                return Result.fail(400,"原密码不正确",null);

        }
        return Result.fail(402,"失败",null);
    }

    @ApiOperation(value = "绑定邮箱")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "jwt",value = "jwt",required = true),
            @ApiImplicitParam(name = "email",value = "邮箱",required = true),
            @ApiImplicitParam(name = "userid",value = "用户id",required = true)
    })
    @PostMapping("/CreateEmail/{jwt}/{email}/{userid}")
    public Result CreateEmail(
            @PathVariable("jwt") String jwt,
            @PathVariable("email") String email,
            @PathVariable("userid") Integer userid
    ){
        //登陆状态检验jwt
        if(org.apache.commons.lang.StringUtils.isEmpty(jwt)){
            //前端接收后进行处理
            Result.fail(403,"jwt为空",null);
        }else{
            //校验jwt
            boolean claims = JwtUtil.checkToken(jwt);
            //校验是否为空和时间是否过期
            //如果过期了就真的没有一点退路了吗？
            if(!claims){
                //前端接收后进行处理
                Result.fail(403,"Token已过期",null);
            }
            //验证是否绑定过邮箱

                User user = new User();
                user.setUserId(userid);
                user.setEmail(email);
                userMapper.updateById(user);
                return Result.succ(200, "修改成功", null);


        }
        return Result.fail(402,"失败",null);
    }

    @ApiOperation(value = "修改名称")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "jwt",value = "jwt",required = true),
            @ApiImplicitParam(name = "name",value = "名称",required = true),
            @ApiImplicitParam(name = "userid",value = "用户id",required = true)
    })
    @PostMapping("/ChangeName/{jwt}/{name}/{userid}")
    public Result ChangeName(
            @PathVariable("jwt") String jwt,
            @PathVariable("name") String name,
            @PathVariable("userid") Integer userid
    ){
        //登陆状态检验jwt
        if(org.apache.commons.lang.StringUtils.isEmpty(jwt)){
            //前端接收后进行处理
            Result.fail(403,"jwt为空",null);
        }else{
            //校验jwt
            boolean claims = JwtUtil.checkToken(jwt);
            //校验是否为空和时间是否过期
            //如果过期了就真的没有一点退路了吗？
            if(!claims){
                //前端接收后进行处理
                Result.fail(403,"Token已过期",null);
            }
            //验证是否绑定过邮箱

            User user = new User();
            user.setUserId(userid);
            user.setName(name);
            userMapper.updateById(user);
            return Result.succ(200, "修改成功", null);


        }
        return Result.fail(402,"失败",null);
    }

    @ApiOperation(value = "验证Token")
    @ApiImplicitParam(name = "request",value = "header里的token值",required = true)
    @GetMapping("/checkToken")
    public Boolean checkToken(HttpServletRequest request){
        String token = request.getHeader("token");
        return JwtUtil.checkToken(token);
    }

    @ApiOperation(value = "积分充值")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id",value = "id",required = true),
            @ApiImplicitParam(name = "integral",value = "积分",required = true),
            @ApiImplicitParam(name = "order",value = "订单",required = true)
    })
    @GetMapping("/UpdateIntegral/{id}/{integral}/{order}")
    public Result UpdateIntegral(
            @PathVariable("id") Integer id,
            @PathVariable("integral") Integer integral,
            @PathVariable("order") String order
    ){
            //根据订单号检测是否购买成功
            QueryWrapper<OrderInfo> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("order_no", order);
            OrderInfo orderInfo = vipOrderInfoMapper.selectOne(queryWrapper);
            if(orderInfo == null){
                return Result.fail(("失败"));
            }
            String orderStatus = orderInfo.getOrderStatus();
             Boolean alreadyDone = orderInfo.getAlreadyDone();
             //判断，只修改一次
            if(Boolean.TRUE.equals(alreadyDone)){
                return Result.fail(("已经修改过"));
            }
            if(orderStatus.equals("支付成功")){
                UpdateWrapper<User> updateWrapper = new UpdateWrapper<>();
                updateWrapper.eq("user_id",id);

                User user1 = userMapper.selectOne(updateWrapper);
                Integer integral1 = user1.getIntegral();
                User user = new User();
                user.setIntegral(integral+integral1);
                userMapper.update(user,updateWrapper);

                UpdateWrapper<OrderInfo> updateorderWrapper = new UpdateWrapper<>();
                updateorderWrapper.eq("order_no",order);

                OrderInfo orderInfo1 = new OrderInfo();
                orderInfo1.setAlreadyDone(true);
                vipOrderInfoMapper.update(orderInfo1,updateorderWrapper);

                return Result.succ(200,"修改成功",null);
            }else{
                return Result.fail(("暂未支付"));
            }
    }

    @ApiOperation(value = "会员充值")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id",value = "id",required = true),
            @ApiImplicitParam(name = "payid",value = "支付id",required = true),
            @ApiImplicitParam(name = "order",value = "订单",required = true)
    })
    @GetMapping("/CreateVip/{id}/{payid}/{order}")
    public Result CreateVip(
            @PathVariable("id") Integer id,
            @PathVariable("payid") Integer payid,
            @PathVariable("order") String order
    ){
        //根据订单号检测是否购买成功
        QueryWrapper<OrderInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("order_no", order);
        OrderInfo orderInfo = vipOrderInfoMapper.selectOne(queryWrapper);
        if(orderInfo == null){
            return Result.fail(("失败"));
        }
        String orderStatus = orderInfo.getOrderStatus();
        Boolean alreadyDone = orderInfo.getAlreadyDone();
        //判断，只修改一次
        if(Boolean.TRUE.equals(alreadyDone)){
            return Result.fail(("已经修改过"));
        }
        if(orderStatus.equals("支付成功")){
            //查看充值月份
            int months = 0;
            if(payid == 2){
                 months = 1;
            }
            if(payid == 3){
                months = 6;
            }
            if(payid == 4){
                 months = 12;
            }
            //设置过期时间
            LocalDateTime date = LocalDateTime.now(); // java8 当前时间
            LocalDateTime oneMonthLater = date.plusMonths(months); // months个月之后的时间
            Date expireDate = Date.from(oneMonthLater.atZone(ZoneId.systemDefault()).toInstant()); // LocalDateTime 转换为 Date
            Date nowDate = Date.from(date.atZone(ZoneId.systemDefault()).toInstant());

            //配置时间字段
            UpdateWrapper<User> updateWrapper = new UpdateWrapper<>();
            updateWrapper.eq("user_id",id);

            //配置数据库vip字段标识
            User userSet = new User();
            userSet.setVipDisableTip(false);
            userSet.setVipExpireDate(expireDate);
            userSet.setVipValidDate(nowDate);
            userMapper.update(userSet,updateWrapper);
            //订单已完成
            UpdateWrapper<OrderInfo> updateorderWrapper = new UpdateWrapper<>();
            updateorderWrapper.eq("order_no",order);

            OrderInfo orderInfo1 = new OrderInfo();
            orderInfo1.setAlreadyDone(true);
            vipOrderInfoMapper.update(orderInfo1,updateorderWrapper);

            return Result.succ(200,"修改成功",null);
        }else{
            return Result.fail(("暂未支付"));
        }
    }

    @ApiOperation(value = "检测会员是否有效")
    @ApiImplicitParam(name = "id",value = "id",required = true)
    @GetMapping("/CheckVip/{id}")
    public Boolean CheckVip(
            @PathVariable("id") Integer id
    ){
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id",id);

        User user = userMapper.selectOne(queryWrapper);
        Boolean vip_disableTip = user.getVipDisableTip();
        Date expireDate = user.getVipExpireDate();

        //判断逻辑
        //1.vip_disableTip字段判断
        if(vip_disableTip == null){
            //未开通会员
            return false;
        }
        if(vip_disableTip){
            //会员为false状态
            return false;
        }
            //2.日期判断
            int i = new Date().compareTo(expireDate);
            if (i > 0) { // 已经过了会员有效期，disableTip=false
                
                //把数据库中的vip_disableTip字段设置为true
                UpdateWrapper<User> updateWrapper = new UpdateWrapper<>();
                updateWrapper.eq("user_id",id);
                User user1 = new User();
                user1.setUserId(id);
                user1.setVipDisableTip(true);
                userMapper.update(user1,updateWrapper);

                return false;
            } else { // 还未过期 disableTip=true
                    return true;
            }

    }
}
