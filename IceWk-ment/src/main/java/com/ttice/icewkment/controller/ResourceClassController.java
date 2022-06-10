package com.ttice.icewkment.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.commin.vo.ClassNameVO;
import com.ttice.icewkment.commin.vo.ResourceClassPageVO;
import com.ttice.icewkment.entity.ResourceClass;
import com.ttice.icewkment.mapper.ResourceClassMapper;
import com.ttice.icewkment.service.ResourceClassService;
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
 * <p>
 *  前端控制器
 * </p>
 *
 * @author admin
 * @since 2022-03-28
 */
@io.swagger.annotations.Api(tags = "后台资源分类管理接口")
@RestController
@RequestMapping("/ResourceClass")
public class ResourceClassController {

    @Autowired
    private ResourceClassService resourceClassService;

    @Autowired
    private ResourceClassMapper resourceClassMapper;

    @RequiresAuthentication  //需要登陆认证的接口
    @ApiOperation(value = "新建资源分类")
    @ApiImplicitParam(name = "resourceClass",value = "文章分类对象",required = true)
    @PostMapping("/newResourceClass")
    public int newResourceClass(
            @RequestBody ResourceClass resourceClass
    ) {
        QueryWrapper<ResourceClass> wrapper= new QueryWrapper<ResourceClass>();
        wrapper.eq("name", resourceClass.getName());
        ResourceClass userjudje = resourceClassService.getOne(wrapper);
        if(userjudje != null){
            //该分类已存在
            return 143;
        }
        return this.resourceClassMapper.insert(resourceClass);
    }

    @RequiresAuthentication  //需要登陆认证的接口
    @ApiOperation(value = "获取资源分类列表(分页)")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page",value = "页数",required = true),
            @ApiImplicitParam(name = "limit",value = "总量",required = true)
    })
    @PostMapping("/allResourceClass/{page}/{limit}")
    public ResourceClassPageVO allResourceClass(
            @PathVariable("page") Integer page,
            @PathVariable("limit") Integer limit
    ) {
        return this.resourceClassService.GetList(page,limit);
    }

    @RequiresAuthentication  //需要登陆认证的接口
    @ApiOperation(value = "删除资源分类")
    @ApiImplicitParam(name = "id",value = "id",required = true)
    @GetMapping("/DeleteResourceClass/{id}")
    public int DeleteResourceClass(
            @PathVariable("id") Integer id
    ){
        return this.resourceClassMapper.deleteById(id);
    }

    @RequiresAuthentication  //需要登陆认证的接口
    @ApiOperation(value = "根据id值查询对应的分类名称")
    @ApiImplicitParam(name = "id",value = "id",required = true)
    @GetMapping("/getClassNameById/{id}")
    public String getClassNameById(
            @PathVariable("id") Integer id
    ){
        QueryWrapper<ResourceClass> wrapper= new QueryWrapper<>();
        wrapper.eq("id",id);

        ResourceClass resourceClass = resourceClassMapper.selectOne(wrapper);
        return resourceClass.getName();
    }

    @RequiresAuthentication  //需要登陆认证的接口
    @ApiOperation(value = "获取全部分类列表")
    @GetMapping("/getAllClassName")
    public List<ClassNameVO> getAllClassName(){
        List<ClassNameVO> result = new ArrayList<>();

        QueryWrapper<ResourceClass> wrapper= new QueryWrapper<ResourceClass>();
        wrapper.select("name");
        ClassNameVO classNameVO = null;
        List<ResourceClass> resourceClasses = resourceClassMapper.selectList(wrapper);
        for (ResourceClass resourceClass : resourceClasses) {
            classNameVO = new ClassNameVO();
            BeanUtils.copyProperties(resourceClass,classNameVO);
            result.add(classNameVO);
        }
        return result;
    }
}

