package com.ttice.icepayment.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.domain.RefundRoyaltyResult;
import com.alipay.api.internal.util.AlipaySignature;
import com.alipay.api.request.*;
import com.alipay.api.response.*;
import com.ttice.icepayment.config.AlipayConfig;
import com.ttice.icepayment.entity.*;
import com.ttice.icepayment.enums.OrderStatus;
import com.ttice.icepayment.enums.PayType;
import com.ttice.icepayment.enums.alipay.AliNotifyType;
import com.ttice.icepayment.enums.alipay.AliTradeState;
import com.ttice.icepayment.mapper.PaymentInfoMapper;
import com.ttice.icepayment.service.AlipayService;
import com.ttice.icepayment.service.OrderInfoService;
import com.ttice.icepayment.service.PaymentInfoService;
import com.ttice.icepayment.service.RefundInfoService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.locks.ReentrantLock;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@Slf4j
public class AlipayServiceImpl implements AlipayService {

    @Resource
    private OrderInfoService orderInfoService;

    @Autowired
    private PaymentInfoMapper paymentInfoMapper;

    @Autowired
    private AlipayConfig alipayConfig;

    @Autowired
    private RefundInfoService refundInfoService;

    @Autowired
    private PaymentInfoService paymentInfoService;

    private final ReentrantLock lock = new ReentrantLock();

    @Override
    public Map<String, Object> ftofPay(Long productId) throws Exception {

        log.info("生成订单");

        //生成订单
        OrderInfo orderInfo = orderInfoService.createOrderByAliProductId(productId,"支付宝");
        String codeUrl = orderInfo.getCodeUrl();

        if(orderInfo != null && !org.springframework.util.StringUtils.isEmpty(codeUrl)){
                log.info("订单已存在，二维码已保存");
                //返回二维码
                Map<String, Object> map = new HashMap<>();
                map.put("codeUrl", codeUrl);
                map.put("orderNo", orderInfo.getOrderNo());
                return map;
        }

        log.info("调用统一下单API");

        // 填充 alipayClientEntity
        AlipayClientEntity alipayClientEntity = new AlipayClientEntity();
        alipayClientEntity.setAppId(alipayConfig.getAPP_ID());
        alipayClientEntity.setPrivateKey(alipayConfig.getPRIVATE_KEY());
        alipayClientEntity.setAlipayPublicKey(alipayConfig.getALIPAY_PUBLIC_KEY());
        //把元为单位转化为分为单位
        double orderprice = orderInfo.getTotalFee();
        String price = String.valueOf(orderprice/100);//价格 单位:分
        // 填充订单信息
        AlipayTradeInfoEntity alipayTradeInfoEntity = new AlipayTradeInfoEntity();
        alipayTradeInfoEntity.setOutTradeNo(orderInfo.getOrderNo());//订单号
        alipayTradeInfoEntity.setTotalAmount(price);
        alipayTradeInfoEntity.setSubject(orderInfo.getTitle());
        alipayTradeInfoEntity.setTimeoutExpress(alipayConfig.getTIMEOUT_EXPRESS());

        codeUrl = buildAlipayUrl(alipayClientEntity,alipayTradeInfoEntity);

            //返回二维码
            Map<String, Object> map = new HashMap<>();
            map.put("codeUrl", codeUrl);
            map.put("orderNo", orderInfo.getOrderNo());
            //保存二维码
            String orderNo = orderInfo.getOrderNo();
            orderInfoService.saveCodeUrl(orderNo, codeUrl,"支付宝");

            return map;
    }

