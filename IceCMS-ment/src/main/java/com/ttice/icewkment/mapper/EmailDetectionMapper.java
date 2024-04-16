package com.ttice.icewkment.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ttice.icewkment.entity.EmailDetection;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailDetectionMapper extends BaseMapper<EmailDetection> {

  @Select("SELECT * FROM email_detection WHERE email = #{email} ORDER BY id DESC LIMIT 1")
  EmailDetection getOneEmail(@Param("email") String email);
}
