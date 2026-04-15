import request from '@/utils/request'

// 获取产品列表
export function getProductList(params?: any) {
    return request({
        url: '/product/list',
        method: 'get',
        params
    })
}

// 获取产品详情
export function getProductDetail(id: number) {
    return request({
        url: `/product/detail/${id}`,
        method: 'get'
    })
}

// 新增产品
export function addProduct(data: any) {
    return request({
        url: '/product/add',
        method: 'post',
        data
    })
}

// 编辑产品
export function updateProduct(data: any) {
    return request({
        url: '/product/update',
        method: 'put',
        data
    })
}

// 删除产品
export function deleteProduct(id: number) {
    return request({
        url: `/product/delete/${id}`,
        method: 'delete'
    })
}
