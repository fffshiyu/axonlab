<template>
  <div class="loading-container">
    <!-- 背景图片 -->
    <div class="background-image"></div>
    
    <!-- Logo动画容器 -->
    <div class="logo-container">
      <!-- SVG Logo 充电效果 -->
      <div class="svg-logo-container">
        <!-- 双层logo实现充电效果 -->
        <div class="logo-layers">
          <!-- 白色logo背景层 -->
          <div class="logo-background">
            <img src="/logo.svg" alt="AxonLab Logo" class="logo-white" />
          </div>
          
          <!-- 绿色logo填充层 -->
          <div class="logo-fill" :style="{ width: chargingPercentage + '%' }">
            <div class="logo-green"></div>
          </div>
        </div>
      </div>
      

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAnimating = ref(false)
const chargingPercentage = ref(0)

onMounted(() => {
  // 延迟启动动画
  setTimeout(() => {
    isAnimating.value = true
    startCharging()
  }, 500)
  
  // 动画完成后跳转到主页
  setTimeout(() => {
    router.push('/home')
  }, 2000) // 1.5s动画 + 0.5s延迟 = 2s总时长
})

// 充电动画控制 - 使用缓动函数
const startCharging = () => {
  const duration = 1500 // 1.5秒充电动画
  const startTime = Date.now()
  
  // 缓动函数 - 开始快，中间慢，结束快
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }
  
  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // 应用缓动函数
    const easedProgress = easeInOutCubic(progress)
    chargingPercentage.value = Math.round(easedProgress * 100)
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  
  requestAnimationFrame(animate)
}
</script>

<style scoped>
.loading-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/BG.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
}

.logo-container {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.svg-logo-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-layers {
  position: relative;
  width: 608px;
  height: 57px;
}

.logo-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.logo-white {
  width: 608px;
  height: 57px;
  filter: brightness(0) invert(1);
}

.logo-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow: hidden;
  transition: width 0.05s ease;
}

.logo-green {
  width: 608px;
  height: 57px;
  /* 直接使用背景色，不要filter */
  background-color: #01CE7E;
  mask: url('/logo.svg') no-repeat center;
  mask-size: contain;
  -webkit-mask: url('/logo.svg') no-repeat center;
  -webkit-mask-size: contain;
}







/* 响应式设计 */
/* 1440p屏幕 */
@media (max-width: 1440px) {
  .logo-layers,
  .logo-white,
  .logo-green {
    width: 486px; /* 608 * 0.8 */
    height: 46px; /* 57 * 0.8 */
  }
}

/* 1024p屏幕 */
@media (max-width: 1024px) {
  .logo-layers,
  .logo-white,
  .logo-green {
    width: 365px; /* 608 * 0.6 */
    height: 34px; /* 57 * 0.6 */
  }
}

/* 平板适配 */
@media (max-width: 768px) {
  .logo-layers,
  .logo-white,
  .logo-green {
    width: 280px; /* 适合平板的尺寸 */
    height: 26px;
  }
  
  .logo-container {
    gap: 1.5rem;
  }
}

/* 手机适配 */
@media (max-width: 480px) {
  .logo-layers,
  .logo-white,
  .logo-green {
    width: 240px; /* 适合手机的尺寸 */
    height: 22px;
  }
  
  .logo-container {
    gap: 1rem;
    padding: 0 1rem;
  }
  
  .loading-container {
    padding: 1rem;
  }
}

/* 超小屏幕适配 */
@media (max-width: 320px) {
  .logo-layers,
  .logo-white,
  .logo-green {
    width: 200px;
    height: 18px;
  }
  
  .loading-container {
    padding: 0.5rem;
  }
}
</style>
