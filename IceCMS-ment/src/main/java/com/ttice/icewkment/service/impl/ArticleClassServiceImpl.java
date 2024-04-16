package com.ttice.icewkment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ttice.icewkment.commin.vo.ArticleClassPageVO;
import com.ttice.icewkment.entity.Article;
import com.ttice.icewkment.entity.ArticleClass;
import com.ttice.icewkment.mapper.ArticleClassMapper;
import com.ttice.icewkment.mapper.ArticleMapper;
import com.ttice.icewkment.service.ArticleClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 服务实现类 ArticleClass实现分页功能
 *
 * @author admin
 * @since 2022-02-19
 */
@Service
public class ArticleClassServiceImpl extends ServiceImpl<ArticleClassMapper, ArticleClass>
    implements ArticleClassService {

  @Autowired private ArticleClassMapper articleClassMapper;

  @Autowired private ArticleMapper articleMapper;

  @Override
  public ArticleClassPageVO GetList(Integer page, Integer limit) {
    Page<ArticleClass> ArticleClassPage = new Page<>(page, limit);
    ArticleClassPageVO classPageVO = new ArticleClassPageVO();
    List<ArticleClass> result = new ArrayList<>();
    QueryWrapper<ArticleClass> wrapper = new QueryWrapper<>();
    wrapper.orderByDesc("id");

    Page<ArticleClass> resultPage = this.articleClassMapper.selectPage(ArticleClassPage, wrapper);
    List<ArticleClass> articleClasses = resultPage.getRecords();
    for (ArticleClass articleClasse : articleClasses) {
      Integer id = articleClasse.getId();
      QueryWrapper<Article> queryWrapper = new QueryWrapper<>();
      queryWrapper.eq("sort_class", id);
      Integer count = articleMapper.selectCount(queryWrapper);
      articleClasse.setNum(count);
      result.add(articleClasse);
    }
    long total = resultPage.getTotal();
    classPageVO.setData(result);
    classPageVO.setTotal(total);
    return classPageVO;
  }
}
