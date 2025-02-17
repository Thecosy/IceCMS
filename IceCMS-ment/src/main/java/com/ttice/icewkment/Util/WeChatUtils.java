package com.ttice.icewkment.Util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ttice.icewkment.commin.lang.Result;
import com.ttice.icewkment.entity.WxLogin;
import com.ttice.icewkment.entity.WxLoginInfo;
import com.ttice.icewkment.mapper.WxLoginMapper;
import com.ttice.icewkment.mapper.WxloginInfoMapper;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Component
public class WeChatUtils {

    @Autowired private RestTemplate restTemplate;

    @Autowired private WxloginInfoMapper wxloginInfoMapper;

    @Autowired private WxLoginMapper wxLoginMapper;

    private String wechatQrcodeUrl = "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=";
    private String wechatAccessTokenUrl = "https://api.weixin.qq.com/cgi-bin/token?appid=%s&secret=%s&grant_type=client_credential";

    private String accessTokenCache;

    // 自行配置：正式版为 "release"，体验版为 "trial"，开发版为 "develop"。默认是正式版。

    // 获取openid
    public String getOpenid(String code) throws Exception {
        WxLoginInfo wxLoginInfo = wxloginInfoMapper.selectOne(null);
        String url = "https://api.weixin.qq.com/sns/jscode2session";
        url += "?appid=" + wxLoginInfo.getAppid(); // 自己的appid
        url += "&secret=" + wxLoginInfo.getSecret(); // 自己的appSecret
        url += "&js_code=" + code;
        url += "&grant_type=authorization_code";
        url += "&connect_redirect=1";

        String res = null;
        try (CloseableHttpClient httpClient = HttpClientBuilder.create().build()) {
            HttpGet httpget = new HttpGet(url); // GET方式

            // 配置信息
            RequestConfig requestConfig = RequestConfig.custom()
                    .setConnectTimeout(5000) // 设置连接超时时间(单位毫秒)
                    .setSocketTimeout(5000) // 设置socket读写超时时间(单位毫秒)
                    .setConnectionRequestTimeout(5000) // 设置请求超时时间(单位毫秒)
                    .setRedirectsEnabled(false) // 设置是否允许重定向(默认为true)
                    .build();

            httpget.setConfig(requestConfig);

            try (CloseableHttpResponse response = httpClient.execute(httpget)) {
                org.apache.http.HttpEntity responseEntity = response.getEntity();
                if (responseEntity != null) {
                    res = EntityUtils.toString(responseEntity);
                }
            }
        }

        JSONObject jo = JSON.parseObject(res);
        return jo.getString("openid");
    }

    public Result generateWechatRrCode() {
        // 当前登录账号
        // Generate a random UUID
        UUID uuid = UUID.randomUUID();

        // Convert the UUID to a string and take the first 6 characters
        String accountId = uuid.toString().substring(0, 6);
        if (accessTokenCache == null) {
            accessTokenCache = getAccessToken();
        }

        String url = wechatQrcodeUrl + accessTokenCache;

        Map<String, Object> body = new HashMap<>();
        // 场景码，根据业务场景与【前端】约定
        body.put("scene", accountId);
        // 页面路径
        body.put("page", "minePages/onlogin");
        // 关闭强制检测路径的有效性
        body.put("check_path", false);

        WxLoginInfo wxLoginInfo = wxloginInfoMapper.selectOne(null);
        body.put("env_version", wxLoginInfo.getEnvVersion());
        // 透明
        body.put("is_hyaline", true);


        byte[] bytes = null;
        bytes = getWechatQrcodeByRestTemplate(url, body);

        if (bytes == null) {
            return Result.fail("null");
        }

        String error = new String(bytes);
        if (error.contains("errcode")) {
            return Result.fail(error);
        }

        // 保存到本地
        // saveQrCodeToLocal(bytes);

        // 保存数据到本地
        WxLogin login = new WxLogin();
        login.setCreatTime(new java.util.Date());
        login.setScene(accountId);
        login.setStatus("0");
        wxLoginMapper.insert(login);
        // 返回给前端 accountId和bytes
        Map<String, Object> data = new HashMap<>();
        data.put("accountId", accountId);
        data.put("bytes", bytes);

        return Result.succ( 200, "生成成功", data);
    }

    // 获取access_token
    public String getAccessToken() {
        WxLoginInfo wxLoginInfo = wxloginInfoMapper.selectOne(null);
        String url = String.format(wechatAccessTokenUrl, wxLoginInfo.getAppid(), wxLoginInfo.getSecret());

        Map<String, String> responseBody = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<Map<String, String>>() {}).getBody();
        if (responseBody == null || responseBody.get("errcode") != null) {
            // 获取失败
            System.out.println("getAccessToken失败：" + (responseBody == null ? "null" : responseBody.toString()));
            return null;
        }

        return responseBody.get("access_token");
    }


    // restTemplate方式
    public byte[] getWechatQrcodeByRestTemplate(String url, Map<String, Object> body) {
        return restTemplate.exchange(url, HttpMethod.POST, new HttpEntity<>(body, null), byte[].class).getBody();
    }

    private void saveQrCodeToLocal(byte[] bytes) {
        try {
            InputStream inputStream = new ByteArrayInputStream(bytes);
            BufferedImage qrImage = ImageIO.read(inputStream);
            if (qrImage == null) {
                throw new IOException("Failed to read QR code image");
            }

            // Create a white background image
            BufferedImage whiteBgImage = new BufferedImage(qrImage.getWidth(), qrImage.getHeight(), BufferedImage.TYPE_INT_RGB);
            Graphics2D g = whiteBgImage.createGraphics();
            g.setPaint(Color.WHITE);
            g.fillRect(0, 0, whiteBgImage.getWidth(), whiteBgImage.getHeight());

            // Draw the QR code image on the white background
            g.drawImage(qrImage, 0, 0, null);
            g.dispose();

            // Save the resulting image to local file system
            try (FileOutputStream out = new FileOutputStream("/Users/apple/Downloads/" + "21" + ".png")) {
                ImageIO.write(whiteBgImage, "png", out);
            }

            inputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
