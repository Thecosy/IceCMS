package com.ttice.icewkment.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
@TableName("s_wx_login")
public class WxLogin {

    @TableId(type = IdType.AUTO)
    private Integer id;

    private String scene;

    private Integer userId;

    private String status;

    private Date creatTime;
}
