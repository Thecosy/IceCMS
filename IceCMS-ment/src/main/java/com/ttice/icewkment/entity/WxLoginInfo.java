package com.ttice.icewkment.entity;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@TableName("s_mini_info")
public class WxLoginInfo {
    private Integer id;
    private String appid;
    private String secret;
    private String envVersion;
}
