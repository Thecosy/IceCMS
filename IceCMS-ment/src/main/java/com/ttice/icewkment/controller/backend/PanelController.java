package com.ttice.icewkment.controller.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttice.icewkment.commin.lang.Result;
import com.ttice.icewkment.entity.OrderInfo;
import com.ttice.icewkment.entity.Panel;
import com.ttice.icewkment.mapper.ArticleCommentMapper;
import com.ttice.icewkment.mapper.ResourceCommentMapper;
import com.ttice.icewkment.mapper.UserMapper;
import com.ttice.icewkment.mapper.VipOrderInfoMapper;
import com.ttice.icewkment.service.PanelService;
import com.ttice.icewkment.service.ResourceCommentService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @Autowired VipOrderInfoMapper vipOrderInfoMapper;

    @GetMapping("/chartData")
    public Result getChartData() {
        // 获取用户数量
        int userNum = userMapper.selectCount(null);

        //获取所有评论数量
        int commentNum = articleCommentMapper.selectCount(null) + resourceCommentMapper.selectCount(null);

        // 获取资源数量
        int resourceNum = resourceCommentMapper.selectCount(null);

        // 获取订单数量
        int orderNum = vipOrderInfoMapper.selectCount(null);

        String chartData = "[{\"icon\":\"GroupLine\",\"bgColor\":\"#effaff\",\"color\":\"#41b6ff\",\"duration\":2200,\"name\":\"用户\",\"TheValue\":"+ userNum +",\"percent\":\"+88%\",\"data\":[2101,5288,4239,4962,6752,5208,7450]}," +
                "{\"icon\":\"Question\",\"bgColor\":\"#fff5f4\",\"color\":\"#e85f33\",\"duration\":1600,\"name\":\"评论\",\"TheValue\": " + commentNum + ",\"percent\":\"+70%\",\"data\":[2216,1148,1255,788,4821,1973,4379]}," +
                "{\"icon\":\"CheckLine\",\"bgColor\":\"#eff8f4\",\"color\":\"#26ce83\",\"duration\":1500,\"name\":\"资源\",\"TheValue\": " + resourceNum + ",\"percent\":\"+99%\",\"data\":[861,1002,3195,1715,3666,2415,3645]}," +
                "{\"icon\":\"Smile\",\"bgColor\":\"#f6f4fe\",\"color\":\"#7846e5\",\"duration\":100,\"name\":\"销量\",\"TheValue\": " + orderNum + ",\"percent\":\"+100%\",\"data\":[100]}]";
        return Result.succ(chartData);
    }
}