    @Override
    public String buildAlipayUrl(AlipayClientEntity alipayClientEntity, AlipayTradeInfoEntity alipayTradeInfoEntity) throws AlipayApiException {
        // 初始化AlipayClient
        AlipayClient client = buildAlipayClient(alipayClientEntity);
        // 订单信息转换为json字符串
        String postdata = buildPostdata(alipayTradeInfoEntity);
        // 二维码生成对应的类
        AlipayTradePrecreateRequest alipayRequest = new AlipayTradePrecreateRequest();
        // 生成订单数据
        alipayRequest.setBizContent(postdata);
        //异步回调地址
        //TODO
//        alipayRequest.setNotifyUrl(AlipayConstant.NOTIFY_URL);
//          wxPayConfig.getNotifyDomain().concat(WxNotifyType.NATIVE_NOTIFY.getType())
        alipayRequest.setNotifyUrl(alipayConfig.getNOTIFY_URL().concat(AliNotifyType.FTOF_PAY.getType()));
        // 调用接口
        AlipayTradePrecreateResponse alipayResponse = client.execute(alipayRequest);
        Objects.requireNonNull(alipayResponse,"client.execute(alipayRequest) 是空的");
        String responseBody = alipayResponse.getBody();
        Objects.requireNonNull(responseBody,"client.execute(alipayRequest).getBody() 是空的");
        JSONObject jsonObject = JSONObject.parseObject(responseBody);
        JSONObject jsonObjectResponse = jsonObject.getJSONObject("alipay_trade_precreate_response");
        Objects.requireNonNull(jsonObjectResponse,"alipay_trade_precreate_response 是空的");
        return jsonObjectResponse.getString("qr_code");
    }

    @Override
    public Boolean alipayCheckSign(HttpServletRequest request, AlipayClientEntity alipayClientEntity) throws AlipayApiException {

        Objects.requireNonNull(alipayClientEntity,"AlipayClientEntity 不能为空");
        Objects.requireNonNull(alipayClientEntity.getAlipayPublicKey(),"AlipayPublicKey 不能为空");

        //获取支付宝POST过来反馈信息
        Map<String, String> params = getRequestParams(request);
        // 支付宝回调通知接口
        return AlipaySignature.rsaCheckV1(params, alipayClientEntity.getAlipayPublicKey(), alipayClientEntity.getCharset(), alipayClientEntity.getSignType());

    }

    /**
     *  前往第三方网站进行支付
     * @param alipayClientEntity
     * @param alipayTradeInfoEntity
     * @return
     * @throws AlipayApiException
     */
    @Override
    public String goAlipayPage(AlipayClientEntity alipayClientEntity, AlipayTradeInfoEntity alipayTradeInfoEntity) throws AlipayApiException {
        // 初始化AlipayClient
        AlipayClient client = buildAlipayClient(alipayClientEntity);
        // 订单信息转换为json字符串
        String postdata = buildPostdata(alipayTradeInfoEntity);

        // 二维码生成对应的类
        AlipayTradePagePayRequest alipayRequest = new AlipayTradePagePayRequest ();
        alipayRequest.setBizContent(postdata);
        alipayRequest.setNotifyUrl(alipayConfig.getNOTIFY_URL());
        alipayRequest.setReturnUrl(alipayConfig.getRETURN_URL());

        // 调用接口
        AlipayTradePagePayResponse response = client.pageExecute(alipayRequest);
        Objects.requireNonNull(response,"client.pageExecute(alipayRequest) 是空的");
        String body = response.getBody();
        System.out.println("body = " + body);
        return body;
    }

