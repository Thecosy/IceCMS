# Nuxt Ideaflow Blog - API接口对接

## 🚀 快速开始

### 1. 启动项目
```bash
pnpm install
pnpm dev
```

### 2. 配置API地址
编辑 `.env` 文件:
```env
API_BASE_URL=http://localhost:8181/api  # 你的后端API地址
```

### 3. 测试API连接
访问 http://localhost:3002/debug 进行API测试

## 📡 API接口映射

### 文章相关接口
| 前端功能 | 后端接口 | 方法 | 说明 |
|---------|---------|------|------|
| 获取文章列表 | `/article/getAllArticle/{page}/{limit}` | GET | 分页获取文章 |
| 获取文章详情 | `/article/getArticleById/{id}` | GET | 根据ID获取文章 |
| 获取热门文章 | `/article/getAllArticle/1/{limit}` | GET | 使用文章列表接口 |
| 搜索文章 | `/article/getAllArticle/{page}/{limit}` | GET | 前端过滤实现搜索 |
| 创建文章 | `/article/create` | POST | 创建新文章 |
| 更新文章 | `/article/ReviseArticleById/{id}` | POST | 更新文章内容 |
| 删除文章 | `/article/DelectArticleById/{id}` | GET | 删除指定文章 |

### 分类相关接口
| 前端功能 | 后端接口 | 方法 | 说明 |
|---------|---------|------|------|
| 获取分类列表 | `/articleClass/allArticleClass/{page}/{limit}` | POST | 分页获取分类 |
| 获取所有分类名 | `/articleClass/getAllClassName` | GET | 获取分类名称列表 |
| 获取分类详情 | `/articleClass/getClassNameById/{id}` | GET | 根据ID获取分类 |
| 创建分类 | `/articleClass/newArticleClass` | POST | 创建新分类 |
| 删除分类 | `/articleClass/DeleteArticleClass/{id}` | GET | 删除指定分类 |

### 标签相关接口
> 注：当前后端没有标签接口，暂时使用分类接口代替

## ⚙️ 数据流程

### 1. 自动映射
系统会自动将前端的通用接口映射到后端的具体接口：
- `postApi.getPosts()` → `/article/getAllArticle/{page}/{limit}`
- `postApi.getPost(id)` → `/article/getArticleById/{id}`
- `categoryApi.getCategories()` → `/articleClass/allArticleClass/{page}/{limit}`

### 2. 双模式支持
- **真实API模式**: 连接后端API获取数据
- **模拟数据模式**: 使用本地模拟数据（开发/演示用）

API失败时会自动降级到模拟数据模式，确保用户体验。

### 3. 数据转换
系统会自动处理后端数据格式与前端显示格式的转换。

## 🛠️ 开发指南

### 当前API状态
- ✅ **文章接口**: 已对接 `getAllArticle`, `getArticleById`
- ✅ **分类接口**: 已对接 `allArticleClass`, `getAllClassName`
- 🔄 **标签接口**: 使用分类接口代替
- ⏳ **搜索功能**: 前端过滤实现，后续可增加后端搜索接口
- ⏳ **站点配置**: 使用前端默认配置，后续可增加后端配置接口

### 扩展新接口
1. 在 `utils/apiService.js` 中添加接口方法
2. 在 `stores/blog.js` 中调用API方法  
3. 在组件中使用store方法

### 切换API模式
```javascript
const blogStore = useBlogStore()
blogStore.toggleApiMode(true)  // 使用真实API
blogStore.toggleApiMode(false) // 使用模拟数据
```

## 🎯 访问地址

- **主站**: http://localhost:3002
- **API调试**: http://localhost:3002/debug
- **文章详情**: http://localhost:3002/post/{id}
- **分类页面**: http://localhost:3002/category/{id}

## 🔧 后端要求

确保您的后端服务：
1. ✅ 运行在端口8181
2. ✅ 提供以下接口：
   - `GET /api/article/getAllArticle/{page}/{limit}`
   - `GET /api/article/getArticleById/{id}`
   - `POST /api/articleClass/allArticleClass/{page}/{limit}`
   - `GET /api/articleClass/getAllClassName`

## 📦 项目特性

- ✅ 服务端渲染 (SSR)
- ✅ 骨架屏加载
- ✅ 图片懒加载  
- ✅ CSS防闪烁
- ✅ 深色/浅色主题
- ✅ **真实API对接**
- ✅ 错误处理降级
- ✅ 开发调试工具