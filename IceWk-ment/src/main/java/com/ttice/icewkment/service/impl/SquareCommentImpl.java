package com.ttice.icewkment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ttice.icewkment.entity.SquareComment;
import com.ttice.icewkment.mapper.SquareCommentMapper;
import com.ttice.icewkment.service.SquareCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SquareCommentImpl extends ServiceImpl<SquareCommentMapper, SquareComment> implements SquareCommentService {

    @Autowired
    private SquareCommentMapper squareCommentMapper;

    @Override
    public Integer GetCommentNum(Integer planetId) {
        //根据文章id查看对应评论数
        QueryWrapper<SquareComment> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("post_id",planetId);
        Integer integer = squareCommentMapper.selectCount(queryWrapper);
        List<SquareComment> squareComments = squareCommentMapper.selectList(queryWrapper);

        int sum = 0;

        for (SquareComment squareComment : squareComments) {
            QueryWrapper<SquareComment> queryWrapper1 = new QueryWrapper<>();
            queryWrapper1.eq("parent_id", squareComment.getId());
            Integer integer1 = squareCommentMapper.selectCount(queryWrapper1);
            sum += integer1;
        }
        return sum+integer;
    }
}