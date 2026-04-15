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
import { useProduct } from './index.ts'
const { productList, Plus, Goods } = useProduct()
</script>

<style scoped lang="scss">
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
