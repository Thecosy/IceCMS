package com.ttice.icepayment.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ttice.icepayment.entity.PaymentInfo;
import com.ttice.icepayment.enums.PayType;
import com.ttice.icepayment.mapper.PaymentInfoMapper;
import com.ttice.icepayment.service.PaymentInfoService;
import com.ttice.icepayment.util.GetRequestJsonUtils;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class PaymentInfoServiceImpl extends ServiceImpl<PaymentInfoMapper, PaymentInfo> implements PaymentInfoService {

    @Autowired
    PaymentInfoMapper paymentInfoMapper;

    /**
     * 记录支付宝支付日志
     * @param request
     */
    @Override
    public void createAliPaymentInfo(HttpServletRequest request) throws IOException {


        // 获取订单号
        String orderNo = request.getParameter("out_trade_no");
//        //业务编号(trade_no)
        String transactionId = request.getParameter("trade_no");
//        //支付类型
        String tradeType = request.getParameter("notify_type");
//        //交易状态
        String tradeState = request.getParameter("trade_status");
            //交易数组信息
        String fundBillList = request.getParameter("fund_bill_list");
//        //用户实际支付金额
        Integer payerTotal = null ;
        Double temp = null;
        try {
            String buyerPayAmount = request.getParameter("buyer_pay_amount");
            temp = Double.valueOf(buyerPayAmount);
            payerTotal = (int) (temp*100);//单位：分
        } catch (Exception e) {
            e.printStackTrace();
        }
        PaymentInfo paymentInfo = new PaymentInfo();
        paymentInfo.setOrderNo(orderNo);
        paymentInfo.setPaymentType(PayType.ALIPAY.getType());
        paymentInfo.setTransactionId(transactionId);
        paymentInfo.setTradeType(tradeType);
        paymentInfo.setTradeState(tradeState);
        paymentInfo.setPayerTotal(payerTotal);
        paymentInfo.setContent(fundBillList);

        paymentInfoMapper.insert(paymentInfo);
    }
    /**
     * 记录微信支付日志
     * @param plainText
     */
    @Override
    public void createWxPaymentInfo(String plainText) {

        log.info("记录支付日志");

        Gson gson = new Gson();
        HashMap plainTextMap = gson.fromJson(plainText, HashMap.class);

        //订单号
        String orderNo = (String)plainTextMap.get("out_trade_no");
        //业务编号
        String transactionId = (String)plainTextMap.get("transaction_id");
        //支付类型
        String tradeType = (String)plainTextMap.get("trade_type");
        //交易状态
        String tradeState = (String)plainTextMap.get("trade_state");
        //用户实际支付金额
        Map<String, Object> amount = (Map)plainTextMap.get("amount");
        Integer payerTotal = ((Double) amount.get("payer_total")).intValue();

        PaymentInfo paymentInfo = new PaymentInfo();
        paymentInfo.setOrderNo(orderNo);
        paymentInfo.setPaymentType(PayType.WXPAY.getType());
        paymentInfo.setTransactionId(transactionId);
        paymentInfo.setTradeType(tradeType);
        paymentInfo.setTradeState(tradeState);
        paymentInfo.setPayerTotal(payerTotal);
        paymentInfo.setContent(plainText);

        baseMapper.insert(paymentInfo);
    }
}
