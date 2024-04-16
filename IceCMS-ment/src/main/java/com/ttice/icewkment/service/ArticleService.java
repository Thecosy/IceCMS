package com.ttice.icewkment.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ttice.icewkment.commin.vo.ArticlePageVO;
import com.ttice.icewkment.entity.Article;
import org.springframework.stereotype.Repository;

/**
 * 服务类
 *
 * @author admin
 * @since 2022-02-19
 */
@Repository
public interface ArticleService extends IService<Article> {

  ArticlePageVO VoList(Integer page, Integer limit, Integer click);

  ArticlePageVO FindVoList(Integer page, Integer limit, String content);
}
