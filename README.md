简体中文 | [English](README_en.md)

<p align="center">
  <a href="https://www.icecmspro.com" target="_blank">
    <img alt="logo" style="height: 120px" src="https://res.cloudinary.com/dxl1idlr5/image/upload/v1700470902/logo_s4maqv.svg"/>
  </a>
</p>  

 <p align="center">
	<img style="padding: 4px;" alt="Label" src="https://img.shields.io/badge/JDK-1.8+-orange">
	<img style="padding: 4px;" alt="Label" src="https://img.shields.io/badge/SpringBoot-2.2.7.RELEASE-brightgreen">
	<img style="padding: 4px;" alt="Label" src="https://img.shields.io/badge/MyBatis-3.5.5-red">
	<img style="padding: 4px;" alt="Label" src="https://img.shields.io/badge/Vue-2.6.11-brightgreen">
	<img style="padding: 4px;" alt="Label" src="https://img.shields.io/badge/license-MIT-blue">
</p>


## 简介

基于 Spring Boot + Vue 前后端分离的内容管理系统

演示: （[www.icecmspro.com](https://www.icecmspro.com/)）
后台:（[admin.icecmspro.com](https://admin.icecmspro.com/)）

官网: （[www.icecms.cn](https://doc.icecms.cn)）

IceCMS 文档： （[https://www.icecms.cn/docs/](https://www.icecms.cn/docs/)）

内容管理：文章、图片、资源等多种类型的内容管理；

栏目管理：自定义栏目，对栏目进行增删改查等操作；

用户管理：管理后台用户，包括添加、删除、修改、权限分配等功能；

数据统计：对网站访问量、用户行为等进行统计分析；

模板管理：自定义网站模板，方便快速搭建网站；

SEO优化：网站标题、关键词、描述等SEO优化功能。

## 预览地址：

前台：[www.icecmspro.com](https://www.icecmspro.com)

uniapp移动端：[uni.icecmspro.com](https://m.www.icecmspro.com)

后台：[admin.icecmspro.com](https://admin.icecmspro.com) 账号`admin`密码`admin123`

API文档：[api.icecmspro.com/doc.html](https://api.icecmspro.com/doc.html)

## PC端
<div class = "half">
  <img alt="describe" src = "https://res.cloudinary.com/dxl1idlr5/image/upload/v1689828922/63d19ee5a6c55_xu7ex3.png"  width = "50%">
    <img alt="describe" src = "https://res.cloudinary.com/dxl1idlr5/image/upload/v1689829049/63d19ee456c4b_fhibyf.png"  width = "50%">
</div>
<div class = "half">
  <img alt="describe" src = "https://res.cloudinary.com/dxl1idlr5/image/upload/v1689829099/63d19ee6e070e_meudqj.png"  width = "50%">
    <img alt="describe" src = "https://res.cloudinary.com/dxl1idlr5/image/upload/v1689829121/63d19ee4b609d_pt54fj.png"  width = "50%">
</div>


## 后台
<div class = "half">
  <img alt="describe" src = "https://res.cloudinary.com/dxl1idlr5/image/upload/v1710237058/Screenshot_2024-03-12_at_17.48.51_el9tcs.png"  width = "50%">
    <img alt="describe" src = "https://res.cloudinary.com/dxl1idlr5/image/upload/v1710237057/Screenshot_2024-03-12_at_17.49.02_eioj84.png"  width = "50%">

</div>
<div class = "half">
  <img alt="describe" src = "https://res.cloudinary.com/dxl1idlr5/image/upload/v1710237060/Screenshot_2024-03-12_at_17.49.12_x7aotb.png"  width = "50%">
</div>


## UniApp H5、小程序移动端
<img alt="describe" src="https://i0.hdslb.com/bfs/album/354a1caa29bfd8bc9571be67b18db13227bea80f.png" width="280" height="405">


## 后端

1. 核心框架：[Spring Boot](https://github.com/spring-projects/spring-boot)
2. 安全框架：[Spring Security](https://github.com/spring-projects/spring-security)
3. Token 认证：[jjwt](https://github.com/jwtk/jjwt)
4. 持久层框架：[MyBatis](https://github.com/mybatis/spring-boot-starter)
5. 分页插件：[PageHelper](https://github.com/pagehelper/Mybatis-PageHelper)
6. NoSQL缓存：[Redis](https://github.com/redis/redis)
7. Markdown 转 HTML：[commonmark-java](https://github.com/commonmark/commonmark-java)


基于 JDK8 开发，8以上要添加依赖：

  ```xml
  <dependency>
  <groupId>javax.xml.bind</groupId>
  <artifactId>jaxb-api</artifactId>
  <version>2.3.0</version>
</dependency>
```

## 前端

核心框架：Vue2.x、Vue Router、Vuex

Vue 项目基于 @vue/cli4.x 构建

JS 依赖及参考的 css：[axios](https://github.com/axios/axios)、[moment](https://github.com/moment/moment)、[nprogress](https://github.com/rstacruz/nprogress)、[v-viewer](https://github.com/fengyuanchen/viewerjs)、[prismjs](https://github.com/PrismJS/prism)、[APlayer](https://github.com/DIYgod/APlayer)、[MetingJS](https://github.com/metowolf/MetingJS)、[lodash](https://github.com/lodash/lodash)、[mavonEditor](https://github.com/hinesboy/mavonEditor)、[echarts](https://github.com/apache/echarts)、[tocbot](https://github.com/tscanlin/tocbot)、[iCSS](https://github.com/chokcoco/iCSS)

### 后台 UI

后台 CMS 部分基于 [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)

UI 框架为 [Element UI](https://github.com/ElemeFE/element)


### 前台 UI

[Element UI](https://github.com/ElemeFE/element)：部分使用，一些小组件，更改了ui样式，便于快速实现效果


## 最近更新

增加标签功能

完善部分ui

docker 前端部署方式

docker compose 一键部署


# 目录结构
```bash
IceCMS-Pro/
├── LICENSE.md
├── README.md
├── README_en.md
├── pom.xml                     --主项目Maven配置文件
├── mvnw
├── mvnw.cmd
├── bin/                        --项目脚本文件
├── sql/                        --项目SQL文件
│   ├── icecms5.7.sql
│   ├── icecms8.0.sql
│   ├── notification_table.sql
│   ├── qiniu_cos_update.sql
│   └── tag_update.sql
├── IceCMS-main/               --Java主程序启动入口
│   ├── pom.xml
│   └── src/
├── IceCMS-ment/               --Java后端API模块
│   ├── pom.xml
│   └── src/
├── IcePay-ment/               --Java支付模块
│   └── pom.xml
├── IceCMS-front-admin/        --管理后台前端(Vue3)
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
├── IceCMS-front-nuxt/         --前端用户界面(Nuxt4)
│   ├── package.json
│   ├── nuxt.config.ts
│   └── src/
├── IceCMS-uniApp/             --移动端H5/小程序(UniApp)
│   ├── package.json
│   ├── manifest.json
│   └── pages.json
└── IceCMS-Docker/             --Docker容器化部署
    ├── docker-compose.yml
    ├── icecms-fullstack/
    └── icecms-sql/
```

# 快速开始
Docker部署方式(推荐,可用于快速上线或测试)

    # 未安装docker的请先安装docker，已经安装的跳过此步
    yum install docker-ce -y
    #启动docker
    systemctl start docker
    # 配置国内源
    # 创建docker目录
    sudo mkdir -p /etc/docker
    # 创建配置文件
    sudo tee /etc/docker/daemon.json <<-'EOF'
    {
    "registry-mirrors": ["https://mirror.ccs.tencentyun.com"]
    }
    EOF
    # 加载新的配置文件
    sudo systemctl daemon-reload
    # 重启docker服务
    sudo systemctl restart docker
    
  ### Docker 一键启动命令

  以下命令用于一次性创建 Docker 网络，并依次启动 `icecms-sql` 和 `icecms-fullstack` 两个容器。

  ```bash
  docker run -d \
  --name icecms-sql \
  -p 3306:3306 \
  --restart always \
  ttice/icecms-sql:latest && \
  docker run -d \
    --name icecms-fullstack \
    --restart always \
    -p 3001:3000 \
    -p 2580:2580 \
    -p 8181:8181 \
    --link icecms-sql:db \
    ttice/icecms-fullstack:latest
  ```


## QQ交流群

QQ交流群：（[951286996](https://qm.qq.com/cgi-bin/qm/qr?k=XLX0hSw6GGuOgNbC53r-Pc7Lrubwcm4q&authKey=AaNuGPfAWTSyaN6MR5yGYFQ0+4AKsZQq7kI0uRASo+v5ttyrc6xvh7gfNEMQ7UDR&noverify=0)）

Tg群组：[https://t.me/+1rau4SBwFyE1OTA1](https://t.me/+1rau4SBwFyE1OTA1）

该群是一个学习交流群，如果是程序相关问题，请直接提交issues

## 软著

<div class = "half">
  <img alt="describe" style="width:420px" src = "https://res.cloudinary.com/dxl1idlr5/image/upload/v1689829207/%E7%99%BB%E8%AE%B0%E8%AF%81%E4%B9%A6_2023R11L0135975__mosaic_wgmw6p.jpg"  width = "50%">
</div>

## 开源协议
GPL-3.0 license © pipipi-pikachu

## 商业用途
* 如果你希望将本项目商用盈利，我希望你能严格遵循 GPL-3.0 协议；
* 如果你真的需要闭源商用，无法执行 GPL-3.0 协议，可以选择：
* 成为项目的贡献者，大致包括：
* 你的代码被本项目作为依赖引用；
* 你提交的 PR 被本项目合并（仅限有价值的，不包括简单的错别字或拼写错误修改等）；
* 你参与过本项目的设计、实现（也包括对各种功能/模块的实现或Bug的修复提供了有价值的思路）；
* 联系作者付费商用



## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Thecosy/IceCMS&type=Date)](https://star-history.com/#Thecosy/IceCMS&Date)
