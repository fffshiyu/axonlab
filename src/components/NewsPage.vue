<template>
  <div class="news-container">
    <!-- 导航栏 -->
    <Navbar active-page="news" />
    
    <!-- 新版新闻首屏（按图片设计） -->
    <section class="news-section" id="news-hero">
      <div class="section-container">
        <div class="news-hero-layout">
          <!-- 左侧主图与日期 -->
          <div class="hero-left">
            <button class="hero-arrow hero-arrow-left" @click="prevNews">
              <img src="/arrow_right.png" alt="上一张" class="arrow-icon arrow-icon-left" />
            </button>
            <div class="hero-image">
              <img :src="newsData[currentNewsIndex].image" alt="news" class="hero-img" />
              <div class="date-overlay">{{ newsData[currentNewsIndex].date }}</div>
              <!-- 轮播图切换点移到图片内部靠下 -->
              <div class="hero-dots">
                <span 
                  v-for="(_, index) in newsData" 
                  :key="index"
                  :class="['dot', { active: currentNewsIndex === index }]"
                  @click="goToNews(index)">
                </span>
              </div>
            </div>
            <button class="hero-arrow hero-arrow-right" @click="nextNews">
              <img src="/arrow_right.png" alt="下一张" class="arrow-icon" />
            </button>
          </div>

          <!-- 右侧文字内容 -->
          <div class="hero-right">
            <div class="right-text">
              <p>{{ newsData[currentNewsIndex].content }}</p>
            </div>
          </div>
        </div>

        <!-- 底部标题与按钮 -->
        <div class="news-bottom">
          <h3 class="news-bottom-title">LOOMI x 邱贻可产品即将发布</h3>
          <button class="learn-more-btn">Learn More</button>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-container">
        <!-- AXON LABS Logo - 左侧200px -->
        <div class="footer-logo">
          <img src="/logo.svg" alt="AXON LABS" class="footer-logo-img" />
        </div>
        
        <!-- 页脚主要内容 - 居中左对齐 -->
        <div class="footer-content">
          <!-- 社交媒体图标 -->
          <div class="social-icons">
            <a href="#" class="social-icon">
              <img src="/logo/weibo.png" alt="微博" />
            </a>
            <a href="#" class="social-icon">
              <img src="/logo/bilibil.png" alt="哔哩哔哩" />
            </a>
            <a href="#" class="social-icon">
              <img src="/logo/wechat.png" alt="微信" />
            </a>
            <a href="#" class="social-icon">
              <img src="/logo/redbook.png" alt="小红书" />
            </a>
            <a href="#" class="social-icon">
              <img src="/logo/ins.png" alt="Instagram" />
            </a>
            <a href="#" class="social-icon">
              <img src="/logo/facebook.png" alt="Facebook" />
            </a>
            <a href="#" class="social-icon">
              <img src="/logo/youtube.png" alt="YouTube" />
            </a>
          </div>
          
          <!-- 页脚文字区域 -->
          <div class="footer-text-area">
            <!-- 页脚链接 -->
            <div class="footer-links">
              <a href="#" class="footer-link">知识产权保护</a>
              <span class="separator">|</span>
              <a href="#" class="footer-link">隐私声明</a>
              <span class="separator">|</span>
              <a href="#" class="footer-link">ISO27001信息安全管理体系认证</a>
            </div>
            
            <!-- 联系信息 -->
            <div class="footer-contact">
              <p>互联网违法和不良信息举报邮箱   LD@axonlabs.com</p>
            </div>
            
            <!-- 版权信息 -->
            <div class="footer-copyright">
              <p>COPYRIGHT © AXON LABS 羽山 ALL RIGHTS RESERVED    |    京公网安备 XXXXXX号    |    京ICP备XXXXX    |    营业执照</p>
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

