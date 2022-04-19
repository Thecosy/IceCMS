package com.ttice.icewkment.shiro;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serializable;

@Data
public class AccountProfile implements Serializable {

    private String userId;

    private Integer userAge;

    @TableField("USERNAME")
    private String username;
}
