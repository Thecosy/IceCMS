package com.ttice.icewkment.commin.vo;

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
public class SquareVO implements Serializable {

  private static final long serialVersionUID = 1L;

  /** id */
  @TableId(type = IdType.AUTO)
  private Integer id;

  /** 所厲栏目id */
  private String sortClass;

  /** 所厲栏目name */
  private String sortName;

  /** 文章标题 */
  private String title;

  private Integer commentNum;

  /** 标题颜色 */
  private String titleColor;

  /** 标题大小 */
  private String titlefontSize;

  /** 标题字形 */
  private Integer titlefontType;

  /** 文章内容 */
  private String content;

  private Integer loveNum;

  private String media;

  private Integer type;

  /** 作者 */
  private String author;

  private Integer userid;

  /** 图片 */
  private String image;

  /** 作者头像 */
  private String authorImg;

  /** 来源 */
  private String copyfrom;

  /** 录入者 */
  private String inputer;

  /** 转向连接 */
  private String httpUrl;

  /** 关健字 */
  private String keyword;

  /** 点击数 */
  private Integer hits;

  /** 评论数 */
  private Integer postNum;

  /** 是否顶制 */
  private Integer ontop;

  /** 是否推荐 */
  private Integer iselite;

  /** 是否删除 */
  private Integer deleted;

  /** 是否评论 */
  private String commentDisabled;

  /** 添加时间 */
  @ApiModelProperty(value = "创建时间")
  @TableField(fill = FieldFill.INSERT) // 创建注解::自动填充 -DEFAULT没有时，INSERT插入时
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
  //      @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
  // 返回前端自动把Data类型转换为json类型
  private Date addTime;

  /** 更新时间 */
  @ApiModelProperty(value = "更新时间")
  @TableField(fill = FieldFill.INSERT_UPDATE) // 更新注解::自动填充
  @JsonFormat(
      shape = JsonFormat.Shape.STRING,
      pattern = "yyyy-MM-dd HH:mm:ss",
      timezone = "GMT+8") // 返回前端自动把Data类型转换为json类型
  private Date updateTime;

  /** 生成时间 */
  @ApiModelProperty(value = "生成时间")
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
  private Date createTime;

  /** 最后评论时间 */
  @ApiModelProperty(value = "最后评论时间")
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
  private Date lastPost;
}
