package com.ttice.icewkment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ttice.icewkment.commin.vo.ResourcePageVO;
import com.ttice.icewkment.commin.vo.ResourceVO;
import com.ttice.icewkment.entity.Resource;
import com.ttice.icewkment.mapper.ResourceMapper;
import com.ttice.icewkment.service.ResourceService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author admin
 * @since 2022-03-28
 */
@Service
public class ResourceServiceImpl extends ServiceImpl<ResourceMapper, Resource> implements ResourceService {

    @Autowired
    private ResourceMapper resourceMapper;

    @Override
    public ResourcePageVO VoList(Integer page, Integer limit) {
        List<ResourceVO> result = new ArrayList<>();

        ResourceVO resourceVO = null;

        Page<Resource> resourcePage = new Page<>(page,limit);

        QueryWrapper<Resource> wrapper= new QueryWrapper<Resource>();
        wrapper.orderByDesc("id");

        Page<Resource> resultPage = this.resourceMapper.selectPage(resourcePage, wrapper);

        List<Resource> resources = resultPage.getRecords();

        for (Resource resource : resources) {
            resourceVO = new ResourceVO();
            BeanUtils.copyProperties(resource,resourceVO);
            result.add(resourceVO);
        }
        ResourcePageVO resourcePageVO = new ResourcePageVO();
        resourcePageVO.setData(result);
        resourcePageVO.setTotal(resultPage.getTotal());
        return resourcePageVO;
    }
}
