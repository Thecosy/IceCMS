package com.ttice.icewkment.service.impl;

import com.ttice.icewkment.commin.vo.SquareVO;
import com.ttice.icewkment.entity.User;
import com.ttice.icewkment.mapper.UserMapper;
import com.ttice.icewkment.service.UserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 服务实现类
 *
 * @author admin
 * @since 2022-01-13
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

  @Autowired private UserMapper userMapper;

  @Override
  public User GetUserInfoById(Integer id) {
    // 根据用户id获取名称信息
    // id是内容发布者id
    User user = userMapper.selectById(id);
    return user;
  }
}
