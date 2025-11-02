<template>
  <div class="product-container">
    <!-- 导航栏 -->
    <Navbar active-page="product-series" />

    <!-- 产品展示区域 -->
    <section class="product-section" id="product-1">
      <div class="product-content">
        <!-- 产品标题 -->
        <div class="product-header">
          <h1 class="product-title">LUUMI</h1>
          <h2 class="product-subtitle">鹿米系列</h2>
        </div>

        <!-- 产品图片 -->
        <div class="product-image-container">
          <img :src="currentProductImage" alt="LUUMI产品" class="product-image" />
        </div>

        <!-- 视图切换按钮 -->
        <div class="view-buttons">
          <button 
            class="view-btn" 
            :class="{ active: currentView === 'front' }"
            @click="switchView('front')"
          >
            <img src="/front-view-btn.png" alt="正视图" class="view-btn-img" />
          </button>
          <button 
            class="view-btn" 
            :class="{ active: currentView === 'side' }"
            @click="switchView('side')"
          >
            <img src="/side-view-btn.png" alt="侧视图" class="view-btn-img" />
          </button>
          <button 
            class="view-btn" 
            :class="{ active: currentView === 'top' }"
            @click="switchView('top')"
          >
            <img src="/top-view-btn.png" alt="俯视图" class="view-btn-img" />
          </button>
        </div>

        <!-- 向下箭头 -->
        <div class="scroll-indicator" @click="scrollToSecondProduct">
          <img src="/arrow.png" alt="向下箭头" class="scroll-arrow-img" />
        </div>
      </div>
    </section>

    <!-- 第二个产品展示区域 -->
    <section class="product-section" id="second-product">
      <div class="product-content">
        <!-- 产品标题 -->
        <div class="product-header">
          <h1 class="product-title">AXON ROB</h1>
          <h2 class="product-subtitle">羽山机器人系列</h2>
        </div>

        <!-- 产品图片 -->
        <div class="product-image-container">
          <img :src="currentProductImage2" alt="AXON ROB产品" class="product-image" />
        </div>

        <!-- 视图切换按钮 -->
        <div class="view-buttons">
          <button 
            class="view-btn" 
            :class="{ active: currentView2 === 'front' }"
            @click="switchView2('front')"
          >
            <img src="/front-view-btn.png" alt="正视图" class="view-btn-img" />
          </button>
          <button 
            class="view-btn" 
            :class="{ active: currentView2 === 'side' }"
            @click="switchView2('side')"
          >
            <img src="/side-view-btn.png" alt="侧视图" class="view-btn-img" />
          </button>
          <button 
            class="view-btn" 
            :class="{ active: currentView2 === 'top' }"
            @click="switchView2('top')"
          >
            <img src="/top-view-btn.png" alt="俯视图" class="view-btn-img" />
          </button>
        </div>

        <!-- 向上箭头 -->
        <div class="scroll-indicator" @click="scrollToFirstProduct">
          <img src="/arrow.png" alt="向上箭头" class="scroll-arrow-img scroll-arrow-up" />
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-container">
        <!-- AXON LABS Logo - 左侧200px -->
        <div class="footer-logo">
          <img src="/logo/greenlogo.png" alt="AXON LABS" class="footer-logo-img" />
        </div>
        
        <!-- 页脚内容 - 中部左对齐 -->
        <div class="footer-content">
          <!-- 社交媒体图标 -->
          <div class="social-icons">
            <img src="/logo/weibo.png" alt="微博" class="social-icon" />
            <img src="/logo/redbook.png" alt="小红书" class="social-icon" />
            <img src="/logo/bilibil.png" alt="哔哩哔哩" class="social-icon" />
            <img src="/logo/ins.png" alt="Instagram" class="social-icon" />
            <img src="/logo/wechat.png" alt="微信" class="social-icon" />
          </div>
          
          <!-- 文字区域 -->
          <div class="footer-text-area">
            <!-- 链接行 -->
            <div class="footer-links">
              <a href="#" class="footer-link">隐私政策</a>
              <span class="footer-divider">|</span>
              <a href="#" class="footer-link">服务条款</a>
              <span class="footer-divider">|</span>
              <a href="#" class="footer-link">联系我们</a>
            </div>
            
            <!-- 联系信息行 -->
            <div class="footer-contact">
              <span>客服热线：400-123-4567 | 邮箱：info@axonlabs.com</span>
            </div>
            
            <!-- 版权信息行 -->
            <div class="footer-copyright">
              <span>© 2024 北京玄圃科技有限公司 版权所有 | 京ICP备2024000000号</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from './Navbar.vue'

