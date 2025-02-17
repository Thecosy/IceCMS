package com.ttice.icewkment.controller.backend;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.commin.lang.Result;
import com.ttice.icewkment.entity.*;
import com.ttice.icewkment.mapper.*;
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

  @Autowired private WxloginInfoMapper wxloginInfoMapper;

  @Autowired private MessageInfoMapper messageInfoMapper;

  @Autowired private HomeSettingMapper homeSettingMapper;

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

  @ApiOperation(value = "根据id修改轮播图")
  @RequiresAuthentication // 需要登录认证的接口
  @ApiImplicitParam(name = "轮播", value = "设置", required = true)
  @PostMapping("/setAllDispositionCarousel/{id}")
  public Result setAllDispositionCarousel(@RequestBody DispositionCarousel dispositionCarousel, @PathVariable("id") Integer id) {
    QueryWrapper<DispositionCarousel> wrapper = new QueryWrapper<>();
    wrapper.eq("id", id);
    return Result.succ(dispositionCarouselMapper.update(dispositionCarousel, wrapper));
  }

  @ApiOperation(value = "获取特色区域")
  @RequiresAuthentication // 需要登录认证的接口
  @ApiImplicitParam(name = "特色区域", value = "设置", required = true)
  @GetMapping("/getAllFeature")
  public Result getAllFeature() {
    return Result.succ(homeSettingMapper.selectList(null));
  }

  @ApiOperation(value = "修改特色区域")
  @RequiresAuthentication // 需要登录认证的接口
  @ApiImplicitParam(name = "轮播", value = "设置", required = true)
  @PostMapping("/setAllFeature")
  public Result setAllFeature (@RequestBody HomeSetting homeSetting) {
    return Result.succ(homeSettingMapper.updateById(homeSetting));
  }

  @ApiOperation(value = "根据id删除轮播图")
  @RequiresAuthentication // 需要登录认证的接口
  @ApiImplicitParam(name = "轮播", value = "设置", required = true)
  @GetMapping("/deleteAllDispositionCarousel/{id}")
  public Result deleteAllDispositionCarousel(@PathVariable("id") Integer id) {
      return Result.succ(dispositionCarouselMapper.deleteById(id));
  }

  @ApiOperation(value = "新增轮播图")
  @RequiresAuthentication // 需要登录认证的接口
  @ApiImplicitParam(name = "轮播", value = "设置", required = true)
  @PostMapping("/addDispositionCarousel")
  public Result addDispositionCarousel(@RequestBody DispositionCarousel dispositionCarousel) {
      return Result.succ(dispositionCarouselMapper.insert(dispositionCarousel));
  }

  @ApiOperation(value = "获取小程序设置")
  @GetMapping("/getMiniProgramSetting")
  public Result getMiniProgramSetting() {
    return Result.succ(wxloginInfoMapper.selectOne(null));
  }

  @ApiOperation(value = "更改小程序设置")
  @PostMapping("/updateMiniProgramSetting")
  public Result updateMiniProgramSetting(@RequestBody WxLoginInfo wxLoginInfo) {
    wxloginInfoMapper.updateById(wxLoginInfo);
    return Result.succ(wxLoginInfo);
  }

  @ApiOperation(value = "获取短信设置")
  @GetMapping("/getSmsSetting")
  public Result getSmsSetting() {
      return Result.succ(messageInfoMapper.selectOne(null));
  }

  @ApiOperation(value = "更改短信设置")
  @PostMapping("/updateSmsSetting")
  public Result updateSmsSetting(@RequestBody MessageInfo messageInfo) {
    messageInfoMapper.updateById(messageInfo);
      return Result.succ(messageInfo);
  }
}
