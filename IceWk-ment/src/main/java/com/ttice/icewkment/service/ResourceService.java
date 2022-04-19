package com.ttice.icewkment.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ttice.icewkment.commin.vo.ResourcePageVO;
import com.ttice.icewkment.entity.Resource;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author admin
 * @since 2022-03-28
 */
public interface ResourceService extends IService<Resource> {

    ResourcePageVO VoList(Integer page, Integer limit);
}
