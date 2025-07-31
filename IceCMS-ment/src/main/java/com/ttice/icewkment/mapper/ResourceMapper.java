package com.ttice.icewkment.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ttice.icewkment.entity.Resource;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

/**
 * Mapper 接口
 *
 * @author admin
 * @since 2022-03-28
 */
@Repository
public interface ResourceMapper extends BaseMapper<Resource> {

  @Select("update resource set hits=IFNULL(hits,0)+1 where id = ${id}")
  Boolean resourceBrowse(@Param("id") Integer id);

  @Select("update resource set hits=IFNULL(hits,0)+1 where id = ${id}")
  Boolean resourceDownloadCount(@Param("id") Integer id);

  @Select("update resource set love_num=IFNULL(love_num,0)+1 where id = ${id}")
  Boolean resourceLoveBrowse(@Param("id") Integer id);
}
