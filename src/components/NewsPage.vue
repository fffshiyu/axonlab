<template>
  <div class="news-container">
    <!-- 导航栏 -->
    <nav class="navbar" :class="{ 'navbar-hidden': !isNavbarVisible }">
      <div class="nav-content">
        <div class="logo">
          <img src="/logo.svg" alt="AXON LABS" class="logo-img" />
        </div>
        <div class="nav-links">
          <router-link to="/home" class="nav-link">首页</router-link>
          <a href="#" class="nav-link active">新闻</a>
          <router-link to="/product" class="nav-link">产品系列</router-link>
          <div class="nav-dropdown" @mouseenter="showDropdown" @mouseleave="hideDropdown">
            <a href="#" class="nav-link" :class="{ 'active': isDropdownVisible }">线上商城</a>
            <div class="dropdown-menu" :class="{ 'show': isDropdownVisible }">
              <div class="dropdown-item" @click="showQRCode('tmall')">天猫商城</div>
              <div class="dropdown-item" @click="showQRCode('douyin')">抖音商城</div>
              <div class="dropdown-item" @click="showQRCode('jd')">京东商城</div>
              <div class="dropdown-item" @click="showQRCode('xiaochengxu')">小程序官方商城</div>
              <!-- 二维码显示区域 - 定位在下拉框右侧 -->
              <div class="qr-code-container" :class="{ 'show': isQRCodeVisible }">
                <div class="qr-code-placeholder">二维码</div>
                <div class="qr-code-title">{{ currentQRTitle }}</div>
              </div>
            </div>
          </div>
          <a href="#" class="nav-link">合作</a>
          <a href="#" class="nav-link">加入我们</a>
        </div>
        <!-- 语言切换 -->
        <div class="nav-right">
          <span class="lang-switch active">CN</span>
          <span class="lang-divider">|</span>
          <span class="lang-switch">EN</span>
        </div>
      </div>
    </nav>
    <!-- 第一个新闻轮播区域 -->
    <section class="news-section" id="news-intro-1">
      <div class="section-container">
        <div class="news-content">
          <!-- 轮播图上移 - 3D层次效果 -->
          <div class="carousel-container">
            <div class="carousel-3d-wrapper">
              <div 
                v-for="(image, index) in carouselImages1" 
                :key="index"
                class="carousel-3d-slide"
                :class="{
                  'slide-active': currentSlide1 === index,
                  'slide-prev': currentSlide1 === (index + 1) % carouselImages1.length,
                  'slide-next': currentSlide1 === (index - 1 + carouselImages1.length) % carouselImages1.length
                }"
                @click="setSlide1(index)">
                <div class="carousel-image" :style="{ backgroundColor: image.color }">
                  <span class="placeholder-text">{{ image.text }}</span>
                </div>
              </div>
            </div>
            <div class="carousel-dots">
              <span 
                v-for="(image, index) in carouselImages1" 
                :key="index"
                :class="['dot', { active: currentSlide1 === index }]"
                @click="setSlide1(index)">
              </span>
            </div>
          </div>
          
          <!-- 新闻标题和内容 -->
          <div class="news-text-content">
            <h3 class="news-title">AXON LABS发布全新AI智能硬件产品线</h3>
            <p class="news-description">
              北京玄圃科技有限公司今日正式发布AXON LABS羽山系列全新AI智能硬件产品，该产品线融合了最新的人工智能技术与创新硬件设计，旨在为用户提供更加智能、便捷的生活体验。新产品采用了先进的机器学习算法，能够自主学习用户习惯，提供个性化的智能服务。
            </p>
            <!-- 文字下方箭头 -->
            <div class="news-arrow" @click="scrollToSecondIntro">
              <img src="/箭头.png" alt="向下箭头" class="news-arrow-img" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 第二个新闻轮播区域 -->
    <section class="news-section" id="news-intro-2">
      <div class="section-container">
        <div class="news-content">
          <!-- 轮播图上移 - 3D层次效果 -->
          <div class="carousel-container">
            <div class="carousel-3d-wrapper">
              <div 
                v-for="(image, index) in carouselImages2" 
                :key="index"
                class="carousel-3d-slide"
                :class="{
                  'slide-active': currentSlide2 === index,
                  'slide-prev': currentSlide2 === (index + 1) % carouselImages2.length,
                  'slide-next': currentSlide2 === (index - 1 + carouselImages2.length) % carouselImages2.length
                }"
                @click="setSlide2(index)">
                <div class="carousel-image" :style="{ backgroundColor: image.color }">
                  <span class="placeholder-text">{{ image.text }}</span>
                </div>
              </div>
            </div>
            <div class="carousel-dots">
              <span 
                v-for="(image, index) in carouselImages2" 
                :key="index"
                :class="['dot', { active: currentSlide2 === index }]"
                @click="setSlide2(index)">
              </span>
            </div>
          </div>
          
          <!-- 新闻标题和内容 -->
          <div class="news-text-content">
            <h3 class="news-title">羽山机器人系列获得国际设计大奖</h3>
            <p class="news-description">
              AXON LABS羽山机器人系列在2024年国际智能硬件设计大赛中荣获金奖，该系列产品以其独特的情感交互设计和先进的AI技术获得了评委的一致好评。羽山机器人不仅具备强大的智能功能，更重要的是它能够理解和回应用户的情感需求，真正实现了"有温度的科技"这一设计理念。
            </p>
            <!-- 文字下方箭头 -->
            <div class="news-arrow" @click="scrollToTop">
              <img src="/箭头.png" alt="向上箭头" class="news-arrow-img news-arrow-up" />
            </div>
          </div>
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
            <img src="/logo/新浪.png" alt="微博" class="social-icon" />
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