// 新闻数据
const newsData = ref([
  {
    image: '/news.png',
    date: '2025.10.24',
    title: 'AXON LABS发布全新AI智能硬件产品线',
    content: `北京玄圃科技有限公司今日正式发布AXON LABS羽山系列全新AI智能硬件产品，该产品线融合了最新的人工智能技术与创新硬件设计，旨在为用户提供更加智能、便捷的生活体验。新产品采用了先进的机器学习算法，能够自主学习用户习惯，提供个性化的智能服务。产品设计注重用户体验，简洁的外观搭配强大的功能，完美诠释了科技与美学的结合。`
  },
  {
    image: '/news.png',
    date: '2025.09.15',
    title: 'LOOMI x 邱晗可产品即将发布',
    content: `AXON LABS旗下智能生活品牌LOOMI宣布与知名设计师邱晗可展开深度合作，共同打造全新智能家居产品系列。此次合作将设计美学与智能科技完美融合，为用户带来前所未有的生活体验。邱晗可作为国际知名的工业设计师，曾获得多项设计大奖。此次与LOOMI的合作，她将其独特的设计理念融入智能产品中，打造出既美观又实用的智能家居解决方案。`
  },
  {
    image: '/news.png',
    date: '2025.08.08',
    title: 'AXON LABS荣获2025年度最佳创新企业奖',
    content: `在刚刚结束的2025年度科技创新峰会上，AXON LABS凭借其在人工智能和智能硬件领域的卓越表现，荣获"年度最佳创新企业"大奖。这是对公司长期以来坚持技术创新和产品研发的充分肯定。颁奖典礼上，评委会高度评价了AXON LABS在技术创新、产品设计、市场表现等方面的突出成就。公司研发的多项核心技术已获得国内外专利，产品远销海外多个国家和地区。`
  }
])

const currentNewsIndex = ref(0)

// 切换到上一条新闻
const prevNews = () => {
  currentNewsIndex.value = (currentNewsIndex.value - 1 + newsData.value.length) % newsData.value.length
}

// 切换到下一条新闻
const nextNews = () => {
  currentNewsIndex.value = (currentNewsIndex.value + 1) % newsData.value.length
}

// 切换到指定新闻
const goToNews = (index: number) => {
  currentNewsIndex.value = index
}

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

// 全屏滚动功能 - 参考首页实现
let currentSection = 0
const sections = ['news-hero', 'footer']
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

// 可选：滚动到顶部
const scrollToTop = () => scrollToSection(0)

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

// 初始化页面位置
const initializePagePosition = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  
  if (scrollTop < windowHeight * 0.1) {
    window.scrollTo({ top: 0, behavior: 'auto' })
    currentSection = 0
  } else {
    const nearestSection = Math.round(scrollTop / windowHeight)
    if (nearestSection < sections.length) {
      scrollToSection(nearestSection)
    }
  }
}

