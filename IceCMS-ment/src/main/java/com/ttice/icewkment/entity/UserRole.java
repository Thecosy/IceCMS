package com.ttice.icewkment.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;
import java.util.Date;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author admin
 * @since 2022-01-13
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class UserRole implements Serializable {

  /** 指定主键 */
  @TableId
  private Integer userId;

  /** 角色id */
  private Integer roleId;
}
