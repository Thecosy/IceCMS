package com.ttice.icewkment.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.Util.MathUtils;
import com.ttice.icewkment.commin.vo.ResourcePageVO;
import com.ttice.icewkment.entity.ArticleComment;
import com.ttice.icewkment.entity.Resource;
import com.ttice.icewkment.entity.ResourceClass;
import com.ttice.icewkment.entity.ResourceComment;
import com.ttice.icewkment.mapper.ResourceClassMapper;
import com.ttice.icewkment.mapper.ResourceCommentMapper;
import com.ttice.icewkment.service.ResourceService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
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
 * @since 2022-03-28
 */
@io.swagger.annotations.Api(tags = "后台资源管理接口")
@RestController
@RequestMapping("/resource")
public class ResourceController {

    @Autowired
    private ResourceService resourceService;

    @Autowired
    private ResourceClassMapper resourceClassMapper;

    @Autowired
    private ResourceCommentMapper resourceCommentMapper;

    @RequiresAuthentication  //需要登陆认证的接口
    @ApiOperation(value = "新增资源(修改)")
    @ApiImplicitParam(name = "resource",value = "资源",required = true)
    @PostMapping("/create")
    public Integer add(@RequestBody Resource resource) throws ParseException {
        //生成随机数注入
        int number = MathUtils.randomDigitNumber(7);
        resource.setArticleStatus(number);
        //查询分类名称对应的id值
        QueryWrapper<ResourceClass> wrapper= new QueryWrapper<ResourceClass>();
        wrapper.eq("name", resource.getSortClass());
        ResourceClass resourceClass = resourceClassMapper.selectOne(wrapper);

        resource.setSortClass(resourceClass.getId().toString());
        //saveOrUpdate:要在插入数据库时，如果有某一个主要字段的值重复，则不插入，否则则插入！
        resourceService.saveOrUpdate(resource);
        return resource.getId();
    }

    @RequiresAuthentication  //需要登陆认证的接口
    @ApiOperation(value = "获取全部资源(分页)")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page",value = "页数",required = true),
            @ApiImplicitParam(name = "limit",value = "总量",required = true)
    })
    @GetMapping("/getAllResource/{page}/{limit}")
    public ResourcePageVO getAllResource(
            @PathVariable("page") Integer page,
            @PathVariable("limit") Integer limit
    ) {
        return this.resourceService.VoList(page,limit);
    }

    @RequiresAuthentication  //需要登陆认证的接口
    @ApiOperation(value = "根据id删除资源")
    @ApiImplicitParam(name = "id",value = "资源id",required = true)
    @GetMapping("/DelectResourceById/{id}")
    public boolean DelectResourceById(
            @PathVariable("id") Integer id
    ) {
        //根据文章id删除评论
        QueryWrapper<ResourceComment> wrapper= new QueryWrapper<ResourceComment>();
        wrapper.eq("resource_id",id);
        resourceCommentMapper.delete(wrapper);
        return this.resourceService.removeById(id);
    }

    @RequiresAuthentication  //需要登陆认证的接口
    @ApiOperation(value = "根据id获取资源")
    @ApiImplicitParam(name = "id",value = "资源id",required = true)
    @GetMapping("/getResourceById/{id}")
    public Resource getResourceById(
            @PathVariable("id") Integer id
    ) {
        return this.resourceService.getById(id);
    }

}