// 轮播图数据和状态
const currentSlide1 = ref(0)
const currentSlide2 = ref(0)

const carouselImages1 = ref([
  { text: '新闻图片 1', color: '#8B9DC3' },
  { text: '新闻图片 2', color: '#DDB892' },
  { text: '新闻图片 3', color: '#A8DADC' }
])

const carouselImages2 = ref([
  { text: '品牌图片 1', color: '#F1FAEE' },
  { text: '品牌图片 2', color: '#E63946' },
  { text: '品牌图片 3', color: '#457B9D' }
])

// 轮播图控制函数
const setSlide1 = (index: number) => {
  currentSlide1.value = index
}

const setSlide2 = (index: number) => {
  currentSlide2.value = index
}

// 导航栏可见性
const isNavbarVisible = ref(true)

// 导航栏自动隐藏控制
const updateNavbarVisibility = () => {
  const currentScrollY = window.scrollY
  
  // 如果在页面顶部，始终显示导航栏
  if (currentScrollY < 100) {
    isNavbarVisible.value = true
  }
  // 其他情况由滚动方向控制（在handleWheel中处理）
}

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

// 全屏滚动功能 - 参考首页实现
let currentSection = 0
const sections = ['news-intro-1', 'news-intro-2', 'footer']
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

// 滚动到第二个介绍区域
const scrollToSecondIntro = () => {
  scrollToSection(1)
}

// 滚动到顶部
const scrollToTop = () => {
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

// 自动轮播函数
let autoSlideInterval1: number
let autoSlideInterval2: number

const startAutoSlide = () => {
  autoSlideInterval1 = setInterval(() => {
    currentSlide1.value = (currentSlide1.value + 1) % carouselImages1.value.length
  }, 4000)
  
  autoSlideInterval2 = setInterval(() => {
    currentSlide2.value = (currentSlide2.value + 1) % carouselImages2.value.length
  }, 4500) // 稍微错开时间
}

const stopAutoSlide = () => {
  if (autoSlideInterval1) clearInterval(autoSlideInterval1)
  if (autoSlideInterval2) clearInterval(autoSlideInterval2)
}

onMounted(() => {
  // 启动自动轮播
  startAutoSlide()
  
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
  // 清理自动轮播定时器
  stopAutoSlide()
})


</script>

<style scoped>
/* 新闻页面容器 */
.news-container {
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
  width: 160px; /* 固定宽度 */
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1002;
  margin-top: 10px;
}

/* 当显示二维码时，调整下拉框右侧圆角 */
.nav-dropdown:has(.qr-code-container.show) .dropdown-menu {
  border-radius: 8px 0 8px 8px; /* 右上角无圆角，与二维码框拼接 */
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
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
}



.section-container {
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  padding: 0;
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center; /* 完全居中 */
}

/* 新闻区域背景 */
.news-section {
  position: relative;
  background: url('/BG3.png') no-repeat center center;
  background-size: cover;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  height: 100vh;
  min-height: 100vh;
}

.news-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.news-section .section-container {
  position: relative;
  z-index: 2;
  justify-content: center;
  flex-direction: column; /* 垂直布局 */
}

/* 新闻内容容器 */
.news-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

/* 轮播图容器 - 紧凑布局 */
.carousel-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  width: 100%;
  margin-bottom: 1.5rem; /* 减少与下方文字的间距 */
}

