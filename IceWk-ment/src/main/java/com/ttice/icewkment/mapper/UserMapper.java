package com.ttice.icewkment.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ttice.icewkment.entity.User;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author admin
 * @since 2022-01-13
 */
@Repository
public interface UserMapper extends BaseMapper<User> {
    @Select("select * from user where USERNAME='${nameCn}' limit 1")
    User searchName(@Param("nameCn") String nameCn);
}
