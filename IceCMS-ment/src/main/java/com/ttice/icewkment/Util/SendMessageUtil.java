package com.ttice.icewkment.Util;

import com.qiniu.common.QiniuException;
import com.qiniu.http.Response;
import com.qiniu.sms.SmsManager;
import com.qiniu.util.Auth;
import com.ttice.icewkment.entity.MessageInfo;
import com.ttice.icewkment.mapper.MessageInfoMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * @author
 */
@Slf4j
@Component
public class SendMessageUtil {

    @Autowired private RedisUtil redisUtil;

    @Autowired private MessageInfoMapper messageInfoMapper;

    private static final String MESSAGE_CODE_PHONE_PREFIX = "MESSAGE_CODE_PHONE_";

    /**
     * 发送手机验证码
     */
    public boolean sendMessageCheck(String templateId,String[] phone,Map<String,String> map) {
        MessageInfo messageInfo = messageInfoMapper.selectOne(null);
        String accessKey = messageInfo.getQiniuAccessKey();
        String secretKey = messageInfo.getQiniuSecretKey();
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

    public boolean sendSmsCode(String phone) {
        MessageInfo messageInfo = messageInfoMapper.selectOne(null);
        String templateId = messageInfo.getQiniuTemplateId();
        Map<String , String> map = new HashMap<String , String>();
        //生成短信验证码(随机6位)
        UUID uuid = UUID.randomUUID();
        int hashCode = uuid.hashCode(); // 取UUID的哈希码
        String code = String.format("%06d", Math.abs(hashCode % 1000000)); // 格式化为6位数字字符串

        //存入redis
        String key = MESSAGE_CODE_PHONE_PREFIX + phone;
        redisUtil.set(key, code, 300);

        map.put("code",code);
        return this.sendMessageCheck(templateId, new String[]{phone}, map);
    }

    public boolean checkSmsCode (String phone , String code){
        //从redis中取出并且和code对比
        String key = MESSAGE_CODE_PHONE_PREFIX + phone;
        Object o = redisUtil.get(key);
        String redisCode = o == null ? null : o.toString();
        return redisCode != null && redisCode.equals(code);
    }
}
