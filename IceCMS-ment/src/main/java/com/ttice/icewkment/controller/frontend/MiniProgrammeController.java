package com.ttice.icewkment.controller.frontend;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.commin.vo.ArticleVO;
import com.ttice.icewkment.commin.vo.ResourceVO;
import com.ttice.icewkment.commin.vo.SquarePageVO;
import com.ttice.icewkment.entity.*;
import com.ttice.icewkment.mapper.*;
import com.ttice.icewkment.service.*;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@io.swagger.annotations.Api(tags = "Mini接口")
@RestController
@RequestMapping("/Mini")
public class MiniProgrammeController {

    @Autowired private DispositionCarouselMapper disposition_carouselMapper;
    @Autowired private ArticleService articleService;
    @Autowired private ArticleMapper articleMapper;
    @Autowired private UserMapper userMapper;
    @Autowired private ArticleCommentService articleCommentService;
    @Autowired private ArticleClassMapper articleClassMapper;
    @Autowired private AllTagMapper allTagMapper;
    @Autowired private ResourceService resourceService;
    @Autowired private SquareService squareService;
    @Autowired private SquareClassMapper squareClassMapper;


    @ApiOperation(value = "获取首页轮播图")
    @GetMapping("/getCarousel")
    public List<Map<String, Object>> getDispositionCarousels() {
        List<DispositionCarousel> dispositionCarousels = disposition_carouselMapper.selectList(null);
        List<Map<String, Object>> resultList = new ArrayList<>();

        for (DispositionCarousel dispositionCarousel : dispositionCarousels) {
            Map<String, Object> myMap = new HashMap<>();
            myMap.put("id", dispositionCarousel.getId());
            myMap.put("type", "image");
//            myMap.put("title", dispositionCarousel.getTitle());
            myMap.put("introduce", dispositionCarousel.getIntroduce());
            myMap.put("button", dispositionCarousel.getButton());
            myMap.put("url", dispositionCarousel.getImg());

            resultList.add(myMap);
        }

        return resultList;
    }

    @ApiOperation(value = "根据id获取文章内容")
    @ApiImplicitParam(name = "id", value = "文章id", required = true)
    @GetMapping("/getArticleById/{id}")
    public ArticleVO getArticleById(@PathVariable("id") Integer id) {
        Article article = articleService.getById(id);
        String sortClass = String.valueOf(article.getSortClass());
        QueryWrapper<ArticleClass> wrapper = new QueryWrapper<>();
        wrapper.eq("id", sortClass);
        ArticleClass articleClass = articleClassMapper.selectOne(wrapper);
        String name = articleClass.getName();

        // 根据用户id获取用户
        Integer authorId = article.getAuthorId();
        User user = userMapper.searchId(authorId);
        String profile = user.getProfile();
        String username = user.getUsername();

        ArticleVO articleBuffer = new ArticleVO();
        BeanUtils.copyProperties(article, articleBuffer);
        articleBuffer.setSortClass(name);
        articleBuffer.setProfile(profile);
        articleBuffer.setAuthorName(username);
        articleBuffer.setLoveNum(article.getLoveNum());

        return articleBuffer;
    }

    @ApiOperation(value = "获取重要文章")
    @GetMapping("/GetArticleBtmatter")
    public List<ArticleVO> GetArticleBtmatter() {
        List<ArticleVO> result = new ArrayList<>();

        QueryWrapper<Article> Wrapper = new QueryWrapper<>();
        Wrapper.select().orderByAsc("add_time");
        Wrapper.orderByDesc("owner_tag");
        Wrapper.last("limit 0,4");
        List<Article> articles = this.articleMapper.selectList(Wrapper);
        for (Article article : articles) {
            // 获取id
            Integer aid = article.getId();
            // 获取对应评论数量
            int acnum = articleCommentService.GetCommentNum(aid);
            // 根据作者名称查询对应的头像地址
            Integer authorId = article.getAuthorId();
            User users = userMapper.searchId(authorId);
            String profile = users.getProfile();
            // 获取对应分类
            String sortClass = String.valueOf(article.getSortClass());
            ArticleClass articleClass = articleClassMapper.selectById(sortClass);
            String classname = articleClass.getName();

            ArticleVO articleVOs = new ArticleVO();
            articleVOs.setProfile(profile);
            articleVOs.setCommentNum(acnum);
            articleVOs.setClassName(classname);
            articleVOs.setIntro(article.getIntro());
            // 根据article.getKeyword()的id列表查找响应名称组装成类似['小程序', '前端', '后端']
            // 获取关键词ID列表，假设关键词ID是以逗号分隔的字符串形式存储的
//            String[] keywordIds = article.getKeyword().split(",");
//
//            // 将关键词ID列表转换为List<Integer>
//            List<Integer> keywordIdList = Arrays.stream(keywordIds)
//                    .map(Integer::parseInt)
//                    .collect(Collectors.toList());
//
//            // 根据关键词ID列表查询对应的标签名称
//            List<String> keywords = allTagMapper.selectList(new QueryWrapper<AllTag>().in("id", keywordIdList))
//                    .stream()
//                    .map(AllTag::getTagName)
//                    .collect(Collectors.toList());
//
//            // 将标签名称列表设置为ArticleVO对象的关键词属性
//            // 将标签名称列表转换为逗号分隔的字符串
//            String keywordString = String.join(",", keywords);
//
//            // 将标签名称字符串设置为ArticleVO对象的关键词属性
//            article.setKeyword(keywordString);
            // 获取关键词ID列表，假设关键词ID是以逗号分隔的字符串形式存储的
            String[] keywordIds = article.getKeyword().split(",");

            // 只获取第一个关键词ID
            String firstKeywordId = keywordIds.length > 0 ? keywordIds[0].trim() : "";

            // 根据第一个关键词ID查询对应的标签名称
            String keywordName = "";
            if (!firstKeywordId.isEmpty()) {
                keywordName = allTagMapper.selectOne(new QueryWrapper<AllTag>().eq("id", firstKeywordId)).getTagName();
            }

            // 将标签名称设置为ArticleVO对象的关键词属性
            article.setKeyword(keywordName);

            BeanUtils.copyProperties(article, articleVOs);
            result.add(articleVOs);
        }
        return result;
    }

    @ApiOperation(value = "获取最新资源列表")
    @ApiImplicitParam(name = "articleNum", value = "数量", required = true)
    @GetMapping("/getNewResource/{resourceNum}/{filter}")
    public List<ResourceVO> getNewResource(
            @PathVariable("resourceNum") Integer resourceNum, @PathVariable("filter") String filter) {
        return resourceService.GetNewResource(resourceNum, filter);
    }

    @ApiOperation(value = "根据id获取资源内容")
    @ApiImplicitParam(name = "id", value = "资源id", required = true)
    @GetMapping("/getResourceById/{id}")
    public Resource getResourceById(@PathVariable("id") Integer id) {
        return this.resourceService.getById(id);
    }

    @ApiOperation(value = "根据别名获取全部圈子(分页)")
    @ApiImplicitParam(name = "otherName", value = "otherName", required = true)
    @GetMapping("/getAllSquare/{id}/{page}/{limit}")
    public SquarePageVO getAllArticle(
            @PathVariable("id") Integer id,
            @PathVariable("page") Integer page,
            @PathVariable("limit") Integer limit) {

        return squareService.VoList(id, page, limit);
    }

    @ApiOperation(value = "获取全部分类列表")
    @GetMapping("/getSquareClasslist")
    public List<SquareClass> getSquareClasslist() {
        return squareClassMapper.selectList(null);
    }

}
