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
    public class Resource implements Serializable {

    private static final long serialVersionUID=1L;

      /**
     * id
     */
        @TableId(value = "id", type = IdType.AUTO)
      private Integer id;

      /**
     * 所厲栏目Class
     */
      private String sortClass;

      /**
     * 文章标题
     */
      private String title;
      /**
       * 价格
       */
      private String price;
      /**
       * 是否免费
       */
      private Boolean isFree;

      /**
     * 标题颜色
     */
      private String titleColor;

      /**
     * 标题大小
     */
      private String titlefontSize;

      /**
     * 标题字形
     */
      private Integer titlefontType;

      /**
     * 完整标题
     */
      private String fullTitle;

      /**
     * 副标题
     */
      private String subhead;

      /**
     * 简介
     */
      private String intro;

      /**
     * 文章内容
     */
      private String content;

      /**
     * 作者
     */
      private String author;

      /**
     * 来源
     */
      private String copyfrom;

      /**
     * 录入者
     */
      private String inputer;

      /**
     * 转向连接
     */
      private String httpUrl;

      /**
     * 关健字
     */
      private String keyword;

      /**
     * 点击数
     */
      private Integer hits;

      /**
     * 评论数
     */
      private Integer postNum;

      /**
     * 是否评论
     */
      private String commentDisabled;

      /**
     * 是否顶制
     */
      private Integer ontop;

      /**
     * 是否推荐
     */
      private Integer iselite;

      /**
     * 是否删除
     */
      private Integer deleted;

      /**
     * 添加时间
     */
      private LocalDateTime addTime;

      /**
     * 更新时间
     */
      private LocalDateTime updateTime;

      /**
     * 生成时间
     */
      private LocalDateTime createTime;

      /**
     * 最后评论时间
     */
      private LocalDateTime lastPost;

      /**
     * 重要性
     */
      private Integer ownerTag;

      /**
     * 自定义备注
     */
      private String ownerRemark;

      /**
     * htm地址
     */
      private String htmlPath;

      /**
     * 上传文件地址
     */
      private String filePath;

      /**
     * 模板地址
     */
      private String tempPath;

      /**
     * 缩略图地址
     */
      private String thumb;

      /**
       * 轮播图地址
       */
      private String carousel;

      /**
     * 生成状态
     */
      private String status;

      /**
     * 文章状态身份
     */
      private Integer articleStatus;


}
