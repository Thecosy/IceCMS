package com.ttice.icewkment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ttice.icewkment.commin.vo.ArticlePageVO;
import com.ttice.icewkment.commin.vo.ArticleVO;
import com.ttice.icewkment.commin.vo.SquarePageVO;
import com.ttice.icewkment.commin.vo.SquareVO;
import com.ttice.icewkment.entity.Article;
import com.ttice.icewkment.entity.Square;
import com.ttice.icewkment.entity.SquareClass;
import com.ttice.icewkment.entity.User;
import com.ttice.icewkment.mapper.ArticleMapper;
import com.ttice.icewkment.mapper.SquareMapper;
import com.ttice.icewkment.mapper.UserMapper;
import com.ttice.icewkment.service.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author admin
 * @since 2022-02-19
 */
@Service
public class SquareServiceImpl extends ServiceImpl<SquareMapper, Square> implements SquareService {


    @Autowired
    private UserMapper userMapper;

    @Autowired
    private SquareCommentService squareCommentService;

    @Autowired
    private SquareMapper squareMapper;

    @Autowired
    private SquareClassService squareClassService;

    @Override
    public SquarePageVO VoList(String otherName, Integer page, Integer limit) {

        Page<Square> squarePage = new Page<>(page,limit);

        //查询分类名称对应的id值
        QueryWrapper<SquareClass> queryWrapperSquareClass = new QueryWrapper<SquareClass>();
        queryWrapperSquareClass.eq("other_name", otherName);
        SquareClass SquareClass = squareClassService.getOne(queryWrapperSquareClass);
        Integer SquareClassId = SquareClass.getId();

        List<SquareVO> result = new ArrayList<>();
        QueryWrapper<Square> queryWrapper = new QueryWrapper<Square>();
        queryWrapper.select().orderByDesc("add_time");
        queryWrapper.eq("sort_class", SquareClassId);
        Page<Square> resultPage = squareMapper.selectPage(squarePage,queryWrapper);

        List<Square> squares = resultPage.getRecords();
        for (Square square : squares) {

            //根据用户id获取名称信息
            //id是内容发布者id
            Integer authors = square.getAuthor();
            User users = userMapper.searchId(authors);
            String username = users.getName();
            String authorImg = users.getProfile();
            SquareVO squareVO = new SquareVO();
            squareVO.setAuthor(username);
            squareVO.setUserid(authors);
            squareVO.setAuthorImg(authorImg);
            //查询分类名称对应的id值
            SquareClass SquareClassIs = squareClassService.getById(square.getSortClass());
            squareVO.setSortName(SquareClassIs.getName());

            Integer planetCommentNum = squareCommentService.GetCommentNum(square.getId());
            squareVO.setCommentNum(planetCommentNum);

            BeanUtils.copyProperties(square,squareVO);
            result.add(squareVO);
        }
        SquarePageVO squarePageVO = new SquarePageVO();
        squarePageVO.setData(result);
        squarePageVO.setTotal(resultPage.getTotal());
        squarePageVO.setPages(resultPage.getPages());
        return squarePageVO;
    }
}
