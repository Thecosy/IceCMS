package com.ttice.icewkment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ttice.icewkment.entity.Article;
import com.ttice.icewkment.entity.PlanetComment;
import com.ttice.icewkment.mapper.ArticleMapper;
import com.ttice.icewkment.mapper.PlanetCommentMapper;
import com.ttice.icewkment.service.ArticleService;
import com.ttice.icewkment.service.PlanetCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanetCommentImpl extends ServiceImpl<PlanetCommentMapper, PlanetComment> implements PlanetCommentService {

    @Autowired
    private PlanetCommentMapper planetCommentMapper;

    @Override
    public Integer GetCommentNum(Integer planetId) {
        //根据文章id查看对应评论数
        QueryWrapper<PlanetComment> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("post_id",planetId);
        Integer integer = planetCommentMapper.selectCount(queryWrapper);
        List<PlanetComment> planetComments = planetCommentMapper.selectList(queryWrapper);

        int sum = 0;

        for (PlanetComment planetComment : planetComments) {
            QueryWrapper<PlanetComment> queryWrapper1 = new QueryWrapper<>();
            queryWrapper1.eq("parent_id",planetComment.getId());
            Integer integer1 = planetCommentMapper.selectCount(queryWrapper1);
            sum += integer1;
        }
        return sum+integer;
    }
}