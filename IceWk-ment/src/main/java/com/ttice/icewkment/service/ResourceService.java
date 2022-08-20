package com.ttice.icewkment.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ttice.icewkment.commin.vo.ResourcePageVO;
import com.ttice.icewkment.commin.vo.ResourceVO;
import com.ttice.icewkment.entity.Resource;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author admin
 * @since 2022-03-28
 */
@Repository
public interface ResourceService extends IService<Resource> {

    ResourcePageVO VoList(Integer page, Integer limit);

    List<ResourceVO> ClassVoList(Integer id);

    List<ResourceVO> GetNewResource(Integer num);
}
