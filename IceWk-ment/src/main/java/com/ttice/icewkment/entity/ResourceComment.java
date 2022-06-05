package com.ttice.icewkment.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import java.time.LocalDateTime;
import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
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
    public class ResourceComment implements Serializable {

    private static final long serialVersionUID=1L;

      /**
     * id
     */
        @TableId(value = "id", type = IdType.AUTO)
      private Integer id;

      /**
     * 内容
     */
      private String content;

      /**
     * 用户名
     */
      private String username;
      /**
       * 邮箱
       */
      private String email;

      /**
       * 添加时间
       */
      @ApiModelProperty(value = "创建时间")
      @TableField(fill = FieldFill.INSERT)//创建注解::自动填充 -DEFAULT没有时，INSERT插入时
      @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    //      @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    // 返回前端自动把Data类型转换为json类型
      private Date addTime;

      /**
     * 父id
     */
      private Integer parentId;

      /**
     * 外部id
     */
      private Integer foreignId;

      /**
     * 头像
     */
      private String profile;

      /**
     * 文章id
     */
      private Integer resourceId;

      /**
     * 用户id
     */
      private Integer userId;


}
