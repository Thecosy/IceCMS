package com.ttice.icewkment.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ttice.icewkment.commin.vo.ArticlePageVO;
import com.ttice.icewkment.entity.ArticleComment;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleCommentService extends IService<ArticleComment> {
    int GetCommentNum(Integer articleId);

}
