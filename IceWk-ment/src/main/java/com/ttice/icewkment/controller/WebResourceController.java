package com.ttice.icewkment.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.commin.vo.ResourcePageVO;
import com.ttice.icewkment.commin.vo.ResourceVO;
import com.ttice.icewkment.entity.Resource;
import com.ttice.icewkment.mapper.ResourceMapper;
import com.ttice.icewkment.service.ResourceService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
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

    @ApiOperation(value = "根据id获取资源内容")
    @ApiImplicitParam(name = "id",value = "资源id",required = true)
    @GetMapping("/getResourceById/{id}")
    public Resource getResourceById(
            @PathVariable("id") Integer id
    ) {
        return this.resourceService.getById(id);
    }

    @ApiOperation(value = "根据分类id获取资源内容")
    @ApiImplicitParam(name = "id",value = "分类id",required = true)
    @GetMapping("/getResourceByClassId/{id}")
    public List<ResourceVO> getResourceByClassId(
            @PathVariable("id") Integer id
    ) {

        return this.resourceService.ClassVoList(id);
    }

    @ApiOperation(value = "获取全部资源列表(分页)")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page",value = "页数",required = true),
            @ApiImplicitParam(name = "limit",value = "总量",required = true)
    })
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

    @ApiOperation(value = "统计资源浏览量+1")
    @ApiImplicitParam(name = "id",value = "资源id",required = true)
    @GetMapping("/resource/{id}/view")
    public Boolean resourceViewBrowse(
            @PathVariable("id") Integer id
    ) {
        return resourceMapper.resourceBrowse(id);
    }

    @ApiOperation(value = "统计资源喜欢量+1")
    @ApiImplicitParam(name = "id",value = "资源id",required = true)
    @GetMapping("/resource/{id}/love")
    public Boolean resourceLoveBrowse(
            @PathVariable("id") Integer id
    ) {
        return resourceMapper.resourceLoveBrowse(id);
    }

    @ApiOperation(value = "获取最新资源列表")
    @ApiImplicitParam(name = "articleNum",value = "数量",required = true)
    @GetMapping("/getNewResource/{resourceNum}")
    public List<ResourceVO> getNewResource(
            @PathVariable("resourceNum") Integer resourceNum
    ) {

//        return resourceVOMapper.selectAll(resourceNum);
        return resourceService.GetNewResource(resourceNum);
    }

    @ApiOperation(value = "文章查询(预览)")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "content",value = "内容",required = true),
            @ApiImplicitParam(name = "num",value = "总量",required = true)
    })
    @GetMapping("/findresourcebynum/{content}/{num}")
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

