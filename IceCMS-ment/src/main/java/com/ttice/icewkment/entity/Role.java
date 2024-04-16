package com.ttice.icewkment.entity;

import com.baomidou.mybatisplus.annotation.TableField;
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

  private static final long serialVersionUID = 1L;

  private Integer id;

  private String name;

  private String sort;

  private Date createTime;

  private Date updateTime;

  private String code;

  private Integer status;

  private String remark;

}
