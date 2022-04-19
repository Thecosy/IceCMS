package com.ttice.icepayment.controller;


import com.ttice.icepayment.config.AlipayConfig;
import com.ttice.icepayment.config.WxPayConfig;
import com.ttice.icepayment.entity.AlipayClientEntity;
import com.ttice.icepayment.entity.AlipayTradeInfoEntity;
import com.ttice.icepayment.service.AlipayService;
import com.ttice.icepayment.config.AlipayConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author ：Jiaxl
 * @version : V1.0
 * @date ：Created in 2019/12/20
 * @description: 网站页面支付宝支付
 */
@CrossOrigin //开放前端的跨域访问
@RestController
public class AlipayForPagepayController {

    @Resource
    private AlipayConfig aliPayConfig;

    @Autowired
    private AlipayService alipayService;

    /**
     * @description: 前往支付宝第三方网关进行支付
     */
    @RequestMapping(value = "/alipay/goAlipayPage", produces = "text/html; charset=UTF-8")
    @ResponseBody
    public String goAlipayPage(String orderId) throws Exception {

        // 填充 alipayClientEntity
        AlipayClientEntity alipayClientEntity = new AlipayClientEntity();
        alipayClientEntity.setAppId(aliPayConfig.getAPP_ID());
        alipayClientEntity.setPrivateKey(aliPayConfig.getPRIVATE_KEY());
        alipayClientEntity.setAlipayPublicKey(aliPayConfig.getALIPAY_PUBLIC_KEY());

        // 填充商品信息
        /*
        List<AlipayTradeInfoEntity.GoodsDetail> goodsList = new ArrayList<>();
        for(int i = 1; i <= 5; i++){
            AlipayTradeInfoEntity.GoodsDetail goods = new AlipayTradeInfoEntity.GoodsDetail();
            goods.setGoods_id("1000"+i);
            goods.setGoods_name("ThinkCentre M710q-N000 I57500T 4G 1T 10N3A088CD");
            goods.setQuantity(1L);
            goods.setPrice("26233");
            goods.setShow_url("http://ecaivipsit.earth.xpaas.lenovo.com/Product/ProductDetails/BOProductInfoDetails/84556?productType=0&projectType=0");
            goodsList.add(goods);
        }
        */

        // 填充订单信息
        AlipayTradeInfoEntity alipayTradeInfoEntity = new AlipayTradeInfoEntity();
        alipayTradeInfoEntity.setOutTradeNo(String.valueOf(System.currentTimeMillis()));
        alipayTradeInfoEntity.setTotalAmount("0.11");
        alipayTradeInfoEntity.setSubject("B2019122022873");
        alipayTradeInfoEntity.setTimeoutExpress(aliPayConfig.getTIMEOUT_EXPRESS());
        alipayTradeInfoEntity.setProductCode("FAST_INSTANT_TRADE_PAY");
        alipayTradeInfoEntity.setBody("11111111111");
        /*alipayTradeInfoEntity.setGoodsDetailList(goodsList);*/

        return alipayService.goAlipayPage(alipayClientEntity,alipayTradeInfoEntity);
    }
}
