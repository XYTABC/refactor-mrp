import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

export function useInternalMaterial() {
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(3)

  const tableData = ref([
    { code: 'MAT001', name: '螺丝M3x10', spec: 'M3*10mm', unit: '个', category: '标准件', warehouse: 'A仓', stock: 5000 },
    { code: 'MAT002', name: '轴承608', spec: '8*22*7mm', unit: '个', category: '轴承类', warehouse: 'A仓', stock: 200 },
    { code: 'MAT003', name: 'PCB板V2.1', spec: '100*80mm', unit: '块', category: '电子件', warehouse: 'B仓', stock: 150 }
  ])

  return {
    currentPage,
    pageSize,
    total,
    tableData,
    Plus
  }
}
