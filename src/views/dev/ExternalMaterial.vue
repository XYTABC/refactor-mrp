<template>
  <div class="material-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>外部物料档案</span>
          <el-button type="primary" :icon="Plus">新增供应商物料</el-button>
        </div>
      </template>

      <el-table :data="tableData" stripe>
        <el-table-column prop="code" label="物料编码" width="120" />
        <el-table-column prop="name" label="物料名称" />
        <el-table-column prop="supplier" label="供应商" width="150" />
        <el-table-column prop="spec" label="规格型号" width="150" />
        <el-table-column prop="unit" label="单位" width="80" />
        <el-table-column prop="price" label="单价" width="100" />
        <el-table-column prop="leadTime" label="交期(天)" width="100" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default>
            <el-button type="primary" size="small" text>编辑</el-button>
            <el-button type="danger" size="small" text>删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next"
        style="margin-top: 20px; justify-content: flex-end"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(3)

const tableData = ref([
  { code: 'EXT001', name: '电机组件', supplier: '深圳电机厂', spec: '50W', unit: '个', price: 120.00, leadTime: 7 },
  { code: 'EXT002', name: '控制芯片', supplier: '华强电子', spec: 'STM32', unit: '片', price: 45.50, leadTime: 5 },
  { code: 'EXT003', name: '铝合金外壳', supplier: '东莞金属', spec: '150*100*50', unit: '个', price: 85.00, leadTime: 10 }
])
</script>

<style scoped>
.material-container {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
