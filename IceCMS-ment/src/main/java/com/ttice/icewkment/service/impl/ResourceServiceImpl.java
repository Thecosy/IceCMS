package com.ttice.icewkment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ttice.icewkment.commin.vo.ResourcePageVO;
import com.ttice.icewkment.commin.vo.ResourceVO;
import com.ttice.icewkment.entity.ArticleClass;
import com.ttice.icewkment.entity.Resource;
import com.ttice.icewkment.entity.ResourceClass;
import com.ttice.icewkment.entity.User;
import com.ttice.icewkment.mapper.ResourceClassMapper;
import com.ttice.icewkment.mapper.ResourceMapper;
import com.ttice.icewkment.mapper.UserMapper;
import com.ttice.icewkment.service.ResourceService;
import io.swagger.models.auth.In;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 服务实现类
 *
 * @author admin
 * @since 2022-03-28
 */
@Service
public class ResourceServiceImpl extends ServiceImpl<ResourceMapper, Resource>
    implements ResourceService {

  @Autowired private ResourceMapper resourceMapper;

  @Autowired private UserMapper userMapper;

  @Autowired private ResourceClassMapper resourceClassMapper;

  @Override
  public ResourcePageVO FindVoList(Integer page, Integer limit, String content) {
    List<ResourceVO> result = new ArrayList<>();

    ResourceVO resourceVO = null;

    Page<Resource> resourcePage = new Page<>(page, limit);

    QueryWrapper<Resource> wrapper = new QueryWrapper<Resource>();
    wrapper.orderByDesc("id").like("title", content);

    Page<Resource> resultPage = this.resourceMapper.selectPage(resourcePage, wrapper);

    List<Resource> resources = resultPage.getRecords();
    long total = resultPage.getTotal();
    for (Resource resource : resources) {

      // 根据作者名称查询对应的头像地址
      Integer authorId = resource.getAuthorId();
      User users = userMapper.searchId(authorId);
      String profile = users.getProfile();
      resourceVO = new ResourceVO();
      resourceVO.setProfile(profile);

      BeanUtils.copyProperties(resource, resourceVO);
      result.add(resourceVO);
    }
    ResourcePageVO resourcePageVO = new ResourcePageVO();
    resourcePageVO.setData(result);
    resourcePageVO.setTotal(total);
    return resourcePageVO;
  }

  @Override
  public ResourcePageVO VoList(Integer page, Integer limit) {
    List<ResourceVO> result = new ArrayList<>();

    ResourceVO resourceVO = null;

    Page<Resource> resourcePage = new Page<>(page, limit);

    QueryWrapper<Resource> wrapper = new QueryWrapper<Resource>();
    wrapper.orderByDesc("id");

    Page<Resource> resultPage = this.resourceMapper.selectPage(resourcePage, wrapper);

    List<Resource> resources = resultPage.getRecords();

    for (Resource resource : resources) {
      // 根据作者id查询对应的头像地址
      Integer authorId = resource.getAuthorId();
      QueryWrapper<User> userQueryWrapper = new QueryWrapper<>();
      userQueryWrapper.eq("user_id", authorId);
      User user = userMapper.selectOne(userQueryWrapper);
      String profile = user.getProfile();

      resourceVO = new ResourceVO();
      resourceVO.setAuthorThumb(profile);
      //设置用户名称
      String author = user.getUsername();
      resourceVO.setAuthor(author);
      // 获取对应分类
      String sortClass = String.valueOf(resource.getSortClass());
      ResourceClass resourceClass = resourceClassMapper.selectById(sortClass);
      String classname = resourceClass.getName();
      resourceVO.setClassName(classname);


      BeanUtils.copyProperties(resource, resourceVO);
      result.add(resourceVO);
    }
    ResourcePageVO resourcePageVO = new ResourcePageVO();
    resourcePageVO.setData(result);
    resourcePageVO.setTotal(resultPage.getTotal());
    return resourcePageVO;
  }

  @Override
  public ResourcePageVO VoListFilter(Integer page, Integer limit, Integer rclass, String filter) {
    List<ResourceVO> result = new ArrayList<>();

    ResourceVO resourceVO = null;

    Page<Resource> resourcePage = new Page<>(page, limit);

    QueryWrapper<Resource> wrapper = new QueryWrapper<Resource>();
    if (filter.equals("news")) {
      wrapper.orderByDesc("id");
    }
    if (filter.equals("love")) {
      wrapper.orderByDesc("love_num");
    }
    if (filter.equals("recommend")) {
      wrapper.orderByDesc("owner_tag");
    }
    if (filter.equals("download")) {
      wrapper.orderByDesc("hits");
    }
    if (filter.equals("discuss")) {
      wrapper.orderByDesc("post_num");
    }
    if (rclass != 0) {
      wrapper.eq("sort_class", rclass);
    }

    Page<Resource> resultPage = this.resourceMapper.selectPage(resourcePage, wrapper);

    List<Resource> resources = resultPage.getRecords();

    for (Resource resource : resources) {
      Integer authorId = resource.getAuthorId();
      QueryWrapper<User> userQueryWrapper = new QueryWrapper<>();
      userQueryWrapper.eq("user_id", authorId);
      User user = userMapper.selectOne(userQueryWrapper);
      String profile = user.getProfile();
      resourceVO = new ResourceVO();
      resourceVO.setAuthorThumb(profile);
      BeanUtils.copyProperties(resource, resourceVO);
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
    wrapper.like("sort_class", id);
    List<Resource> resources = resourceMapper.selectList(wrapper);

    ResourceVO resourceVO = null;

    List<ResourceVO> result = new ArrayList<>();

    for (Resource resource : resources) {
      resourceVO = new ResourceVO();
      BeanUtils.copyProperties(resource, resourceVO);
      result.add(resourceVO);
    }
    return result;
  }

  @Override
  public List<ResourceVO> GetNewResource(Integer num, String filter) {
    List<ResourceVO> result = new ArrayList<>();

    ResourceVO resourceVO = null;

    QueryWrapper<Resource> wrapper = new QueryWrapper<>();
    // wrapper限制查询数量
    wrapper.last("limit " + num);

    if (filter.equals("new")) {
      wrapper.orderByDesc("id");
    }
    if (filter.equals("download")) {
      wrapper.orderByDesc("hits");
    }
    if (filter.equals("recommend")) {
      wrapper.orderByDesc("owner_tag");
    }
    if (filter.equals("discuss")) {
      wrapper.orderByDesc("post_num");
    }

    List<Resource> resources = resourceMapper.selectList(wrapper);
    for (Resource resource : resources) {
      Integer authorId = resource.getAuthorId();
      QueryWrapper<User> userQueryWrapper = new QueryWrapper<>();
      userQueryWrapper.eq("user_id", authorId);
      User user = userMapper.selectOne(userQueryWrapper);
      String profile = user.getProfile();
      resourceVO = new ResourceVO();
      resourceVO.setAuthorThumb(profile);
      BeanUtils.copyProperties(resource, resourceVO);
      result.add(resourceVO);
    }

    return result;
  }
}