// 导航栏可见性
const isNavbarVisible = ref(true)



// 下拉菜单控制
const isDropdownVisible = ref(false)
const isQRCodeVisible = ref(false)
const currentQRTitle = ref('')

const showDropdown = () => {
  isDropdownVisible.value = true
}

const hideDropdown = () => {
  // 移除自动隐藏逻辑，只保留延迟以防止意外关闭
  setTimeout(() => {
    // 这里不做任何操作，让点击空白处来控制隐藏
  }, 200)
}

const showQRCode = (platform: string) => {
  const titles = {
    tmall: '天猫商城',
    douyin: '抖音商城', 
    jd: '京东商城',
    xiaochengxu: '小程序官方商城'
  }
  
  currentQRTitle.value = titles[platform as keyof typeof titles] || ''
  isQRCodeVisible.value = true
  isDropdownVisible.value = true // 确保下拉菜单保持打开
}

// 点击空白处隐藏下拉菜单和二维码
const handleClickOutside = (event: Event) => {
  const dropdown = document.querySelector('.nav-dropdown')
  if (dropdown && !dropdown.contains(event.target as Node)) {
    isDropdownVisible.value = false
    isQRCodeVisible.value = false
  }
}

// 第一个产品的视图状态
const currentView = ref('front')
const productImages = {
  front: '/product1.png',
  side: '/product1.png',  // 暂时使用同一张图片
  top: '/product1.png'    // 暂时使用同一张图片
}
const currentProductImage = ref(productImages.front)

// 第二个产品的视图状态
const currentView2 = ref('front')
const productImages2 = {
  front: '/product1.png',
  side: '/product1.png',  // 暂时使用同一张图片
  top: '/product1.png'    // 暂时使用同一张图片
}
const currentProductImage2 = ref(productImages2.front)

// 切换第一个产品视图
const switchView = (view: 'front' | 'side' | 'top') => {
  currentView.value = view
  currentProductImage.value = productImages[view]
}

// 切换第二个产品视图
const switchView2 = (view: 'front' | 'side' | 'top') => {
  currentView2.value = view
  currentProductImage2.value = productImages2[view]
}

// 全屏滚动功能 - 参考首页实现
let currentSection = 0
const sections = ['product-1', 'second-product', 'footer']
let isScrolling = false
let lastScrollTime = 0

// 检测当前在哪个区域
const getCurrentSection = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  
  // 计算每个区域的精确位置
  for (let i = 0; i < sections.length - 1; i++) { // 排除footer
    const element = document.getElementById(sections[i])
    if (element) {
      const rect = element.getBoundingClientRect()
      const elementTop = rect.top + scrollTop
      const elementBottom = elementTop + element.offsetHeight
      
      // 如果当前滚动位置在这个区域范围内
      if (scrollTop >= elementTop - windowHeight * 0.3 && 
          scrollTop < elementBottom - windowHeight * 0.7) {
        return i
      }
    }
  }
  
  // 如果滚动到底部，检查是否在footer区域
  const footer = document.querySelector('.footer')
  if (footer) {
    const footerRect = footer.getBoundingClientRect()
    if (footerRect.top <= windowHeight * 0.5) {
      return sections.length - 1 // footer索引
    }
  }
  
  // 默认返回最接近的区域
  return Math.round(scrollTop / windowHeight)
}

const scrollToSection = (index: number) => {
  if (index < 0 || index >= sections.length || isScrolling) return
  
  const sectionId = sections[index]
  const element = document.getElementById(sectionId) || document.querySelector('.footer')
  if (element) {
    isScrolling = true
    lastScrollTime = Date.now()
    
    requestAnimationFrame(() => {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    })
    
    currentSection = index
    
    setTimeout(() => {
      isScrolling = false
    }, 800)
  }
}

