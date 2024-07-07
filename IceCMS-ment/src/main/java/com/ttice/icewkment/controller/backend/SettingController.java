package com.ttice.icewkment.controller.backend;

import com.ttice.icewkment.commin.lang.Result;
import com.ttice.icewkment.entity.CosInfo;
import com.ttice.icewkment.entity.DispositionCarousel;
import com.ttice.icewkment.entity.Setting;
import com.ttice.icewkment.mapper.CosInfoMapper;
import com.ttice.icewkment.mapper.DispositionCarouselMapper;
import com.ttice.icewkment.mapper.SettingMapper;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 前端控制器
 *
 * @author admin
 * @since 2022-02-19
 */
@io.swagger.annotations.Api(tags = "后台设置接口")
@RestController
@RequestMapping("/Sitting")
public class SettingController {

  @Autowired private SettingMapper settingMapper;

  @Autowired private CosInfoMapper cosInfoMapper;

  @Autowired private DispositionCarouselMapper dispositionCarouselMapper;

  @ApiOperation(value = "获取设置")
  @RequiresAuthentication // 需要登录认证的接口
  @ApiImplicitParam(name = "setting", value = "设置", required = true)
  @PostMapping("/getSetting")
  public Result getSetting() {
    return Result.succ(settingMapper.selectOne(null));
  }

  @ApiOperation(value = "修改设置")
  @RequiresAuthentication // 需要登录认证的接口
  @ApiImplicitParam(name = "setting", value = "设置", required = true)
  @PostMapping("/setSetting")
  public int setSetting(@RequestBody Setting setting) {
    return settingMapper.updateById(setting);
  }

  @ApiOperation(value = "获取oss配置")
  @RequiresAuthentication // 需要登录认证的接口
  @GetMapping("/getCosSetting")
  public Result getCosSetting() {
    return Result.succ(cosInfoMapper.selectOne(null));
  }

  @ApiOperation(value = "修改oss设置")
  @RequiresAuthentication // 需要登录认证的接口
  @ApiImplicitParam(name = "setting", value = "设置", required = true)
  @PostMapping("/setCosInfo")
  public Result setSettingCos(@RequestBody CosInfo cosInfo) {
    return Result.succ(cosInfoMapper.update(cosInfo, null));
  }

  @ApiOperation(value = "获取全部轮播图")
  @RequiresAuthentication // 需要登录认证的接口
  @ApiImplicitParam(name = "轮播", value = "设置", required = true)
  @GetMapping("/getAllDispositionCarousel")
  public Result getAllDispositionCarousel() {
    return Result.succ(dispositionCarouselMapper.selectList(null));
  }

  @ApiOperation(value = "获取全部轮播图")
  @RequiresAuthentication // 需要登录认证的接口
  @ApiImplicitParam(name = "轮播", value = "设置", required = true)
  @GetMapping("/setAllDispositionCarousel")
  public Result setAllDispositionCarousel(DispositionCarousel dispositionCarousel) {
    return Result.succ(dispositionCarouselMapper.update(dispositionCarousel, null));
  }


}
