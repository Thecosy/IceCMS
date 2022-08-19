package com.ttice.icewkment.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ttice.icewkment.entity.SquareComment;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author admin
 * @since 2022-02-19
 */
@Repository
public interface SquareCommentMapper extends BaseMapper<SquareComment> {

    @Select("update square_comment set love_num=IFNULL(love_num,0)+1 where id = ${id}")
    Boolean resourceLoveBrowse(@Param("id") Integer id);

}

