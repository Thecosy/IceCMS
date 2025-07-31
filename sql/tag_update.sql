-- 为all_tag表添加color和effect字段
ALTER TABLE `all_tag` 
ADD COLUMN `color` VARCHAR(50) DEFAULT NULL COMMENT '标签颜色',
ADD COLUMN `effect` VARCHAR(20) DEFAULT 'light' COMMENT '标签效果';

-- 为现有标签添加随机颜色（可选执行）
UPDATE `all_tag` SET 
  `color` = ELT(FLOOR(1 + RAND() * 10), 
    '#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399', 
    '#8E44AD', '#16A085', '#FF9800', '#795548', '#607D8B'),
  `effect` = 'light'
WHERE `color` IS NULL; 