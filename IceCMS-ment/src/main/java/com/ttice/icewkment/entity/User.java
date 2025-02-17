package com.ttice.icewkment.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.models.auth.In;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Date;

/**
 * @author admin
 * @since 2022-01-13
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class User implements Serializable {

  /** 唯一标识符 */
  private static final long serialVersionUID = 1L;

  /** 用户id */
  @TableId(type = IdType.AUTO)
  private Integer userId;

  /** 微信小程序openid */
  private String openid;

  /** 年龄 */
  private Integer userage;

  /** 简介 */
  private String intro;

  /** 性别 */
  private Integer gender;

  /** 名称 */
  private String name;

  /** 用户名 */
  @TableField("USERNAME")
  private String username;

  /** 密码 */
  @TableField("PASSWORD")
  private String password;

  /** 邮箱 */
  private String email;

  /** 手机号 */
  private String phone;

  /** 角色 */
  private String role;

  /** 头像 */
  private String profile;

  /** 状态 */
  private Integer status;

  /** 生成时间 */
  @ApiModelProperty(value = "生成时间")
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
  private Date createTime;

  /** 最后登录 */
  private Date lastLogin;

  // 从开始之日算起
  /** vip有效期 */
  private Date vipValidDate;

  // 加上30/90/365/之后的日期
  /** vip截止日期 */
  private Date vipExpireDate;

  /** 积分 */
  private Integer integral;

  /** 会员是否禁用 */
  private Boolean vipDisableTip;

  /** 身高 */
  private String height;

  /** 生日 */
  private String birthday;

  /** 学历 */
  private String academic;

  /** 按月 */
  private String monthly;

  /** 父母 */
  private String permanent;
}
