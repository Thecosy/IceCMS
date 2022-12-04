package com.ttice.icewkment.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

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
    public class ResourceClass implements Serializable {

    private static final long serialVersionUID=1L;

      /**
     * id
     */
        @TableId(value = "id", type = IdType.AUTO)
      private Integer id;

      /**
     * 名称
     */
      private String name;

      /**
     * 父级分类
     */
      private Integer father;

      /**
     * 别名
     */
      private String otherName;

      /**
     * 描述
     */
      private String describes;

      /**
     * 分类图片
     */
      private String imgclass;

      /**
     * 顶制
     */
      private Integer top;

      private Integer num;


}
