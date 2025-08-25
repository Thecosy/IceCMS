# 环境配置说明

## 本地开发环境

使用 `.env` 文件配置本地开发环境：

```bash
# 本地开发
pnpm dev
```

当前 `.env` 配置：
```env
NUXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8181/
NUXT_PUBLIC_SITE_URL=http://localhost:3000
NUXT_PUBLIC_SITE_NAME=Ideaflow Blog
```

## 生产环境部署

### 方法1: 使用生产环境构建脚本

```bash
# 生产环境构建
pnpm run build:prod

# 生产环境预览
pnpm run preview:prod
```

### 方法2: 手动切换环境文件

```bash
# 备份当前环境文件
cp .env .env.backup

# 使用生产环境配置
cp .env.production .env

# 构建项目
pnpm build

# 恢复开发环境配置
mv .env.backup .env
```

## 环境变量说明

| 变量名 | 说明 | 开发环境值 | 生产环境值 |
|-------|------|-----------|----------|
| `NUXT_PUBLIC_API_BASE_URL` | API服务器地址 | `http://127.0.0.1:8181/` | `https://api.icecmspro.com/` |
| `NUXT_PUBLIC_SITE_URL` | 网站URL | `http://localhost:3000` | `https://your-domain.com` |
| `NUXT_PUBLIC_SITE_NAME` | 网站名称 | `Ideaflow Blog` | `Ideaflow Blog` |

## 部署注意事项

1. **生产环境API地址**: 确保 `https://api.icecmspro.com/` 可以正常访问
2. **CORS配置**: 确保后端API允许你的域名的跨域请求
3. **环境变量**: 部署时确保使用正确的环境变量
4. **HTTPS**: 生产环境建议使用HTTPS

## 验证部署

部署完成后，访问以下页面验证：

- ✅ 首页: `/` - 查看文章列表和侧边栏数据
- ✅ 分类页: `/categories` - 查看分类列表
- ✅ 标签页: `/tags` - 查看标签云
- ✅ 文章详情: `/post/{id}` - 查看文章内容
- ✅ API调试页: `/debug` - 测试所有API接口