// 滚动到第二个产品
const scrollToSecondProduct = () => {
  scrollToSection(1)
}

// 滚动到第一个产品
const scrollToFirstProduct = () => {
  scrollToSection(0)
}

// 全屏滚动处理
const handleWheel = (event: WheelEvent) => {
  if (isScrolling) return
  
  const now = Date.now()
  const timeSinceLastScroll = now - lastScrollTime
  
  // 减少延迟，提高响应性
  if (timeSinceLastScroll < 50) return
  
  // 检查当前是否在footer区域
  const currentSectionIndex = getCurrentSection()
  const isInFooterSection = currentSectionIndex === sections.length - 1
  
  // 如果在footer区域，允许正常滚动
  if (isInFooterSection) {
    // 更新导航栏显示状态
    if (event.deltaY > 0) {
      isNavbarVisible.value = false
    } else {
      isNavbarVisible.value = true
    }
    return // 不阻止默认滚动行为
  }
  
  // 对于其他区域，使用全屏翻页
  event.preventDefault()
  
  // 更新导航栏显示状态（基于滚动方向）
  if (event.deltaY > 0) {
    // 向下滚动 - 隐藏导航栏
    isNavbarVisible.value = false
  } else {
    // 向上滚动 - 显示导航栏
    isNavbarVisible.value = true
  }
  
  // 使用简单的滚动检测
  const scrollDelta = Math.abs(event.deltaY)
  
  // 降低阈值，提高响应性，并添加防抖
  if (scrollDelta >= 30 && timeSinceLastScroll >= 300) {
    currentSection = getCurrentSection()
    lastScrollTime = now
    
    if (event.deltaY > 0) {
      // 向下滚动
      if (currentSection < sections.length - 1) {
        scrollToSection(currentSection + 1)
      }
    } else {
      // 向上滚动
      if (currentSection > 0) {
        scrollToSection(currentSection - 1)
      }
    }
  }
}

onMounted(() => {
  // 添加点击空白处隐藏下拉菜单的事件监听
  window.addEventListener('click', handleClickOutside)
  
  // 添加全屏滚动事件监听
  window.addEventListener('wheel', handleWheel, { passive: false })
  
  // 添加键盘事件监听
  window.addEventListener('keydown', (event) => {
    if (isScrolling) return
    
    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      event.preventDefault()
      if (currentSection < sections.length - 1) {
        scrollToSection(currentSection + 1)
      }
    } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault()
      if (currentSection > 0) {
        scrollToSection(currentSection - 1)
      }
    }
  })
})

onUnmounted(() => {
  // 清理事件监听器
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('keydown', () => {})
})
</script>

<style scoped>
/* 产品页面容器 */
.product-container {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  /* 添加滚动优化 */
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch; /* iOS滚动优化 */
  will-change: scroll-position; /* 优化滚动性能 */
  /* 确保容器可以扩展 */
  height: auto;
}

/* 导航栏样式 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100px; /* 1920*1080基准高度 */
  background: rgba(0, 0, 0, 0.6); /* 黑色60%透明度 */
  backdrop-filter: blur(10px);
  z-index: 1000;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  transform: translateY(0);
  opacity: 1;
}

/* 导航栏隐藏状态 */
.navbar-hidden {
  transform: translateY(-100%);
  opacity: 0;
}

.nav-content {
  max-width: 1920px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0;
}

.logo {
  position: absolute;
  left: 200px; /* 距离左侧200px */
}

.logo-img {
  width: 250px; /* 1920*1080下宽度250px */
  height: auto;
  filter: brightness(0) invert(1);
}

.nav-links {
  display: flex;
  gap: 3rem;
  position: absolute;
  left: 650px; /* 距离左侧650px */
}

.nav-link {
  text-decoration: none;
  color: #cccccc;
  font-weight: 400; /* 使用Regular字重 */
  font-size: 0.9rem;
  transition: color 0.3s ease;
  position: relative;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
}

.nav-link:hover {
  color: #01CE7E;
}

.nav-link.active {
  color: #01CE7E;
  font-weight: 600; /* 加粗选中的导航文字 */
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #01CE7E;
}

