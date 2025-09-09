<!--
 * @Date: 2023-11-24 22:59:48
 * @LastEditTime: 2023-11-26 22:40:31
-->

# 一个全套公司企业官网 前端项目 （springboot +vue ）

[后端项目传送门](https://github.com/liyinchigithub/company_official_website_server)

[demo体验](http://81.71.17.188:9000/#/home)

管理员账号：admin 密码：123456

## 技术栈

- nodejs v14.21.3、v12.22.12
- vue 2.6 
- elementUI 2.15

![image](https://github.com/user-attachments/assets/ef4b9bbc-5e31-4a48-98c5-56719fd82351)

![image](https://github.com/user-attachments/assets/3be3c420-a659-40cb-b915-eceb23c90b15)

![image](https://github.com/user-attachments/assets/b09f58e7-e8bc-4a6e-8351-0f308ed3082b)

![image](https://github.com/user-attachments/assets/cc182ef3-a4a6-451d-afe0-2fa711d81e46)


# 安装

## npm
```
npm run dev
```

```
npm run build
```

编译后项目文件
dist

## yarn
```
yarn
```

### 启动
```
yarn dev
```

### 打包
```
yarn build
```

# 页面

## 官网页面

>src/views/front

## 后台管理页面

>src/views/admin


# 配置修改

## **域名**修改

>src/config/index.js

## **请求头**修改

>src/utils/request.js

## **路由**修改

>src/router/index.js

每新增一个页面，需要在路由中配置该页面的跳转路由

```
    // 商品详情
 {
        path: '/product/:id',
        name: 'ProductDetail',
        component: () => import('@/views/front/components/ProductDetail.vue'),
        props: true
    }
```

### 路由视图

>src/views/admin/Index.vue

切换菜单，自动加载对应的视图

#### 菜单配置

>src/views/admin/Index.vue

# 部署发布

## 修改**请求后端地址**

>src/config/index.js

## 修改**允许跨域**

### 前端跨域

>vue.config.js

修改前端跨域请求后端的域名地址

```js
module.exports = {
  publicPath: './',
  devServer: {
    disableHostCheck: true,
    port: 9000,
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:8088',   // 测试环境
        changeOrigin: true,  // 是否跨域
        pathRewrite: {
          '^/api/': ''
        }
      },
    },
  },
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = '智慧其心';
        return args;
      })
  }
}
```
每个请求路径，会自动带上/api/

http://localhost:9000/api/v1/carousels/getAllCarousels

>src/api/index.js


* 常见问题：文件上传请求地址是在indo.vue代码中，而不是引用index.js里面定义的，所以导致跨域问题

* 解决办法：
为了确保文件上传请求也通过代理进行，你可以将文件上传的 URL 修改为相对路径，并确保它符合代理配置


```JavaScript
```


### 后端配置跨域

>com/cows/config/WebConfig.java

```java
package com.cows.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 *
 * @Description: 启用跨域资源共享
 *
 * */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://127.0.0.1:9000") // 前端项目的地址
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
```

# 前端token存储

>src/store/modules/user.js


# 新增页面

1. 配置新增页面到路由中

>src/router/index.js

2.


### 注意版本

node版本 16  18 可能会有问题

npm 版本
6.14.18



# 部署发布


## 修改请求后端地址


>src/config/index.js

```
// const baseUrl = 'http://127.0.0.1:8088'   // 测试环境地址
const baseUrl = 'http://81.71.17.188:8088' // 产线地址

export {
    baseUrl
}


```

## 修改跨域配置
>vue.config.js

```
module.exports = {
  publicPath: './',
  devServer: {
    disableHostCheck: true,
    port: 9000,
    proxy: {
      '/api/': {
        // target: 'http://127.0.0.1:8088',   // 测试环境
        target: 'http://81.71.17.188:8088', // 产线地址
        changeOrigin: true,  // 是否跨域
        pathRewrite: {
          '^/api/': ''
        }
      },
    },
  },
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = '智慧其心';
        return args;
      })
  }
}
```


## 打包

```
npm run build
```

## 部署

将dist文件夹下的文件，放到服务器上

## 启动

```
npm install
```

```
npm run serve
```
