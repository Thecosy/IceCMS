package com.ttice.icewkment.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = false)
@TableName("s_message_info")
public class MessageInfo  implements Serializable {

    /** id */
    private Integer id;

    /** 七牛AccessKey */
    private String qiniuAccessKey;

    /** 七牛qiniuSecretKey */
    private String qiniuSecretKey;

    /** 七牛qiniuTemplateId */
    private String qiniuTemplateId;

}
