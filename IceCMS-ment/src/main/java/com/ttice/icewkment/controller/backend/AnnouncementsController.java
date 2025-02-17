package com.ttice.icewkment.controller.backend;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.commin.lang.Result;
import com.ttice.icewkment.entity.Announcements;
import com.ttice.icewkment.mapper.AnnouncementsMapper;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@io.swagger.annotations.Api(tags = "后台公告接口")
@RestController
@RequestMapping("/Announcements")
public class AnnouncementsController {

    @Autowired
    private AnnouncementsMapper announcementsMapper;

    @RequiresAuthentication // 需要登录认证的接口
    @ApiOperation(value = "新建公告")
    @ApiImplicitParam(name = "articleClass", value = "公告对象", required = true)
    @PostMapping("/newAnnouncements")
    public Result newArticleClass(@RequestBody Announcements announcements) {

        QueryWrapper<Announcements> wrapper = new QueryWrapper<Announcements>();
        wrapper.eq("name", announcements.getTitle());
        Announcements announcementsjudje = announcementsMapper.selectOne(wrapper);
        if (announcementsjudje != null) {
            // 该公告已存在
            return Result.fail("该公告已存在");
        }
        return Result.succ(announcementsMapper.insert(announcements));
    }


    @RequiresAuthentication // 需要登录认证的接口
    @ApiOperation(value = "删除公告")
    @ApiImplicitParam(name = "id", value = "id", required = true)
    @PostMapping("/deleteAnnouncements")
    public Result deleteAnnouncements(@RequestBody Announcements announcements) {
        return Result.succ(announcementsMapper.deleteById(announcements.getId()));
    }

    @RequiresAuthentication // 需要登录认证的接口
    @ApiOperation(value = "修改公告")
    @ApiImplicitParam(name = "articleClass", value = "公告对象", required = true)
    @PostMapping("/updateAnnouncements")
    public Result updateAnnouncements(@RequestBody Announcements announcements) {
        return Result.succ(announcementsMapper.updateById(announcements));
    }

    @RequiresAuthentication // 需要登录认证的接口
    @ApiOperation(value = "获取全部公告列表")
    @GetMapping("/getAnnouncementslist")
    public Result getAnnouncementslist() {
        return Result.succ(announcementsMapper.selectList(null));
    }

}
