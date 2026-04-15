import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

export function useExternalMaterial() {
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(3)

  const tableData = ref([
    { code: 'EXT001', name: '电机组件', supplier: '深圳电机厂', spec: '50W', unit: '个', price: 120.00, leadTime: 7 },
    { code: 'EXT002', name: '控制芯片', supplier: '华强电子', spec: 'STM32', unit: '片', price: 45.50, leadTime: 5 },
    { code: 'EXT003', name: '铝合金外壳', supplier: '东莞金属', spec: '150*100*50', unit: '个', price: 85.00, leadTime: 10 }
  ])

  return {
    currentPage,
    pageSize,
    total,
    tableData,
    Plus
  }
}
