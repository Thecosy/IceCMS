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

  /**
   * 根据类型获取资源（最新、下载量、评论数、喜欢数、推荐）
   * @param page 页数
   * @param limit 每页数量
   * @param type 类型：new(最新)、hot(下载量)、commend(评论数)、like(喜欢数)、recommend(推荐)
   * @return ResourcePageVO
   */
  ResourcePageVO getResourceByType(Integer page, Integer limit, String type);

  /**
   * 根据分类ID和类型获取资源
   * @param page 页数
   * @param limit 每页数量
   * @param classId 分类ID
   * @param type 类型：new(最新)、hot(下载量)、commend(评论数)、like(喜欢数)、recommend(推荐)
   * @return ResourcePageVO
   */
  ResourcePageVO getResourceByClassAndType(Integer page, Integer limit, Integer classId, String type);

  /**
   * 获取相关推荐资源
   * @param classId 分类ID（可选，如果为null则获取全局推荐）
   * @param limit 获取数量
   * @return List<ResourceVO>
   */
  List<ResourceVO> getRecommendedResources(Integer classId, Integer limit);

  /**
   * 获取热门资源（基于浏览量）
   * @param limit 获取数量
   * @return List<ResourceVO>
   */
  List<ResourceVO> getHotResources(Integer limit);

  /**
   * 获取最新资源
   * @param limit 获取数量
   * @return List<ResourceVO>
   */
  List<ResourceVO> getLatestResources(Integer limit);
}
