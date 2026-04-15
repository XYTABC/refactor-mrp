<template>
  <div class="user-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户列表</span>
          <el-button type="primary" :icon="Plus" @click="handleAdd">新增用户</el-button>
        </div>
      </template>
      
      <div class="search-bar">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索用户名或邮箱"
          :prefix-icon="Search"
          style="width: 300px"
          clearable
        />
        <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
      </div>

      <el-table :data="filteredUsers" stripe style="margin-top: 20px">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="role" label="角色" width="120">
          <template #default="{ row }">
            <el-tag :type="row.role === '管理员' ? 'danger' : 'primary'">
              {{ row.role }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '启用' ? 'success' : 'info'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" text @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" size="small" text @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 20px; justify-content: flex-end"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Search } from '@element-plus/icons-vue'

interface User {
  id: number
  username: string
  email: string
  role: string
  status: string
  createTime: string
}

const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(4)

const users = ref<User[]>([
  { id: 1, username: 'admin', email: 'admin@example.com', role: '管理员', status: '启用', createTime: '2024-01-01 10:00:00' },
  { id: 2, username: 'user01', email: 'user01@example.com', role: '普通用户', status: '启用', createTime: '2024-01-02 11:00:00' },
  { id: 3, username: 'user02', email: 'user02@example.com', role: '普通用户', status: '启用', createTime: '2024-01-03 12:00:00' },
  { id: 4, username: 'user03', email: 'user03@example.com', role: '普通用户', status: '禁用', createTime: '2024-01-04 13:00:00' }
])

const filteredUsers = computed(() => {
  if (!searchKeyword.value) return users.value
  return users.value.filter(user => 
    user.username.includes(searchKeyword.value) || 
    user.email.includes(searchKeyword.value)
  )
})

const handleSearch = () => {
  ElMessage.success('搜索完成')
}

const handleAdd = () => {
  ElMessage.info('新增用户功能')
}

const handleEdit = (row: User) => {
  ElMessage.info(`编辑用户: ${row.username}`)
}

const handleDelete = async (row: User) => {
  await ElMessageBox.confirm(`确定要删除用户 ${row.username} 吗？`, '提示', {
    type: 'warning'
  })
  ElMessage.success('删除成功')
}
</script>

<style scoped>
.user-container {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-bar {
  display: flex;
  gap: 12px;
}
</style>
