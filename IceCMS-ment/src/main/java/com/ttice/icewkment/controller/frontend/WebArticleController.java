package com.ttice.icewkment.controller.frontend;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.commin.vo.ArticlePageVO;
import com.ttice.icewkment.commin.vo.ArticleVO;
import com.ttice.icewkment.entity.Article;
import com.ttice.icewkment.entity.ArticleClass;
import com.ttice.icewkment.entity.User;
import com.ttice.icewkment.mapper.ArticleClassMapper;
import com.ttice.icewkment.mapper.ArticleMapper;
import com.ttice.icewkment.mapper.UserMapper;
import com.ttice.icewkment.service.ArticleCommentService;
import com.ttice.icewkment.service.ArticleService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.models.auth.In;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

/**
 * 前端控制器
 *
 * @author admin
 * @since 2022-02-19
 */
@io.swagger.annotations.Api(tags = "Web文章接口")
@RestController
@RequestMapping("/WebArticle")
public class WebArticleController {
  @Autowired private ArticleService articleService;
  @Autowired private ArticleMapper articleMapper;
  @Autowired private UserMapper userMapper;
  @Autowired private ArticleCommentService articleCommentService;
  @Autowired private ArticleClassMapper articleClassMapper;

  @ApiOperation(value = "根据id获取文章内容")
  @ApiImplicitParam(name = "id", value = "文章id", required = true)
  @GetMapping("/getArticleById/{id}")
  public ArticleVO getArticleById(@PathVariable("id") Integer id) {
    Article article = articleService.getById(id);
    String sortClass = String.valueOf(article.getSortClass());
    QueryWrapper<ArticleClass> wrapper = new QueryWrapper<>();
    wrapper.eq("id", sortClass);
    ArticleClass articleClass = articleClassMapper.selectOne(wrapper);
    String name = articleClass.getName();

    // 根据用户id获取用户
    Integer authorId = article.getAuthorId();
    User user = userMapper.searchId(authorId);
    String profile = user.getProfile();
    String username = user.getUsername();

    ArticleVO articleBuffer = new ArticleVO();
    BeanUtils.copyProperties(article, articleBuffer);
    articleBuffer.setSortClass(name);
    articleBuffer.setProfile(profile);
    articleBuffer.setAuthorName(username);
    articleBuffer.setLoveNum(article.getLoveNum());

    return articleBuffer;
  }

  @ApiOperation(value = "根据author获取文章")
  @GetMapping("/getAllArticlebyAuthor/{author}")
  public List<Article> getAllArticlebyAuthor(@PathVariable("author") String author) {
    QueryWrapper<Article> wrapper = new QueryWrapper<>();
    wrapper.select().eq("author", author);
    return articleMapper.selectList(wrapper);
  }

  @ApiOperation(value = "获取全部文章列表(分页)")
  @ApiImplicitParams({
    @ApiImplicitParam(name = "page", value = "页数", required = true),
    @ApiImplicitParam(name = "limit", value = "总量", required = true)
  })
  @GetMapping("/getAllArticle/{page}/{limit}/{click}")
  public ArticlePageVO getAllArticle(
      @PathVariable("page") Integer page,
      @PathVariable("limit") Integer limit,
      @PathVariable("click") Integer click) {
    return this.articleService.VoList(page, limit, click);
  }

  @ApiOperation(value = "获取最新文章列表")
  @ApiImplicitParams({
    @ApiImplicitParam(name = "articleNum", value = "数量", required = true),
    @ApiImplicitParam(name = "check", value = "条件", required = true)
  })
  @GetMapping("/getNewArticle/{articleNum}/{check}")
  public List<ArticleVO> getNewAllArticle(
      @PathVariable("articleNum") Integer articleNum, @PathVariable("check") String check) {
    List<ArticleVO> result = new ArrayList<>();

    ArticleVO articleVO = null;

    QueryWrapper<Article> wrapper = new QueryWrapper<Article>();
    // wrapper限制查询数量
    wrapper.last("limit " + articleNum);
    if (check.equals("new")) {
      wrapper.orderByDesc("id");
    }
    if (check.equals("love")) {
      wrapper.orderByDesc("love_num");
    }
    if (check.equals("recommend")) {
      wrapper.orderByDesc("owner_tag");
    }
    if (check.equals("download")) {
      wrapper.orderByDesc("hits");
    }
    if (check.equals("discuss")) {
      wrapper.orderByDesc("post_num");
    }
    List<Article> articles = articleMapper.selectList(wrapper);
    for (Article article : articles) {
      articleVO = new ArticleVO();
      QueryWrapper<ArticleClass> wrapper1 = new QueryWrapper<>();
      wrapper1.eq("id", article.getSortClass());
      ArticleClass articleClass = articleClassMapper.selectOne(wrapper1);
      String name = articleClass.getName();
      BeanUtils.copyProperties(article, articleVO);
      articleVO.setClassName(name);
      result.add(articleVO);
    }
    return result;
  }

  @ApiOperation(value = "获取所有文章数量")
  @GetMapping("/getAllArticleNumber")
  public Integer getAllArticleNumber() {
    QueryWrapper<Article> wrapper = new QueryWrapper<>();
    wrapper.select().eq("status", "published");
    return articleMapper.selectCount(wrapper);
  }

  @ApiOperation(value = "统计文章浏览量+1")
  @ApiImplicitParam(name = "id", value = "文章id", required = true)
  @GetMapping("/articles/{id}/view")
  public Boolean articlesViewBrowse(@PathVariable("id") Integer id) {
    return articleMapper.articlesBrowse(id);
  }

