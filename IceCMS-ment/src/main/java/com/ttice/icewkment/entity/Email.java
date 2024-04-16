package com.ttice.icewkment.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class Email implements Serializable {

  /** 邮件接收方，可多人 */
  private String[] tos;

  /** 邮件主题 */
  private String subject;

  /** 邮件内容 */
  private String content;
}
