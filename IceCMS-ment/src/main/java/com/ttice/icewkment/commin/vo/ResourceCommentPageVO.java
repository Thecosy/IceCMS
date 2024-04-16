package com.ttice.icewkment.commin.vo;

import com.ttice.icewkment.entity.ArticleCommentVO;
import lombok.Data;

import java.util.List;

/** 分页VO */
@Data
public class ResourceCommentPageVO {
  private List<ResourceCommentVO> data;
  private Long total;
  private Long Pages;
}
