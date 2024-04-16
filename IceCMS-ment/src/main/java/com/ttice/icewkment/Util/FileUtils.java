package com.ttice.icewkment.Util;

import com.ttice.icewkment.configuration.ApplicationConfig;
import com.ttice.icewkment.configuration.ServerConfig;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

/** 文件上传工具类 */
public class FileUtils {

  /**
   * 上传文件
   *
   * @param file
   * @return 返回文件路径（以相对路径放回）
   */
  public String uploadFile(MultipartFile file) {
    if (file.isEmpty()) {
      return "";
    }
    // applicationConfig根据这个来获取映射为当前的路径
    ApplicationConfig applicationConfig = new ApplicationConfig();
    String webPath = applicationConfig.getResPhysicalPath();

    String fileName = file.getOriginalFilename();
    String originalFilename = UUID.randomUUID() + fileName.substring(fileName.indexOf("."));
    String localPath = webPath + "/logistics/" + originalFilename;
    File newFile = new File(localPath);
    // 通过CommonsMultipartFile的方法直接写文件(注意这个时候）
    try {
      // 开始上传文件
      file.transferTo(newFile);
    } catch (IOException e) {
      e.printStackTrace();
      return "";
    }
    // 组装为实际地址，非本地地址
    ServerConfig serverConfig = new ServerConfig();
    String url = serverConfig.getUrl();
    return url + "/logistics/" + originalFilename;
  }
}
