package com.ttice.icewkment.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = false)
public class ArticleClass implements Serializable {

  /** id */
  @TableId(type = IdType.AUTO)
  private Integer id;

  /** 文章类别名称 */
  private String name;

  /** 文章类别创建者 */
  private Integer father;

  /** 文章类别别名 */
  private String otherName;

    /** 文章类别描述 */
  private String describes;

    /** 文章类别图片 */
  private String imgclass;

    /** 文章类别排序 */
  private Boolean top;

    /** 文章类别状态 */
  private Integer num;

}
