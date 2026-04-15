<template>
  <div class="material-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>内部物料档案</span>
          <el-button type="primary" :icon="Plus">新增物料</el-button>
        </div>
      </template>

      <el-table :data="tableData" stripe>
        <el-table-column prop="code" label="物料编码" width="120" />
        <el-table-column prop="name" label="物料名称" />
        <el-table-column prop="spec" label="规格型号" width="150" />
        <el-table-column prop="unit" label="单位" width="80" />
        <el-table-column prop="category" label="物料类别" width="100" />
        <el-table-column prop="warehouse" label="仓库" width="100" />
        <el-table-column prop="stock" label="库存" width="80" />
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
  { code: 'MAT001', name: '螺丝M3x10', spec: 'M3*10mm', unit: '个', category: '标准件', warehouse: 'A仓', stock: 5000 },
  { code: 'MAT002', name: '轴承608', spec: '8*22*7mm', unit: '个', category: '轴承类', warehouse: 'A仓', stock: 200 },
  { code: 'MAT003', name: 'PCB板V2.1', spec: '100*80mm', unit: '块', category: '电子件', warehouse: 'B仓', stock: 150 }
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
