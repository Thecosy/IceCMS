package com.ttice.icewkment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ttice.icewkment.commin.vo.ResourcePageVO;
import com.ttice.icewkment.commin.vo.ResourceVO;
import com.ttice.icewkment.entity.Resource;
import com.ttice.icewkment.entity.User;
import com.ttice.icewkment.mapper.ResourceMapper;
import com.ttice.icewkment.mapper.UserMapper;
import com.ttice.icewkment.service.ResourceService;
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

    @Autowired
    private UserMapper userMapper;

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
            String author = resource.getAuthor();
            QueryWrapper<User> userQueryWrapper = new QueryWrapper<>();
            userQueryWrapper.eq("USERNAME",author);
            User user = userMapper.selectOne(userQueryWrapper);
            String profile = user.getProfile();
            resourceVO = new ResourceVO();
            resourceVO.setAuthorThumb(profile);
            BeanUtils.copyProperties(resource,resourceVO);
            result.add(resourceVO);
        }
        ResourcePageVO resourcePageVO = new ResourcePageVO();
        resourcePageVO.setData(result);
        resourcePageVO.setTotal(resultPage.getTotal());
        return resourcePageVO;
    }

    @Override
    public ResourcePageVO VoListByClass(Integer page, Integer limit, Integer rclass) {
        List<ResourceVO> result = new ArrayList<>();

        ResourceVO resourceVO = null;

        Page<Resource> resourcePage = new Page<>(page,limit);


        QueryWrapper<Resource> wrapper = new QueryWrapper<Resource>();
        wrapper.orderByDesc("id");
        if (rclass != 0) {
            wrapper.eq("sort_class", rclass);
        }

        Page<Resource> resultPage = this.resourceMapper.selectPage(resourcePage, wrapper);

        List<Resource> resources = resultPage.getRecords();

        for (Resource resource : resources) {
            String author = resource.getAuthor();
            QueryWrapper<User> userQueryWrapper = new QueryWrapper<>();
            userQueryWrapper.eq("USERNAME",author);
            User user = userMapper.selectOne(userQueryWrapper);
            String profile = user.getProfile();
            resourceVO = new ResourceVO();
            resourceVO.setAuthorThumb(profile);
            BeanUtils.copyProperties(resource,resourceVO);
            result.add(resourceVO);
        }
        ResourcePageVO resourcePageVO = new ResourcePageVO();
        resourcePageVO.setData(result);
        resourcePageVO.setTotal(resultPage.getTotal());
        return resourcePageVO;
    }

    @Override
    public List<ResourceVO> ClassVoList(Integer id) {
        QueryWrapper<Resource> wrapper = new QueryWrapper<>();
        wrapper.like("sort_class",id);
        List<Resource> resources = resourceMapper.selectList(wrapper);

        ResourceVO resourceVO = null;

        List<ResourceVO> result = new ArrayList<>();

        for (Resource resource : resources) {
            resourceVO = new ResourceVO();
            BeanUtils.copyProperties(resource,resourceVO);
            result.add(resourceVO);
        }
        return result;
    }

    @Override
    public List<ResourceVO> GetNewResource(Integer num) {
        List<ResourceVO> result = new ArrayList<>();

        ResourceVO resourceVO = null;

        QueryWrapper<Resource> wrapper = new QueryWrapper<>();
        //wrapper限制查询数量
        wrapper.last("limit "+num);
        List<Resource> resources = resourceMapper.selectList(wrapper);
        for (Resource resource : resources) {
            String author = resource.getAuthor();
            QueryWrapper<User> userQueryWrapper = new QueryWrapper<>();
            userQueryWrapper.eq("USERNAME",author);
            User user = userMapper.selectOne(userQueryWrapper);
            String profile = user.getProfile();
            resourceVO = new ResourceVO();
            resourceVO.setAuthorThumb(profile);
            BeanUtils.copyProperties(resource,resourceVO);
            result.add(resourceVO);
        }

        return result;
    }
}