/* 新闻文字内容 */
.news-text-content {
  text-align: center;
  max-width: 800px;
  color: #ffffff;
}

.news-title {
  font-size: 30px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.8rem; /* 减少下边距 */
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
  line-height: 1.4;
}

.news-description {
  font-size: 16px;
  font-weight: 400;
  color: #cccccc;
  line-height: 1.8;
  margin: 0 0 1.5rem 0; /* 下方添加边距为箭头留空间 */
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
}

/* 新闻文字下方箭头 */
.news-arrow {
  display: flex;
  justify-content: center;
  align-items: center;
}

.news-arrow-img {
  width: 30px;
  height: 28px;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.news-arrow-img:hover {
  opacity: 1;
}

.news-arrow-img.news-arrow-up {
  transform: rotate(180deg);
}

/* 3D轮播图包装器 */
.carousel-3d-wrapper {
  position: relative;
  width: 900px;
  height: 600px; /* 放大尺寸 */
  perspective: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 3D轮播图单张 */
.carousel-3d-slide {
  position: absolute;
  width: 600px;
  height: 450px; /* 放大滑块尺寸 */
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

/* 当前激活的图片 - 居中最前 */
.slide-active {
  transform: translateX(0) translateZ(0) scale(1);
  z-index: 3;
  opacity: 1;
}

/* 左边的图片 - 左后方 */
.slide-prev {
  transform: translateX(-270px) translateZ(-100px) rotateY(25deg) scale(0.8);
  z-index: 1;
  opacity: 0.7;
}

/* 右边的图片 - 右后方 */
.slide-next {
  transform: translateX(270px) translateZ(-100px) rotateY(-25deg) scale(0.8);
  z-index: 1;
  opacity: 0.7;
}

/* 其他隐藏的图片 */
.carousel-3d-slide:not(.slide-active):not(.slide-prev):not(.slide-next) {
  opacity: 0;
  transform: translateZ(-200px) scale(0.5);
  z-index: 0;
}

.carousel-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.placeholder-text {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
}

/* 轮播图指示器 - 紧凑布局 */
.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 1rem; /* 减少上边距 */
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: #01CE7E;
  transform: scale(1.2);
}

.dot:hover {
  background: rgba(1, 206, 126, 0.7);
  transform: scale(1.1);
}



/* 滚动指示器 */
.scroll-indicator {
  position: absolute;
  bottom: 49px;
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
}

@keyframes floatArrow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

/* 向上箭头的动画需要考虑旋转 */
.scroll-arrow-up {
  animation: floatArrowUp 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
}

@keyframes floatArrowUp {
  0%, 100% {
    transform: rotate(180deg) translateY(0);
  }
  50% {
    transform: rotate(180deg) translateY(-12px);
  }
}

/* 导航栏响应式设计 */
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
}

/* 响应式设计 */
@media (max-width: 1440px) {
  .carousel-3d-wrapper {
    width: 675px; /* 900px * 0.75 */
    height: 450px; /* 600px * 0.75 */
  }
  
  .carousel-3d-slide {
    width: 450px; /* 600px * 0.75 */
    height: 337px; /* 450px * 0.75 */
  }
  
  .slide-prev {
    transform: translateX(-202px) translateZ(-75px) rotateY(25deg) scale(0.8); /* -270px * 0.75 */
  }
  
  .slide-next {
    transform: translateX(202px) translateZ(-75px) rotateY(-25deg) scale(0.8); /* 270px * 0.75 */
  }
  

  
  .news-title {
    font-size: 22px; /* 30px * 0.75 */
  }
  
  .news-description {
    font-size: 14px; /* 16px * 0.75 */
  }
  
  .news-arrow-img {
    width: 22.5px; /* 30px * 0.75 */
    height: 21px; /* 28px * 0.75 */
  }
  
  .scroll-arrow-img {
    width: 22.5px; /* 30px * 0.75 */
    height: 21px; /* 28px * 0.75 */
  }
}

@media (max-width: 1024px) {
  .carousel-3d-wrapper {
    width: 540px; /* 900px * 0.6 */
    height: 360px; /* 600px * 0.6 */
  }
  
  .carousel-3d-slide {
    width: 360px; /* 600px * 0.6 */
    height: 270px; /* 450px * 0.6 */
  }
  
  .slide-prev {
    transform: translateX(-162px) translateZ(-60px) rotateY(25deg) scale(0.8); /* -270px * 0.6 */
  }
  
  .slide-next {
    transform: translateX(162px) translateZ(-60px) rotateY(-25deg) scale(0.8); /* 270px * 0.6 */
  }
  
  .carousel-dots {
    bottom: 48px; /* 80px * 0.6 */
  }
  
  .news-title {
    font-size: 18px; /* 30px * 0.6 */
  }
  
  .news-description {
    font-size: 12px; /* 16px * 0.6 */
  }
  
  .news-arrow-img {
    width: 18px; /* 30px * 0.6 */
    height: 16.8px; /* 28px * 0.6 */
  }
  
  .scroll-arrow-img {
    width: 18px; /* 30px * 0.6 */
    height: 16.8px; /* 28px * 0.6 */
  }
}

@media (max-width: 768px) {
  .carousel-3d-wrapper {
    width: 450px; /* 900px * 0.5 */
    height: 300px; /* 600px * 0.5 */
  }
  
  .carousel-3d-slide {
    width: 300px; /* 600px * 0.5 */
    height: 225px; /* 450px * 0.5 */
  }
  
  .slide-prev {
    transform: translateX(-135px) translateZ(-50px) rotateY(20deg) scale(0.8); /* -270px * 0.5 */
  }
  
  .slide-next {
    transform: translateX(135px) translateZ(-50px) rotateY(-20deg) scale(0.8); /* 270px * 0.5 */
  }
  
  .carousel-dots {
    bottom: 40px; /* 80px * 0.5 */
  }
  
  .news-title {
    font-size: 15px; /* 30px * 0.5 */
  }
  
  .news-description {
    font-size: 10px; /* 16px * 0.5 */
  }
  
  .news-arrow-img {
    width: 15px; /* 30px * 0.5 */
    height: 14px; /* 28px * 0.5 */
  }
  
  .scroll-arrow-img {
    width: 15px; /* 30px * 0.5 */
    height: 14px; /* 28px * 0.5 */
  }
}

@media (max-width: 480px) {
  .carousel-3d-wrapper {
    width: 360px; /* 900px * 0.4 */
    height: 240px; /* 600px * 0.4 */
  }
  
  .carousel-3d-slide {
    width: 240px; /* 600px * 0.4 */
    height: 180px; /* 450px * 0.4 */
  }
  
  .slide-prev {
    transform: translateX(-108px) translateZ(-40px) rotateY(15deg) scale(0.8); /* -270px * 0.4 */
  }
  
  .slide-next {
    transform: translateX(108px) translateZ(-40px) rotateY(-15deg) scale(0.8); /* 270px * 0.4 */
  }
  
  .carousel-dots {
    bottom: 32px; /* 80px * 0.4 */
  }
  
  .placeholder-text {
    font-size: 1rem;
  }
  
  .news-title {
    font-size: 12px; /* 30px * 0.4 */
    margin-bottom: 1rem;
  }
  
  .news-description {
    font-size: 8px; /* 16px * 0.4 */
    line-height: 1.6;
  }
  
  .carousel-container {
    margin-bottom: 2rem;
  }
  
  .news-arrow-img {
    width: 12px; /* 30px * 0.4 */
    height: 11.2px; /* 28px * 0.4 */
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
