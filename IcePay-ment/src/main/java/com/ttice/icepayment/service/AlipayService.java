package com.ttice.icepayment.service;

import com.alipay.api.AlipayApiException;
import com.ttice.icepayment.entity.AlipayClientEntity;
import com.ttice.icepayment.entity.AlipayTradeInfoEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.security.GeneralSecurityException;
import java.util.Map;

/**
 * @author ：Jiaxl
 * @version : V1.0
 * @date ：Created in 2019/12/18
 * @description: Alipay业务接口
 */
@Service
public interface AlipayService {

    Map<String, Object> ftofPay(Long productId) throws Exception;

    Map<String, Object> ftofTempPay(Long productId) throws Exception;

    /**
     * @description : 生成支付宝二维码
     * @author : Jiaxl
     * @date : 2019/12/18
     * @param : alipayClientEntity
     * @param : alipayTradeInfoEntity
     * @return : java.lang.String  获取支付宝返回接口中的qr_code,然后将支付地址返回到前台。
     * 引用qrcode.js对支付链接进行二维码生成：$('#qrcode').qrcode(${url});
     * 参考文档：https://www.jianshu.com/p/b53eae520de4
     */
     String buildAlipayUrl(AlipayClientEntity alipayClientEntity, AlipayTradeInfoEntity alipayTradeInfoEntity) throws AlipayApiException;

    /**
     * @description : Alipay 异步通知结果解析接口
     * @author : Jiaxl
     * @date : 2019/12/18
     * @param : request
     * @param : alipayClientEntity
     * @return : java.lang.Boolean
     */
    Boolean alipayCheckSign(HttpServletRequest request, AlipayClientEntity alipayClientEntity) throws AlipayApiException;

    /**
     * @description : 跳转支付宝支付页面
     * @author : Jiaxl
     * @date : 2019/12/18
     * @param : alipayClientEntity
     * @param : alipayTradeInfoEntity
     * @return : java.lang.String  获取支付宝返回接口中的qr_code,然后将支付地址返回到前台。
     * 引用qrcode.js对支付链接进行二维码生成：$('#qrcode').qrcode(${url});
     */
    String goAlipayPage(AlipayClientEntity alipayClientEntity, AlipayTradeInfoEntity alipayTradeInfoEntity) throws AlipayApiException;

    /**
     * @description : 查询支付宝支付订单状态：是否交易成功
     * @author : Jiaxl
     * @date : 2019/12/23
     * @param : alipayClientEntity
     * @param : orderId
     * @return : java.util.Map<java.lang.String,java.lang.Object>
     */
    Map<String,Object> getAlipayTradeStatus(AlipayClientEntity alipayClientEntity,String orderId) throws AlipayApiException;

    /**
     * 支付宝回调完成之后的订单处理
     * @param
     * @throws GeneralSecurityException
     */
    void processOrder(String orderNo,HttpServletRequest request) throws GeneralSecurityException;
    //支付宝定时任务接口验证
    void checkOrderStatus(String orderNo) throws Exception;
    //支付宝订单查询接口
    String queryOrder(String orderNo) throws Exception;
    //支付宝退款接口
    void refund(String orderNo, String reason) throws Exception;
    //支付宝查询接口
    void checkRefundStatus(String refundNo) throws Exception;
    //取消订单接口
    void cancelOrder(String orderNo) throws Exception;

}