/* 下拉菜单样式 */
.nav-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 0.5rem 0;
  min-width: 160px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1002;
  margin-top: 10px;
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* 当显示二维码时，调整下拉框右侧圆角 */
.nav-dropdown:has(.qr-code-container.show) .dropdown-menu {
  border-radius: 8px 0 8px 0; /* 右侧无圆角，与二维码框拼接 */
}

.dropdown-item {
  padding: 0.75rem 1rem;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
  font-size: 0.9rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background: rgba(1, 206, 126, 0.2);
  color: #01CE7E;
}

/* 二维码容器样式 */
.qr-code-container {
  position: absolute;
  left: 100%; /* 定位在下拉菜单右侧 */
  top: 0; /* 与下拉菜单顶部对齐 */
  height: 100%; /* 与下拉菜单高度一致 */
  width: 160px; /* 与下拉菜单宽度一致 */
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 0 8px 8px 0; /* 左侧无圆角，与下拉菜单拼接 */
  padding: 0.5rem 0; /* 上下内边距与下拉菜单一致 */
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1002; /* 与下拉菜单同层级 */
  text-align: center;
  white-space: nowrap; /* 防止文字换行 */
  border-left: 1px solid rgba(255, 255, 255, 0.1); /* 添加分隔线 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.qr-code-container.show {
  opacity: 1;
  visibility: visible;
}

.qr-code-placeholder {
  width: 100px;
  height: 100px;
  background: #666666;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
  font-size: 12px;
  margin-bottom: 0.5rem;
}

.qr-code-title {
  color: #ffffff;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
  font-size: 11px;
  text-align: center;
  font-weight: 500;
}

.nav-right {
  position: absolute;
  right: 142px; /* 距离右侧142px */
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.lang-switch {
  color: #cccccc;
  cursor: pointer;
  transition: color 0.3s ease;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
  font-weight: 400;
  font-size: 16px;
}

.lang-switch:hover {
  color: #01CE7E;
}

.lang-switch.active {
  color: #01CE7E;
}

.lang-divider {
  color: #cccccc;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
  font-size: 16px;
}

/* 产品展示区域 */
.product-section {
  min-height: 100vh;
  background-image: url('/BG3.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.product-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
  width: 100%;
  height: 100vh;
  position: relative;
}

/* 产品标题 */
.product-header {
  position: absolute;
  top: 120px; /* 距离顶部120px，1920*1080基准 */
  left: 50%;
  transform: translateX(-50%);
}

.product-title {
  font-family: 'MiSans', sans-serif;
  font-weight: 600; /* semibold */
  font-size: 80px; /* 1920*1080基准 */
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
  letter-spacing: 8px;
}

.product-subtitle {
  font-family: 'MiSans', sans-serif;
  font-weight: 400; /* regular */
  font-size: 24px; /* 1920*1080基准 */
  color: #ffffff;
  margin: 10px 0 0 0;
  line-height: 1.2;
  letter-spacing: 2px;
}

/* 产品图片 */
.product-image-container {
  position: absolute;
  top: 55%; /* 向下移动到55% */
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100vw - 80px); /* 左右各留40px */
  max-width: 990px; /* 最大宽度990px，1920*1080基准 */
  height: calc(100vh - 350px - 80px); /* 减少标题区域高度，增加可用空间 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain; /* 保持图片比例 */
  transition: all 0.3s ease;
}

/* 视图切换按钮 */
.view-buttons {
  position: absolute;
  bottom: 80px; /* 距离底部80px，1920*1080基准 */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 100px; /* 按钮间距100px */
}

.view-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.6;
}

.view-btn:hover {
  opacity: 0.8;
  transform: scale(1.1);
}

.view-btn.active {
  opacity: 1;
  transform: scale(1.1);
}

.view-btn-img {
  width: 50px; /* 1920*1080基准宽度50px */
  height: 50px; /* 1920*1080基准高度50px */
  border-radius: 50%;
  transition: all 0.3s ease;
}