    @Override
    public Map<String, Object> getAlipayTradeStatus(AlipayClientEntity alipayClientEntity, String orderId) throws AlipayApiException {
        AlipayClient alipayClient = buildAlipayClient(alipayClientEntity);
        AlipayTradeQueryRequest request = new AlipayTradeQueryRequest();
        Map<String,Object> map=new HashMap<>();
        map.put("out_trade_no",orderId);
        String returndata = JSONObject.toJSONString(map);
        request.setBizContent(returndata);
        //通过alipayClient调用API，获得对应的response类
        AlipayTradeQueryResponse response = alipayClient.execute(request);
        String responseBody = response.getBody();
        Objects.requireNonNull(responseBody,"client.execute(alipayRequest).getBody() 是空的");
        JSONObject jsonObject = JSONObject.parseObject(responseBody);
        JSONObject jsonAlipayResponse = jsonObject.getJSONObject("alipay_trade_query_response");
        Objects.requireNonNull(jsonAlipayResponse,"jsonAlipayResponse 是空的");
        String code = jsonAlipayResponse.getString("code");
        String msg = jsonAlipayResponse.getString("msg");
        Map<String,Object> returnmap=new HashMap<>();
        if (AlipayConfig.RETURN_CODE_SUCCESS.equals(code) && AlipayConfig.RETURN_MSG_SUCCESS.equals(msg)) {
            System.out.println("交易查询请求成功");
            String tradeStatus = jsonObject.getString("trade_status");
            if (AlipayConfig.TRADE_SUCCESS.equals(tradeStatus)) {
                returnmap.put("type","1");
                returnmap.put("data","支付成功");
            }else {
                returnmap.put("type","0");
                returnmap.put("data",tradeStatus);
            }
        }else {
            returnmap.put("type","0");
            returnmap.put("data",jsonObject.getString("sub_msg"));
        }
        return returnmap;
    }

    /**
     * @description : 填充支付宝接口参数，并转换为json字符串
     * @author : Jiaxl
     * @date : 2019/12/23
     * @param : alipayTradeInfoEntity
     * @return : java.lang.String
     */
    private String buildPostdata( AlipayTradeInfoEntity alipayTradeInfoEntity) {
        Objects.requireNonNull(alipayTradeInfoEntity,"AlipayTradeInfoEntity 不能为空");
        Objects.requireNonNull(alipayTradeInfoEntity.getOutTradeNo(),"OutTradeNo 不能为空");
        Objects.requireNonNull(alipayTradeInfoEntity.getSubject(),"Subject 不能为空");
        Objects.requireNonNull(alipayTradeInfoEntity.getTotalAmount(),"TotalAmount 不能为空");

        // 填充接口需要的参数
        Map<String, Object> map = new HashMap<String, Object>(8);
        map.put("out_trade_no", alipayTradeInfoEntity.getOutTradeNo());
        map.put("total_amount", alipayTradeInfoEntity.getTotalAmount());
        map.put("subject", alipayTradeInfoEntity.getSubject());
        if (StringUtils.isNotBlank(alipayTradeInfoEntity.getTimeoutExpress())) {
            map.put("timeout_express", alipayTradeInfoEntity.getTimeoutExpress());
        }
        if (StringUtils.isNotBlank(alipayTradeInfoEntity.getProductCode())) {
            map.put("product_code", alipayTradeInfoEntity.getProductCode());
        }
        if (StringUtils.isNotBlank(alipayTradeInfoEntity.getBody())) {
            map.put("body", alipayTradeInfoEntity.getBody());
        }
        /*
        if (alipayTradeInfoEntity.getGoodsDetailList()!=null && alipayTradeInfoEntity.getGoodsDetailList().size()>0){
            map.put("goods_detail", JSONObject.toJSONString(alipayTradeInfoEntity.getGoodsDetailList()));
        }
        */

        // 订单信息转换为json字符串
        return JSONObject.toJSONString(map);
    }

