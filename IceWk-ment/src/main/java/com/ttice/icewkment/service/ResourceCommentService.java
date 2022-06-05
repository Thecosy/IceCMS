package com.ttice.icewkment.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ttice.icewkment.entity.ResourceComment;
import org.springframework.stereotype.Repository;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author admin
 * @since 2022-03-28
 */
@Repository
public interface ResourceCommentService extends IService<ResourceComment> {
    int GetCommentNum(Integer resourceId);

}
