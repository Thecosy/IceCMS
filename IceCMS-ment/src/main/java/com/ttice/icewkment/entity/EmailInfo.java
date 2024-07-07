package com.ttice.icewkment.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@TableName("s_mail_info")
public class EmailInfo {

    @TableId(type = IdType.AUTO)
    private Integer id;

    private String username;

    private String password;

    private String host;

    private String protocol;
}
