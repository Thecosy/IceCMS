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
	<img style="padding: 4px;" alt="Label" src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FNaccl%2FNBlog&count_bg=%2344CC11&title_bg=%23555555&icon=notist.svg&icon_color=%231296DB&title=hits&edge_flat=false">
</p>


## 简介

基于 Spring Boot + Vue 前后端分离的内容管理系统

演示: （[www.icecmspro.com](https://www.icecmspro.com/)）
后台:（[admin.icecmspro.com](https://admin.icecmspro.com/)）

官网: （[www.icecms.cn](https://doc.icecms.cn)）

IceCMS 文档： （[http://www.icecms.cn](https://www.icecms.cn)）

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
8. 离线 IP 地址库：[ip2region](https://github.com/lionsoul2014/ip2region)

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
  docker network create icecms-network && \
  docker run -d --name icecms-sql --network icecms-network -p 3306:3306 --restart always ttice/icecms-sql:latest && \
  docker run -d --name icecms-fullstack --network icecms-network --restart always -p 3001:3000 -p 2580:2580 -p 8181:8181 --link icecms-sql:db ttice/icecms-fullstack:latest

## 目录结构
    iceCMS/
    ├── HELP.md
    ├── IceCMS-java.iml
    ├── IceCMS-main             --java主程序启动入口
    │   ├── IceCMS-main.iml
    │   ├── main.iml
    │   ├── pom.xml
    │   ├── src
    │   └── target
    ├── IcePay-ment             --java支付模块
    │   ├── IcePay-ment.iml
    │   ├── pom.xml
    │   ├── src
    │   └── target
    ├── IceWk-ment              --java前端api模块
    │   ├── IceWk-ment.iml
    │   ├── pom.xml
    │   ├── src
    │   └── target
    ├── IceWk-uniApp            --h5Uniapp模块
    │   ├── App.vue
    │   ├── LICENSE
    │   ├── components
    │   ├── main.js
    │   ├── manifest.json
    │   ├── nPro
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── pages
    │   ├── pages.json
    │   ├── static
    │   ├── store
    │   ├── subPage
    │   ├── template.h5.html
    │   ├── theme
    │   ├── uni.scss
    │   ├── uni_modules
    │   ├── utils
    │   └── vue.config.js
    ├── IceWk-vues                --前端vue模块
    │   ├── LICENSE
    │   ├── README.md
    │   ├── babel.config.js
    │   ├── build
    │   ├── dist
    │   ├── jest.config.js
    │   ├── jsconfig.json
    │   ├── node_modules
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── postcss.config.js
    │   ├── public
    │   ├── serverless.yml
    │   ├── src
    │   ├── vue.config.js
    │   └── yarn.lock
    ├── README.md
    ├── bin
    │   ├── clean.bat
    │   ├── package.bat
    │   └── run.bat
    ├── doc
    │   └── IceCMS环境使用手册.docx
    ├── mvnw
    ├── mvnw.cmd
    ├── pom.xml
    └── sql                        --项目sql文件
    ├── icecms5.6.sql
    └── icecms8.0.sql

## <strong>配置最小开发环境</strong>

1.环境配置

MySQL
JDK1.8或以上
Maven
Nodejs
微信开发者工具

### <strong>后端部署</strong>

2.创建 MySQL 数据库`IceCMS`，并执行`/sql/IceCMS.sql`初始化表数据

3.启动iceCMS-main管理后台的后端服务

3.1.修改配置信息`IceCMS-main/src/main/resources/application.yml`配置数据库连接

3.2.安装 Redis 并启动(不用的话不影响)

3.3.打开命令行，输入以下命令

    cd iceCMS
    mvn install
    mvn clean package
    java -Dfile.encoding=UTF-8 -jar iceCMS/iceCMS-main/target/iceCMS.jar
    #在iceCMS.jar目录输入 java -jar iceCMS.jar

### <strong>前端部署</strong>

4.进入iceCMS-vues目录

打开命令行，输入以下命令

```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-admin-template.git

# 进入项目目录
cd IceWk-VUE

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --legacy-peer-deps --registry=https://registry.npm.taobao.org
# 启动服务
npm run dev
```
### 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

5.启动前端

浏览器打开，访问 [http://localhost:9528](http://localhost:9528)
, 此时进入前端页面。

启动前端后台（后台地址http://localhost:9528/admin）

6.启动uniapp移动端

下载HBuilderX

进入（[https://ext.dcloud.net.cn/plugin?id=9261](https://ext.dcloud.net.cn/plugin?id=9261)）uniapp移动端插件目录，点击导入，然后即可导入到本地。

也可在本地打开IceCMS-uniapp项目

打开`IceWK-uniApp`目录,进行编译打包

## 注意事项

一些常见问题：

- MySQL 确保数据库字符集为`utf8mb4`的情况下通常没有问题（”站点设置“及”文章详情“等许多表字段需要`utf8mb4`格式字符集来支持 emoji 表情，否则在导入 sql 文件时，即使成功导入，也会有部分字段内容不完整，导致前端页面渲染数据时报错）
- 确保 Maven 能够成功导入现版本依赖，请勿升级或降低依赖版本
- 数据库中默认用户名密码为`root`，`123123`，因为是个人项目，没打算做修改密码的页面，可在`top.naccl.util.HashUtils`下的`main`方法手动生成密码存入数据库
- 注意修改IceCMS-main目录下的`application-dev.properties`的配置信息
  - Redis 若没有密码，留空即可
  - 注意修改`token.secretKey`，否则无法保证 token 安全性

[//]: # (  - `spring.mail.host`及`spring.mail.port`的默认配置为阿里云邮箱，其它邮箱服务商参考关键字`spring mail 服务器`（邮箱配置用于接收评论提醒）)



[//]: # (## 隐藏功能)

[//]: # ()
[//]: # (- 在前台访问`/login`路径登录后，可以以博主身份（带有博主标识）回复评论，且不需要填写昵称和邮箱即可提交)

[//]: # (- 在 Markdown 中加入`<meting-js server="netease" type="song" id="歌曲id" theme="#25CCF7"></meting-js>` （注意以正文形式添加，而不是代码片段）可以在文章中添加 [APlayer]&#40;https://github.com/DIYgod/APlayer&#41; 音乐播放器，`netease`为网易云音乐，其它配置及具体用法参考 [MetingJS]&#40;https://github.com/metowolf/MetingJS&#41;)

[//]: # (- 提供了两种隐藏文字效果：在 Markdown 中使用`@@`包住文字，文字会被渲染成“黑幕”效果，鼠标悬浮在上面时才会显示；使用`%%`包住文字，文字会被“蓝色覆盖层”遮盖，只有鼠标选中状态才会反色显示。例如：`@@隐藏文字@@`，`%%隐藏文字%%`)

[//]: # (- 大部分个性化配置可以在后台“站点设置”中修改，小部分由于考虑到首屏加载速度（如首页大图）需要修改前端源码)


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


## Thanks

感谢 [JetBrains](https://www.jetbrains.com/) 提供的非商业开源软件 License


## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Thecosy/IceCMS&type=Date)](https://star-history.com/#Thecosy/IceCMS&Date)
