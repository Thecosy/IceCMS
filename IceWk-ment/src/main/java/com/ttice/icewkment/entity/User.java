package com.ttice.icewkment.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;
import java.util.Date;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 
 * </p>
 *
 * @author admin
 * @since 2022-01-13
 */
@Data
  @EqualsAndHashCode(callSuper = false)
    public class User implements Serializable {

    private static final long serialVersionUID=1L;

    @TableId(type = IdType.AUTO)
    private Integer userId;

    private Integer userAge;

    private String intro;

    private String name;

    @TableField("USERNAME")
    private String username;

    @TableField("PASSWORD")
    private String password;

    private String email;

    private String role;

    private String profile;

    private Integer status;

    private Date created;

    private Date lastLogin;

    //从开始之日算起
    private Date vip_valid_date;

    //加上30/90/365/之后的日期
    private Date vip_expire_date;

    //积分
    private Integer integral;

    //会员是否禁用
    private Boolean vip_disableTip;
}
