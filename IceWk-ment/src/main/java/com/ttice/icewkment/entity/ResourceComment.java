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
     * 创建时间
     */
      private LocalDateTime addTime;

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
