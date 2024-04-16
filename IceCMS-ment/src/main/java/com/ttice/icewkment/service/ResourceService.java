package com.ttice.icewkment.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ttice.icewkment.commin.vo.ResourcePageVO;
import com.ttice.icewkment.commin.vo.ResourceVO;
import com.ttice.icewkment.entity.Resource;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 服务类
 *
 * @author admin
 * @since 2022-03-28
 */
@Repository
public interface ResourceService extends IService<Resource> {

  ResourcePageVO VoList(Integer page, Integer limit);

  ResourcePageVO VoListFilter(Integer page, Integer limit, Integer rclass, String filter);

  List<ResourceVO> ClassVoList(Integer id);

  List<ResourceVO> GetNewResource(Integer num, String filter);

  ResourcePageVO FindVoList(Integer page, Integer limit, String content);
}
