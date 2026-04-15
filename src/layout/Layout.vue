<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="logo">
        <el-icon>
          <Box />
        </el-icon>
        <span>MRP系统</span>
      </div>
      <el-menu :default-active="activeMenu" :default-openeds="defaultOpeneds" router class="sidebar-menu"
        background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
        <template v-for="route in menuRoutes" :key="route.path">
          <el-sub-menu v-if="route.children && route.children.length > 0" :index="getMenuPath(route)">
            <template #title>
              <el-icon>
                <component v-if="route.meta?.icon" :is="route.meta.icon" />
              </el-icon>
              <span>{{ route.meta?.title }}</span>
            </template>
            <template v-for="child in route.children" :key="child.path">
              <el-sub-menu v-if="child.children && child.children.length > 0" :index="getMenuPath(route, child)">
                <template #title>
                  <el-icon>
                    <component v-if="child.meta?.icon" :is="child.meta.icon" />
                  </el-icon>
                  <span>{{ child.meta?.title }}</span>
                </template>
                <el-menu-item v-for="grandChild in child.children" :key="grandChild.path"
                  :index="getMenuPath(route, child, grandChild)">
                  <el-icon>
                    <component v-if="grandChild.meta?.icon" :is="grandChild.meta.icon" />
                  </el-icon>
                  <span>{{ grandChild.meta?.title }}</span>
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="getMenuPath(route, child)">
                <el-icon>
                  <component v-if="child.meta?.icon" :is="child.meta.icon" />
                </el-icon>
                <span>{{ child.meta?.title }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
          <el-menu-item v-else :index="getMenuPath(route)">
            <el-icon>
              <component v-if="route.meta?.icon" :is="route.meta.icon" />
            </el-icon>
            <span>{{ route.meta?.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header-content">
          <span class="page-title">{{ currentTitle }}</span>
          <el-dropdown>
            <span class="user-info">
              <el-avatar :size="32" icon="User" />
              <span class="username">{{ username }}</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Box } from '@element-plus/icons-vue'
import type { RouteRecordRaw } from 'vue-router'
import { logout } from '@/api/user'

const route = useRoute()
const router = useRouter()
const username = ref('用户')

onMounted(() => {
  username.value = localStorage.getItem('username') || '用户'
})

// 获取需要显示在菜单的路由（一级路由，children 中过滤 hidden）
const menuRoutes = computed(() => {
  const layoutRoute = router.getRoutes().find(r => r.path === '/' && r.children.length > 0)
  if (!layoutRoute) return []

  // 过滤掉 hidden 的路由
  return layoutRoute.children.filter((r: RouteRecordRaw) => !r.meta?.hidden)
})

// 获取完整菜单路径
const getMenuPath = (parent: RouteRecordRaw, child?: RouteRecordRaw, grandChild?: RouteRecordRaw): string => {
  if (grandChild) {
    return `/${parent.path}/${child?.path}/${grandChild.path}`
  }
  if (child) {
    return `/${parent.path}/${child.path}`
  }
  return `/${parent.path}`
}

// 获取需要展开的菜单
const defaultOpeneds = computed(() => {
  return menuRoutes.value.filter(r => r.children && r.children.length > 0).map(r => `/${r.path}`)
})

// 当前激活的菜单
const activeMenu = computed(() => route.path)

// 当前页面标题
const currentTitle = computed(() => {
  const meta = route.meta as any
  const parts: string[] = []

  if (route.path.startsWith('/dev')) {
    parts.push('开发管理')
    if (route.path.startsWith('/dev/cost/')) {
      parts.push('成本')
    }
  }

  if (meta.title) {
    parts.push(meta.title as string)
  }

  return parts.length > 0 ? parts.join(' / ') : '首页'
})

const handleLogout = async () => {
  try {
    await logout()
  } finally {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    ElMessage.success('退出登录成功')
    router.push('/login')
  }
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.el-aside {
  background-color: #304156;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #3d4a5c;
}

.logo .el-icon {
  font-size: 24px;
}

.sidebar-menu {
  border-right: none;
}

.el-header {
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
}

.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 18px;
  font-weight: 500;
  color: #303133;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.username {
  color: #606266;
}

.el-main {
  background-color: #f0f2f5;
  padding: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
