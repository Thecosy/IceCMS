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

    /** id */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /** 微信登录生成码 */
    private String scene;

    /** 用户id */
    private Integer userId;

    /** 状态 */
    private String status;

    /** 创建时间 */
    private Date creatTime;

}
