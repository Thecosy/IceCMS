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

    private Integer id;

    private String cosIntage;

    private String cosBucketName;

    private String cosSecretId;

    private String cosSecretKey;

    private String cosClientConfig;

    private Boolean isCos;
}
