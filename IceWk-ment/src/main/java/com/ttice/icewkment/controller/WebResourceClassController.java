package com.ttice.icewkment.controller;


import com.ttice.icewkment.entity.ArticleClass;
import com.ttice.icewkment.entity.ResourceClass;
import com.ttice.icewkment.mapper.ResourceClassMapper;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
 * @since 2022-03-28
 */
@io.swagger.annotations.Api(tags = "Web资源分类接口")
@RestController
@RequestMapping("/WebResourceClass")
public class WebResourceClassController {

    @Autowired
    private ResourceClassMapper resourceClassMapper;

    @ApiOperation(value = "获取全部资源分类列表")
    @GetMapping("/getResourceClasslist")
    public List<ResourceClass> getResourceClasslist(
    ){
        return resourceClassMapper.selectList(null);
    }
}

