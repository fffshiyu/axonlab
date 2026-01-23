<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { preloadAllModels } from './utils/modelPreloader'
import { useLanguage } from './composables/useLanguage'

const { initLanguage } = useLanguage()

// 初始化语言设置
initLanguage()

// 在应用启动时预加载3D模型
onMounted(() => {
  // 延迟预加载，避免影响首屏加载
  setTimeout(() => {
    preloadAllModels()
  }, 2000)
})
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
