package com.ttice.icewkment.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ttice.icewkment.commin.vo.ResourceClassPageVO;
import com.ttice.icewkment.entity.ResourceClass;
import org.springframework.stereotype.Repository;

/**
 * 服务类
 *
 * @author admin
 * @since 2022-03-28
 */
@Repository
public interface ResourceClassService extends IService<ResourceClass> {

  ResourceClassPageVO GetList(Integer page, Integer limit);
}
