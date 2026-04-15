<template>
  <div class="config-container">
    <el-card>
      <template #header>
        <span>成本配置</span>
      </template>

      <el-tabs v-model="activeTab" type="border-card">
        <el-tab-pane label="基础配置" name="basic">
          <el-form label-width="140px">
            <el-form-item label="材料损耗率">
              <el-input-number v-model="config.materialLossRate" :min="0" :max="100" :step="0.1" />
              <span class="unit">%</span>
            </el-form-item>
            <el-form-item label="人工工时单价">
              <el-input-number v-model="config.laborHourlyRate" :min="0" :precision="2" />
              <span class="unit">元/小时</span>
            </el-form-item>
            <el-form-item label="制造费用分摊率">
              <el-input-number v-model="config.overheadRate" :min="0" :max="500" :step="1" />
              <span class="unit">%</span>
            </el-form-item>
            <el-form-item label="包装费用">
              <el-input-number v-model="config.packagingCost" :min="0" :precision="2" />
              <span class="unit">元/件</span>
            </el-form-item>
            <el-form-item label="运输费用">
              <el-input-number v-model="config.shippingCost" :min="0" :precision="2" />
              <span class="unit">元/件</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSave">保存配置</el-button>
              <el-button @click="handleReset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="成本项目" name="items">
          <el-button type="primary" :icon="Plus" style="margin-bottom: 16px">新增成本项目</el-button>
          <el-table :data="costItems" stripe>
            <el-table-column prop="code" label="项目编码" width="120" />
            <el-table-column prop="name" label="项目名称" />
            <el-table-column prop="type" label="类型" width="120">
              <template #default="{ row }">
                <el-tag :type="row.type === '直接' ? 'primary' : 'success'">{{ row.type }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="unit" label="单位" width="80" />
            <el-table-column prop="defaultValue" label="默认值" width="100" align="right" />
            <el-table-column label="操作" width="150" fixed="right">
              <template #default>
                <el-button type="primary" size="small" text>编辑</el-button>
                <el-button type="danger" size="small" text>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="利润率设置" name="margin">
          <el-form label-width="140px">
            <el-form-item label="默认利润率">
              <el-input-number v-model="config.defaultMargin" :min="0" :max="100" :step="1" />
              <span class="unit">%</span>
            </el-form-item>
            <el-form-item label="最低利润率">
              <el-input-number v-model="config.minMargin" :min="0" :max="100" :step="1" />
              <span class="unit">%</span>
            </el-form-item>
            <el-form-item label="利润率预警">
              <el-switch v-model="config.marginWarning" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSave">保存配置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

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
</script>

<style scoped>
.config-container {
  height: 100%;
}

.unit {
  margin-left: 8px;
  color: #909399;
}
</style>