    /**
     * @description : 初始化 AlipayClient
     * @author : Jiaxl
     * @date : 2019/12/23
     * @param : alipayClientEntity
     * @return : com.alipay.api.AlipayClient
     */
    private AlipayClient buildAlipayClient(AlipayClientEntity alipayClientEntity) {
        Objects.requireNonNull(alipayClientEntity,"AlipayClientEntity 不能为空");
        Objects.requireNonNull(alipayClientEntity.getAppId(),"AppId 不能为空");
        Objects.requireNonNull(alipayClientEntity.getPrivateKey(),"PrivateKey 不能为空");
        Objects.requireNonNull(alipayClientEntity.getAlipayPublicKey(),"AlipayPublicKey 不能为空");

        // 初始化AlipayClient
        return new DefaultAlipayClient(alipayClientEntity.getGatewayUrl(), alipayClientEntity.getAppId()
                , alipayClientEntity.getPrivateKey(), alipayClientEntity.getContentType(), alipayClientEntity.getCharset()
                , alipayClientEntity.getAlipayPublicKey(), alipayClientEntity.getSignType());
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
    @Transactional(rollbackFor = Exception.class)
    @Override
    public void processOrder(String orderNo,HttpServletRequest request) throws GeneralSecurityException {
   /*在对业务数据进行状态检查和处理之前，
        要采用数据锁进行并发控制，
        以避免函数重入造成的数据混乱*/
        //尝试获取锁：
        // 成功获取则立即返回true，获取失败则立即返回false。不必一直等待锁的释放
        if(lock.tryLock()){
            try {

                //处理重复的通知
                //接口调用的幂等性：无论接口被调用多少次，产生的结果是一致的。
                String orderStatus = orderInfoService.getOrderStatus(orderNo);
                if(!OrderStatus.NOTPAY.getType().equals(orderStatus)){
                    return;
                }

                //模拟通知并发
//                try {
//                    TimeUnit.SECONDS.sleep(5);
//                } catch (InterruptedException e) {
//                    e.printStackTrace();
//                }

                //更新订单状态
                orderInfoService.updateStatusByOrderNo(orderNo, OrderStatus.SUCCESS);

                //记录支付日志
                paymentInfoService.createAliPaymentInfo(request);

            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                //要主动释放锁
                lock.unlock();
            }
        }
    }
    /**
     * 根据订单号查询微信支付查单接口，核实订单状态
     * 如果订单已支付，则更新商户端订单状态，并记录支付日志
     * 如果订单未支付，则调用关单接口关闭订单，并更新商户端订单状态
     * @param orderNo
     */
    @Transactional(rollbackFor = Exception.class)
    @Override
    public void checkOrderStatus(String orderNo) throws Exception {

        log.warn("根据订单号核实订单状态 ===> {}", orderNo);
//        //调用支付宝支付查单接口
         this.queryOrder(orderNo);

    }

    @Override
    public String queryOrder(String orderNo) throws Exception {

        log.info("查单接口调用 ===> {}", orderNo);
        log.info("==================向支付宝发起查询，查询商户订单号为："+orderNo);

        try {
            //实例化客户端（参数：网关地址、商户appid、商户私钥、格式、编码、支付宝公钥、加密类型）
            AlipayClient alipayClient = new DefaultAlipayClient(alipayConfig.getALI_URL(), alipayConfig.getAPP_ID(),
                    alipayConfig.getPRIVATE_KEY(), "json","GBK",
                    alipayConfig.getALIPAY_PUBLIC_KEY(),"RSA2");
            AlipayTradeQueryRequest alipayTradeQueryRequest = new AlipayTradeQueryRequest();
            alipayTradeQueryRequest.setBizContent("{" +
                    "\"out_trade_no\":\""+orderNo+"\"" +
                    "}");
            AlipayTradeQueryResponse alipayTradeQueryResponse = alipayClient.execute(alipayTradeQueryRequest);
            if(alipayTradeQueryResponse.isSuccess()){
                //获取微信支付端的订单状态
                String tradeStatus = alipayTradeQueryResponse.getTradeStatus();
                //判断订单状态
                if(AliTradeState.SUCCESS.getType().equals(tradeStatus)){
                    log.warn("核实订单已支付 ===> {}", orderNo);
                    //如果确认订单已支付则更新本地订单状态
                    orderInfoService.updateStatusByOrderNo(orderNo, OrderStatus.SUCCESS);
                    //记录支付日志
                    //业务编号(trade_no)
                    String transactionId = alipayTradeQueryResponse.getTradeNo();
                    //支付类型
                    String tradeType = "trade_status_sync";
                    //交易状态
                    String tradeState =alipayTradeQueryResponse.getTradeStatus();
                    //用户实际支付金额
                    Integer payerTotal = null ;
                    Double temp = null;
                    try {
                        String buyerPayAmount = alipayTradeQueryResponse.getBuyerPayAmount();
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
                    paymentInfo.setContent("text");

                    paymentInfoMapper.insert(paymentInfo);
                }
                if(AliTradeState.NOTPAY.getType().equals(tradeStatus)){
                    log.warn("核实订单未支付 ===> {}", orderNo);
                    //如果订单未支付，则调用关单接口
                    this.closeOrder(orderNo);
                    //更新本地订单状态
                    orderInfoService.updateStatusByOrderNo(orderNo, OrderStatus.CLOSED);
                }
                if(AliTradeState.CLOSED.getType().equals(tradeStatus)){
                    log.warn("核实订单超时已关闭 ===> {}", orderNo);
                    //更新本地订单状态
                    orderInfoService.updateStatusByOrderNo(orderNo, OrderStatus.CLOSED);
                }

            } else {
                log.info("==================调用支付宝查询接口失败！");
            }
        } catch (AlipayApiException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 关单接口的调用
     * @param orderNo
     */
    private void closeOrder(String orderNo) throws Exception {

        log.info("关单接口的调用，订单号 ===> {}", orderNo);

        AlipayClient alipayClient = new DefaultAlipayClient(alipayConfig.getALI_URL(), alipayConfig.getAPP_ID(),
                alipayConfig.getPRIVATE_KEY(), "json","GBK",
                alipayConfig.getALIPAY_PUBLIC_KEY(),"RSA2");
        AlipayTradeCloseRequest request = new AlipayTradeCloseRequest();
        JSONObject bizContent = new JSONObject();
        bizContent.put("out_trade_no", orderNo);
        request.setBizContent(bizContent.toString());
        AlipayTradeCloseResponse response = alipayClient.execute(request);
        if(response.isSuccess()){
            System.out.println("调用成功");
        } else {
            System.out.println("调用失败");
        }

    }

    /**
     * 退款
     * @param orderNo
     * @param reason
     * @throws IOException
     */
    @Transactional(rollbackFor = Exception.class)
    @Override
    public void refund(String orderNo, String reason) throws Exception {

        log.info("创建退款单记录");
        //根据订单编号创建退款单
        RefundInfo refundsInfo = refundInfoService.createRefundByOrderNo(orderNo, reason);

        log.info("调用退款API");

        //调用统一退款API
        AlipayClient alipayClient = new DefaultAlipayClient(alipayConfig.getALI_URL(), alipayConfig.getAPP_ID(),
                alipayConfig.getPRIVATE_KEY(), "json","GBK",
                alipayConfig.getALIPAY_PUBLIC_KEY(),"RSA2" );
        AlipayTradeRefundRequest request = new AlipayTradeRefundRequest();
        JSONObject bizContent = new JSONObject();
        bizContent.put("out_trade_no", orderNo);
        int refund = refundsInfo.getRefund();
        double temp = Double.valueOf(refund);
        temp = temp/100;
        bizContent.put("refund_amount", temp);
        bizContent.put("out_request_no", refundsInfo.getRefundNo());
        bizContent.put("refund_reason", reason);

        //// 返回参数选项，按需传入
        //JSONArray queryOptions = new JSONArray();
        //queryOptions.add("refund_detail_item_list");
        //bizContent.put("query_options", queryOptions);

        request.setBizContent(bizContent.toString());
        AlipayTradeRefundResponse response = alipayClient.execute(request);
        if(response.isSuccess()){
            System.out.println("退款成功");
            //更新订单状态
            orderInfoService.updateStatusByOrderNo(orderNo, OrderStatus.REFUND_PROCESSING);
            //调用查退单接口

            this.checkRefundStatus(orderNo);
        } else {
            System.out.println("退款失败");
        }
    }

    /**
     * 根据退款单号核实退款单状态
     * @param refundNo
     * @return
     */
    @Transactional(rollbackFor = Exception.class)
    @Override
    public void checkRefundStatus(String refundNo) throws Exception {

        log.warn("根据退款单号核实退款单状态 ===> {}", refundNo);

        //根据订单编号查询退款单
        QueryWrapper<RefundInfo> objectQueryWrapper = new QueryWrapper<>();
        objectQueryWrapper.eq("order_no",refundNo);
        RefundInfo refundsInfo = refundInfoService.getOne(objectQueryWrapper);

        AlipayClient alipayClient = new DefaultAlipayClient(alipayConfig.getALI_URL(), alipayConfig.getAPP_ID(),
                alipayConfig.getPRIVATE_KEY(), "json","GBK",
                alipayConfig.getALIPAY_PUBLIC_KEY(),"RSA2" );
        AlipayTradeFastpayRefundQueryRequest request = new AlipayTradeFastpayRefundQueryRequest();
        JSONObject bizContent = new JSONObject();
        bizContent.put("out_trade_no", refundNo);
        bizContent.put("out_request_no", refundsInfo.getRefundNo());

        //// 返回参数选项，按需传入
        //JSONArray queryOptions = new JSONArray();
        //queryOptions.add("refund_detail_item_list");
        //bizContent.put("query_options", queryOptions);

        log.info("调用退款查询API");
        request.setBizContent(bizContent.toString());
        AlipayTradeFastpayRefundQueryResponse response = alipayClient.execute(request);
        if(response.isSuccess()){
            System.out.println("调用成功");
            String TradeNo = response.getTradeNo();
            List<RefundRoyaltyResult> refundRoyaltys = response.getRefundRoyaltys();
//            log.info(String.valueOf(refundRoyaltys));
            //根据退款单编号修改退款单
            //设置要修改的字段
            RefundInfo refundInfo = new RefundInfo();

            refundInfo.setRefundId(TradeNo);//微信支付退款单号

            //查询退款和申请退款中的返回参数
            refundInfo.setRefundStatus("SUCCESS");//退款状态
//            refundInfo.setContentReturn(String.valueOf(refundRoyaltys));//将全部响应结果存入数据库的content字段

            //如果确认退款成功，则更新订单状态
            orderInfoService.updateStatusByOrderNo(refundNo, OrderStatus.REFUND_SUCCESS);

            //更新退款单
            refundInfoService.update(refundInfo, objectQueryWrapper);
        } else {
            System.out.println("调用失败");
        }
//        if (WxRefundStatus.SUCCESS.getType().equals(status)) {
//
//            log.warn("核实订单已退款成功 ===> {}", refundNo);
//
//            //如果确认退款成功，则更新订单状态
//            orderInfoService.updateStatusByOrderNo(orderNo, OrderStatus.REFUND_SUCCESS);
//
//            //更新退款单
//            refundsInfoService.updateRefund(result);
//        }
//
//        if (WxRefundStatus.ABNORMAL.getType().equals(status)) {
//
//            log.warn("核实订单退款异常  ===> {}", refundNo);
//
//            //如果确认退款成功，则更新订单状态
//            orderInfoService.updateStatusByOrderNo(orderNo, OrderStatus.REFUND_ABNORMAL);
//
//            //更新退款单
//            refundsInfoService.updateRefund(result);
//        }
    }


    /**
     * 用户取消订单
     * @param orderNo
     */
    @Override
    public void cancelOrder(String orderNo) throws Exception {

        //调用支付宝的关单接口
        this.closeOrder(orderNo);

        //更新商户端的订单状态
        orderInfoService.updateStatusByOrderNo(orderNo, OrderStatus.CANCEL);
    }




}