/* 滚动指示器 */
.scroll-indicator {
  position: absolute;
  bottom: 10px; /* 更靠近底部，1920*1080基准 */
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 1001;
  cursor: pointer;
  transition: transform 0.3s ease;
  padding: 15px; /* 增加点击区域 */
  min-width: 60px; /* 最小宽度 */
  min-height: 60px; /* 最小高度 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-indicator:hover {
  transform: translateX(-50%) scale(1.1);
}

.scroll-arrow-img {
  width: 30px;
  height: 28px;
  animation: floatArrow 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
  display: block;
  margin: 0 auto;
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.scroll-indicator:hover .scroll-arrow-img {
  opacity: 1;
}

/* 向上箭头旋转180度 */
.scroll-arrow-up {
  transform: rotate(180deg);
  animation: floatArrowUp 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
}

@keyframes floatArrow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

@keyframes floatArrowUp {
  0%, 100% {
    transform: rotate(180deg) translateY(0);
  }
  50% {
    transform: rotate(180deg) translateY(-12px);
  }
}

/* 响应式设计 */
@media (max-width: 1440px) {
  .navbar {
    height: 75px; /* 100px * 0.75 */
  }
  
  .logo {
    left: 150px; /* 200px * 0.75 */
  }
  
  .logo-img {
    width: 188px; /* 250px * 0.75 */
  }
  
  .nav-links {
    left: 488px; /* 650px * 0.75 */
  }
  
  .nav-right {
    right: 107px; /* 142px * 0.75 */
  }
  
  .product-header {
    top: 90px; /* 120px * 0.75 */
  }
  
  .product-title {
    font-size: 60px; /* 80px * 0.75 */
    letter-spacing: 6px; /* 8px * 0.75 */
  }
  
  .product-subtitle {
    font-size: 18px; /* 24px * 0.75 */
  }
  
  .product-image-container {
    width: calc(100vw - 60px); /* 左右各留30px，40px * 0.75 */
    height: calc(100vh - 263px - 60px); /* 减去标题和按钮区域高度，上下各留30px */
  }
  
  .view-buttons {
    bottom: 60px; /* 80px * 0.75 */
    gap: 75px; /* 100px * 0.75 */
  }
  
  .view-btn-img {
    width: 37.5px; /* 50px * 0.75 */
    height: 37.5px; /* 50px * 0.75 */
  }
  
  .scroll-indicator {
    bottom: 7.5px; /* 10px * 0.75 */
  }
  
  .scroll-arrow-img {
    width: 22.5px; /* 30px * 0.75 */
    height: 21px; /* 28px * 0.75 */
  }
}

@media (max-width: 1024px) {
  .navbar {
    height: 60px; /* 100px * 0.6 */
  }
  
  .logo {
    left: 120px; /* 200px * 0.6 */
  }
  
  .logo-img {
    width: 150px; /* 250px * 0.6 */
  }
  
  .nav-links {
    left: 390px; /* 650px * 0.6 */
    gap: 2rem;
  }
  
  .nav-right {
    right: 85px; /* 142px * 0.6 */
  }
  
  .product-header {
    top: 72px; /* 120px * 0.6 */
  }
  
  .product-title {
    font-size: 48px; /* 80px * 0.6 */
    letter-spacing: 5px; /* 8px * 0.6 */
  }
  
  .product-subtitle {
    font-size: 14px; /* 24px * 0.6 */
  }
  
  .product-image-container {
    width: calc(100vw - 48px); /* 左右各留24px，40px * 0.6 */
    height: calc(100vh - 210px - 48px); /* 减去标题和按钮区域高度，上下各留24px */
  }
  
  .view-buttons {
    bottom: 48px; /* 80px * 0.6 */
    gap: 60px; /* 100px * 0.6 */
  }
  
  .view-btn-img {
    width: 30px; /* 50px * 0.6 */
    height: 30px; /* 50px * 0.6 */
  }
  
  .scroll-indicator {
    bottom: 6px; /* 10px * 0.6 */
  }
  
  .scroll-arrow-img {
    width: 18px; /* 30px * 0.6 */
    height: 16.8px; /* 28px * 0.6 */
  }
}

@media (max-width: 768px) {
  .navbar {
    height: 50px; /* 100px * 0.5 */
  }
  
  .logo {
    left: 100px; /* 200px * 0.5 */
  }
  
  .logo-img {
    width: 100px; /* 移动端logo更小 */
  }
  
  .nav-links {
    display: none; /* 移动端隐藏导航菜单 */
  }
  
  .nav-right {
    right: 71px; /* 142px * 0.5 */
  }
  
  .product-header {
    top: 60px; /* 120px * 0.5 */
  }
  
  .product-title {
    font-size: 40px; /* 80px * 0.5 */
    letter-spacing: 4px; /* 8px * 0.5 */
  }
  
  .product-subtitle {
    font-size: 12px; /* 24px * 0.5 */
  }
  
  .product-image-container {
    width: calc(100vw - 40px); /* 左右各留20px，40px * 0.5 */
    height: calc(100vh - 175px - 40px); /* 减去标题和按钮区域高度，上下各留20px */
  }
  
  .view-buttons {
    bottom: 40px; /* 80px * 0.5 */
    gap: 50px; /* 100px * 0.5 */
  }
  
  .view-btn-img {
    width: 25px; /* 50px * 0.5 */
    height: 25px; /* 50px * 0.5 */
  }
  
  .scroll-indicator {
    bottom: 5px; /* 10px * 0.5 */
  }
  
  .scroll-arrow-img {
    width: 15px; /* 30px * 0.5 */
    height: 14px; /* 28px * 0.5 */
  }
}

@media (max-width: 480px) {
  .navbar {
    height: 40px; /* 100px * 0.4 */
  }
  
  .logo {
    left: 80px; /* 200px * 0.4 */
  }
  
  .logo-img {
    width: 80px; /* 小屏幕logo更小 */
  }
  
  .nav-links {
    display: none; /* 小屏幕隐藏导航菜单 */
  }
  
  .nav-right {
    right: 57px; /* 142px * 0.4 */
  }
  
  .product-header {
    top: 48px; /* 120px * 0.4 */
  }
  
  .product-title {
    font-size: 32px; /* 80px * 0.4 */
    letter-spacing: 3px; /* 8px * 0.4 */
  }
  
  .product-subtitle {
    font-size: 10px; /* 24px * 0.4 */
  }
  
  .product-image-container {
    width: calc(100vw - 32px); /* 左右各留16px，40px * 0.4 */
    height: calc(100vh - 140px - 32px); /* 减去标题和按钮区域高度，上下各留16px */
  }
  
  .view-buttons {
    bottom: 32px; /* 80px * 0.4 */
    gap: 40px; /* 100px * 0.4 */
  }
  
  .view-btn-img {
    width: 20px; /* 50px * 0.4 */
    height: 20px; /* 50px * 0.4 */
  }
  
  .scroll-indicator {
    bottom: 4px; /* 10px * 0.4 */
  }
  
  .scroll-arrow-img {
    width: 12px; /* 30px * 0.4 */
    height: 11.2px; /* 28px * 0.4 */
  }
}

/* 页脚样式 */
.footer {
  background: #000000;
  padding: 2rem 0 32px; /* 底部距离32px，1920*1080基准 */
  color: #ffffff;
}

.footer-container {
  max-width: 1920px; /* 使用1920px基准宽度 */
  margin: 0 auto;
  padding: 0;
  position: relative;
}

/* AXON LABS Logo - 左侧200px */
.footer-logo {
  position: absolute;
  left: 200px; /* 距离左侧200px，1920*1080基准 */
  top: 2rem;
}

.footer-logo-img {
  width: 250px; /* 1920*1080基准宽度 */
  height: auto;
}

/* 页脚内容 - 中部左对齐 */
.footer-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: left; /* 左对齐 */
  padding-left: 2rem;
  margin-left: 450px; /* logo宽度250px + 距离左侧200px = 450px，确保不重叠 */
  display: flex;
  flex-direction: column;
}

