package com.ttice.icewkment.service.impl;

import com.ttice.icewkment.entity.User;
import com.ttice.icewkment.mapper.UserMapper;
import com.ttice.icewkment.service.UserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author admin
 * @since 2022-01-13
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

}
