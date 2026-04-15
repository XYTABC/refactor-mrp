import { ref } from 'vue'
import { Refresh, Download } from '@element-plus/icons-vue'

export function useCostSummary() {
  const tableData = ref([
    { productCode: 'PRD-001', productName: '智能控制器A1', materialCost: 120.00, laborCost: 35.00, overheadCost: 25.00, totalCost: 180.00, margin: 40 },
    { productCode: 'PRD-002', productName: '电机驱动模块', materialCost: 85.50, laborCost: 28.00, overheadCost: 20.00, totalCost: 133.50, margin: 30 },
    { productCode: 'PRD-003', productName: '传感器组件', materialCost: 45.00, laborCost: 15.00, overheadCost: 10.00, totalCost: 70.00, margin: 35 }
  ])

  return {
    tableData,
    Refresh,
    Download
  }
}
