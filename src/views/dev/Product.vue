<template>
  <div class="product-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>物料商品</span>
          <el-button type="primary" :icon="Plus">新增商品</el-button>
        </div>
      </template>

      <el-row :gutter="20">
        <el-col :span="6" v-for="item in productList" :key="item.id">
          <el-card shadow="hover" class="product-card">
            <div class="product-image">
              <el-icon :size="48" color="#909399"><Goods /></el-icon>
            </div>
            <div class="product-info">
              <h4>{{ item.name }}</h4>
              <p class="product-code">{{ item.code }}</p>
              <p class="product-price">¥{{ item.price.toFixed(2) }}</p>
              <div class="product-actions">
                <el-button size="small" type="primary" text>编辑</el-button>
                <el-button size="small" type="primary" text @click="$router.push('/dev/cost/summary')">成本</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Goods } from '@element-plus/icons-vue'

const productList = ref([
  { id: 1, name: '智能控制器A1', code: 'PRD-001', price: 299.00 },
  { id: 2, name: '电机驱动模块', code: 'PRD-002', price: 189.50 },
  { id: 3, name: '传感器组件', code: 'PRD-003', price: 99.00 },
  { id: 4, name: '电源管理模块', code: 'PRD-004', price: 159.00 }
])
</script>

<style scoped>
.product-container {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-card {
  margin-bottom: 20px;
  text-align: center;
}

.product-image {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  border-radius: 4px;
  margin-bottom: 12px;
}

.product-info h4 {
  margin: 0 0 8px;
  color: #303133;
}

.product-code {
  font-size: 12px;
  color: #909399;
  margin: 4px 0;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #f56c6c;
  margin: 8px 0;
}

.product-actions {
  display: flex;
  justify-content: center;
  gap: 8px;
}
</style>
