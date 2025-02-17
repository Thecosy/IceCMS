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

@Data
@EqualsAndHashCode(callSuper = false)
public class ArticleComment implements Serializable {

  /** id */
  @TableId(type = IdType.AUTO)
  private Integer id;

  /** 文章评论者id */
  private Integer userId;

  /** 文章评论内容 */
  private String content;

  /** 文章评论者名称 */
  private String username;

  /** 文章评论者头像 */
  private String email;

  /** 添加时间 */
  @ApiModelProperty(value = "创建时间")
  @TableField(fill = FieldFill.INSERT) // 创建注解::自动填充 -DEFAULT没有时，INSERT插入时
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
  //      @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
  // 返回前端自动把Data类型转换为json类型
  private Date addTime;

  /** 父id */
  private Integer parentId;

  /** 外键id */
  private Integer foreignId;

  /** 评论头像 */
  private String profile;

  /** 文章id */
  private Integer articleId;
}
