// 通用响应结构
export interface Response<T = any> {
  code: number
  message: string
  data: T
}

// 分页参数
export interface PageParams {
  page?: number
  pageSize?: number
  total?: number
}

// 分页响应
export interface PageResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// 用户信息
export interface UserInfo {
  id: number
  username: string
  email: string
  role: string
  status: string
  avatar?: string
}

// 登录参数
export interface LoginParams {
  username: string
  password: string
}

// 登录响应
export interface LoginResult {
  token: string
  userInfo: UserInfo
}
