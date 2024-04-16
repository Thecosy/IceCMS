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

  @TableField(exist = false)
  private String responder;

  @TableField(exist = false)
  private String reviewers;

  @TableField(exist = false)
  private Integer responderId;

  @TableField(exist = false)
  private Integer reviewersId;

  @TableField(exist = false)
  private String profile;

  private Integer parentId;
  private Integer type;
  private Integer userId;
  private Integer toUserId;
  private Integer postId;
  private String content;
  private Integer loveNum;
  private Integer status;

  /** 添加时间 */
  @ApiModelProperty(value = "创建时间")
  @TableField(fill = FieldFill.INSERT) // 创建注解::自动填充 -DEFAULT没有时，INSERT插入时
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
  // @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
  // 返回前端自动把Data类型转换为json类型
  private Date addTime;
}
