package com.ttice.icewkment.commin.vo;

import lombok.Data;

import java.util.Date;

/**
 * 文章列表
 */

@Data
public class ArticleVO {
    private Integer id;
    private Date addTime;
    private Date createTime;
    private String author;
    private String title;
    private Integer ownerTag;
    private String status;
    private String thumb;
    private String sortClass;
    private String profile;
    private Integer hits;
    private Integer CommentNum;
    private String className;
    private Integer postNum;
}
