package com.ttice.icewkment.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

/**
 * @projectName: IceCMS-Pro-main
 * @package: com.ttice.icepayment.entity
 * @className: Panel
 * @author: Eric
 * @description: TODO
 * @date: 2023/8/12 14:34
 * @version: 1.0
 */
@Data
public class Panel {

  /** 面板CustomerNum */
  @TableId // 指定主键
  private Integer CustomerNum;

  /** 面板CommentNum */
  private Integer CommentNum;

  /** 面板SaleNum */
  private Integer SaleNum;

  /** 面板OrderNum */
  private Integer OrderNum;
}
