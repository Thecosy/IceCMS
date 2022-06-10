package com.ttice.icepayment.controller;


import com.ttice.icepayment.entity.Product;
import com.ttice.icepayment.service.ProductService;
import com.ttice.icepayment.vo.R;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@CrossOrigin //开放前端的跨域访问
@io.swagger.annotations.Api(tags = "测试商品管理")
@RestController
@RequestMapping("/api/product")
public class ProductController {

     @Resource
     private ProductService productService;

     @ApiOperation("测试接口")
     @GetMapping("/test")
     public R test(){

         return R.ok().data("message", "hello").data("now", new Date());
     }
     @ApiOperation("商品列表")
     @GetMapping("/list")
     public R list(){

         List<Product> list = productService.list();
         return R.ok().data("productList", list);
     }
}

