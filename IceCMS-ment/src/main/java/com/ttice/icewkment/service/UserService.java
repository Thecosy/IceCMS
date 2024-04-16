package com.ttice.icewkment.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ttice.icewkment.entity.User;
import org.springframework.stereotype.Repository;

/**
 * 服务类
 *
 * @author admin
 * @since 2022-01-13
 */
@Repository
public interface UserService extends IService<User> {

  User GetUserInfoById(Integer id);
}
