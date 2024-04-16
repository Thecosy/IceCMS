package com.ttice.icewkment.Util;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;
import java.util.Date;

/**
 * @program: our-task
 * @description: 对数据库每条记录的创建时间和更新时间自动进行填充
 * @author: water76016
 * @create: 2020-11-24 10:53
 */
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {
  /**
   * 插入时的填充策略
   *
   * @param metaObject
   */
  @Override
  public void insertFill(MetaObject metaObject) {
    //        String formate = MathUtils.makeUpNewData(Thread.currentThread().hashCode()+"", 3)+
    // MathUtils.randomDigitNumber(7);
    //        int i = Integer.parseInt( formate );
    //        this.setFieldValByName("articleStatus",i,metaObject);
    this.setFieldValByName("addTime", new Date(), metaObject);
    this.setFieldValByName("updateTime", new Date(), metaObject);
  }

  /**
   * 更新时的填充策略
   *
   * @param metaObject
   */
  @Override
  public void updateFill(MetaObject metaObject) {
    this.setFieldValByName("updateTime", new Date(), metaObject);
  }
}
