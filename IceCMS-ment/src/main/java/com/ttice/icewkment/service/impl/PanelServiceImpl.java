package com.ttice.icewkment.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ttice.icewkment.entity.Panel;
import com.ttice.icewkment.mapper.ArticleCommentMapper;
import com.ttice.icewkment.mapper.PanelMapper;
import com.ttice.icewkment.mapper.UserMapper;
import com.ttice.icewkment.service.PanelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @projectName: IceCMS-main
 * @package: com.ttice.icewkment.service.impl
 * @className: PanelServiceImpl
 * @author: Eric
 * @description: TODO
 * @date: 2023/8/11 16:14
 * @version: 1.0
 */
@Service
public class PanelServiceImpl extends ServiceImpl<PanelMapper, Panel> implements PanelService {
  @Autowired private UserMapper userMapper;
  @Autowired private ArticleCommentMapper commentMapper;

  @Override
  public Panel SearchPanelInfo() {
    Panel panel = new Panel();
    Integer userNum = userMapper.selectCount(null);
    Integer commentNum = commentMapper.selectCount(null);

    panel.setCommentNum(commentNum);
    panel.setCustomerNum(userNum);

    return panel;
  }
}
