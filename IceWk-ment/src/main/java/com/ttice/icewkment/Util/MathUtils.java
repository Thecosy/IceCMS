package com.ttice.icewkment.Util;

/**
 * MathUtils.java
 * com.prereadweb.utils
 * Copyright (c) 2019, 北京链天下科技有限公司版权所有.
 */

/**
 * @Description: 随机数生成工具类
 * @author: Yangxf
 * @date: 2019/4/14 12:38
 */
public class MathUtils {

    private static final String DEFAULT_DIGITS = "0";
    private static final String FIRST_DEFAULT_DIGITS = "1";

    /**
     * @param target 目标数字
     * @param length 需要补充到的位数, 补充默认数字[0], 第一位默认补充[1]
     * @return   补充后的结果
     */
    public static String makeUpNewData(String target, int length){
        return makeUpNewData(target, length, DEFAULT_DIGITS);
    }

    /**
     * @param target 目标数字
     * @param length 需要补充到的位数
     * @param add  需要补充的数字, 补充默认数字[0], 第一位默认补充[1]
     * @return   补充后的结果
     */
    public static String makeUpNewData(String target, int length, String add){
        if(target.startsWith("-")) target.replace("-", "");
        if(target.length() >= length) return target.substring(0, length);
        StringBuffer sb = new StringBuffer(FIRST_DEFAULT_DIGITS);
        for (int i = 0; i < length - (1 + target.length()); i++) {
            sb.append(add);
        }
        return sb.append(target).toString();
    }

    /**
     * 生产一个随机的指定位数的字符串数字
     * @param length
     * @return
     */
    public static int randomDigitNumber(int length){
        int start = Integer.parseInt(makeUpNewData("", length));//1000+8999=9999
        int end = Integer.parseInt(makeUpNewData("", length + 1)) - start;//9000
        return (int)(Math.random() * end) + start ;
    }
}
