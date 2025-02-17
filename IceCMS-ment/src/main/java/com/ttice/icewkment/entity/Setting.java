package com.ttice.icewkment.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * @author admin
 * @since 2022-01-13
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class Setting implements Serializable {

  /** 唯一标识符 */
  private static final long serialVersionUID = 1L;

  /** id */
  private Integer id;

  /** 备案号 */
  private String beian;

  /** 版权 */
  private String banquan;

  /** 是否展示评论 */
  private boolean comment_show;

  /** 网站标题 */
  private String sitTitle;

  /** 网站地址 */
  private String sitSrc;

  /** 网站Logo */
  private String sitLogo;

  /** 网站图片 */
  private boolean imageFormat;

  /** 移动端展示 */
  private boolean h5Show;

}
