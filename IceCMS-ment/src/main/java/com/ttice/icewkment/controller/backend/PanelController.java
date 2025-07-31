package com.ttice.icewkment.controller.backend;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttice.icewkment.commin.lang.Result;
import com.ttice.icewkment.entity.*;
import com.ttice.icewkment.mapper.*;
import com.ttice.icewkment.service.PanelService;
import com.ttice.icewkment.service.ResourceCommentService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

/**
 * @projectName: IceCMS-Pro-main
 * @package: com.ttice.icewkment.controller
 * @className: PanelController
 * @author: Eric
 * @description:
 * @date: 2023/8/12 14:45
 * @version: 1.0
 */
@RestController
@RequestMapping("Panel")
public class PanelController {

    @Autowired
    private PanelService panelService;

    @GetMapping("getPanelInfo")
    public Result getPanelInfo() {
        Panel panel = panelService.SearchPanelInfo();
        return Result.succ(panel);
    }

    @Data
    public class ChartData {
        private String icon;
        private String bgColor;
        private String color;
        private int duration;
        private String name;
        private int TheValue;
        private String percent;
        private int[] data;
    }

    @Autowired UserMapper userMapper;

    @Autowired ArticleCommentMapper articleCommentMapper;

    @Autowired ResourceCommentMapper resourceCommentMapper;

    @Autowired UserOrderInfoMapper userOrderInfoMapper;
    
    @Autowired ArticleMapper articleMapper;
    
    @Autowired ResourceMapper resourceMapper;
    
    @Autowired SquareMapper squareMapper;

    @GetMapping("/chartData")
    public Result getChartData() {
        // 获取用户数量
        int userNum = userMapper.selectCount(null);

        //获取所有评论数量
        int commentNum = articleCommentMapper.selectCount(null) + resourceCommentMapper.selectCount(null);

        // 获取资源数量
        int resourceNum = resourceMapper.selectCount(null);

        // 获取订单数量
        int orderNum = userOrderInfoMapper.selectCount(null);

        String chartData = "[{\"icon\":\"GroupLine\",\"bgColor\":\"#effaff\",\"color\":\"#41b6ff\",\"duration\":2200,\"name\":\"用户\",\"TheValue\":"+ userNum +",\"percent\":\"+88%\",\"data\":[2101,5288,4239,4962,6752,5208,7450]}," +
                "{\"icon\":\"Question\",\"bgColor\":\"#fff5f4\",\"color\":\"#e85f33\",\"duration\":1600,\"name\":\"评论\",\"TheValue\": " + commentNum + ",\"percent\":\"+70%\",\"data\":[2216,1148,1255,788,4821,1973,4379]}," +
                "{\"icon\":\"CheckLine\",\"bgColor\":\"#eff8f4\",\"color\":\"#26ce83\",\"duration\":1500,\"name\":\"资源\",\"TheValue\": " + resourceNum + ",\"percent\":\"+99%\",\"data\":[861,1002,3195,1715,3666,2415,3645]}," +
                "{\"icon\":\"Smile\",\"bgColor\":\"#f6f4fe\",\"color\":\"#7846e5\",\"duration\":100,\"name\":\"销量\",\"TheValue\": " + orderNum + ",\"percent\":\"+100%\",\"data\":[100]}]";
        return Result.succ(chartData);
    }
    
    @GetMapping("/getSystemOverview")
    public Result getSystemOverview() {
        Map<String, Object> result = new HashMap<>();
        
        // 获取系统概览数据
        int userCount = userMapper.selectCount(null);
        int articleCount = articleMapper.selectCount(null);
        int resourceCount = resourceMapper.selectCount(null);
        int commentCount = articleCommentMapper.selectCount(null) + resourceCommentMapper.selectCount(null);
        int orderCount = userOrderInfoMapper.selectCount(null);
        int squareCount = squareMapper.selectCount(null);
        
        // 获取最近7天的数据趋势
        List<Map<String, Object>> weeklyTrend = new ArrayList<>();
        LocalDate today = LocalDate.now();
        
        for (int i = 6; i >= 0; i--) {
            LocalDate date = today.minusDays(i);
            Date startDate = Date.from(date.atStartOfDay(ZoneId.systemDefault()).toInstant());
            Date endDate = Date.from(date.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
            
            // 查询当天的用户注册数
            QueryWrapper<User> userQuery = new QueryWrapper<>();
            userQuery.between("create_time", startDate, endDate);
            int dailyUserCount = userMapper.selectCount(userQuery);
            
            // 查询当天的文章发布数
            QueryWrapper<Article> articleQuery = new QueryWrapper<>();
            articleQuery.between("add_time", startDate, endDate);
            int dailyArticleCount = articleMapper.selectCount(articleQuery);
            
            // 查询当天的资源发布数
            QueryWrapper<Resource> resourceQuery = new QueryWrapper<>();
            resourceQuery.between("add_time", startDate, endDate);
            int dailyResourceCount = resourceMapper.selectCount(resourceQuery);
            
            // 查询当天的订单数
            QueryWrapper<OrderInfo> orderQuery = new QueryWrapper<>();
            orderQuery.between("create_time", startDate, endDate);
            int dailyOrderCount = userOrderInfoMapper.selectCount(orderQuery);
            
            Map<String, Object> dayData = new HashMap<>();
            dayData.put("date", date.toString());
            dayData.put("users", dailyUserCount);
            dayData.put("articles", dailyArticleCount);
            dayData.put("resources", dailyResourceCount);
            dayData.put("orders", dailyOrderCount);
            
            weeklyTrend.add(dayData);
        }
        
        // 计算增长率
        double userGrowthRate = calculateGrowthRate(weeklyTrend, "users");
        double articleGrowthRate = calculateGrowthRate(weeklyTrend, "articles");
        double resourceGrowthRate = calculateGrowthRate(weeklyTrend, "resources");
        double orderGrowthRate = calculateGrowthRate(weeklyTrend, "orders");
        
        // 组装结果
        result.put("totalUsers", userCount);
        result.put("totalArticles", articleCount);
        result.put("totalResources", resourceCount);
        result.put("totalComments", commentCount);
        result.put("totalOrders", orderCount);
        result.put("totalSquares", squareCount);
        
        result.put("userGrowthRate", String.format("%.1f", userGrowthRate));
        result.put("articleGrowthRate", String.format("%.1f", articleGrowthRate));
        result.put("resourceGrowthRate", String.format("%.1f", resourceGrowthRate));
        result.put("orderGrowthRate", String.format("%.1f", orderGrowthRate));
        
        result.put("weeklyTrend", weeklyTrend);
        
        return Result.succ(result);
    }
    
    /**
     * 计算增长率
     * @param data 数据列表
     * @param key 要计算的键
     * @return 增长率（百分比）
     */
    private double calculateGrowthRate(List<Map<String, Object>> data, String key) {
        if (data.size() < 2) {
            return 0;
        }
        
        // 获取前3天和后3天的数据总和
        int firstHalf = 0;
        int secondHalf = 0;
        
        for (int i = 0; i < 3; i++) {
            firstHalf += (int) data.get(i).get(key);
        }
        
        for (int i = 4; i < 7; i++) {
            secondHalf += (int) data.get(i).get(key);
        }
        
        // 避免除以零
        if (firstHalf == 0) {
            return secondHalf > 0 ? 100 : 0;
        }
        
        // 计算增长率
        return ((double) (secondHalf - firstHalf) / firstHalf) * 100;
    }
}
