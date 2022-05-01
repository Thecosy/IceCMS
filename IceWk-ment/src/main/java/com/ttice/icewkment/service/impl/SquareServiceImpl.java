package com.ttice.icewkment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ttice.icewkment.commin.vo.ArticlePageVO;
import com.ttice.icewkment.commin.vo.ArticleVO;
import com.ttice.icewkment.entity.Article;
import com.ttice.icewkment.entity.Square;
import com.ttice.icewkment.entity.User;
import com.ttice.icewkment.mapper.ArticleMapper;
import com.ttice.icewkment.mapper.SquareMapper;
import com.ttice.icewkment.mapper.UserMapper;
import com.ttice.icewkment.service.ArticleCommentService;
import com.ttice.icewkment.service.ArticleService;
import com.ttice.icewkment.service.SquareService;
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

}
