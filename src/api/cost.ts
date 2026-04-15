import request from '@/utils/request'

// 获取核价汇总
export function getCostSummary(params?: any) {
  return request({
    url: '/cost/summary',
    method: 'get',
    params
  })
}

// 获取成本配置
export function getCostConfig() {
  return request({
    url: '/cost/config',
    method: 'get'
  })
}

// 更新成本配置
export function updateCostConfig(data: any) {
  return request({
    url: '/cost/config',
    method: 'put',
    data
  })
}
