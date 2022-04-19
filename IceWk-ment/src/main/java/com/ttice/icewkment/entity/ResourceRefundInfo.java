package com.ttice.icewkment.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.time.LocalDateTime;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 
 * </p>
 *
 * @author admin
 * @since 2022-03-28
 */
@Data
  @EqualsAndHashCode(callSuper = false)
    public class ResourceRefundInfo implements Serializable {

    private static final long serialVersionUID=1L;

      /**
     * 退款单id
     */
        @TableId(value = "id", type = IdType.AUTO)
      private Long id;

      /**
     * 商户订单编号
     */
      private String orderNo;

      /**
     * 商户退款单编号
     */
      private String refundNo;

      /**
     * 支付系统退款单号
     */
      private String refundId;

      /**
     * 原订单金额(分)
     */
      private Integer totalFee;

      /**
     * 退款金额(分)
     */
      private Integer refund;

      /**
     * 退款原因
     */
      private String reason;

      /**
     * 退款状态
     */
      private String refundStatus;

      /**
     * 申请退款返回参数
     */
      private String contentReturn;

      /**
     * 退款结果通知参数
     */
      private String contentNotify;

      /**
     * 创建时间
     */
      private LocalDateTime createTime;

      /**
     * 更新时间
     */
      private LocalDateTime updateTime;


}
