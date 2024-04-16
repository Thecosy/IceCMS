package com.ttice.icewkment.commin.vo;

import com.ttice.icewkment.entity.ArticleClass;
import lombok.Data;

import java.util.List;

@Data
public class ArticleClassPageVO {
  private List<ArticleClass> data;
  private Long total;
}
