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

  private static final long serialVersionUID = 1L;

  @TableId(type = IdType.AUTO)
  private Integer userId;

  private Integer userage;

  private String intro;

  private String gender;

  private String name;

  @TableField("USERNAME")
  private String username;

  @TableField("PASSWORD")
  private String password;

  private String email;

  private String role;

  private String profile;

  private Integer status;

  /** 生成时间 */
  @ApiModelProperty(value = "生成时间")
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
  private Date createTime;

  private Date lastLogin;

  // 从开始之日算起
  private Date vipValidDate;

  // 加上30/90/365/之后的日期
  private Date vipExpireDate;

  // 积分
  private Integer integral;

  // 会员是否禁用
  private Boolean vipDisableTip;

  private String height;

  private String birthday;

  private String academic;

  private String monthly;

  private String permanent;
}
