package com.ttice.icewkment.commin.vo;

import lombok.Data;

import java.util.Date;

/** 文章评论列表 */
@Data
public class ArticleCommentVO {
  private Integer id;
  private Integer userId;
  private String content;
  private String username;
  private String email;
  private Date addTime;
  private Integer parentId;
  private Integer foreignId;
  private String profile;
  private Integer articleId;
  private String articleName;
}
