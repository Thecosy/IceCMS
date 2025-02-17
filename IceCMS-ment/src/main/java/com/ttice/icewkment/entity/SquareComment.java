package com.ttice.icewkment.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Date;

/**
 * @author admin
 * @since 2022-02-19
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class SquareComment implements Serializable {

  private static final long serialVersionUID = 1L;

  /** id */
  @TableId(type = IdType.AUTO)
  private Integer id;

  /** 接受者 */
  @TableField(exist = false)
  private String responder;

  /** 发送者 */
  @TableField(exist = false)
  private String reviewers;

  /** 接受者id */
  @TableField(exist = false)
  private Integer responderId;

  /** 发送者id */
  @TableField(exist = false)
  private Integer reviewersId;

  /** 头像 */
  @TableField(exist = false)
  private String profile;

  /** 关系id */
  private Integer parentId;

  /** 类型 */
  private Integer type;

  /** 用户id */
  private Integer userId;

  /** 回复id */
  private Integer toUserId;

  /** 发送者id */
  private Integer postId;

  /** 内容 */
  private String content;

  /** 点赞数 */
  private Integer loveNum;

  /** 状态 */
  private Integer status;

  /** 添加时间 */
  @ApiModelProperty(value = "创建时间")
  @TableField(fill = FieldFill.INSERT) // 创建注解::自动填充 -DEFAULT没有时，INSERT插入时
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
  // @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
  // 返回前端自动把Data类型转换为json类型
  private Date addTime;
}
