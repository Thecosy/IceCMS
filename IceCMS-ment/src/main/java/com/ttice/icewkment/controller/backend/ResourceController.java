package com.ttice.icewkment.controller.backend;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.Util.MathUtils;
import com.ttice.icewkment.commin.lang.Result;
import com.ttice.icewkment.commin.vo.ResourceVO;
import com.ttice.icewkment.commin.vo.ResourcePageVO;
import com.ttice.icewkment.commin.vo.ResourceVO;
import com.ttice.icewkment.entity.*;
import com.ttice.icewkment.mapper.ResourceClassMapper;
import com.ttice.icewkment.mapper.ResourceCommentMapper;
import com.ttice.icewkment.mapper.UserMapper;
import com.ttice.icewkment.service.ResourceClassService;
import com.ttice.icewkment.service.ResourceCommentService;
import com.ttice.icewkment.service.ResourceService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 前端控制器
 *
 * @author admin
 * @since 2022-03-28
 */
@io.swagger.annotations.Api(tags = "后台资源管理接口")
@RestController
@RequestMapping("/resource")
public class ResourceController {

  @Autowired private ResourceService resourceService;

  @Autowired private UserMapper userMapper;

  @Autowired private ResourceCommentService resourceCommentService;

  @Autowired private ResourceClassMapper resourceClassMapper;

  @Autowired private ResourceCommentMapper resourceCommentMapper;

  @RequiresAuthentication // 需要登录认证的接口
  @ApiOperation(value = "新增资源")
  @ApiImplicitParam(name = "resource", value = "资源", required = true)
  @PostMapping("/create")
  public Result add(@RequestBody Resource resource) throws ParseException {
    // 生成随机数注入
    int number = MathUtils.randomDigitNumber(7);
    resource.setResourceStatus(number);
    // 设置资源状态为已发布
    resource.setStatus("published");
    // 查询分类名称对应的id值
    QueryWrapper<Resource> wrapper = new QueryWrapper<>();
    wrapper.eq("title", resource.getTitle());
    Resource resourceDB = resourceService.getOne(wrapper);
    if (resourceDB == null) {
      resourceService.save(resource);
    } else {
      resourceService.update(resource, wrapper);
    }
    return Result.succ(resource.getId());
  }

  @RequiresAuthentication // 需要登录认证的接口
  @ApiOperation(value = "获取全部资源(分页)")
  @ApiImplicitParams({
    @ApiImplicitParam(name = "page", value = "页数", required = true),
    @ApiImplicitParam(name = "limit", value = "总量", required = true)
  })
  @GetMapping("/getAllResource/{page}/{limit}")
  public Result getAllResource(
      @PathVariable("page") Integer page, @PathVariable("limit") Integer limit) {
    return Result.succ(resourceService.VoList(page, limit));
  }

  @RequiresAuthentication // 需要登录认证的接口
  @ApiOperation(value = "根据id修改资源")
  @ApiImplicitParam(name = "id", value = "资源id", required = true)
  @PostMapping("/ReviseResourceById/{id}")
  public Result ReviseResourceById(@RequestBody Resource resource) {
    return Result.succ(resourceService.updateById(resource));
  }

  @RequiresAuthentication // 需要登录认证的接口
  @ApiOperation(value = "根据id删除资源")
  @ApiImplicitParam(name = "id", value = "资源id", required = true)
  @GetMapping("/DelectResourceById/{id}")
  public Result DelectResourceById(@PathVariable("id") Integer id) {
    // 根据资源id删除评论
    QueryWrapper<ResourceComment> wrapper = new QueryWrapper<ResourceComment>();
    wrapper.eq("resource_id", id);
    resourceCommentMapper.delete(wrapper);
    return Result.succ(resourceService.removeById(id));
  }

  @RequiresAuthentication // 需要登录认证的接口
  @ApiOperation(value = "根据id获取资源")
  @ApiImplicitParam(name = "id", value = "资源id", required = true)
  @GetMapping("/getResourceById/{id}")
  public Result getResourceById(@PathVariable("id") Integer id) {

    return Result.succ(resourceService.getById(id));
  }

  @RequiresAuthentication // 需要登录认证的接口
  @ApiOperation(value = "获取资源名称")
  @ApiImplicitParams({
    @ApiImplicitParam(name = "resourceName", value = "资源名称", required = true),
  })
  @GetMapping("/getResourceByName/{name}")
  public Result UpdateResourceClass(@PathVariable("name") String resourceName) {

    LambdaQueryWrapper<Resource> wrapper = new LambdaQueryWrapper<>();
    wrapper.like(Resource::getTitle, resourceName);
    List<Resource> list = resourceService.list(wrapper);
    return Result.succ(list);
  }
  
  @RequiresAuthentication // 需要登录认证的接口
  @ApiOperation(value = "获取全部文章名称")
  @GetMapping("/getAllResourceName")
  public Result getAllResourceName() {
    // 拼装一个id还有一个name对应一个值的json
    List<Resource> resourceList = resourceService.list();
    List<ResourceVO> result = ResourceToResourceVo(resourceList);
    return Result.succ(result);
  }
  
  @RequiresAuthentication // 需要登录认证的接口
  @ApiOperation(value = "根据id批量删除资源")
  @ApiImplicitParam(name = "arr", value = "资源id", required = true)
  @PostMapping("/DeletetResourceBatch")
  public Result DeletetResourceBatch(@RequestBody int[] arr) {

    List<Integer> list = Arrays.stream(arr).boxed().collect(Collectors.toList());

    resourceService.removeByIds(list);

    return Result.succ(null);
  }

  public List<ResourceVO> ResourceToResourceVo(List<Resource> resourceList) {
    List<ResourceVO> result = new ArrayList<>();

    for (Resource resource : resourceList) {

      ResourceVO resourceVO = null;
      // 根据作者名称查询对应的头像地址
      Integer authorId = resource.getAuthorId();
      User users = userMapper.searchId(authorId);
      String profile = users.getProfile();
      resourceVO = new ResourceVO();
      resourceVO.setProfile(profile);
      // 根据文章id获取对应的评论数
      Integer aid = resource.getId();
      int acnum = resourceCommentService.GetCommentNum(aid);
      resourceVO.setCommentNum(acnum);
      // 获取对应分类
      String sortClass = String.valueOf(resource.getSortClass());
      ResourceClass resourceClass = resourceClassMapper.selectById(sortClass);
      String classname = resourceClass.getName();
      resourceVO.setClassName(classname);

      BeanUtils.copyProperties(resource, resourceVO);
      result.add(resourceVO);
    }

    return result;
  }
}

