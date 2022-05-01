package com.ttice.icewkment.controller;


import com.ttice.icewkment.entity.Square;
import com.ttice.icewkment.mapper.SquareMapper;
import com.ttice.icewkment.service.SquareService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author admin
 * @since 2022-02-19
 */
@io.swagger.annotations.Api(tags = "Web圈子广场接口")
@RestController
@RequestMapping("/Websquare")
public class WebSquareController {

    @Autowired
    private SquareMapper squareMapper;

    @Autowired
    private SquareService squareService;

    @ApiOperation(value = "新增圈子(修改)")
    @ApiImplicitParam(name = "square",value = "圈子",required = true)
    @PostMapping("/create")
    public Integer add(@RequestBody Square square) throws ParseException {
        //查询分类名称对应的id值
//        QueryWrapper<ArticleClass> wrapper= new QueryWrapper<ArticleClass>();
//        wrapper.eq("name", article.getSortClass());
//        ArticleClass articleClass = articleClassMapper.selectOne(wrapper);

//        article.setSortClass(articleClass.getId().toString());
        //saveOrUpdate:要在插入数据库时，如果有某一个主要字段的值重复，则不插入，否则则插入！
        squareService.saveOrUpdate(square);
        return square.getId();
    }

    @ApiOperation(value = "获取全部圈子")
    @GetMapping("/getAllSquare")
    public List<Square> getAllArticle(

    ) {
        //TODO 分类功能
        //根据用户id获取名称信息
        return squareMapper.selectList(null);
    }
}
