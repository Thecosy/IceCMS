package com.ttice.icewkment.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ttice.icewkment.entity.Article;
import com.ttice.icewkment.entity.Square;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

/**
 * Mapper 接口
 *
 * @author admin
 * @since 2022-02-19
 */
@Repository
public interface SquareMapper extends BaseMapper<Square> {

  @Select("update square set love_num=IFNULL(love_num,0)+1 where id = ${id}")
  Boolean resourceLoveBrowse(@Param("id") Integer id);
}
