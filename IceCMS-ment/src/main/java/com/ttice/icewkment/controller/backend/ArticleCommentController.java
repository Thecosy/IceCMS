package com.ttice.icewkment.controller.backend;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.commin.lang.Result;
import com.ttice.icewkment.entity.Article;
import com.ttice.icewkment.entity.ArticleComment;
import com.ttice.icewkment.mapper.ArticleCommentMapper;
import com.ttice.icewkment.service.ArticleCommentService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 前端控制器
 *
 * @author admin
 * @since 2022-02-19
 */
@CrossOrigin
@io.swagger.annotations.Api(tags = "后台评论管理接口")
@RestController
@RequestMapping("/ArticleComment")
public class ArticleCommentController {

  @Autowired ArticleCommentMapper articleCommentMapper;

  @Autowired
  ArticleCommentService articleCommentService;

  @ApiOperation(value = "根据文章id查询对应的评论")
  @RequiresAuthentication // 需要登录认证的接口
  @ApiImplicitParam(name = "articleId", value = "文章id", required = true)
  @GetMapping("/getallArticleComment/{articleId}")
  public Result getallArticleComment(@PathVariable("articleId") Integer articleId) {

    QueryWrapper<ArticleComment> wrapper = new QueryWrapper<>();
    wrapper.eq("article_id", articleId);

    return Result.succ(articleCommentMapper.selectList(wrapper));
  }

  @ApiOperation(value = "获取全部评论(分页)")
  @RequiresAuthentication // 需要登录认证的接口
  @ApiImplicitParams({
          @ApiImplicitParam(name = "page", value = "页数", required = true),
          @ApiImplicitParam(name = "limit", value = "总量", required = true)
  })
  @GetMapping("/getallArticleComments/{page}/{limit}")
  public Result getallArticleComments(
          @PathVariable("page") Integer page, @PathVariable("limit") Integer limit) {
    return Result.succ(articleCommentService.VoList(page, limit, 0));
  }

  @ApiOperation(value = "增加评论")
  @RequiresAuthentication // 需要登录认证的接口
  @PostMapping("/addArticleComment")
  @ApiImplicitParam(name = "articleComment", value = "文章分类对象", required = true)
  public Result addArticleComment(@RequestBody ArticleComment articleComment) {
    return Result.succ(articleCommentMapper.insert(articleComment));
  }

  @ApiOperation(value = "查看文章对应评论数")
  @RequiresAuthentication // 需要登录认证的接口
  @ApiImplicitParam(name = "articleId", value = "文章id", required = true)
  @GetMapping("/getArticleCommentnum/{articleId}")
  public Result getArticleCommentnum(@PathVariable("articleId") Integer articleId) {
    QueryWrapper<ArticleComment> wrapper = new QueryWrapper<>();
    wrapper.eq("article_id", articleId);
    return Result.succ(articleCommentMapper.selectCount(wrapper));
  }

  @RequiresAuthentication // 需要登录认证的接口
  @ApiOperation(value = "根据id删除评论")
  @ApiImplicitParam(name = "id", value = "评论id", required = true)
  @GetMapping("/DeleteArticleCommentById/{id}")
  public Result DeleteArticleCommentById(@PathVariable("id") Integer id) {
    // 根据文章id删除评论
    return Result.succ(articleCommentMapper.deleteById(id));
  }
  @RequiresAuthentication // 需要登录认证的接口
  @ApiOperation(value = "根据id修改文章评论")
  @ApiImplicitParam(name = "id", value = "文章id", required = true)
  @PostMapping("/ReviseArticleCommentById/{id}")
  public Result ReviseArticleCommentById(@RequestBody ArticleComment articleComment) {
    return Result.succ(articleCommentService.updateById(articleComment));
  }

}
