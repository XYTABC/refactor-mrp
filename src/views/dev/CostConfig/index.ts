import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

export function useCostConfig() {
  const activeTab = ref('basic')

  const config = reactive({
    materialLossRate: 5,
    laborHourlyRate: 50,
    overheadRate: 150,
    packagingCost: 2.5,
    shippingCost: 1.5,
    defaultMargin: 30,
    minMargin: 15,
    marginWarning: true
  })

  const costItems = ref([
    { code: 'C001', name: '原材料', type: '直接', unit: '元', defaultValue: 0 },
    { code: 'C002', name: '辅料', type: '间接', unit: '元', defaultValue: 0 },
    { code: 'C003', name: '人工', type: '直接', unit: '小时', defaultValue: 0 },
    { code: 'C004', name: '设备折旧', type: '间接', unit: '元', defaultValue: 0 }
  ])

  const handleSave = () => {
    ElMessage.success('配置保存成功')
  }

  const handleReset = () => {
    config.materialLossRate = 5
    config.laborHourlyRate = 50
    config.overheadRate = 150
    config.packagingCost = 2.5
    config.shippingCost = 1.5
  }

  return {
    activeTab,
    config,
    costItems,
    handleSave,
    handleReset,
    Plus
  }
}
