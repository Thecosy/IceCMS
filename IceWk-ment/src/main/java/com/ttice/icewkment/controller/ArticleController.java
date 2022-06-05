package com.ttice.icewkment.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.Util.MathUtils;
import com.ttice.icewkment.commin.vo.ArticlePageVO;
import com.ttice.icewkment.entity.Article;
import com.ttice.icewkment.entity.ArticleClass;
import com.ttice.icewkment.entity.ArticleComment;
import com.ttice.icewkment.mapper.ArticleClassMapper;
import com.ttice.icewkment.mapper.ArticleCommentMapper;
import com.ttice.icewkment.mapper.ArticleMapper;
import com.ttice.icewkment.service.ArticleClassService;
import com.ttice.icewkment.service.ArticleService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author admin
 * @since 2022-02-19
 */
@io.swagger.annotations.Api(tags = "后台文章管理接口")
@RestController
@RequestMapping("/article")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private ArticleMapper articleMapper;

    @Autowired
    private ArticleClassService articleClassService;

    @Autowired
    private ArticleClassMapper articleClassMapper;

    @Autowired
    private ArticleCommentMapper articleCommentMapper;

    @RequiresAuthentication  //需要登陆认证的接口
    @ApiOperation(value = "新增文章(修改)")
    @ApiImplicitParam(name = "article",value = "文章",required = true)
    @PostMapping("/create")
    public Integer add(@RequestBody Article article) throws ParseException {
        //生成随机数注入
        int number = MathUtils.randomDigitNumber(7);
        article.setArticleStatus(number);
        //查询分类名称对应的id值
        QueryWrapper<ArticleClass> wrapper= new QueryWrapper<ArticleClass>();
        wrapper.eq("name", article.getSortClass());
        ArticleClass articleClass = articleClassMapper.selectOne(wrapper);

        article.setSortClass(articleClass.getId().toString());
        //saveOrUpdate:要在插入数据库时，如果有某一个主要字段的值重复，则不插入，否则则插入！
        articleService.saveOrUpdate(article);
        return article.getId();
    }

    @RequiresAuthentication  //需要登陆认证的接口
    @ApiOperation(value = "根据id删除文章")
    @ApiImplicitParam(name = "id",value = "文章id",required = true)
    @GetMapping("/DelectArticleById/{id}")
    public boolean DelectArticleById(
            @PathVariable("id") Integer id
    ) {
        //根据文章id删除评论
        QueryWrapper<ArticleComment> wrapper= new QueryWrapper<ArticleComment>();
        wrapper.eq("article_id",id);
        articleCommentMapper.delete(wrapper);
        return this.articleService.removeById(id);
    }

    //暂时无用
    @RequiresAuthentication  //需要登陆认证的接口
    @ApiOperation(value = "根据id修改文章")
    @ApiImplicitParam(name = "id",value = "文章对象",required = true)
    @PostMapping("/ReviseArticleById/{id}")
    public boolean ReviseArticleById(
            @RequestBody Article article
    ) {
        return this.articleService.updateById(article);
    }

    @RequiresAuthentication  //需要登陆认证的接口
    @ApiOperation(value = "根据id获取文章")
    @ApiImplicitParam(name = "id",value = "文章id",required = true)
    @GetMapping("/getArticleById/{id}")
    public Article getArticleById(
            @PathVariable("id") Integer id
    ) {
        return this.articleService.getById(id);
    }

    @RequiresAuthentication  //需要登陆认证的接口
    @ApiOperation(value = "获取全部文章(分页)")
    @ApiImplicitParam(name = "articleId",value = "文章id",required = true)
    @GetMapping("/getAllArticle/{page}/{limit}")
    public ArticlePageVO getAllArticle(
        @PathVariable("page") Integer page,
        @PathVariable("limit") Integer limit
    ) {
        return this.articleService.VoList(page,limit);
    }
}

