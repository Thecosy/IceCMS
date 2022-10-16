package com.ttice.icewkment.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.entity.Square;
import com.ttice.icewkment.entity.SquareComment;
import com.ttice.icewkment.mapper.SquareCommentMapper;
import com.ttice.icewkment.mapper.SquareMapper;
import com.ttice.icewkment.mapper.UserMapper;
import com.ttice.icewkment.service.SquareClassService;
import com.ttice.icewkment.service.SquareCommentService;
import com.ttice.icewkment.service.SquareService;
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
@io.swagger.annotations.Api(tags = "后台圈子评论管理接口")
@RestController
@RequestMapping("/squareComment")
public class SquareCommentController {

    @Autowired
    private SquareMapper squareMapper;

    @Autowired
    private SquareService squareService;

    @Autowired
    private SquareCommentMapper squareCommentMapper;

    @Autowired
    private SquareClassService squareClassService;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private SquareCommentService squareCommentService;

    @ApiOperation(value = "获取全部圈子评论(分页)")
    @ApiImplicitParam(name = "otherName",value = "otherName",required = true)
    @GetMapping("/getAllSquare/{page}/{limit}")
    public List<SquareComment> getAllArticle(
            @PathVariable("page") Integer page,
            @PathVariable("limit") Integer limit
    ) {

        return squareCommentService.VoList(page, limit);
    }

    @ApiOperation(value = "根据id删除圈子评论")
    @ApiImplicitParam(name = "id",value = "文章id",required = true)
    @GetMapping("/DelectSquareById/{id}")
    public boolean DelectSquareById(
            @PathVariable("id") Integer id
    ) {
        //根据id删除
        QueryWrapper<SquareComment> wrapper= new QueryWrapper<SquareComment>();
        wrapper.eq("id",id);
        squareCommentMapper.delete(wrapper);
        return this.squareCommentService.removeById(id);
    }

    @ApiOperation(value = "根据id修改圈子内容评论")
    @ApiImplicitParam(name = "id",value = "文章id",required = true)
    @GetMapping("/ChangeSquareById/{id}/{content}")
    public Integer ChangeSquareById(
            @PathVariable("id") Integer id,
            @PathVariable("content") String content
    ) {

        SquareComment squareComment = new SquareComment();
        squareComment.setContent(content);
        QueryWrapper<SquareComment> wrapper= new QueryWrapper<SquareComment>();
        wrapper.eq("id",id);

        return squareCommentMapper.update(squareComment,wrapper);
    }
}

