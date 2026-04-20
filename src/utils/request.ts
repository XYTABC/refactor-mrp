import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
import { clearAuthSession, isTokenExpired } from '@/utils/auth'

// 请求配置接口
export interface RequestConfig extends AxiosRequestConfig {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'get' | 'post' | 'put' | 'delete' | 'patch'
}

// 创建 axios 实例
// baseURL: 后端网关路径 "/gateway"，可根据实际网关路径修改
const baseURL = import.meta.env.VITE_APP_API_BASE_URL 
    ? import.meta.env.VITE_APP_API_BASE_URL + '/gateway'
    : '/api'

console.log('API Base URL:', baseURL)

const service = axios.create({
    baseURL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

// 不需要 token 的接口白名单
const whiteList = ['/system/sanfu/ulp/sys/user/login']

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 白名单接口跳过 token 检查
        if (whiteList.some(path => config.url?.includes(path))) {
            return config
        }
        
        if (isTokenExpired()) {
            clearAuthSession()
            if (window.location.pathname !== '/login') {
                ElMessage.error('登录已过期，请重新登录')
                window.location.href = '/login'
            }
            return Promise.reject(new Error('登录已过期'))
        }

        const token = localStorage.getItem('token')
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error: AxiosError) => {
        console.error('请求错误:', error)
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const { code, message, data } = response.data

        if (code === 200 || code === 0) {
            return data
        }

        if (code === 401) {
            ElMessage.error('登录已过期，请重新登录')
            clearAuthSession()
            window.location.href = '/login'
            return Promise.reject(new Error(message || '登录已过期'))
        }

        ElMessage.error(message || '请求失败')
        return Promise.reject(new Error(message || '请求失败'))
    },
    (error: AxiosError) => {
        let message = '网络错误，请稍后重试'
        
        console.error('请求错误详情:', {
            message: error.message,
            code: error.code,
            config: error.config,
            response: error.response,
            request: error.request
        })

        if (error.response) {
            const status = error.response.status
            switch (status) {
                case 400: message = '请求参数错误'; break
                case 401:
                    message = '未授权，请登录'
                    clearAuthSession()
                    window.location.href = '/login'
                    break
                case 403: message = '拒绝访问'; break
                case 404: message = '请求地址不存在'; break
                case 500: message = '服务器内部错误'; break
                default: message = `请求失败: ${status}`
            }
        } else if (error.request) {
            message = '网络连接失败'
        }

        ElMessage.error(message)
        return Promise.reject(error)
    }
)

// 请求函数
const request = <T = any>(config: RequestConfig): Promise<T> => {
    const { method = 'GET', url, ...rest } = config

    return service({
        method: method.toUpperCase(),
        url,
        ...rest
    })
}

export default request
