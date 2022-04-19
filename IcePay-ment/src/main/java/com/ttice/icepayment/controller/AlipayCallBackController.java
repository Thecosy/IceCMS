package com.ttice.icepayment.controller;

import com.alipay.api.AlipayApiException;
import com.alipay.api.internal.util.AlipaySignature;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * @author ：Jiaxl
 * @version : V1.0
 * @date ：Created in 2019/12/23
 * @description: TODO
 */
@CrossOrigin //开放前端的跨域访问
@RestController
public class AlipayCallBackController {

    /**
     * AliPay公钥
     * */
    public static final String ALIPAY_PUBLIC_KEY = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgejNtKTKLy5SozMRMh9bkL16voM+aEc5xldxpmboWHM9hWjOp4hi1PSBRXeS3O/BF57MIFWJhcqqBjOTXIiqysYOTSLARgOK9RbMC2OfvrjQbVV81DkAKWJBnRSGk5zWYkmdgTM+5cmucWIEHZeNC2wpGDJTWMrerxeb6rPU+BWOke+Qo/94kdYc8F7eZwXpmU1RLpf/b8n6hYgyWia2Jij0XqPF+KOzqCtKyEdopVVDpU6UkkOwNerqubTBfEpb140Yd735dUoD7CWEH7ttHYCM1l0y0eOboV6pgnJDAKK5XG0r4adteUXZ6S3AAzztWRIL2qmwbZsvsHlGaRBnxQIDAQAB";


    /**
     * @description : 支付宝同步回调
     * @author : Jiaxl
     * @date : 2019/12/18
     * @param : request
     * @param : response
     * @return : java.lang.String
     */
    @RequestMapping(value = "/alipayReturn")
    public void alipayReturn(HttpServletRequest request, HttpServletResponse response) {
        try {
            // 验证签名订单是否为当前用户的
            if(alipayCheckSign(request)){
                // 获取订单号
                String orderNo = request.getParameter("out_trade_no");

                String tradeStatus = request.getParameter("trade_status");

                Objects.requireNonNull(orderNo,"orderNo 不能为空");
                Objects.requireNonNull(tradeStatus,"tradeStatus 不能为空");

                if (tradeStatus.equals("TRADE_FINISHED") || tradeStatus.equals("TRADE_SUCCESS")) {
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
    @RequestMapping(value = "/alipayNotify")
    public void alipayNotify(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            // 验证签名订单是否为当前用户的
            if(alipayCheckSign(request)){
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

                if (tradeStatus.equals("TRADE_FINISHED") || tradeStatus.equals("TRADE_SUCCESS")) {
                    // 根据订单号修改订单状态 业务
                    System.out.println("orderNo = " + orderNo + ", tradeStatus = " + tradeStatus);
                }
            }
            response.getWriter().write("success");
        }catch (AlipayApiException e){
            e.getMessage();
        }

    }

    /**
     * @description : Alipay 异步通知结果解析接口
     * @author : Jiaxl
     * @date : 2019/12/18
     * @param : request
     * @param : alipayClientEntity
     * @return : java.lang.Boolean
     */
    public Boolean alipayCheckSign(HttpServletRequest request) throws AlipayApiException {
        //获取支付宝POST过来反馈信息
        Map<String, String> params = getRequestParams(request);
        // 支付宝回调通知接口
        return AlipaySignature.rsaCheckV1(params, ALIPAY_PUBLIC_KEY, "utf-8", "RSA2");
    }

    /**
     * @description : 获取支付宝POST过来反馈信息
     * @author : Jiaxl
     * @date : 2019/12/23
     * @param : request
     * @return : java.util.Map<java.lang.String,java.lang.String>
     */
    private Map<String, String> getRequestParams(HttpServletRequest request){
        Map<String, String> params = new HashMap<>();
        Map<String, String[]> requestParams = request.getParameterMap();
        for (Object o : requestParams.keySet()) {
            String name = (String) o;
            String[] values = (String[]) requestParams.get(name);
            String valueStr = "";
            for (int i = 0; i < values.length; i++) {
                valueStr = (i == values.length - 1) ? valueStr + values[i]
                        : valueStr + values[i] + ",";
            }
            //乱码解决，这段代码在出现乱码时使用。
            //valueStr = new String(valueStr.getBytes("ISO-8859-1"), "utf-8");
            params.put(name, valueStr);
        }
        return params;
    }
}
