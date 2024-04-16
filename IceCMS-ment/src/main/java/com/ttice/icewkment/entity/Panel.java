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
  @TableId // 指定主键
  private Integer CustomerNum;
  private Integer CommentNum;
  private Integer SaleNum;
  private Integer OrderNum;
}
