package com.ttice.icewkment.controller;


import com.ttice.icewkment.entity.DispositionCarousel;
import com.ttice.icewkment.entity.Setting;
import com.ttice.icewkment.mapper.DispositionCarouselMapper;
import com.ttice.icewkment.mapper.SettingMapper;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author admin
 * @since 2022-02-19
 */
@io.swagger.annotations.Api(tags = "Web设置接口")
@RestController
@RequestMapping("/WebSitting")
public class WebSettingController {

    @Autowired
    private DispositionCarouselMapper disposition_carouselMapper;

    @Autowired
    private SettingMapper settingMapper;

    @ApiOperation(value = "获取首页轮播图")
    @GetMapping("/getCarousel")
    public List<DispositionCarousel> getCarousel(

    ) {
        return this.disposition_carouselMapper.selectAll();
    }

    @ApiOperation(value = "获取所有设置")
    @GetMapping("/getSetting")
    public Setting getSetting(
    ) {
        return settingMapper.selectOne(null);
    }


}

