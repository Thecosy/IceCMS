package com.ttice.icewkment.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.entity.Square;
import com.ttice.icewkment.entity.SquareClass;
import com.ttice.icewkment.mapper.SquareClassMapper;
import com.ttice.icewkment.mapper.SquareMapper;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
@io.swagger.annotations.Api(tags = "Web圈子分类接口")
@RestController
@RequestMapping("/WebaSquareClass")
public class WebSquareClassController {

    @Autowired
    private SquareMapper squareMapper;

    @Autowired
    private SquareClassMapper squareClassMapper;

    @ApiOperation(value = "根据分类id获取文章数量")
    @ApiImplicitParam(name = "id",value = "id",required = true)
    @GetMapping("/getArticleClassNum/{id}")
    public int getArticleClassNum(
            @PathVariable("id") Integer id
    ){
        QueryWrapper<Square> wrapper= new QueryWrapper<>();
        wrapper.eq("sort_class", id);
        return squareMapper.selectCount(wrapper);
    }

    @ApiOperation(value = "根据分类别名获取分类信息")
    @ApiImplicitParam(name = "otherName",value = "otherName",required = true)
    @GetMapping("/getArticleClassByotherName/{otherName}")
    public SquareClass getArticleClassByotherName(
            @PathVariable("otherName") String otherName
    ){
        QueryWrapper<SquareClass> wrapper= new QueryWrapper<>();
        wrapper.eq("other_name", otherName);
        return squareClassMapper.selectOne(wrapper);
    }

    @ApiOperation(value = "获取全部分类列表")
    @GetMapping("/getSquareClasslist")
    public List<SquareClass> getSquareClasslist(
    ){
        return squareClassMapper.selectList(null);
    }

}

