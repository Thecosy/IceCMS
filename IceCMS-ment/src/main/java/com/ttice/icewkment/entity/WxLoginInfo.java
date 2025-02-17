package com.ttice.icewkment.entity;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@TableName("s_mini_info")
public class WxLoginInfo {

    /** id */
    private Integer id;

    /** 小程序appid */
    private String appid;

    /** 小程序secret */
    private String secret;

    /** 小程序开发环境 */
    private String envVersion;

}
