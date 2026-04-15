import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/',
        component: () => import('@/layout/Layout.vue'),
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('@/views/Dashboard.vue'),
                meta: { title: '首页', icon: 'Odometer', hidden: true }
            },
            {
                path: 'user',
                name: 'User',
                component: () => import('@/views/User.vue'),
                meta: { title: '用户管理', icon: 'User' }
            },
            {
                path: 'dev',
                name: 'Dev',
                redirect: '/dev/internal-material',
                meta: { title: '开发管理', icon: 'Setting' },
                children: [
                    {
                        path: 'internal-material',
                        name: 'InternalMaterial',
                        component: () => import('@/views/dev/InternalMaterial/index.vue'),
                        meta: { title: '内部物料档案', icon: 'Box' }
                    },
                    {
                        path: 'external-material',
                        name: 'ExternalMaterial',
                        component: () => import('@/views/dev/ExternalMaterial/index.vue'),
                        meta: { title: '外部物料档案', icon: 'ShoppingCart' }
                    },
                    {
                        path: 'product',
                        name: 'Product',
                        component: () => import('@/views/dev/Product/index.vue'),
                        meta: { title: '物料商品', icon: 'Goods' }
                    },
                    {
                        path: 'cost',
                        name: 'Cost',
                        redirect: '/dev/cost/summary',
                        meta: { title: '成本', icon: 'Money' },
                        children: [
                            {
                                path: 'summary',
                                name: 'CostSummary',
                                component: () => import('@/views/dev/CostSummary/index.vue'),
                                meta: { title: '核价汇总', icon: 'DataLine' }
                            },
                            {
                                path: 'config',
                                name: 'CostConfig',
                                component: () => import('@/views/dev/CostConfig/index.vue'),
                                meta: { title: '配置', icon: 'Tools' }
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 路由守卫 - 登录验证
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')

    // 如果没有 Token 且不是访问登录页，跳转到登录页
    if (!token && to.path !== '/login') {
        next('/login')
    } else {
        next()
    }
})

export default router
