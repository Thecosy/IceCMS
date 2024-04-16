package com.ttice.icewkment.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ttice.icewkment.entity.DispositionCarousel;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Mapper 接口
 *
 * @author admin
 * @since 2022-01-13
 */
@Repository
public interface DispositionCarouselMapper extends BaseMapper<DispositionCarousel> {
  @Select("select * from disposition_carousel  order by id")
  List<DispositionCarousel> selectAll();
}