/* 社交媒体图标 */
.social-icons {
  display: flex;
  justify-content: flex-start; /* 左对齐 */
  gap: 1rem;
  margin-bottom: 15px; /* 图标距离下面文字15px，1920*1080基准 */
}

.social-icon {
  width: 24px; /* 调整为24px */
  height: 24px; /* 调整为24px */
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.social-icon:hover {
  transform: scale(1.1);
  opacity: 0.8;
}

/* 文字区域 */
.footer-text-area {
  height: 90px; /* 1920*1080基准下三行文字总高度90px */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.footer-links, .footer-contact, .footer-copyright {
  height: 30px; /* 每行高度30px */
  display: flex;
  align-items: center;
}

.footer-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.footer-link {
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
}

.footer-link:hover {
  color: #01CE7E;
}

.footer-divider {
  color: #666666;
  margin: 0 0.5rem;
}

.footer-contact {
  color: #cccccc;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
}

.footer-copyright {
  color: #999999;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 0; /* 移除padding，使用flex布局控制间距 */
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
}

/* 页脚响应式设计 */
@media (max-width: 1440px) {
  .footer {
    padding-bottom: 24px; /* 32px * 0.75 */
  }
  
  .footer-logo {
    left: 150px; /* 200px * 0.75 */
  }
  
  .footer-logo-img {
    width: 188px; /* 250px * 0.75 */
  }
  
  .footer-content {
    margin-left: 338px; /* 450px * 0.75 */
  }
  
  .social-icons {
    margin-bottom: 11px; /* 15px * 0.75 */
  }
  
  .social-icon {
    width: 18px; /* 24px * 0.75 */
    height: 18px; /* 24px * 0.75 */
  }
  
  .footer-text-area {
    height: 68px; /* 90px * 0.75 */
  }
  
  .footer-links, .footer-contact, .footer-copyright {
    height: 23px; /* 30px * 0.75 */
  }
}

@media (max-width: 1024px) {
  .footer {
    padding-bottom: 19px; /* 32px * 0.6 */
  }
  
  .footer-logo {
    left: 120px; /* 200px * 0.6 */
  }
  
  .footer-logo-img {
    width: 150px; /* 250px * 0.6 */
  }
  
  .footer-content {
    margin-left: 270px; /* 450px * 0.6 */
  }
  
  .social-icons {
    margin-bottom: 9px; /* 15px * 0.6 */
  }
  
  .social-icon {
    width: 14px; /* 24px * 0.6 */
    height: 14px; /* 24px * 0.6 */
  }
  
  .footer-text-area {
    height: 54px; /* 90px * 0.6 */
  }
  
  .footer-links, .footer-contact, .footer-copyright {
    height: 18px; /* 30px * 0.6 */
  }
}

@media (max-width: 768px) {
  .footer {
    padding-bottom: 16px; /* 32px * 0.5 */
  }
  
  .footer-logo {
    left: 100px; /* 200px * 0.5 */
  }
  
  .footer-logo-img {
    width: 125px; /* 250px * 0.5 */
  }
  
  .footer-content {
    margin-left: 225px; /* 450px * 0.5 */
  }
  
  .social-icons {
    margin-bottom: 8px; /* 15px * 0.5 */
  }
  
  .social-icon {
    width: 12px; /* 24px * 0.5 */
    height: 12px; /* 24px * 0.5 */
  }
  
  .footer-text-area {
    height: 45px; /* 90px * 0.5 */
  }
  
  .footer-links, .footer-contact, .footer-copyright {
    height: 15px; /* 30px * 0.5 */
  }
}

@media (max-width: 480px) {
  .footer {
    padding-bottom: 13px; /* 32px * 0.4 */
  }
  
  /* 页脚移动端适配 */
  .footer-logo {
    position: relative; /* 移动端改为相对定位 */
    left: 0;
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .footer-logo-img {
    width: 100px; /* 250px * 0.4 */
  }
  
  .footer-content {
    margin-left: 0; /* 移动端取消左边距 */
    text-align: center; /* 移动端居中对齐 */
  }
  
  .social-icons {
    justify-content: center; /* 移动端图标居中 */
    margin-bottom: 6px; /* 15px * 0.4 */
  }
  
  .social-icon {
    width: 10px; /* 24px * 0.4 */
    height: 10px; /* 24px * 0.4 */
  }
  
  .footer-links {
    justify-content: center; /* 移动端链接居中 */
  }
  
  .footer-text-area {
    height: 36px; /* 90px * 0.4 */
  }
  
  .footer-links, .footer-contact, .footer-copyright {
    height: 12px; /* 30px * 0.4 */
    justify-content: center; /* 移动端文字居中 */
  }
}
</style>
