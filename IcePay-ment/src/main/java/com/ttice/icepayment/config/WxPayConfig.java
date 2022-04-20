package com.ttice.icepayment.config;

import cn.hutool.core.io.resource.ClassPathResource;
import com.wechat.pay.contrib.apache.httpclient.WechatPayHttpClientBuilder;
import com.wechat.pay.contrib.apache.httpclient.auth.*;
import com.wechat.pay.contrib.apache.httpclient.util.PemUtil;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.impl.client.CloseableHttpClient;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.io.*;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.PrivateKey;
import java.util.Objects;


@Configuration
@Component
@PropertySource("classpath:wxpay.properties")
//读取配置文件
@ConfigurationProperties(prefix="wxpay") //读取wxpay节点
@Data //使用set方法将wxpay节点中的值填充到当前类的属性中
@Slf4j
public class WxPayConfig {

    public static String inputStream2Str(InputStream is) throws IOException {
        StringBuffer sb;
        BufferedReader br = null;
        try {
            br = new BufferedReader(new InputStreamReader(is));

            sb = new StringBuffer();

            String data;
            while ((data = br.readLine()) != null) {
                sb.append(data).append("\n");
            }
        } finally {
            br.close();
        }

        return sb.toString();
    }


    // 商户号
    private String mchId;

    // 商户API证书序列号
    private String mchSerialNo;

    // 商户私钥文件
    private String privateKeyPath;

    // APIv3密钥
    private String apiV3Key;

    // APPID
    private String appid;

    // 微信服务器地址
    private String domain;

    // 接收结果通知地址
    private String notifyDomain;

    // APIv2密钥
    private String partnerKey;

    /**
     * 获取商户的私钥文件
     * @param filename
     * @return
     */
    private PrivateKey getPrivateKey(String filename){

        try {
            return PemUtil.loadPrivateKey(new FileInputStream(filename));
        } catch (FileNotFoundException e) {
            throw new RuntimeException("私钥文件不存在", e);
        }
    }

    /**
     * 获取签名验证器
     * @return
     */
    @Bean
    public ScheduledUpdateCertificatesVerifier getVerifier() throws IOException {

        log.info("获取签名验证器");

        ClassLoader classLoader = WxPayConfig.class.getClassLoader();
        InputStream appUrl = classLoader.getResourceAsStream("key/"+privateKeyPath);
        String appString=inputStream2Str(appUrl);
        //获取商户私钥
        PrivateKey privateKey = PemUtil.loadPrivateKey(appString);

//        URL fileURL=this.getClass().getResource("key/"+privateKeyPath);
//        System.out.println(fileURL.getFile());

        //本地可以，打包不行
//        String fis = Objects.requireNonNull(Thread.currentThread().getContextClassLoader().getResource("key/"+privateKeyPath)).getPath();;




        //私钥签名对象
        PrivateKeySigner privateKeySigner = new PrivateKeySigner(mchSerialNo, privateKey);

        //身份认证对象
        WechatPay2Credentials wechatPay2Credentials = new WechatPay2Credentials(mchId, privateKeySigner);

        // 使用定时更新的签名验证器，不需要传入证书
        ScheduledUpdateCertificatesVerifier verifier = new ScheduledUpdateCertificatesVerifier(
                wechatPay2Credentials,
                apiV3Key.getBytes(StandardCharsets.UTF_8));

        return verifier;
    }


    /**
     * 获取http请求对象
     * @param verifier
     * @return
     */
    @Bean(name = "wxPayClient")
    public CloseableHttpClient getWxPayClient(ScheduledUpdateCertificatesVerifier verifier) throws IOException {

        log.info("获取httpClient");


        ClassLoader classLoader = WxPayConfig.class.getClassLoader();
        InputStream appUrl = classLoader.getResourceAsStream("key/"+privateKeyPath);
        String appString=inputStream2Str(appUrl);
        //获取商户私钥
        PrivateKey privateKey = PemUtil.loadPrivateKey(appString);

        WechatPayHttpClientBuilder builder = WechatPayHttpClientBuilder.create()
                .withMerchant(mchId, mchSerialNo, privateKey)
                .withValidator(new WechatPay2Validator(verifier));
        // ... 接下来，你仍然可以通过builder设置各种参数，来配置你的HttpClient

        // 通过WechatPayHttpClientBuilder构造的HttpClient，会自动的处理签名和验签，并进行证书自动更新
        CloseableHttpClient httpClient = builder.build();

        return httpClient;
    }

    /**
     * 获取HttpClient，无需进行应答签名验证，跳过验签的流程
     */
    @Bean(name = "wxPayNoSignClient")
    public CloseableHttpClient getWxPayNoSignClient() throws IOException {

        ClassLoader classLoader = WxPayConfig.class.getClassLoader();
        InputStream appUrl = classLoader.getResourceAsStream("key/"+privateKeyPath);
        String appString=inputStream2Str(appUrl);
        //获取商户私钥
        PrivateKey privateKey = PemUtil.loadPrivateKey(appString);

        //用于构造HttpClient
        WechatPayHttpClientBuilder builder = WechatPayHttpClientBuilder.create()
                //设置商户信息
                .withMerchant(mchId, mchSerialNo, privateKey)
                //无需进行签名验证、通过withValidator((response) -> true)实现
                .withValidator((response) -> true);

        // 通过WechatPayHttpClientBuilder构造的HttpClient，会自动的处理签名和验签，并进行证书自动更新
        CloseableHttpClient httpClient = builder.build();

        log.info("== getWxPayNoSignClient END ==");

        return httpClient;
    }

}
