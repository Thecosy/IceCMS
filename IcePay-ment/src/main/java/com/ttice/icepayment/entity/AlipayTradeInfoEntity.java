package com.ttice.icepayment.entity;


import lombok.Data;

/**
 * @author ：Jiaxl
 * @version : V1.0
 * @date ：Created in 2019/12/18
 * @description: 支付宝支付页面信息 参考文档:https://docs.open.alipay.com/api_1/alipay.trade.page.pay
 */
@Data
public class AlipayTradeInfoEntity {
   /**
    * 订单号（唯一）
    * */
    private String outTradeNo;

    /**
     * 订单总金额，单位为元，精确到小数点后两位，取值范围[0.01,100000000]
     * 如果同时传入了【打折金额】，【不可打折金额】，【订单总金额】三者，则必须满足如下条件：【订单总金额】=【打折金额】+【不可打折金额】")
     */
    private String totalAmount;

   /**
    * 订单标题
    */
    private String subject;

    /**
    * 该笔订单允许的最晚付款时间，逾期将关闭交易。取值范围：1m～15d。m-分钟，h-小时，d-天，1c-当天（1c-当天的情况下，无论交易何时创建，都在0点关闭）
    */
    private String timeoutExpress;

    /**
     * 销售产品码，与支付宝签约的产品码名称。 注：目前仅支持FAST_INSTANT_TRADE_PAY
     */
    private String productCode;

    /**
     * 订单描述
     */
    private String body;

    /*
    private List<GoodsDetail> goodsDetailList;

    @Data
    public static class GoodsDetail {
        private String alipay_goods_id;
        private String body;
        private String goods_category;
        private String goods_id;
        private String goods_name;
        private String price;
        private Long quantity;
        private String show_url;
    }
    */
}
