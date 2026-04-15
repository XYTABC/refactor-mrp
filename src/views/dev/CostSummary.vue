<template>
  <div class="cost-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>核价汇总</span>
          <div class="header-actions">
            <el-button :icon="Refresh">刷新</el-button>
            <el-button type="success" :icon="Download">导出</el-button>
          </div>
        </div>
      </template>

      <el-table :data="tableData" stripe show-summary>
        <el-table-column prop="productCode" label="产品编码" width="120" />
        <el-table-column prop="productName" label="产品名称" />
        <el-table-column prop="materialCost" label="材料成本" width="120" align="right">
          <template #default="{ row }">
            ¥{{ row.materialCost.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="laborCost" label="人工成本" width="120" align="right">
          <template #default="{ row }">
            ¥{{ row.laborCost.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="overheadCost" label="制造费用" width="120" align="right">
          <template #default="{ row }">
            ¥{{ row.overheadCost.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="totalCost" label="总成本" width="120" align="right">
          <template #default="{ row }">
            <strong style="color: #f56c6c">¥{{ row.totalCost.toFixed(2) }}</strong>
          </template>
        </el-table-column>
        <el-table-column prop="margin" label="利润率" width="100" align="center">
          <template #default="{ row }">
            <el-tag type="success">{{ row.margin }}%</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Refresh, Download } from '@element-plus/icons-vue'

const tableData = ref([
  { productCode: 'PRD-001', productName: '智能控制器A1', materialCost: 120.00, laborCost: 35.00, overheadCost: 25.00, totalCost: 180.00, margin: 40 },
  { productCode: 'PRD-002', productName: '电机驱动模块', materialCost: 85.50, laborCost: 28.00, overheadCost: 20.00, totalCost: 133.50, margin: 30 },
  { productCode: 'PRD-003', productName: '传感器组件', materialCost: 45.00, laborCost: 15.00, overheadCost: 10.00, totalCost: 70.00, margin: 35 }
])
</script>

<style scoped>
.cost-container {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  gap: 12px;
}
</style>
