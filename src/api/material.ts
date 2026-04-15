import request from '@/utils/request'

// ========== 内部物料 ==========

// 获取内部物料列表
export function getInternalMaterialList(params?: any) {
  return request({
    url: '/material/internal/list',
    method: 'get',
    params
  })
}

// 新增内部物料
export function addInternalMaterial(data: any) {
  return request({
    url: '/material/internal/add',
    method: 'post',
    data
  })
}

// 编辑内部物料
export function updateInternalMaterial(data: any) {
  return request({
    url: '/material/internal/update',
    method: 'put',
    data
  })
}

// 删除内部物料
export function deleteInternalMaterial(id: number) {
  return request({
    url: `/material/internal/delete/${id}`,
    method: 'delete'
  })
}

// ========== 外部物料 ==========

// 获取外部物料列表
export function getExternalMaterialList(params?: any) {
  return request({
    url: '/material/external/list',
    method: 'get',
    params
  })
}

// 新增外部物料
export function addExternalMaterial(data: any) {
  return request({
    url: '/material/external/add',
    method: 'post',
    data
  })
}

// 编辑外部物料
export function updateExternalMaterial(data: any) {
  return request({
    url: '/material/external/update',
    method: 'put',
    data
  })
}

// 删除外部物料
export function deleteExternalMaterial(id: number) {
  return request({
    url: `/material/external/delete/${id}`,
    method: 'delete'
  })
}

// ========== 物料商品（示例） ==========

// 获取上架状态
export function getStatus(data: any) {
  return request({
    url: '/material/sanfu/mrp/materialGoods/listingStatus',
    method: 'post',
    data
  })
}
