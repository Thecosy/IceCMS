package com.ttice.icewkment.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.commin.vo.ResourcePageVO;
import com.ttice.icewkment.commin.vo.ResourceVO;
import com.ttice.icewkment.entity.Resource;
import com.ttice.icewkment.mapper.ResourceMapper;
import com.ttice.icewkment.mapper.ResourceVOMapper;
import com.ttice.icewkment.service.ResourceService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author admin
 * @since 2022-03-28
 */
@io.swagger.annotations.Api(tags = "Web资源接口")
@RestController
@RequestMapping("/WebResource")
public class WebResourceController {

    @Autowired
    private ResourceService resourceService;

    @Autowired
    private ResourceMapper resourceMapper;

    @Autowired
    private ResourceVOMapper resourceVOMapper;

    @ApiOperation(value = "根据id获取资源内容")
    @ApiImplicitParam(name = "id",value = "文章id",required = true)
    @GetMapping("/getResourceById/{id}")
    public Resource getResourceById(
            @PathVariable("id") Integer id
    ) {
        return this.resourceService.getById(id);
    }

    @ApiOperation(value = "根据分类id获取资源内容")
    @ApiImplicitParam(name = "id",value = "Classid",required = true)
    @GetMapping("/getResourceByClassId/{id}")
    public List<ResourceVO> getResourceByClassId(
            @PathVariable("id") Integer id
    ) {

        return this.resourceService.ClassVoList(id);
    }

    @ApiOperation(value = "获取全部资源列表(分页)")
    @ApiImplicitParam(name = "articleId",value = "文章id",required = true)
    @GetMapping("/getAllResource/{page}/{limit}")
    public ResourcePageVO getAllArticle(
            @PathVariable("page") Integer page,
            @PathVariable("limit") Integer limit
    ) {
        return this.resourceService.VoList(page, limit);
    }

    @ApiOperation(value = "获取所有资源数量")
    @GetMapping("/getAllResourceNumber")
    public Integer getAllResourceNumber() {
        QueryWrapper<Resource> wrapper = new QueryWrapper<>();
        wrapper.select().eq("status","published");
        return resourceMapper.selectCount(wrapper);
    }

    @ApiOperation(value = "统计文章浏览量+1")
    @GetMapping("/resource/{id}/view")
    @ApiImplicitParam(name = "id",value = "资源id",required = true)
    public Boolean resourceViewBrowse(
            @PathVariable("id") Integer id
    ) {
        return resourceMapper.resourceBrowse(id);
    }

    @ApiOperation(value = "统计文章喜欢量+1")
    @GetMapping("/resource/{id}/love")
    @ApiImplicitParam(name = "id",value = "资源id",required = true)
    public Boolean resourceLoveBrowse(
            @PathVariable("id") Integer id
    ) {
        return resourceMapper.resourceLoveBrowse(id);
    }

    @ApiOperation(value = "获取最新资源列表")
    @ApiImplicitParam(name = "articleNum",value = "文章数量",required = true)
    @GetMapping("/getNewResource/{resourceNum}")
    public List<ResourceVO> getNewResource(
            @PathVariable("resourceNum") Integer resourceNum
    ) {

        return resourceVOMapper.selectAll(resourceNum);
    }

    @ApiOperation(value = "文章查询(预览)")
    @GetMapping("/findresourcebynum/{content}/{num}")
    @ApiImplicitParam(name = "content",value = "模糊查询标题",required = true)
    public List<Resource> FindresourceByNum(
            @PathVariable("content") String content,
            @PathVariable("num") String num
    ) {
        QueryWrapper<Resource> wrapper = new QueryWrapper<>();
        wrapper.like("title",content)
                .last("limit "+num);
        return resourceMapper.selectList(wrapper);
    }

}