  @ApiOperation(value = "统计文章喜欢量+1")
  @ApiImplicitParam(name = "id", value = "文章id", required = true)
  @GetMapping("/articles/{id}/love")
  public Boolean articlesLoveBrowse(@PathVariable("id") Integer id) {
    return articleMapper.articlesLoveBrowse(id);
  }

  @ApiOperation(value = "文章查询(全部)")
  @ApiImplicitParam(name = "content", value = "模糊查询标题", required = true)
  @GetMapping("/findarticles/{content}")
  public List<Article> Findarticles(@PathVariable("content") String content) {
    QueryWrapper<Article> wrapper = new QueryWrapper<>();
    wrapper.like("title", content);
    return articleMapper.selectList(wrapper);
  }

  @ApiOperation(value = "文章查询(预览)")
  @ApiImplicitParam(name = "content", value = "模糊查询标题", required = true)
  @GetMapping("/findarticlesbynum/{content}/{num}")
  public List<Article> FindarticlesByNum(
      @PathVariable("content") String content, @PathVariable("num") String num) {
    QueryWrapper<Article> wrapper = new QueryWrapper<>();
    wrapper.like("title", content).last("limit " + num);
    return articleMapper.selectList(wrapper);
  }

  @ApiOperation(value = "查询文章(分页)")
  @ApiImplicitParams({
    @ApiImplicitParam(name = "content", value = "内容", required = true),
    @ApiImplicitParam(name = "page", value = "页数", required = true),
    @ApiImplicitParam(name = "limit", value = "总量", required = true)
  })
  @GetMapping("/FindAllArticle/{content}/{page}/{limit}")
  public ArticlePageVO FindAllArticle(
      @PathVariable("content") String content,
      @PathVariable("page") Integer page,
      @PathVariable("limit") Integer limit) {
    return this.articleService.FindVoList(page, limit, content);
  }

  @ApiOperation(value = "根据作者name查询对应头像")
  @ApiImplicitParam(name = "name", value = "作者名称", required = true)
  @GetMapping("/FindProfileByName/{name}")
  public String FindProfileByName(@PathVariable("name") String name) {
    QueryWrapper<User> Wrapper = new QueryWrapper<>();
    Wrapper.eq("USERNAME", name);
    User user = this.userMapper.selectOne(Wrapper);
    return user.getProfile();
  }

  @ApiOperation(value = "获取重要文章")
  @GetMapping("/GetArticleBtmatter")
  public List<ArticleVO> GetArticleBtmatter() {
    List<ArticleVO> result = new ArrayList<>();

    QueryWrapper<Article> Wrapper = new QueryWrapper<>();
    Wrapper.select().orderByAsc("add_time");
    Wrapper.orderByDesc("owner_tag");
    Wrapper.last("limit 0,4");
    List<Article> articles = this.articleMapper.selectList(Wrapper);
    for (Article article : articles) {
      // 获取id
      Integer aid = article.getId();
      // 获取对应评论数量
      int acnum = articleCommentService.GetCommentNum(aid);
      // 根据作者名称查询对应的头像地址
      Integer authorId = article.getAuthorId();
      User users = userMapper.searchId(authorId);
      String profile = users.getProfile();
      // 获取对应分类
      String sortClass = String.valueOf(article.getSortClass());
      ArticleClass articleClass = articleClassMapper.selectById(sortClass);
      String classname = articleClass.getName();

      ArticleVO articleVOs = new ArticleVO();
      articleVOs.setProfile(profile);
      articleVOs.setCommentNum(acnum);
      articleVOs.setClassName(classname);

      BeanUtils.copyProperties(article, articleVOs);
      result.add(articleVOs);
    }
    return result;
  }

  @ApiOperation(value = "获取文章上一页(标题)")
  @GetMapping("/getPrenewsArticle/{id}")
  public Map<String, Object> getPrenewsArticle(@PathVariable("id") String id) {
    QueryWrapper<Article> wrapper = new QueryWrapper<>();
    wrapper
        .gt("id", id) // 大于
        .orderByAsc("id")
        .last("limit 1");
    Article article = articleMapper.selectOne(wrapper);
    if (article == null) {
      Map<String, Object> list = new HashMap<String, Object>();
      Date date = new Date();
      list.put("title", "当前已是最新文章");
      list.put("addTime", date);
      list.put("createTime", date);
      list.put("id", 1);
      return list;
    }
    String title = article.getTitle();
    Date addTime = article.getAddTime();
    Date createTime = article.getCreateTime();
    Integer id1 = article.getId();
    Map<String, Object> list = new HashMap<String, Object>();
    list.put("title", title);
    list.put("addTime", addTime);
    list.put("createTime", createTime);
    list.put("id", id1);
    return list;
  }

  @ApiOperation(value = "获取文章下一页(标题)")
  @GetMapping("/getLastnewsArticle/{id}")
  public Map<String, Object> getLastnewsArticle(@PathVariable("id") String id) {
    QueryWrapper<Article> wrapper = new QueryWrapper<>();
    wrapper
        .lt("id", id) // 小于
        .orderByDesc("id")
        .last("limit 1");
    Article article = articleMapper.selectOne(wrapper);
    if (article == null) {
      return null;
    }
    String title = article.getTitle();
    Date addTime = article.getAddTime();
    Date createTime = article.getCreateTime();
    Integer id1 = article.getId();
    Map<String, Object> list = new HashMap<String, Object>();
    list.put("title", title);
    list.put("addTime", addTime);
    list.put("createTime", createTime);
    list.put("id", id1);
    return list;
  }
}
