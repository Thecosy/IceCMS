package com.ttice.icewkment.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import java.util.Date;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author admin
 * @since 2022-01-13
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class Role implements Serializable {

  /** 唯一标识符 */
  private static final long serialVersionUID = 1L;

  /** id */
  @TableId(value = "id", type = IdType.AUTO)
  private Long id;

  /** 名称 */
  private String name;

  /** 分类 */
  private String sort;

  /** 创建时间 */
  private Date createTime;

  /** 更新时间 */
  private Date updateTime;

  /** code */
  private String code;

  /** 状态 */
  private Integer status;

  /** remark */
  private String remark;

}
