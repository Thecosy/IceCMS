package com.ttice.icewkment.controller;

import com.ttice.icewkment.entity.AllTag;
import com.ttice.icewkment.mapper.AllTagMapper;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@io.swagger.annotations.Api(tags = "Web标签接口")
@RestController
@RequestMapping("/Tag")
public class AllTagController {

    @Autowired
    private AllTagMapper allTagMapper;

    @ApiOperation(value = "获取全部tag")
    @GetMapping("/getAllTag")
    public List<AllTag> getAllTag(
    ) {
        return allTagMapper.selectList(null);
    }
}
