<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 左侧蓝色区域 -->
      <div class="login-left">
        <div class="brand-section">
          <img src="@/assets/LOGINLOGO.jpg" alt="SANFU" class="logo-img" />
          <h2 class="subtitle">供应链协同平台——MRP</h2>
          <p class="en-title">Supply Chain Management</p>
        </div>
      </div>

      <!-- 右侧登录表单 -->
      <div class="login-right">
        <div class="login-form-wrapper">
          <h3 class="form-title">
            用户登录
            <span class="form-subtitle">USER LOGIN</span>
          </h3>

          <el-form
            ref="formRef"
            :model="form"
            :rules="rules"
            class="login-form"
            @keyup.enter="handleLogin"
          >
            <el-form-item prop="userPhone">
              <el-input
                v-model="form.userPhone"
                placeholder="请输入手机号"
                size="large"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                type="password"
                placeholder="请输入登录密码"
                size="large"
                show-password
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="large"
                :loading="loading"
                class="login-btn"
                @click="handleLogin"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { login } from '@/api/user'

const router = useRouter()
const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive({
  userPhone: '',
  password: ''
})

const rules: FormRules = {
  userPhone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }]
}

const handleLogin = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const res = await login(form)
        localStorage.setItem('token', res.token)
        localStorage.setItem('username', res.nickName || form.userPhone)
        ElMessage.success('登录成功')
        router.push('/dashboard')
      } catch {
        // 错误已在 request 中统一处理
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
}

.login-box {
  display: flex;
  width: 800px;
  height: 550px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* 左侧蓝色区域 - 使用背景图 */
.login-left {
  width: 45%;
  background: url('@/assets/bg.png') no-repeat center center;
  background-size: cover;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
}

.brand-section {
  text-align: center;
  margin-top: 40px;
}

.logo-img {
  width: 120px;
  height: auto;
  margin-bottom: 20px;
  background: #fff;
  padding: 10px;
  border-radius: 8px;
}

.subtitle {
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 8px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.en-title {
  font-size: 14px;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* 右侧登录表单 */
.login-right {
  width: 55%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.login-form-wrapper {
  width: 100%;
  max-width: 320px;
}

.form-title {
  font-size: 20px;
  font-weight: 500;
  color: #333;
  margin-bottom: 30px;
}

.form-subtitle {
  font-size: 12px;
  color: #999;
  font-weight: normal;
  margin-left: 8px;
}

.login-form :deep(.el-input__wrapper) {
  border-radius: 4px;
}

.login-btn {
  width: 100%;
  background: #409EFF;
  border-color: #409EFF;
  border-radius: 4px;
}

.login-btn:hover {
  background: #66b1ff;
  border-color: #66b1ff;
}
</style>
