package com.ttice.icewkment.controller.backend;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ttice.icewkment.commin.lang.Result;
import com.ttice.icewkment.entity.Notification;
import com.ttice.icewkment.mapper.NotificationMapper;
import com.ttice.icewkment.service.NotificationService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/Notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private NotificationMapper notificationMapper;

    @ApiOperation(value = "创建通知")
    @PostMapping("/addNotification")
    public Result addNotification(@RequestBody Notification notification) {
        // 设置初始状态为草稿
        if (notification.getStatus() == null) {
            notification.setStatus(0);
        }
        
        // 设置未读状态
        notification.setIsRead(0);
        
        // 手动设置创建时间和更新时间
        Date now = new Date();
        notification.setCreateTime(now);
        notification.setUpdateTime(now);
        
        return Result.succ(notificationService.save(notification));
    }

    @ApiOperation(value = "获取通知列表")
    @GetMapping("/getNotificationList")
    public Result getNotificationList(
            @ApiParam(value = "当前页码", required = true) @RequestParam(defaultValue = "1") Integer currentPage,
            @ApiParam(value = "每页显示数量", required = true) @RequestParam(defaultValue = "10") Integer pageSize,
            @ApiParam(value = "通知类型") @RequestParam(required = false) Integer type,
            @ApiParam(value = "通知状态") @RequestParam(required = false) Integer status) {
        
        Page<Notification> page = new Page<>(currentPage, pageSize);
        QueryWrapper<Notification> queryWrapper = new QueryWrapper<>();
        
        // 添加查询条件
        if (type != null) {
            queryWrapper.eq("type", type);
        }
        
        if (status != null) {
            queryWrapper.eq("status", status);
        }
        
        // 按创建时间倒序排序
        queryWrapper.orderByDesc("create_time");
        
        Page<Notification> pageData = notificationService.page(page, queryWrapper);
        
        return Result.succ(pageData);
    }

    @ApiOperation(value = "获取通知详情")
    @GetMapping("/getNotification/{id}")
    public Result getNotification(@PathVariable("id") Integer id) {
        return Result.succ(notificationService.getById(id));
    }

    @ApiOperation(value = "更新通知")
    @PostMapping("/updateNotification")
    public Result updateNotification(@RequestBody Notification notification) {
        return Result.succ(notificationService.updateById(notification));
    }

    @ApiOperation(value = "删除通知")
    @GetMapping("/deleteNotification/{id}")
    public Result deleteNotification(@PathVariable("id") Integer id) {
        return Result.succ(notificationService.removeById(id));
    }

    @ApiOperation(value = "发送通知")
    @GetMapping("/sendNotification/{id}")
    public Result sendNotification(@PathVariable("id") Integer id) {
        Notification notification = notificationService.getById(id);
        if (notification == null) {
            return Result.fail("通知不存在");
        }
        
        // 更新状态为已发送
        notification.setStatus(1);
        
        // 更新发送时间
        notification.setUpdateTime(new Date());
        
        notificationService.updateById(notification);
        
        return Result.succ("通知发送成功");
    }

    @ApiOperation(value = "批量删除通知")
    @PostMapping("/batchDeleteNotification")
    public Result batchDeleteNotification(@RequestBody List<Integer> ids) {
        return Result.succ(notificationService.removeByIds(ids));
    }
    
    @ApiOperation(value = "获取未读通知")
    @GetMapping("/getUnreadNotifications")
    public Result getUnreadNotifications() {
        QueryWrapper<Notification> queryWrapper = new QueryWrapper<>();
        // 只获取已发送的通知
        queryWrapper.eq("status", 1);
        // 只获取未读的通知
        queryWrapper.eq("is_read", 0);
        // 按创建时间倒序排序，最新的在前面
        queryWrapper.orderByDesc("create_time");
        
        List<Notification> notifications = notificationService.list(queryWrapper);
        
        return Result.succ(notifications);
    }
    
    @ApiOperation(value = "标记通知为已读")
    @GetMapping("/markAsRead/{id}")
    public Result markAsRead(@PathVariable("id") Integer id) {
        Notification notification = notificationService.getById(id);
        if (notification == null) {
            return Result.fail("通知不存在");
        }
        
        notification.setIsRead(1);
        notificationService.updateById(notification);
        
        return Result.succ("标记已读成功");
    }
    
    @ApiOperation(value = "标记所有通知为已读")
    @GetMapping("/markAllAsRead")
    public Result markAllAsRead() {
        QueryWrapper<Notification> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("is_read", 0);
        
        List<Notification> notifications = notificationService.list(queryWrapper);
        for (Notification notification : notifications) {
            notification.setIsRead(1);
            notificationService.updateById(notification);
        }
        
        return Result.succ("全部标记已读成功");
    }
} 