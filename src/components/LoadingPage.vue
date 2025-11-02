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
      
      <!-- 品牌标语 -->
      <p class="brand-slogan">AI for Love, Smart Fun Future</p>

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
  // 预加载主页资源
  preloadHomePage()
  
  // 立即启动动画，总时长2秒
  isAnimating.value = true
  startCharging()
  
  // 2秒后跳转到主页
  setTimeout(() => {
    router.push('/home')
  }, 2000) // 精确2秒总时长
})

// 预加载主页资源
const preloadHomePage = () => {
  // 预加载主页背景图片
  const images = ['/BG1.png', '/BG2.png', '/arrow.png']
  images.forEach(src => {
    const img = new Image()
    img.src = src
  })
  
  // 预加载主页组件（通过动态导入）
  import('../components/HomePage.vue').catch(() => {
    // 忽略预加载错误
  })
}

// 充电动画控制 - 慢速到快速的变化
const startCharging = () => {
  const duration = 2000 // 2秒充电动画
  const startTime = Date.now()
  
  // 缓动函数 - 慢速开始，然后加速
  const easeInQuart = (t: number): number => {
    return t * t * t * t
  }
  
  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // 应用缓动函数 - 慢速到快速
    const easedProgress = easeInQuart(progress)
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
  gap: 1rem; /* 减小间距，让标语更靠近logo */
}

.svg-logo-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 品牌标语 */
.brand-slogan {
  font-family: 'MiSans-Regular', 'MiSans', 'Noto Sans SC', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  margin: 0;
  letter-spacing: 0.05em;
  text-align: center;
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
  position: relative;
  /* 直接使用背景色，不要filter */
  background-color: #01CE7E;
  mask: url('/logo.svg') no-repeat center;
  mask-size: contain;
  -webkit-mask: url('/logo.svg') no-repeat center;
  -webkit-mask-size: contain;
  overflow: hidden;
}

/* 追光效果 - 增强可见性 */
.logo-green::after {
  content: '';
  position: absolute;
  top: 0;
  left: -150%;
  width: 150%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    transparent 20%,
    rgba(255, 255, 255, 0.6) 35%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0.6) 65%,
    transparent 80%,
    transparent 100%
  );
  animation: shine 2s ease-in-out infinite;
  animation-delay: 0s;
  filter: blur(0.5px);
  mix-blend-mode: overlay;
}

/* 添加第二层追光效果 */
.logo-green::before {
  content: '';
  position: absolute;
  top: 0;
  left: -120%;
  width: 120%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 40%,
    rgba(255, 255, 255, 0.7) 50%,
    rgba(255, 255, 255, 0.3) 60%,
    transparent 100%
  );
  animation: shine-secondary 2s ease-in-out infinite;
  animation-delay: 0.2s;
  z-index: 1;
}

@keyframes shine {
  0% {
    left: -150%;
  }
  100% {
    left: 150%;
  }
}

@keyframes shine-secondary {
  0% {
    left: -120%;
  }
  100% {
    left: 120%;
  }
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
  
  .brand-slogan {
    font-size: 14px; /* 16px * 0.875 */
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
  
  .brand-slogan {
    font-size: 13px; /* 16px * 0.8125 */
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
    gap: 0.8rem;
  }
  
  .brand-slogan {
    font-size: 12px;
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
    gap: 0.6rem;
    padding: 0 1rem;
  }
  
  .loading-container {
    padding: 1rem;
  }
  
  .brand-slogan {
    font-size: 11px;
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
  
  .brand-slogan {
    font-size: 10px;
  }
}
</style>
