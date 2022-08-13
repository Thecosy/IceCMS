package com.ttice.icewkment.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.commin.vo.PlanetCommentVO;
import com.ttice.icewkment.entity.*;
import com.ttice.icewkment.mapper. PlanetCommentMapper;
import com.ttice.icewkment.service. PlanetCommentService;
import com.ttice.icewkment.service.UserService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author admin
 * @since 2022-02-19
 */
@io.swagger.annotations.Api(tags = "Web星球评论接口")
@RestController
@RequestMapping("/WebPlanetComment")
public class WebPlanetCommentController {

    @Autowired
    private PlanetCommentMapper planetCommentMapper;

    @Autowired
    private PlanetCommentService planetCommentService;

    @Autowired
    private UserService userService;

    @ApiOperation(value = "增加评论")
    @PostMapping("/addPlanetComment")
    @ApiImplicitParam(name = "PlanetComment",value = "评论分类对象",required = true)
    public boolean addPlanetComment(@RequestBody PlanetComment PlanetComment) {
        return planetCommentService.save(PlanetComment);
    }

    @ApiOperation(value = "根据文章id查看对应评论数")
    @ApiImplicitParam(name = "planetId",value = "评论id",required = true)
    @GetMapping("/getPlanetCommentnum/{planetId}")
    public int getPlanetCommentnum(
                @PathVariable("planetId") Integer planetId
    ) {
        return planetCommentService.GetCommentNum(planetId);
    }

    @ApiOperation(value = "查询评论(全部)")
    @GetMapping("/getallPlanetComment")
    public List<PlanetComment> getallPlanetComment(
    ) {
        //条件查询 parentId为0的为根评论
        QueryWrapper<PlanetComment> wrapper = new QueryWrapper<>();
        wrapper.eq("parent_id",0);

        return  planetCommentMapper.selectList(wrapper);

    }

//    @ApiOperation(value = "根据评论id查询评论的回复")
//    @ApiImplicitParam(name = "Id",value = "评论id",required = true)
//    @GetMapping("/getallPlanetIdComment/{Id}")
//    public List<PlanetComment> getallPlanetIdComment(
//            @PathVariable("Id") Integer Id
//    ) {
//        QueryWrapper<PlanetComment> wrapper = new QueryWrapper<>();
//        wrapper.eq("parent_id",Id);
//        return  planetCommentMapper.selectList(wrapper);
//    }

    @ApiOperation(value = "根据文章id查询评论")
    @ApiImplicitParam(name = "postId",value = "postId",required = true)
    @GetMapping("/getPlanetIdComment/{postId}")
    public List<PlanetCommentVO> getPlanetIdComment(
            @PathVariable("postId") Integer postId
    ) {
        List<PlanetCommentVO> result = new ArrayList<>();

        //条件查询 查询文章为postId的根评论
        QueryWrapper<PlanetComment> wrapper = new QueryWrapper<>();
        wrapper.eq("post_id",postId);
        wrapper.eq("parent_id",0);
        List<PlanetComment> planetComments = planetCommentMapper.selectList(wrapper);

        PlanetCommentVO planetCommentVO = null;
        //分解planetComments，并把PlanetCommentVO中的reply赋值为planetComment
        for (PlanetComment planetComment : planetComments) {
            Integer id = planetComment.getId();
            planetCommentVO = new PlanetCommentVO();
            QueryWrapper<PlanetComment> wrapper1 = new QueryWrapper<>();
            wrapper1.eq("parent_id",id);
            List<PlanetComment> planetComments1 = planetCommentMapper.selectList(wrapper1);
            for (PlanetComment comment : planetComments1) {
                //用userService查获录入着信息
                User user = userService.GetUserInfoById(comment.getUserId());
                //用userService查获回复着信息
                //如果ToUserId不为空
                if (comment.getToUserId() != 0) {
                    User user1 = userService.GetUserInfoById(comment.getToUserId());
                    comment.setResponder(user1.getName());
                    comment.setResponderId(user1.getUserId());
                }
                comment.setReviewers(user.getName());
                comment.setReviewersId(user.getUserId());
                comment.setProfile(user.getProfile());
            }
            planetCommentVO.setReply(planetComments1);

            User user3 = userService.GetUserInfoById(planetComment.getUserId());
            planetComment.setReviewers(user3.getName());
            planetComment.setResponderId(planetComment.getUserId());
            planetComment.setProfile(user3.getProfile());

            BeanUtils.copyProperties(planetComment,planetCommentVO);

            result.add(planetCommentVO);
        }
        return result;
    }

//
//    @ApiOperation(value = "最新评论")
//    @ApiImplicitParam(name = "num",value = "数量",required = true)
//    @GetMapping("/getNewArticleComment/{num}")
//    public List<ArticleCommentVO> getNewArticleComment(
//            @PathVariable("num") Integer num
//    ) {
//        List<ArticleCommentVO> result = new ArrayList<>();
//        QueryWrapper<ArticleComment> wrapper = new QueryWrapper<>();
//        wrapper.orderByDesc("add_time");
//        //使用last方法拼接sql语句
//        wrapper.last("limit "+ num);
//        List<ArticleComment> ArticleComments =  PlanetCommentMapper.selectList(wrapper);
//        for (ArticleComment ArticleComment : ArticleComments) {
//            ArticleCommentVO ArticleCommentVO = new ArticleCommentVO();
//            Integer articleId = ArticleComment.getArticleId();
//            //根据文章id查询文章名称
//            Article article = articleMapper.selectById(articleId);
//            String title = article.getTitle();
//            ArticleCommentVO.setArticleName(title);
//            BeanUtils.copyProperties(ArticleComment,ArticleCommentVO);
//
//            result.add(ArticleCommentVO);
//        }
//        return result;
//    }

}
