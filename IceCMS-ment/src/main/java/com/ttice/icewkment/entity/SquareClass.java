package com.ttice.icewkment.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = false)
public class SquareClass implements Serializable {

  /** id */
  @TableId(type = IdType.AUTO)
  private Integer id;

  /** 圈子名称 */
  private String name;

  /** 是否免费 */
  private Boolean isFree;

  /** price */
  private Integer price;

  /** 父类 */
  private Integer father;

  /** 别名 */
  private String otherName;

  /** 描述 */
  private String describes;

  /** 图片 */
  private String imgclass;

  /** 是否顶置 */
  private Boolean top;

  /** 数量 */
  private Integer num;

}
