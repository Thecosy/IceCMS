package com.ttice.icewkment.controller.backend;

import com.alibaba.fastjson.JSONObject;
import com.ttice.icewkment.Util.FileUtils;
import com.ttice.icewkment.Util.ImgGenerateUtils;
import com.ttice.icewkment.Util.QiniuCOS;
import com.ttice.icewkment.Util.TencentCOS;
import com.ttice.icewkment.entity.CosInfo;
import com.ttice.icewkment.mapper.CosInfoMapper;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.http.entity.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@io.swagger.annotations.Api(tags = "图片工具类Api")
@RestController
@RequestMapping("/FileApi")
public class FileController {

  @Autowired private CosInfoMapper cosInfoMapper;

  @ApiOperation(value = "上传图片(添加文字水印)")
  @ApiImplicitParams({
    @ApiImplicitParam(name = "editormd-image-file", value = "图片Formate", required = true),
    @ApiImplicitParam(name = "title", value = "标题", required = true),
    @ApiImplicitParam(name = "content", value = "内容", required = true)
  })
  @PostMapping("/addwatermarkimageUpload/{title}/{content}")
  public JSONObject addwatermarkimageUpload(
      @RequestParam("editormd-image-file") MultipartFile image,
      @PathVariable("title") String title,
      @PathVariable("content") String content)
      throws IOException {
    JSONObject jsonObject = new JSONObject();

    // 查询图片上传方式
    CosInfo cosInfo = cosInfoMapper.selectOne(null);
    Integer storageType = cosInfo.getStorageType() != null ? cosInfo.getStorageType() : 1;
    Boolean isCos = cosInfo.getIsCos();
    String fileNames = "";
    
    // 获取文件名
    String fileName = image.getOriginalFilename();
    // 获取文件后缀
    String prefix = fileName.substring(fileName.lastIndexOf("."));
    // 用uuid做为文件名，防止生成的临时文件重复
    final File excelFile = File.createTempFile("imagesFile-" + System.currentTimeMillis(), prefix);
    // 将MultipartFile转为File
    image.transferTo(excelFile);
    // 图片处理
    File bufferedImage = ImgGenerateUtils.ImgGenerate(excelFile, title, content);
    
    if (storageType == 3) {
      // 七牛云上传
      fileNames = QiniuCOS.uploadfile(bufferedImage);
    } else if (storageType == 2 || (isCos != null && isCos)) {
      // 腾讯云上传
      fileNames = TencentCOS.uploadfile(bufferedImage);
    } else {
      // 本地上传
      MultipartFile multipartFile = getMultipartFile(bufferedImage);
      fileNames = localUpImg(multipartFile);
    }
    
    // 存入图片jsonObject
    jsonObject.put("url", fileNames);
    // 返回图片名称
    return jsonObject;
  }

  @ApiOperation(value = "上传图片")
  @ApiImplicitParam(name = "editormd-image-file", value = "图片Formate", required = true)
  @PostMapping("/updateimage")
  public JSONObject imageUpload(@RequestParam("editormd-image-file") MultipartFile image)
      throws IOException {
    JSONObject jsonObject = new JSONObject();
    // 查询图片上传方式
    CosInfo cosInfo = cosInfoMapper.selectOne(null);
    Integer storageType = cosInfo.getStorageType() != null ? cosInfo.getStorageType() : 1;
    Boolean isCos = cosInfo.getIsCos();
    String fileNames = "";
    
    if (storageType == 3) {
      // 七牛云上传
      // 获取文件名
      String fileName = image.getOriginalFilename();
      // 获取文件后缀
      String prefix = fileName.substring(fileName.lastIndexOf("."));
      // 用uuid做为文件名，防止生成的临时文件重复
      final File excelFile = File.createTempFile("imagesFile-" + System.currentTimeMillis(), prefix);
      // 将MultipartFile转为File
      image.transferTo(excelFile);
      // 调用七牛云工具上传文件
      fileNames = QiniuCOS.uploadfile(excelFile);
    } else if (storageType == 2 || (isCos != null && isCos)) {
      // 腾讯云上传
      // 获取文件名
      String fileName = image.getOriginalFilename();
      // 获取文件后缀
      String prefix = fileName.substring(fileName.lastIndexOf("."));
      // 用uuid做为文件名，防止生成的临时文件重复
      final File excelFile = File.createTempFile("imagesFile-" + System.currentTimeMillis(), prefix);
      // 将MultipartFile转为File
      image.transferTo(excelFile);
      // 调用腾讯云工具上传文件
      fileNames = TencentCOS.uploadfile(excelFile);
    } else {
      // 调用本地上传文件
      fileNames = localUpImg(image);
    }
    
    // 存入图片jsonObject
    jsonObject.put("url", fileNames);
    // 返回图片名称
    return jsonObject;
  }

  public static String localUpImg(MultipartFile localFile) {
    // 本地存储图片，需要配置资源映射为虚拟路径
    if (localFile != null) {
      FileUtils fileUtils = new FileUtils();
      String path = fileUtils.uploadFile(localFile);
      return path;
    }
    return null;
  }

  @ApiOperation(value = "上传视频")
  @ApiImplicitParam(name = "file", value = "视频Formate", required = true)
  @PostMapping("/updatevideo")
  public JSONObject videoUpload(@RequestParam("editormd-video-file") MultipartFile video) throws IOException {
      JSONObject jsonObject = new JSONObject();
      // 查询图片上传方式
      CosInfo cosInfo = cosInfoMapper.selectOne(null);
      Integer storageType = cosInfo.getStorageType() != null ? cosInfo.getStorageType() : 1;
      Boolean isCos = cosInfo.getIsCos();
      String fileNames = "";
      
      if (storageType == 3) {
          // 七牛云上传
          // 获取文件名
          String fileName = video.getOriginalFilename();
          // 获取文件后缀
          String prefix = fileName.substring(fileName.lastIndexOf("."));
          // 用uuid做为文件名，防止生成的临时文件重复
          final File excelFile = File.createTempFile("videoFile-" + System.currentTimeMillis(), prefix);
          // 将MultipartFile转为File
          video.transferTo(excelFile);
          // 调用七牛云工具上传文件
          fileNames = QiniuCOS.uploadfile(excelFile);
      } else if (storageType == 2 || (isCos != null && isCos)) {
          // 腾讯云上传
          // 获取文件名
          String fileName = video.getOriginalFilename();
          // 获取文件后缀
          String prefix = fileName.substring(fileName.lastIndexOf("."));
          // 用uuid做为文件名，防止生成的临时文件重复
          final File excelFile = File.createTempFile("videoFile-" + System.currentTimeMillis(), prefix);
          // 将MultipartFile转为File
          video.transferTo(excelFile);
          // 调用腾讯云工具上传文件
          fileNames = TencentCOS.uploadfile(excelFile);
      } else {
          // 调用本地上传文件
          fileNames = localUpImg(video);
      }
      
      // 存入图片jsonObject
      jsonObject.put("url", fileNames);
      // 返回图片名称
      return jsonObject;
  }

  /**
   * @Description: file 转 MultipartFile
   *
   * @param file
   * @return: MultipartFile
   */
  private MultipartFile getMultipartFile(File file) {
    FileInputStream fileInputStream = null;
    MultipartFile multipartFile = null;
    try {
      fileInputStream = new FileInputStream(file);
      multipartFile =
          new MockMultipartFile(
              file.getName(),
              file.getName(),
              ContentType.APPLICATION_OCTET_STREAM.toString(),
              fileInputStream);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return multipartFile;
  }
}