onMounted(() => {
  // 添加点击空白处隐藏下拉菜单的事件监听
  window.addEventListener('click', handleClickOutside)
  
  // 初始化页面位置
  initializePagePosition()
  
  // 添加全屏滚动事件监听
  window.addEventListener('wheel', handleWheel, { passive: false })
  
  // 添加窗口大小变化监听，重新对齐页面
  window.addEventListener('resize', () => {
    setTimeout(() => {
      initializePagePosition()
    }, 200)
  })
  
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
  background: url('/news_bg.png') no-repeat center center;
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
  justify-content: flex-start;
  flex-direction: column; /* 垂直布局 */
  padding-top: 140px; /* 从120px增加到140px，内容下移 */
}

/* 新闻内容容器 */
.news-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

/* 新版首屏布局 */
.news-hero-layout {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center; /* 让图片居中 */
  width: 100%;
}

.hero-left {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-right {
  position: absolute;
  left: 50%;
  bottom: 0; /* 底部对齐 */
  margin-left: 470px; /* 图片宽度的一半(450px) + 间隔20px */
  color: #fff;
  max-width: 240px; /* 从320px继续缩小到240px */
  width: 100%;
}

.hero-image {
  position: relative;
  width: 900px; /* 放大图片尺寸 */
  height: 600px; /* 保持3:2比例 */
  border-radius: 12px;
  overflow: hidden;
  transition: opacity 0.3s ease;
  margin: 0; /* 移除auto，让flex布局控制居中 */
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6);
  transition: opacity 0.3s ease;
}

.date-overlay {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 64px;
  font-weight: 400; /* 改细，从700改为400 */
  /* 使用首页的绿色渐变 */
  background: linear-gradient(to right, #01CE7E, #016840);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 2px;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
}

.hero-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 32px; /* 固定宽度 */
  height: 32px; /* 固定高度 */
  border-radius: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  z-index: 3;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  flex-shrink: 0; /* 防止缩小 */
}

.arrow-icon {
  width: 32px; /* 固定宽度 */
  height: 32px; /* 固定高度 */
  object-fit: contain;
  transition: all 0.3s ease;
  display: block;
}

.arrow-icon-left {
  transform: rotate(180deg); /* 左箭头旋转180度 */
}

.hero-arrow:hover .arrow-icon {
  transform: scale(1.2); /* 悬停时放大 */
}

.hero-arrow:hover .arrow-icon-left {
  transform: rotate(180deg) scale(1.2); /* 左箭头悬停时保持旋转并放大 */
}

.hero-arrow-left { left: 16px; } /* 距离左边16px */
.hero-arrow-right { right: 16px; } /* 距离右边16px */

.hero-dots {
  position: absolute;
  bottom: 24px; /* 距离图片底部24px */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 2; /* 确保在图片上方 */
}

.hero-dots .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255,255,255,0.4);
  cursor: pointer;
  transition: all 0.3s ease;
}

/* 中间的圆点显示为圆角矩形 */
.hero-dots .dot:nth-child(2) {
  width: 24px;
  height: 10px;
  border-radius: 5px;
}

.hero-dots .dot:hover {
  background: rgba(1, 206, 126, 0.7);
  transform: scale(1.2);
}

.hero-dots .dot.active { 
  background: #01CE7E;
  transform: scale(1.3);
}

/* 中间圆角矩形激活时不放大太多 */
.hero-dots .dot:nth-child(2).active {
  transform: scale(1.1);
}

.right-text {
  max-height: 600px; /* 与图片高度一致 */
  overflow-y: auto;
  line-height: 1.9;
  color: #d0d0d0;
  padding-right: 8px;
  font-size: 14px; /* 从16px缩小到14px */
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
  text-align: left;
}

.right-text p {
  margin-bottom: 16px;
  text-align: justify;
}

.right-text p:last-child {
  margin-bottom: 0;
}

/* 自定义滚动条样式 */
.right-text::-webkit-scrollbar {
  width: 6px;
}

.right-text::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.right-text::-webkit-scrollbar-thumb {
  background: rgba(1, 206, 126, 0.5);
  border-radius: 3px;
}

.right-text::-webkit-scrollbar-thumb:hover {
  background: rgba(1, 206, 126, 0.8);
}

.news-bottom {
  margin-top: 28px;
  text-align: center;
}

.news-bottom-title {
  color: #fff;
  font-size: 20px;
  margin-bottom: 12px;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
  font-weight: 400; /* Demibold */
}

.learn-more-btn {
  position: relative;
  background: transparent;
  border: 2px solid #ffffff;
  color: #ffffff;
  padding: 0.8rem 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: 1;
  border-radius: 4px;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
}

.learn-more-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: rgba(1, 206, 126, 0.5); /* 50%透明度的#01CE7E */
  transition: width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: -1;
}

.learn-more-btn:hover::before {
  width: 100%;
}

.learn-more-btn:active::before {
  transition: width 0.1s ease;
}

.learn-more-btn:hover {
  color: #ffffff;
  border-color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(1, 206, 126, 0.3);
}

.learn-more-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(1, 206, 126, 0.2);
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
  animation: floatArrow 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
  display: block;
  margin: 0 auto;
  opacity: 0.3; /* 默认透明度较高 */
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.news-arrow-img:hover {
  opacity: 1; /* 悬停时完全不透明 */
}

