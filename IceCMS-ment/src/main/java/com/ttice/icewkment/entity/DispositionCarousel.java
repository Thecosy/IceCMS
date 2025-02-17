package com.ttice.icewkment.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author admin
 * @since 2022-01-13
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class DispositionCarousel implements Serializable {

  /** id */
  @TableId(type = IdType.AUTO)
  private Integer id;

  /** 轮播图标题 */
  private String title;

  /** 轮播图简介 */
  private String introduce;

  /** 轮播图按钮 */
  private String button;

  /** 轮播图图片 */
  private String img;
}
