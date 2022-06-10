package com.ttice.icewkment.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ttice.icewkment.commin.vo.ArticleVO;
import com.ttice.icewkment.commin.vo.SquareVO;
import com.ttice.icewkment.entity.Article;
import com.ttice.icewkment.entity.Square;
import com.ttice.icewkment.entity.User;
import com.ttice.icewkment.mapper.SquareMapper;
import com.ttice.icewkment.mapper.UserMapper;
import com.ttice.icewkment.service.SquareService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.ArrayList;
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

    @Autowired
    private UserMapper userMapper;

    @ApiOperation(value = "新增圈子(修改)")
    @ApiImplicitParam(name = "square",value = "圈子对象",required = true)
    @PostMapping("/create")
    public Integer add(@RequestBody Square square) throws ParseException {
        //查询分类名称对应的id值
//        QueryWrapper<ArticleClass> wrapper= new QueryWrapper<ArticleClass>();
//        wrapper.eq("name", article.getSortClass());
//        ArticleClass articleClass = articleClassMapper.selectOne(wrapper);

//        article.setSortClass(articleClass.getId().toString());
        //saveOrUpdate:要在插入数据库时，如果有某一个主要字段的值重复，则不插入，否则则插入！
        squareService.save(square);
        return square.getId();
    }

    @ApiOperation(value = "获取全部圈子")
    @GetMapping("/getAllSquare")
    public List<SquareVO> getAllArticle(

    ) {
        //TODO 分类功能
        List<SquareVO> result = new ArrayList<>();
        QueryWrapper<Square> queryWrapper = new QueryWrapper<Square>();
        queryWrapper.select().orderByDesc("add_time");
        List<Square> squares = squareMapper.selectList(queryWrapper);;

        for (Square square : squares) {

            //根据用户id获取名称信息
            //id是内容发布者id
            Integer authors = square.getAuthor();
            User users = userMapper.searchId(authors);
            String username = users.getName();
            String authorImg = users.getProfile();
            SquareVO squareVO = new SquareVO();
            squareVO.setAuthor(username);
            squareVO.setAuthorImg(authorImg);

            BeanUtils.copyProperties(square,squareVO);
            result.add(squareVO);
        }
        return result;
    }
}
