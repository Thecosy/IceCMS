package com.ttice.icewkment.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.commin.vo.SquareClassPageVO;
import com.ttice.icewkment.entity.ArticleClass;
import com.ttice.icewkment.entity.SquareClass;
import com.ttice.icewkment.mapper.ArticleClassMapper;
import com.ttice.icewkment.mapper.SquareClassMapper;
import com.ttice.icewkment.service.ArticleClassService;
import com.ttice.icewkment.service.SquareClassService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
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
@io.swagger.annotations.Api(tags = "后台圈子分类管理接口")
@RestController
@RequestMapping("/squareClass")
public class SquareClassController {

    @Autowired
    private ArticleClassService articleClassService;

    @Autowired
    private ArticleClassMapper articleClassMapper;

    @Autowired
    private SquareClassService squareClassService;

    @Autowired
    private SquareClassMapper squareClassMapper;

    @ApiOperation(value = "新建分类")
    @ApiImplicitParam(name = "articleClass",value = "文章分类对象",required = true)
    @PostMapping("/newSquareClass")
    public int newSquareClass(
            @RequestBody SquareClass squareClass
    ) {

        QueryWrapper<SquareClass> wrapper= new QueryWrapper<SquareClass>();
        wrapper.eq("name", squareClass.getName());
        SquareClass userjudje = squareClassService.getOne(wrapper);
        if(userjudje != null){
            //该分类已存在
            return 143;
        }
        return this.squareClassMapper.insert(squareClass);
    }

    @ApiOperation(value = "获取圈子分类列表(分页)")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page",value = "页数",required = true),
            @ApiImplicitParam(name = "limit",value = "总量",required = true)
    })
    @PostMapping("/allSquareClass/{page}/{limit}")
    public SquareClassPageVO allSquareClass(
            @PathVariable("page") Integer page,
            @PathVariable("limit") Integer limit
    ) {
        return this.squareClassService.GetList(page,limit);
    }

    @ApiOperation(value = "获取全部分类列表")
    @GetMapping("/getAllClassName")
    public List<SquareClass> getAllClassName(){

        QueryWrapper<SquareClass> wrapper= new QueryWrapper<SquareClass>();
        wrapper.orderByDesc("id");

        return  squareClassMapper.selectList(wrapper);
    }

    @ApiOperation(value = "根据id删除圈子分类评论")
    @ApiImplicitParam(name = "id",value = "文章id",required = true)
    @GetMapping("/DelectSquareClassById/{id}")
    public boolean DelectSquareClassById(
            @PathVariable("id") Integer id
    ) {
        //根据id删除
        QueryWrapper<SquareClass> wrapper= new QueryWrapper<SquareClass>();
        wrapper.eq("id",id);
        squareClassMapper.delete(wrapper);
        return this.squareClassService.removeById(id);
    }

    @RequiresAuthentication  //需要登陆认证的接口
    @ApiOperation(value = "根据id值查询对应的分类名称")
    @ApiImplicitParam(name = "id",value = "id",required = true)
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

