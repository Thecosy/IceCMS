package com.ttice.icewkment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ttice.icewkment.commin.vo.ResourceClassPageVO;
import com.ttice.icewkment.entity.Resource;
import com.ttice.icewkment.entity.ResourceClass;
import com.ttice.icewkment.mapper.ResourceClassMapper;
import com.ttice.icewkment.mapper.ResourceMapper;
import com.ttice.icewkment.service.ResourceClassService;
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
public class ResourceClassServiceImpl extends ServiceImpl<ResourceClassMapper, ResourceClass> implements ResourceClassService {

    @Autowired
    private ResourceClassMapper resourceClassMapper;

    @Autowired
    private ResourceMapper resourceMapper;

    @Override
    public ResourceClassPageVO GetList(Integer page, Integer limit) {
        Page<ResourceClass> ResourceClassPage = new Page<>(page,limit);
        ResourceClassPageVO classPageVO = new ResourceClassPageVO();
        List<ResourceClass> result = new ArrayList<>();

        QueryWrapper<ResourceClass> wrapper= new QueryWrapper<ResourceClass>();
        wrapper.orderByDesc("id");

        Page<ResourceClass> resultPage = this.resourceClassMapper.selectPage(ResourceClassPage, wrapper);
        List<ResourceClass> resourceClasses = resultPage.getRecords();
        for (ResourceClass resourceClasse : resourceClasses) {
            Integer id = resourceClasse.getId();
            QueryWrapper<Resource> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("sort_class", id);
            Integer count = resourceMapper.selectCount(queryWrapper);
            resourceClasse.setNum(count);
            result.add(resourceClasse);
        }

        long total = resultPage.getTotal();
        classPageVO.setData(result);
        classPageVO.setTotal(total);
        return classPageVO;
    }
}
