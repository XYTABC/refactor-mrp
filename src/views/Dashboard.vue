<template>
  <div class="home">
    <div>{{ username }} 欢迎使用</div>
    <div class="d-f jcc aic h-100 home-box">
      <div>
        <div class="home-title">
          面辅料管理系统<span>(MRP)</span>
        </div>
        <div class="tac">
          <div class="mb-10"><img src="@/assets/img/shouye.png" alt="" width="160"></div>
          <div><img src="@/assets/img/shouye1.png" alt="" width="360"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const username = ref('用户')

onMounted(() => {
  username.value = localStorage.getItem('username') || '用户'
})
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 20px;
  font-size: 20px;
  background-color: #fff;
}

.home-box {
  position: relative;
  top: -30px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.home-title {
  font-size: 50px;
  margin-bottom: 80px;
  color: #1b1b1b;

  span {
    font-family: 'Papyrus';
  }
}

.tac {
  text-align: center;
}
</style>
