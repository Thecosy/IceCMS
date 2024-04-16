package com.ttice.icewkment.controller.backend;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.commin.lang.Result;
import com.ttice.icewkment.entity.ResourceComment;
import com.ttice.icewkment.entity.ResourceComment;
import com.ttice.icewkment.mapper.ResourceCommentMapper;
import com.ttice.icewkment.mapper.ResourceCommentMapper;
import com.ttice.icewkment.service.ResourceCommentService;
import com.ttice.icewkment.service.ResourceCommentService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 前端控制器
 *
 * @author admin
 * @since 2022-03-28
 */
@io.swagger.annotations.Api(tags = "后台资源评论管理接口")
@RestController
@RequestMapping("/ResourceComment")
public class ResourceCommentController {

  @Autowired
  ResourceCommentMapper resourceCommentMapper;

  @Autowired
  ResourceCommentService resourceCommentService;

  @ApiOperation(value = "根据文章id查询对应的评论")
  @RequiresAuthentication // 需要登陆认证的接口
  @ApiImplicitParam(name = "articleId", value = "文章id", required = true)
  @GetMapping("/getallResourceComment/{articleId}")
  public Result getallResourceComment(@PathVariable("articleId") Integer articleId) {

    QueryWrapper<ResourceComment> wrapper = new QueryWrapper<>();
    wrapper.eq("article_id", articleId);

    return Result.succ(resourceCommentMapper.selectList(wrapper));
  }

  @ApiOperation(value = "获取全部评论(分页)")
  @RequiresAuthentication // 需要登陆认证的接口
  @ApiImplicitParams({
          @ApiImplicitParam(name = "page", value = "页数", required = true),
          @ApiImplicitParam(name = "limit", value = "总量", required = true)
  })
  @GetMapping("/getallResourceComments/{page}/{limit}")
  public Result getallResourceComments(
          @PathVariable("page") Integer page, @PathVariable("limit") Integer limit) {
    return Result.succ(resourceCommentService.VoList(page, limit, 0));
  }

  @ApiOperation(value = "增加评论")
  @RequiresAuthentication // 需要登陆认证的接口
  @PostMapping("/addResourceComment")
  @ApiImplicitParam(name = "ResourceComment", value = "文章分类对象", required = true)
  public Result addResourceComment(@RequestBody ResourceComment ResourceComment) {
    return Result.succ(resourceCommentMapper.insert(ResourceComment));
  }

  @ApiOperation(value = "查看文章对应评论数")
  @RequiresAuthentication // 需要登陆认证的接口
  @ApiImplicitParam(name = "articleId", value = "文章id", required = true)
  @GetMapping("/getResourceCommentnum/{articleId}")
  public Result getResourceCommentnum(@PathVariable("articleId") Integer articleId) {
    QueryWrapper<ResourceComment> wrapper = new QueryWrapper<>();
    wrapper.eq("article_id", articleId);
    return Result.succ(resourceCommentMapper.selectCount(wrapper));
  }

  @RequiresAuthentication // 需要登陆认证的接口
  @ApiOperation(value = "根据id删除评论")
  @ApiImplicitParam(name = "id", value = "评论id", required = true)
  @GetMapping("/DeleteResourceCommentById/{id}")
  public Result DeleteResourceCommentById(@PathVariable("id") Integer id) {
    // 根据文章id删除评论
    return Result.succ(resourceCommentService.removeById(id));
  }

  @RequiresAuthentication // 需要登陆认证的接口
  @ApiOperation(value = "根据id修改文章评论")
  @ApiImplicitParam(name = "id", value = "文章id", required = true)
  @PostMapping("/ReviseResourceCommentById/{id}")
  public Result ReviseResourceCommentById(@RequestBody ResourceComment ResourceComment) {
    return Result.succ(resourceCommentService.updateById(ResourceComment));
  }
  
}
