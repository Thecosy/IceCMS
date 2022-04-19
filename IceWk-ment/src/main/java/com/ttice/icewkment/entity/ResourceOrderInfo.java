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
    public class ResourceOrderInfo implements Serializable {

    private static final long serialVersionUID=1L;

      /**
     * 订单id
     */
        @TableId(value = "id", type = IdType.AUTO)
      private Long id;

      /**
     * 订单标题
     */
      private String title;

      /**
     * 商户订单编号
     */
      private String orderNo;

      /**
     * 用户id
     */
      private Long userId;

      /**
     * 支付方式
     */
      private String payMent;

      /**
     * 支付产品id
     */
      private Long productId;

      /**
     * 订单金额(分)
     */
      private Integer totalFee;

      /**
     * 订单二维码连接
     */
      private String codeUrl;

      /**
     * 订单状态
     */
      private String orderStatus;

      /**
     * 创建时间
     */
      private LocalDateTime createTime;

      /**
     * 更新时间
     */
      private LocalDateTime updateTime;


}
