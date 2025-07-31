package com.ttice.icewkment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ttice.icewkment.commin.vo.ArticleCommentPageVO;
import com.ttice.icewkment.commin.vo.ArticleCommentVO;
import com.ttice.icewkment.commin.vo.ArticlePageVO;
import com.ttice.icewkment.commin.vo.ArticleVO;
import com.ttice.icewkment.entity.*;
import com.ttice.icewkment.mapper.ArticleCommentMapper;
import com.ttice.icewkment.mapper.ArticleMapper;
import com.ttice.icewkment.mapper.UserMapper;
import com.ttice.icewkment.service.ArticleCommentService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ArticleCommentServiceImpl extends ServiceImpl<ArticleCommentMapper, ArticleComment>
    implements ArticleCommentService {

  @Autowired private ArticleCommentMapper articleCommentMapper;

  @Autowired private UserMapper userMapper;

  @Autowired private ArticleMapper articleMapper;

  @Override
  public int GetCommentNum(Integer articleId) {
    QueryWrapper<ArticleComment> wrapper = new QueryWrapper<>();
    wrapper.eq("article_id", articleId);
    return articleCommentMapper.selectCount(wrapper);
  }

  @Override
  public ArticleCommentPageVO VoList(Integer page, Integer limit, Integer click) {
    List<ArticleCommentVO> result = new ArrayList<>();

    ArticleCommentVO articleCommentVO = null;

    Page<ArticleComment> articleCommentPage = new Page<>(page, limit);

    QueryWrapper<ArticleComment> wrapper = new QueryWrapper<ArticleComment>();
    wrapper.orderByDesc("id");

    Page<ArticleComment> resultPage = this.articleCommentMapper.selectPage(articleCommentPage, wrapper);

    List<ArticleComment> articleComments = resultPage.getRecords();
    for (ArticleComment articleComment : articleComments) {

      // 根据作者id查询对应的头像地址
      Integer author = articleComment.getUserId();
      User users = userMapper.searchId(author);
      String profile = users.getProfile();
      articleCommentVO = new ArticleCommentVO();
      // 根据作者id查询对应的名称
      String name = users.getName();
      // 获取对应文章名称
      Integer articleId = articleComment.getArticleId();
      Article article = articleMapper.selectById(articleId);
      String articleName = article.getTitle();
      articleCommentVO.setArticleName(articleName);

      BeanUtils.copyProperties(articleComment, articleCommentVO);
      articleCommentVO.setUsername(name);

      articleCommentVO.setProfile(profile);
      result.add(articleCommentVO);
    }
    ArticleCommentPageVO articleCommentPageVO = new ArticleCommentPageVO();
    articleCommentPageVO.setData(result);
    articleCommentPageVO.setTotal(resultPage.getTotal());
    articleCommentPageVO.setPages(resultPage.getPages());
    return articleCommentPageVO;
  }
}
