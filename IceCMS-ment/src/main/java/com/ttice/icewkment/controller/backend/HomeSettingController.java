package com.ttice.icewkment.controller.backend;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.commin.lang.Result;
import com.ttice.icewkment.entity.HomeSetting;
import com.ttice.icewkment.mapper.HomeSettingMapper;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@io.swagger.annotations.Api(tags = "首页设置接口")
@RestController
@RequestMapping("/HomeSetting")
public class HomeSettingController {

    @Autowired
    private HomeSettingMapper homeSettingMapper;

    @RequiresAuthentication // 需要登录认证的接口
    @ApiOperation(value = "新建特色内容")
    @ApiImplicitParam(name = "articleClass", value = "特色内容对象", required = true)
    @PostMapping("/newHomeSetting")
    public Result newArticleClass(@RequestBody HomeSetting HomeSetting) {

        QueryWrapper<HomeSetting> wrapper = new QueryWrapper<HomeSetting>();
        wrapper.eq("feature_title", HomeSetting.getFeatureTitle());
        HomeSetting HomeSettingjudje = homeSettingMapper.selectOne(wrapper);
        if (HomeSettingjudje != null) {
            // 该特色内容已存在
            return Result.fail("该特色内容已存在");
        }
        return Result.succ(homeSettingMapper.insert(HomeSetting));
    }


    @RequiresAuthentication // 需要登录认证的接口
    @ApiOperation(value = "删除特色内容")
    @ApiImplicitParam(name = "id", value = "id", required = true)
    @PostMapping("/deleteHomeSetting")
    public Result deleteHomeSetting(@RequestBody HomeSetting HomeSetting) {
        return Result.succ(homeSettingMapper.deleteById(HomeSetting.getId()));
    }

    @RequiresAuthentication // 需要登录认证的接口
    @ApiOperation(value = "修改特色内容")
    @ApiImplicitParam(name = "articleClass", value = "特色内容对象", required = true)
    @PostMapping("/updateHomeSetting")
    public Result updateHomeSetting(@RequestBody HomeSetting HomeSetting) {
        return Result.succ(homeSettingMapper.updateById(HomeSetting));
    }

    @RequiresAuthentication // 需要登录认证的接口
    @ApiOperation(value = "获取全部特色内容列表")
    @GetMapping("/getHomeSettinglist")
    public Result getHomeSettinglist() {
        return Result.succ(homeSettingMapper.selectList(null));
    }

}
