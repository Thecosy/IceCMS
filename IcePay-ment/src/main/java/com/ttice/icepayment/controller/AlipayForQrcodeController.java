package com.ttice.icepayment.controller;

import com.alipay.api.AlipayApiException;
import com.ttice.icepayment.config.AlipayConfig;
import com.ttice.icepayment.entity.AlipayClientEntity;
import com.ttice.icepayment.service.AlipayService;
import com.ttice.icepayment.vo.R;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Map;
import java.util.Objects;

/**
 * @author ：Jiaxl
 * @version : V1.0
 * @date ：Created in 2019/12/18
 * @description: 支付宝扫二维码支付相关业务
 */
@CrossOrigin //开放前端的跨域访问
@RestController
@RequestMapping("/Pay-api/ali-pay")
@io.swagger.annotations.Api(tags = "支付宝支付API")
public class AlipayForQrcodeController {

    @Autowired
    private AlipayService alipayService;

    @Autowired
    private AlipayConfig alipayConfig;

    /**
     * @description : 生成支付宝二维码（临时）
     * @author : Jiaxl
     * @date : 2019/12/18
     * @return : java.lang.String
     */
    @ApiOperation("调用统一下单API，生成支付二维码（临时）")
    @PostMapping(value = "/temp-ftof/{resourceId}")
    public R buildAlipayQrcodeUrlTemp(@PathVariable Long resourceId) throws Exception {

        //返回支付二维码连接和订单号
        Map<String, Object> map = alipayService.ftofTempPay(resourceId);

        return R.ok().setData(map);
    }
    /**
     * @description : 生成支付宝二维码（登陆）
     * @author : Jiaxl
     * @date : 2019/12/18
     * @return : java.lang.String
     */
    @ApiOperation("调用统一下单API，生成支付二维码（登陆）")
    @PostMapping(value = "/login-ftof/{resourceId}/{userid}")
    public R buildAlipayQrcodeUrlLogin(
            @PathVariable Long resourceId,
            @PathVariable Integer userid) throws Exception {

        //返回支付二维码连接和订单号
        Map<String, Object> map = alipayService.ftofLoginPay(resourceId,userid);

        return R.ok().setData(map);
    }
    /**
     * @description : 生成支付宝二维码（测试）
     * @author : Jiaxl
     * @date : 2019/12/18
     * @return : java.lang.String
     */
    @ApiOperation("调用统一下单API，生成支付二维码（测试）")
    @PostMapping(value = "/test-ftof/{productId}")
    public R buildAlipayQrcodeUrlTest(@PathVariable Long productId) throws Exception {

        //返回支付二维码连接和订单号
        Map<String, Object> map = alipayService.ftofPay(productId);

        return R.ok().setData(map);
    }


    /**
     * 用户取消订单
     * @param orderNo
     * @return
     * @throws Exception
     */
    @ApiOperation("用户取消订单")
    @PostMapping("/cancel/{orderNo}")
    public R cancel(@PathVariable String orderNo) throws Exception {

        alipayService.cancelOrder(orderNo);
        return R.ok().setMessage("订单已取消");
    }

    /**
     * @description : 支付宝同步回调
     * @author : Jiaxl
     * @date : 2019/12/18
     * @param : request
     * @param : response
     * @return : java.lang.String
     */
    @ApiOperation("支付宝同步回调")
    @PostMapping(value = "/alipay/return")
    public void alipayReturn(HttpServletRequest request, HttpServletResponse response) {
        // 填充 alipayClientEntity
        AlipayClientEntity alipayClientEntity = new AlipayClientEntity();
        alipayClientEntity.setAlipayPublicKey(alipayConfig.getALIPAY_PUBLIC_KEY());
        try {
            // 验证签名订单是否为当前用户的
            if(alipayService.alipayCheckSign(request, alipayClientEntity)){
                // 获取订单号
                String orderNo = request.getParameter("out_trade_no");

                String tradeStatus = request.getParameter("trade_status");

                Objects.requireNonNull(orderNo,"orderNo 不能为空");
                Objects.requireNonNull(tradeStatus,"tradeStatus 不能为空");

                if(AlipayConfig.TRADE_SUCCESS.equals(tradeStatus) ) {
                    // 根据订单号修改订单状态 业务
                    System.out.println("orderNo = " + orderNo + ", tradeStatus = " + tradeStatus);
                } else if(AlipayConfig.TRADE_FINISHED.equals(tradeStatus)){
                    // 根据订单号修改订单状态 业务
                    System.out.println("orderNo = " + orderNo + ", tradeStatus = " + tradeStatus);
                }
            }
            response.getWriter().write("success");
        }catch (AlipayApiException | IOException e){
            e.getMessage();
        }

    }

    /**
     * @description : 支付宝异步回调
     * @author : Jiaxl
     * @date : 2019/12/18
     * @param : request
     * @param : response
     * @return : java.lang.String
     */
    @ApiOperation("支付宝异步回调")
    @PostMapping(value = "/alipay/notify")
    public void alipayNotify(HttpServletRequest request, HttpServletResponse response) {
        // 填充 alipayClientEntity
        AlipayClientEntity alipayClientEntity = new AlipayClientEntity();
        alipayClientEntity.setAlipayPublicKey(alipayConfig.getALIPAY_PUBLIC_KEY());
        try {
            // 验证签名订单是否为当前用户的
            if(alipayService.alipayCheckSign(request, alipayClientEntity)){
                // 获取订单号
                String orderNo = request.getParameter("out_trade_no");
                /*
                交易状态 trade_status
                如果出现乱码进行转码 new String().getBytes("ISO-8859-1"),"UTF-8")
                WAIT_BUYER_PAY 交易创建，等待买家付款
                TRADE_CLOSED 未付款交易超时关闭，或支付完成后全额退款
                TRADE_SUCCESS 交易支付成功
                TRADE_FINISHED 交易结束，不可退款
                */
                String tradeStatus = request.getParameter("trade_status");

                Objects.requireNonNull(orderNo,"orderNo 不能为空");
                Objects.requireNonNull(tradeStatus,"tradeStatus 不能为空");

                if(AlipayConfig.TRADE_SUCCESS.equals(tradeStatus) ) {
                    //交易成功

                    //处理订单
                    alipayService.processOrder(orderNo,request);
                    // 根据订单号修改订单状态 业务
                    System.out.println("orderNo = " + orderNo + ", tradeStatus = " + tradeStatus);
                } else if(AlipayConfig.TRADE_FINISHED.equals(tradeStatus)){
                    // 根据订单号修改订单状态 业务
                    System.out.println("orderNo = " + orderNo + ", tradeStatus = " + tradeStatus);
                }
            }
            response.getWriter().write("success");
        }catch (AlipayApiException | IOException e){
            e.getMessage();
        } catch (GeneralSecurityException e) {
            e.printStackTrace();
        }

    }

    @ApiOperation("申请退款")
    @PostMapping("/refunds/{orderNo}/{reason}")
    public R refunds(@PathVariable String orderNo, @PathVariable String reason) throws Exception {
        alipayService.refund(orderNo, reason);
        return R.ok();
    }
}
