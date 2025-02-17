package com.ttice.icewkment.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * @author admin
 * @since 2022-01-13
 */
@Data
@EqualsAndHashCode(callSuper = false)
@TableName("s_cos_info")
public class CosInfo implements Serializable {

    /** id */
    private Integer id;

    /** cosid */
    private String cosIntage;

    /** 储存桶地域 */
    private String cosBucketName;

    /** cosid */
    private String cosSecretId;

    /** coskey */
    private String cosSecretKey;

    /** cos配置 */
    private String cosClientConfig;

    /** 是否使用cos */
    private Boolean isCos;
}
