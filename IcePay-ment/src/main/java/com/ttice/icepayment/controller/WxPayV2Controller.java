package com.ttice.icepayment.controller;

import com.ttice.icepayment.config.WxPayConfig;
import com.ttice.icepayment.entity.OrderInfo;
import com.ttice.icepayment.enums.OrderStatus;
import com.ttice.icepayment.service.OrderInfoService;
import com.ttice.icepayment.service.PaymentInfoService;
import com.ttice.icepayment.service.WxPayService;
import com.ttice.icepayment.util.HttpUtils;
import com.ttice.icepayment.vo.R;
import com.github.wxpay.sdk.WXPayUtil;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.locks.ReentrantLock;

@CrossOrigin //跨域
@RestController
@RequestMapping("/Pay-api/wx-pay-v2")
@io.swagger.annotations.Api(tags = "微信支付APIv2")
@Slf4j
public class WxPayV2Controller {

    @Resource
    private WxPayService wxPayService;

    @Resource
    private WxPayConfig wxPayConfig;

    @Resource
    private OrderInfoService orderInfoService;

    @Resource
    private PaymentInfoService paymentInfoService;

    private final ReentrantLock lock = new ReentrantLock();


    /**
     * Native下单(临时）
     * @param productId
     * @return
     * @throws Exception
     */
    @ApiOperation("调用统一下单API，生成支付二维码（临时）")
    @PostMapping("/temp-native/{productId}")
    public R createNativeTemp(@PathVariable Long productId, HttpServletRequest request) throws Exception {

        log.info("发起支付请求 v2");

        String remoteAddr = request.getRemoteAddr();
        Map<String, Object> map = wxPayService.nativePayV2(productId, remoteAddr);
        return R.ok().setData(map);
    }
    /**
     * Native下单(登陆）
     * @param productId
     * @return
     * @throws Exception
     */
    @ApiOperation("调用统一下单API，生成支付二维码（登陆）")
    @PostMapping("/login-native/{productId}")
    public R createNativeLogin(@PathVariable Long productId, HttpServletRequest request) throws Exception {

        log.info("发起支付请求 v2");

        String remoteAddr = request.getRemoteAddr();
        Map<String, Object> map = wxPayService.nativePayV2(productId, remoteAddr);
        return R.ok().setData(map);
    }
    /**
     * Native下单(调试）
     * @param productId
     * @return
     * @throws Exception
     */
    @ApiOperation("调用统一下单API，生成支付二维码（调试）")
    @PostMapping("/test-native/{productId}")
    public R createNativeTest(@PathVariable Long productId, HttpServletRequest request) throws Exception {

        log.info("发起支付请求 v2");

        String remoteAddr = request.getRemoteAddr();
        Map<String, Object> map = wxPayService.nativePayV2(productId, remoteAddr);
        return R.ok().setData(map);
    }

    /**
     * 支付通知
     * 微信支付通过支付通知接口将用户支付成功消息通知给商户
     */
    @ApiOperation("支付通知")
    @PostMapping("/native/notify")
    public String wxNotify(HttpServletRequest request) throws Exception {

        System.out.println("微信发送的回调");
        Map<String, String> returnMap = new HashMap<>();//应答对象

        //处理通知参数
        String body = HttpUtils.readData(request);

        //验签
        if(!WXPayUtil.isSignatureValid(body, wxPayConfig.getPartnerKey())) {
            log.error("通知验签失败");
            //失败应答
            returnMap.put("return_code", "FAIL");
            returnMap.put("return_msg", "验签失败");
            String returnXml = WXPayUtil.mapToXml(returnMap);
            return returnXml;
        }

        //解析xml数据
        Map<String, String> notifyMap = WXPayUtil.xmlToMap(body);
        //判断通信和业务是否成功
        if(!"SUCCESS".equals(notifyMap.get("return_code")) || !"SUCCESS".equals(notifyMap.get("result_code"))) {
            log.error("失败");
            //失败应答
            returnMap.put("return_code", "FAIL");
            returnMap.put("return_msg", "失败");
            String returnXml = WXPayUtil.mapToXml(returnMap);
            return returnXml;
        }

        //获取商户订单号
        String orderNo = notifyMap.get("out_trade_no");
        OrderInfo orderInfo = orderInfoService.getOrderByOrderNo(orderNo);
        //并校验返回的订单金额是否与商户侧的订单金额一致
        if (orderInfo != null && orderInfo.getTotalFee() != Long.parseLong(notifyMap.get("total_fee"))) {
            log.error("金额校验失败");
            //失败应答
            returnMap.put("return_code", "FAIL");
            returnMap.put("return_msg", "金额校验失败");
            String returnXml = WXPayUtil.mapToXml(returnMap);
            return returnXml;
        }

        //处理订单
        if(lock.tryLock()){
            try {
                //处理重复的通知
                //接口调用的幂等性：无论接口被调用多少次，产生的结果是一致的。
                String orderStatus = orderInfoService.getOrderStatus(orderNo);
                if(OrderStatus.NOTPAY.getType().equals(orderStatus)){
                    //更新订单状态
                    orderInfoService.updateStatusByOrderNo(orderNo, OrderStatus.SUCCESS);

                    //记录支付日志
                    paymentInfoService.createWxPaymentInfo(body);
                }
            } finally {
                //要主动释放锁
                lock.unlock();
            }
        }

        returnMap.put("return_code", "SUCCESS");
        returnMap.put("return_msg", "OK");
        String returnXml = WXPayUtil.mapToXml(returnMap);
        log.info("支付成功，已应答");
        return returnXml;
    }
}