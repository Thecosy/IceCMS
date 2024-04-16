package com.ttice.icewkment.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ttice.icewkment.commin.vo.ArticleCommentPageVO;
import com.ttice.icewkment.commin.vo.ResourceCommentPageVO;
import com.ttice.icewkment.entity.ResourceComment;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourceCommentService extends IService<ResourceComment> {
  int GetCommentNum(Integer resourceId);

  ResourceCommentPageVO VoList(Integer page, Integer limit, Integer click);

}
