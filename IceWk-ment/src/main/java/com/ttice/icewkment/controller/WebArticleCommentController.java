package com.ttice.icewkment.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.entity.Article;
import com.ttice.icewkment.entity.ArticleComment;
import com.ttice.icewkment.entity.ArticleCommentVO;
import com.ttice.icewkment.mapper.ArticleCommentMapper;
import com.ttice.icewkment.mapper.ArticleMapper;
import com.ttice.icewkment.service.ArticleCommentService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
    private ArticleCommentMapper articleCommentMapper;

    @Autowired
    private ArticleCommentService articleCommentService;

    @Autowired
    private ArticleMapper articleMapper;

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
    @ApiImplicitParam(name = "articleId",value = "文章id",required = true)
    @GetMapping("/getArticleCommentnum/{articleId}")
    public int getArticleCommentnum(
            @PathVariable("articleId") Integer articleId
    ) {

        return articleCommentService.GetCommentNum(articleId);
    }

    @ApiOperation(value = "最新评论")
    @ApiImplicitParam(name = "num",value = "数量",required = true)
    @GetMapping("/getNewArticleComment/{num}")
    public List<ArticleCommentVO> getNewArticleComment(
            @PathVariable("num") Integer num
    ) {
        List<ArticleCommentVO> result = new ArrayList<>();
        QueryWrapper<ArticleComment> wrapper = new QueryWrapper<>();
        wrapper.orderByDesc("add_time");
        //使用last方法拼接sql语句
        wrapper.last("limit "+ num);
        List<ArticleComment> articleComments = articleCommentMapper.selectList(wrapper);
        for (ArticleComment articleComment : articleComments) {
            ArticleCommentVO articleCommentVO = new ArticleCommentVO();
            Integer articleId = articleComment.getArticleId();
            //根据文章id查询文章名称
            Article article = articleMapper.selectById(articleId);
            String title = article.getTitle();
            articleCommentVO.setArticleName(title);
            BeanUtils.copyProperties(articleComment,articleCommentVO);

            result.add(articleCommentVO);
        }
        return result;
    }

}

