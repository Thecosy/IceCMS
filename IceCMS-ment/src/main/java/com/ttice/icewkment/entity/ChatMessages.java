package com.ttice.icewkment.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(callSuper = false)
public class ChatMessages implements Serializable {

  /** id */
  @TableId(type = IdType.AUTO)
  private Integer id;

  /** 聊天内容 */
  private String text;

  /** 来源用户id */
  private Integer fromUserId;

    /** 目标用户id */
  private Integer toUserId;

  //    @ApiModelProperty(value = "创建时间")
  //    @TableField(fill = FieldFill.INSERT)//创建注解::自动填充 -DEFAULT没有时，INSERT插入时
  private LocalDateTime time;
}
