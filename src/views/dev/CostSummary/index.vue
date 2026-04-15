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
import { useCostSummary } from './index.ts'
const { tableData, Refresh, Download } = useCostSummary()
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
