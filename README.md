<p style="display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;">
	<a href="https://www.macwk.cc" target="_blank">
		<img alt="logo" style="height: 120px" src="https://img.getdev.cn/i/2023/01/26/63d19e520d818.png"/>
	</a>
</p>
<p style="display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;">
	<img style="padding: 4px;" alt="Label" src="https://img.shields.io/badge/JDK-1.8+-orange">
	<img style="padding: 4px;" alt="Label" src="https://img.shields.io/badge/SpringBoot-2.2.7.RELEASE-brightgreen">
	<img style="padding: 4px;" alt="Label" src="https://img.shields.io/badge/MyBatis-3.5.5-red">
	<img style="padding: 4px;" alt="Label" src="https://img.shields.io/badge/Vue-2.6.11-brightgreen">
	<img style="padding: 4px;" alt="Label" src="https://img.shields.io/badge/license-MIT-blue">
	<img style="padding: 4px;" alt="Label" src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FNaccl%2FNBlog&count_bg=%2344CC11&title_bg=%23555555&icon=notist.svg&icon_color=%231296DB&title=hits&edge_flat=false">
</p>




## 简介

基于 Spring Boot + Vue 前后端分离的内容管理系统

演示: （[www.macwk.cc](https://www.macwk.cc/)）

官网: （[doc.macwk.cc](https://doc.macwk.cc)）

IceCMS 文档： （[http://doc.macwk.cc/docs/intro](https://doc.macwk.cc/docs/intro)）


## 预览地址：

前台：[www.macwk.cc](https://www.macwk.cc)

uniapp移动端：[m.www.macwk.cc](https://m.www.macwk.cc)

后台：[www.macwk.cc/admin](https://www.macwk.cc/admin) 账号`admin`密码`123123`



## PC端
<div class = "half">
<img alt="describe" src = "https://img.getdev.cn/i/2023/01/26/63d19ee5a6c55.png"  width = “50%”><img alt="describe" src = "https://img.getdev.cn/i/2023/01/26/63d19ee456c4b.png"  width = “50%”>
</div>
<div class = "half">
<img alt="describe" src = "https://img.getdev.cn/i/2023/01/26/63d19ee6e070e.png"  width = “50%”><img alt="describe" src = "https://img.getdev.cn/i/2023/01/26/63d19ee4b609d.png"  width = “50%”>
</div>



## 后台
<div class = "half">
<img alt="describe" src = "https://picture-1305088812.cos.ap-nanjing.myqcloud.com/uploads/2022/08/1661934180-截屏2022-08-30-18.49.21.png"  width = “50%”><img alt="describe" src = "https://picture-1305088812.cos.ap-nanjing.myqcloud.com/uploads/2022/08/1661934191-截屏2022-08-30-18.54.51.png"  width = “50%”>
</div>


## UniApp H5、小程序移动端
<img alt="describe" src="https://i0.hdslb.com/bfs/album/354a1caa29bfd8bc9571be67b18db13227bea80f.png" width="280" height="405"><img alt="describe" src="https://picture-1305088812.cos.ap-nanjing.myqcloud.com/uploads/2022/08/1661934220-截屏2022-08-30-17.05.29.png" width="280" height="405">

<img alt="describe" src="https://picture-1305088812.cos.ap-nanjing.myqcloud.com/uploads/2022/08/1661934226-截屏2022-08-30-17.05.45.png" width="280" height="405"><img alt="describe" src="https://picture-1305088812.cos.ap-nanjing.myqcloud.com/uploads/2022/08/1661934233-截屏2022-08-30-17.06.42.png" width="280" height="405">


## 

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

    
## 快速开始
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
    "registry-mirrors": ["https://registry.docker-cn.com"]
    }
    EOF
    # 加载新的配置文件
    sudo systemctl daemon-reload
    # 重启docker服务
    sudo systemctl restart docker
    
    main-命令执行
    Ps:按顺序执行

    1.运行Mysql容器
    docker run -d -p 0:3389 \
    --name ice-sql \
    --restart always \
    thecosy/icemysql:v2.2.0
    
    2.运行Spring容器
    docker run -d -p 8181:8181 \
    --name ice-api \
    --restart always \
    --link ice-sql:db \
    thecosy/icecms:v2.2.0
    
    3.运行Vue容器
    docker run -d -p 3000:80 \
    --name ice-vue \
    --restart always \
    --link  ice-api:iceApi \
    thecosy/icevue:v2.2.0
    
    #访问前端地址http://ip:3000

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


## Thanks

感谢 [JetBrains](https://www.jetbrains.com/) 提供的非商业开源软件 License



## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Thecosy/IceCMS&type=Date)](https://star-history.com/#Thecosy/IceCMS&Date)
