# MRP 管理系统

基于 Vue 3、TypeScript、Element Plus 和 Vite 的后台管理项目，包含登录鉴权、菜单布局、用户与开发管理相关页面。

## 技术栈

- `Vue 3`
- `TypeScript`
- `Vite 4`
- `Vue Router 4`
- `Element Plus`
- `Axios`
- `Sass`

## 环境要求

- `Node.js >= 18`（推荐使用 LTS 版本）
- `npm >= 9`

## 快速开始

```bash
npm install
npm run dev
```

默认启动地址：`http://localhost:3000`

## 常用命令

```bash
# 开发
npm run dev
npm run dev:test

# 构建
npm run build
npm run build:test
npm run build:prod

# 预览
npm run preview
npm run preview:test
npm run preview:prod
```

## 环境变量

环境文件位于 `env/` 目录：

- `env/.env.development`
- `env/.env.test`
- `env/.env.production`

当前主要变量：

- `VITE_APP_TITLE`：系统标题
- `VITE_APP_ENV`：环境标识（development/test/production）
- `VITE_APP_BASE_API`：基础 API 前缀（通常为 `/api`）
- `VITE_APP_API_BASE_URL`：后端基础地址（会在请求层拼接 `/gateway`）

## 项目结构

```text
refactor-mrp
├─ env/                         # 多环境变量配置
├─ src/
│  ├─ api/                      # 业务 API 封装
│  ├─ assets/                   # 图片与全局样式变量
│  ├─ layout/                   # 后台主布局
│  ├─ router/                   # 路由与路由守卫
│  ├─ types/                    # 通用类型定义
│  ├─ utils/                    # 工具层（request/auth）
│  ├─ views/                    # 页面
│  │  └─ dev/                   # 开发管理模块页面
│  ├─ App.vue
│  └─ main.ts
├─ index.html
├─ package.json
└─ vite.config.ts
```

## 核心功能

- 登录 / 退出登录
- 路由守卫与未登录拦截
- Token 注入请求头（Bearer）
- Token 过期校验（路由进入前 + 请求发起前）
- 后台布局（侧边菜单、头部用户信息、页面容器）
- 业务模块页面（用户管理、开发管理、成本相关页面）

## 鉴权与会话说明

项目在 `src/utils/auth.ts` 统一管理登录会话：

- 登录后保存：
  - `token`
  - `username`
  - `tokenExpiresAt`
- 过期时间计算优先级：
  1. 后端返回的 `expiresAt`
  2. 后端返回的 `expiresIn`
  3. JWT `exp` 字段
  4. 默认 2 小时
- 在 `src/router/index.ts` 路由守卫中校验 token 是否过期
- 在 `src/utils/request.ts` 请求拦截器中再次校验，避免过期 token 发起请求
- 过期或 401 时会清理本地会话并跳转到 `/login`

## 主要页面路由

| 路由 | 说明 |
| --- | --- |
| `/login` | 登录页 |
| `/dashboard` | 首页 |
| `/user` | 用户管理 |
| `/dev/internal-material` | 内部物料档案 |
| `/dev/external-material` | 外部物料档案 |
| `/dev/product` | 物料商品 |
| `/dev/cost/summary` | 核价汇总 |
| `/dev/cost/config` | 成本配置 |

## 构建说明

- 构建命令会先执行 `vue-tsc` 做类型检查，再执行 `vite build`
- 当前可正常构建；若出现 Sass 警告（`@import` 弃用），属于依赖升级兼容性提示，不影响当前产物生成

## 许可证

MIT
