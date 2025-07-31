package com.ttice.icewkment.controller.backend;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.Util.MathUtils;
import com.ttice.icewkment.commin.lang.Result;
import com.ttice.icewkment.commin.vo.ArticlePageVO;
import com.ttice.icewkment.commin.vo.SquarePageVO;
import com.ttice.icewkment.entity.*;
import com.ttice.icewkment.mapper.*;
import com.ttice.icewkment.service.*;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

/**
 * 前端控制器
 *
 * @author admin
 * @since 2022-02-19
 */
@io.swagger.annotations.Api(tags = "后台圈子管理接口")
@RestController
@RequestMapping("/square")
public class SquareController {

  @Autowired private SquareMapper squareMapper;

  @Autowired private SquareService squareService;

  @Autowired private UserMapper userMapper;

  @RequiresAuthentication // 需要登录认证的接口
  @ApiOperation(value = "新增圈子")
  @ApiImplicitParam(name = "square", value = "圈子", required = true)
  @PostMapping("/create")
  public Result add(@RequestBody Square square) throws ParseException {
    QueryWrapper<Square> wrapper = new QueryWrapper<>();
    wrapper.eq("content", square.getContent());
    Square squareDB = squareService.getOne(wrapper);
    if (squareDB == null) {
      squareService.save(square);
    } else {
      squareService.update(square, wrapper);
    }
    return Result.succ(square.getId());
  }

  @RequiresAuthentication // 需要登录认证的接口
  @ApiOperation(value = "根据别名获取全部圈子(分页)")
  @ApiImplicitParam(name = "otherName", value = "otherName", required = true)
  @GetMapping("/getAllSquare/{squareId}/{page}/{limit}")
  public Result getAllSquare(
      @PathVariable("squareId") Integer squareId,
      @PathVariable("page") Integer page,
      @PathVariable("limit") Integer limit) {
    return Result.succ(squareService.VoList(squareId, page, limit, "all"));
  }

  @RequiresAuthentication // 需要登录认证的接口
  @ApiOperation(value = "根据id修改资源")
  @ApiImplicitParam(name = "id", value = "圈子id", required = true)
  @PostMapping("/ReviseSquareById/{id}")
  public Result ReviseSquareById(@RequestBody Square square) {
    return Result.succ(squareService.updateById(square));
  }

  @RequiresAuthentication // 需要登录认证的接口
  @ApiOperation(value = "根据id删除圈子")
  @ApiImplicitParam(name = "id", value = "文章id", required = true)
  @GetMapping("/DelectSquareById/{id}")
  public Result DelectSquareById(@PathVariable("id") Integer id) {
    // 根据id删除
    QueryWrapper<Square> wrapper = new QueryWrapper<Square>();
    wrapper.eq("id", id);
    squareMapper.delete(wrapper);
    return Result.succ(squareService.removeById(id));
  }

  @RequiresAuthentication // 需要登录认证的接口
  @ApiOperation(value = "根据id修改圈子内容")
  @ApiImplicitParam(name = "id", value = "文章id", required = true)
  @GetMapping("/ChangeSquareById/{id}/{content}")
  public Result ChangeSquareById(
      @PathVariable("id") Integer id, @PathVariable("content") String content) {

    Square square = new Square();
    square.setContent(content);
    QueryWrapper<Square> wrapper = new QueryWrapper<Square>();
    wrapper.eq("id", id);

    return Result.succ(squareMapper.update(square, wrapper));
  }

  @RequiresAuthentication // 需要登录认证的接口
  @ApiOperation(value = "获取全部圈子用户")
  @GetMapping("/GetAllSquareUser")
  public Result GetAllSquareUser() {

    return Result.succ(userMapper.selectList(null));
  }
}
