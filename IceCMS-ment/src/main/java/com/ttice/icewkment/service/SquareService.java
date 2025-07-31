package com.ttice.icewkment.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ttice.icewkment.commin.vo.ArticlePageVO;
import com.ttice.icewkment.commin.vo.SquarePageVO;
import com.ttice.icewkment.commin.vo.SquareVO;
import com.ttice.icewkment.entity.Article;
import com.ttice.icewkment.entity.Square;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 服务类
 *
 * @author admin
 * @since 2022-02-19
 */
@Repository
public interface SquareService extends IService<Square> {

  SquarePageVO VoList(Integer id, Integer page, Integer limit, String type);
}
