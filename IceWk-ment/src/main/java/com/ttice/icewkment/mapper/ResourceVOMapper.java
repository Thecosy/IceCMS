package com.ttice.icewkment.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ttice.icewkment.commin.vo.ResourceVO;
import com.ttice.icewkment.entity.Resource;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceVOMapper extends BaseMapper<Resource> {

    @Select("select * from resource  order by id desc limit ${nameCn}")
    List<ResourceVO> selectAll(@Param("nameCn") Integer nameCn);
}