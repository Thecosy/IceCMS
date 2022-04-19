package com.ttice.icewkment.Util;

import java.security.MessageDigest;
import java.util.UUID;

public class Md5Utils {
    /**
     * md5加密
     * @param s：待加密字符串
     * @return 加密后16进制字符串
     */
    public static String md5(String s) {
        try {
            //实例化MessageDigest的MD5算法对象
            MessageDigest md = MessageDigest.getInstance("MD5");
            //通过digest方法返回哈希计算后的字节数组
            byte[] bytes = md.digest(s.getBytes("utf-8"));
            //将字节数组转换为16进制字符串并返回
            return toHex(bytes);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    /**
     * 获取随即盐
     */
    public static String salt(){
        //利用UUID生成随机盐
        UUID uuid = UUID.randomUUID();
        //返回a2c64597-232f-4782-ab2d-9dfeb9d76932
        String[] arr = uuid.toString().split("-");
        return arr[0];
    }
    /**
     * 字节数组转换为16进制字符串
     * @param bytes数组
     * @return 16进制字符串
     */
    private static String toHex(byte[] bytes) {
        final char[] HEX_DIGITS = "0123456789ABCDEF".toCharArray();
        StringBuilder ret = new StringBuilder(bytes.length * 2);
        for (int i=0; i<bytes.length; i++) {
            ret.append(HEX_DIGITS[(bytes[i] >> 4) & 0x0f]);
            ret.append(HEX_DIGITS[bytes[i] & 0x0f]);
        }
        return ret.toString();
    }
}