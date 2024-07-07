package com.ttice.icewkment.commin.vo;

import lombok.Data;

import java.util.Date;

/** 文章列表 */
@Data
public class ArticleVO {
  private Integer id;
  private Date addTime;
  private Date createTime;
  private Integer authorId;
  private String authorName;
  private String profile;
  private String title;
  private String intro;
  private Integer ownerTag;
  private String status;
  private String thumb;
  private String keyword;
  private Integer LoveNum;
  private String sortClass;
  private Integer hits;
  private Integer CommentNum;
  private String className;
  private Integer postNum;
  private String content;
}
