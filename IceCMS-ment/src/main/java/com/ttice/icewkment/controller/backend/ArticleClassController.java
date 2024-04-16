package com.ttice.icewkment.controller.backend;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.Util.MathUtils;
import com.ttice.icewkment.commin.lang.Result;
import com.ttice.icewkment.commin.vo.ArticleClassPageVO;
import com.ttice.icewkment.commin.vo.ClassNameVO;
import com.ttice.icewkment.entity.Article;
import com.ttice.icewkment.entity.ArticleClass;
import com.ttice.icewkment.entity.ArticleComment;
import com.ttice.icewkment.mapper.ArticleClassMapper;
import com.ttice.icewkment.service.ArticleClassService;
import com.ttice.icewkment.service.ArticleService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * 前端控制器
 *
 * @author admin
 * @since 2022-02-19
 */
@io.swagger.annotations.Api(tags = "后台分类管理接口")
@RestController
@RequestMapping("/articleClass")
public class ArticleClassController {

  @Autowired private ArticleClassService articleClassService;

  @Autowired private ArticleClassMapper articleClassMapper;

  @Autowired private ArticleService articleService;

  @RequiresAuthentication // 需要登陆认证的接口
  @ApiOperation(value = "新建文章分类")
  @ApiImplicitParam(name = "articleClass", value = "文章分类对象", required = true)
  @PostMapping("/newArticleClass")
  public Result newArticleClass(@RequestBody ArticleClass articleClass) {

    QueryWrapper<ArticleClass> wrapper = new QueryWrapper<ArticleClass>();
    wrapper.eq("name", articleClass.getName());
    ArticleClass userjudje = articleClassService.getOne(wrapper);
    if (userjudje != null) {
      // 该分类已存在
      return Result.fail("该分类已存在");
    }
    return Result.succ(articleClassMapper.insert(articleClass));
  }

  @RequiresAuthentication // 需要登陆认证的接口
  @ApiOperation(value = "新增文章(修改)")
  @ApiImplicitParam(name = "article", value = "文章", required = true)
  @PostMapping("/create")
  public Result add(@RequestBody Article article) {
    // 生成随机数注入
    int number = MathUtils.randomDigitNumber(7);
    article.setArticleStatus(number);
    // 查询分类名称对应的id值
    QueryWrapper<Article> wrapper = new QueryWrapper<>();
    wrapper.eq("title", article.getTitle());
    Article articleDB = articleService.getOne(wrapper);
    QueryWrapper<ArticleClass> wrapperClass = new QueryWrapper<ArticleClass>();
    wrapperClass.eq("name", article.getSortClass());
    ArticleClass articleClass = articleClassMapper.selectOne(wrapperClass);
    article.setSortClass(Integer.valueOf(articleClass.getId().toString()));
    if (articleDB == null) {
      articleService.save(article);
    } else {
      articleService.update(article, wrapper);
    }
    return Result.succ(article.getId());
  }

  @RequiresAuthentication // 需要登陆认证的接口
  @ApiOperation(value = "获取文章分类列表(分页)")
  @ApiImplicitParams({
    @ApiImplicitParam(name = "page", value = "页数", required = true),
    @ApiImplicitParam(name = "limit", value = "总量", required = true)
  })
  @GetMapping("/allArticleClass/{page}/{limit}")
  public Result allArticleClass(
      @PathVariable("page") Integer page, @PathVariable("limit") Integer limit) {

    return Result.succ(this.articleClassService.GetList(page, limit));
  }

  @RequiresAuthentication // 需要登陆认证的接口
  @ApiOperation(value = "删除文章分类")
  @ApiImplicitParam(name = "id", value = "id", required = true)
  @GetMapping("/DeleteArticleClass/{id}")
  public Result DeleteArticleClass(@PathVariable("id") Integer id) {
    // 根据分类id删除文章
    QueryWrapper<Article> wrapper = new QueryWrapper<Article>();
    wrapper.eq("sort_class", id);
    articleService.remove(wrapper);
    return Result.succ(articleClassMapper.deleteById(id));
  }

  @RequiresAuthentication // 需要登陆认证的接口
  @ApiOperation(value = "获取全部分类列表")
  @GetMapping("/getAllClassName")
  public Result getAllClassName() {
    List<ClassNameVO> result = new ArrayList<>();

    QueryWrapper<ArticleClass> wrapper = new QueryWrapper<ArticleClass>();
    wrapper.select("name", "id");
    ClassNameVO classNameVO = null;
    List<ArticleClass> articleClasses = articleClassMapper.selectList(wrapper);
    for (ArticleClass articleClass : articleClasses) {
      classNameVO = new ClassNameVO();
      BeanUtils.copyProperties(articleClass, classNameVO);
      result.add(classNameVO);
    }
    return Result.succ(result);
  }

  @RequiresAuthentication // 需要登陆认证的接口
  @ApiOperation(value = "根据id修改文章分类")
  @ApiImplicitParam(name = "id", value = "id", required = true)
  @PostMapping("/ReviseArticleClassById/{id}")
  public Result ReviseArticleClassById(@RequestBody ArticleClass articleClass) {
    return Result.succ(articleClassService.updateById(articleClass));
  }

  @RequiresAuthentication // 需要登陆认证的接口
  @ApiOperation(value = "根据id值查询对应的分类名称")
  @ApiImplicitParam(name = "id", value = "id", required = true)
  @GetMapping("/getClassNameById/{id}")
  public Result getClassNameById(@PathVariable("id") String id) {

    QueryWrapper<ArticleClass> wrapper = new QueryWrapper<ArticleClass>();
    wrapper.eq("id", id);

    ArticleClass articleClass = articleClassMapper.selectOne(wrapper);
    return Result.succ(articleClass.getName());
  }

  // 顶置分类
  @RequiresAuthentication // 需要登陆认证的接口
  @ApiOperation(value = "顶置分类")
  @ApiImplicitParam(name = "id", value = "id", required = true)
  @GetMapping("/topArticleClass/{id}")
  public Result topArticleClass(@PathVariable("id") Integer id) {
      ArticleClass articleClass = articleClassService.getById(id);
      // 设置为这个字段在数据库里面相反的
      articleClass.setTop(!articleClass.getTop());
      return Result.succ(articleClassService.updateById(articleClass));
  }
}
