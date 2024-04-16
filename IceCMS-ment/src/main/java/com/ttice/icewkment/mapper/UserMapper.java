package com.ttice.icewkment.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ttice.icewkment.entity.User;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

/**
 * Mapper 接口
 *
 * @author admin
 * @since 2022-01-13
 */
@Repository
public interface UserMapper extends BaseMapper<User> {
  @Select("select * from user where USERNAME='${nameCn}' limit 1")
  User searchName(@Param("nameCn") String nameCn);

  @Select("select * from user where user_id='${id}' limit 1")
  User searchId(@Param("id") Integer id);
}
