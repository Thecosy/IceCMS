package com.ttice.icewkment.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * @author admin
 * @since 2022-01-13
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class Follows implements Serializable {

  /** id */
  @TableId(type = IdType.AUTO)
  private Integer id;

  /** 关注id */
  private Integer followerId;

  /** 关注者id */
  private Integer followingId;
}
