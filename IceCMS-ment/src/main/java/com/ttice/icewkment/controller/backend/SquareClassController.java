package com.ttice.icewkment.controller.backend;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.commin.lang.Result;
import com.ttice.icewkment.commin.vo.ClassNameVO;
import com.ttice.icewkment.commin.vo.SquareClassPageVO;
import com.ttice.icewkment.entity.ArticleClass;
import com.ttice.icewkment.entity.ResourceClass;
import com.ttice.icewkment.entity.Square;
import com.ttice.icewkment.entity.SquareClass;
import com.ttice.icewkment.mapper.ArticleClassMapper;
import com.ttice.icewkment.mapper.SquareClassMapper;
import com.ttice.icewkment.service.ArticleClassService;
import com.ttice.icewkment.service.SquareClassService;
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
@io.swagger.annotations.Api(tags = "后台圈子分类管理接口")
@RestController
@RequestMapping("/squareClass")
public class SquareClassController {

  @Autowired private ArticleClassService articleClassService;

  @Autowired private ArticleClassMapper articleClassMapper;

  @Autowired private SquareClassService squareClassService;

  @Autowired private SquareClassMapper squareClassMapper;

  @RequiresAuthentication // 需要登录认证的接口
  @ApiOperation(value = "新建分类")
  @ApiImplicitParam(name = "articleClass", value = "文章分类对象", required = true)
  @PostMapping("/newSquareClass")
  public int newSquareClass(@RequestBody SquareClass squareClass) {
    // 默认不顶置
    squareClass.setTop(false);
    QueryWrapper<SquareClass> wrapper = new QueryWrapper<SquareClass>();
    wrapper.eq("name", squareClass.getName());
    SquareClass userjudje = squareClassService.getOne(wrapper);
    if (userjudje != null) {
      // 该分类已存在
      return 143;
    }
    return this.squareClassMapper.insert(squareClass);
  }

  @RequiresAuthentication // 需要登录认证的接口
  @ApiOperation(value = "获取圈子分类列表(分页)")
  @ApiImplicitParams({
    @ApiImplicitParam(name = "page", value = "页数", required = true),
    @ApiImplicitParam(name = "limit", value = "总量", required = true)
  })
  @GetMapping("/allSquareClass/{page}/{limit}")
  public Result allSquareClass(
      @PathVariable("page") Integer page, @PathVariable("limit") Integer limit) {
    return Result.succ(squareClassService.GetList(page, limit));
  }

  @RequiresAuthentication // 需要登录认证的接口
  @ApiOperation(value = "获取全部分类列表")
  @GetMapping("/getAllClassName")
  public Result getAllClassName() {
    List<ClassNameVO> result = new ArrayList<>();

    QueryWrapper<SquareClass> wrapper = new QueryWrapper<SquareClass>();
    wrapper.select("name", "id");
    ClassNameVO classNameVO = null;
    List<SquareClass> resourceClasses = squareClassMapper.selectList(wrapper);
    for (SquareClass squareClass : resourceClasses) {
      classNameVO = new ClassNameVO();
      BeanUtils.copyProperties(squareClass, classNameVO);
      result.add(classNameVO);
    }
    return Result.succ(result);
  }

  @RequiresAuthentication // 需要登录认证的接口
  @ApiOperation(value = "根据id修改圈子分类")
  @ApiImplicitParam(name = "id", value = "id", required = true)
  @PostMapping("/ReviseSquareClassById/{id}")
  public Result ReviseSquareClassById(@RequestBody SquareClass squareClass) {
    return Result.succ(squareClassService.updateById(squareClass));
  }

  @RequiresAuthentication // 需要登录认证的接口
  @ApiOperation(value = "根据id删除圈子分类")
  @ApiImplicitParam(name = "id", value = "文章id", required = true)
  @GetMapping("/DelectSquareClassById/{id}")
  public boolean DelectSquareClassById(@PathVariable("id") Integer id) {
    // 根据id删除
    QueryWrapper<SquareClass> wrapper = new QueryWrapper<SquareClass>();
    wrapper.eq("id", id);
    squareClassMapper.delete(wrapper);
    return this.squareClassService.removeById(id);
  }

  @RequiresAuthentication // 需要登录认证的接口
  @ApiOperation(value = "根据id值查询对应的分类名称")
  @ApiImplicitParam(name = "id", value = "id", required = true)
  @GetMapping("/getClassNameById/{id}")
  public String getClassNameById(@PathVariable("id") Integer id) {
    QueryWrapper<ArticleClass> wrapper = new QueryWrapper<ArticleClass>();
    wrapper.eq("id", id);

    ArticleClass articleClass = articleClassMapper.selectOne(wrapper);
    return articleClass.getName();
  }

  @RequiresAuthentication  //需要登录认证的接口
  @ApiOperation(value = "根据id值对广场类进行更新")
  @ApiImplicitParam(name = "广场", value = "广场参数", required = true)
  @PostMapping("/updatePlantClass")
  public Result updatePlantClass(@RequestBody SquareClass squareClass) {
    squareClassService.updateById(squareClass);
    return Result.succ(null);
  }

  @RequiresAuthentication // 需要登录认证的接口
  @ApiOperation(value = "顶置分类")
  @ApiImplicitParam(name = "id", value = "id", required = true)
  @GetMapping("/topSquareClass/{id}")
  public Result topSquareClass(@PathVariable("id") Integer id) {
    SquareClass squareClass = squareClassService.getById(id);
    // 设置为这个字段在数据库里面相反的
    squareClass.setTop(!squareClass.getTop());
    return Result.succ(squareClassService.updateById(squareClass));
  }
}
