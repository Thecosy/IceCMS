package com.ttice.icepayment.service;

import com.ttice.icepayment.entity.OrderInfo;
import com.ttice.icepayment.enums.OrderStatus;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

public interface OrderInfoService extends IService<OrderInfo> {

    OrderInfo createOrderByWxProductId(Long productId , String payMent);

    OrderInfo createOrderTempByWxResourceId(Long productId , String payMent);

    OrderInfo createOrderByAliProductId(Long productId , String payMent);

    OrderInfo createOrderTempByAliResourceId(Long productId , String payMent);

    void saveCodeUrl(String orderNo, String codeUrl,String payMent);

    List<OrderInfo> listOrderByCreateTimeDesc();

    void updateStatusByOrderNo(String orderNo, OrderStatus orderStatus);

    String getOrderStatus(String orderNo);

    List<OrderInfo> getNoPayOrderByDuration(int minutes);

    OrderInfo getOrderByOrderNo(String orderNo);
}
