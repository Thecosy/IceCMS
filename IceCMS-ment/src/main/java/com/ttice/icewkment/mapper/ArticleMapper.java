package com.ttice.icewkment.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ttice.icewkment.entity.Article;
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
public interface ArticleMapper extends BaseMapper<Article> {
  @Select("update article set hits=IFNULL(hits,0)+1 where id = ${id}")
  Boolean articlesBrowse(@Param("id") Integer id);

  @Select("update article set love_num=IFNULL(love_num,0)+1 where id = ${id}")
  Boolean articlesLoveBrowse(@Param("id") Integer id);
}
