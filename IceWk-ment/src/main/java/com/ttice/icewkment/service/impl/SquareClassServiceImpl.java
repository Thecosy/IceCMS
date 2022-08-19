package com.ttice.icewkment.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ttice.icewkment.commin.vo.ArticleClassPageVO;
import com.ttice.icewkment.entity.ArticleClass;
import com.ttice.icewkment.entity.SquareClass;
import com.ttice.icewkment.mapper.ArticleClassMapper;
import com.ttice.icewkment.mapper.SquareClassMapper;
import com.ttice.icewkment.service.ArticleClassService;
import com.ttice.icewkment.service.SquareClassService;
import org.springframework.stereotype.Service;

@Service
public class SquareClassServiceImpl extends ServiceImpl<SquareClassMapper, SquareClass> implements SquareClassService {
    @Override
    public ArticleClassPageVO GetList(Integer page, Integer limit) {
        return null;
    }
}
