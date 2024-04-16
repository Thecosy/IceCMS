package com.ttice.icewkment.controller.frontend;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.commin.vo.SquareCommentVO;
import com.ttice.icewkment.entity.*;
import com.ttice.icewkment.mapper.SquareCommentMapper;
import com.ttice.icewkment.service.SquareCommentService;
import com.ttice.icewkment.service.UserService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * 前端控制器
 *
 * @author admin
 * @since 2022-02-19
 */
@io.swagger.annotations.Api(tags = "Web圈子评论接口")
@RestController
@RequestMapping("/WebSquareComment")
public class WebSquareCommentController {

  @Autowired private SquareCommentMapper squareCommentMapper;

  @Autowired private SquareCommentService squareCommentService;

  @Autowired private UserService userService;

  @ApiOperation(value = "增加评论")
  @PostMapping("/addPlanetComment")
  @ApiImplicitParam(name = "PlanetComment", value = "评论分类对象", required = true)
  public boolean addPlanetComment(@RequestBody SquareComment SquareComment) {
    return squareCommentService.save(SquareComment);
  }

  @ApiOperation(value = "根据文章id查看对应评论数")
  @ApiImplicitParam(name = "planetId", value = "评论id", required = true)
  @GetMapping("/getPlanetCommentnum/{planetId}")
  public int getPlanetCommentnum(@PathVariable("planetId") Integer planetId) {
    return squareCommentService.GetCommentNum(planetId);
  }

  //    @ApiOperation(value = "查询评论(全部)")
  //    @GetMapping("/getallPlanetComment")
  //    public List<SquareComment> getallPlanetComment(
  //    ) {
  //        //条件查询 parentId为0的为根评论
  //        QueryWrapper<SquareComment> wrapper = new QueryWrapper<>();
  //        wrapper.eq("parent_id",0);
  //
  //        return  squareCommentMapper.selectList(wrapper);
  //    }

  @ApiOperation(value = "评论点赞")
  @ApiImplicitParam(name = "id", value = "评论id", required = true)
  @GetMapping("/likeClickComment/{id}")
  public Boolean likeClickComment(@PathVariable("id") Integer id) {
    return squareCommentMapper.resourceLoveBrowse(id);
  }

  @ApiOperation(value = "根据文章id查询评论")
  @ApiImplicitParam(name = "postId", value = "postId", required = true)
  @GetMapping("/getPlanetIdComment/{postId}")
  public List<SquareCommentVO> getPlanetIdComment(@PathVariable("postId") Integer postId) {
    List<SquareCommentVO> result = new ArrayList<>();

    // 条件查询 查询文章为postId的根评论
    QueryWrapper<SquareComment> wrapper = new QueryWrapper<>();
    wrapper.select().orderByDesc("add_time");
    wrapper.eq("post_id", postId);
    wrapper.eq("parent_id", 0);
    List<SquareComment> squareComments = squareCommentMapper.selectList(wrapper);

    SquareCommentVO planetCommentVO = null;
    // 分解planetComments，并把PlanetCommentVO中的reply赋值为planetComment
    for (SquareComment squareComment : squareComments) {
      Integer id = squareComment.getId();
      planetCommentVO = new SquareCommentVO();
      QueryWrapper<SquareComment> wrapper1 = new QueryWrapper<>();
      wrapper1.select().orderByDesc("add_time");
      wrapper1.eq("parent_id", id);
      List<SquareComment> squareComments1 = squareCommentMapper.selectList(wrapper1);
      for (SquareComment comment : squareComments1) {
        // 用userService查获录入着信息
        User user = userService.GetUserInfoById(comment.getUserId());
        // 用userService查获回复着信息
        // 如果ToUserId不为空
        if (comment.getToUserId() != 0) {
          User user1 = userService.GetUserInfoById(comment.getToUserId());
          comment.setResponder(user1.getName());
          comment.setResponderId(user1.getUserId());
        }
        comment.setReviewers(user.getName());
        comment.setReviewersId(user.getUserId());
        comment.setProfile(user.getProfile());
      }
      planetCommentVO.setReply(squareComments1);

      User user3 = userService.GetUserInfoById(squareComment.getUserId());
      squareComment.setReviewers(user3.getName());
      squareComment.setResponderId(squareComment.getUserId());
      squareComment.setProfile(user3.getProfile());

      BeanUtils.copyProperties(squareComment, planetCommentVO);

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
