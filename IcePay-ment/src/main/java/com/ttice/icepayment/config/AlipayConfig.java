package com.ttice.icepayment.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * @author ：Jiaxl
 * @version : V1.0
 * @date ：Created in 2019/12/20
 * @description: 支付宝支付参数集合，沙箱测试账号配置信息，及AlipayClent 初始化参数设置
 */
@Configuration
@Component
@PropertySource("classpath:alipay.properties")
@ConfigurationProperties(prefix="alipay") //读取alipay节点
@Data //使用set方法将wxpay节点中的值填充到当前类的属性中
public class AlipayConfig {

    /**
     * 收款账户的app_id
     * */
    private String APP_ID;

    /**
     * 收款账户私钥
     * */
    private String PRIVATE_KEY;
    /**
     * 收款账户公钥
     * */
    private String PUBLIC_KEY;
    /**
     * AliPay公钥
     * */
    private String ALIPAY_PUBLIC_KEY;

    /**
     * 异步回调地址
     * */
    private String NOTIFY_URL;

    /**
     * 同步回调地址
     * */
    private String RETURN_URL;

    /**
     * 请求支付宝服务器网关域名(沙箱)
     */
    private String ALI_URL;

    /**
     * 该笔订单允许的最晚付款时间，逾期将关闭交易。取值范围：1m～15d。m-分钟，h-小时，d-天，1c-当天（1c-当天的情况下，无论交易何时创建，都在0点关闭）
     * */
    private String TIMEOUT_EXPRESS;

    /**
     * 交易创建，等待买家付款
     * */
    public static final String WAIT_BUYER_PAY = "WAIT_BUYER_PAY";

    /**
     * 未付款交易超时关闭，或支付完成后全额退款
     * */
    public static final String TRADE_CLOSED = "TRADE_CLOSED";

    /**
     * 交易支付成功
     * */
    public static final String TRADE_SUCCESS = "TRADE_SUCCESS";

    /**
     * 交易结束，不可退款
     * */
    public static final String TRADE_FINISHED = "TRADE_FINISHED";


    /**
     * 交易支付成功返回代码
     * */
    public static final String RETURN_CODE_SUCCESS = "10000";


    /**
     * 交易支付成功返回信息
     * */
    public static final String RETURN_MSG_SUCCESS = "Success";

}
