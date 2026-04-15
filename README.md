# MRP 管理系统

基于 Vue3 + TypeScript + Element Plus 构建的企业级管理系统

## 技术栈

- **前端框架**: Vue 3.4+
- **类型系统**: TypeScript 5.4+
- **UI 组件库**: Element Plus 2.6+
- **路由管理**: Vue Router 4
- **构建工具**: Vite 5
- **图标库**: @element-plus/icons-vue

## 项目结构

```
refactor-mrp/
├── env/                    # 环境变量配置
│   ├── .env.development    # 开发环境
│   ├── .env.test            # 测试环境
│   └── .env.production      # 生产环境
├── src/
│   ├── api/                # API 接口
│   │   └── user.ts         # 用户相关接口
│   ├── assets/             # 静态资源
│   ├── layout/             # 布局组件
│   │   └── Layout.vue      # 后台管理布局
│   ├── router/             # 路由配置
│   │   └── index.ts        # 路由定义及守卫
│   ├── utils/              # 工具函数
│   │   └── request.ts      # axios 请求封装
│   ├── views/              # 页面视图
│   │   ├── Login.vue       # 登录页
│   │   ├── Dashboard.vue   # 首页
│   │   ├── User.vue        # 用户管理
│   │   └── dev/            # 开发管理模块
│   │       ├── InternalMaterial.vue  # 内部物料档案
│   │       ├── ExternalMaterial.vue  # 外部物料档案
│   │       ├── Product.vue           # 物料商品
│   │       ├── CostSummary.vue       # 核价汇总
│   │       └── CostConfig.vue        # 成本配置
│   ├── App.vue             # 根组件
│   └── main.ts             # 入口文件
├── index.html              # HTML 模板
├── package.json            # 项目配置
├── vite.config.ts          # Vite 配置
├── tsconfig.json           # TypeScript 配置
└── tsconfig.node.json      # Node TypeScript 配置
```

## 功能特性

- 用户登录与退出
- 路由守卫（登录验证）
- 用户管理（列表、搜索、新增、编辑、删除）
- 开发管理
  - 内部物料档案管理
  - 外部物料档案管理
  - 物料商品管理
- 成本管理
  - 核价汇总
  - 成本配置
- 响应式布局
- 菜单图标展示
- Token 认证

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

项目将在 `http://localhost:3000` 启动

### 环境配置

项目支持多环境配置，配置文件位于 `env/` 目录：

- `.env.development` - 开发环境（默认）
- `.env.test` - 测试环境
- `.env.production` - 生产环境

主要配置项：
- `VITE_APP_API_BASE_URL` - 后端 API 基础路径
- `VITE_APP_BASE_URL` - 部署基础路径

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 页面说明

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | 重定向 | 自动跳转到 `/dashboard` |
| `/login` | 登录页 | 用户登录 |
| `/dashboard` | 首页 | 欢迎页面，显示用户名 |
| `/user` | 用户管理 | 用户列表管理 |
| `/dev/internal-material` | 内部物料档案 | 内部物料管理 |
| `/dev/external-material` | 外部物料档案 | 外部物料管理 |
| `/dev/product` | 物料商品 | 物料商品管理 |
| `/dev/cost/summary` | 核价汇总 | 成本汇总查看 |
| `/dev/cost/config` | 成本配置 | 成本参数配置 |

## 许可证

MIT
