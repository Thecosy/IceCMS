package com.ttice.icewkment.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ttice.icewkment.commin.vo.SquareClassPageVO;
import com.ttice.icewkment.entity.SquareClass;
import org.springframework.stereotype.Repository;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author admin
 * @since 2022-02-19
 */
@Repository
public interface SquareClassService extends IService<SquareClass> {

    SquareClassPageVO GetList(Integer page, Integer limit);

}
