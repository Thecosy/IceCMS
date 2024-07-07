package com.ttice.icewkment.Util;

import com.qiniu.common.QiniuException;
import com.qiniu.http.Response;
import com.qiniu.sms.SmsManager;
import com.qiniu.util.Auth;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * @author
 */
@Slf4j
@Component
public class SendMessageUtil {

    /**
     * 发送手机验证码
     */
    public static boolean sendMessageCheck(String templateId,String[] phone,Map<String,String> map) {

        String accessKey = "*********";
        String secretKey = "*********";
        Auth auth = Auth.create(accessKey, secretKey);
        SmsManager smsManager = new SmsManager(auth);
        try {
            Response resp = smsManager.sendMessage(templateId, phone , map);

            if(resp.statusCode == 200){
                return true;
            }else {
                return false;
            }
        } catch (QiniuException e) {
            log.info("发生短信异常 =======================" ,e);
        }
        return false;
    }
}
