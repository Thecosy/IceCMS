-- 创建通知表
CREATE TABLE IF NOT EXISTS `notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `title` varchar(255) NOT NULL COMMENT '通知标题',
  `content` text NOT NULL COMMENT '通知内容',
  `type` int(1) NOT NULL DEFAULT '1' COMMENT '通知类型：1-系统通知，2-用户通知',
  `receiver_id` int(11) NOT NULL DEFAULT '0' COMMENT '接收者ID，0表示全部用户',
  `is_read` int(1) NOT NULL DEFAULT '0' COMMENT '是否已读：0-未读，1-已读',
  `create_time` datetime DEFAULT NULL COMMENT '通知创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '通知更新时间',
  `sender` varchar(255) DEFAULT '管理员' COMMENT '通知发送者',
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '通知状态：0-草稿，1-已发送',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='通知表';

-- 插入测试数据
INSERT INTO `notification` (`title`, `content`, `type`, `receiver_id`, `is_read`, `create_time`, `update_time`, `sender`, `status`)
VALUES
('系统更新通知', '系统将于2023年10月1日进行版本更新，请做好相关准备。', 1, 0, 0, NOW(), NOW(), '系统管理员', 1),
('账户安全提醒', '请定期修改您的账户密码，确保账户安全。', 1, 0, 0, NOW(), NOW(), '安全团队', 1),
('新功能上线', '我们新增了通知管理功能，欢迎体验！', 1, 0, 0, NOW(), NOW(), '产品团队', 1); 