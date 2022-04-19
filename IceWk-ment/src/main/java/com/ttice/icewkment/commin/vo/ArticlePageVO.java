package com.ttice.icewkment.commin.vo;

import lombok.Data;

import java.util.List;

/**
 * 分页VO
 */

@Data
public class ArticlePageVO {
    private List<ArticleVO> data;
    private Long total;
}
