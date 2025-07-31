package com.ttice.icewkment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ttice.icewkment.commin.vo.SquarePageVO;
import com.ttice.icewkment.commin.vo.SquareVO;
import com.ttice.icewkment.entity.Square;
import com.ttice.icewkment.entity.SquareClass;
import com.ttice.icewkment.entity.User;
import com.ttice.icewkment.mapper.SquareMapper;
import com.ttice.icewkment.mapper.UserMapper;
import com.ttice.icewkment.service.SquareClassService;
import com.ttice.icewkment.service.SquareCommentService;
import com.ttice.icewkment.service.SquareService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 服务实现类
 *
 * @author admin
 * @since 2022-02-19
 */
@Service
public class SquareServiceImpl extends ServiceImpl<SquareMapper, Square> implements SquareService {

  @Autowired private UserMapper userMapper;

  @Autowired private SquareCommentService squareCommentService;

  @Autowired private SquareMapper squareMapper;

  @Autowired private SquareClassService squareClassService;

  @Override
  public SquarePageVO VoList(Integer squareId, Integer page, Integer limit, String type) {

    Page<Square> squarePage = new Page<>(page, limit);

    List<SquareVO> result = new ArrayList<>();
    QueryWrapper<Square> queryWrapper = new QueryWrapper<Square>();
    queryWrapper.select();
    
    // 根据type参数决定排序方式
    if ("recent".equals(type)) {
      // 最近：按时间倒序
      queryWrapper.orderByDesc("add_time");
    } else if ("hot".equals(type)) {
      // 热门：按点赞数和评论数排序
      queryWrapper.orderByDesc("love_num").orderByDesc("add_time");
    } else {
      // 默认：按时间倒序
      queryWrapper.orderByDesc("add_time");
    }
    
    queryWrapper.eq("sort_class", squareId);
    Page<Square> resultPage = squareMapper.selectPage(squarePage, queryWrapper);

    List<Square> squares = resultPage.getRecords();
    for (Square square : squares) {

      // 根据用户id获取名称信息
      // id是内容发布者id
      Integer authors = square.getAuthor();
      User users = userMapper.searchId(authors);
      String username = users.getName();
      String authorImg = users.getProfile();
      SquareVO squareVO = new SquareVO();
      squareVO.setAuthor(username);
      squareVO.setUserid(authors);
      squareVO.setImage(square.getImage());
      squareVO.setAuthorImg(authorImg);
      // 查询分类名称对应的id值
      SquareClass SquareClassIs = squareClassService.getById(square.getSortClass());
      squareVO.setSortName(SquareClassIs.getName());

      Integer planetCommentNum = squareCommentService.GetCommentNum(square.getId());
      squareVO.setCommentNum(planetCommentNum);

      BeanUtils.copyProperties(square, squareVO);
      result.add(squareVO);
    }
    SquarePageVO squarePageVO = new SquarePageVO();
    squarePageVO.setData(result);
    squarePageVO.setTotal(resultPage.getTotal());
    squarePageVO.setPages(resultPage.getPages());
    return squarePageVO;
  }
}
