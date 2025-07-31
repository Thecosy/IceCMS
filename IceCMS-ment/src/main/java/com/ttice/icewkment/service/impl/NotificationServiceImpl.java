package com.ttice.icewkment.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ttice.icewkment.entity.Notification;
import com.ttice.icewkment.mapper.NotificationMapper;
import com.ttice.icewkment.service.NotificationService;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl extends ServiceImpl<NotificationMapper, Notification> implements NotificationService {
} 