package com.ttice.icewkment.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.entity.ArticleComment;
import com.ttice.icewkment.mapper.ArticleCommentMapper;
import com.ttice.icewkment.service.ArticleCommentService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
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
@io.swagger.annotations.Api(tags = "Web文章评论接口")
@RestController
@RequestMapping("/WebArticleComment")
public class WebArticleCommentController {

    @Autowired
    ArticleCommentMapper articleCommentMapper;

    @Autowired
    ArticleCommentService articleCommentService;

    @ApiOperation(value = "根据文章id查询对应的评论")
    @ApiImplicitParam(name = "articleId",value = "文章id",required = true)
    @GetMapping("/getallArticleComment/{articleId}")
    public List<ArticleComment> getallArticleComment(
            @PathVariable("articleId") Integer articleId
    ) {

        QueryWrapper<ArticleComment> wrapper = new QueryWrapper<>();
        wrapper.eq("article_id",articleId);

        return articleCommentMapper.selectList(wrapper);
    }

    @ApiOperation(value = "增加评论")
    @PostMapping("/addArticleComment")
    @ApiImplicitParam(name = "articleComment",value = "文章分类对象",required = true)
    public int addArticleComment(@RequestBody ArticleComment articleComment) {
        return articleCommentMapper.insert(articleComment);
    }

    @ApiOperation(value = "查看文章对应评论数")
    @GetMapping("/getArticleCommentnum/{articleId}")
    @ApiImplicitParam(name = "articleId",value = "文章id",required = true)
    public int getArticleCommentnum(
            @PathVariable("articleId") Integer articleId
    ) {

        return articleCommentService.GetCommentNum(articleId);
    }

    @ApiOperation(value = "最新评论")
    @GetMapping("/getNewArticleComment/{num}")
    @ApiImplicitParam(name = "num",value = "获取数量",required = true)
    public List<ArticleComment> getNewArticleComment(
            @PathVariable("num") Integer num
    ) {
        QueryWrapper<ArticleComment> wrapper = new QueryWrapper<>();
        wrapper.orderByDesc("add_time");
        //使用last方法拼接sql语句
        wrapper.last("limit "+ num);
        return articleCommentMapper.selectList(wrapper);
    }

}

