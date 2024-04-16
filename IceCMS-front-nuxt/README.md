### 项目介绍：

- 主要技术: nuxtjs 2.0 、element-ui 2.0

- 主要使用插件： axios、 less 、 highlight.js、 component-cache


### 选择nuxt的原因：

- nuxt开发的项目能被搜索引擎收录,能进行seo。

- 上手简单，语法跟vue基本一致，部分写法有差异，只需要将文件按目录新建好，nuxt会自动生成对应路由。

- 能正常接入统计跟广告代码


### 不足

- 由于Nuxt采用服务端渲染，所以影响页面打开速度的因素很多，包括页面内容大小，服务器性能，网络带宽等。nuxt项目可以将页面的主要内容进行服务端渲染，其他不用考虑搜索引擎的的内容可以在浏览器渲染，即在页面加载完成后再进行ajax请求，这样可以大大减少服务器压力。

- element-ui部分功能对搜索引擎及seo不够友好，部分组件需要手写或者在element-ui的基础上做修改。比如菜单部分、分页组件都需要进行修改，因为没有a链接, 而a链接对搜索引擎比较友好。本项目有重写分页组件，方便seo,当然你也可以选择其他组件库或者不用组件库。


### 提升加载性能


- 某些时候某些接口并不需要都在服务端渲染，可以在浏览器渲染。比如目前首页列表是服务端调用渲染，右侧菜单的推荐跟分类是浏览器渲染，即跟正常的ajax调用一样

- 注意浏览器调接口需要配置nginx反向代理，具体可参考：https://www.dsiab.com/post/4421

- 本项目使用@nuxtjs/component-cache 提升加载性能


### 如何启动应用

```bash

# 下载代码

# 安装依赖
$ npm install

# 本地启动在 localhost:3000
$ npm run dev

# 部署到服务器，先build，再执行start启动

$ npm run build

$ npm run start

# 生成静态项目

$ npm run generate
```

* 默认调用官网接口，数据跟官网同步
  
* 如果要使用本地接口，请修改/plugins/baseUrl.js 文件中的baseUrl
  
* 如果想要在浏览器端调用接口，请修改nuxt.config.js文件中的proxy, 将对应接口转发至本地服务即可


