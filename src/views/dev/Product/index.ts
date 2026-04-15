import { ref } from 'vue'
import { Plus, Goods } from '@element-plus/icons-vue'

export function useProduct() {
  const productList = ref([
    { id: 1, name: '智能控制器A1', code: 'PRD-001', price: 299.00 },
    { id: 2, name: '电机驱动模块', code: 'PRD-002', price: 189.50 },
    { id: 3, name: '传感器组件', code: 'PRD-003', price: 99.00 },
    { id: 4, name: '电源管理模块', code: 'PRD-004', price: 159.00 }
  ])

  return {
    productList,
    Plus,
    Goods
  }
}
