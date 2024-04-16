package com.ttice.icewkment.mapper;

import cn.hutool.db.sql.Order;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import com.ttice.icewkment.entity.ArticleClass;
import com.ttice.icewkment.entity.OrderInfo;
import org.springframework.stereotype.Repository;

/**
 * Mapper 接口
 *
 * @author admin
 * @since 2022-02-19
 */
@Repository
public interface VipOrderInfoMapper extends BaseMapper<OrderInfo> {}
