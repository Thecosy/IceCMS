package com.ttice.icewkment.controller;


import com.ttice.icewkment.entity.DispositionCarousel;
import com.ttice.icewkment.entity.Setting;
import com.ttice.icewkment.mapper.DispositionCarouselMapper;
import com.ttice.icewkment.mapper.SettingMapper;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author admin
 * @since 2022-02-19
 */
@io.swagger.annotations.Api(tags = "后台设置接口")
@RestController
@RequestMapping("/Sitting")
public class SettingController {

    @Autowired
    private SettingMapper settingMapper;

    @ApiOperation(value = "修改设置")
    @ApiImplicitParam(name = "setting",value = "设置",required = true)
    @PostMapping("/setSetting")
    public int setSetting(
            @RequestBody Setting setting
    ) {
        return settingMapper.updateById(setting);
    }

}

