package com.ttice.icewkment.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = false)
public class AllTag implements Serializable {

  /** id */
  @TableId(type = IdType.AUTO)
  private Integer id;

  /** 标签名称 */
  private String tagName;
  
  /** 标签颜色 */
  private String color;
  
  /** 标签效果 */
  private String effect;
}
