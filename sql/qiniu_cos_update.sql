-- 添加七牛云相关字段到s_cos_info表
ALTER TABLE `s_cos_info` 
ADD COLUMN `storage_type` INT DEFAULT 1 COMMENT '存储类型：1-本地，2-腾讯云，3-七牛云',
ADD COLUMN `qiniu_access_key` VARCHAR(255) DEFAULT NULL COMMENT '七牛云accessKey',
ADD COLUMN `qiniu_secret_key` VARCHAR(255) DEFAULT NULL COMMENT '七牛云secretKey',
ADD COLUMN `qiniu_bucket_name` VARCHAR(255) DEFAULT NULL COMMENT '七牛云存储空间名称',
ADD COLUMN `qiniu_domain` VARCHAR(255) DEFAULT NULL COMMENT '七牛云域名';

-- 更新现有记录的存储类型
UPDATE `s_cos_info` SET `storage_type` = 2 WHERE `is_cos` = 1;
UPDATE `s_cos_info` SET `storage_type` = 1 WHERE `is_cos` = 0 OR `is_cos` IS NULL;

-- 添加示例七牛云配置（根据需要修改或删除）
-- INSERT INTO `s_cos_info` (`id`, `storage_type`, `qiniu_access_key`, `qiniu_secret_key`, `qiniu_bucket_name`, `qiniu_domain`) 
-- VALUES (1, 3, 'l2yQr9jVkoiWocAdF6rCCjc7qd2p0guGOOl0q6Ab', 'fwTqX4lGvZxpewHxOnVCXXlSXE4mED8AARdNq9Fv', 'resment', 'img3.icecmspro.com'); 