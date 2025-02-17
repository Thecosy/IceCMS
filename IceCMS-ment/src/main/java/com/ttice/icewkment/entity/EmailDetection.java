package com.ttice.icewkment.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Date;

/**
 * @author admin
 * @since 2022-01-13
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class EmailDetection implements Serializable {

  /** id */
  @TableId(type = IdType.AUTO)
  private Integer id;

  /** email邮箱 */
  private String email;

  /** email验证码 */
  private String code;

  /** email创建时间 */
  private Date time;
}
