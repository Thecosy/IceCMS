package com.ttice.icepayment.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

@Data
@TableName("v_product")
public class VipProduct implements Serializable {

    private Integer id;

    private String title; //商品名称

    private Integer price; //价格（分）
}
