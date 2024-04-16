package com.ttice.icewkment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ttice.icewkment.commin.vo.SquareClassPageVO;
import com.ttice.icewkment.entity.Square;
import com.ttice.icewkment.entity.SquareClass;
import com.ttice.icewkment.mapper.SquareClassMapper;
import com.ttice.icewkment.mapper.SquareMapper;
import com.ttice.icewkment.service.SquareClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SquareClassServiceImpl extends ServiceImpl<SquareClassMapper, SquareClass>
    implements SquareClassService {

  @Autowired private SquareClassMapper squareClassMapper;

  @Autowired private SquareMapper squareMapper;

  @Override
  public SquareClassPageVO GetList(Integer page, Integer limit) {
    Page<SquareClass> SquareClassPage = new Page<>(page, limit);
    SquareClassPageVO classPageVO = new SquareClassPageVO();
    List<SquareClass> result = new ArrayList<>();
    QueryWrapper<SquareClass> wrapper = new QueryWrapper<>();
    wrapper.orderByDesc("id");

    Page<SquareClass> resultPage = this.squareClassMapper.selectPage(SquareClassPage, wrapper);
    List<SquareClass> squareClasses = resultPage.getRecords();
    for (SquareClass squareClasse : squareClasses) {
      Integer id = squareClasse.getId();
      QueryWrapper<Square> queryWrapper = new QueryWrapper<>();
      queryWrapper.eq("sort_class", id);
      Integer count = squareMapper.selectCount(queryWrapper);
      squareClasse.setNum(count);
      result.add(squareClasse);
    }
    long total = resultPage.getTotal();
    classPageVO.setData(result);
    classPageVO.setTotal(total);
    return classPageVO;
  }
}
