package com.ttice.icewkment.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.entity.ArticleComment;
import com.ttice.icewkment.mapper.ArticleCommentMapper;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author admin
 * @since 2022-02-19
 */
@CrossOrigin
@io.swagger.annotations.Api(tags = "后台评论管理接口")
@RestController
@RequestMapping("/ArticleComment")
public class ArticleCommentController {

    @Autowired
    ArticleCommentMapper articleCommentMapper;

    @ApiOperation(value = "根据文章id查询对应的评论")
    @RequiresAuthentication  //需要登陆认证的接口
    @ApiImplicitParam(name = "articleId",value = "文章id",required = true)
    @GetMapping("/getallArticleComment/{articleId}")
    public List<ArticleComment> getallArticleComment(
            @PathVariable("articleId") Integer articleId
    ) {

        QueryWrapper<ArticleComment> wrapper = new QueryWrapper<>();
        wrapper.eq("article_id",articleId);

        return articleCommentMapper.selectList(wrapper);
    }

    @ApiOperation(value = "获取全部评论")
    @RequiresAuthentication  //需要登陆认证的接口
    @ApiImplicitParam(name = "articleId",value = "文章id",required = true)
    @GetMapping("/getallArticleComments")
    public List<ArticleComment> getallArticleComments(
    ) {
        QueryWrapper<ArticleComment> wrapper = new QueryWrapper<>();
        wrapper.orderByDesc("add_time");
        return articleCommentMapper.selectList(wrapper);
    }

    @ApiOperation(value = "增加评论")
    @RequiresAuthentication  //需要登陆认证的接口
    @PostMapping("/addArticleComment")
    @ApiImplicitParam(name = "articleComment",value = "文章分类对象",required = true)
    public int addArticleComment(@RequestBody ArticleComment articleComment) {
        return articleCommentMapper.insert(articleComment);
    }

    @ApiOperation(value = "查看文章对应评论数")
    @RequiresAuthentication  //需要登陆认证的接口
    @GetMapping("/getArticleCommentnum/{articleId}")
    @ApiImplicitParam(name = "articleId",value = "文章id",required = true)
    public int getArticleCommentnum(
            @PathVariable("articleId") Integer articleId
    ) {
        QueryWrapper<ArticleComment> wrapper = new QueryWrapper<>();
        wrapper.eq("article_id",articleId);
        return articleCommentMapper.selectCount(wrapper);
    }

}

