package com.ttice.icewkment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.entity.ArticleComment;
import com.ttice.icewkment.entity.ResourceComment;
import com.ttice.icewkment.mapper.ArticleCommentMapper;
import com.ttice.icewkment.mapper.ResourceCommentMapper;
import com.ttice.icewkment.service.ResourceCommentService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author admin
 * @since 2022-03-28
 */
@Service
public class ResourceCommentServiceImpl extends ServiceImpl<ResourceCommentMapper, ResourceComment> implements ResourceCommentService {

    @Autowired
    private ResourceCommentMapper resourceCommentMapper;

    @Override
    public int GetCommentNum(Integer resourceId) {
        QueryWrapper<ResourceComment> wrapper = new QueryWrapper<>();
        wrapper.eq("resource_id",resourceId);
        return resourceCommentMapper.selectCount(wrapper);
    }
}
