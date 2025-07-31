package com.ttice.icewkment.commin.vo;

import com.ttice.icewkment.entity.ArticleComment;
import lombok.Data;

import java.util.List;

/** 分页VO */
@Data
public class ArticleCommentPageVO {
  private List<ArticleCommentVO> data;
  private Long total;
  private Long Pages;
}
