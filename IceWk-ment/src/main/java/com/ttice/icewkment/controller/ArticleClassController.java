package com.ttice.icewkment.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.commin.vo.ArticleClassPageVO;
import com.ttice.icewkment.commin.vo.ClassNameVO;
import com.ttice.icewkment.entity.ArticleClass;
import com.ttice.icewkment.mapper.ArticleClassMapper;
import com.ttice.icewkment.service.ArticleClassService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
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
@io.swagger.annotations.Api(tags = "后台分类管理接口")
@RestController
@RequestMapping("/articleClass")
public class ArticleClassController {

    @Autowired
    private ArticleClassService articleClassService;

    @Autowired
    private ArticleClassMapper articleClassMapper;

    @RequiresAuthentication  //需要登陆认证的接口
    @ApiOperation(value = "新建文章分类")
    @ApiImplicitParam(name = "class",value = "文章分类对象",required = true)
    @PostMapping("/newArticleClass")
    public int newArticleClass(
            @RequestBody ArticleClass articleClass
    ) {

        QueryWrapper<ArticleClass> wrapper= new QueryWrapper<ArticleClass>();
        wrapper.eq("name", articleClass.getName());
        ArticleClass userjudje = articleClassService.getOne(wrapper);
        if(userjudje != null){
            //该分类已存在
            return 143;
        }
        return this.articleClassMapper.insert(articleClass);
    }

    @RequiresAuthentication  //需要登陆认证的接口
    @ApiOperation(value = "获取文章分类列表(分页)")
    @PostMapping("/allArticleClass/{page}/{limit}")
    public ArticleClassPageVO allArticleClass(
            @PathVariable("page") Integer page,
            @PathVariable("limit") Integer limit
    ) {
        return this.articleClassService.GetList(page,limit);
    }

    @RequiresAuthentication  //需要登陆认证的接口
    @ApiOperation(value = "删除文章分类")
    @GetMapping("/DeleteArticleClass/{id}")
    public int DeleteArticleClass(
            @PathVariable("id") Integer id
    ){
        return this.articleClassMapper.deleteById(id);
    }

    @RequiresAuthentication  //需要登陆认证的接口
    @ApiOperation(value = "获取全部分类列表")
    @GetMapping("/getAllClassName")
    public List<ClassNameVO> getAllClassName(){
        List<ClassNameVO> result = new ArrayList<>();

        QueryWrapper<ArticleClass> wrapper= new QueryWrapper<ArticleClass>();
        wrapper.select("name");
        ClassNameVO classNameVO = null;
        List<ArticleClass> articleClasses = articleClassMapper.selectList(wrapper);
        for (ArticleClass articleClass : articleClasses) {
            classNameVO = new ClassNameVO();
            BeanUtils.copyProperties(articleClass,classNameVO);
            result.add(classNameVO);
        }
        return result;
    }

    @RequiresAuthentication  //需要登陆认证的接口
    @ApiOperation(value = "根据id值查询对应的分类名称")
    @GetMapping("/getClassNameById/{id}")
    public String getClassNameById(
            @PathVariable("id") Integer id
    ){
        QueryWrapper<ArticleClass> wrapper= new QueryWrapper<ArticleClass>();
        wrapper.eq("id",id);

        ArticleClass articleClass = articleClassMapper.selectOne(wrapper);
        return articleClass.getName();
    }
}

