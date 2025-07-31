/*
 Navicat Premium Data Transfer

 Source Server         : Mysql
 Source Server Type    : MySQL
 Source Server Version : 80405 (8.4.5)
 Source Host           : localhost:3306
 Source Schema         : icecmspro

 Target Server Type    : MySQL
 Target Server Version : 80405 (8.4.5)
 File Encoding         : 65001

 Date: 29/07/2025 10:33:56
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for all_tag
-- ----------------------------
DROP TABLE IF EXISTS `all_tag`;
CREATE TABLE `all_tag` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) DEFAULT NULL COMMENT '标签名称',
  `color` varchar(255) DEFAULT NULL,
  `effect` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of all_tag
-- ----------------------------
BEGIN;
INSERT INTO `all_tag` (`id`, `tag_name`, `color`, `effect`) VALUES (0000000001, '设计笔记', '#F56C6C', 'light');
INSERT INTO `all_tag` (`id`, `tag_name`, `color`, `effect`) VALUES (0000000002, 'iceCMS', '#E6A23C', 'light');
INSERT INTO `all_tag` (`id`, `tag_name`, `color`, `effect`) VALUES (0000000003, '我的网站', '#409EFF', 'light');
INSERT INTO `all_tag` (`id`, `tag_name`, `color`, `effect`) VALUES (0000000004, '资源下载', '#409EFF', 'dark');
INSERT INTO `all_tag` (`id`, `tag_name`, `color`, `effect`) VALUES (0000000005, '技术教程', '#409EFF', 'plain');
INSERT INTO `all_tag` (`id`, `tag_name`, `color`, `effect`) VALUES (0000000006, '新手必备', '#67C23A', 'plain');
INSERT INTO `all_tag` (`id`, `tag_name`, `color`, `effect`) VALUES (0000000007, 'office', '#409EFF', 'plain');
INSERT INTO `all_tag` (`id`, `tag_name`, `color`, `effect`) VALUES (0000000008, '优化', '#67C23A', 'plain');
INSERT INTO `all_tag` (`id`, `tag_name`, `color`, `effect`) VALUES (0000000009, 'vip', '#409EFF', 'plain');
COMMIT;

-- ----------------------------
-- Table structure for announcements
-- ----------------------------
DROP TABLE IF EXISTS `announcements`;
CREATE TABLE `announcements` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '公告的唯一标识符\n',
  `title` varchar(255) DEFAULT NULL COMMENT '公告的标题',
  `content` varchar(255) DEFAULT NULL COMMENT '公告的内容',
  `created` datetime DEFAULT NULL COMMENT '公告的创建时间',
  `updated` datetime DEFAULT NULL COMMENT '公告的更新时间',
  `author` varchar(255) DEFAULT NULL COMMENT '发布公告的作者',
  `is_active` int DEFAULT NULL COMMENT '公告是否有效，默认值为有效',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of announcements
-- ----------------------------
BEGIN;
INSERT INTO `announcements` (`id`, `title`, `content`, `created`, `updated`, `author`, `is_active`) VALUES (1, '通知', '内容', '2025-07-26 20:10:58', '2025-07-26 20:24:26', '天天', 0);
INSERT INTO `announcements` (`id`, `title`, `content`, `created`, `updated`, `author`, `is_active`) VALUES (2, '通知', '内容1', NULL, NULL, '天天', 1);
INSERT INTO `announcements` (`id`, `title`, `content`, `created`, `updated`, `author`, `is_active`) VALUES (3, '123', '123', NULL, NULL, '管理员', 0);
INSERT INTO `announcements` (`id`, `title`, `content`, `created`, `updated`, `author`, `is_active`) VALUES (4, '123321', '312', NULL, NULL, '管理员', 1);
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
  `author_id` int DEFAULT NULL,
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
  `owner_tag` varchar(255) DEFAULT NULL COMMENT '重要性',
  `owner_remark` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '自定义备注',
  `html_path` varchar(255) DEFAULT NULL COMMENT 'htm地址',
  `file_path` varchar(255) DEFAULT NULL COMMENT '上传文件地址',
  `temp_path` varchar(255) DEFAULT NULL COMMENT '模板地址',
  `thumb` varchar(255) DEFAULT NULL COMMENT '缩略图地址',
  `status` varchar(25) DEFAULT NULL COMMENT '生成状态',
  `article_status` int(10) unsigned zerofill NOT NULL COMMENT '文章状态身份',
  PRIMARY KEY (`id`,`article_status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1000000269 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of article
-- ----------------------------
BEGIN;
INSERT INTO `article` (`id`, `sort_class`, `title`, `title_color`, `titlefont_size`, `titlefont_type`, `full_title`, `subhead`, `intro`, `content`, `author_id`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `love_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`, `article_status`) VALUES (0000000217, 20, 'JetBrains全系列软件激活教程激活码以及JetBrains系列软件汉化包', NULL, NULL, NULL, NULL, NULL, '阿松大', '<h2 id=\"最新激活方式\">最新激活方式</h2>\n<p>如果安装过无限试用、修改过 hosts 请先卸载干净旧版本再安装，否需无法激活！</p>\n<blockquote>\n<p>以&nbsp;<code>WebStorm</code>&nbsp;为例</p>\n</blockquote>\n<ol>\n<li><a class=\"text-primary\" href=\"https://www.jetbrains.com/\" target=\"_blank\" rel=\"noopener\">JetBrains官网</a>&nbsp;下载安装你需要的 IDE，如果下载慢可以在 macwk 搜索 jetbrains。</li>\n<li>下载&nbsp;<a class=\"text-primary\" href=\"https://macwk.lanzouo.com/i8eElxh573a\" target=\"_blank\" rel=\"noopener\">Jetbrains.zip</a>，下载后解压，得到 fineagent.jar，将该文件复制到&nbsp;<code>/Users/你的用户名/</code>&nbsp;文件夹下</li>\n<li>打开访达，点击左侧的&nbsp;<code>应用程序</code>&nbsp;找到&nbsp;<code>WebStorm</code>，在 WebStorm 图标上右键，点击&nbsp;<code>显示包内容</code></li>\n<li>进入&nbsp;<code>Contents</code>&nbsp;目录，再进入&nbsp;<code>bin</code>&nbsp;目录，使用文本编辑器打开&nbsp;<code>webstorm.vmoptions</code>&nbsp;文件</li>\n<li>在最后面添加&nbsp;<code>-javaagent:/Users/你的用户名/fineagent.jar</code>，记得修改一下你的用户名。</li>\n<li>运行 WebStorm, 选择&nbsp;<code>Activate WebStorm</code>，再点击&nbsp;<code>Activation Code</code></li>\n<li>复制下面的的激活码粘贴到激活窗口的输入框中，点击&nbsp;<code>Activate</code>。可以用到 2099 年！</li>\n</ol>\n<pre class=\"language-  language-undefined\" tabindex=\"0\"><code>5AYV1D1RE5-eyJsaWNlbnNlSWQiOiI1QVlWMUQxUkU1IiwibGljZW5zZWVOYW1lIjoiaHR0cHM6Ly93d3cuaml3ZWljaGVuZ3podS5jb20iLCJhc3NpZ25lZU5hbWUiOiIiLCJhc3NpZ25lZUVtYWlsIjoiIiwibGljZW5zZVJlc3RyaWN0aW9uIjoiIiwiY2hlY2tDb25jdXJyZW50VXNlIjpmYWxzZSwicHJvZHVjdHMiOlt7ImNvZGUiOiJJSSIsImZhbGxiYWNrRGF0ZSI6IjIwOTktMTItMzEiLCJwYWlkVXBUbyI6IjIwOTktMTItMzEifSx7ImNvZGUiOiJBQyIsImZhbGxiYWNrRGF0ZSI6IjIwOTktMTItMzEiLCJwYWlkVXBUbyI6IjIwOTktMTItMzEifSx7ImNvZGUiOiJEUE4iLCJmYWxsYmFja0RhdGUiOiIyMDk5LTEyLTMxIiwicGFpZFVwVG8iOiIyMDk5LTEyLTMxIn0seyJjb2RlIjoiUFMiLCJmYWxsYmFja0RhdGUiOiIyMDk5LTEyLTMxIiwicGFpZFVwVG8iOiIyMDk5LTEyLTMxIn0seyJjb2RlIjoiR08iLCJmYWxsYmFja0RhdGUiOiIyMDk5LTEyLTMxIiwicGFpZFVwVG8iOiIyMDk5LTEyLTMxIn0seyJjb2RlIjoiRE0iLCJmYWxsYmFja0RhdGUiOiIyMDk5LTEyLTMxIiwicGFpZFVwVG8iOiIyMDk5LTEyLTMxIn0seyJjb2RlIjoiQ0wiLCJmYWxsYmFja0RhdGUiOiIyMDk5LTEyLTMxIiwicGFpZFVwVG8iOiIyMDk5LTEyLTMxIn0seyJjb2RlIjoiUlMwIiwiZmFsbGJhY2tEYXRlIjoiMjA5OS0xMi0zMSIsInBhaWRVcFRvIjoiMjA5OS0xMi0zMSJ9LHsiY29kZSI6IlJDIiwiZmFsbGJhY2tEYXRlIjoiMjA5OS0xMi0zMSIsInBhaWRVcFRvIjoiMjA5OS0xMi0zMSJ9LHsiY29kZSI6IlJEIiwiZmFsbGJhY2tEYXRlIjoiMjA5OS0xMi0zMSIsInBhaWRVcFRvIjoiMjA5OS0xMi0zMSJ9LHsiY29kZSI6IlBDIiwiZmFsbGJhY2tEYXRlIjoiMjA5OS0xMi0zMSIsInBhaWRVcFRvIjoiMjA5OS0xMi0zMSJ9LHsiY29kZSI6IlJNIiwiZmFsbGJhY2tEYXRlIjoiMjA5OS0xMi0zMSIsInBhaWRVcFRvIjoiMjA5OS0xMi0zMSJ9LHsiY29kZSI6IldTIiwiZmFsbGJhY2tEYXRlIjoiMjA5OS0xMi0zMSIsInBhaWRVcFRvIjoiMjA5OS0xMi0zMSJ9LHsiY29kZSI6IkRCIiwiZmFsbGJhY2tEYXRlIjoiMjA5OS0xMi0zMSIsInBhaWRVcFRvIjoiMjA5OS0xMi0zMSJ9LHsiY29kZSI6IkRDIiwiZmFsbGJhY2tEYXRlIjoiMjA5OS0xMi0zMSIsInBhaWRVcFRvIjoiMjA5OS0xMi0zMSJ9LHsiY29kZSI6IlJTVSIsImZhbGxiYWNrRGF0ZSI6IjIwOTktMTItMzEiLCJwYWlkVXBUbyI6IjIwOTktMTItMzEifV0sImhhc2giOiIxMjc5Njg3Ny8wIiwiZ3JhY2VQZXJpb2REYXlzIjo3LCJhdXRvUHJvbG9uZ2F0ZWQiOmZhbHNlLCJpc0F1dG9Qcm9sb25nYXRlZCI6ZmFsc2V9-HNPogO0kWkHCVMnsjmBXUqQt87UPHqdkYqZGveSJtu8hb2V2Yq7gHsHenp4UuEd3jwEwC+YrUIf7U5yDA/56F5Sdn0RLUHZX5DHeQbJPbmYCBsDRT7m8rnmMFOSZn3vwNatvv1cooZbcGOk3Wwxx6bF7XcgaIrmXRcmZMZgv2PZehr0WS1HxNKe3X4nbGP3MwiSbg4ypmxNDrljmgv+Si9QDDwNLDffqeO0Lce0FqEJuMWmvBS42S0aeIYF8IS5bp4+LFKLJ8T7tF40OxKYDurBb9+9c43GZBscM/eLB8Jos66jNGFwgebFUlvhzJKVHZtuc/N8zGeEnTq6K0T/B8w==-MIIDTjCCAjagAwIBAgIBDTANBgkqhkiG9w0BAQsFADAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBMCAXDTE4MTEwMTEyMjk0NloYDzIwOTkwODA5MDIyNjA3WjAfMR0wGwYDVQQDDBRwcm9kMnktZnJvbS0yMDIwMTAxOTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMK3eyr0+Oys/TwcQO+qYaXWGBmXcEP4fR0bHHzZd/4WNGltXhecM80OWthA38BQRYAJBCKz/dSkO2Kj1H2y+7KB5cIaOiJEyTESfTSgzQdot6laRBU8oxy9mmagI46M8zEEmplPybY4YJj4HOwZiBsMQEMxoTgMDLpuHX6uASoVhSj6koB55lOj4wEgsQBeAMWTAXmTl88ixE179J8aBUkBGpL8w/tZzl9BJXZNF15gPfkS58rw8cdPzXLS0Yym37A2/KKFhfHzJc5KhbaxqYzmkAfTMqPsIqCQ1lQUAqfiPn2gN2I1Z3/cQuEW27M55fXVr2DduQe5DWzYJs85L50CAwEAAaOBmTCBljAJBgNVHRMEAjAAMB0GA1UdDgQWBBQk2hEilvWFQcCTR+gxI0z0wIQC/zBIBgNVHSMEQTA/gBSjnrZIZ0ISNkG9beC5tKBSi5fxs6EcpBowGDEWMBQGA1UEAwwNSmV0UHJvZmlsZSBDQYIJANJssYOyg3nhMBMGA1UdJQQMMAoGCCsGAQUFBwMBMAsGA1UdDwQEAwIFoDANBgkqhkiG9w0BAQsFAAOCAQEAsCQBjO5wttco/Z5cj/o4GBrku8UtBBBVFq4xsBanshTHm4deVxcTvta4aScV0TPKcaLqGqWx8A9v8XXO8dBbCuyXvWZteZ/C2Covg1xXiM99lz7VxqpjVmLdKanZn5u0gQSiYJdcfF+TdbmEIeSOnN/kLXNq2hXdJQK2zk2J25UZqu5EibRtTbdOzw6ZcfwJ8uOntXfsmAhnNICP3Wf/4wR/mwB0Ka4S+JA3IbF5MUmUZ/fjUaFarnin70us+Vxf/sZUi7u67wilvwVV0NAqDpthHUV0NRc4q+yOr2Dt/uCHdy4XRXLJfAv/z9/xBwNZZALNz3EtQL6IeIWWJByl3g==</code></pre>\n<p>尽情享用吧！</p>\n<h2 id=\"激活码方式\">激活码方式</h2>\n<p>该方式不需要另外设置，直接即可通过激活码激活，但是不保证稳定性！</p>\n<p><a class=\"text-primary fs-30\" href=\"https://jetbra.in/test-7b06e3ddfa68ff9b483adfcd08cdd243831f7928.html?t=16018385822?source=https://www.macwk.com/article/jetbrains-crack\" target=\"_blank\" rel=\"noopener\">点我获取最新激活码</a>，</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<h2 id=\"无限重置试用方式\">无限重置试用方式</h2>\n<blockquote>\n<p>无限重置试用方式仅适用于 2021.2.2 及以下版本！！！</p>\n</blockquote>\n<h3 id=\"前面的话\">前面的话</h3>\n<blockquote>\n<p>永久激活的工具 zhile 的大神已经不再继续开发维护了，此方法一直是跳转到 zhile 的主页，但是经常遇到反馈说目标网站打不开或者不知道怎么安装插件的问题，所以直接转到这个页面并配一下操作图片吧。另外目前只有这种无限重置试用的方法了，<code>最终和永久激活使用无差异，因为插件是每次运行自动续期的</code>！支持 JetBrains 系列软件的所有新旧版本的激活！！！MacWk.com 建议大家去&nbsp;<a href=\"https://www.jetbrains.com/\" target=\"_blank\" rel=\"noopener\">JetBrains官网</a>&nbsp;下载JetBrains系列工具的官方版，一般情况下载很快的。</p>\n</blockquote>\n<p>此方法也适用于 Windows。</p>\n<h3 id=\"背景\">背景</h3>\n<p>Jetbrains 家的产品有一个很良心的地方，他会允许你试用 30 天（这个数字写死在代码里了）以评估是否你真的需要为它而付费。 但很多时候会出现一种情况：IDE 并不能按照我们实际的试用时间来计算。</p>\n<p>我举个例子：如果我们开始了试用，然后媳妇生孩子要你回去陪产！陪产时我们并无空闲对IDE试用评估，它依旧算试用时间。（只是举个例子，或许你并没有女朋友）</p>\n<p>发现了吗？你未能真的有 30 天来对它进行全面的试用评估，你甚至无法作出是否付费的决定。此时你会想要延长试用时间，然而 Jetbrains 并未提供相关功能，该怎么办？</p>\n<p>事实上有一款插件可以实现这个功能，你或许可以用它来重置一下试用时间。但切记不要无休止的一直试用，这并不是这个插件的初衷！</p>\n<p><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-01.jpg\" alt=\"\" /></p>\n<h3 id=\"如何安装\">如何安装</h3>\n<blockquote>\n<p>提供以下两种方法，二选一即可。</p>\n</blockquote>\n<ol>\n<li>插件市场安装：</li>\n</ol>\n<p>在&nbsp;<code>Settings/Preferences... -&gt; Plugins</code>&nbsp;内手动添加第三方插件仓库地址：<code>https://plugins.zhile.io</code>&nbsp;搜索：IDE Eval Reset 插件进行安装。</p>\n<p><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-02.jpg\" alt=\"\" /><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-03.jpg\" alt=\"\" /><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-04.jpg\" alt=\"\" /><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-05.jpg\" alt=\"\" /><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-06.jpg\" alt=\"\" /><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-07.jpg\" alt=\"\" /><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-08.jpg\" alt=\"\" /></p>\n<ol start=\"2\">\n<li>手动下载安装：</li>\n</ol>\n<p><a class=\"text-primary\" href=\"https://macwk.lanzoui.com/iwY9lvf1ckj\" target=\"_blank\" rel=\"noopener\">点击这个链接(v2.1.14)下载插件的 zip 包</a>（macOS可能会自动解压，切记使用的是 zip 包，不是解压后的文件夹！），然后打开&nbsp;<code>Settings/Preferences... -&gt; Plugins</code>&nbsp;手动安装插件。</p>\n<p><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-09.jpg\" alt=\"\" /><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-10.jpg\" alt=\"\" /><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-11.jpg\" alt=\"\" /><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-12.jpg\" alt=\"\" /></p>\n<h3 id=\"如何使用\">如何使用</h3>\n<p>一般来说，在 IDE 窗口切出去或切回来时（窗口失去/得到焦点）会触发事件，检测是否长时间（25天）没有重置，给通知让你选择。（初次安装因为无法获取上次重置时间，会直接给予提示）。</p>\n<p>您也可以手动唤出插件的主界面：</p>\n<p>a. 如果 IDE 没有打开项目，在 Welcome 界面点击 IDE 的菜单：<code>Get Help -&gt; Eval Reset</code></p>\n<p>b. 如果 IDE 打开了项目，点击 IDE 的菜单：<code>Help -&gt; Eval Reset</code></p>\n<p>唤出的插件主界面中包含了一些显示信息，有 2 个按钮和 1 个勾选项：</p>\n<ul>\n<li>按钮：<code>Reload</code>&nbsp;用来刷新界面上的显示信息。</li>\n<li>按钮：<code>Reset</code>&nbsp;点击会询问是否重置试用信息并重启 IDE。选择 Yes 则执行重置操作并重启 IDE 生效，选择 No 则什么也不做。（此为手动重置方式）</li>\n<li>勾选项：<code>Auto reset before per restart</code>&nbsp;如果勾选了，则自勾选后每次重启/退出 IDE 时会自动重置试用信息，你无需做额外的事情。（此为自动重置方式，推荐此方法！）</li>\n</ul>\n<p><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-13.jpg\" alt=\"\" /><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-14.jpg\" alt=\"\" /><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-crack-screen-15.jpg\" alt=\"\" /></p>\n<h3 id=\"如何更新\">如何更新</h3>\n<ol>\n<li>插件更新机制（推荐）：</li>\n</ol>\n<p>IDE 会自行检测其自身和所安装插件的更新并给予提示。如果本插件有更新，你会收到提示看到更新日志，自行选择是否更新。</p>\n<p>点击 IDE 的 Check for Updates... 菜单手动检测 IDE 和所安装插件的更新。如果本插件有更新，你会收到提示看到更新日志，自行选择是否更新。</p>\n<p>插件更新可能会需要重启IDE。</p>\n<ol start=\"2\">\n<li>手动更新：</li>\n</ol>\n<p>从本页面下载最新的插件 zip 包安装更新。插件更新需要重启IDE。</p>\n<h3 id=\"一些说明\">一些说明</h3>\n<p>市场付费插件的试用信息也会一并重置。</p>\n<p>MyBatisCodeHelperPro 插件有两个版本如下，功能完全相同，安装时须看清楚！</p>\n<ul>\n<li><a href=\"https://plugins.jetbrains.com/plugin/14522-mybatiscodehelperpro-marketplace-edition-\" target=\"_blank\" rel=\"noopener\">MyBatisCodeHelperPro</a>&nbsp;(Marketplace Edition)，<code>可重置</code>！</li>\n<li><a href=\"https://plugins.jetbrains.com/plugin/9837-mybatiscodehelperpro\" target=\"_blank\" rel=\"noopener\">MyBatisCodeHelperPro</a>，<code>不可重置</code>！</li>\n</ul>\n<p>对于某些付费插件（如: Iedis 2, MinBatis）来说，你可能需要去取掉 javaagent 配置（如果有）后重启IDE：</p>\n<ul>\n<li>如果IDE没有打开项目，在 Welcome 界面点击菜单：Configure -&gt; Edit Custom VM Options... -&gt; 移除 -javaagent: 开头的行。</li>\n<li>如果IDE打开了项目，点击菜单：Help -&gt; Edit Custom VM Options... -&gt; 移除 -javaagent: 开头的行。</li>\n</ul>\n<p>重置需要重启IDE生效！</p>\n<p>重置后并不弹出 Licenses 对话框让你选择输入 License 或试用，这和之前的重置脚本/插件不同（省去这烦人的一步）。</p>\n<p>如果长达 25 天不曾有任何重置动作，IDE 会有通知询问你是否进行重置。</p>\n<p>如果勾选：Auto reset before per restart ，重置是静默无感知的。</p>\n<p>简单来说：勾选了 Auto reset before per restart 则无需再管，一劳永逸。</p>\n<h3 id=\"开源信息\">开源信息</h3>\n<p>插件是学习研究项目，源代码是开放的。源码仓库地址：<a class=\"text-primary\" href=\"https://gitee.com/pengzhile/ide-eval-resetter\" target=\"_blank\" rel=\"noopener\">Gitee</a>。</p>\n<p>如果你有更好的想法，欢迎给我提 Pull Request 来共同研究完善。</p>\n<p>插件源码使用：GPL-2.0开源协议发布。</p>\n<p>插件使用 PHP 编写，毕竟 PHP 是世界上最好的编程语言！</p>\n<h3 id=\"支持的产品\">支持的产品</h3>\n<ul>\n<li>IntelliJ IDEA</li>\n<li>AppCode</li>\n<li>CLion</li>\n<li>DataGrip</li>\n<li>GoLand</li>\n<li>PhpStorm</li>\n<li>PyCharm</li>\n<li>Rider</li>\n<li>RubyMine</li>\n<li>WebStorm</li>\n</ul>\n<p><a class=\"text-primary\" href=\"https://zhile.io/2020/11/18/jetbrains-eval-reset-da33a93d.html\" target=\"_blank\" rel=\"noopener\">点我查看原文链接</a></p>\n<h2 id=\"中文汉化包\">中文汉化包</h2>\n<p>JetBrains 系列大部分在官方的插件中心直接安装使用了。</p>\n<p>以 WebStrom 为例，打开它的设置，点击 Plugins，搜索 chinese，安装即可。</p>\n<p><img src=\"https://cdn.macwk.com/public/uploads/_/originals/jetbrains-activation-step-09-1.jpg\" alt=\"\" /></p>\n<h2 id=\"激活码\">激活码</h2>\n<p>目前全网 Jetbrains 全家桶激活码激活方式都不稳定，请使用无限重置试用的方法。</p>', 3, NULL, NULL, NULL, '1,4,6', 488, 2, 68, 'false', NULL, NULL, NULL, '2022-02-24 10:27:15', '2022-03-15 02:49:23', '2022-02-27 13:04:45', NULL, '3', NULL, NULL, NULL, NULL, 'https://yiban.io/blog/wp-content/uploads/2019/11/2019112212295832-480x300.png', 'published', 0009170287);
INSERT INTO `article` (`id`, `sort_class`, `title`, `title_color`, `titlefont_size`, `titlefont_type`, `full_title`, `subhead`, `intro`, `content`, `author_id`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `love_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`, `article_status`) VALUES (0000000229, 20, 'Github上传操作-push-pull-delete', NULL, NULL, NULL, NULL, NULL, '按顺序擦速度', '<p>&nbsp;</p>\n<div>\n<div>\n<article class=\"_2rhmJa\">\n<h2>新建</h2>\n<h3>&hellip;or create a new repository on the command line</h3>\n<div class=\"copyable-terminal\">\n<div class=\"copyable-terminal-button\">&nbsp;</div>\n<pre class=\"language-css\"><code>echo \"# IceWk\" &gt;&gt; README.md\ngit init\ngit add README.md\ngit commit -m \"first commit\"\ngit branch -M main\ngit remote add origin git@github.com:Thecosy/IceWk.git\ngit push -u origin main删除</code></pre>\n</div>\n<h2>删除</h2>\n<p>在上传项目到github时,忘记忽略了某个文件夹target,就直接push上去了, 最后意识到了此问题,决定删除掉远程仓库中的target文件夹</p>\n<p>&nbsp;</p>\n<p>在github上只能删除仓库,却无法删除文件夹或文件, 所以只能通过命令来解决</p>\n<p>&nbsp;</p>\n<p>首先进入你的master文件夹下, Git Bash Here ,打开命令窗口</p>\n<p>$ git --help # 帮助命令</p>\n<p>&nbsp;</p>\n<p>$ git pull origin master # 将远程仓库里面的项目拉下来</p>\n<p>$ dir # 查看有哪些文件夹</p>\n<p>$ git rm -r --cached target # 删除target文件夹<br />$ git commit -m \'删除了target\' # 提交,添加操作说明</p>\n<p>&nbsp;</p>\n<ul>\n<li>\n<p>提交上述操作<br /><strong><code>git commit -m \"log message\"</code></strong></p>\n</li>\n<li>\n<p>推送所有文件到远程仓库<br /><strong><code>git push origin master</code></strong></p>\n<blockquote>\n<p>这时候如果再执行添加origin操作，会提示<strong>远程origin已经存在</strong>。<br />细心的可能会发现这地方跟<a target=\"_blank\" rel=\"noopener\">添加本地项目到github</a>的最后一步操作不一样，那里是<code>git push -u origin master</code></p>\n<blockquote>\n<p>第一次添加远程origin时，需要语句<code>-u</code></p>\n</blockquote>\n</blockquote>\n</li>\n</ul>\n<p>这时候我们再去github上查看此项目，就可以看到已经更新了刚才的操作！</p>\n<h2>更新</h2>\n<p>&nbsp;</p>\n</article>\n<div>\n<p>向本地仓库中准备文件</p>\n<p>git add .<br /><br />这条命令是向本地仓库传入全部文件<br />或者</p>\n<h3>git add filepath(具体文件的路径)<br /><br />交付<br />备注信息不能为空，否则会交付失败。</h3>\n<p>git commit -m \"备注信息\"<br /><br />还可以添加其他参数<br />连接远程仓库<br />第一次上传时，需要在github创建一个Repository,然后复制其URL或者SSH<br />更新时若已经进入项目根目录可以无此操作。</p>\n<p>git remote add origin https://github.com/cocolabear/snake.git<br /><br />注意是add不是and</p>\n<p>提交代码</p>\n<p>git push -u origin master<br /><br />当出现莫名其妙的问题时，强制push</p>\n<p>git push -u origin master -f<br /><br />这一步可能需要输入github的账号和密码。<br /><br /></p>\n<div>\n<div>\n<div>\n<div>\n<p>&nbsp;</p>\n<p>正确步骤：<br />1. git init //初始化仓库</p>\n<ol>\n<li>\n<p>git add .(文件name) //添加文件到本地仓库</p>\n</li>\n<li>\n<p>git commit -m &ldquo;first commit&rdquo; //添加文件描述信息</p>\n</li>\n<li>\n<p>git remote add origin + 远程仓库地址&nbsp;//链接远程仓库，创建主分支</p>\n</li>\n<li>\n<p>git pull origin master // 把本地仓库的变化连接到远程仓库主分支</p>\n</li>\n<li>\n<p>git push -u origin master //把本地仓库的文件推送到远程仓库</p>\n</li>\n</ol>\n<p>OK<br />搞定！！</p>\n</div>\n<div class=\"_19DgIp\">&nbsp;</div>\n</div>\n<br /><br /></div>\n</div>\n</div>\n<div class=\"_19DgIp\">&nbsp;</div>\n</div>\n<br /><br /></div>', 3, NULL, NULL, NULL, '1,4,6', 85, 8, 3, NULL, NULL, NULL, NULL, '2022-02-27 11:26:51', '2022-05-13 15:01:44', '2022-02-27 13:01:00', NULL, '3', NULL, NULL, NULL, NULL, 'https://yiban.io/blog/wp-content/uploads/2019/11/2019112212295832-480x300.png', 'published', 0007751656);
INSERT INTO `article` (`id`, `sort_class`, `title`, `title_color`, `titlefont_size`, `titlefont_type`, `full_title`, `subhead`, `intro`, `content`, `author_id`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `love_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`, `article_status`) VALUES (0000000233, 20, 'vue组件之间传值的方式', NULL, NULL, NULL, NULL, NULL, '', '<p>父组件往子组件传值</p>\n<p>prop作为初始值传入后，子组件想把它当作局部数据来用</p>\n<pre class=\"language-javascript\"><code>&lt;div class=\"content\"&gt;\n    &lt;my-table :table-data=\"tableData\" :page-info=\"pageInfo\" id=\"myTable\"&gt;&lt;/my-table&gt;\n&lt;/div&gt;</code></pre>\n<pre class=\"language-javascript\"><code>props: [\'tableData\', \'pageInfo\'],\ndata() {\n    return {\n        tData: this.tableData,\n        page: this.pageInfo\n    }\n}</code></pre>\n<p>&nbsp;</p>\n<p>父组件传值给子组件后，在子组件里接收到之后，用的时候就直接用this.tableData</p>\n<pre><code> props: {\n    tableData: {\n      type: Array\n    }\n  },\ncreated: function () {\n  console.log(this.tableData)\n}</code></pre>\n<p class=\"p1\">&nbsp;</p>\n<p class=\"p2\">vue路由传参的三种基本方式</p>\n<p class=\"p3\"><strong>方案一：</strong></p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; </span>getDescribe(id) {</p>\n<p class=\"p2\">// <span class=\"Apple-converted-space\">&nbsp; </span>直接调用$router.push 实现携带参数的跳转</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; </span>this.$router.push({</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>path: `/describe/${id}`,</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; </span>})</p>\n<p class=\"p3\"><strong>方案一，需要对应路由配置如下：</strong></p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; </span>{</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; &nbsp; </span>path: \'/describe/:id\',</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; &nbsp; </span>name: \'Describe\',</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; &nbsp; </span>component: Describe</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; </span>}</p>\n<p class=\"p3\"><strong>很显然，需要在path中添加/:id来对应 $router.push 中path携带的参数。在子组件中可以使用来获取传递的参数值。</strong></p>\n<p class=\"p2\">this.$route.params.id</p>\n<p class=\"p3\"><strong>方案二：</strong></p>\n<p class=\"p3\"><strong>父组件中：通过路由属性中的name来确定匹配的路由，通过params来传递参数。</strong></p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; &nbsp; &nbsp; </span>this.$router.push({</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>name: \'Describe\',</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>params: {</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>id: id</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>}</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; </span>})</p>\n<p class=\"p3\"><strong>对应路由配置: 这里可以添加:/id 也可以不添加，不添加数据会在url后面显示，不添加数据就不会显示</strong></p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; </span>{</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; &nbsp; </span>path: \'/describe\',</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; &nbsp; </span>name: \'Describe\',</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; &nbsp; </span>component: Describe</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; </span>}</p>\n<p class=\"p3\"><strong>子组件中: 这样来获取参数</strong></p>\n<p class=\"p2\">this.$route.params.id</p>\n<p class=\"p3\"><strong>方案三：</strong></p>\n<p class=\"p3\"><strong>父组件：使用path来匹配路由，然后通过query来传递参数<br />这种情况下 query传递的参数会显示在url后面?id=？</strong></p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; </span>this.$router.push({</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>path: \'/describe\',</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>query: {</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>id: id</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>}</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp; &nbsp; &nbsp; &nbsp; </span>})</p>\n<p class=\"p3\"><strong>对应路由配置：</strong></p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; </span>{</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; &nbsp; </span>path: \'/describe\',</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; &nbsp; </span>name: \'Describe\',</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; &nbsp; </span>component: Describe</p>\n<p class=\"p2\"><span class=\"Apple-converted-space\">&nbsp;&nbsp; </span>}</p>\n<p class=\"p3\"><strong>对应子组件: 这样来获取参数</strong></p>\n<p class=\"p2\">this.$route.query.id</p>\n<p class=\"p3\"><strong>这里要特别注意 在子组件中 获取参数的时候是$route.params 而不是</strong></p>\n<p class=\"p3\"><strong>$router </strong><span class=\"s1\"><strong>这很重要</strong></span><strong>~~~</strong></p>', 3, NULL, NULL, NULL, '1,4,6', 173, 2, 26, 'false', NULL, NULL, NULL, '2022-03-13 05:41:21', '2022-03-31 10:42:05', NULL, NULL, '2', NULL, NULL, NULL, NULL, 'https://yiban.io/blog/wp-content/uploads/2019/11/2019112212295832-480x300.png', 'published', 0008560208);
INSERT INTO `article` (`id`, `sort_class`, `title`, `title_color`, `titlefont_size`, `titlefont_type`, `full_title`, `subhead`, `intro`, `content`, `author_id`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `love_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `thumb`, `status`, `article_status`) VALUES (0000000237, 20, '部分地区蓝奏云下载链接无法访问问题解决', NULL, NULL, NULL, NULL, NULL, '如果出现蓝奏云打不开的问题，可以根据蓝奏云官方提供的修改域名或者修改DNS方法解决无法访问问题。', '<p>如果出现蓝奏云打不开的问题，可以根据蓝奏云官方提供的修改域名或者修改DNS方法解决无法访问问题。</p><h3>修改域名</h3><blockquote>1.把下载链接中lanzous.com 改成 lanzoux.com。 2.把下载链接中lanzous.com 改成 lanzoui.com。 3.把下载链接中lanzous.com 改成 lanzou.com。 4.把下载链接中macoshome.lanzoux.com/xxxxx，二级域名macoshome前缀删除，变成lanzoux.com/xxxxx。</blockquote><p>以上4选一尝试，如果都无法方法请使用修改DNS方法解决。</p><h3>修改DNS</h3><p>把网络链接的DNS改成阿里、百度、腾讯、114公共DNS解决，下面是各厂商公共DNS发布地址，根据你的需要选择。</p><blockquote>阿里DNS ｜ 百度DNS｜腾讯DNS｜114DNS</blockquote><p>1.打开 系统偏好设置 – 网络；</p><p><br></p><p>2.到了网络设置之后，点击 高级 按钮；</p><p><br></p><p>3.弹出的选项点击 DNS，再点击 左下角 + 按钮进行添加DNS地址输入框；</p><p><br></p><p>4.在DNS服务器处新添加的输入框输入DSN地址，苹果系统之家这里以114.114.114.114 地址为例子，输入好之后再点击右下角的 好 按钮完成添加；</p><p>TPS：如果之前有添加过其他DNS地址，要选中DNS地址，再点击左下角的 – 按钮删除。</p><p><br></p><p>5.最后再点击右下角的 应用按钮完成DNS修改。</p><p><br></p>', 3, NULL, NULL, NULL, '1,4,6', 123, 1, 5, 'false', NULL, NULL, NULL, '2022-11-17 10:32:51', '2025-07-27 08:06:54', NULL, NULL, '0', NULL, NULL, NULL, NULL, 'https://yiban.io/blog/wp-content/uploads/2019/11/2019112212295832-480x300.png', 'published', 0007845351);
COMMIT;

-- ----------------------------
-- Table structure for article_class
-- ----------------------------
DROP TABLE IF EXISTS `article_class`;
CREATE TABLE `article_class` (
  `id` int(5) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '名称',
  `father` int DEFAULT NULL COMMENT '父级分类',
  `other_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '别名',
  `describes` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '描述',
  `imgclass` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '分类图片',
  `top` int DEFAULT NULL COMMENT '顶制',
  `num` int DEFAULT NULL COMMENT '文章数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of article_class
-- ----------------------------
BEGIN;
INSERT INTO `article_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (00019, '基础教程', NULL, 'teach', '海基会', 'https://yiban.io/blog/wp-content/uploads/2019/11/2019112212295832-480x300.png', 1, NULL);
INSERT INTO `article_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (00020, '新手入门', NULL, 'rumen', '怒合格', 'http://127.0.0.1:8181/logistics/d5aa00b5-3754-445b-99b4-b3041c92d31a.jpg', 1, 3);
COMMIT;

-- ----------------------------
-- Table structure for article_comment
-- ----------------------------
DROP TABLE IF EXISTS `article_comment`;
CREATE TABLE `article_comment` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT 'id',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '内容',
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '用户名',
  `email` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `add_time` datetime DEFAULT NULL COMMENT '创建时间',
  `parent_id` int DEFAULT NULL COMMENT '父id',
  `foreign_id` int DEFAULT NULL COMMENT '外部id',
  `profile` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '头像',
  `article_id` int DEFAULT NULL COMMENT '文章id',
  `user_id` int DEFAULT NULL COMMENT '用户id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

-- ----------------------------
-- Records of article_comment
-- ----------------------------
BEGIN;
INSERT INTO `article_comment` (`id`, `content`, `username`, `email`, `add_time`, `parent_id`, `foreign_id`, `profile`, `article_id`, `user_id`) VALUES (0000000032, '看起来不错', '', '23339097@qq.com', '2022-03-14 02:37:40', 7, 9, '', 217, 3);
INSERT INTO `article_comment` (`id`, `content`, `username`, `email`, `add_time`, `parent_id`, `foreign_id`, `profile`, `article_id`, `user_id`) VALUES (0000000033, '第一条评论', '', '23339097@qq.com', '2022-03-14 03:08:13', 8, 9, '', 217, 3);
INSERT INTO `article_comment` (`id`, `content`, `username`, `email`, `add_time`, `parent_id`, `foreign_id`, `profile`, `article_id`, `user_id`) VALUES (0000000034, '真不错！', '', '23339097@qq.com', '2022-03-14 06:19:32', 7, 9, '', 217, 3);
COMMIT;

-- ----------------------------
-- Table structure for chat_messages
-- ----------------------------
DROP TABLE IF EXISTS `chat_messages`;
CREATE TABLE `chat_messages` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `from_user_id` int DEFAULT NULL,
  `to_user_id` int DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of chat_messages
-- ----------------------------
BEGIN;
INSERT INTO `chat_messages` (`id`, `text`, `from_user_id`, `to_user_id`, `time`) VALUES (0000000001, 'Hello, Alice!', 2, 3, '2022-01-01 10:00:00');
INSERT INTO `chat_messages` (`id`, `text`, `from_user_id`, `to_user_id`, `time`) VALUES (0000000002, 'Hi, Bob!', 3, 2, '2022-01-01 10:01:00');
INSERT INTO `chat_messages` (`id`, `text`, `from_user_id`, `to_user_id`, `time`) VALUES (0000000003, 'helloword', 3, 2, '2023-03-31 21:38:39');
INSERT INTO `chat_messages` (`id`, `text`, `from_user_id`, `to_user_id`, `time`) VALUES (0000000004, 'helloword', 4, 3, '2023-03-31 21:38:39');
INSERT INTO `chat_messages` (`id`, `text`, `from_user_id`, `to_user_id`, `time`) VALUES (0000000005, 'ok', 3, 1, '2023-03-31 22:30:11');
INSERT INTO `chat_messages` (`id`, `text`, `from_user_id`, `to_user_id`, `time`) VALUES (0000000006, 'ok', 3, 1, '2023-03-31 22:31:07');
INSERT INTO `chat_messages` (`id`, `text`, `from_user_id`, `to_user_id`, `time`) VALUES (0000000007, '123', 3, 1, '2023-03-31 22:32:28');
INSERT INTO `chat_messages` (`id`, `text`, `from_user_id`, `to_user_id`, `time`) VALUES (0000000008, '123', 3, 1, '2023-03-31 22:32:35');
INSERT INTO `chat_messages` (`id`, `text`, `from_user_id`, `to_user_id`, `time`) VALUES (0000000009, '123', 3, 1, '2023-03-31 22:32:52');
INSERT INTO `chat_messages` (`id`, `text`, `from_user_id`, `to_user_id`, `time`) VALUES (0000000010, '123', 3, 2, '2023-03-31 22:38:24');
INSERT INTO `chat_messages` (`id`, `text`, `from_user_id`, `to_user_id`, `time`) VALUES (0000000011, 'ok', 3, 2, '2023-03-31 22:39:05');
INSERT INTO `chat_messages` (`id`, `text`, `from_user_id`, `to_user_id`, `time`) VALUES (0000000012, 'hi', 3, 4, '2023-03-31 22:39:15');
INSERT INTO `chat_messages` (`id`, `text`, `from_user_id`, `to_user_id`, `time`) VALUES (0000000013, 'hi', 3, 2, '2023-04-01 08:15:01');
INSERT INTO `chat_messages` (`id`, `text`, `from_user_id`, `to_user_id`, `time`) VALUES (0000000014, 'asd', 3, 2, '2023-04-01 08:16:37');
INSERT INTO `chat_messages` (`id`, `text`, `from_user_id`, `to_user_id`, `time`) VALUES (0000000015, 'ok', 3, 2, '2023-04-01 08:18:56');
INSERT INTO `chat_messages` (`id`, `text`, `from_user_id`, `to_user_id`, `time`) VALUES (0000000016, 'yes', 3, 2, '2023-04-01 08:19:22');
INSERT INTO `chat_messages` (`id`, `text`, `from_user_id`, `to_user_id`, `time`) VALUES (0000000017, '可以的', 3, 4, '2023-04-01 08:19:31');
INSERT INTO `chat_messages` (`id`, `text`, `from_user_id`, `to_user_id`, `time`) VALUES (0000000018, '6', 3, 2, '2023-04-23 20:57:56');
INSERT INTO `chat_messages` (`id`, `text`, `from_user_id`, `to_user_id`, `time`) VALUES (0000000019, '2', 3, 4, '2023-04-23 20:58:00');
INSERT INTO `chat_messages` (`id`, `text`, `from_user_id`, `to_user_id`, `time`) VALUES (0000000020, '123', 3, 53, '2023-04-23 21:02:57');
INSERT INTO `chat_messages` (`id`, `text`, `from_user_id`, `to_user_id`, `time`) VALUES (0000000021, '123', 3, 4, '2023-04-25 13:35:23');
INSERT INTO `chat_messages` (`id`, `text`, `from_user_id`, `to_user_id`, `time`) VALUES (0000000022, 'saasd', 3, 53, '2023-04-25 13:35:37');
INSERT INTO `chat_messages` (`id`, `text`, `from_user_id`, `to_user_id`, `time`) VALUES (0000000023, '123', 3, 53, '2023-04-25 13:37:51');
COMMIT;

-- ----------------------------
-- Table structure for disposition_carousel
-- ----------------------------
DROP TABLE IF EXISTS `disposition_carousel`;
CREATE TABLE `disposition_carousel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `introduce` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `button` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `img` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin COMMENT='轮播图';

-- ----------------------------
-- Records of disposition_carousel
-- ----------------------------
BEGIN;
INSERT INTO `disposition_carousel` (`id`, `title`, `introduce`, `button`, `img`) VALUES (1, '校园微课', '在这里观看你感兴趣的', '立即观看', 'https://i.imgtg.com/2022/11/18/t0vKG.png');
INSERT INTO `disposition_carousel` (`id`, `title`, `introduce`, `button`, `img`) VALUES (2, '校园微课', '在这里观看你感兴趣的', '立即观看', 'https://i.imgtg.com/2022/11/18/t0y01.png');
COMMIT;

-- ----------------------------
-- Table structure for email_detection
-- ----------------------------
DROP TABLE IF EXISTS `email_detection`;
CREATE TABLE `email_detection` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of email_detection
-- ----------------------------
BEGIN;
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000001, '23339097@qq.com', 'Px2N3C', '2023-03-30 13:40:31');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000006, '23339097@qq.com', '6R8b62', '2023-04-02 06:58:01');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000007, '23339097@qq.com', 'bsgxXf', '2024-06-16 12:29:42');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000008, '23339097@qq.com', 'Svo35e', '2024-06-16 12:55:06');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000009, '23339097@qq.com', 'SiPezE', '2024-06-16 12:58:50');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000010, '23339097@qq.com', '5ad8b9', '2024-06-16 13:07:28');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000011, '23339097@qq.com', '76c644', '2024-06-16 13:11:54');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000012, '23339097@qq.com', '6f6009', '2024-06-16 13:22:21');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000013, '23339097@qq.com', 'c2c7f7', '2024-06-16 13:25:21');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000014, '23339097@qq.com', 'b0d00b', '2024-06-16 13:27:37');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000015, '23339097@qq.com', '547362', '2024-06-16 13:30:17');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000016, '23339097@qq.com', '425026', '2024-06-16 13:43:37');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000017, '23339097@qq.com', '684090', '2024-07-20 13:42:39');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000018, '23339097@qq.com', '809003', '2024-07-20 13:43:00');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000019, '23339097@qq.com', '900956', '2024-07-20 13:46:15');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000020, '23339097@qq.com', '720697', '2024-07-20 13:47:07');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000021, '23339097@qq.com', '323870', '2024-07-20 13:50:22');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000022, '23339097@qq.com', '070417', '2024-07-20 14:01:43');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000023, '23339097@qq.com', '987655', '2024-07-20 14:09:44');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000024, '23339097@qq.com', '137718', '2024-07-20 14:26:22');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000025, '23339097@qq.com', '984426', '2024-10-21 09:17:44');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000026, '23339097@qq.com', '138560', '2024-10-28 06:43:24');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000027, '239097@qq.com', '995204', '2024-10-28 06:44:59');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000028, '239097@qq.com', '742762', '2024-10-28 06:45:01');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000029, '233339097@qq.com', '208990', '2024-10-28 15:54:19');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000030, '23339097@qq.com', '968899', '2024-10-28 15:54:29');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000031, '23339097@qq.com', '409948', '2024-10-28 16:01:12');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000032, '23339097@qq.com', '917995', '2024-10-28 16:05:28');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000033, '23339097@qq.com', '012466', '2024-10-28 16:08:07');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000034, '23339097@qq.com', '534834', '2024-10-28 16:08:52');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000035, '23339097@qq.com', '538320', '2024-11-05 12:04:19');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000036, '1420083395@qq.com', '647684', '2024-11-06 09:49:05');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000037, '1420083395@qq.com', '117566', '2024-11-06 09:50:07');
INSERT INTO `email_detection` (`id`, `email`, `code`, `time`) VALUES (0000000038, '3399203199@qq.com', '416992', '2024-11-06 09:51:35');
COMMIT;

-- ----------------------------
-- Table structure for follows
-- ----------------------------
DROP TABLE IF EXISTS `follows`;
CREATE TABLE `follows` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `follower_id` int DEFAULT NULL,
  `following_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of follows
-- ----------------------------
BEGIN;
INSERT INTO `follows` (`id`, `follower_id`, `following_id`) VALUES (0000000001, 2, 3);
INSERT INTO `follows` (`id`, `follower_id`, `following_id`) VALUES (0000000002, 123, 321);
INSERT INTO `follows` (`id`, `follower_id`, `following_id`) VALUES (0000000010, 4, 46);
INSERT INTO `follows` (`id`, `follower_id`, `following_id`) VALUES (0000000012, 46, 3);
INSERT INTO `follows` (`id`, `follower_id`, `following_id`) VALUES (0000000013, 46, 4);
INSERT INTO `follows` (`id`, `follower_id`, `following_id`) VALUES (0000000014, 3, 47);
COMMIT;

-- ----------------------------
-- Table structure for home_setting
-- ----------------------------
DROP TABLE IF EXISTS `home_setting`;
CREATE TABLE `home_setting` (
  `id` int DEFAULT NULL,
  `feature_title` varchar(255) DEFAULT NULL,
  `feature_src` varchar(255) DEFAULT NULL,
  `color_left` varchar(255) DEFAULT NULL,
  `color_right` varchar(255) DEFAULT NULL,
  `feature_enabled` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of home_setting
-- ----------------------------
BEGIN;
INSERT INTO `home_setting` (`id`, `feature_title`, `feature_src`, `color_left`, `color_right`, `feature_enabled`) VALUES (1, '新人必备1', 'Notification', '#7fe496', '#6edf8f', NULL);
INSERT INTO `home_setting` (`id`, `feature_title`, `feature_src`, `color_left`, `color_right`, `feature_enabled`) VALUES (2, '图像处理工具', 'Notification', '#fe9078', '#f1b87f', NULL);
INSERT INTO `home_setting` (`id`, `feature_title`, `feature_src`, `color_left`, `color_right`, `feature_enabled`) VALUES (3, '产品经理工具', 'Notification', '#6cacfd', '#93c8ff', NULL);
INSERT INTO `home_setting` (`id`, `feature_title`, `feature_src`, `color_left`, `color_right`, `feature_enabled`) VALUES (4, '更多专题', 'Notification', '#a682e4', '#c1a7e9', NULL);
COMMIT;

-- ----------------------------
-- Table structure for notification
-- ----------------------------
DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `title` varchar(255) NOT NULL COMMENT '通知标题',
  `content` text NOT NULL COMMENT '通知内容',
  `type` int NOT NULL DEFAULT '1' COMMENT '通知类型：1-系统通知，2-用户通知',
  `receiver_id` int NOT NULL DEFAULT '0' COMMENT '接收者ID，0表示全部用户',
  `is_read` int NOT NULL DEFAULT '0' COMMENT '是否已读：0-未读，1-已读',
  `create_time` datetime DEFAULT NULL COMMENT '通知创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '通知更新时间',
  `sender` varchar(255) DEFAULT '管理员' COMMENT '通知发送者',
  `status` int NOT NULL DEFAULT '0' COMMENT '通知状态：0-草稿，1-已发送',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='通知表';

-- ----------------------------
-- Records of notification
-- ----------------------------
BEGIN;
INSERT INTO `notification` (`id`, `title`, `content`, `type`, `receiver_id`, `is_read`, `create_time`, `update_time`, `sender`, `status`) VALUES (1, '系统更新通知', '系统将于2023年10月1日进行版本更新，请做好相关准备。', 1, 0, 1, '2025-07-27 01:28:32', '2025-07-26 17:36:45', '系统管理员', 1);
INSERT INTO `notification` (`id`, `title`, `content`, `type`, `receiver_id`, `is_read`, `create_time`, `update_time`, `sender`, `status`) VALUES (2, '账户安全提醒', '请定期修改您的账户密码，确保账户安全。', 1, 0, 0, '2025-07-27 01:28:32', '2025-07-27 01:28:32', '安全团队', 1);
INSERT INTO `notification` (`id`, `title`, `content`, `type`, `receiver_id`, `is_read`, `create_time`, `update_time`, `sender`, `status`) VALUES (3, '新功能上线', '我们新增了通知管理功能，欢迎体验！', 1, 0, 0, '2025-07-27 01:28:32', '2025-07-27 01:28:32', '产品团队', 1);
INSERT INTO `notification` (`id`, `title`, `content`, `type`, `receiver_id`, `is_read`, `create_time`, `update_time`, `sender`, `status`) VALUES (4, '213', '123', 1, 0, 1, NULL, '2025-07-26 17:36:47', '管理员', 1);
INSERT INTO `notification` (`id`, `title`, `content`, `type`, `receiver_id`, `is_read`, `create_time`, `update_time`, `sender`, `status`) VALUES (5, '321', '321', 1, 0, 1, NULL, '2025-07-26 17:37:00', '管理员', 1);
INSERT INTO `notification` (`id`, `title`, `content`, `type`, `receiver_id`, `is_read`, `create_time`, `update_time`, `sender`, `status`) VALUES (6, '123', '321', 1, 0, 1, '2025-07-26 17:49:09', '2025-07-26 17:49:09', '管理员', 1);
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
  `author_id` int DEFAULT NULL COMMENT '作者',
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
  `video_address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '视频地址',
  `status` varchar(25) DEFAULT NULL COMMENT '生成状态',
  `resource_status` int(10) unsigned zerofill NOT NULL COMMENT '文章状态身份',
  PRIMARY KEY (`id`,`resource_status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=909016 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of resource
-- ----------------------------
BEGIN;
INSERT INTO `resource` (`id`, `sort_class`, `title`, `price`, `res_address`, `res_password`, `is_free`, `title_color`, `titlefont_size`, `titlefont_type`, `full_title`, `subhead`, `intro`, `content`, `author_id`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `love_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `carousel`, `thumb`, `video_address`, `status`, `resource_status`) VALUES (0000908400, 21, 'java课程', 0, 'https://vk.com/s/v1/doc/NpNuOyyVCGGfPUeKT_VmrvvfOSIr8M6ldWbzd0dohvLSD0I1cAs', NULL, 1, NULL, '310,9 МB', NULL, NULL, '', '一个课程', NULL, 3, 'https://www.sweethome3d.com/ru/', NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, '2022-11-16 06:54:56', NULL, '2022-11-16 06:54:56', NULL, NULL, NULL, NULL, NULL, NULL, '[{\"url\": \"https://appstorrent.ru/uploads/posts/2020-07/1595854357_1.jpg\", \"name\": \"123\", \"uid\": 1668582055770, \"status\": \"success\"}, {\"url\": \"https://appstorrent.ru/uploads/posts/2020-07/1595854418_2.jpg\", \"name\": \"123\", \"uid\": 1668582055770, \"status\": \"success\"}, {\"url\": \"https://appstorrent.ru/uploads/posts/2020-07/1595854357_3.jpg\", \"name\": \"123\", \"uid\": 1668582055770, \"status\": \"success\"}, {\"url\": \"https://appstorrent.ru/uploads/posts/2020-07/1595854380_4.jpg\", \"name\": \"123\", \"uid\": 1668582055770, \"status\": \"success\"}]', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrtoUqLmjt0AQxj0O4xbpLH4CbYp8Ae-0Peg&usqp=CAU', NULL, 'published', 0000071378);
INSERT INTO `resource` (`id`, `sort_class`, `title`, `price`, `res_address`, `res_password`, `is_free`, `title_color`, `titlefont_size`, `titlefont_type`, `full_title`, `subhead`, `intro`, `content`, `author_id`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `love_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `carousel`, `thumb`, `video_address`, `status`, `resource_status`) VALUES (0000908401, 21, '大数据课程', 0, 'https://vk.com/s/v1/doc/4jmq4pb_wZCjRZXpiLAFMEItm0Rf4-gUZDZBtJpHoLHUJyEPPxI', NULL, 1, NULL, '25,9 МB', NULL, NULL, '', '一个课程', NULL, 3, 'https://bjango.com/mac/istatmenus/', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-11-16 06:54:56', NULL, '2022-11-16 06:54:56', NULL, NULL, NULL, NULL, NULL, NULL, '[{\"url\": \"https://appstorrent.ru/uploads/posts/2020-08/1597502521_1.jpg\", \"name\": \"123\", \"uid\": 1668582055770, \"status\": \"success\"}, {\"url\": \"https://appstorrent.ru/uploads/posts/2020-08/1597502529_2.jpg\", \"name\": \"123\", \"uid\": 1668582055770, \"status\": \"success\"}, {\"url\": \"https://appstorrent.ru/uploads/posts/2020-08/1597502508_3.jpg\", \"name\": \"123\", \"uid\": 1668582055770, \"status\": \"success\"}, {\"url\": \"https://appstorrent.ru/uploads/posts/2020-08/1597502555_4.jpg\", \"name\": \"123\", \"uid\": 1668582055770, \"status\": \"success\"}]', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrtoUqLmjt0AQxj0O4xbpLH4CbYp8Ae-0Peg&usqp=CAU', NULL, 'published', 0005950922);
INSERT INTO `resource` (`id`, `sort_class`, `title`, `price`, `res_address`, `res_password`, `is_free`, `title_color`, `titlefont_size`, `titlefont_type`, `full_title`, `subhead`, `intro`, `content`, `author_id`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `love_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `carousel`, `thumb`, `video_address`, `status`, `resource_status`) VALUES (0000908402, 21, 'C++课程', 0, 'https://vk.com/s/v1/doc/8ySfvOJ_Hg2qedopsLCAmKwXy5I5C2YZdIG6dCOuOUY_veNeThg', NULL, 1, NULL, '66,7 МB', NULL, NULL, '', '一个课程', NULL, 3, 'https://gridsapp.net/', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-11-16 06:54:56', NULL, '2022-11-16 06:54:56', NULL, NULL, NULL, NULL, NULL, NULL, '[{\"url\": \"https://appstorrent.ru/uploads/posts/2019-06/1560612355_1.jpg\", \"name\": \"123\", \"uid\": 1668582055770, \"status\": \"success\"}, {\"url\": \"https://appstorrent.ru/uploads/posts/2019-06/1560612346_2.jpg\", \"name\": \"123\", \"uid\": 1668582055770, \"status\": \"success\"}, {\"url\": \"https://appstorrent.ru/uploads/posts/2019-06/1560612394_3.jpg\", \"name\": \"123\", \"uid\": 1668582055770, \"status\": \"success\"}, {\"url\": \"https://appstorrent.ru/uploads/posts/2019-06/1560612335_4.jpg\", \"name\": \"123\", \"uid\": 1668582055770, \"status\": \"success\"}]', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrtoUqLmjt0AQxj0O4xbpLH4CbYp8Ae-0Peg&usqp=CAU', NULL, 'published', 0006318653);
INSERT INTO `resource` (`id`, `sort_class`, `title`, `price`, `res_address`, `res_password`, `is_free`, `title_color`, `titlefont_size`, `titlefont_type`, `full_title`, `subhead`, `intro`, `content`, `author_id`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `love_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `carousel`, `thumb`, `video_address`, `status`, `resource_status`) VALUES (0000908403, 21, 'Python课程', 0, 'https://vk.com/s/v1/doc/KPO5oPGXSjVhUnG7ssWlTeQexEGBt6wdGWcMI5NF8tN2I-hjHyU', NULL, 1, NULL, '23,5 МB', NULL, NULL, '', '一个课程', '<p>PDF Squeezer 是一个简单的应用程序，可以快速压缩 PDF 文件。获取任意大小的 PDF，只需将其拖放到应用程序中即可获得更小的文件。 PDF 大小转换器非常适合传输文件、使它们符合应用程序限制或将它们上传到云端，尤其是当您不确定 Internet 连接的可靠性时。您需要的是使文件更小。打开应用程序，您会看到它有一个“将您的文件拖放到此处”区域，除此之外别无其他。拖放文件，缩小它，然后将其保存回您的 Mac 为 Web 压缩 PDF 文档 您可能已经在许多网站上看到过文档上传限制。工作申请、简历、签证文件 - 您现在可以非常轻松地上传有大小限制的在线表格所需的一切。减少一组 PDF 文件的大小您可以通过一次调整一组文件的大小来节省大量时间PDF 压缩器。它们的处理和尺寸减小将依次发生，以便您可以在过程结束时获得最终结果。与多个文件夹相同。压缩所有文件和文件夹您可以以相同的方式压缩文件夹及其子文件夹中的任何文件 - 一次全部压缩。只需将文件夹拖放到应用程序中，其中的每个 PDF 文件都会自动压缩，包括包含的子文件夹。适用于受密码保护的 PDF 如果您需要的文件是使用密码压缩的，请不要担心。该应用程序将缩小其大小并保持信息不变，包括密码。您可以确定您的重要文档在压缩后是安全的（并且重量更轻） 保持质量 如果您有一个很棒的演示文稿并且您担心压缩可能会破坏图像的质量，智能 PDF Squeezer 会处理它。您可以在压缩前调整质量以确保文件保持其正确的外观。</p>', 3, 'https://witt-software.com/pdfsqueezer/', NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, '2022-11-16 06:54:56', NULL, '2022-11-16 06:54:56', NULL, NULL, NULL, NULL, NULL, NULL, '[{\"url\": \"https://appstorrent.ru/uploads/posts/2021-05/1620964245_1.jpg\", \"name\": \"123\", \"uid\": 1668582055770, \"status\": \"success\"}, {\"url\": \"https://appstorrent.ru/uploads/posts/2021-05/1620964190_2.jpg\", \"name\": \"123\", \"uid\": 1668582055770, \"status\": \"success\"}, {\"url\": \"https://appstorrent.ru/uploads/posts/2021-05/1620964219_3.jpg\", \"name\": \"123\", \"uid\": 1668582055770, \"status\": \"success\"}, {\"url\": \"https://appstorrent.ru/uploads/posts/2021-05/1620964192_4.jpg\", \"name\": \"123\", \"uid\": 1668582055770, \"status\": \"success\"}]', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrtoUqLmjt0AQxj0O4xbpLH4CbYp8Ae-0Peg&usqp=CAU', NULL, 'published', 0007728351);
INSERT INTO `resource` (`id`, `sort_class`, `title`, `price`, `res_address`, `res_password`, `is_free`, `title_color`, `titlefont_size`, `titlefont_type`, `full_title`, `subhead`, `intro`, `content`, `author_id`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `love_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `carousel`, `thumb`, `video_address`, `status`, `resource_status`) VALUES (0000908404, 21, 'Rush课程', 0, 'https://vk.com/s/v1/doc/KPO5oPGXSjVhUnG7ssWlTeQexEGBt6wdGWcMI5NF8tN2I-hjHyU', '', 0, NULL, '52,9 МB', NULL, NULL, '', '一个课程', '<p>当您计划好每一分钟时，您需要一个不会成为维护负担的日历。试试 BusyCal，这是一款优雅且易于使用的日历，旨在让您的生活更轻松。加载了旅行时间跟踪、内置待办事项列表和快速添加事件等有用功能，此应用程序一定会为您节省时间和挫败感。此外，它的即时同步让您可以轻松地在设备之间切换或管理多个工作和个人日历。灵活的界面通过干净、易于理解的即将发生的事件面板轻松地在日、周和月视图之间切换。此外，定制设计更加细致。您不仅可以选择字体样式和大小、事件的颜色编码，还可以自定义一个月显示多少周、一周显示多少天。界面专为满足您的需求而设计。Easy Tasks 计划您的待办事项并查看您的日历，将它们无缝集成到您的日常工作中。 BusyCal 将您的任务摆在您面前，不会让您在一周内忘记它们，这对于长期计划非常有用。此外，您的待办事项列表会自动与其他提醒应用同步，让您永远不会忘记下一步该做什么。该应用程序甚至有一个单独的待办事项列表，您只需单击一下即可访问。快速编辑使用 BusyCal 仪表板轻松添加和编辑事件。它占据了应用程序的侧边栏，除其他外，还允许您更新帖子、时间、标签和地点。从好的方面来说，仪表板是高度可定制的，允许您根据自己的喜好为不同的事件定制重要信息。跟踪旅行时间由于 BusyCal 最有用的功能，即内置的行驶时间计数器，您再也不会迟到了。活动策划只是成功的一半，因为您必须考虑交通或转移问题。该应用程序与 Mac 上的地图和位置服务集成，为您提供有关旅行所需时间的准确信息，并允许您将这段时间安排到您的日程安排中。自然语言通过在讨论期间快速创建事件来同时完成多项任务。输入地点、参与者或时间，自然语言处理器将相应地进行解释和安排。这将使您的日程安排能够理解诸如“明天”之类的词，并以特定日期对其进行响应，从而节省您手动安排的时间。如有必要，可以关闭、暂停和重复通知；即使 BusyCal 应用程序窗口关闭，它们也能正常工作。这是确保您不会遗漏任何内容的好方法，仔细的计划会有回报。</p>', 3, 'https://www.busymac.com/', NULL, NULL, '', 13, NULL, 6, NULL, NULL, NULL, NULL, '2022-11-16 06:54:56', '2024-03-09 14:41:25', '2022-11-16 06:54:56', NULL, NULL, NULL, NULL, NULL, NULL, '[{\"url\": \"https://img2.baidu.com/it/u=2626841772,2093180758&fm=253&fmt=auto&app=138&f=JPEG?w=382&h=236\", \"name\": \"123\", \"uid\": 1668582055770, \"status\": \"success\"}, {\"url\": \"https://img2.baidu.com/it/u=2626841772,2093180758&fm=253&fmt=auto&app=138&f=JPEG?w=382&h=236\", \"name\": \"123\", \"uid\": 1668582055770, \"status\": \"success\"}, {\"url\": \"https://appstorrent.ru/uploads/posts/2021-07/1625841281_3.jpg\", \"name\": \"123\", \"uid\": 1668582055770, \"status\": \"success\"}, {\"url\": \"https://appstorrent.ru/uploads/posts/2021-07/1625841232_4.jpg\", \"name\": \"123\", \"uid\": 1668582055770, \"status\": \"success\"}]', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrtoUqLmjt0AQxj0O4xbpLH4CbYp8Ae-0Peg&usqp=CAU', NULL, 'published', 0004872805);
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
) ENGINE=InnoDB AUTO_INCREMENT=1228 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of resource_class
-- ----------------------------
BEGIN;
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000020, '图形设计', NULL, 'graphics', 'ggg', 'https://www.hereitis.cn/profile/upload/2021/10/27/10cfe819-b854-4f40-ab4b-04896f5c73b7.jpg', 0, NULL);
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000021, '开发工具', NULL, 'code', NULL, 'https://www.hereitis.cn/profile/upload/2021/10/27/f9a14f93-5fa0-40b7-98d8-68b61ff70e87.jpg', 0, NULL);
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000022, '社交网络', NULL, 'social', NULL, 'https://www.hereitis.cn/profile/upload/2021/10/27/e975097a-d296-4b8b-962c-f7791c38a6c3.jpg', 0, NULL);
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000023, '公用事业', NULL, 'utilities', NULL, 'https://www.hereitis.cn/profile/upload/2021/10/27/374990d3-c50a-4429-9ee7-30a9db66bcd3.jpg', 0, NULL);
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000024, '商业', NULL, 'teach', '', 'https://www.hereitis.cn/profile/upload/2021/10/27/ee01fee2-84dd-4fc0-afbd-515d027325df.jpg', 0, NULL);
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000025, '安全', NULL, 'Safety', NULL, 'https://www.hereitis.cn/profile/upload/2021/10/27/68f19b22-7823-4825-949a-bbd36e80cc7c.jpg', 0, NULL);
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000026, '教育', NULL, 'education', NULL, 'https://www.hereitis.cn/profile/upload/2021/10/27/249fe79b-0bfa-4345-a4d7-45a7918ab018.jpg', 0, NULL);
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000027, '设计', NULL, 'desion', NULL, 'https://www.hereitis.cn/profile/upload/2021/10/27/184f65a5-852b-4c49-87be-8709472ef90e.jpg', 0, NULL);
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000028, '表现', NULL, 'Performance', NULL, 'https://www.hereitis.cn/profile/upload/2021/10/27/c3feaf8e-a785-4714-9ee2-6e15e96c7308.jpg', 1, NULL);
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000029, '视频', NULL, 'video', NULL, 'https://www.hereitis.cn/profile/upload/2021/10/27/330b5c3a-4bfb-4cb6-a1a2-b472f65a642d.png', 0, NULL);
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000030, '音乐', NULL, 'music', NULL, 'https://www.hereitis.cn/profile/upload/2021/10/27/a74e76c9-fb98-47e4-bee7-484e42e868dd.jpg', 1, NULL);
INSERT INTO `resource_class` (`id`, `name`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000031, '照片', NULL, 'photo', 'hh', 'https://www.hereitis.cn/profile/upload/2021/10/27/ff0a46f7-b965-45ce-a901-7e2bf8e6f596.jpg', 1, 0);
COMMIT;

-- ----------------------------
-- Table structure for resource_comment
-- ----------------------------
DROP TABLE IF EXISTS `resource_comment`;
CREATE TABLE `resource_comment` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT 'id',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '内容',
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '用户名',
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '邮箱',
  `add_time` datetime DEFAULT NULL COMMENT '创建时间',
  `parent_id` int DEFAULT NULL COMMENT '父id',
  `foreign_id` int DEFAULT NULL COMMENT '外部id',
  `profile` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '头像',
  `resource_id` int DEFAULT NULL COMMENT '文章id',
  `user_id` int DEFAULT NULL COMMENT '用户id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

-- ----------------------------
-- Records of resource_comment
-- ----------------------------
BEGIN;
INSERT INTO `resource_comment` (`id`, `content`, `username`, `email`, `add_time`, `parent_id`, `foreign_id`, `profile`, `resource_id`, `user_id`) VALUES (0000000030, '接下来发送表情吧', 'tt', NULL, '2022-03-14 02:36:50', 7, 7, '7', 908400, 3);
INSERT INTO `resource_comment` (`id`, `content`, `username`, `email`, `add_time`, `parent_id`, `foreign_id`, `profile`, `resource_id`, `user_id`) VALUES (0000000057, '资源😃', '悠悠', NULL, NULL, NULL, NULL, '', 908400, 3);
INSERT INTO `resource_comment` (`id`, `content`, `username`, `email`, `add_time`, `parent_id`, `foreign_id`, `profile`, `resource_id`, `user_id`) VALUES (0000000058, '213', '悠悠', NULL, NULL, NULL, NULL, '', 908400, 3);
INSERT INTO `resource_comment` (`id`, `content`, `username`, `email`, `add_time`, `parent_id`, `foreign_id`, `profile`, `resource_id`, `user_id`) VALUES (0000000059, '88', '悠悠', '23339097@qq.com', '2022-05-08 08:26:59', NULL, NULL, '', 908400, 3);
INSERT INTO `resource_comment` (`id`, `content`, `username`, `email`, `add_time`, `parent_id`, `foreign_id`, `profile`, `resource_id`, `user_id`) VALUES (0000000060, '213', '悠悠', '23339097@qq.com', '2022-05-08 08:28:47', NULL, NULL, '', 908400, 3);
INSERT INTO `resource_comment` (`id`, `content`, `username`, `email`, `add_time`, `parent_id`, `foreign_id`, `profile`, `resource_id`, `user_id`) VALUES (0000000061, '222', '悠悠', '23339097@qq.com', '2022-05-09 09:53:19', NULL, NULL, '', 908400, 3);
INSERT INTO `resource_comment` (`id`, `content`, `username`, `email`, `add_time`, `parent_id`, `foreign_id`, `profile`, `resource_id`, `user_id`) VALUES (0000000063, '888', '测试', '233390923@qq.com', '2022-05-09 09:57:49', NULL, NULL, '', 908400, 3);
INSERT INTO `resource_comment` (`id`, `content`, `username`, `email`, `add_time`, `parent_id`, `foreign_id`, `profile`, `resource_id`, `user_id`) VALUES (0000000064, '666', '天天', '233312', '2022-08-19 15:42:20', NULL, NULL, '', 908400, 3);
INSERT INTO `resource_comment` (`id`, `content`, `username`, `email`, `add_time`, `parent_id`, `foreign_id`, `profile`, `resource_id`, `user_id`) VALUES (0000000065, '😛', '天天', '233312', '2022-08-19 15:42:36', NULL, NULL, '', 908400, 3);
COMMIT;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '名称',
  `sort` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '状态 1 启用 0 停用\n',
  `remark` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO `role` (`id`, `name`, `sort`, `create_time`, `update_time`, `code`, `status`, `remark`) VALUES (1, '订阅者', 'user:add', '2024-03-06 09:48:05', '2024-03-06 09:48:05', 'admin', '1', '超级管理员拥有最高权限');
INSERT INTO `role` (`id`, `name`, `sort`, `create_time`, `update_time`, `code`, `status`, `remark`) VALUES (2, '管理员', 'admin:all', '2024-03-06 09:48:05', '2024-03-06 09:48:05', 'admin', '1', '超级管理员拥有最高权限');
INSERT INTO `role` (`id`, `name`, `sort`, `create_time`, `update_time`, `code`, `status`, `remark`) VALUES (3, '会员', 'vip:get', '2024-03-06 09:48:05', '2025-07-26 14:02:52', 'admin', '1', '超级管理员拥有最高权限');
COMMIT;

-- ----------------------------
-- Table structure for s_cos_info
-- ----------------------------
DROP TABLE IF EXISTS `s_cos_info`;
CREATE TABLE `s_cos_info` (
  `id` int NOT NULL,
  `cos_intage` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '设置访问域名\n',
  `cos_bucket_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '存储桶名称\n',
  `cos_secret_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT 'secretId\n',
  `cos_secret_key` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT 'secretKey\n',
  `cos_client_config` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT 'bucket的区域\n',
  `is_cos` varchar(255) DEFAULT NULL,
  `storageType` int DEFAULT NULL,
  `qiniuAccessKey` varchar(255) DEFAULT NULL,
  `qiniuSecretKey` varchar(255) DEFAULT NULL,
  `qiniuBucketName` varchar(255) DEFAULT NULL,
  `qiniuDomain` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of s_cos_info
-- ----------------------------
BEGIN;
INSERT INTO `s_cos_info` (`id`, `cos_intage`, `cos_bucket_name`, `cos_secret_id`, `cos_secret_key`, `cos_client_config`, `is_cos`, `storageType`, `qiniuAccessKey`, `qiniuSecretKey`, `qiniuBucketName`, `qiniuDomain`) VALUES (1, '', '213', '213', '32', '', '0', NULL, NULL, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for s_mail_info
-- ----------------------------
DROP TABLE IF EXISTS `s_mail_info`;
CREATE TABLE `s_mail_info` (
  `id` int NOT NULL,
  `username` varchar(255) DEFAULT NULL COMMENT '发送人邮箱\n',
  `password` varchar(255) DEFAULT NULL COMMENT '邮箱授权码(上面获取到的)\n',
  `host` varchar(255) DEFAULT NULL COMMENT '邮件服务器,163邮箱就是smtp.163.com\n',
  `protocol` varchar(255) DEFAULT NULL COMMENT '协议，可以不配，默认就是这个\n',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of s_mail_info
-- ----------------------------
BEGIN;
INSERT INTO `s_mail_info` (`id`, `username`, `password`, `host`, `protocol`) VALUES (1, '23339097@qq.com', 'gsagrtgbwgicbhci', 'smtp.qq.com', 'smtp');
COMMIT;

-- ----------------------------
-- Table structure for s_message_info
-- ----------------------------
DROP TABLE IF EXISTS `s_message_info`;
CREATE TABLE `s_message_info` (
  `id` int DEFAULT NULL,
  `qiniu_access_key` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `qiniu_secret_key` varchar(255) DEFAULT NULL,
  `qiniu_template_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of s_message_info
-- ----------------------------
BEGIN;
INSERT INTO `s_message_info` (`id`, `qiniu_access_key`, `qiniu_secret_key`, `qiniu_template_id`) VALUES (1, 'l2yQr9jVkoiWocAdF6rCCjc7qd2p0guGOOl0q6Ab', 'fwTqX4lGvZxpewHxOnVCXXlSXE4mED8AARdNq9Fv', '1810648952882606080');
COMMIT;

-- ----------------------------
-- Table structure for s_mini_info
-- ----------------------------
DROP TABLE IF EXISTS `s_mini_info`;
CREATE TABLE `s_mini_info` (
  `id` int DEFAULT NULL,
  `appid` varchar(255) DEFAULT NULL,
  `secret` varchar(255) DEFAULT NULL,
  `env_version` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of s_mini_info
-- ----------------------------
BEGIN;
INSERT INTO `s_mini_info` (`id`, `appid`, `secret`, `env_version`) VALUES (1, 'wxaefe5514050d06c5', 'e7232260c97582d49f055f015b482504', 'develop');
COMMIT;

-- ----------------------------
-- Table structure for s_wx_login
-- ----------------------------
DROP TABLE IF EXISTS `s_wx_login`;
CREATE TABLE `s_wx_login` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `scene` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `creat_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=377 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of s_wx_login
-- ----------------------------
BEGIN;
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000001, 'db2615', NULL, '0', '2024-06-11 17:56:01');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000002, '20e71a', '55', '1', '2024-06-11 17:58:11');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000003, 'd073be', NULL, '0', '2024-06-14 13:58:03');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000004, '46cdcd', NULL, '0', '2024-06-14 14:38:40');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000005, '5e1cec', NULL, '0', '2024-06-14 16:11:38');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000006, '1fc2a5', NULL, '0', '2024-06-14 16:13:25');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000007, '7cf3de', NULL, '0', '2024-06-14 16:16:07');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000008, '51fa50', NULL, '0', '2024-06-14 16:17:10');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000009, 'd56a42', NULL, '0', '2024-06-14 16:18:03');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000010, '6049ff', NULL, '0', '2024-06-14 16:20:10');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000011, '1c2bf4', NULL, '0', '2024-06-14 16:23:56');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000012, '9ad728', '56', '1', '2024-06-14 16:25:01');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000013, 'a81754', '57', '1', '2024-06-14 16:26:15');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000014, '4dc811', '58', '1', '2024-06-14 16:32:15');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000015, 'abe76e', '59', '1', '2024-06-14 16:33:02');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000016, '9a1e8c', '60', '1', '2024-06-14 16:35:57');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000017, '580aa8', '60', '1', '2024-06-14 16:39:09');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000018, 'ae6de1', NULL, '0', '2024-06-14 16:43:27');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000019, '263724', NULL, '0', '2024-06-19 13:54:45');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000020, 'f7b8ea', NULL, '0', '2024-06-19 13:54:58');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000021, 'cfa631', NULL, '0', '2024-06-19 13:55:59');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000022, '84b29b', NULL, '0', '2024-06-19 13:56:18');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000023, '3f69d3', NULL, '0', '2024-06-19 14:02:18');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000024, '6e47b6', NULL, '0', '2024-06-19 14:03:00');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000025, 'b6652a', NULL, '0', '2024-06-19 14:06:01');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000026, 'db17d6', NULL, '0', '2024-06-19 14:06:06');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000027, '9d4d6b', NULL, '0', '2024-06-19 14:06:07');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000028, 'f3bef9', NULL, '0', '2024-06-19 14:06:09');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000029, '728360', NULL, '0', '2024-06-19 14:06:10');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000030, '7e3b7b', NULL, '0', '2024-06-19 14:06:11');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000031, '48a29e', NULL, '0', '2024-06-19 14:06:42');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000032, '8aac01', NULL, '0', '2024-06-19 14:06:47');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000033, '29e219', NULL, '0', '2024-06-19 14:08:45');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000034, '034b31', NULL, '0', '2024-06-19 14:08:57');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000035, 'f29519', NULL, '0', '2024-06-19 14:08:59');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000036, '4b21eb', NULL, '0', '2024-06-19 14:09:03');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000037, 'c7e5b4', NULL, '0', '2024-06-19 14:09:42');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000038, 'f8899c', NULL, '0', '2024-06-19 14:10:03');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000039, '587135', NULL, '0', '2024-06-19 14:10:05');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000040, '4b9b51', NULL, '0', '2024-06-19 14:10:07');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000041, '4fe97f', NULL, '0', '2024-06-19 14:10:14');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000042, 'd56bde', NULL, '0', '2024-06-19 14:10:18');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000043, 'a948d9', NULL, '0', '2024-06-19 14:10:21');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000044, '631168', NULL, '0', '2024-06-19 14:10:24');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000045, 'a50596', NULL, '0', '2024-06-19 14:10:26');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000046, 'e861c4', NULL, '0', '2024-06-19 14:10:33');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000047, '003593', NULL, '0', '2024-06-19 14:10:36');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000048, 'bbcacd', NULL, '0', '2024-06-19 15:09:38');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000049, 'bca22f', NULL, '0', '2024-06-19 15:09:40');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000050, 'eb8227', NULL, '0', '2024-06-19 15:09:42');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000051, '8b3c73', NULL, '0', '2024-06-19 15:09:46');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000052, 'd4a6c6', NULL, '0', '2024-06-19 15:09:47');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000053, '4bbebb', NULL, '0', '2024-06-19 15:10:02');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000054, '991877', NULL, '0', '2024-06-19 15:11:16');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000055, 'acc840', NULL, '0', '2024-06-19 15:11:18');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000056, 'bd7bde', NULL, '0', '2024-06-19 15:11:21');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000057, '2f7542', NULL, '0', '2024-06-19 15:12:04');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000058, '51b211', NULL, '0', '2024-06-19 15:12:07');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000059, '1790cd', NULL, '0', '2024-06-19 15:12:11');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000060, '2b66ff', NULL, '0', '2024-06-19 15:12:13');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000061, 'fadffc', NULL, '0', '2024-06-19 15:12:15');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000062, 'f2c618', NULL, '0', '2024-06-19 15:12:20');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000063, '20f9db', NULL, '0', '2024-06-19 15:12:46');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000064, '0dca9f', NULL, '0', '2024-06-19 15:13:12');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000065, 'ed5815', NULL, '0', '2024-06-19 15:13:16');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000066, '5f80bf', NULL, '0', '2024-06-19 15:13:19');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000067, '12b610', NULL, '0', '2024-06-19 15:14:34');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000068, 'e7e727', NULL, '0', '2024-06-19 15:20:02');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000069, '426118', NULL, '0', '2024-06-19 15:22:44');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000070, 'ad93d4', NULL, '0', '2024-06-19 15:23:47');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000071, 'bc958e', NULL, '0', '2024-06-19 15:24:24');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000072, '1c9312', NULL, '0', '2024-06-19 15:30:30');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000073, '4657e6', NULL, '0', '2024-06-19 15:34:35');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000074, 'c66756', NULL, '0', '2024-06-19 15:34:52');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000075, 'a393d9', NULL, '0', '2024-06-19 15:34:54');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000076, '5b9192', NULL, '0', '2024-06-19 15:35:14');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000077, '6382f8', NULL, '0', '2024-06-19 15:35:42');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000078, '7926f4', NULL, '0', '2024-06-19 15:36:32');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000079, 'acd9ea', NULL, '0', '2024-06-19 15:36:35');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000080, 'c91dda', NULL, '0', '2024-06-19 15:36:39');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000081, '3cf7a5', NULL, '0', '2024-06-19 15:37:04');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000082, '536519', NULL, '0', '2024-06-19 15:37:20');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000083, '567d89', NULL, '0', '2024-06-19 15:37:30');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000084, 'ad7e61', NULL, '0', '2024-06-19 15:37:40');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000085, 'dac68c', NULL, '0', '2024-06-20 11:13:46');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000086, 'bc91ba', NULL, '0', '2024-06-20 11:16:01');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000087, '96c543', NULL, '0', '2024-06-20 11:16:13');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000088, 'a4bd13', NULL, '0', '2024-06-20 11:16:57');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000089, '42c752', NULL, '0', '2024-06-20 11:17:04');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000090, 'b8c3f0', NULL, '0', '2024-06-20 11:17:11');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000091, 'e644ee', NULL, '0', '2024-06-20 11:17:17');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000092, 'e5f710', NULL, '0', '2024-06-20 11:17:23');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000093, '5fbd2e', NULL, '0', '2024-06-20 11:17:25');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000094, '85fb07', NULL, '0', '2024-06-20 11:40:13');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000095, 'e9b92b', NULL, '0', '2024-06-20 11:40:18');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000096, '7db25a', NULL, '0', '2024-06-20 11:40:53');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000097, '648f2b', NULL, '0', '2024-06-20 11:43:05');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000098, 'b32a37', NULL, '0', '2024-06-20 11:43:23');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000099, 'b00917', NULL, '0', '2024-06-20 11:43:54');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000100, '4de9db', NULL, '0', '2024-06-20 11:44:10');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000101, '7ff716', NULL, '0', '2024-06-20 11:47:17');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000102, 'eca0fe', NULL, '0', '2024-06-20 11:47:18');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000103, 'a1018e', NULL, '0', '2024-06-20 11:47:18');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000104, '54df37', NULL, '0', '2024-06-20 11:47:19');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000105, '5c6d41', NULL, '0', '2024-06-20 11:47:19');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000106, '491c47', NULL, '0', '2024-06-20 11:47:19');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000107, 'dd568f', NULL, '0', '2024-06-20 11:47:20');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000108, 'ee7488', NULL, '0', '2024-06-20 11:47:20');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000109, '57ed7d', NULL, '0', '2024-06-20 11:47:20');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000110, '774f2a', NULL, '0', '2024-06-20 11:47:21');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000111, '5b537a', NULL, '0', '2024-06-20 11:47:21');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000112, 'c02849', NULL, '0', '2024-06-20 11:47:22');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000113, '6802e7', NULL, '0', '2024-06-20 11:47:22');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000114, '399d97', NULL, '0', '2024-06-20 11:47:23');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000115, '9afa3f', NULL, '0', '2024-06-20 11:47:23');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000116, '6f6f97', NULL, '0', '2024-06-20 11:47:24');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000117, '5f730f', NULL, '0', '2024-06-20 11:47:24');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000118, '1603fa', NULL, '0', '2024-06-20 11:47:24');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000119, '484056', NULL, '0', '2024-06-20 11:47:25');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000120, '8b290f', NULL, '0', '2024-06-20 11:47:25');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000121, '08e739', NULL, '0', '2024-06-20 11:47:26');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000122, 'da7f95', NULL, '0', '2024-06-20 11:47:26');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000123, 'cc8469', NULL, '0', '2024-06-20 11:49:21');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000124, 'dea499', NULL, '0', '2024-06-20 11:50:08');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000125, '387de6', NULL, '0', '2024-06-20 11:53:01');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000126, '8a1ba8', NULL, '0', '2024-06-20 11:54:48');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000127, '134947', NULL, '0', '2024-06-20 11:56:34');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000128, '13925f', NULL, '0', '2024-06-20 11:57:11');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000129, 'b02fd1', NULL, '0', '2024-06-20 11:57:17');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000130, 'e08de8', NULL, '0', '2024-06-20 12:00:28');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000131, '39883f', NULL, '0', '2024-06-20 12:00:34');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000132, '269750', NULL, '0', '2024-06-20 12:04:02');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000133, '607d4e', '60', '1', '2024-06-20 12:04:08');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000134, 'caf805', '60', '1', '2024-06-20 12:09:37');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000135, '3347ca', '60', '1', '2024-06-20 12:10:42');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000136, '4c35b6', NULL, '0', '2024-06-20 13:04:08');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000137, 'ec4565', NULL, '0', '2024-06-20 13:12:33');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000138, '2ee5ce', '60', '1', '2024-06-20 13:12:49');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000139, 'bb4946', '60', '1', '2024-06-20 13:16:09');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000140, '56ce9a', '60', '1', '2024-06-20 13:19:01');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000141, '57db76', '60', '1', '2024-06-20 13:19:48');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000142, '86ef9a', '60', '1', '2024-06-20 13:23:26');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000143, '6f802a', NULL, '0', '2024-06-23 13:37:04');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000144, '306df1', NULL, '0', '2024-06-23 13:44:57');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000145, '4eb4fc', NULL, '0', '2024-06-23 13:48:27');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000146, 'bc1457', NULL, '0', '2024-06-23 15:37:20');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000147, '0c03c1', NULL, '0', '2024-06-23 15:50:18');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000148, '55bd20', '60', '1', '2024-06-23 15:50:33');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000149, '9755f9', '60', '1', '2024-06-23 15:53:27');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000150, '0dbbd9', '60', '1', '2024-06-23 15:54:17');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000151, '924ecb', '60', '1', '2024-06-23 15:54:37');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000152, 'b22957', '60', '1', '2024-06-23 15:55:35');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000153, '1a673f', NULL, '0', '2024-06-23 15:57:17');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000154, '30b0cd', NULL, '0', '2024-06-23 15:57:18');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000155, '1a4c93', NULL, '0', '2024-06-23 15:58:02');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000156, 'c0eb55', NULL, '0', '2024-06-23 15:59:43');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000157, '2a5b3e', NULL, '0', '2024-06-23 15:59:46');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000158, 'd339bb', NULL, '0', '2024-06-23 15:59:47');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000159, 'cd197a', NULL, '0', '2024-06-23 16:00:10');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000160, '5fffb9', NULL, '0', '2024-06-23 16:00:15');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000161, 'cf5930', NULL, '0', '2024-06-23 16:00:20');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000162, 'a70814', NULL, '0', '2024-06-23 16:00:23');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000163, 'e5dc51', NULL, '0', '2024-06-23 16:00:25');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000164, '9501e3', NULL, '0', '2024-06-23 16:00:31');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000165, '4d4eef', NULL, '0', '2024-06-23 16:00:36');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000166, '289784', NULL, '0', '2024-06-23 16:00:43');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000167, 'f4dff1', NULL, '0', '2024-06-23 16:02:21');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000168, '1d8544', NULL, '0', '2024-06-23 16:02:26');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000169, '60a1a2', NULL, '0', '2024-06-23 16:02:33');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000170, '192c00', NULL, '0', '2024-06-23 16:02:40');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000171, '5deabb', NULL, '0', '2024-06-23 16:02:45');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000172, '5d00e6', NULL, '0', '2024-06-23 16:02:47');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000173, '527925', NULL, '0', '2024-06-23 16:02:49');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000174, 'f47f8d', NULL, '0', '2024-06-23 16:02:55');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000175, '8354df', NULL, '0', '2024-06-23 16:03:21');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000176, 'e5c03b', NULL, '0', '2024-06-23 16:04:07');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000177, 'a0a795', NULL, '0', '2024-06-23 16:04:11');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000178, '23ea3b', NULL, '0', '2024-06-23 16:04:16');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000179, '598303', NULL, '0', '2024-06-23 16:04:18');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000180, '2f659e', NULL, '0', '2024-06-23 16:04:22');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000181, '8ce272', NULL, '0', '2024-06-23 16:04:28');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000182, '8e65ff', NULL, '0', '2024-06-23 16:04:34');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000183, '7f7f0b', NULL, '0', '2024-06-23 16:04:37');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000184, '73e224', NULL, '0', '2024-06-23 16:04:41');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000185, '7594d0', NULL, '0', '2024-06-23 16:04:45');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000186, '3c5e60', NULL, '0', '2024-06-23 16:04:49');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000187, '725a69', NULL, '0', '2024-06-23 16:04:53');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000188, '1a2b85', NULL, '0', '2024-06-23 16:04:59');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000189, '389907', NULL, '0', '2024-06-23 16:05:27');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000190, 'ee40b0', NULL, '0', '2024-06-23 16:05:34');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000191, 'b0e6ce', NULL, '0', '2024-06-23 16:06:10');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000192, '5d74d3', NULL, '0', '2024-06-23 16:06:19');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000193, '9d305e', NULL, '0', '2024-06-23 16:06:22');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000194, '1baf5f', NULL, '0', '2024-06-23 16:06:26');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000195, '8ba6b4', NULL, '0', '2024-06-23 16:06:29');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000196, '1b81ec', NULL, '0', '2024-06-23 16:06:29');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000197, 'f7078f', NULL, '0', '2024-06-23 16:06:35');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000198, '65c4d2', NULL, '0', '2024-06-23 16:06:43');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000199, '09b67e', NULL, '0', '2024-06-23 16:06:48');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000200, '90be6f', NULL, '0', '2024-06-23 16:06:50');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000201, '56bfe6', NULL, '0', '2024-06-23 16:06:52');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000202, 'e28c99', NULL, '0', '2024-06-23 16:06:55');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000203, '8b6f06', NULL, '0', '2024-06-23 16:06:59');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000204, 'c753aa', NULL, '0', '2024-06-23 16:07:03');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000205, 'cfc8a7', NULL, '0', '2024-06-23 16:07:06');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000206, '3e5fd5', NULL, '0', '2024-06-23 16:07:13');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000207, 'a6f8c1', NULL, '0', '2024-06-23 16:07:18');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000208, '0a8e12', NULL, '0', '2024-06-23 16:07:21');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000209, '4b8dde', NULL, '0', '2024-06-23 16:07:25');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000210, '9f9af4', NULL, '0', '2024-06-23 16:07:28');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000211, 'c0dfa9', NULL, '0', '2024-06-23 16:07:30');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000212, 'baeefa', NULL, '0', '2024-06-23 16:07:32');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000213, '58ac1e', NULL, '0', '2024-06-23 16:07:33');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000214, '9f2ba9', NULL, '0', '2024-06-23 16:07:36');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000215, '653c8a', NULL, '0', '2024-06-23 16:07:39');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000216, 'fd2d5a', NULL, '0', '2024-06-23 16:07:40');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000217, '93db62', NULL, '0', '2024-06-23 16:07:43');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000218, 'ce19bd', NULL, '0', '2024-06-23 16:07:47');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000219, '910b30', NULL, '0', '2024-06-23 16:07:49');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000220, 'b78122', NULL, '0', '2024-06-23 16:07:52');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000221, '809156', NULL, '0', '2024-06-23 16:07:53');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000222, '805b0e', NULL, '0', '2024-06-23 16:07:57');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000223, '1ae72a', NULL, '0', '2024-06-23 16:10:22');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000224, '8668fe', NULL, '0', '2024-06-23 16:10:31');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000225, '776cd8', NULL, '0', '2024-06-23 16:10:34');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000226, '4de31f', NULL, '0', '2024-06-23 16:10:35');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000227, 'fcc50e', NULL, '0', '2024-06-23 16:10:35');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000228, 'da0852', NULL, '0', '2024-06-23 16:10:41');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000229, '8eabdc', NULL, '0', '2024-06-23 16:10:46');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000230, 'bceb26', NULL, '0', '2024-06-23 16:11:14');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000231, '0df497', NULL, '0', '2024-06-23 16:11:17');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000232, '07f377', NULL, '0', '2024-06-23 16:11:19');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000233, 'dc2806', NULL, '0', '2024-06-23 16:11:23');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000234, '41524a', NULL, '0', '2024-06-23 16:11:26');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000235, 'b7b8f7', NULL, '0', '2024-06-23 16:11:28');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000236, '050b07', NULL, '0', '2024-06-23 16:11:30');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000237, 'e445a7', NULL, '0', '2024-06-23 16:11:35');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000238, '3d7cab', NULL, '0', '2024-06-23 16:11:43');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000239, '98efbb', NULL, '0', '2024-06-23 16:11:47');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000240, '7755a6', NULL, '0', '2024-06-23 16:12:10');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000241, '064530', NULL, '0', '2024-06-23 16:12:13');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000242, '05bca8', NULL, '0', '2024-06-23 16:12:17');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000243, '73c808', NULL, '0', '2024-06-23 16:12:18');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000244, '83d34b', NULL, '0', '2024-06-23 16:12:20');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000245, 'fb5a2e', NULL, '0', '2024-06-23 16:12:22');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000246, 'f9b65e', NULL, '0', '2024-06-23 16:12:25');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000247, '41a3d5', NULL, '0', '2024-06-23 16:12:26');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000248, 'e8e179', NULL, '0', '2024-06-23 16:12:27');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000249, 'c4cab2', NULL, '0', '2024-06-23 16:12:28');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000250, 'd22d29', NULL, '0', '2024-06-23 16:12:34');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000251, '8542ba', NULL, '0', '2024-06-23 16:12:37');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000252, '7cc5af', NULL, '0', '2024-06-23 16:12:40');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000253, 'cf5a3c', NULL, '0', '2024-06-23 16:12:44');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000254, 'f5e71c', NULL, '0', '2024-06-23 16:12:51');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000255, '95a0ae', NULL, '0', '2024-06-23 16:14:36');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000256, '8607fb', NULL, '0', '2024-06-23 16:14:40');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000257, '856aa0', NULL, '0', '2024-06-23 16:14:46');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000258, '6b755a', NULL, '0', '2024-06-24 18:23:04');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000259, '79c575', NULL, '0', '2024-07-07 05:54:36');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000260, 'c7f5e5', NULL, '0', '2024-07-07 05:54:40');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000261, 'a4a6a6', NULL, '0', '2024-07-07 14:05:24');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000262, 'cbb262', NULL, '0', '2024-07-07 14:06:07');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000263, 'f6eab7', NULL, '0', '2024-07-07 14:06:09');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000264, 'b2b461', NULL, '0', '2024-07-07 14:06:14');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000265, '5608f2', NULL, '0', '2024-07-07 14:06:28');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000266, '85cb23', NULL, '0', '2024-07-07 14:06:30');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000267, 'f83bec', NULL, '0', '2024-07-11 17:00:55');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000268, '4bc697', NULL, '0', '2024-07-11 17:01:33');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000269, '1bef96', NULL, '0', '2024-07-11 17:04:27');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000270, '5bb862', NULL, '0', '2024-07-11 17:05:09');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000271, '3423ea', NULL, '0', '2024-07-11 17:05:27');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000272, '782c33', NULL, '0', '2024-07-11 17:06:45');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000273, 'fdecc6', NULL, '0', '2024-07-11 17:06:58');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000274, '94e2c7', NULL, '0', '2024-07-11 17:08:56');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000275, '4494a3', NULL, '0', '2024-07-11 17:09:56');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000276, '8523da', NULL, '0', '2024-07-11 17:11:50');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000277, 'd7cc22', NULL, '0', '2024-07-11 17:15:34');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000278, '13441f', NULL, '0', '2024-07-11 17:15:58');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000279, '6a0dd7', NULL, '0', '2024-07-11 17:16:06');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000280, '972224', NULL, '0', '2024-07-17 16:25:54');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000281, '4c7cff', NULL, '0', '2024-07-17 16:28:10');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000282, '83b757', NULL, '0', '2024-07-17 16:29:07');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000283, '5836f5', NULL, '0', '2024-07-17 16:29:45');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000284, '52405d', NULL, '0', '2024-07-17 16:38:58');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000285, '9f8dcc', NULL, '0', '2024-07-20 06:05:27');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000286, '8ba0cd', NULL, '0', '2024-07-20 06:05:30');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000287, '69bacb', NULL, '0', '2024-07-20 13:50:08');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000288, 'f33252', NULL, '0', '2024-07-20 13:57:08');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000289, '4d637f', NULL, '0', '2024-07-20 13:59:59');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000290, 'e18dd1', NULL, '0', '2024-07-20 14:01:10');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000291, 'a03b7b', NULL, '0', '2024-07-20 14:09:37');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000292, 'fd83c8', NULL, '0', '2024-07-20 14:14:39');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000293, 'bbc334', NULL, '0', '2024-07-20 14:14:43');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000294, '3f4e57', NULL, '0', '2024-07-20 14:20:02');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000295, 'd4eb2a', NULL, '0', '2024-07-20 14:20:30');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000296, 'd731ea', NULL, '0', '2024-07-20 14:26:19');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000297, '7105a6', NULL, '0', '2024-07-20 14:27:46');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000298, 'bd189e', NULL, '0', '2024-07-20 14:32:03');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000299, '952ac5', NULL, '0', '2024-07-20 14:33:31');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000300, '560d84', NULL, '0', '2024-07-20 14:33:41');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000301, 'b2dc5c', NULL, '0', '2024-07-20 14:38:53');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000302, 'dad491', NULL, '0', '2024-07-20 14:42:34');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000303, '165da2', NULL, '0', '2024-07-20 14:43:08');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000304, '29fe6e', NULL, '0', '2024-07-20 14:43:18');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000305, 'aa93a3', NULL, '0', '2024-07-20 14:52:26');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000306, '255071', NULL, '0', '2024-07-20 14:55:15');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000307, 'f47fdd', NULL, '0', '2024-07-24 13:09:23');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000308, 'b23424', NULL, '0', '2024-07-24 13:11:46');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000309, '85af8d', NULL, '0', '2024-07-25 12:28:24');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000310, '1d5672', NULL, '0', '2024-07-27 17:55:18');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000311, 'be3f07', NULL, '0', '2024-07-28 17:02:52');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000312, '747fec', NULL, '0', '2024-07-28 17:02:56');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000313, '9f311e', NULL, '0', '2024-07-28 17:02:57');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000314, '4afced', NULL, '0', '2024-07-28 17:03:02');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000315, 'd9a111', NULL, '0', '2024-07-28 17:25:57');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000316, '8b6210', NULL, '0', '2024-07-28 17:43:02');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000317, '0a67b4', NULL, '0', '2024-07-28 17:43:38');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000318, 'bed658', NULL, '0', '2024-07-28 17:45:02');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000319, '0c0fe8', NULL, '0', '2024-07-28 17:53:34');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000320, 'ded8b8', NULL, '0', '2024-10-11 09:50:42');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000321, '3c87ef', NULL, '0', '2024-10-11 09:51:35');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000322, '0ddd16', NULL, '0', '2024-10-19 08:17:19');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000323, 'e62b6f', NULL, '0', '2024-10-19 08:29:50');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000324, '58bc83', NULL, '0', '2024-10-19 08:59:38');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000325, '708b83', NULL, '0', '2024-10-19 09:00:54');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000326, '288684', NULL, '0', '2024-10-19 09:03:38');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000327, 'ebadb9', NULL, '0', '2024-10-19 09:06:33');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000328, '0f6c47', NULL, '0', '2024-10-19 09:13:56');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000329, 'f95a44', NULL, '0', '2024-10-19 09:14:44');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000330, '01f818', NULL, '0', '2024-10-20 14:54:56');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000331, 'fb97f3', NULL, '0', '2024-10-20 15:17:29');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000332, '4bc790', NULL, '0', '2024-10-20 15:18:50');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000333, '5c2d11', NULL, '0', '2024-10-20 15:37:57');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000334, '2e0be9', '76', '1', '2024-10-20 15:50:26');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000335, 'da40c0', NULL, '0', '2024-10-20 15:54:02');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000336, '9d2c4f', NULL, '0', '2024-10-21 09:49:06');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000337, '2796b1', NULL, '0', '2024-10-22 09:00:22');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000338, '328697', NULL, '0', '2024-10-22 09:00:22');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000339, '545513', NULL, '0', '2024-10-22 09:00:25');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000340, 'a9db52', NULL, '0', '2024-10-22 09:00:28');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000341, 'f42985', NULL, '0', '2024-10-22 09:00:31');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000342, '6adac8', NULL, '0', '2024-10-22 09:00:33');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000343, '06213b', NULL, '0', '2024-10-22 09:00:38');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000344, '17788e', NULL, '0', '2024-10-22 09:24:07');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000345, 'a6195d', NULL, '0', '2024-10-30 06:04:22');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000346, 'ac952d', NULL, '0', '2024-10-30 06:04:25');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000347, 'bb8d3c', NULL, '0', '2024-10-30 06:05:37');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000348, '40525d', NULL, '0', '2024-10-30 06:05:39');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000349, '936685', NULL, '0', '2024-10-30 06:23:42');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000350, 'aa85e2', NULL, '0', '2024-10-30 06:23:45');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000351, '9658ce', NULL, '0', '2024-10-30 06:24:58');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000352, 'ede171', NULL, '0', '2024-10-30 06:25:09');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000353, 'cff7d7', NULL, '0', '2024-10-30 06:25:13');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000354, 'c2860e', NULL, '0', '2024-10-30 06:26:02');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000355, '80ec32', NULL, '0', '2024-10-30 06:26:33');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000356, '3835a1', NULL, '0', '2024-10-30 06:26:45');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000357, 'adff22', NULL, '0', '2024-10-30 06:27:27');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000358, '203b73', NULL, '0', '2024-10-30 16:18:53');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000359, '5c9c6e', NULL, '0', '2024-10-30 16:26:27');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000360, '94b63a', NULL, '0', '2024-10-30 16:26:33');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000361, '2ef2d9', NULL, '0', '2024-10-31 12:36:48');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000362, '90a6ea', NULL, '0', '2024-10-31 12:36:50');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000363, '90d62f', NULL, '0', '2024-10-31 12:37:45');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000364, 'ebcb60', NULL, '0', '2024-11-02 17:47:13');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000365, '288d81', NULL, '0', '2024-11-04 15:33:28');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000366, '06f76b', NULL, '0', '2024-11-04 15:33:30');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000367, 'dd7eaa', NULL, '0', '2024-11-04 15:34:25');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000368, 'fcdb9e', NULL, '0', '2024-11-04 15:34:30');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000369, 'ec1a82', NULL, '0', '2024-11-04 15:34:43');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000370, 'dbafda', NULL, '0', '2024-11-05 10:06:15');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000371, 'a1fa20', NULL, '0', '2024-11-05 11:59:18');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000372, 'cbbbbf', NULL, '0', '2024-11-05 11:59:30');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000373, 'b87662', NULL, '0', '2024-11-05 12:03:14');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000374, 'f25821', NULL, '0', '2024-11-05 12:03:18');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000375, 'ddc71d', NULL, '0', '2024-11-05 12:03:54');
INSERT INTO `s_wx_login` (`id`, `scene`, `user_id`, `status`, `creat_time`) VALUES (0000000376, '851ffd', NULL, '0', '2024-11-05 12:04:05');
COMMIT;

-- ----------------------------
-- Table structure for setting
-- ----------------------------
DROP TABLE IF EXISTS `setting`;
CREATE TABLE `setting` (
  `id` int NOT NULL COMMENT 'id',
  `sit_title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '网站标题',
  `sit_src` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `beian` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '备案号',
  `banquan` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '版权©️',
  `sit_logo` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '网站Logo',
  `image_format` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `comment_show` int DEFAULT NULL COMMENT '评论显示',
  `h5_show` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

-- ----------------------------
-- Records of setting
-- ----------------------------
BEGIN;
INSERT INTO `setting` (`id`, `sit_title`, `sit_src`, `beian`, `banquan`, `sit_logo`, `image_format`, `comment_show`, `h5_show`) VALUES (1, 'IceCMS', 'www.icecms.cn', '鲁ICP备1390123123号', 'www.icecms.cn © 2024. All rights reserved.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2d7bF1q2WBQnHUhqaR2OuxjFiv_EIWBwqow&s', '1', 0, '0');
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
  `image` varchar(1024) DEFAULT NULL,
  `thumb` varchar(255) DEFAULT NULL COMMENT '缩略图地址',
  `status` varchar(25) DEFAULT NULL COMMENT '生成状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=282 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of square
-- ----------------------------
BEGIN;
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000241, 1, NULL, NULL, NULL, NULL, NULL, NULL, '123', 123, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-04-27 06:04:11', '2022-04-27 06:04:11', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000242, 1, NULL, NULL, NULL, NULL, NULL, NULL, '<p>123321</p>', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-04-27 06:10:11', '2022-04-27 06:10:11', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000243, 1, NULL, NULL, NULL, NULL, NULL, NULL, '<p>123321</p>', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-04-27 06:10:12', '2022-04-27 06:10:12', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000244, 1, NULL, NULL, NULL, NULL, NULL, NULL, '<p>mm</p>', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-04-27 07:45:16', '2022-04-27 07:45:16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000245, 1, NULL, NULL, NULL, NULL, NULL, NULL, '<p>mmkk</p>', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-04-27 07:45:26', '2022-04-27 07:45:26', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000246, 1, NULL, NULL, NULL, NULL, NULL, NULL, '<p><strong>kjh</strong></p>', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-04-27 07:46:01', '2022-04-27 07:46:01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000247, 1, NULL, NULL, NULL, NULL, NULL, NULL, '<p><strong>kjh<img src=\"https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/plugins/emoticons/img/smiley-innocent.gif\" alt=\"innocent\" /></strong></p>', 2, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-04-27 07:46:10', '2022-04-27 07:46:10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000248, 1, NULL, NULL, NULL, NULL, NULL, NULL, '<p>测试</p>', NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-05-02 14:21:04', '2022-05-02 14:21:04', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000249, 1, NULL, NULL, NULL, NULL, NULL, NULL, '<p>ceshi</p>', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-05-02 14:27:12', '2022-05-02 14:27:12', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000250, 1, NULL, NULL, NULL, NULL, NULL, NULL, '<p>最新</p>', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-05-02 14:40:27', '2022-05-02 14:40:27', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000251, 1, NULL, NULL, NULL, NULL, NULL, NULL, '<p>asd12</p>', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-24 14:35:16', '2022-07-24 14:35:16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000252, 1, NULL, NULL, NULL, NULL, NULL, NULL, '', 1, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-11 14:55:28', '2024-03-10 05:12:06', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000253, 1, NULL, NULL, NULL, NULL, NULL, NULL, '123', 154, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-12 18:13:45', '2022-08-12 18:13:45', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000254, 2, NULL, NULL, NULL, NULL, NULL, NULL, '你好', 123, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-12 21:03:40', '2022-08-12 21:03:40', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000255, 1, NULL, NULL, NULL, NULL, NULL, NULL, '123', NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-14 13:45:24', '2022-08-14 13:45:24', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000256, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'add', NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-14 13:45:33', '2022-08-14 13:45:33', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000257, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'add', 3, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-14 13:49:50', '2022-08-14 13:49:50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000258, 2, NULL, NULL, NULL, NULL, NULL, NULL, '123', NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-14 13:51:48', '2022-08-14 13:51:48', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000261, 1, '', NULL, NULL, NULL, NULL, NULL, '123', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-28 16:30:04', '2022-08-31 14:52:38', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000263, 1, '', NULL, NULL, NULL, NULL, NULL, '圈子内容', 32, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-08-28 16:32:40', '2022-08-31 14:52:56', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000264, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'ok', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-01 12:19:45', '2023-04-01 12:19:45', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000265, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'h', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-01 12:20:15', '2023-04-01 12:20:15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000266, 1, NULL, NULL, NULL, NULL, NULL, NULL, '哦看看', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-01 12:29:08', '2023-04-01 12:29:08', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000267, 1, NULL, NULL, NULL, NULL, NULL, NULL, '123', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-01 13:29:57', '2023-04-01 13:29:57', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000268, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'ok', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-01 13:30:38', '2023-04-01 13:30:38', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000269, 1, NULL, NULL, NULL, NULL, NULL, NULL, '123', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-01 13:33:44', '2023-04-01 13:33:44', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000270, 1, NULL, NULL, NULL, NULL, NULL, NULL, '123', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-01 13:39:44', '2023-04-01 13:39:44', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[{\"url\":\"http://127.0.0.1:8181/logistics/6f66f2b6-b07f-4420-9230-e061ec65ed05.01.03.png\",\"name\":\"http://127.0.0.1:8181/logistics/6f66f2b6-b07f-4420-9230-e061ec65ed05.01.03.png\",\"uid\":1680356378552,\"status\":\"success\"},{\"url\":\"http://127.0.0.1:8181/logistics/64c60c8e-499b-4700-a23b-f413b8e7d4b4.58.46.png\",\"name\":\"http://127.0.0.1:8181/logistics/64c60c8e-499b-4700-a23b-f413b8e7d4b4.58.46.png\",\"uid\":1680356381455,\"status\":\"success\"}]', NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000271, 1, NULL, NULL, NULL, NULL, NULL, NULL, '图片', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-01 14:35:58', '2023-04-01 14:35:58', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[{\"url\":\"http://127.0.0.1:8181/logistics/78b02b52-d558-4ba5-8e44-941ad470a0c0.01.17.png\",\"name\":\"http://127.0.0.1:8181/logistics/78b02b52-d558-4ba5-8e44-941ad470a0c0.01.17.png\",\"uid\":1680359751776,\"status\":\"success\"}]', NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000272, 1, NULL, NULL, NULL, NULL, NULL, NULL, '123', NULL, 53, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-02 07:45:57', '2023-04-02 07:45:57', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000273, 1, '', NULL, NULL, NULL, NULL, NULL, '123', 2, 53, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-02 07:53:32', '2025-07-27 06:52:01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', '', NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000274, 2, NULL, NULL, NULL, NULL, NULL, NULL, '13', NULL, 53, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-02 07:53:40', '2023-04-02 07:53:40', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000275, 1, '', NULL, NULL, NULL, NULL, NULL, '回家GV附件1', 21, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-02 07:53:59', '2025-07-27 06:52:05', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[{\"url\":\"http://127.0.0.1:8181/logistics/990bac4c-5ad9-414d-95f0-c78acb36a49c.58.46.png\",\"name\":\"http://127.0.0.1:8181/logistics/990bac4c-5ad9-414d-95f0-c78acb36a49c.58.46.png\",\"uid\":1680422037081,\"status\":\"success\"}]', '', NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000276, 3, NULL, NULL, NULL, NULL, NULL, NULL, 'code', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-04 01:20:15', '2023-04-04 01:20:15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', NULL, NULL);
INSERT INTO `square` (`id`, `sort_class`, `title`, `media`, `type`, `title_color`, `titlefont_size`, `titlefont_type`, `content`, `love_num`, `author`, `copyfrom`, `inputer`, `http_url`, `keyword`, `hits`, `post_num`, `comment_disabled`, `ontop`, `iselite`, `deleted`, `add_time`, `update_time`, `create_time`, `last_post`, `owner_tag`, `owner_remark`, `html_path`, `file_path`, `temp_path`, `image`, `thumb`, `status`) VALUES (0000000280, 2, '', NULL, NULL, NULL, NULL, NULL, '2133', 1, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-07-26 14:35:45', '2025-07-27 06:36:09', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0', '', NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of square_class
-- ----------------------------
BEGIN;
INSERT INTO `square_class` (`id`, `name`, `is_free`, `price`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000001, '广场', NULL, NULL, NULL, 'circle', '123', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHpcouZU92hS1rwO5x43k_7O6QmftWwrShXQ&usqp=CAU', 1, NULL);
INSERT INTO `square_class` (`id`, `name`, `is_free`, `price`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000002, '闲聊', NULL, NULL, NULL, 'liaoliao', '123', 'https://static.7b2.com/wp-content/uploads/2021/06/4397f4d8566c1b0f_1_avatar.jpg?x-oss-process=image/resize,m_fill,h_120,w_120/sharpen,120/format,webp', 1, 4);
INSERT INTO `square_class` (`id`, `name`, `is_free`, `price`, `father`, `other_name`, `describes`, `imgclass`, `top`, `num`) VALUES (0000000003, '编程', NULL, NULL, NULL, 'code', '123', 'https://static.7b2.com/wp-content/uploads/2020/08/58ee7e73540f8e9_1_circle.png?x-oss-process=image/resize,m_fill,h_120,w_120/sharpen,120/format,webp', 1, 1);
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
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;

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
INSERT INTO `square_comment` (`id`, `parent_id`, `type`, `user_id`, `to_user_id`, `post_id`, `content`, `love_num`, `status`, `add_time`) VALUES (64, 0, 1, 4, 0, 248, '今年健康', 10, 1, '2022-08-14 07:26:27');
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
) ENGINE=InnoDB AUTO_INCREMENT=344 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (329, '123', 'ORDER_20240131034514294', NULL, '微信', 909005, 200, 'weixin://wxpay/bizpayurl?pr=Sv9cyPazz', '超时已关闭', '2024-01-31 03:45:14', '2024-01-31 03:45:30', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (330, '123', 'ORDER_20240131034833711', NULL, '微信', 909005, 200, 'weixin://wxpay/bizpayurl?pr=8FHPO3zzz', '支付成功', '2024-01-31 03:48:33', '2024-01-31 03:49:00', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (331, '123', 'ORDER_20240203010818866', NULL, '支付宝', 909005, 200, NULL, '超时已关闭', '2024-02-03 01:08:18', '2024-02-03 01:08:30', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (332, '123', 'ORDER_20240203011127931', NULL, '支付宝', 909005, 200, NULL, '超时已关闭', '2024-02-03 01:11:27', '2024-02-03 01:11:30', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (333, '123', 'ORDER_20240203153455478', NULL, '支付宝', 909005, 200, NULL, '超时已关闭', '2024-02-03 15:34:55', '2024-02-03 15:35:00', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (334, '123', 'ORDER_20240203153708807', NULL, '支付宝', 909005, 200, 'https://qr.alipay.com/bax04293ynv2kykjyu2i2501', '超时已关闭', '2024-02-03 15:37:08', '2024-02-03 15:37:31', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (335, '123', 'ORDER_20240205015737765', NULL, '微信', 909005, 200, 'weixin://wxpay/bizpayurl?pr=6eApT1Jzz', '超时已关闭', '2024-02-05 01:57:37', '2024-02-05 01:58:02', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (336, '123', 'ORDER_20240205015740666', NULL, '支付宝', 909005, 200, NULL, '超时已关闭', '2024-02-05 01:57:40', '2024-02-05 02:01:30', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (337, '123', 'ORDER_20240205020135774', NULL, '支付宝', 909005, 200, 'https://qr.alipay.com/bax03314esbehywxessy30b6', '超时已关闭', '2024-02-05 02:01:35', '2024-02-05 02:02:00', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (338, '123', 'ORDER_20240205020156845', NULL, '微信', 909005, 200, 'weixin://wxpay/bizpayurl?pr=ClJfQgbzz', '超时已关闭', '2024-02-05 02:01:56', '2024-02-05 02:02:00', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (339, '123', 'ORDER_20240205020203434', NULL, '支付宝', 909005, 200, 'https://qr.alipay.com/bax09038vtfq2nlvlgzv3021', '超时已关闭', '2024-02-05 02:02:03', '2024-02-05 02:02:30', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (340, '123', 'ORDER_20240205020209577', NULL, '微信', 909005, 200, 'weixin://wxpay/bizpayurl?pr=q7dXymCzz', '超时已关闭', '2024-02-05 02:02:09', '2024-02-05 02:02:31', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (341, '123', 'ORDER_20240205022844893', NULL, '微信', 909005, 200, 'weixin://wxpay/bizpayurl?pr=0QFqXL5zz', '超时已关闭', '2024-02-05 02:28:44', '2024-02-05 02:29:00', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (342, '123', 'ORDER_20240205022929144', NULL, '微信', 909005, 200, 'weixin://wxpay/bizpayurl?pr=i1I8W5Ozz', '超时已关闭', '2024-03-11 02:29:29', '2024-03-11 00:22:26', NULL);
INSERT INTO `t_order_info` (`id`, `title`, `order_no`, `user_id`, `pay_ment`, `product_id`, `total_fee`, `code_url`, `order_status`, `create_time`, `update_time`, `already_done`) VALUES (343, '123', 'ORDER_20240205023011576', NULL, '微信', 909005, 200, 'weixin://wxpay/bizpayurl?pr=fZtyMLFzz', '超时已关闭', '2024-03-11 02:30:11', '2024-03-11 22:43:01', NULL);
COMMIT;

-- ----------------------------
-- Table structure for t_pay_info
-- ----------------------------
DROP TABLE IF EXISTS `t_pay_info`;
CREATE TABLE `t_pay_info` (
  `id` int DEFAULT NULL,
  `ali_APP_ID` varchar(255) DEFAULT NULL COMMENT '支付宝app_id',
  `ali_PRIVATE_KEY` text COMMENT '应用私钥',
  `ali_PUBLIC_KEY` text COMMENT '应用公钥',
  `ali_ALIPAY_PUBLIC_KEY` text COMMENT '支付宝公钥',
  `ali_NOTIFY_URL` varchar(255) DEFAULT NULL COMMENT '异步回调地址',
  `ali_RETURN_URL` varchar(255) DEFAULT NULL COMMENT '同步回调地址',
  `ali_ALI_URL` varchar(255) DEFAULT NULL COMMENT '请求支付宝服务器网关域名',
  `ali_TIMEOUT_EXPRESS` varchar(255) DEFAULT NULL COMMENT '该笔订单允许的最晚付款时间，逾期将关闭交易',
  `we_mch_id` varchar(255) DEFAULT NULL COMMENT '商户号',
  `we_mch_serial_no` varchar(255) DEFAULT NULL COMMENT '商户API证书序列号',
  `we_private_key_path` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '商户私钥文件',
  `we_api_v3_key` varchar(255) DEFAULT NULL COMMENT 'APIv3密钥',
  `we_appid` varchar(255) DEFAULT NULL COMMENT 'APPID',
  `we_domain` varchar(255) DEFAULT NULL COMMENT '微信服务器地址',
  `we_notify_domain` varchar(255) DEFAULT NULL COMMENT '接收结果通知地址',
  `we_partner_key` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'APIv2密钥'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of t_pay_info
-- ----------------------------
BEGIN;
INSERT INTO `t_pay_info` (`id`, `ali_APP_ID`, `ali_PRIVATE_KEY`, `ali_PUBLIC_KEY`, `ali_ALIPAY_PUBLIC_KEY`, `ali_NOTIFY_URL`, `ali_RETURN_URL`, `ali_ALI_URL`, `ali_TIMEOUT_EXPRESS`, `we_mch_id`, `we_mch_serial_no`, `we_private_key_path`, `we_api_v3_key`, `we_appid`, `we_domain`, `we_notify_domain`, `we_partner_key`) VALUES (1, '2021004135600059', 'MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDELJDJGNzbjel79R+R0XncVyjxb7iajY8jl2/YpUm2nS+laALjtkKcZ2G07Gck253FrVfb1Y9ENOfiUxdcnX/IpGt+JAAbrGfiXSbgKseYxzBfQedQt2hUdPK0HnApG2+wtbRt5HzkLsCnlO/isqKWfsJ7Y/Qs9ibBl+VKjxCk2SeJXIfaN7QD1fZ9eojTIWPpoCQqdkJRuIsRr0rXuciTzXLUwJRqW5s/hrK+oSpGEGY5GN2U9an5iRkPzwAydi7rltaD7LMJ5VsgO0ScS+jqfoknv93gXnYi/kQD5cY2R6icKUWJHarZjlnd99LAlQPU644ARJAbIFya2nozd6KLAgMBAAECggEBALQNT0ozdqpQ4waxoasdf2J74QlQCDhaSxFYsgA/HJvuQ0fmYhiMNTEGNghvne+XXoSLqAMOTPNGN7pjlyKbMCiAuGRLOIotwB9kbgT7XrzbvYsAmwVbgPdba1NkSH+CPg4LiDIAr5xjSNHHAjGo0U+dwnSr9fW6azHubzXyf008ouQJjTNlc6432SYZJ7qmg+igwfZOUlS4VTijJ3RNi9cdycq/EYvoHam6iX1EvHfFPlb6O/9J/96aEav3llvYqjjdDA3eXSfcxLV3E8Za1Po3yu8MzT3Hdzg0rgrwjHtkAyr7ODvsC8kar/VBaL7z8r5VvGyAu0AM1lJTpUmLXAECgYEA5nGrqas3E516s0xcFmzQkje7cgASjcujL3EjJC19iFCyEZWE6hyKPRze30G3pk9cx/OKMycFO+1aM2e5KkLiKFOYeKPMwnj3ixwmZYZAN3gPsUz6K4RkxLc+imhzVocneSQyBWDlswNZdlXvMrjplSr/QwU4Phlbk3Wb1b132gECgYEA2e33xn7DyY+CY+HRAIHBzuB40VcWrIW7SytjTmWKO3eUiNitimWtnGrt6qH1lQ2uRsxQwA0+bq707PFP6lMEvpSo+b3hKyPPklITu+vsAZLcLqsRgKffgZOrk4bLawHN19Nj/3UcGwmAais1sQFjoIiqOXZN4DmQW/mrCOV8RIsCgYACQBntDj77cg5Asf40OdvPkbvC4T1NJS/yxqgRMmCHdEJI6azinGS9NAr5Iysn9J5zVW2EEl16uFapKdolD4Il4qsagn79ZzEDqsK1OxplcEa29Il8404YnbF+qIZ30doQ1MmoQ8n6dY3qGey8EhI14rWbcfGaqaS7S+q5q6AAAQKBgQCq92uIx24ltHYgkcl7UlCPUb62zFG3avqyUAmKOVKmsHtQmFwc1QPMUH7xsbmOA7uTQzqeUEWIY602LWH6fMKeGNYvhu0dAO0Y51cf+EegPGyMGByVCB3p88WI6RiwjCvGg8pRYLh55YxeviNTB7n2+QBCMDOMEtzTqxyo0BAbXQKBgQDdfHA2xh41VuSPk6h5kMOxQ2bsrB3fHKGEDaQFaYk6pS1P57q0Jx6pQReQ+w3vlUd49uhgyofkXlMOPMbn216+gTbMDXTyz+su1YDN4E9Y3zO9keXvBnSNb8BQECJn6NOkvM/KZq0AKpkfDfbttsEwj2P7MUQCQNP6JOQBRlsMjg==', 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxCyQyRjc243pe/UfkdF53Fco8W+4mo2PI5dv2KVJtp0vpWgC47ZCnGdhtOxnJNudxa1X29WPRDTn4lMXXJ1/yKRrfiQAG6xn4l0m4CrHmMcwX0HnULdoVHTytB5wKRtvsLW0beR85C7Ap5Tv4rKiln7Ce2P0LPYmwZflSo8QpNkniVyH2je0A9X2fXqI0yFj6aAkKnZCUbiLEa9K17nIk81y1MCUalubP4ayvqEqRhBmORjdlPWp+YkZD88AMnYu65bWg+yzCeVbIDtEnEvo6n6JJ7/d4F52Iv5EA+XGNkeonClFiR2q2Y5Z3ffSwJUD1OuOAESQGyBcmtp6M3eiiwIDAQAB', 'http://localhost:8080/alipayReturn', 'http://localhost:8080/alipayReturn', 'http://localhost:8080/alipayReturn', 'https://openapi.alipay.com/gateway.do', '30m', '1666124692', '57A046F6EC16DBBCB619A0CD02D77EA3B048628A', '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDZFcwY6vAVZjEc\nX06NqA+VTSItxWTEgNNZxszzCF0BZ2+ab1/VM/66ekfpz4xGy2efurnM5zaDV3su\nzk5DVRTdqwtQkwbtKGJEsgu1BpNxPru+dKPUMlKypDutL4zwohhrw6upEUHzp8S5\njoYSEtShmZXrjVTNqWAyiIldCSX8of39bY7Q+nev3D/CNMr6CBucqPa4CgCvrhBC\nE74Qv0HYajCp/PPlQSodTzIvlXe5lbORWd+EQlqjSEIWmRmqhmoCxQlIgLpg3/+K\nMUIVCPaFQ51Xtr6xHr7L7PYSdajXhxdatT7G34K6b8PbO98tSqq+K7FewI5tJGyJ\n4ZyP05OfAgMBAAECggEBAJs9PTDsgTesVp5lgXVHo60u9awppr/nKDzhL5r0dh4U\n6/hSgQOkJRsRau/G3heaScYt78SZ65/NJWf5XHpGE5/ZO0QpgCCEapGZiUmxJCst\no3C1VJrgScc6LvrQMEe8gx49VTqX/sPRS5suUq4GDUxq2o0SCnzwDLzWavS/IA0i\nMUlw7NpEkUW1aapJ60Mjg2coQrVHsvTTuZnjJ/ncT4uhStp1/hCQnU/B+HIxpyVD\nMwiBdpU+17CkB1NwG2wmZC4Yp/H5nwICMy6R1NOSYC9DHhNH+F+cABuuYe69cdRa\nT2Mxk207r0jEGUAZ/+SklMxi8lQJ3PvZbnT+EAB6nSECgYEA9wFrCFx6sOFeBe3w\nTz3+vn/59fcr5im9CusNVn0GFmSpaHU58CpG/cx8/fy873tP95JLrB5NztL6kWiq\nlXou/4ql5800SnSWTN4NGBNLRzi+ue8cpOWb4Frtq9ulJV3rJfuEccQh6wG056BW\n/OWXxWzUHTsiHQKKT8MM2Jq4hpkCgYEA4P12Mex0ye35eLmD2XPJcKGFB94v+8GW\nRDmZuc1cXfrBuAy6k+mRUWGjY+JiaAVoOOPLpCNRPNdlKutlxDIUW56rp+K0Ly9T\nmaaIBQ00lI6bV6KOvasxlxfvlQrpSa8jxZlZS6g2QPzInU1k0BvShqkJXUfPxhAk\nhwof9IanJvcCgYEAz/tas3SjPnLVZ6q9EQxDhwZdY9WXGjuE2T+oQG4PhSWHW9Rx\nT59ZnXTkvjxknkW3xN9jZm8x1vfhUjTOhgSWtEd7gN5RrGvU7q5+WgpM9ZB7UDZd\naR+JC/WkcHQG75rQWHAbSmv6n1YVjH9/H3z3OZ50UJStGb481gKHu48z1ukCgYEA\n2lAXKEow6N+peqNIdPANPuT7mK7YEIm/rWPW7pt+TRLMdjKjuHKjNzxutrUsl5Ln\nlowzRYmfglHfMM5JaR7O8jf8iGNKQ57AmA8nXP97TcsyoM5zg0diTyJCr3Ru+big\nFVS/eNI4Esc2QqyebfERTukm1QShb6aqSv5gE321I/ECgYB3mLy6I1CagWWa+6oQ\n1aNPURBbMBjCc2khSff21mSPf2GU67ek1YODePHEZc9V4N6+M6rG7UhuqJPiXrWE\n0SEunqxZBFYXh++tU3+scq5hYhTpDMWiV5prp6jM6IGBQVtpDXz8HTg2JJS851YN\np5gXtmi6Q4eKyMkovVqPMYzdvQ==\n-----END PRIVATE KEY-----', 'ngZjCoUulksogGhqafWYs5Qw3EnXqPfJ', 'wx2b7dc0a77fb4208c', 'https://api.mch.weixin.qq.com', 'https://c3e4-2408-8421-b08-775e-a189-749b-3ea9-90f1.ngrok.io', 'T6m9iK73b0kn9g5v426MKfHQH7X8rKwb');
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
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
INSERT INTO `t_payment_info` (`id`, `order_no`, `transaction_id`, `payment_type`, `trade_type`, `trade_state`, `payer_total`, `content`, `create_time`, `update_time`) VALUES (57, 'ORDER_20240131034833711', '4200002069202401319628293598', '微信', 'NATIVE', 'SUCCESS', 200, '{\"amount\":{\"currency\":\"CNY\",\"payer_currency\":\"CNY\",\"payer_total\":200,\"total\":200},\"appid\":\"wx2b7dc0a77fb4208c\",\"attach\":\"\",\"bank_type\":\"WEB_DEBIT\",\"mchid\":\"1666124692\",\"out_trade_no\":\"ORDER_20240131034833711\",\"payer\":{\"openid\":\"ofi3A5K6PufVQFtJX8Lnmz_iTc18\"},\"promotion_detail\":[],\"success_time\":\"2024-01-31T03:48:57+08:00\",\"trade_state\":\"SUCCESS\",\"trade_state_desc\":\"支付成功\",\"trade_type\":\"NATIVE\",\"transaction_id\":\"4200002069202401319628293598\"}', '2024-01-31 03:49:00', '2024-01-31 03:49:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
  `openid` varchar(255) DEFAULT NULL,
  `userage` int DEFAULT NULL COMMENT '年龄',
  `intro` varchar(255) DEFAULT NULL COMMENT '简介',
  `gender` int DEFAULT NULL COMMENT '性别',
  `name` varchar(255) DEFAULT NULL COMMENT '用户自定义名称',
  `USERNAME` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '用户名',
  `PASSWORD` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '密码',
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `code` int DEFAULT NULL COMMENT 'code',
  `data` int DEFAULT NULL COMMENT 'data',
  `role` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL COMMENT '是否禁用',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `last_login` datetime DEFAULT NULL COMMENT '最后登陆时间',
  `vip_valid_date` datetime DEFAULT NULL COMMENT '会员有效时间',
  `vip_expire_date` datetime DEFAULT NULL COMMENT '会员过期时间',
  `integral` int DEFAULT NULL COMMENT '积分',
  `vip_disable_tip` int DEFAULT NULL COMMENT '会员是否禁用',
  `height` varchar(255) DEFAULT NULL COMMENT '身高',
  `issingle` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '单身',
  `birthday` varchar(255) DEFAULT NULL COMMENT '生日',
  `academic` varchar(255) DEFAULT NULL COMMENT '学历',
  `monthly` varchar(255) DEFAULT NULL COMMENT '月薪\n',
  `permanent` varchar(255) DEFAULT NULL COMMENT '常住地',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (2, NULL, 16, '这个人很懒，什么都没有留下！', 1, 'ice', 'ttice', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', '', NULL, NULL, NULL, NULL, 'https://img0.baidu.com/it/u=2705683877,4119372584&fm=253&fmt=auto&app=138&f=JPEG?https://static.konlonair.com/public/uploads/_/originals/g9sqh9gp.jpeg', '1', '2022-08-20 08:46:46', '2022-08-30 10:37:34', NULL, NULL, 12, 1, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (3, NULL, 17, '这个人很懒，什么都没有留下！', 0, '悠悠', 'admin', '$argon2i$v=19$m=65536,t=3,p=1$eTUo8q1A2Yi7LZejMvX4jA$pFqGQlLIz+bNkn3pHBTF8bzBELO5/RDThNxCNfuFlkU', '123@qq.com', '172382732', NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '1', '2022-08-20 08:46:46', '2025-07-27 10:01:42', '2022-06-06 08:58:28', '2022-07-06 08:58:28', 233, 1, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (4, NULL, 23, '这个人很懒，什么都没有留下！', 1, '天天', 'awe', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', '', NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/08/19/359346943c3c489f!400x400.jpg', '1', '2022-08-20 08:46:46', '2023-05-08 08:01:18', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (5, NULL, 26, '这个人很懒，什么都没有留下！', 0, '小小', 'admin1', '$argon2i$v=19$m=65536,t=3,p=1$+7Cb91v3wSuxz4Qq4R+eyQ$WfZ43wLAbtkXTm3nF6qFCwdxOf7hE+z1TZEQK8PCl8o', '', NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/08/19/96f91899b3709534!400x400.jpg', '1', '2022-08-20 08:46:46', '2022-08-20 08:46:46', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (33, NULL, 17, '这个人很懒，什么都没有留下！', 1, '新用户12', '123123', '$argon2i$v=19$m=65536,t=3,p=1$JENeLojNullKgZ5aVfauNQ$Agd8fSTt6u5o83XKV3Zm9IyJMLBiOgO1E3sYqg/ljyA', '', NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '1', '2022-08-20 08:46:46', '2023-04-04 04:42:12', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (34, NULL, 15, '这个人很懒，什么都没有留下！', 1, '新用户', '321', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', NULL, NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '1', '2022-09-20 13:18:44', '2022-09-20 13:18:44', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (36, NULL, 28, '这个人很懒，什么都没有留下！', 1, '新用户', '123312', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', NULL, NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '1', '2022-09-21 11:18:03', '2022-09-21 11:18:03', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (37, NULL, 29, '这个人很懒，什么都没有留下！', 1, '新用户', '1231232', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', NULL, NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '1', '2022-09-21 11:21:50', '2022-09-21 11:21:50', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (38, NULL, 21, '这个人很懒，什么都没有留下！', 1, '新用户', 'ad123', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', NULL, NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '1', '2022-09-21 11:23:26', '2022-09-21 11:23:26', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (39, NULL, 28, '这个人很懒，什么都没有留下！', 1, '新用户', 'asdasd', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', NULL, NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '1', '2022-09-21 11:24:22', '2022-09-21 11:24:22', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (40, NULL, 27, '这个人很懒，什么都没有留下！', 1, NULL, 'ice', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', NULL, NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '1', '2022-08-20 08:46:46', '2022-08-20 08:46:46', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (41, NULL, 28, '这个人很懒，什么都没有留下！', 1, '新用户', 'admin123', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', NULL, NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '1', '2023-03-28 11:41:37', '2023-03-28 11:41:37', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (42, NULL, 29, '这个人很懒，什么都没有留下！', 1, NULL, 'asdd2112', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', NULL, NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '1', '2023-03-28 12:07:22', '2023-03-28 12:07:23', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (43, NULL, 25, '这个人很懒，什么都没有留下！', 1, '123', 'asd123', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', NULL, NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '1', '2023-03-28 12:10:06', '2023-03-28 12:10:06', NULL, NULL, NULL, 1, '123', NULL, NULL, '123', '123', '123');
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (44, NULL, 18, '这个人很懒，什么都没有留下！', 1, 'asd', '123123a', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', NULL, NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '1', '2023-03-28 12:16:43', '2023-03-28 12:16:43', NULL, NULL, NULL, 1, '1', NULL, 'sa\'d', 'asd', 'asd', 'asd');
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (45, NULL, 18, '这个人很懒，什么都没有留下！', 1, '123', 'asd123asd', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', NULL, NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '1', '2023-03-28 12:17:38', '2023-03-28 12:19:30', NULL, NULL, NULL, 1, '2', NULL, '123', '123', '123', '123');
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (46, NULL, 26, '这个人很懒，什么都没有留下！', 0, '312', '123asd', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', NULL, NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '1', '2023-03-28 12:19:50', '2023-03-28 12:19:50', NULL, NULL, NULL, 1, '2', '0', '123', 'asd', '123', '123');
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (47, NULL, 26, '这个人很懒，什么都没有留下！', 0, '大声道', '123123asdds', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', NULL, NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '1', '2023-03-29 14:17:20', '2023-03-29 14:17:21', NULL, NULL, NULL, 1, '23', '0', '123', '213', '123', '123');
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (48, NULL, 26, '这个人很懒，什么都没有留下！', 0, '213', 'asd123ds', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', '', NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '1', '2023-03-30 14:45:40', '2023-03-30 14:45:48', NULL, NULL, NULL, 1, '123', '0', '123', '123', '123', '123');
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (49, NULL, 53, '这个人很懒，什么都没有留下！', 0, '123', '1asd', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', '', NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '1', '2023-03-30 14:46:35', '2023-03-30 14:46:35', NULL, NULL, NULL, 1, '123', '0', '123', '123', '123', '123');
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (50, NULL, 25, '这个人很懒，什么都没有留下！', 0, '123', 'adminasd2', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', '', NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '1', '2023-04-02 06:51:28', '2023-04-02 06:51:29', NULL, NULL, NULL, 1, '123', '0', '123', '123', '123', '123');
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (51, NULL, 15, '这个人很懒，什么都没有留下！', 0, '123', 'asdasd123', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', '', NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '1', '2023-04-02 06:52:31', '2023-04-02 06:53:23', NULL, NULL, NULL, 1, '123', '0', '123', '123', '123', '123');
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (52, NULL, 26, '这个人很懒，什么都没有留下！', 0, 'asd123', 'asd123asdasd22', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', '', NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '1', '2023-04-02 06:55:02', '2023-04-02 06:55:02', NULL, NULL, NULL, 1, '123', '0', '123', '123', '123', '123');
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (53, NULL, 26, '这个人很懒，什么都没有留下！', 0, '123css', '123dcsde', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', '', NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '1', '2023-04-02 07:12:10', '2023-04-02 07:12:10', NULL, NULL, NULL, 1, '123', '0', '123', '123', '123', '123');
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (54, NULL, 28, '这个人很懒，什么都没有留下！', 1, '123', 'adminww', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', '', NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '1', '2023-04-07 02:33:06', '2023-04-07 02:33:06', NULL, NULL, NULL, 1, '', NULL, '', '', '', '');
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (56, NULL, 0, '这个人很懒，什么都没有留下！', NULL, NULL, '728060e347d54b86b32adeaded4c9461', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', '', NULL, NULL, NULL, '0', 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '0', '2024-06-14 16:26:15', '2024-06-14 16:26:15', '2024-06-14 16:26:15', '2024-06-14 16:26:15', 0, 1, '0', NULL, '0', '0', '0', '0');
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (57, NULL, 0, '这个人很懒，什么都没有留下！', NULL, NULL, 'c61de4511462496a87cfb5ce440ad6dd', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', '', NULL, NULL, NULL, '0', 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '0', '2024-06-14 16:32:14', '2024-06-14 16:32:14', '2024-06-14 16:32:14', '2024-06-14 16:32:14', 0, 1, '0', NULL, '0', '0', '0', '0');
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (58, '', 0, '这个人很懒，什么都没有留下！', NULL, NULL, '08e67d2b8bc048fbb29f8d074b282515', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', '', NULL, NULL, NULL, '0', 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '0', '2024-06-14 16:33:01', '2024-06-14 16:33:01', '2024-06-14 16:33:01', '2024-06-14 16:33:01', 0, 1, '0', NULL, '0', '0', '0', '0');
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (59, '', 0, '这个人很懒，什么都没有留下！', NULL, NULL, 'fed6e7fa844b4aaebdfad96131195675', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', '', NULL, NULL, NULL, '0', 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '0', '2024-06-14 16:35:56', '2024-06-14 16:35:56', '2024-06-14 16:35:56', '2024-06-14 16:35:56', 0, 1, '0', NULL, '0', '0', '0', '0');
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (60, 'oNczp5HUEuMxcqK5CZN8NG0EfVJg', 0, '这个人很懒，什么都没有留下！', NULL, NULL, 'be2354f728cb4077a81c34ce05c7ff61', '$argon2i$v=19$m=65536,t=3,p=1$XJawZ6v9/f3cL+AjrFvbJQ$F9rPIPu4tAryKYWI/X8kTxb5tS17wZkndpMi+OT5Jrg', '', NULL, NULL, NULL, '0', 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '0', '2024-06-14 16:37:46', '2024-06-14 16:37:46', '2024-06-14 16:37:46', '2024-06-14 16:37:46', 0, 1, '0', NULL, '0', '0', '0', '0');
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (74, NULL, NULL, '这个人很懒，什么都没有留下！', NULL, '新用户', '00043197', '$argon2i$v=19$m=65536,t=3,p=1$GQT/qsGVr0zcJN5AmL2UmQ$DdyDfCxIuTGZyLQPOPSsZcCgr/gabPKdAS6Un1w/RBc', '23339097@qq.com', NULL, NULL, NULL, NULL, 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', NULL, '2024-07-20 14:52:21', '2024-10-21 09:49:39', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (75, NULL, 0, '这个人很懒，什么都没有留下！', NULL, '手机用户', '1bc82b3d2e4042668e0a4fdb101e17c3', NULL, '0', '17630505717', NULL, NULL, '0', 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '0', '2024-07-24 13:11:37', '2024-07-24 13:11:37', '2024-07-24 13:11:37', '2024-07-24 13:11:37', 0, 1, '0', NULL, '0', '0', '0', '0');
INSERT INTO `user` (`user_id`, `openid`, `userage`, `intro`, `gender`, `name`, `USERNAME`, `PASSWORD`, `email`, `phone`, `code`, `data`, `role`, `profile`, `status`, `create_time`, `last_login`, `vip_valid_date`, `vip_expire_date`, `integral`, `vip_disable_tip`, `height`, `issingle`, `birthday`, `academic`, `monthly`, `permanent`) VALUES (76, 'ok9NC43NS2lQNkGfWbhEWFoLA6Ss', 0, '这个人很懒，什么都没有留下！', NULL, NULL, '583c5c4b13fc44648b0d7207535a391a', NULL, '0', NULL, NULL, NULL, '0', 'https://img2.woyaogexing.com/2022/07/17/5bbaa5352282a8f7!400x400.jpg', '0', '2024-10-20 15:54:01', '2024-10-20 15:54:01', '2024-10-20 15:54:01', '2024-10-20 15:54:01', 0, 1, '0', NULL, '0', '0', '0', '0');
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
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (36, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (37, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (38, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (39, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (41, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (42, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (43, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (44, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (45, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (46, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (47, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (48, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (49, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (50, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (51, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (52, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (53, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (54, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (61, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (62, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (63, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (66, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (67, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (68, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (69, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (70, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (71, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (72, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (73, 1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (74, 1);
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
