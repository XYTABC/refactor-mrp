import request from '@/utils/request'

// 登录
export function login(data: { userPhone: string; password: string }) {
  return request({
    url: '/system/sanfu/ulp/sys/user/login',
    method: 'post',
    data: {
      ...data,
      loginSource: 'mrp'
    }
  })
}

// 登出
export function logout() {
  return request({
    url: '/system/sanfu/ulp/sys/user/logout',
    method: 'get'
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

// 获取用户列表
export function getUserList(params?: any) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

// 新增用户
export function addUser(data: any) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

// 编辑用户
export function updateUser(data: any) {
  return request({
    url: '/user/update',
    method: 'put',
    data
  })
}

// 删除用户
export function deleteUser(id: number) {
  return request({
    url: `/user/delete/${id}`,
    method: 'delete'
  })
}
