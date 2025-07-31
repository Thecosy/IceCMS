package com.ttice.icewkment.Util;

import com.google.gson.Gson;
import com.qiniu.common.QiniuException;
import com.qiniu.http.Response;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.Region;
import com.qiniu.storage.UploadManager;
import com.qiniu.storage.model.DefaultPutRet;
import com.qiniu.util.Auth;
import com.ttice.icewkment.entity.CosInfo;
import com.ttice.icewkment.mapper.CosInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.File;
import java.util.Random;
import java.util.UUID;

/**
 * 七牛云对象存储
 */
@Component
public class QiniuCOS {

    @Autowired
    private CosInfoMapper cosInfoMapper;

    public static QiniuCOS qiniuCOS;

    @PostConstruct
    public void init() {
        qiniuCOS = this;
    }

    /**
     * 文件上传到七牛云
     *
     * @param localFile 要上传的文件
     * @return 返回访问URL
     */
    public static String uploadfile(File localFile) {
        // 获取配置信息
        CosInfo setting = qiniuCOS.cosInfoMapper.selectOne(null);
        
        // 七牛云配置信息
        String accessKey = setting.getQiniuAccessKey();
        String secretKey = setting.getQiniuSecretKey();
        String bucket = setting.getQiniuBucketName();
        String domain = setting.getQiniuDomain();
        
        // 构造一个带指定 Region 对象的配置类
        // 根据七牛云存储区域选择合适的Region
        Configuration cfg = new Configuration(Region.region0());
        
        // 创建上传管理器
        UploadManager uploadManager = new UploadManager(cfg);
        
        String fileName = null;
        try {
            // 获取文件名和后缀
            fileName = localFile.getName();
            String suffix = fileName.substring(fileName.lastIndexOf("."));
            
            // 生成唯一文件名
            Random random = new Random();
            String key = "images/" + UUID.randomUUID().toString().replaceAll("-", "") + random.nextInt(10000) + suffix;
            
            // 创建认证对象
            Auth auth = Auth.create(accessKey, secretKey);
            // 获取上传凭证
            String upToken = auth.uploadToken(bucket);
            
            // 执行上传
            Response response = uploadManager.put(localFile, key, upToken);
            
            // 解析上传结果
            DefaultPutRet putRet = new Gson().fromJson(response.bodyString(), DefaultPutRet.class);
            
            // 返回完整的访问路径
            return domain.startsWith("http") ? domain + "/" + key : "https://" + domain + "/" + key;
        } catch (QiniuException ex) {
            // 处理异常
            Response r = ex.response;
            System.err.println(r.toString());
            try {
                System.err.println(r.bodyString());
            } catch (QiniuException ex2) {
                // 忽略
            }
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    /**
     * 删除七牛云上的文件
     *
     * @param key 文件的key
     * @return 是否删除成功
     */
    public static boolean deleteFile(String key) {
        // 获取配置信息
        CosInfo setting = qiniuCOS.cosInfoMapper.selectOne(null);
        
        // 七牛云配置信息
        String accessKey = setting.getQiniuAccessKey();
        String secretKey = setting.getQiniuSecretKey();
        String bucket = setting.getQiniuBucketName();
        
        try {
            // 创建认证对象
            Auth auth = Auth.create(accessKey, secretKey);
            
            // 构造一个带指定 Region 对象的配置类
            Configuration cfg = new Configuration(Region.region0());
            
            // 创建BucketManager
            com.qiniu.storage.BucketManager bucketManager = new com.qiniu.storage.BucketManager(auth, cfg);
            
            // 删除文件
            bucketManager.delete(bucket, key);
            return true;
        } catch (QiniuException ex) {
            // 处理异常
            System.err.println(ex.code());
            System.err.println(ex.response.toString());
            return false;
        }
    }
} 