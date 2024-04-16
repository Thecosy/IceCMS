package com.ttice.icewkment.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ttice.icewkment.entity.SquareComment;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 服务类
 *
 * @author admin
 * @since 2022-02-19
 */
@Repository
public interface SquareCommentService extends IService<SquareComment> {

  Integer GetCommentNum(Integer planetId);

  List<SquareComment> VoList(Integer page, Integer limit);
}