.news-arrow-img.news-arrow-up {
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

/* 向上箭头的浮动动画需要结合旋转 */
.news-arrow-img.news-arrow-up {
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
  margin-top: 0.5rem; /* 进一步减少上边距，往上移动 */
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
  .hero-image {
    width: 675px; /* 900px * 0.75 */
    height: 450px; /* 600px * 0.75 */
  }
  
  .hero-right {
    margin-left: 352.5px; /* 675px / 2 + 15px间隔 */
    max-width: 180px; /* 240px * 0.75 */
  }
  
  .right-text {
    max-height: 450px; /* 600px * 0.75 */
  }
}

@media (max-width: 1024px) {
  .hero-image {
    width: 540px; /* 900px * 0.6 */
    height: 360px; /* 600px * 0.6 */
  }
  
  .hero-right {
    margin-left: 282px; /* 540px / 2 + 12px间隔 */
    max-width: 144px; /* 240px * 0.6 */
  }
  
  .right-text {
    max-height: 360px; /* 600px * 0.6 */
  }
}

@media (max-width: 768px) {
  .hero-image {
    width: 450px; /* 900px * 0.5 */
    height: 300px; /* 600px * 0.5 */
  }
  
  .hero-right {
    margin-left: 235px; /* 450px / 2 + 10px间隔 */
    max-width: 120px; /* 240px * 0.5 */
  }
  
  .right-text {
    max-height: 300px; /* 600px * 0.5 */
  }
}

@media (max-width: 480px) {
  .hero-image {
    width: 360px; /* 900px * 0.4 */
    height: 240px; /* 600px * 0.4 */
  }
  
  .hero-right {
    margin-left: 188px; /* 360px / 2 + 8px间隔 */
    max-width: 96px; /* 240px * 0.4 */
  }
  
  .right-text {
    max-height: 240px; /* 600px * 0.4 */
  }
}

/* 页脚样式 */
.footer {
  background: #000000;
  height: 200px; /* 1920*1080基准高度200px */
  padding: 40px 0; /* 上下各40px内边距 */
  color: #ffffff;
  box-sizing: border-box;
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
  top: 40px; /* 距离顶部40px */
}

.footer-logo-img {
  width: 250px; /* 1920*1080基准宽度 */
  height: auto;
  filter: brightness(0) invert(1);
}

/* 页脚主要内容区域 - 居中左对齐 */
.footer-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: left; /* 左对齐 */
  padding-left: 2rem;
  margin-left: 550px; /* logo位置200px + logo宽度250px + 间距100px = 550px */
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
  display: inline-block;
  width: 24px; /* 调整为24px */
  height: 24px; /* 调整为24px */
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.social-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.social-icon:hover {
  transform: scale(1.1);
  opacity: 0.8;
}

/* 页脚文字区域 */
.footer-text-area {
  height: 90px; /* 1920*1080基准下三行文字总高度90px */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* 页脚链接 */
.footer-links {
  display: flex;
  justify-content: flex-start; /* 左对齐 */
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 16px; /* 统一16px字体大小 */
  height: 24px; /* 第一行高度24px */
}

.footer-link {
  color: #ffffff; /* 第一行纯白色 */
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #01CE7E;
}

.separator {
  color: #ffffff; /* 第一行分隔符也是纯白色 */
  margin: 0 0.25rem;
}

/* 联系信息 */
.footer-contact {
  height: 24px; /* 第二行高度24px */
  display: flex;
  align-items: center;
}

.footer-contact p {
  color: #9E9E9E; /* 第二行颜色#9E9E9E */
  font-size: 16px; /* 统一16px字体大小 */
  margin: 0;
  text-align: left; /* 左对齐 */
}

/* 版权信息 */
.footer-copyright {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  height: 24px; /* 第三行高度24px */
  display: flex;
  align-items: center;
}

.footer-copyright p {
  color: #9E9E9E; /* 第三行颜色#9E9E9E */
  font-size: 16px; /* 统一16px字体大小 */
  margin: 0;
  line-height: 1.4;
  text-align: left; /* 左对齐 */
  white-space: nowrap; /* 营业执照不换行 */
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
