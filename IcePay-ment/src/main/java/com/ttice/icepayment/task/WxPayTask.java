package com.ttice.icepayment.task;

import com.ttice.icepayment.entity.OrderInfo;
import com.ttice.icepayment.entity.RefundInfo;
import com.ttice.icepayment.service.AlipayService;
import com.ttice.icepayment.service.OrderInfoService;
import com.ttice.icepayment.service.RefundInfoService;
import com.ttice.icepayment.service.WxPayService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

@Slf4j
@Component
public class WxPayTask {

    @Resource
    private OrderInfoService orderInfoService;

    @Resource
    private WxPayService wxPayService;

    @Autowired
    private AlipayService aliPayService;

    @Resource
    private RefundInfoService refundInfoService;

    /**
     * 秒 分 时 日 月 周
     * 以秒为例
     * *：每秒都执行
     * 1-3：从第1秒开始执行，到第3秒结束执行
     * 0/3：从第0秒开始，每隔3秒执行1次
     * 1,2,3：在指定的第1、2、3秒执行
     * ?：不指定
     * 日和周不能同时制定，指定其中之一，则另一个设置为?
     */
    //@Scheduled(cron = "0/3 * * * * ?")
    public void task1(){
        log.info("task1 被执行......");
    }

    /**
     * 从第0秒开始每隔30秒执行1次，查询创建超过5分钟，并且未支付的订单
     */
    @Scheduled(cron = "0/30 * * * * ?")
    public void orderConfirm() throws Exception {
        log.info("orderConfirm 被执行......");

        //查询出超过一分钟未支付的订单
        List<OrderInfo> orderInfoList = orderInfoService.getNoPayOrderByDuration(3);

        for (OrderInfo orderInfo : orderInfoList) {
            String orderNo = orderInfo.getOrderNo();
            log.warn("超时订单 ===> {}", orderNo);

            //核实订单状态：调用微信/支付宝支付查单接口
            if(orderInfo.getPayMent().equals("微信")){
                wxPayService.checkOrderStatus(orderNo);
            }
            if(orderInfo.getPayMent().equals("支付宝")){
                System.out.println("支付宝去处理");
                aliPayService.checkOrderStatus(orderNo);
            }
        }
    }


    /**
     * 从第0秒开始每隔30秒执行1次，查询创建超过5分钟，并且未成功的退款单
     */
    @Scheduled(cron = "0/30 * * * * ?")
    public void refundConfirm() throws Exception {
        log.info("refundConfirm 被执行......");

        //找出申请退款超过3分钟并且未成功的退款单
        List<RefundInfo> refundInfoList = refundInfoService.getNoRefundOrderByDuration(3);

        for (RefundInfo refundInfo : refundInfoList) {
            String refundNo = refundInfo.getRefundNo();
            log.warn("超时未退款的退款单号 ===> {}", refundNo);

            //核实订单状态：调用微信/支付宝支付退款接口
            wxPayService.checkRefundStatus(refundNo);
            //TODO
//            if(refundInfo.getPayMent().equals("微信")){
//                wxPayService.checkRefundStatus(refundNo);
//            }
//            if(refundInfo.getPayMent().equals("支付宝")){
//                System.out.println("支付宝去处理");
//                aliPayService.checkOrderStatus(orderNo);
//            }
        }
    }

}
