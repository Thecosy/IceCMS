package com.ttice.icewkment.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@TableName("t_order_info")
public class OrderInfo implements Serializable {

  /** 订单标题 */
  private String title;

  /** 商户订单编号 */
  @TableId // 指定主键
  private String orderNo;

  /** 用户id */
  private Long userId;

  /** 支付方式 */
  private String payMent;

  /** 支付产品id */
  private Long productId;

  /** 订单金额(分) */
  private Integer totalFee;

  /** 订单二维码连接 */
  private String codeUrl;

  /** 订单状态 */
  private String orderStatus;

  /** 更新注解::自动填充 */
  @ApiModelProperty(value = "更新时间")
  @TableField(fill = FieldFill.INSERT_UPDATE)
  @JsonFormat(
          shape = JsonFormat.Shape.STRING,
          pattern = "yyyy-MM-dd HH:mm:ss",
          timezone = "GMT+8") // 返回前端自动把Data类型转换为json类型
  private Date updateTime;

  /** 生成时间 */
  @ApiModelProperty(value = "生成时间")
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
  private Date createTime;

  /** 完成性判断 */
  private Boolean alreadyDone;
}
