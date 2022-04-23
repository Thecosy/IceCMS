package com.ttice.icepayment.controller;

import com.ttice.icepayment.entity.OrderInfo;
import com.ttice.icepayment.enums.OrderStatus;
import com.ttice.icepayment.service.OrderInfoService;
import com.ttice.icepayment.vo.R;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@CrossOrigin //开放前端的跨域访问
@io.swagger.annotations.Api(tags = "商品订单管理")
@RestController
@RequestMapping("/Pay-api/order-info")
public class OrderInfoController {

    @Resource
    private OrderInfoService orderInfoService;

    @ApiOperation("订单列表")
    @GetMapping("/list")
    public R list(){

        List<OrderInfo> list = orderInfoService.listOrderByCreateTimeDesc();
        return R.ok().data("list", list);
    }


    /**
     * 查询本地订单状态
     * @param userid,resourceid
     * @return
     */
    @ApiOperation("查询本地订单状态(userid和resourceid)")
    @GetMapping("/query-order-status-Bytrue/{userid}/{resourceid}")
    public R queryOrderStatusBytrue(@PathVariable String userid,@PathVariable String resourceid){

        String orderStatus = orderInfoService.getOrderStatusBytrue(userid,resourceid);
        if(OrderStatus.SUCCESS.getType().equals(orderStatus)){
            return R.ok().setMessage("支付成功"); //支付成功
        }

        return R.error().setCode(101).setMessage("没有支付");
    }

    /**
     * 查询本地订单状态
     * @param orderNo
     * @return
     */
    @ApiOperation("根据订单号查询本地订单状态")
    @GetMapping("/query-order-status/{orderNo}")
    public R queryOrderStatus(@PathVariable String orderNo){

        String orderStatus = orderInfoService.getOrderStatus(orderNo);
        if(OrderStatus.SUCCESS.getType().equals(orderStatus)){
            return R.ok().setMessage("支付成功"); //支付成功
        }

        return R.ok().setCode(101).setMessage("支付中......");
    }



}
