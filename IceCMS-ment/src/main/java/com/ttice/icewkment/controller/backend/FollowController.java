package com.ttice.icewkment.controller.backend;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.entity.Follows;
import com.ttice.icewkment.entity.User;
import com.ttice.icewkment.mapper.FollowsMapper;
import com.ttice.icewkment.mapper.UserMapper;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * 前端控制器
 *
 * @author admin
 * @since 2022-02-19
 */
@io.swagger.annotations.Api(tags = "Web关注接口")
@RestController
@RequestMapping("/follow")
public class FollowController {

  @Autowired private FollowsMapper followsMapper;

  @Autowired private UserMapper userMapper;

  @ApiOperation(value = "根据关注者和被关注者id关注")
  @ApiImplicitParams({
    @ApiImplicitParam(name = "followerId", value = "关注者", required = true),
    @ApiImplicitParam(name = "followingId", value = "被关注者", required = true)
  })
  @GetMapping("/tofollow/{followerId}/{followingId}")
  public Integer tofollow(
      @PathVariable("followerId") Integer followerId,
      @PathVariable("followingId") Integer followingId) {
    Follows existsFollow =
        followsMapper.selectOne(
            new QueryWrapper<Follows>()
                .eq("follower_id", followerId)
                .eq("following_id", followingId));
    if (existsFollow == null) {
      Follows follow = new Follows();
      follow.setFollowerId(followerId);
      follow.setFollowingId(followingId);
      return followsMapper.insert(follow);
    } else {
      // 已存在相同记录，不进行插入操作
      return 0;
    }
  }

  @ApiOperation(value = "取消关注")
  @GetMapping("/unfollow/{followerId}/{followingId}")
  public Integer unfollowUser(
      @PathVariable("followerId") Integer followerId,
      @PathVariable("followingId") Integer followingId) {
    // QueryWrapper
    QueryWrapper wrapper = new QueryWrapper<>();
    wrapper.eq("follower_id", followerId);
    wrapper.eq("following_id", followingId);

    return followsMapper.delete(wrapper);
  }

  @ApiOperation(value = "关注者")
  @GetMapping("/followers/{followerIds}")
  public ArrayList getFollowers(@PathVariable("followerIds") Integer followerIds) {

    ArrayList result = new ArrayList<>();

    QueryWrapper wrapper = new QueryWrapper<>();

    wrapper.eq("follower_id", followerIds);

    List<Follows> list = followsMapper.selectList(wrapper);

    for (Follows follows : list) {
      HashMap<String, String> userfollow = new HashMap<>();

      Integer followingId = follows.getFollowingId();
      Integer followerId = follows.getFollowerId();
      // 数据库查询id对应的名称
      QueryWrapper wrapper1 = new QueryWrapper<>();
      wrapper1.eq("user_id", followerId);
      User user = userMapper.selectOne(wrapper1);
      String username = user.getUsername();
      String profile = user.getProfile();

      QueryWrapper wrapper2 = new QueryWrapper<>();
      wrapper2.eq("user_id", followingId);
      User user2 = userMapper.selectOne(wrapper2);
      String username2 = user2.getUsername();

      userfollow.put("following", String.valueOf(followingId));
      userfollow.put("followname", username2);
      userfollow.put("followprofile", profile);
      userfollow.put("follower", String.valueOf(followerId));
      userfollow.put("followername", username);

      result.add(userfollow);
    }

    return result;
  }

  //    @GetMapping("/following")
  //    public List<User> getFollowing(@RequestParam("userId") Long userId) {
  //        return followService.getFollowing(userId);
  //    }

}
