package com.ttice.icepayment.entity;

import lombok.Data;

/**
 * @author ：Jiaxl
 * @version : V1.0
 * @date ：Created in 2019/12/18
 * @description: 支付宝接口返回对象
 */
@Data
public class AlipayResultEntity {

    private Boolean success = false;

    private String message = "";
}
