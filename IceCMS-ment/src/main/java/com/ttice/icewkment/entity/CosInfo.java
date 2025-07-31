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
    
    /** 存储类型：1-本地，2-腾讯云，3-七牛云 */
    private Integer storageType;
    
    /** 七牛云accessKey */
    private String qiniuAccessKey;
    
    /** 七牛云secretKey */
    private String qiniuSecretKey;
    
    /** 七牛云存储空间名称 */
    private String qiniuBucketName;
    
    /** 七牛云域名 */
    private String qiniuDomain;
}
