package com.ttice.icewkment.controller.backend;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.commin.lang.Result;
import com.ttice.icewkment.commin.vo.ClassNameVO;
import com.ttice.icewkment.commin.vo.ResourceClassPageVO;
import com.ttice.icewkment.entity.ArticleClass;
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
 * 前端控制器
 *
 * @author admin
 * @since 2022-03-28
 */
@io.swagger.annotations.Api(tags = "后台资源分类管理接口")
@RestController
@RequestMapping("/ResourceClass")
public class ResourceClassController {

  @Autowired private ResourceClassService resourceClassService;

  @Autowired private ResourceClassMapper resourceClassMapper;

  @RequiresAuthentication // 需要登陆认证的接口
  @ApiOperation(value = "新建资源分类")
  @ApiImplicitParam(name = "resourceClass", value = "文章分类对象", required = true)
  @PostMapping("/newResourceClass")
  public Result newResourceClass(@RequestBody ResourceClass resourceClass) {
    QueryWrapper<ResourceClass> wrapper = new QueryWrapper<ResourceClass>();
    wrapper.eq("name", resourceClass.getName());
    ResourceClass userjudje = resourceClassService.getOne(wrapper);
    if (userjudje != null) {
      // 该分类已存在
      return Result.fail("该分类已存在");
    }
    return Result.succ(resourceClassMapper.insert(resourceClass));
  }

  @RequiresAuthentication // 需要登陆认证的接口
  @ApiOperation(value = "获取资源分类列表(分页)")
  @ApiImplicitParams({
    @ApiImplicitParam(name = "page", value = "页数", required = true),
    @ApiImplicitParam(name = "limit", value = "总量", required = true)
  })
  @GetMapping("/allResourceClass/{page}/{limit}")
  public Result allResourceClass(
      @PathVariable("page") Integer page, @PathVariable("limit") Integer limit) {
    return Result.succ(resourceClassService.GetList(page, limit));
  }

  @RequiresAuthentication // 需要登陆认证的接口
  @ApiOperation(value = "删除资源分类")
  @ApiImplicitParam(name = "id", value = "id", required = true)
  @GetMapping("/DeleteResourceClass/{id}")
  public Result DeleteResourceClass(@PathVariable("id") Integer id) {
    return Result.succ(resourceClassMapper.deleteById(id));
  }

  @RequiresAuthentication // 需要登陆认证的接口
  @ApiOperation(value = "根据id值查询对应的分类名称")
  @ApiImplicitParam(name = "id", value = "id", required = true)
  @GetMapping("/getClassNameById/{id}")
  public Result getClassNameById(@PathVariable("id") Integer id) {
    QueryWrapper<ResourceClass> wrapper = new QueryWrapper<>();
    wrapper.eq("id", id);

    ResourceClass resourceClass = resourceClassMapper.selectOne(wrapper);
    return Result.succ(resourceClass.getName());
  }

  @RequiresAuthentication // 需要登陆认证的接口
  @ApiOperation(value = "获取全部分类列表")
  @GetMapping("/getAllClassName")
  public Result getAllClassName() {
    List<ClassNameVO> result = new ArrayList<>();

    QueryWrapper<ResourceClass> wrapper = new QueryWrapper<ResourceClass>();
    wrapper.select("name", "id");
    ClassNameVO classNameVO = null;
    List<ResourceClass> resourceClasses = resourceClassMapper.selectList(wrapper);
    for (ResourceClass resourceClass : resourceClasses) {
      classNameVO = new ClassNameVO();
      BeanUtils.copyProperties(resourceClass, classNameVO);
      result.add(classNameVO);
    }
    return Result.succ(result);
  }

  @RequiresAuthentication // 需要登陆认证的接口
  @ApiOperation(value = "根据id修改资源分类")
  @ApiImplicitParam(name = "id", value = "id", required = true)
  @PostMapping("/ReviseResourceClassById/{id}")
  public Result ReviseResourceClassById(@RequestBody ResourceClass resourceClass) {
    return Result.succ(resourceClassService.updateById(resourceClass));
  }

  // 顶置分类
  @RequiresAuthentication // 需要登陆认证的接口
  @ApiOperation(value = "顶置分类")
  @ApiImplicitParam(name = "id", value = "id", required = true)
  @GetMapping("/topResourceClass/{id}")
  public Result topResourceClass(@PathVariable("id") Integer id) {
    ResourceClass resourceClass = resourceClassService.getById(id);
    // 设置为这个字段在数据库里面相反的
    resourceClass.setTop(!resourceClass.getTop());
    return Result.succ(resourceClassService.updateById(resourceClass));
  }
}
