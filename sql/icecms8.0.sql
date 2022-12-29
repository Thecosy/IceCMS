/*
 Navicat Premium Data Transfer

 Source Server         : Mysql
 Source Server Type    : MySQL
 Source Server Version : 80030 (8.0.30)
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 80030 (8.0.30)
 File Encoding         : 65001

 Date: 30/12/2022 01:01:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for all_tag
-- ----------------------------
DROP TABLE IF EXISTS `all_tag`;
CREATE TABLE `all_tag` (
                           `id` int DEFAULT NULL,
                           `tag_name` varchar(255) DEFAULT NULL COMMENT '标签名称'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of all_tag
-- ----------------------------
BEGIN;
INSERT INTO `all_tag` (`id`, `tag_name`) VALUES (1, '设计笔记');
INSERT INTO `all_tag` (`id`, `tag_name`) VALUES (2, 'iceCMS');
INSERT INTO `all_tag` (`id`, `tag_name`) VALUES (3, '我的网站');
INSERT INTO `all_tag` (`id`, `tag_name`) VALUES (4, '资源下载');
INSERT INTO `all_tag` (`id`, `tag_name`) VALUES (5, '技术教程');
INSERT INTO `all_tag` (`id`, `tag_name`) VALUES (6, '新手必备');
INSERT INTO `all_tag` (`id`, `tag_name`) VALUES (7, 'office');
INSERT INTO `all_tag` (`id`, `tag_name`) VALUES (8, '优化');
INSERT INTO `all_tag` (`id`, `tag_name`) VALUES (9, 'vip');
COMMIT;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
                           `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT 'id',
                           `sort_class` int DEFAULT NULL COMMENT '所厲栏目Class',
                           `title` varchar(255) DEFAULT NULL COMMENT '文章标题',
                           `title_color` varchar(8) DEFAULT NULL COMMENT '标题颜色',
                           `titlefont_size` varchar(2) DEFAULT NULL COMMENT '标题大小',
                           `titlefont_type` int DEFAULT NULL COMMENT '标题字形',
                           `full_title` varchar(255) DEFAULT NULL COMMENT '完整标题',
                           `subhead` varchar(255) DEFAULT NULL COMMENT '副标题',
                           `intro` varchar(255) DEFAULT NULL COMMENT '简介',
                           `content` longtext COMMENT '文章内容',
                           `author` varchar(20) DEFAULT NULL COMMENT '作者',
                           `copyfrom` varchar(20) DEFAULT NULL COMMENT '来源',
                           `inputer` varchar(20) DEFAULT NULL COMMENT '录入者',
                           `http_url` varchar(255) DEFAULT NULL COMMENT '转向连接',
                           `keyword` varchar(255) DEFAULT NULL COMMENT '关健字',
                           `hits` int DEFAULT NULL COMMENT '点击数',
                           `post_num` int DEFAULT NULL COMMENT '评论数',
                           `love_num` int DEFAULT NULL COMMENT '喜欢数',
                           `comment_disabled` varchar(10) DEFAULT NULL COMMENT '是否评论',
                           `ontop` int DEFAULT NULL COMMENT '是否顶制',
                           `iselite` int DEFAULT NULL COMMENT '是否推荐',
                           `deleted` int DEFAULT NULL COMMENT '是否删除',
                           `add_time` datetime DEFAULT NULL COMMENT '添加时间',
                           `update_time` datetime DEFAULT NULL COMMENT '更新时间',
                           `create_time` datetime DEFAULT NULL COMMENT '生成时间',
                           `last_post` datetime DEFAULT NULL COMMENT '最后评论时间',
                           `owner_tag` int DEFAULT NULL COMMENT '重要性',
                           `owner_remark` varchar(1024) DEFAULT NULL COMMENT '自定义备注',
                           `html_path` varchar(255) DEFAULT NULL COMMENT 'htm地址',
                           `file_path` varchar(255) DEFAULT NULL COMMENT '上传文件地址',
                           `temp_path` varchar(255) DEFAULT NULL COMMENT '模板地址',
                           `thumb` varchar(255) DEFAULT NULL COMMENT '缩略图地址',
                           `status` varchar(25) DEFAULT NULL COMMENT '生成状态',
                           `article_status` int(10) unsigned zerofill NOT NULL COMMENT '文章状态身份',
                           PRIMARY KEY (`id`,`article_status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1000000239 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of article
-- ----------------------------
BEGIN;
INSERT INTO `article` (`id`, `sort_class`, `title`, `title_color`, `titlefont_size`, `titlefont_type`, `full_title`, `subhead`, `intro`, `content`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `love_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`, `article_status`) VALUES (0000000189, 19, '这是我的第一篇文章名', NULL, NULL, NULL, NULL, NULL, 'kjnk', '<p>这是我的第一篇文章</p>\n<h2>标题</h2>\n<h3>代码</h3>\n<pre class=\"language-javascript\"><code>    //数据回填\n    if (this.isEdit) {\n      const id = this.$route.params &amp;&amp; this.$route.params.id\n      this.articleid = this.$route.params.id\n      this.fetchData(id)\n      this.fetchData(this.articleid)\n    }</code></pre>\n<p>yes</p>', 'ttice', NULL, NULL, NULL, NULL, 52, 1, 15, NULL, NULL, NULL, NULL, '2022-02-23 11:17:35', '2022-03-15 02:49:29', '2021-11-16 10:00:00', NULL, 3, NULL, NULL, NULL, NULL, NULL, 'published', 0004807611);
INSERT INTO `article` (`id`, `sort_class`, `title`, `title_color`, `titlefont_size`, `titlefont_type`, `full_title`, `subhead`, `intro`, `content`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `love_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`, `article_status`) VALUES (0000000217, 20, 'JetBrains全系列软件激活教程激活码以及JetBrains系列软件汉化包', NULL, NULL, NULL, NULL, NULL, '阿松大', '<h2 id=\"最新激活方式\">最新激活方式</h2>\n<p>如果安装过无限试用、修改过 hosts 请先卸载干净旧版本再安装，否需无法激活！</p>\n<blockquote>\n<p>以&nbsp;<code>WebStorm</code>&nbsp;为例</p>\n</blockquote>\n<ol>\n<li><a class=\"text-primary\" href=\"https://www.jetbrains.com/\" target=\"_blank\" rel=\"noopener\">JetBrains官网</a>&nbsp;下载安装你需要的 IDE，如果下载慢可以在 macwk 搜索 jetbrains。</li>\n<li>下载&nbsp;<a class=\"text-primary\" href=\"https://macwk.lanzouo.com/i8eElxh573a\" target=\"_blank\" rel=\"noopener\">Jetbrains.zip</a>，下载后解压，得到 fineagent.jar，将该文件复制到&nbsp;<code>/Users/你的用户名/</code>&nbsp;文件夹下</li>\n<li>打开访达，点击左侧的&nbsp;<code>应用程序</code>&nbsp;找到&nbsp;<code>WebStorm</code>，在 WebStorm 图标上右键，点击&nbsp;<code>显示包内容</code></li>\n<li>进入&nbsp;<code>Contents</code>&nbsp;目录，再进入&nbsp;<code>bin</code>&nbsp;目录，使用文本编辑器打开&nbsp;<code>webstorm.vmoptions</code>&nbsp;文件</li>\n<li>在最后面添加&nbsp;<code>-javaagent:/Users/你的用户名/fineagent.jar</code>，记得修改一下你的用户名。</li>\n<li>运行 WebStorm, 选择&nbsp;<code>Activate WebStorm</code>，再点击&nbsp;<code>Activation Code</code></li>\n<li>复制下面的的激活码粘贴到激活窗口的输入框中，点击&nbsp;<code>Activate</code>。可以用到 2099 年！</li>\n</ol>\n<pre class=\"language-  language-undefined\" tabindex=\"0\"><code>5AYV1D1RE5-eyJsaWNlbnNlSWQiOiI1QVlWMUQxUkU1IiwibGljZW5zZWVOYW1lIjoiaHR0cHM6Ly93d3cuaml3ZWljaGVuZ3podS5jb20iLCJhc3NpZ25lZU5hbWUiOiIiLCJhc3NpZ25lZUVtYWlsIjoiIiwibGljZW5zZVJlc3RyaWN0aW9uIjoiIiwiY2hlY2tDb25jdXJyZW50VXNlIjpmYWxzZSwicHJvZHVjdHMiOlt7ImNvZGUiOiJJSSIsImZhbGxiYWNrRGF0ZSI6IjIwOTktMTItMzEiLCJwYWlkVXBUbyI6IjIwOTktMTItMzEifSx7ImNvZGUiOiJBQyIsImZhbGxiYWNrRGF0ZSI6IjIwOTktMTItMzEiLCJwYWlkVXBUbyI6IjIwOTktMTItMzEifSx7ImNvZGUiOiJEUE4iLCJmYWxsYmFja0RhdGUiOiIyMDk5LTEyLTMxIiwicGFpZFVwVG8iOiIyMDk5LTEyLTMxIn0seyJjb2RlIjoiUFMiLCJmYWxsYmFja0RhdGUiOiIyMDk5LTEyLTMxIiwicGFpZFVwVG8iOiIyMDk5LTEyLTMxIn0seyJjb2RlIjoiR08iLCJmYWxsYmFja0RhdGUiOiIyMDk5LTEyLTMxIiwicGFpZFVwVG8iOiIyMDk5LTEyLTMxIn0seyJjb2RlIjoiRE0iLCJmYWxsYmFja0RhdGUiOiIyMDk5LTEyLTMxIiwicGFpZFVwVG8iOiIyMDk5LTEyLTMxIn0seyJjb2RlIjoiQ0wiLCJmYWxsYmFja0RhdGUiOiIyMDk5LTEyLTMxIiwicGFpZFVwVG8iOiIyMDk5LTEyLTMxIn0seyJjb2RlIjoiUlMwIiwiZmFsbGJhY2tEYXRlIjoiMjA5OS0xMi0zMSIsInBhaWRVcFRvIjoiMjA5OS0xMi0zMSJ9LHsiY29kZSI6IlJDIiwiZmFsbGJhY2tEYXRlIjoiMjA5OS0xMi0zMSIsInBhaWRVcFRvIjoiMjA5OS0xMi0zMSJ9LHsiY29kZSI6IlJEIiwiZmFsbGJhY2tEYXRlIjoiMjA5OS0xMi0zMSIsInBhaWRVcFRvIjoiMjA5OS0xMi0zMSJ9LHsiY29kZSI6IlBDIiwiZmFsbGJhY2tEYXRlIjoiMjA5OS0xMi0zMSIsInBhaWRVcFRvIjoiMjA5OS0xMi0zMSJ9LHsiY29kZSI6IlJNIiwiZmFsbGJhY2tEYXRlIjoiMjA5OS0xMi0zMSIsInBhaWRVcFRvIjoiMjA5OS0xMi0zMSJ9LHsiY29kZSI6IldTIiwiZmFsbGJhY2tEYXRlIjoiMjA5OS0xMi0zMSIsInBhaWRVcFRvIjoiMjA5OS0xMi0zMSJ9LHsiY29kZSI6IkRCIiwiZmFsbGJhY2tEYXRlIjoiMjA5OS0xMi0zMSIsInBhaWRVcFRvIjoiMjA5OS0xMi0zMSJ9LHsiY29kZSI6IkRDIiwiZmFsbGJhY2tEYXRlIjoiMjA5OS0xMi0zMSIsInBhaWRVcFRvIjoiMjA5OS0xMi0zMSJ9LHsiY29kZSI6IlJTVSIsImZhbGxiYWNrRGF0ZSI6IjIwOTktMTItMzEiLCJwYWlkVXBUbyI6IjIwOTktMTItMzEifV0sImhhc2giOiIxMjc5Njg3Ny8wIiwiZ3JhY2VQZXJpb2REYXlzIjo3LCJhdXRvUHJvbG9uZ2F0ZWQiOmZhbHNlLCJpc0F1dG9Qcm9sb25nYXRlZCI6ZmFsc2V9-HNPogO0kWkHCVMnsjmBXUqQt87UPHqdkYqZGveSJtu8hb2V2Yq7gHsHenp4UuEd3jwEwC+YrUIf7U5yDA/56F5Sdn0RLUHZX5DHeQbJPbmYCBsDRT7m8rnmMFOSZn3vwNatvv1cooZbcGOk3Wwxx6bF7XcgaIrmXRcmZMZgv2PZehr0WS1HxNKe3X4nbGP3MwiSbg4ypmxNDrljmgv+Si9QDDwNLDffqeO0Lce0FqEJuMWmvBS42S0aeIYF8IS5bp4+LFKLJ8T7tF40OxKYDurBb9+9c43GZBscM/eLB8Jos66jNGFwgebFUlvhzJKVHZtuc/N8zGeEnTq6K0T/B8w==-MIIDTjCCAjagAwIBAgIBDTANBgkqhkiG9w0BAQsFADAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBMCAXDTE4MTEwMTEyMjk0NloYDzIwOTkwODA5MDIyNjA3WjAfMR0wGwYDVQQDDBRwcm9kMnktZnJvbS0yMDIwMTAxOTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMK3eyr0+Oys/TwcQO+qYaXWGBmXcEP4fR0bHHzZd/4WNGltXhecM80OWthA38BQRYAJBCKz/dSkO2Kj1H2y+7KB5cIaOiJEyTESfTSgzQdot6laRBU8oxy9mmagI46M8zEEmplPybY4YJj4HOwZiBsMQEMxoTgMDLpuHX6uASoVhSj6koB55lOj4wEgsQBeAMWTAXmTl88ixE179J8aBUkBGpL8w/tZzl9BJXZNF15gPfkS58rw8cdPzXLS0Yym37A2/KKFhfHzJc5KhbaxqYzmkAfTMqPsIqCQ1lQUAqfiPn2gN2I1Z3/cQuEW27M55fXVr2DduQe5DWzYJs85L50CAwEAAaOBmTCBljAJBgNVHRMEAjAAMB0GA1UdDgQWBBQk2hEilvWFQcCTR+gxI0z0wIQC/zBIBgNVHSMEQTA/gBSjnrZIZ0ISNkG9beC5tKBSi5fxs6EcpBowGDEWMBQGA1UEAwwNSmV0UHJvZmlsZSBDQYIJANJssYOyg3nhMBMGA1UdJQQMMAoGCCsGAQUFBwMBMAsGA1UdDwQEAwIFoDANBgkqhkiG9w0BAQsFAAOCAQEAsCQBjO5wttco/Z5cj/o4GBrku8UtBBBVFq4xsBanshTHm4deVxcTvta4aScV0TPKcaLqGqWx8A9v8XXO8dBbCuyXvWZteZ/C2Covg1xXiM99lz7VxqpjVmLdKanZn5u0gQSiYJdcfF+TdbmEIeSOnN/kLXNq2hXdJQK2zk2J25UZqu5EibRtTbdOzw6ZcfwJ8uOntXfsmAhnNICP3Wf/4wR/mwB0Ka4S+JA3IbF5MUmUZ/fjUaFarnin70us+Vxf/sZUi7u67wilvwVV0NAqDpthHUV0NRc4q+yOr2Dt/uCHdy4XRXLJfAv/z9/xBwNZZALNz3EtQL6IeIWWJByl3g==</code></pre>\n<p>尽情享用吧！</p>\n<h2 id=\"激活码方式\">激活码方式</h2>\n<p>该方式不需要另外设置，直接即可通过激活码激活，但是不保证稳定性！</p>\n<p><a class=\"text-primary fs-30\" href=\"https://jetbra.in/test-7b06e3ddfa68ff9b483adfcd08cdd243831f7928.html?t=16018385822?source=https://www.macwk.com/article/jetbrains-crack\" target=\"_blank\" rel=\"noopener\">点我获取最新激活码</a>，</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<h2 id=\"无限重置试用方式\">无限重置试用方式</h2>\n<blockquote>\n<p>无限重置试用方式仅适用于 2021.2.2 及以下版本！！！</p>\n</blockquote>\n<h3 id=\"前面的话\">前面的话</h3>\n<blockquote>\n<p>永久激活的工具 zhile 的大神已经不再继续开发维护了，此方法一直是跳转到 zhile 的主页，但是经常遇到反馈说目标网站打不开或者不知道怎么安装插件的问题，所以直接转到这个页面并配一下操作图片吧。另外目前只有这种无限重置试用的方法了，<code>最终和永久激活使用无差异，因为插件是每次运行自动续期的</code>！支持 JetBrains 系列软件的所有新旧版本的激活！！！MacWk.com 建议大家去&nbsp;<a href=\"https://www.jetbrains.com/\" target=\"_blank\" rel=\"noopener\">JetBrains官网</a>&nbsp;下载JetBrains系列工具的官方版，一般情况下载很快的。</p>\n</blockquote>\n<p>此方法也适用于 Windows。</p>\n<h3 id=\"背景\">背景</h3>\n<p>Jetbrains 家的产品有一个很良心的地方，他会允许你试用 30 天（这个数字写死在代码里了）以评估是否你真的需要为它而付费。 但很多时候会出现一种情况：IDE 并不能按照我们实际的试用时间来计算。</p>\n<p>我举个例子：如果我们开始了试用，然后媳妇生孩子要你回去陪产！陪产时我们并无空闲对IDE试用评估，它依旧算试用时间。（只是举个例子，或许你并没有女朋友）</p>\n<p>发现了吗？你未能真的有 30 天来对它进行全面的试用评估，你甚至无法作出是否付费的决定。此时你会想要延长试用时间，然而 Jetbrains 并未提供相关功能，该怎么办？</p>\n<p>事实上有一款插件可以实现这个功能，你或许可以用它来重置一下试用时间。但切记不要无休止的一直试用，这并不是这个插件的初衷！</p>\n<p><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-01.jpg\" alt=\"\" /></p>\n<h3 id=\"如何安装\">如何安装</h3>\n<blockquote>\n<p>提供以下两种方法，二选一即可。</p>\n</blockquote>\n<ol>\n<li>插件市场安装：</li>\n</ol>\n<p>在&nbsp;<code>Settings/Preferences... -&gt; Plugins</code>&nbsp;内手动添加第三方插件仓库地址：<code>https://plugins.zhile.io</code>&nbsp;搜索：IDE Eval Reset 插件进行安装。</p>\n<p><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-02.jpg\" alt=\"\" /><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-03.jpg\" alt=\"\" /><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-04.jpg\" alt=\"\" /><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-05.jpg\" alt=\"\" /><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-06.jpg\" alt=\"\" /><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-07.jpg\" alt=\"\" /><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-08.jpg\" alt=\"\" /></p>\n<ol start=\"2\">\n<li>手动下载安装：</li>\n</ol>\n<p><a class=\"text-primary\" href=\"https://macwk.lanzoui.com/iwY9lvf1ckj\" target=\"_blank\" rel=\"noopener\">点击这个链接(v2.1.14)下载插件的 zip 包</a>（macOS可能会自动解压，切记使用的是 zip 包，不是解压后的文件夹！），然后打开&nbsp;<code>Settings/Preferences... -&gt; Plugins</code>&nbsp;手动安装插件。</p>\n<p><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-09.jpg\" alt=\"\" /><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-10.jpg\" alt=\"\" /><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-11.jpg\" alt=\"\" /><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-12.jpg\" alt=\"\" /></p>\n<h3 id=\"如何使用\">如何使用</h3>\n<p>一般来说，在 IDE 窗口切出去或切回来时（窗口失去/得到焦点）会触发事件，检测是否长时间（25天）没有重置，给通知让你选择。（初次安装因为无法获取上次重置时间，会直接给予提示）。</p>\n<p>您也可以手动唤出插件的主界面：</p>\n<p>a. 如果 IDE 没有打开项目，在 Welcome 界面点击 IDE 的菜单：<code>Get Help -&gt; Eval Reset</code></p>\n<p>b. 如果 IDE 打开了项目，点击 IDE 的菜单：<code>Help -&gt; Eval Reset</code></p>\n<p>唤出的插件主界面中包含了一些显示信息，有 2 个按钮和 1 个勾选项：</p>\n<ul>\n<li>按钮：<code>Reload</code>&nbsp;用来刷新界面上的显示信息。</li>\n<li>按钮：<code>Reset</code>&nbsp;点击会询问是否重置试用信息并重启 IDE。选择 Yes 则执行重置操作并重启 IDE 生效，选择 No 则什么也不做。（此为手动重置方式）</li>\n<li>勾选项：<code>Auto reset before per restart</code>&nbsp;如果勾选了，则自勾选后每次重启/退出 IDE 时会自动重置试用信息，你无需做额外的事情。（此为自动重置方式，推荐此方法！）</li>\n</ul>\n<p><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-13.jpg\" alt=\"\" /><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-14.jpg\" alt=\"\" /><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-15.jpg\" alt=\"\" /></p>\n<h3 id=\"如何更新\">如何更新</h3>\n<ol>\n<li>插件更新机制（推荐）：</li>\n</ol>\n<p>IDE 会自行检测其自身和所安装插件的更新并给予提示。如果本插件有更新，你会收到提示看到更新日志，自行选择是否更新。</p>\n<p>点击 IDE 的 Check for Updates... 菜单手动检测 IDE 和所安装插件的更新。如果本插件有更新，你会收到提示看到更新日志，自行选择是否更新。</p>\n<p>插件更新可能会需要重启IDE。</p>\n<ol start=\"2\">\n<li>手动更新：</li>\n</ol>\n<p>从本页面下载最新的插件 zip 包安装更新。插件更新需要重启IDE。</p>\n<h3 id=\"一些说明\">一些说明</h3>\n<p>市场付费插件的试用信息也会一并重置。</p>\n<p>MyBatisCodeHelperPro 插件有两个版本如下，功能完全相同，安装时须看清楚！</p>\n<ul>\n<li><a href=\"https://plugins.jetbrains.com/plugin/14522-mybatiscodehelperpro-marketplace-edition-\" target=\"_blank\" rel=\"noopener\">MyBatisCodeHelperPro</a>&nbsp;(Marketplace Edition)，<code>可重置</code>！</li>\n<li><a href=\"https://plugins.jetbrains.com/plugin/9837-mybatiscodehelperpro\" target=\"_blank\" rel=\"noopener\">MyBatisCodeHelperPro</a>，<code>不可重置</code>！</li>\n</ul>\n<p>对于某些付费插件（如: Iedis 2, MinBatis）来说，你可能需要去取掉 javaagent 配置（如果有）后重启IDE：</p>\n<ul>\n<li>如果IDE没有打开项目，在 Welcome 界面点击菜单：Configure -&gt; Edit Custom VM Options... -&gt; 移除 -javaagent: 开头的行。</li>\n<li>如果IDE打开了项目，点击菜单：Help -&gt; Edit Custom VM Options... -&gt; 移除 -javaagent: 开头的行。</li>\n</ul>\n<p>重置需要重启IDE生效！</p>\n<p>重置后并不弹出 Licenses 对话框让你选择输入 License 或试用，这和之前的重置脚本/插件不同（省去这烦人的一步）。</p>\n<p>如果长达 25 天不曾有任何重置动作，IDE 会有通知询问你是否进行重置。</p>\n<p>如果勾选：Auto reset before per restart ，重置是静默无感知的。</p>\n<p>简单来说：勾选了 Auto reset before per restart 则无需再管，一劳永逸。</p>\n<h3 id=\"开源信息\">开源信息</h3>\n<p>插件是学习研究项目，源代码是开放的。源码仓库地址：<a class=\"text-primary\" href=\"https://gitee.com/pengzhile/ide-eval-resetter\" target=\"_blank\" rel=\"noopener\">Gitee</a>。</p>\n<p>如果你有更好的想法，欢迎给我提 Pull Request 来共同研究完善。</p>\n<p>插件源码使用：GPL-2.0开源协议发布。</p>\n<p>插件使用 PHP 编写，毕竟 PHP 是世界上最好的编程语言！</p>\n<h3 id=\"支持的产品\">支持的产品</h3>\n<ul>\n<li>IntelliJ IDEA</li>\n<li>AppCode</li>\n<li>CLion</li>\n<li>DataGrip</li>\n<li>GoLand</li>\n<li>PhpStorm</li>\n<li>PyCharm</li>\n<li>Rider</li>\n<li>RubyMine</li>\n<li>WebStorm</li>\n</ul>\n<p><a class=\"text-primary\" href=\"https://zhile.io/2020/11/18/jetbrains-eval-reset-da33a93d.html\" target=\"_blank\" rel=\"noopener\">点我查看原文链接</a></p>\n<h2 id=\"中文汉化包\">中文汉化包</h2>\n<p>JetBrains 系列大部分在官方的插件中心直接安装使用了。</p>\n<p>以 WebStrom 为例，打开它的设置，点击 Plugins，搜索 chinese，安装即可。</p>\n<p><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-activation-step-09-1.jpg\" alt=\"\" /></p>\n<h2 id=\"激活码\">激活码</h2>\n<p>目前全网 Jetbrains 全家桶激活码激活方式都不稳定，请使用无限重置试用的方法。</p>', 'awe', NULL, NULL, NULL, NULL, 133, 2, 61, 'false', NULL, NULL, NULL, '2022-02-24 10:27:15', '2022-03-15 02:49:23', '2022-02-27 13:04:45', NULL, 3, NULL, NULL, NULL, NULL, 'https://icewk-1305088812.cos.ap-nanjing.myqcloud.com/images/4941645728392129.png', 'published', 0009170287);
INSERT INTO `article` (`id`, `sort_class`, `title`, `title_color`, `titlefont_size`, `titlefont_type`, `full_title`, `subhead`, `intro`, `content`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `love_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`, `article_status`) VALUES (0000000229, 20, 'Github上传操作-push-pull-delete', NULL, NULL, NULL, NULL, NULL, '按顺序擦速度', '<p>&nbsp;</p>\n<div>\n<div>\n<article class=\"_2rhmJa\">\n<h2>新建</h2>\n<h3>&hellip;or create a new repository on the command line</h3>\n<div class=\"copyable-terminal\">\n<div class=\"copyable-terminal-button\">&nbsp;</div>\n<pre class=\"language-css\"><code>echo \"# IceWk\" &gt;&gt; README.md\ngit init\ngit add README.md\ngit commit -m \"first commit\"\ngit branch -M main\ngit remote add origin git@github.com:Thecosy/IceWk.git\ngit push -u origin main删除</code></pre>\n</div>\n<h2>删除</h2>\n<p>在上传项目到github时,忘记忽略了某个文件夹target,就直接push上去了, 最后意识到了此问题,决定删除掉远程仓库中的target文件夹</p>\n<p>&nbsp;</p>\n<p>在github上只能删除仓库,却无法删除文件夹或文件, 所以只能通过命令来解决</p>\n<p>&nbsp;</p>\n<p>首先进入你的master文件夹下, Git Bash Here ,打开命令窗口</p>\n<p>$ git --help # 帮助命令</p>\n<p>&nbsp;</p>\n<p>$ git pull origin master # 将远程仓库里面的项目拉下来</p>\n<p>$ dir # 查看有哪些文件夹</p>\n<p>$ git rm -r --cached target # 删除target文件夹<br />$ git commit -m \'删除了target\' # 提交,添加操作说明</p>\n<p>&nbsp;</p>\n<ul>\n<li>\n<p>提交上述操作<br /><strong><code>git commit -m \"log message\"</code></strong></p>\n</li>\n<li>\n<p>推送所有文件到远程仓库<br /><strong><code>git push origin master</code></strong></p>\n<blockquote>\n<p>这时候如果再执行添加origin操作，会提示<strong>远程origin已经存在</strong>。<br />细心的可能会发现这地方跟<a target=\"_blank\" rel=\"noopener\">添加本地项目到github</a>的最后一步操作不一样，那里是<code>git push -u origin master</code></p>\n<blockquote>\n<p>第一次添加远程origin时，需要语句<code>-u</code></p>\n</blockquote>\n</blockquote>\n</li>\n</ul>\n<p>这时候我们再去github上查看此项目，就可以看到已经更新了刚才的操作！</p>\n<h2>更新</h2>\n<p>&nbsp;</p>\n</article>\n<div>\n<p>向本地仓库中准备文件</p>\n<p>git add .<br /><br />这条命令是向本地仓库传入全部文件<br />或者</p>\n<h3>git add filepath(具体文件的路径)<br /><br />交付<br />备注信息不能为空，否则会交付失败。</h3>\n<p>git commit -m \"备注信息\"<br /><br />还可以添加其他参数<br />连接远程仓库<br />第一次上传时，需要在github创建一个Repository,然后复制其URL或者SSH<br />更新时若已经进入项目根目录可以无此操作。</p>\n<p>git remote add origin https://github.com/cocolabear/snake.git<br /><br />注意是add不是and</p>\n<p>提交代码</p>\n<p>git push -u origin master<br /><br />当出现莫名其妙的问题时，强制push</p>\n<p>git push -u origin master -f<br /><br />这一步可能需要输入github的账号和密码。<br /><br /></p>\n<div>\n<div>\n<div>\n<div>\n<p>&nbsp;</p>\n<p>正确步骤：<br />1. git init //初始化仓库</p>\n<ol>\n<li>\n<p>git add .(文件name) //添加文件到本地仓库</p>\n</li>\n<li>\n<p>git commit -m &ldquo;first commit&rdquo; //添加文件描述信息</p>\n</li>\n<li>\n<p>git remote add origin + 远程仓库地址&nbsp;//链接远程仓库，创建主分支</p>\n</li>\n<li>\n<p>git pull origin master // 把本地仓库的变化连接到远程仓库主分支</p>\n</li>\n<li>\n<p>git push -u origin master //把本地仓库的文件推送到远程仓库</p>\n</li>\n</ol>\n<p>OK<br />搞定！！</p>\n</div>\n<div class=\"_19DgIp\">&nbsp;</div>\n</div>\n<br /><br /></div>\n</div>\n</div>\n<div class=\"_19DgIp\">&nbsp;</div>\n</div>\n<br /><br /></div>', 'awe', NULL, NULL, NULL, NULL, 79, 8, 3, NULL, NULL, NULL, NULL, '2022-02-27 11:26:51', '2022-05-13 15:01:44', '2022-02-27 13:01:00', NULL, 3, NULL, NULL, NULL, NULL, NULL, 'published', 0007751656);
INSERT INTO `article` (`id`, `sort_class`, `title`, `title_color`, `titlefont_size`, `titlefont_type`, `full_title`, `subhead`, `intro`, `content`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `love_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`, `article_status`) VALUES (0000000233, 20, 'vue组件之间传值的方式', NULL, NULL, NULL, NULL, NULL, '', '<p>父组件往子组件传值</p>\n<p>prop作为初始值传入后，子组件想把它当作局部数据来用</p>\n<pre class=\"language-javascript\"><code>&lt;div class=\"content\"&gt;\n    &lt;my-table :table-data=\"tableData\" :page-info=\"pageInfo\" id=\"myTable\"&gt;&lt;/my-table&gt;\n&lt;/div&gt;</code></pre>\n<pre class=\"language-javascript\"><code>props: [\'tableData\', \'pageInfo\'],\ndata() {\n    return {\n        tData: this.tableData,\n        page: this.pageInfo\n    }\n}</code></pre>\n<p>&nbsp;</p>\n<p>父组件传值给子组件后，在子组件里接收到之后，用的时候就直接用this.tableData</p>\n<pre><code> props: {\n    tableData: {\n      type: Array\n    }\n  },\ncreated: function () {\n  console.log(this.tableData)\n}</code></pre>\n<p class=\"p1\">&nbsp;</p>\n<p class=\"p2\">vue路由传参的三种基本方式</p>\n<p class=\"p3\"><strong>方案一：</strong></p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; </span>getDescribe(id) {</p>\n<p class=\"p2\">// <span class=\"Apple-converted-space\">&nbsp; </span>直接调用$router.push 实现携带参数的跳转</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; </span>this.$router.push({</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>path: `/describe/${id}`,</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; </span>})</p>\n<p class=\"p3\"><strong>方案一，需要对应路由配置如下：</strong></p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; </span>{</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; &nbsp; </span>path: \'/describe/:id\',</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; &nbsp; </span>name: \'Describe\',</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; &nbsp; </span>component: Describe</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; </span>}</p>\n<p class=\"p3\"><strong>很显然，需要在path中添加/:id来对应 $router.push 中path携带的参数。在子组件中可以使用来获取传递的参数值。</strong></p>\n<p class=\"p2\">this.$route.params.id</p>\n<p class=\"p3\"><strong>方案二：</strong></p>\n<p class=\"p3\"><strong>父组件中：通过路由属性中的name来确定匹配的路由，通过params来传递参数。</strong></p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; &nbsp; &nbsp; </span>this.$router.push({</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>name: \'Describe\',</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>params: {</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>id: id</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>}</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; </span>})</p>\n<p class=\"p3\"><strong>对应路由配置: 这里可以添加:/id 也可以不添加，不添加数据会在url后面显示，不添加数据就不会显示</strong></p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; </span>{</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; &nbsp; </span>path: \'/describe\',</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; &nbsp; </span>name: \'Describe\',</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; &nbsp; </span>component: Describe</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; </span>}</p>\n<p class=\"p3\"><strong>子组件中: 这样来获取参数</strong></p>\n<p class=\"p2\">this.$route.params.id</p>\n<p class=\"p3\"><strong>方案三：</strong></p>\n<p class=\"p3\"><strong>父组件：使用path来匹配路由，然后通过query来传递参数<br />这种情况下 query传递的参数会显示在url后面?id=？</strong></p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; </span>this.$router.push({</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>path: \'/describe\',</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>query: {</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>id: id</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>}</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; </span>})</p>\n<p class=\"p3\"><strong>对应路由配置：</strong></p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; </span>{</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; &nbsp; </span>path: \'/describe\',</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; &nbsp; </span>name: \'Describe\',</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; &nbsp; </span>component: Describe</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; </span>}</p>\n<p class=\"p3\"><strong>对应子组件: 这样来获取参数</strong></p>\n<p class=\"p2\">this.$route.query.id</p>\n<p class=\"p3\"><strong>这里要特别注意 在子组件中 获取参数的时候是$route.params 而不是</strong></p>\n<p class=\"p3\"><strong>$router </strong><span class=\"s1\"><strong>这很重要</strong></span><strong>~~~</strong></p>', 'ttice', NULL, NULL, NULL, NULL, 155, 2, 26, 'false', NULL, NULL, NULL, '2022-03-13 05:41:21', '2022-03-31 10:42:05', NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, 'published', 0008560208);
INSERT INTO `article` (`id`, `sort_class`, `title`, `title_color`, `titlefont_size`, `titlefont_type`, `full_title`, `subhead`, `intro`, `content`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `love_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`, `article_status`) VALUES (1000000237, 19, '部分地区蓝奏云下载链接无法访问问题解决', NULL, NULL, NULL, NULL, NULL, '如果出现蓝奏云打不开的问题，可以根据蓝奏云官方提供的修改域名或者修改DNS方法解决无法访问问题。', '<p>如果出现蓝奏云打不开的问题，可以根据蓝奏云官方提供的修改域名或者修改DNS方法解决无法访问问题。</p>\n<h3>修改域名</h3>\n<blockquote class=\"wp-block-quote\">\n<p>1.把下载链接中lanzou<span class=\"has-inline-color has-vivid-red-color\">s</span>.com 改成 lanzou<span class=\"has-inline-color has-vivid-red-color\">x</span>.com。</p>\n<p>2.把下载链接中lanzou<span class=\"has-inline-color has-vivid-red-color\">s</span>.com 改成 lanzou<span class=\"has-inline-color has-vivid-red-color\">i</span>.com。</p>\n<p>3.把下载链接中lanzou<span class=\"has-inline-color has-vivid-red-color\">s</span>.com 改成 lanzou.com。</p>\n<p>4.把下载链接中<span class=\"has-inline-color has-vivid-red-color\">macoshome</span>.lanzoux.com/xxxxx，二级域名<span class=\"has-inline-color has-vivid-red-color\">macoshome</span>前缀删除，变成lanzoux.com/xxxxx。</p>\n</blockquote>\n<p>以上4选一尝试，如果都无法方法请使用修改DNS方法解决。</p>\n<h3>修改DNS</h3>\n<p>把网络链接的DNS改成阿里、百度、腾讯、114公共DNS解决，下面是各厂商公共DNS发布地址，根据你的需要选择。</p>\n<blockquote class=\"wp-block-quote\">\n<p><a href=\"https://www.aliyun.com/activity/dns/pubdns_launch\" target=\"_blank\" rel=\"noreferrer noopener\">阿里DNS</a>&nbsp;｜&nbsp;<a href=\"https://dudns.baidu.com/index.html\" target=\"_blank\" rel=\"noreferrer noopener\">百度DNS</a>｜<a href=\"https://www.dnspod.cn/Products/Public.DNS\" target=\"_blank\" rel=\"noreferrer noopener\">腾讯DNS</a>｜<a href=\"https://www.114dns.com/index.html\" target=\"_blank\" rel=\"noreferrer noopener\">114DNS</a></p>\n</blockquote>\n<p>1.打开 系统偏好设置 &ndash; <span class=\"has-inline-color has-vivid-red-color\">网络</span>；</p>\n<figure class=\"wp-block-image size-large\"><img class=\"wp-image-7844\" src=\"http://img.macoshome.com/2021/05/DNSset1.png\" alt=\"部分地区蓝奏云下载链接无法访问问题解决\" width=\"1100\" height=\"510\" /></figure>\n<p>2.到了网络设置之后，点击 <span class=\"has-inline-color has-vivid-red-color\">高级</span> 按钮；</p>\n<figure class=\"wp-block-image size-large\"><img class=\"wp-image-7845\" src=\"http://img.macoshome.com/2021/05/DNSset2.png\" alt=\"部分地区蓝奏云下载链接无法访问问题解决\" width=\"1100\" height=\"950\" /></figure>\n<p>3.弹出的选项点击<span class=\"has-inline-color has-vivid-red-color\"> DNS</span>，再点击 左下角 <span class=\"has-inline-color has-vivid-red-color\">+</span> 按钮进行添加DNS地址输入框；</p>\n<figure class=\"wp-block-image size-large\"><img class=\"wp-image-7846\" src=\"http://img.macoshome.com/2021/05/DNSset3.png\" alt=\"部分地区蓝奏云下载链接无法访问问题解决\" width=\"1100\" height=\"950\" /></figure>\n<p>4.在DNS服务器处新添加的输入框输入DSN地址，苹果系统之家这里以114.114.114.114 地址为例子，输入好之后再点击右下角的<span class=\"has-inline-color has-vivid-red-color\"> 好 </span>按钮完成添加；</p>\n<p>TPS：如果之前有添加过其他DNS地址，要选中DNS地址，再点击左下角的 &ndash; 按钮删除。</p>\n<figure class=\"wp-block-image size-large\"><img class=\"wp-image-7847\" src=\"http://img.macoshome.com/2021/05/DNSset4.png\" alt=\"部分地区蓝奏云下载链接无法访问问题解决\" width=\"1100\" height=\"950\" /></figure>\n<p>5.最后再点击右下角的<span class=\"has-inline-color has-vivid-red-color\"> 应用</span>按钮完成DNS修改。</p>\n<figure class=\"wp-block-image size-large\"><img class=\"wp-image-7848\" src=\"http://img.macoshome.com/2021/05/DNSset5.png\" alt=\"部分地区蓝奏云下载链接无法访问问题解决\" width=\"1100\" height=\"950\" /></figure>', 'ttice', NULL, NULL, NULL, '[6,4,3]', 75, 1, 1, 'false', NULL, NULL, NULL, '2022-11-17 10:32:51', '2022-11-20 07:31:48', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, 'published', 0002304118);
INSERT INTO `article` (`id`, `sort_class`, `title`, `title_color`, `titlefont_size`, `titlefont_type`, `full_title`, `subhead`, `intro`, `content`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `love_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`, `article_status`) VALUES (1000000238, 19, '123', NULL, NULL, NULL, NULL, NULL, '123', '<p><img src=\"https://icewk-1305088812.cos.ap-nanjing.myqcloud.com/images/96661670046731754.png\" /></p>', 'admin', NULL, NULL, NULL, '[]', 40, NULL, NULL, 'false', NULL, NULL, NULL, '2022-12-03 05:52:33', '2022-12-03 05:52:33', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, 'published', 0005242319);
COMMIT;

-- ----------------------------
-- Table structure for article_class
-- ----------------------------
DROP TABLE IF EXISTS `article_class`;
CREATE TABLE `article_class` (
                                 `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT 'id',
                                 `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '名称',
                                 `father` int DEFAULT NULL COMMENT '父级分类',
                                 `other_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '别名',
                                 `describes` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '描述',
                                 `imgclass` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '分类图片',
                                 `top` int DEFAULT NULL COMMENT '顶制',
                                 `num` int DEFAULT NULL COMMENT '文章数量',
                                 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of article_class
-- ----------------------------
BEGIN;
INSERT INTO `article_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000019, '新手入门', NULL, 'rumen', '', '', NULL, NULL);
INSERT INTO `article_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000020, '基础教程', NULL, 'teach', '', '', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for article_comment
-- ----------------------------
DROP TABLE IF EXISTS `article_comment`;
CREATE TABLE `article_comment` (
                                   `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT 'id',
                                   `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '内容',
                                   `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '用户名',
                                   `email` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
                                   `add_time` datetime DEFAULT NULL COMMENT '创建时间',
                                   `parent_id` int DEFAULT NULL COMMENT '父id',
                                   `foreign_id` int DEFAULT NULL COMMENT '外部id',
                                   `profile` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '头像',
                                   `article_id` int DEFAULT NULL COMMENT '文章id',
                                   `user_id` int DEFAULT NULL COMMENT '用户id',
                                   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

-- ----------------------------
-- Records of article_comment
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for disposition_carousel
-- ----------------------------
DROP TABLE IF EXISTS `disposition_carousel`;
CREATE TABLE `disposition_carousel` (
                                        `id` int NOT NULL,
                                        `title` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
                                        `introduce` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
                                        `button` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
                                        `img` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
                                        PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='轮播图';

-- ----------------------------
-- Records of disposition_carousel
-- ----------------------------
BEGIN;
INSERT INTO `disposition_carousel` (`id`, `title`, `introduce`, `button`, `img`) VALUES (1, '苏宁源码', '您身边的源码专家', '立即下载', 'https://i.imgtg.com/2022/11/18/t0vKG.png');
INSERT INTO `disposition_carousel` (`id`, `title`, `introduce`, `button`, `img`) VALUES (2, '只收录精品Mac应用', '每款Mac应用都经过Macwk.com严格测试后发布，确保应用可以和正版软件一样稳定运行使用！', '立即下载', 'https://i.imgtg.com/2022/11/18/t0y01.png');
COMMIT;

-- ----------------------------
-- Table structure for resource
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource` (
                            `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT 'id',
                            `sort_class` int DEFAULT NULL COMMENT '所厲栏目Class',
                            `title` varchar(255) DEFAULT NULL COMMENT '文章标题',
                            `price` int DEFAULT NULL COMMENT '价格',
                            `res_address` varchar(255) DEFAULT NULL COMMENT '资源地址',
                            `res_password` varchar(255) DEFAULT NULL COMMENT '资源密码',
                            `is_free` tinyint(1) DEFAULT NULL COMMENT '是否免费',
                            `title_color` varchar(8) DEFAULT NULL COMMENT '标题颜色',
                            `titlefont_size` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '标题大小',
                            `titlefont_type` int DEFAULT NULL COMMENT '标题字形',
                            `full_title` varchar(255) DEFAULT NULL COMMENT '完整标题',
                            `subhead` varchar(255) DEFAULT NULL COMMENT '副标题',
                            `intro` varchar(255) DEFAULT NULL COMMENT '简介',
                            `content` longtext COMMENT '文章内容',
                            `author` varchar(20) DEFAULT NULL COMMENT '作者',
                            `copyfrom` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '来源',
                            `inputer` varchar(20) DEFAULT NULL COMMENT '录入者',
                            `http_url` varchar(255) DEFAULT NULL COMMENT '转向连接',
                            `keyword` varchar(255) DEFAULT NULL COMMENT '关健字',
                            `hits` int DEFAULT NULL COMMENT '点击数',
                            `post_num` int DEFAULT NULL COMMENT '评论数',
                            `love_num` int DEFAULT NULL COMMENT '喜欢数',
                            `comment_disabled` varchar(10) DEFAULT NULL COMMENT '是否评论',
                            `ontop` int DEFAULT NULL COMMENT '是否顶制',
                            `iselite` int DEFAULT NULL COMMENT '是否推荐',
                            `deleted` int DEFAULT NULL COMMENT '是否删除',
                            `add_time` datetime DEFAULT NULL COMMENT '添加时间',
                            `update_time` datetime DEFAULT NULL COMMENT '更新时间',
                            `create_time` datetime DEFAULT NULL COMMENT '生成时间',
                            `last_post` datetime DEFAULT NULL COMMENT '最后评论时间',
                            `owner_tag` int DEFAULT NULL COMMENT '重要性',
                            `owner_remark` varchar(1024) DEFAULT NULL COMMENT '自定义备注',
                            `html_path` varchar(255) DEFAULT NULL COMMENT 'htm地址',
                            `file_path` varchar(255) DEFAULT NULL COMMENT '上传文件地址',
                            `temp_path` varchar(255) DEFAULT NULL COMMENT '模板地址',
                            `carousel` varchar(1024) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '轮播图',
                            `thumb` varchar(255) DEFAULT NULL COMMENT '缩略图地址',
                            `status` varchar(25) DEFAULT NULL COMMENT '生成状态',
                            `article_status` int(10) unsigned zerofill NOT NULL COMMENT '文章状态身份',
                            PRIMARY KEY (`id`,`article_status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=909004 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of resource
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for resource_class
-- ----------------------------
DROP TABLE IF EXISTS `resource_class`;
CREATE TABLE `resource_class` (
                                  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT 'id',
                                  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '名称',
                                  `father` int DEFAULT NULL COMMENT '父级分类',
                                  `other_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '别名',
                                  `describes` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '描述',
                                  `imgclass` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '分类图片',
                                  `top` int DEFAULT NULL COMMENT '顶制',
                                  `num` int DEFAULT NULL COMMENT '资源数量',
                                  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1224 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of resource_class
-- ----------------------------
BEGIN;
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000020, '图形设计', NULL, 'graphics', NULL, 'https://www.hereitis.cn/profile/upload/2021/10/27/10cfe819-b854-4f40-ab4b-04896f5c73b7.jpg', NULL, NULL);
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000021, '开发工具', NULL, 'code', NULL, 'https://www.hereitis.cn/profile/upload/2021/10/27/f9a14f93-5fa0-40b7-98d8-68b61ff70e87.jpg', NULL, NULL);
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000022, '社交网络', NULL, 'social', NULL, 'https://www.hereitis.cn/profile/upload/2021/10/27/e975097a-d296-4b8b-962c-f7791c38a6c3.jpg', NULL, NULL);
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000023, '公用事业', NULL, 'utilities', NULL, 'https://www.hereitis.cn/profile/upload/2021/10/27/374990d3-c50a-4429-9ee7-30a9db66bcd3.jpg', NULL, NULL);
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000024, '商业', NULL, 'teach', '', 'https://www.hereitis.cn/profile/upload/2021/10/27/ee01fee2-84dd-4fc0-afbd-515d027325df.jpg', NULL, NULL);
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000025, '安全', NULL, 'Safety', NULL, 'https://www.hereitis.cn/profile/upload/2021/10/27/68f19b22-7823-4825-949a-bbd36e80cc7c.jpg', NULL, NULL);
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000026, '教育', NULL, 'education', NULL, 'https://www.hereitis.cn/profile/upload/2021/10/27/249fe79b-0bfa-4345-a4d7-45a7918ab018.jpg', NULL, NULL);
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000027, '设计', NULL, 'desion', NULL, 'https://www.hereitis.cn/profile/upload/2021/10/27/184f65a5-852b-4c49-87be-8709472ef90e.jpg', NULL, NULL);
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000028, '表现', NULL, 'Performance', NULL, 'https://www.hereitis.cn/profile/upload/2021/10/27/c3feaf8e-a785-4714-9ee2-6e15e96c7308.jpg', NULL, NULL);
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000029, '视频', NULL, 'video', NULL, 'https://www.hereitis.cn/profile/upload/2021/10/27/330b5c3a-4bfb-4cb6-a1a2-b472f65a642d.png', NULL, NULL);
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000030, '音乐', NULL, 'music', NULL, 'https://www.hereitis.cn/profile/upload/2021/10/27/a74e76c9-fb98-47e4-bee7-484e42e868dd.jpg', NULL, NULL);
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000031, '照片', NULL, 'photo', NULL, 'https://www.hereitis.cn/profile/upload/2021/10/27/ff0a46f7-b965-45ce-a901-7e2bf8e6f596.jpg', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for resource_comment
-- ----------------------------
DROP TABLE IF EXISTS `resource_comment`;
CREATE TABLE `resource_comment` (
                                    `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT 'id',
                                    `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '内容',
                                    `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '用户名',
                                    `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '邮箱',
                                    `add_time` datetime DEFAULT NULL COMMENT '创建时间',
                                    `parent_id` int DEFAULT NULL COMMENT '父id',
                                    `foreign_id` int DEFAULT NULL COMMENT '外部id',
                                    `profile` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '头像',
                                    `resource_id` int DEFAULT NULL COMMENT '文章id',
                                    `user_id` int DEFAULT NULL COMMENT '用户id',
                                    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

-- ----------------------------
-- Records of resource_comment
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
                        `id` int NOT NULL COMMENT 'id',
                        `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '名称',
                        `sort` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
                        PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO `role` (`id`, `name`, `sort`) VALUES (1, '订阅者', 'user:add');
INSERT INTO `role` (`id`, `name`, `sort`) VALUES (2, '管理员', 'admin:all');
INSERT INTO `role` (`id`, `name`, `sort`) VALUES (3, '会员', 'vip:get');
COMMIT;

-- ----------------------------
-- Table structure for setting
-- ----------------------------
DROP TABLE IF EXISTS `setting`;
CREATE TABLE `setting` (
                           `id` int NOT NULL COMMENT 'id',
                           `beian` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '备案号',
                           `banquan` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '版权©️',
                           `comment_show` int DEFAULT NULL COMMENT '评论显示',
                           `sit_title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '网站标题',
                           `sit_logo` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '网站Logo',
                           `image_format` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
                           `cos_intage` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '设置访问域名\n',
                           `cos_bucket_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '存储桶名称\n',
                           `cos_secret_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT 'secretId\n',
                           `cos_secret_key` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT 'secretKey\n',
                           `cos_client_config` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT 'bucket的区域\n',
                           `is_cos` int DEFAULT NULL,
                           PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

-- ----------------------------
-- Records of setting
-- ----------------------------
BEGIN;
INSERT INTO `setting` (`id`, `beian`, `banquan`, `comment_show`, `sit_title`, `sit_logo`, `image_format`, `cos_intage`, `cos_bucket_name`, `cos_secret_id`, `cos_secret_key`, `cos_client_config`, `is_cos`) VALUES (1, '鲁ICP备19036164号', 'Macwk.com © 2019. All rights reserved.', 0, 'IceCMS', 'http://127.0.0.1:8181/logistics/4c6335c9-6be6-4183-a10f-4b98fec6a312.png', '1', 'https://icewk-1305088812.cos.ap-nanjing.myqcloud.com', 'icewk-1305088812', 'AKIDjDRQDrRXcA7TfQNk9LO3EJchbFeneY4U', 'blgxyuiIfnCLaZXH5i6FB4gmDPilY8zb', 'ap-nanjing', 0);
COMMIT;

-- ----------------------------
-- Table structure for square
-- ----------------------------
DROP TABLE IF EXISTS `square`;
CREATE TABLE `square` (
                          `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT 'id',
                          `sort_class` int DEFAULT NULL COMMENT '所厲栏目Class',
                          `title` varchar(255) DEFAULT NULL COMMENT '文章标题',
                          `media` varchar(255) DEFAULT NULL,
                          `type` int DEFAULT NULL,
                          `title_color` varchar(8) DEFAULT NULL COMMENT '标题颜色',
                          `titlefont_size` varchar(2) DEFAULT NULL COMMENT '标题大小',
                          `titlefont_type` int DEFAULT NULL COMMENT '标题字形',
                          `content` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci COMMENT '内容',
                          `love_num` int DEFAULT NULL,
                          `author` int DEFAULT NULL COMMENT '作者id',
                          `copyfrom` varchar(20) DEFAULT NULL COMMENT '来源',
                          `inputer` varchar(20) DEFAULT NULL COMMENT '录入者',
                          `http_url` varchar(255) DEFAULT NULL COMMENT '转向连接',
                          `keyword` varchar(255) DEFAULT NULL COMMENT '关健字',
                          `hits` int DEFAULT NULL COMMENT '点击数',
                          `post_num` int DEFAULT NULL COMMENT '评论数',
                          `comment_disabled` varchar(10) DEFAULT NULL COMMENT '是否评论',
                          `ontop` int DEFAULT NULL COMMENT '是否顶制',
                          `iselite` int DEFAULT NULL COMMENT '是否推荐',
                          `deleted` int DEFAULT NULL COMMENT '是否删除',
                          `add_time` datetime DEFAULT NULL COMMENT '添加时间',
                          `update_time` datetime DEFAULT NULL COMMENT '更新时间',
                          `create_time` datetime DEFAULT NULL COMMENT '生成时间',
                          `last_post` datetime DEFAULT NULL COMMENT '最后评论时间',
                          `owner_tag` int DEFAULT NULL COMMENT '重要性',
                          `owner_remark` varchar(1024) DEFAULT NULL COMMENT '自定义备注',
                          `html_path` varchar(255) DEFAULT NULL COMMENT 'htm地址',
                          `file_path` varchar(255) DEFAULT NULL COMMENT '上传文件地址',
                          `temp_path` varchar(255) DEFAULT NULL COMMENT '模板地址',
                          `thumb` varchar(255) DEFAULT NULL COMMENT '缩略图地址',
                          `status` varchar(25) DEFAULT NULL COMMENT '生成状态',
                          PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=264 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of square
-- ----------------------------
BEGIN;
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`) VALUES (0000000241, 1, NULL, NULL, NULL, NULL, NULL, NULL, '123', 123, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-04-27 06:04:11', '2022-04-27 06:04:11', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`) VALUES (0000000242, 1, NULL, NULL, NULL, NULL, NULL, NULL, '<p>123321</p>', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-04-27 06:10:11', '2022-04-27 06:10:11', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`) VALUES (0000000243, 1, NULL, NULL, NULL, NULL, NULL, NULL, '<p>123321</p>', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-04-27 06:10:12', '2022-04-27 06:10:12', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`) VALUES (0000000244, 1, NULL, NULL, NULL, NULL, NULL, NULL, '<p>mm</p>', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-04-27 07:45:16', '2022-04-27 07:45:16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`) VALUES (0000000245, 1, NULL, NULL, NULL, NULL, NULL, NULL, '<p>mmkk</p>', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-04-27 07:45:26', '2022-04-27 07:45:26', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`) VALUES (0000000246, 1, NULL, NULL, NULL, NULL, NULL, NULL, '<p><strong>kjh</strong></p>', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-04-27 07:46:01', '2022-04-27 07:46:01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`) VALUES (0000000247, 1, NULL, NULL, NULL, NULL, NULL, NULL, '<p><strong>kjh<img src=\"https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/plugins/emoticons/img/smiley-innocent.gif\" alt=\"innocent\" /></strong></p>', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-04-27 07:46:10', '2022-04-27 07:46:10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`) VALUES (0000000248, 1, NULL, NULL, NULL, NULL, NULL, NULL, '<p>测试</p>', NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-05-02 14:21:04', '2022-05-02 14:21:04', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`) VALUES (0000000249, 1, NULL, NULL, NULL, NULL, NULL, NULL, '<p>ceshi</p>', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-05-02 14:27:12', '2022-05-02 14:27:12', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`) VALUES (0000000250, 1, NULL, NULL, NULL, NULL, NULL, NULL, '<p>最新</p>', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-05-02 14:40:27', '2022-05-02 14:40:27', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`) VALUES (0000000251, 1, NULL, NULL, NULL, NULL, NULL, NULL, '<p>asd12</p>', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-24 14:35:16', '2022-07-24 14:35:16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`) VALUES (0000000252, 1, NULL, NULL, NULL, NULL, NULL, NULL, '', 1, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-11 14:55:28', '2022-08-11 14:55:28', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`) VALUES (0000000253, 1, NULL, NULL, NULL, NULL, NULL, NULL, '123', 154, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-12 18:13:45', '2022-08-12 18:13:45', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`) VALUES (0000000254, 2, NULL, NULL, NULL, NULL, NULL, NULL, '你好', 123, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-12 21:03:40', '2022-08-12 21:03:40', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`) VALUES (0000000255, 1, NULL, NULL, NULL, NULL, NULL, NULL, '123', NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-14 13:45:24', '2022-08-14 13:45:24', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`) VALUES (0000000256, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'add', NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-14 13:45:33', '2022-08-14 13:45:33', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`) VALUES (0000000257, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'add', 3, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-14 13:49:50', '2022-08-14 13:49:50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`) VALUES (0000000258, 2, NULL, NULL, NULL, NULL, NULL, NULL, '123', NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-14 13:51:48', '2022-08-14 13:51:48', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`) VALUES (0000000261, 1, '', NULL, NULL, NULL, NULL, NULL, '123', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-28 16:30:04', '2022-08-31 14:52:38', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`) VALUES (0000000263, 1, '', NULL, NULL, NULL, NULL, NULL, '圈子内容', 26, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-28 16:32:40', '2022-08-31 14:52:56', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for square_class
-- ----------------------------
DROP TABLE IF EXISTS `square_class`;
CREATE TABLE `square_class` (
                                `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT 'id',
                                `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '名称',
                                `is_free` int DEFAULT NULL,
                                `price` int DEFAULT NULL,
                                `father` int DEFAULT NULL COMMENT '父级分类',
                                `other_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '别名',
                                `describes` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '描述',
                                `imgclass` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '分类图片',
                                `top` int DEFAULT NULL COMMENT '顶制',
                                `num` int DEFAULT NULL COMMENT '圈子数量',
                                PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of square_class
-- ----------------------------
BEGIN;
INSERT INTO `square_class` (`id`, `name`, `is_free`, `price`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000001, '广场', NULL, NULL, NULL, 'circle', NULL, 'https://www.zmki.cn/wp-content/uploads/2021/06/1bd160d7cbf317_1_avatar.png', NULL, NULL);
INSERT INTO `square_class` (`id`, `name`, `is_free`, `price`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000002, '闲聊', NULL, NULL, NULL, 'liaoliao', NULL, 'https://static.7b2.com/wp-content/uploads/2021/06/4397f4d8566c1b0f_1_avatar.jpg?x-oss-process=image/resize,m_fill,h_120,w_120/sharpen,120/format,webp', NULL, NULL);
INSERT INTO `square_class` (`id`, `name`, `is_free`, `price`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000003, '编程', NULL, NULL, NULL, 'code', NULL, 'https://static.7b2.com/wp-content/uploads/2020/08/58ee7e73540f8e9_1_circle.png?x-oss-process=image/resize,m_fill,h_120,w_120/sharpen,120/format,webp', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for square_comment
-- ----------------------------
DROP TABLE IF EXISTS `square_comment`;
CREATE TABLE `square_comment` (
                                  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'id',
                                  `parent_id` int DEFAULT '0' COMMENT '父级id',
                                  `type` int NOT NULL DEFAULT '1' COMMENT '评论类型:1帖子',
                                  `user_id` bigint NOT NULL DEFAULT '0' COMMENT '评论作者ID',
                                  `to_user_id` int DEFAULT '0' COMMENT '被回复用户ID',
                                  `post_id` bigint NOT NULL DEFAULT '0' COMMENT '评论帖子ID',
                                  `content` varchar(255) NOT NULL DEFAULT '' COMMENT '评论内容',
                                  `love_num` int DEFAULT NULL,
                                  `status` tinyint DEFAULT '1' COMMENT '评论状态',
                                  `add_time` datetime DEFAULT NULL,
                                  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of square_comment
-- ----------------------------
BEGIN;
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (1, 0, 1, 3, 0, 5, '哈哈哈哈', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (2, 0, 1, 3, 0, 5, '嘿嘿嘿', 2, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (3, 2, 1, 3, 3, 5, '嗡嗡嗡', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (4, 2, 1, 3, 3, 5, '哔哔哔', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (5, 0, 1, 3, 0, 2, 'nice', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (6, 0, 1, 3, 0, 2, '哇哇哇哇', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (7, 5, 1, 3, 3, 2, '我偶哦哦', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (8, 0, 1, 3, 0, 11, '哈哈', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (9, 0, 1, 3, 0, 252, '嗯嗯', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (10, 0, 1, 4, 0, 252, '哈哈', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (11, 0, 1, 4, 0, 251, '哈哈哈', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (12, 0, 1, 4, 0, 13, '啊啊啊', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (13, 8, 1, 4, 3, 11, '嘿嘿嘿', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (14, 0, 1, 4, 3, 11, '噢噢噢噢', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (15, 8, 1, 4, 3, 11, '你好', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (16, 0, 1, 4, 0, 13, '嗯嗯嗯嗯', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (17, 0, 1, 4, 0, 252, 'ok', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (18, 0, 1, 4, 0, 13, 'ok', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (19, 14, 1, 4, 0, 11, '比比来来', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (20, 0, 1, 4, 0, 13, '哈哈哈哈哈哈哈哈哈哈哈哈哈', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (21, 0, 1, 4, 0, 11, '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (22, 8, 1, 4, 3, 11, '噢噢噢噢哦哦哦', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (25, 0, 1, 3, 0, 17, 'nice', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (26, 0, 1, 4, 0, 252, '?', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (27, 9, 1, 3, 4, 252, '哔哔哔', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (28, 0, 1, 3, 0, 16, '哈哈哈', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (29, 23, 1, 3, 3, 16, '皮皮怕', NULL, 0, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (30, 11, 1, 3, 4, 15, '你测', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (31, 0, 1, 4, 0, 15, '哦哦哦', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (32, 25, 1, 3, 3, 17, '哈哈', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (33, 20, 1, 3, 4, 13, '哦哦', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (34, 0, 1, 6, 0, 16, '一亿元', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (35, 0, 1, 6, 0, 17, '特色图', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (36, 0, 1, 3, 0, 253, '123', 2, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (37, 0, 1, 3, 0, 253, '321', 1, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (38, 0, 1, 3, 0, 252, '123', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (39, 0, 1, 0, 0, 0, '123', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (40, 0, 1, 0, 0, 0, '123', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (41, 0, 1, 3, 0, 0, '123', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (42, 0, 1, 3, 0, 0, '123', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (43, 0, 1, 3, 0, 254, '123', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (44, 0, 1, 0, 0, 0, '123', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (45, 3, 1, 3, 0, 254, 'ok', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (46, 43, 1, 3, 0, 254, 'ikle', 8, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (47, 43, 1, 3, 0, 254, 'ok', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (49, 46, 1, 3, 3, 254, 'okk', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (50, 43, 1, 3, 3, 254, '123', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (51, 0, 1, 4, 0, 254, '123', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (52, 43, 1, 4, 0, 254, '123', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (53, 43, 1, 4, 3, 254, '123', NULL, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (54, 36, 1, 4, 0, 253, 'ok', 4, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (55, 36, 1, 4, 0, 253, 'ok', 4, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (56, 36, 1, 4, 0, 253, 'ok', 4, 1, NULL);
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (57, 36, 1, 4, 0, 253, 'ok', 5, 1, '2022-08-12 22:18:57');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (58, 43, 1, 4, 0, 254, '123', 4, 1, '2022-08-12 23:51:17');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (59, 0, 1, 4, 0, 253, '123', 6, 1, '2022-08-12 23:51:39');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (61, 0, 1, 0, 0, 254, '123', 4, 1, '2022-08-13 00:54:35');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (62, 0, 1, 0, 0, 254, '123', 4, 1, '2022-08-13 00:54:45');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (63, 0, 1, 0, 0, 254, '123', 4, 1, '2022-08-13 00:54:46');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (64, 0, 1, 4, 0, 248, '今年健康', 9, 1, '2022-08-14 07:26:27');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (65, 0, 1, 4, 0, 253, '不过', NULL, 1, '2022-08-14 09:58:24');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (66, 0, 1, 4, 0, 253, '123', 3, 1, '2022-08-14 09:59:35');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (67, 66, 1, 4, 0, 253, 'ok', NULL, 1, '2022-08-14 09:59:48');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (68, 0, 1, 4, 0, 253, '123', NULL, 1, '2022-08-14 13:59:06');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (69, 0, 1, 4, 0, 257, '321', NULL, 1, '2022-08-14 13:59:17');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (70, 0, 1, 4, 0, 257, '123', NULL, 1, '2022-08-14 14:02:13');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (71, 0, 1, 4, 0, 257, 'ok', NULL, 1, '2022-08-14 14:02:26');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (72, 0, 1, 4, 0, 257, 'okk', NULL, 1, '2022-08-14 14:04:15');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (73, 36, 1, 0, 4, 253, '213', NULL, 1, '2022-08-27 21:21:09');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (74, 0, 1, 3, 0, 263, '123', NULL, 1, '2022-08-28 18:39:01');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (75, 0, 1, 3, 0, 263, 'ok', NULL, 1, '2022-08-28 18:39:58');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (76, 0, 1, 3, 0, 263, '123', NULL, 1, '2022-08-28 18:40:37');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (77, 0, 1, 3, 0, 263, 'ok来了', NULL, 1, '2022-08-28 18:41:02');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (78, 0, 1, 3, 0, 263, 'ok', NULL, 1, '2022-08-28 18:42:14');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (79, 0, 1, 3, 0, 263, '123', NULL, 1, '2022-08-28 18:44:46');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (80, 0, 1, 3, 0, 263, '123', NULL, 1, '2022-08-28 18:45:02');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (81, 0, 1, 3, 0, 263, '123', NULL, 1, '2022-08-28 18:45:20');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (82, 0, 1, 3, 0, 263, '123', NULL, 1, '2022-08-28 18:45:36');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (83, 0, 1, 3, 0, 263, '123', NULL, 1, '2022-08-28 18:45:48');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (84, 0, 1, 3, 0, 263, '123', NULL, 1, '2022-08-28 18:46:13');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (85, 0, 1, 3, 0, 263, '123', NULL, 1, '2022-08-28 18:46:27');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (86, 0, 1, 3, 0, 263, '123', NULL, 1, '2022-08-28 18:46:36');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (87, 0, 1, 3, 0, 263, '123', NULL, 1, '2022-08-28 18:46:44');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (88, 0, 1, 3, 0, 263, 'ok', NULL, 1, '2022-08-28 18:46:48');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (89, 0, 1, 3, 0, 263, '123', NULL, 1, '2022-08-28 18:47:13');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (90, 0, 1, 3, 0, 263, 'ok', NULL, 1, '2022-08-28 18:47:22');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (91, 0, 1, 3, 0, 263, 'asd', NULL, 1, '2022-08-28 18:47:31');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (92, 0, 1, 3, 0, 263, 'ok', NULL, 1, '2022-08-28 18:48:40');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (93, 0, 1, 3, 0, 263, '123', NULL, 1, '2022-08-28 19:13:17');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (94, 0, 1, 3, 0, 263, '123', NULL, 1, '2022-08-28 19:13:36');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (95, 0, 1, 3, 0, 263, '123', NULL, 1, '2022-08-28 19:13:43');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (96, 0, 1, 3, 0, 263, 'asd', NULL, 1, '2022-08-28 19:13:47');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (97, 0, 1, 3, 0, 263, '123', NULL, 1, '2022-08-28 19:14:22');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (98, 0, 1, 3, 0, 263, '123', NULL, 1, '2022-08-28 19:14:31');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (99, 0, 1, 3, 0, 263, '123', NULL, 1, '2022-08-28 19:15:13');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (100, 0, 1, 3, 0, 263, 'asd', NULL, 1, '2022-08-28 19:15:25');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (101, 0, 1, 3, 0, 263, 'ook', NULL, 1, '2022-08-28 19:15:57');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (102, 0, 1, 3, 0, 263, 'OK', NULL, 1, '2022-08-28 19:17:44');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (103, 0, 1, 3, 0, 263, '123', NULL, 1, '2022-08-28 19:18:31');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (104, 103, 1, 3, 3, 263, 'asd', NULL, 1, '2022-08-28 19:29:45');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (105, 0, 1, 3, 3, 263, 'ok', NULL, 1, '2022-08-28 19:32:33');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (106, 0, 1, 3, 3, 263, 'asd', NULL, 1, '2022-08-28 19:33:54');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (107, 0, 1, 3, 0, 263, 'asd', NULL, 1, '2022-08-28 19:34:30');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (108, 107, 1, 3, 3, 263, 'asd', NULL, 1, '2022-08-28 19:35:55');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (109, 107, 1, 3, 3, 263, '666', NULL, 1, '2022-08-28 19:49:51');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (110, 0, 1, 3, 0, 263, '12', NULL, 1, '2022-08-28 19:52:59');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (111, 0, 1, 3, 0, 263, 'asd', NULL, 1, '2022-08-28 19:54:22');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (112, 0, 1, 3, 0, 263, 'k', NULL, 1, '2022-08-28 19:55:41');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (113, 0, 1, 3, 0, 263, '2', NULL, 1, '2022-08-28 19:56:23');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (114, 0, 1, 3, 0, 263, '2', NULL, 1, '2022-08-28 19:56:58');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (115, 0, 1, 3, 0, 263, '666', 14, 1, '2022-08-28 19:57:08');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (116, 115, 1, 3, 3, 263, 'jjk', NULL, 1, '2022-08-28 19:57:13');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (117, 115, 1, 3, 3, 263, 'jj', 2, 1, '2022-08-28 19:57:49');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (118, 0, 1, 4, 0, 263, '666', NULL, 1, '2022-08-29 09:15:36');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (121, 115, 1, 2, 4, 263, '666', NULL, 1, '2022-08-29 09:17:00');
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (122, 0, 1, 2, 0, 263, 'ok', 1, 1, '2022-08-29 11:16:28');
COMMIT;

-- ----------------------------
-- Table structure for t_order_info
-- ----------------------------
DROP TABLE IF EXISTS `t_order_info`;
CREATE TABLE `t_order_info` (
                                `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '订单id',
                                `title` varchar(256) DEFAULT NULL COMMENT '订单标题',
                                `order_no` varchar(50) DEFAULT NULL COMMENT '商户订单编号',
                                `user_id` bigint DEFAULT NULL COMMENT '用户id',
                                `pay_ment` varchar(255) DEFAULT NULL COMMENT '支付方式',
                                `product_id` bigint DEFAULT NULL COMMENT '支付产品id',
                                `total_fee` int DEFAULT NULL COMMENT '订单金额(分)',
                                `code_url` varchar(50) DEFAULT NULL COMMENT '订单二维码连接',
                                `order_status` varchar(10) DEFAULT NULL COMMENT '订单状态',
                                `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                                `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
                                `already_done` int DEFAULT NULL COMMENT '已完成',
                                PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=327 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of t_order_info
-- ----------------------------
BEGIN;
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (277, '这是我的第一篇文章名', 'ORDER_20220510222507595', 3, '微信', 189, 1, 'weixin://wxpay/bizpayurl?pr=dY3MFX4zz', '超时已关闭', '2022-05-10 22:25:07', '2022-05-11 10:04:02', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (278, '123', 'ORDER_20220531185941718', 3, '微信', 242, 123, 'weixin://wxpay/bizpayurl?pr=UqSipAfzz', '超时已关闭', '2022-05-31 18:59:41', '2022-06-01 03:08:51', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (279, '123', 'ORDER_20220531185952202', 3, '支付宝', 242, 123, 'https://qr.alipay.com/bax02183kxpss6150lbe00dc', '超时已关闭', '2022-05-31 18:59:52', '2022-06-05 21:54:36', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (280, 'JetBrains全系列软件激活教程激活码以及JetBrains系列软件汉化包', 'ORDER_20220531190534187', 3, '微信', 217, 2, 'weixin://wxpay/bizpayurl?pr=j3rcEZyzz', '超时已关闭', '2022-05-31 19:05:34', '2022-06-01 03:08:53', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (281, 'JetBrains全系列软件激活教程激活码以及JetBrains系列软件汉化包', 'ORDER_20220531190630201', 3, '支付宝', 217, 2, 'https://qr.alipay.com/bax02698k2tky0yptwzi003e', '超时已关闭', '2022-05-31 19:06:30', '2022-06-05 21:54:36', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (282, '123', 'ORDER_20220602175937972', 3, '微信', 243, 50, 'weixin://wxpay/bizpayurl?pr=xVuDEiHzz', '超时已关闭', '2022-06-02 17:59:37', '2022-06-03 02:39:31', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (283, 'vue组件之间传值的方式123', 'ORDER_20220602233931119', 3, '微信', 233, 3, 'weixin://wxpay/bizpayurl?pr=oscxp9Rzz', '超时已关闭', '2022-06-02 23:39:31', '2022-06-03 07:41:01', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (284, '积分充值', 'ORDER_20220605180420908', 3, '微信', 1, 2, 'weixin://wxpay/bizpayurl?pr=hRmuAVKzz', '超时已关闭', '2022-06-05 18:06:09', '2022-06-06 02:41:31', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (285, '积分充值', 'ORDER_20220605181424365', 3, '微信', 1, 1, 'weixin://wxpay/bizpayurl?pr=IKSWi3pzz', '超时已关闭', '2022-06-05 18:14:24', '2022-06-06 02:41:32', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (286, '积分充值', 'ORDER_20220605181741261', 3, '微信', 1, 3, 'weixin://wxpay/bizpayurl?pr=2JPYLRzzz', '超时已关闭', '2022-06-05 18:17:41', '2022-06-06 02:41:33', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (287, '积分充值', 'ORDER_20220605215543279', 3, '微信', 1, 4, 'weixin://wxpay/bizpayurl?pr=On6YDMuzz', '支付成功', '2022-06-05 21:55:43', '2022-06-05 21:58:56', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (288, '积分充值', 'ORDER_20220605220517526', 3, '微信', 1, 400, 'weixin://wxpay/bizpayurl?pr=ClM3uo2zz', '超时已关闭', '2022-06-05 22:05:17', '2022-06-06 06:12:51', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (289, '积分充值', 'ORDER_20220605221534802', 3, '微信', 1, 5, 'weixin://wxpay/bizpayurl?pr=jpt2xYszz', '支付成功', '2022-06-05 22:15:34', '2022-06-05 22:25:14', 1);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (290, '积分充值', 'ORDER_20220605222939062', 3, '微信', 1, 5, 'weixin://wxpay/bizpayurl?pr=JLEj4b9zz', '支付成功', '2022-06-05 22:29:39', '2022-06-05 22:30:13', 1);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (291, '123', 'ORDER_20220605223356043', 3, '微信', 243, 50, 'weixin://wxpay/bizpayurl?pr=5OgXDw2zz', '超时已关闭', '2022-06-05 22:33:56', '2022-06-06 06:43:17', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (292, '会员购买(月费)', 'ORDER_20220606034911954', 3, '微信', 2, 20, 'weixin://wxpay/bizpayurl?pr=rjDG9mXzz', '超时已关闭', '2022-06-06 03:49:11', '2022-06-06 11:57:19', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (293, '会员购买(月费)', 'ORDER_20220606135933373', 3, '微信', 2, 20, 'weixin://wxpay/bizpayurl?pr=HxWkCgBzz', '支付成功', '2022-06-06 13:59:33', '2022-06-06 14:01:30', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (294, '会员购买(月费)', 'ORDER_20220606140529349', 3, '微信', 2, 20, 'weixin://wxpay/bizpayurl?pr=xZcYFMdzz', '支付成功', '2022-06-06 14:05:29', '2022-06-06 14:15:31', 1);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (295, '积分充值', 'ORDER_20220606162400702', 3, '支付宝', 1, 20, 'https://qr.alipay.com/bax09863nnqgt3uxbiof008e', '支付成功', '2022-06-06 16:24:00', '2022-06-06 16:32:11', 1);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (296, '积分充值', 'ORDER_20220606163512521', 3, '微信', 1, 23, 'weixin://wxpay/bizpayurl?pr=VHBNoaozz', '超时已关闭', '2022-06-06 16:35:12', '2022-06-06 17:09:17', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (300, '会员购买(月费)', 'ORDER_20220606164028861', 3, '微信', 2, 20, 'weixin://wxpay/bizpayurl?pr=UMzQiWozz', '超时已关闭', '2022-06-06 16:40:28', '2022-06-06 17:09:18', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (301, '积分充值', 'ORDER_20220606164233379', 3, '微信', 1, 12, 'weixin://wxpay/bizpayurl?pr=WM482Gxzz', '超时已关闭', '2022-06-06 16:42:33', '2022-06-06 17:09:18', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (302, '积分充值', 'ORDER_20220606164256858', 3, '支付宝', 1, 12, 'https://qr.alipay.com/bax01699ibynolsznmol00af', '超时已关闭', '2022-06-06 16:42:56', '2022-06-06 17:09:19', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (303, '会员购买(月费)', 'ORDER_20220606165722911', 3, '支付宝', 2, 20, 'https://qr.alipay.com/bax074853sn347ypbtxg0098', '支付成功', '2022-06-06 16:57:22', '2022-06-06 16:58:27', 1);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (304, '123', 'ORDER_20220630175216188', 3, '支付宝', 243, 50, 'https://qr.alipay.com/bax014080ex37stc2cqh000e', '超时已关闭', '2022-06-30 17:52:16', '2022-06-30 17:52:30', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (305, 'vue组件之间传值的方式123', 'ORDER_20220630175614998', 3, '支付宝', 233, 3, NULL, '超时已关闭', '2022-06-30 17:56:14', '2022-06-30 17:56:30', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (306, 'Github上传操作-push-pull-delete', 'ORDER_20220630180305476', 3, '支付宝', 229, 100, NULL, '超时已关闭', '2022-06-30 18:03:05', '2022-06-30 18:03:30', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (307, 'JetBrains全系列软件激活教程激活码以及JetBrains系列软件汉化包', 'ORDER_20220630180901882', 3, '支付宝', 217, 2, 'https://qr.alipay.com/bax00246yfxujr1ov67p5548', '支付成功', '2022-06-30 18:09:01', '2022-06-30 18:09:30', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (308, '这是我的第一篇文章名', 'ORDER_20220630181403409', 3, '支付宝', 189, 1, 'https://qr.alipay.com/bax00537wvn3wi8frjgq2539', '超时已关闭', '2022-06-30 18:14:03', '2022-06-30 18:14:30', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (309, '123', 'ORDER_20220803144313091', 3, '支付宝', 242, 123, 'https://qr.alipay.com/bax03832vgylr1ax5l06006b', '超时已关闭', '2022-08-03 14:43:13', '2022-08-03 14:43:30', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (310, 'vue组件之间传值的方式123', 'ORDER_20220803144321295', 3, '微信', 233, 3, 'weixin://wxpay/bizpayurl?pr=XPLGjyXzz', '超时已关闭', '2022-08-03 14:43:21', '2022-08-03 14:43:30', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (311, '这是我的第一篇文章名', 'ORDER_20220805034943683', 3, '支付宝', 189, 1, 'https://qr.alipay.com/bax05515brwj9vn8vase0041', '超时已关闭', '2022-08-05 03:49:43', '2022-08-05 03:50:00', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (312, 'JetBrains全系列软件激活教程激活码以及JetBrains系列软件汉化包', 'ORDER_20220805035207053', 3, '支付宝', 217, 2, 'https://qr.alipay.com/bax07478blgmfw8w0l4v3043', '超时已关闭', '2022-08-05 03:52:07', '2022-08-05 03:52:30', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (313, '123', 'ORDER_20220805035538390', 3, '支付宝', 243, 50, 'https://qr.alipay.com/bax09897ouam2hm7inof3091', '超时已关闭', '2022-08-05 03:55:38', '2022-08-05 03:56:00', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (314, '123', 'ORDER_20220805035541120', 3, '微信', 243, 50, 'weixin://wxpay/bizpayurl?pr=2tG2IWLzz', '超时已关闭', '2022-08-05 03:55:41', '2022-08-05 03:56:01', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (315, '123', 'ORDER_20220818221658929', 4, '支付宝', 243, 50, 'https://qr.alipay.com/bax05547eqvet2ivmdr53077', '超时已关闭', '2022-08-18 22:16:58', '2022-08-18 22:17:00', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (316, '123', 'ORDER_20220919215105100', NULL, '支付宝', 243, 50, NULL, '超时已关闭', '2022-09-19 21:51:05', '2022-09-19 22:35:31', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (317, 'Github上传操作-push-pull-delete', 'ORDER_20221017233739799', NULL, '支付宝', 229, 100, 'https://qr.alipay.com/bax01784rzbqnphn5shk002e', '超时已关闭', '2022-10-17 23:37:39', '2022-10-17 23:38:00', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (318, 'Github上传操作-push-pull-delete', 'ORDER_20221017233743040', NULL, '微信', 229, 100, 'weixin://wxpay/bizpayurl?pr=ZVjoTNgzz', '超时已关闭', '2022-10-17 23:37:43', '2022-10-17 23:38:01', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (319, 'JetBrains全系列软件激活教程激活码以及JetBrains系列软件汉化包', 'ORDER_20221113180002772', NULL, '支付宝', 217, 2, 'https://qr.alipay.com/bax01747dzualubiq4yz2514', '超时已关闭', '2022-11-13 18:00:02', '2022-11-13 18:00:30', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (320, 'Artstudio Pro', 'ORDER_20221115221734512', NULL, '支付宝', 290, 0, NULL, '超时已关闭', '2022-11-15 22:17:34', '2022-11-15 22:18:00', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (321, 'CleanMyMac X', 'ORDER_20221118233203258', 3, '支付宝', 908871, 0, NULL, '超时已关闭', '2022-11-18 23:32:04', '2022-11-18 23:32:30', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (322, 'Java课程', 'ORDER_20221201202726429', NULL, '微信', 1, 1, 'weixin://wxpay/bizpayurl?pr=50u4zSmzz', '超时已关闭', '2022-12-01 20:27:26', '2022-12-01 20:27:30', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (323, 'Java课程', 'ORDER_20221201202729109', NULL, '支付宝', 1, 1, 'https://qr.alipay.com/bax01187hx6gx0yljtt33089', '超时已关闭', '2022-12-01 20:27:29', '2022-12-01 20:27:30', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (324, 'Java课程', 'ORDER_20221203224439082', NULL, '微信', 1, 1, 'weixin://wxpay/bizpayurl?pr=RRWpE3Pzz', '超时已关闭', '2022-12-03 22:44:39', '2022-12-03 22:45:00', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (325, 'Java课程', 'ORDER_20221203224443373', NULL, '支付宝', 1, 1, 'https://qr.alipay.com/bax03951lgoserrfvtia555e', '超时已关闭', '2022-12-03 22:44:43', '2022-12-03 22:45:00', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (326, 'Java课程', 'ORDER_20221203224510825', NULL, '微信', 1, 1, 'weixin://wxpay/bizpayurl?pr=mcXuICPzz', '超时已关闭', '2022-12-03 22:45:10', '2022-12-03 22:45:30', NULL);
COMMIT;

-- ----------------------------
-- Table structure for t_payment_info
-- ----------------------------
DROP TABLE IF EXISTS `t_payment_info`;
CREATE TABLE `t_payment_info` (
                                  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '支付记录id',
                                  `order_no` varchar(50) DEFAULT NULL COMMENT '商户订单编号',
                                  `transaction_id` varchar(50) DEFAULT NULL COMMENT '支付系统交易编号',
                                  `payment_type` varchar(20) DEFAULT NULL COMMENT '支付类型',
                                  `trade_type` varchar(20) DEFAULT NULL COMMENT '交易类型',
                                  `trade_state` varchar(50) DEFAULT NULL COMMENT '交易状态',
                                  `payer_total` int DEFAULT NULL COMMENT '支付金额(分)',
                                  `content` text COMMENT '通知参数',
                                  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                                  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
                                  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of t_payment_info
-- ----------------------------
BEGIN;
INSERT INTO `t_payment_info` (`id`, `order_no`, `transaction_id`, `payment_type`, `trade_type`, `trade_state`, `payer_total`, `content`, `create_time`, `update_time`) VALUES (51, 'ORDER_20220422164352645', '4200001320202204222231800638', '微信', 'NATIVE', 'SUCCESS', 2, '{\"mchid\":\"1610742906\",\"appid\":\"wxe8abca8c68efe7c7\",\"out_trade_no\":\"ORDER_20220422164352645\",\"transaction_id\":\"4200001320202204222231800638\",\"trade_type\":\"NATIVE\",\"trade_state\":\"SUCCESS\",\"trade_state_desc\":\"支付成功\",\"bank_type\":\"OTHERS\",\"attach\":\"\",\"success_time\":\"2022-04-22T16:44:03+08:00\",\"payer\":{\"openid\":\"o2ePa5LTprhc-zT9FAcuvq_htqDA\"},\"amount\":{\"total\":2,\"payer_total\":2,\"currency\":\"CNY\",\"payer_currency\":\"CNY\"}}', '2022-04-22 16:44:06', '2022-04-22 16:44:06');
INSERT INTO `t_payment_info` (`id`, `order_no`, `transaction_id`, `payment_type`, `trade_type`, `trade_state`, `payer_total`, `content`, `create_time`, `update_time`) VALUES (52, 'ORDER_20220422164713642', '4200001322202204220915270945', '微信', 'NATIVE', 'SUCCESS', 3, '{\"mchid\":\"1610742906\",\"appid\":\"wxe8abca8c68efe7c7\",\"out_trade_no\":\"ORDER_20220422164713642\",\"transaction_id\":\"4200001322202204220915270945\",\"trade_type\":\"NATIVE\",\"trade_state\":\"SUCCESS\",\"trade_state_desc\":\"支付成功\",\"bank_type\":\"OTHERS\",\"attach\":\"\",\"success_time\":\"2022-04-22T16:47:24+08:00\",\"payer\":{\"openid\":\"o2ePa5LTprhc-zT9FAcuvq_htqDA\"},\"amount\":{\"total\":3,\"payer_total\":3,\"currency\":\"CNY\",\"payer_currency\":\"CNY\"}}', '2022-04-22 16:47:26', '2022-04-22 16:47:26');
INSERT INTO `t_payment_info` (`id`, `order_no`, `transaction_id`, `payment_type`, `trade_type`, `trade_state`, `payer_total`, `content`, `create_time`, `update_time`) VALUES (53, 'ORDER_20220422164821941', '4200001470202204221171102395', '微信', 'NATIVE', 'SUCCESS', 1, '{\"mchid\":\"1610742906\",\"appid\":\"wxe8abca8c68efe7c7\",\"out_trade_no\":\"ORDER_20220422164821941\",\"transaction_id\":\"4200001470202204221171102395\",\"trade_type\":\"NATIVE\",\"trade_state\":\"SUCCESS\",\"trade_state_desc\":\"支付成功\",\"bank_type\":\"OTHERS\",\"attach\":\"\",\"success_time\":\"2022-04-22T16:50:33+08:00\",\"payer\":{\"openid\":\"o2ePa5LTprhc-zT9FAcuvq_htqDA\"},\"amount\":{\"total\":1,\"payer_total\":1,\"currency\":\"CNY\",\"payer_currency\":\"CNY\"}}', '2022-04-22 16:50:36', '2022-04-22 16:50:36');
INSERT INTO `t_payment_info` (`id`, `order_no`, `transaction_id`, `payment_type`, `trade_type`, `trade_state`, `payer_total`, `content`, `create_time`, `update_time`) VALUES (54, 'ORDER_20220422171904158', '2022042222001497720502360404', '支付宝', 'trade_status_sync', 'TRADE_SUCCESS', 2, '[{\"amount\":\"0.02\",\"fundChannel\":\"ALIPAYACCOUNT\"}]', '2022-04-22 17:20:18', '2022-04-22 17:20:18');
INSERT INTO `t_payment_info` (`id`, `order_no`, `transaction_id`, `payment_type`, `trade_type`, `trade_state`, `payer_total`, `content`, `create_time`, `update_time`) VALUES (55, 'ORDER_20220509094251749', '4200001482202205099401418654', '微信', 'NATIVE', 'SUCCESS', 2, '{\"amount\":{\"currency\":\"CNY\",\"payer_currency\":\"CNY\",\"payer_total\":2,\"total\":2},\"appid\":\"wxe8abca8c68efe7c7\",\"attach\":\"\",\"bank_type\":\"ICBC_DEBIT\",\"mchid\":\"1610742906\",\"out_trade_no\":\"ORDER_20220509094251749\",\"payer\":{\"openid\":\"o2ePa5LTprhc-zT9FAcuvq_htqDA\"},\"promotion_detail\":[],\"success_time\":\"2022-05-09T09:43:18+08:00\",\"trade_state\":\"SUCCESS\",\"trade_state_desc\":\"支付成功\",\"trade_type\":\"NATIVE\",\"transaction_id\":\"4200001482202205099401418654\"}', '2022-05-10 21:16:05', '2022-05-10 21:16:05');
INSERT INTO `t_payment_info` (`id`, `order_no`, `transaction_id`, `payment_type`, `trade_type`, `trade_state`, `payer_total`, `content`, `create_time`, `update_time`) VALUES (56, 'ORDER_20220630180901882', '2022063022001408751451786487', '支付宝', 'trade_status_sync', 'TRADE_SUCCESS', 2, 'text', '2022-06-30 18:09:30', '2022-06-30 18:09:30');
COMMIT;

-- ----------------------------
-- Table structure for t_product
-- ----------------------------
DROP TABLE IF EXISTS `t_product`;
CREATE TABLE `t_product` (
                             `id` bigint NOT NULL AUTO_INCREMENT COMMENT '商品id',
                             `title` varchar(20) DEFAULT NULL COMMENT '商品名称',
                             `price` int DEFAULT NULL COMMENT '价格（分）',
                             `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                             `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
                             PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of t_product
-- ----------------------------
BEGIN;
INSERT INTO `t_product` (`id`, `title`, `price`, `create_time`, `update_time`) VALUES (1, 'Java课程', 1, '2022-03-21 17:36:28', '2022-03-24 15:12:45');
INSERT INTO `t_product` (`id`, `title`, `price`, `create_time`, `update_time`) VALUES (2, '大数据课程', 1, '2022-03-21 17:36:28', '2022-03-21 17:36:28');
INSERT INTO `t_product` (`id`, `title`, `price`, `create_time`, `update_time`) VALUES (3, '前端课程', 1, '2022-03-21 17:36:28', '2022-03-21 17:36:28');
INSERT INTO `t_product` (`id`, `title`, `price`, `create_time`, `update_time`) VALUES (4, 'UI课程', 1, '2022-03-21 17:36:28', '2022-03-21 17:36:28');
COMMIT;

-- ----------------------------
-- Table structure for t_refund_info
-- ----------------------------
DROP TABLE IF EXISTS `t_refund_info`;
CREATE TABLE `t_refund_info` (
                                 `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '退款单id',
                                 `order_no` varchar(50) DEFAULT NULL COMMENT '商户订单编号',
                                 `refund_no` varchar(50) DEFAULT NULL COMMENT '商户退款单编号',
                                 `refund_id` varchar(50) DEFAULT NULL COMMENT '支付系统退款单号',
                                 `total_fee` int DEFAULT NULL COMMENT '原订单金额(分)',
                                 `refund` int DEFAULT NULL COMMENT '退款金额(分)',
                                 `reason` varchar(50) DEFAULT NULL COMMENT '退款原因',
                                 `refund_status` varchar(10) DEFAULT NULL COMMENT '退款状态',
                                 `content_return` text COMMENT '申请退款返回参数',
                                 `content_notify` text COMMENT '退款结果通知参数',
                                 `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                                 `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
                                 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of t_refund_info
-- ----------------------------
BEGIN;
INSERT INTO `t_refund_info` (`id`, `order_no`, `refund_no`, `refund_id`, `total_fee`, `refund`, `reason`, `refund_status`, `content_return`, `content_notify`, `create_time`, `update_time`) VALUES (27, 'ORDER_20220326122940065', 'REFUND_20220326125851040', '2022032622001497720502345582', 1, 1, '不喜欢', 'SUCCESS', NULL, NULL, '2022-03-26 12:58:51', '2022-03-26 12:58:53');
INSERT INTO `t_refund_info` (`id`, `order_no`, `refund_no`, `refund_id`, `total_fee`, `refund`, `reason`, `refund_status`, `content_return`, `content_notify`, `create_time`, `update_time`) VALUES (28, 'ORDER_20220326122927018', 'REFUND_20220326130107269', '2022032622001497720502345581', 1, 1, '不喜欢', 'SUCCESS', NULL, NULL, '2022-03-26 13:01:07', '2022-03-26 13:01:09');
INSERT INTO `t_refund_info` (`id`, `order_no`, `refund_no`, `refund_id`, `total_fee`, `refund`, `reason`, `refund_status`, `content_return`, `content_notify`, `create_time`, `update_time`) VALUES (30, 'ORDER_20220326221451539', 'REFUND_20220326224503228', '2022032622001497720502345905', 1, 1, '不喜欢', 'SUCCESS', NULL, NULL, '2022-03-26 22:45:03', '2022-03-26 22:45:05');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
                        `user_id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
                        `user_age` int DEFAULT NULL COMMENT '年龄',
                        `intro` varchar(255) DEFAULT NULL COMMENT '简介',
                        `gender` varchar(255) DEFAULT NULL,
                        `name` varchar(255) DEFAULT NULL COMMENT '用户自定义名称',
                        `USERNAME` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '用户名',
                        `PASSWORD` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '密码',
                        `email` varchar(255) DEFAULT NULL,
                        `code` int DEFAULT NULL COMMENT 'code',
                        `data` int DEFAULT NULL COMMENT 'data',
                        `role` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
                        `profile` varchar(255) DEFAULT NULL,
                        `status` int DEFAULT NULL COMMENT '是否禁用',
                        `created` datetime DEFAULT NULL COMMENT '创建时间',
                        `last_login` datetime DEFAULT NULL COMMENT '最后登陆时间',
                        `vip_valid_date` datetime DEFAULT NULL COMMENT '会员有效时间',
                        `vip_expire_date` datetime DEFAULT NULL COMMENT '会员过期时间',
                        `integral` int DEFAULT NULL COMMENT '积分',
                        `vip_disable_tip` int DEFAULT NULL COMMENT '会员是否禁用',
                        PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`user_id`, `user_age`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `code`, `data`, `role`, `profile`, `status`, `created`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`) VALUES (2, 3, '这个人很懒，什么都没有留下！', NULL, 'ice', 'ttice', '1231234', NULL, NULL, NULL, NULL, 'https://img0.baidu.com/it/u=2705683877,4119372584&fm=253&fmt=auto&app=138&f=JPEG?https://static.konlonair.com/public/uploads/_/originals/g9sqh9gp.jpeg', NULL, NULL, '2022-08-30 10:37:34', NULL, NULL, 12, 1);
INSERT INTO `user` (`user_id`, `user_age`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `code`, `data`, `role`, `profile`, `status`, `created`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`) VALUES (3, 2, '这个人很懒，什么都没有留下！', NULL, '悠悠', 'admin', '123123', '23339097@qq.com', NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', NULL, NULL, '2022-12-01 10:13:02', '2022-06-06 08:58:28', '2022-07-06 08:58:28', 233, 1);
INSERT INTO `user` (`user_id`, `user_age`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `code`, `data`, `role`, `profile`, `status`, `created`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`) VALUES (4, 23, '这个人很懒，什么都没有留下！', NULL, '天天', 'awe', '2312', '233312', NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/08/19/359346943c3c489f!400x400.jpg', NULL, NULL, '2022-08-29 09:15:27', NULL, NULL, NULL, 1);
INSERT INTO `user` (`user_id`, `user_age`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `code`, `data`, `role`, `profile`, `status`, `created`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`) VALUES (5, 6, '这个人很懒，什么都没有留下！', NULL, '小小', 'admin1', '123123', NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/08/19/96f91899b3709534!400x400.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `user` (`user_id`, `user_age`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `code`, `data`, `role`, `profile`, `status`, `created`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`) VALUES (33, 2, '这个人很懒，什么都没有留下！', NULL, '新用户', '123123', '123123', NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', NULL, '2022-08-20 08:46:46', '2022-08-20 08:49:34', NULL, NULL, NULL, 1);
INSERT INTO `user` (`user_id`, `user_age`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `code`, `data`, `role`, `profile`, `status`, `created`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`) VALUES (34, NULL, '这个人很懒，什么都没有留下！', NULL, '新用户', '321', '321', NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', NULL, '2022-09-20 13:18:44', '2022-09-20 13:18:44', NULL, NULL, NULL, 1);
INSERT INTO `user` (`user_id`, `user_age`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `code`, `data`, `role`, `profile`, `status`, `created`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`) VALUES (35, NULL, '这个人很懒，什么都没有留下！', NULL, '新用户', '1234', '1234', NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', NULL, '2022-09-20 13:24:18', '2022-09-20 13:24:18', NULL, NULL, NULL, 1);
INSERT INTO `user` (`user_id`, `user_age`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `code`, `data`, `role`, `profile`, `status`, `created`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`) VALUES (36, NULL, '这个人很懒，什么都没有留下！', NULL, '新用户', '123312', '123123', NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', NULL, '2022-09-21 11:18:03', '2022-09-21 11:18:03', NULL, NULL, NULL, 1);
INSERT INTO `user` (`user_id`, `user_age`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `code`, `data`, `role`, `profile`, `status`, `created`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`) VALUES (37, NULL, '这个人很懒，什么都没有留下！', NULL, '新用户', '1231232', '123123', NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', NULL, '2022-09-21 11:21:50', '2022-09-21 11:21:50', NULL, NULL, NULL, 1);
INSERT INTO `user` (`user_id`, `user_age`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `code`, `data`, `role`, `profile`, `status`, `created`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`) VALUES (38, NULL, '这个人很懒，什么都没有留下！', NULL, '新用户', 'ad123', '123123', NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', NULL, '2022-09-21 11:23:26', '2022-09-21 11:23:26', NULL, NULL, NULL, 1);
INSERT INTO `user` (`user_id`, `user_age`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `code`, `data`, `role`, `profile`, `status`, `created`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`) VALUES (39, NULL, '这个人很懒，什么都没有留下！', NULL, '新用户', 'asdasd', '123123', NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', NULL, '2022-09-21 11:24:22', '2022-09-21 11:24:22', NULL, NULL, NULL, 1);
INSERT INTO `user` (`user_id`, `user_age`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `code`, `data`, `role`, `profile`, `status`, `created`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`) VALUES (40, NULL, NULL, NULL, NULL, 'ice', '786787', NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 1);
COMMIT;

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
                             `user_id` int NOT NULL,
                             `role_id` int NOT NULL,
                             PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

-- ----------------------------
-- Records of user_role
-- ----------------------------
BEGIN;
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (2, 3);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (3, 2);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (4, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (5, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (12, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (13, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (14, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (15, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (16, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (17, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (18, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (19, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (20, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (21, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (22, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (23, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (24, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (25, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (26, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (27, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (28, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (29, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (30, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (31, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (32, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (33, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (34, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (35, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (36, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (37, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (38, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (39, 1);
COMMIT;

-- ----------------------------
-- Table structure for v_product
-- ----------------------------
DROP TABLE IF EXISTS `v_product`;
CREATE TABLE `v_product` (
                             `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT 'id',
                             `title` varchar(255) DEFAULT NULL COMMENT '文章标题',
                             `price` int DEFAULT NULL COMMENT '价格',
                             PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=244 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of v_product
-- ----------------------------
BEGIN;
INSERT INTO `v_product` (`id`, `title`, `price`) VALUES (0000000001, '积分充值', NULL);
INSERT INTO `v_product` (`id`, `title`, `price`) VALUES (0000000002, '会员购买(月费)', 20);
INSERT INTO `v_product` (`id`, `title`, `price`) VALUES (0000000003, '会员购买(季费)', 69);
INSERT INTO `v_product` (`id`, `title`, `price`) VALUES (0000000004, '会员购买(年费)', 99);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
