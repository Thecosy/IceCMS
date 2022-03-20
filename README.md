   2. 反向代理：可以直接使用我跑在 Cloudflare Workers 上的反代，默认配置即可，但建议自行搭建，示例反代随时可能关闭🙃。示例代码已放在`blog-api/cfworker-tg-api-open.js`，CV 即可 run



## 快速开始

1. 创建 MySQL 数据库`nblog`，并执行`/blog-api/nblog.sql`初始化表数据
2. 修改配置信息`blog-api/src/main/resources/application-dev.properties`
3. 安装 Redis 并启动
4. 启动后端服务
5. 分别在`blog-cms`和`blog-view`目录下执行`npm install`安装依赖
6. 分别在`blog-cms`和`blog-view`目录下执行`npm run serve`启动前后台页面



## 注意事项

一些常见问题：

- MySQL 确保数据库字符集为`utf8mb4`的情况下通常没有问题（”站点设置“及”文章详情“等许多表字段需要`utf8mb4`格式字符集来支持 emoji 表情，否则在导入 sql 文件时，即使成功导入，也会有部分字段内容不完整，导致前端页面渲染数据时报错）
- 确保 Maven 能够成功导入现版本依赖，请勿升级或降低依赖版本
- 数据库中默认用户名密码为`Admin`，`123456`，因为是个人博客，没打算做修改密码的页面，可在`top.naccl.util.HashUtils`下的`main`方法手动生成密码存入数据库
- 注意修改`application-dev.properties`的配置信息
  - Redis 若没有密码，留空即可
  - 注意修改`token.secretKey`，否则无法保证 token 安全性
  - `spring.mail.host`及`spring.mail.port`的默认配置为阿里云邮箱，其它邮箱服务商参考关键字`spring mail 服务器`（邮箱配置用于接收评论提醒）



## 隐藏功能

- 在前台访问`/login`路径登录后，可以以博主身份（带有博主标识）回复评论，且不需要填写昵称和邮箱即可提交
- 在 Markdown 中加入`<meting-js server="netease" type="song" id="歌曲id" theme="#25CCF7"></meting-js>` （注意以正文形式添加，而不是代码片段）可以在文章中添加 [APlayer](https://github.com/DIYgod/APlayer) 音乐播放器，`netease`为网易云音乐，其它配置及具体用法参考 [MetingJS](https://github.com/metowolf/MetingJS)
- 提供了两种隐藏文字效果：在 Markdown 中使用`@@`包住文字，文字会被渲染成“黑幕”效果，鼠标悬浮在上面时才会显示；使用`%%`包住文字，文字会被“蓝色覆盖层”遮盖，只有鼠标选中状态才会反色显示。例如：`@@隐藏文字@@`，`%%隐藏文字%%`
- 大部分个性化配置可以在后台“站点设置”中修改，小部分由于考虑到首屏加载速度（如首页大图）需要修改前端源码



## And...

自用博客，长期维护，欢迎勘误



## Thanks

感谢 [JetBrains](https://www.jetbrains.com/) 提供的非商业开源软件 License

感谢上面提到的每个开源项目
