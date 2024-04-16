package com.ttice.icewkment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ttice.icewkment.commin.vo.ArticlePageVO;
import com.ttice.icewkment.commin.vo.ArticleVO;
import com.ttice.icewkment.commin.vo.SquarePageVO;
import com.ttice.icewkment.commin.vo.SquareVO;
import com.ttice.icewkment.entity.*;
import com.ttice.icewkment.mapper.SquareCommentMapper;
import com.ttice.icewkment.mapper.UserMapper;
import com.ttice.icewkment.service.SquareCommentService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SquareCommentImpl extends ServiceImpl<SquareCommentMapper, SquareComment>
    implements SquareCommentService {

  @Autowired private SquareCommentMapper squareCommentMapper;

  @Autowired private UserMapper userMapper;

  @Override
  public Integer GetCommentNum(Integer planetId) {
    // 根据文章id查看对应评论数
    QueryWrapper<SquareComment> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("post_id", planetId);
    Integer integer = squareCommentMapper.selectCount(queryWrapper);
    List<SquareComment> squareComments = squareCommentMapper.selectList(queryWrapper);

    int sum = 0;

    for (SquareComment squareComment : squareComments) {
      QueryWrapper<SquareComment> queryWrapper1 = new QueryWrapper<>();
      queryWrapper1.eq("parent_id", squareComment.getId());
      Integer integer1 = squareCommentMapper.selectCount(queryWrapper1);
      sum += integer1;
    }
    return sum + integer;
  }

  @Override
  public List<SquareComment> VoList(Integer page, Integer limit) {
    List<SquareComment> result = new ArrayList<>();

    Page<SquareComment> squareCommentPage = new Page<>(page, limit);

    QueryWrapper<SquareComment> wrapper = new QueryWrapper<SquareComment>();
    wrapper.orderByDesc("id");

    Page<SquareComment> resultPage =
        this.squareCommentMapper.selectPage(squareCommentPage, wrapper);

    List<SquareComment> squareComments = resultPage.getRecords();

    for (SquareComment squareComment : squareComments) {

      Integer userId = squareComment.getUserId();
      QueryWrapper<User> queryWrapper = new QueryWrapper<>();
      queryWrapper.eq("user_id", userId);
      User user = userMapper.selectOne(queryWrapper);
      String name = user.getName();
      squareComment.setReviewers(name);
    }
    return squareComments;
  }
}
