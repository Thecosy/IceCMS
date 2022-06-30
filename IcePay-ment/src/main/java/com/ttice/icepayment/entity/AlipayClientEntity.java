package com.ttice.icepayment.entity;

import lombok.Data;

/**
 * @author ：Jiaxl
 * @version : V1.0
 * @date ：Created in 2019/12/18
 * @description: AlipayClent 初始化参数设置
 */
@Data
public class AlipayClientEntity {

//    @ApiModelProperty(value = "收款账户的app_id")
    private String appId;

//    @ApiModelProperty(value = "收款账户私钥")
    private String privateKey;

//    @ApiModelProperty(value = "AliPay公钥")
    private String alipayPublicKey;

//    @ApiModelProperty(value = "签名方式")
    private String signType = "RSA2";

//    @ApiModelProperty(value = "字符编码格式")
    private String charset = "utf-8";

//    @ApiModelProperty(value = "字符编码格式")
    private String contentType = "json";


    // @ApiModelProperty(value = "支付宝网管 -- 生产环境")
     private String gatewayUrl = "https://openapi.alipay.com/gateway.do";

    //    @ApiModelProperty(value = "支付宝网管 -- 测试环境")
    //    private String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";
}
