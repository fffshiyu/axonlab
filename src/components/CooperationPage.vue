<template>
  <div class="cooperation-container">
    <!-- 导航栏 -->
    <Navbar active-page="cooperation" />

    <!-- 主要内容 -->
    <main class="main-content">
      <!-- 业务联系部分 -->
      <section class="business-section" id="business-contacts">
        <div class="section-container">
          <div class="scale-wrapper">
            <h1 class="main-title">BUSINESS CONTACTS</h1>
            <h2 class="main-subtitle">业务联系</h2>

            <div class="contacts-grid">
            <!-- 商务合作 -->
            <div class="contact-card">
              <div class="contact-info">
                <h3 class="contact-title">BUSINESS COOPERATION <span class="contact-title-cn">| 商业合作</span></h3>
                <p class="contact-desc">{{ currentLanguage === 'zh' ? '欢迎国内外知名IP及渠道方与我们联系，展开交流与探讨。' : 'We welcome renowned IPs and channel partners from home and abroad to contact us for communication and discussion.' }}</p>
                
                <div class="contact-details">
                  <p class="contact-item"><span class="label">{{ currentLanguage === 'zh' ? '联系人：' : 'Contact: ' }}</span>{{ currentLanguage === 'zh' ? '芮先生' : 'Mr. Rui' }}</p>
                  <p class="contact-item"><span class="label">{{ currentLanguage === 'zh' ? '企业邮箱：' : 'Email: ' }}</span>bd@axonlabs.com</p>
                  <p class="contact-item"><span class="label">{{ currentLanguage === 'zh' ? '联系电话：' : 'Phone: ' }}</span>18301200484</p>
                </div>
              </div>
              
              <div class="qr-code-box">
                <img src="/BizQR1.png" alt="商务合作二维码" class="qr-image" />
              </div>
            </div>
            
            <!-- 品牌联系 -->
            <div class="contact-card">
              <div class="contact-info">
                <h3 class="contact-title">BRAND COOPERATION <span class="contact-title-cn">| 媒体联系</span></h3>
                <p class="contact-desc">{{ currentLanguage === 'zh' ? '欢迎国内外各类媒体与我们联系，展开交流与探讨。' : 'We welcome media partners from home and abroad to contact us for communication and discussion.' }}</p>
                
                <div class="contact-details">
                  <p class="contact-item"><span class="label">{{ currentLanguage === 'zh' ? '联系人：' : 'Contact: ' }}</span>{{ currentLanguage === 'zh' ? '陈小姐' : 'Ms. Chen' }}</p>
                  <p class="contact-item"><span class="label">{{ currentLanguage === 'zh' ? '企业邮箱：' : 'Email: ' }}</span>mrkt@axonlabs.com</p>
                  <p class="contact-item"><span class="label">{{ currentLanguage === 'zh' ? '联系电话：' : 'Phone: ' }}</span>13986329545</p>
                </div>
              </div>
              
              <div class="qr-code-box">
                <img src="/BizQR2.png" alt="品牌合作二维码" class="qr-image" />
              </div>
            </div>
            </div>
          </div>
        </div>
        
        <!-- 滚动指示器 -->
        <div class="scroll-indicator" @click="scrollToCobranding">
          <img src="/arrow.webp" :alt="currentLanguage === 'zh' ? '向下箭头' : 'Scroll Down'" class="scroll-arrow-img" />
        </div>
      </section>

      <!-- 品牌合作部分（第二幅不显示V箭头） -->
      <section class="cobranding-section" id="co-branding">
        <div class="section-container">
          <div class="scale-wrapper">
            <h1 class="main-title">CO-BRANDING</h1>
            <h2 class="main-subtitle">品牌合作</h2>

            <div class="brands-grid">
            <!-- 第一行：4个品牌logo -->
            <div class="brand-item">
              <img src="/logo1.webp" alt="合作品牌" class="brand-logo" />
            </div>
            <div class="brand-item">
              <img src="/logo2.webp" alt="合作品牌" class="brand-logo" />
            </div>
            <div class="brand-item">
              <img src="/logo3.webp" alt="合作品牌" class="brand-logo" />
            </div>
            <div class="brand-item">
              <img src="/iplogo.webp" alt="合作品牌" class="brand-logo placeholder" />
            </div>
            
            <!-- 第二行：4个占位logo -->
            <div class="brand-item">
              <img src="/iplogo.webp" alt="合作品牌" class="brand-logo placeholder" />
            </div>
            <div class="brand-item">
              <img src="/iplogo.webp" alt="合作品牌" class="brand-logo placeholder" />
            </div>
            <div class="brand-item">
              <img src="/iplogo.webp" alt="合作品牌" class="brand-logo placeholder" />
            </div>
            <div class="brand-item">
              <img src="/iplogo.webp" alt="合作品牌" class="brand-logo placeholder" />
            </div>
            
            <!-- 第三行：4个占位logo -->
            <div class="brand-item">
              <img src="/iplogo.webp" alt="合作品牌" class="brand-logo placeholder" />
            </div>
            <div class="brand-item">
              <img src="/iplogo.webp" alt="合作品牌" class="brand-logo placeholder" />
            </div>
            <div class="brand-item">
              <img src="/iplogo.webp" alt="合作品牌" class="brand-logo placeholder" />
            </div>
            <div class="brand-item">
              <img src="/iplogo.webp" alt="合作品牌" class="brand-logo placeholder" />
            </div>
            </div>

            <button class="learn-more-btn">{{ currentLanguage === 'zh' ? '了解更多' : 'Learn More' }}</button>
          </div>
        </div>
        
        <!-- 第二幅不显示下箭头 -->
      </section>
    </main>

    <!-- 页脚 -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
import { useLanguage } from '../composables/useLanguage'

const { currentLanguage } = useLanguage()

// 下拉菜单控制
const isDropdownVisible = ref(false)
const isQRCodeVisible = ref(false)
const currentQRTitle = ref('')

const showDropdown = () => {
  isDropdownVisible.value = true
}

const hideDropdown = () => {
  setTimeout(() => {
    // 延迟隐藏
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
  isDropdownVisible.value = true
}

// 点击空白处隐藏下拉菜单
const handleClickOutside = (event: Event) => {
  const dropdown = document.querySelector('.nav-dropdown')
  if (dropdown && !dropdown.contains(event.target as Node)) {
    isDropdownVisible.value = false
    isQRCodeVisible.value = false
  }
}

// 导航栏自动隐藏控制
const isNavbarVisible = ref(true)
let lastScrollTop = 0
const scrollThreshold = 50

const updateNavbarVisibility = () => {
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop
  
  if (Math.abs(currentScrollTop - lastScrollTop) < scrollThreshold) {
    return
  }
  
  if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
    // 向下滚动，隐藏导航栏
    isNavbarVisible.value = false
  } else {
    // 向上滚动，显示导航栏
    isNavbarVisible.value = true
  }
  
  lastScrollTop = currentScrollTop
}

// 全屏滚动控制
const currentSection = ref(0)
const sections = ['business-contacts', 'co-branding', 'footer']
let isScrolling = false
let lastScrollTime = 0

// 检测当前在哪个区域
const getCurrentSection = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  
  // 计算每个区域的精确位置
  for (let i = 0; i < sections.length; i++) {
    const element = document.getElementById(sections[i])
    if (element) {
      const rect = element.getBoundingClientRect()
      const elementTop = rect.top + scrollTop
      const elementBottom = elementTop + element.offsetHeight
      
      // 特殊处理页脚区域
      if (i === sections.length - 1) { // footer
        if (scrollTop >= elementTop - windowHeight * 0.5) {
          return i
        }
      } else {
        // 如果当前滚动位置在这个区域范围内
        if (scrollTop >= elementTop - windowHeight * 0.3 && 
            scrollTop < elementBottom - windowHeight * 0.7) {
          return i
        }
      }
    }
  }
  
  // 如果没有匹配的区域，返回最接近的
  if (scrollTop < windowHeight * 0.5) return 0
  
  return Math.min(Math.round(scrollTop / windowHeight), sections.length - 1)
}

const scrollToSection = (index: number) => {
  if (index < 0 || index >= sections.length || isScrolling) return
  
  const section = document.getElementById(sections[index])
  if (section) {
    isScrolling = true
    lastScrollTime = Date.now()
    
    requestAnimationFrame(() => {
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    })
    
    currentSection.value = index
    
    setTimeout(() => {
      isScrolling = false
    }, 800) // 与首页一致
  }
}

const handleWheel = (event: WheelEvent) => {
  if (isScrolling) return
  
  const now = Date.now()
  const timeSinceLastScroll = now - lastScrollTime
  
  if (timeSinceLastScroll < 50) return
  
  // 检查当前是否在页脚区域
  const currentSectionIndex = getCurrentSection()
  const isInFooter = currentSectionIndex === sections.length - 1
  
  // 如果在页脚区域，允许正常滚动
  if (isInFooter) {
    // 更新导航栏可见性
    updateNavbarVisibility()
    return
  }
  
  // 对于其他区域，使用全屏翻页
  event.preventDefault()
  
  const scrollDelta = Math.abs(event.deltaY)
  
  if (scrollDelta >= 30 && timeSinceLastScroll >= 300) { // 与首页一致
    const current = getCurrentSection()
    lastScrollTime = now
    
    if (event.deltaY > 0) {
      // 向下滚动
      if (current < sections.length - 1) {
        scrollToSection(current + 1)
      }
    } else {
      // 向上滚动
      if (current > 0) {
        scrollToSection(current - 1)
      }
    }
  }
  
  // 更新导航栏可见性
  updateNavbarVisibility()
}

// 初始化页面位置
const initializePagePosition = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  
  if (scrollTop < windowHeight * 0.1) {
    window.scrollTo({ top: 0, behavior: 'auto' })
    currentSection.value = 0
  } else {
    const nearestSection = Math.round(scrollTop / windowHeight)
    if (nearestSection < sections.length) {
      scrollToSection(nearestSection)
    }
  }
}

// 滚动到品牌合作区域
const scrollToCobranding = () => {
  scrollToSection(1)
}

// 滚动到页脚
const scrollToFooter = () => {
  scrollToSection(2)
}

onMounted(() => {
  // 初始化页面位置
  initializePagePosition()
  
  // 添加全屏滚动事件监听
  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', updateNavbarVisibility)
  
  // 添加窗口大小变化监听，重新对齐页面
  window.addEventListener('resize', () => {
    setTimeout(() => {
      initializePagePosition()
    }, 200)
  })
  
  // 初始化当前section
  currentSection.value = getCurrentSection()
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', updateNavbarVisibility)
})
</script>

<style scoped>
@font-face {
  font-family: 'MiSans-Demibold';
  src: url('/fonts/MiSans-Demibold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'MiSans-Regular';
  src: url('/fonts/MiSans-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.cooperation-container {
  width: 100%;
  min-height: 100vh;
  background: #000000;
  color: #ffffff;
  overflow-x: hidden;
  /* 导航高度变量，供各区计算可视高度 */
  --nav-h: 100px;
}

/* 导航栏 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar-hidden {
  transform: translateY(-100%);
}

.nav-content {
  width: 100%;
  max-width: 1920px;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  position: relative;
}

.logo {
  position: absolute;
  left: 200px;
}

.logo-img {
  width: 250px;
  height: auto;
  filter: brightness(0) invert(1);
}

.nav-links {
  display: flex;
  gap: 3rem;
  position: absolute;
  left: 650px;
}

.nav-link {
  text-decoration: none;
  color: #cccccc;
  font-weight: 400;
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
  font-weight: 600;
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
  width: 160px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1002;
  margin-top: 10px;
}

.nav-dropdown:has(.qr-code-container.show) .dropdown-menu {
  border-radius: 8px 0 8px 0;
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

.qr-code-container {
  position: absolute;
  left: 100%;
  top: 0;
  height: 100%;
  width: 160px;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 0 8px 8px 0;
  padding: 0.5rem 0;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1002;
  text-align: center;
  white-space: nowrap;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
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
  right: 142px;
}

.nav-language {
  color: #cccccc;
  font-size: 16px;
  font-weight: 400;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
}

.active-lang {
  color: #01CE7E;
}

/* 主要内容 */
.main-content {
  padding-top: var(--nav-h);
}

/* 业务联系部分 */
.business-section {
  height: calc(100vh - var(--nav-h));
  background: url('/hz_bg1.webp') no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0; /* 避免因padding使箭头被挤出视口 */
}

/* 第一屏整体上移一点，让视觉更靠上 */
.business-section .section-container {
  transform: translateY(-5vh);
}

.section-container {
  max-width: 1400px;
  width: 100%;
  padding: 0 clamp(16px, 4vw, 4rem);
  text-align: center;
}

.main-title {
  font-size: clamp(28px, 4.2vw, 56px);
  font-weight: 600;
  background: linear-gradient(to right, #01CE7E, #016840);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 4px; /* 减小与中文标题的间距 */
  font-family: 'MiSans-Demibold', 'MiSans', 'Noto Sans SC', sans-serif;
  letter-spacing: 2px;
}

.main-subtitle {
  font-size: clamp(16px, 2.1vw, 30px);
  font-weight: 400;
  color: #ffffff;
  /* 进一步收紧副标题与内容的垂直间距 */
  margin-bottom: clamp(8px, 1.3vw, 16px);
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
}

/* 自适应整体缩放容器（以1920x1080为视觉基准） */
.scale-wrapper {
  transform-origin: top center;
  width: 100%;
  margin: 0 auto;
  /* 移除整体缩放，按实际屏幕尺寸自适应 */
  transform: none;
}

.contacts-grid {
  display: grid;
  grid-template-columns: 1fr;
  /* 增加两个块之间的间距 */
  gap: clamp(32px, 4vw, 64px);
  max-width: 820px; /* 向中间靠拢 */
  margin: 0 auto;
}

.contact-card {
  /* 去除半透明背景与边框，改为纯内容布局 */
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  display: flex;
  justify-content: center; /* 两列向中靠拢 */
  align-items: center;
  gap: clamp(6px, 1vw, 12px);
}

.contact-info {
  flex: 0 1 56%; /* 略收窄文本列，让整体靠中 */
  text-align: left;
}

.contact-title {
  font-size: clamp(15px, 1.3vw, 18px);
  font-weight: 600;
  color: #ffffff;
  margin-bottom: clamp(8px, 1.2vw, 16px);
  font-family: 'MiSans-Demibold', 'MiSans', 'Noto Sans SC', sans-serif;
}

.contact-title-cn {
  font-weight: 400;
  color: #cccccc;
}

.contact-desc {
  font-size: clamp(12px, 1.1vw, 13px);
  color: #cccccc;
  line-height: 1.7;
  margin-bottom: clamp(4px, 1vw, 10px);
  font-family: 'MiSans-Regular', 'MiSans', 'Noto Sans SC', sans-serif;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: clamp(2px, 0.6vw, 6px);
}

.contact-item {
  font-size: clamp(12px, 1.1vw, 13px);
  color: #ffffff;
  font-family: 'MiSans-Regular', 'MiSans', 'Noto Sans SC', sans-serif;
}

.contact-item .label {
  color: #999999;
}

.qr-code-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(4px, 0.8vw, 8px);
}

.qr-image {
  width: clamp(90px, 8.5vw, 140px);
  height: clamp(90px, 8.5vw, 140px);
  object-fit: contain;
}

.qr-label {
  font-size: clamp(12px, 1.2vw, 14px);
  color: #cccccc;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
}

/* 品牌合作部分 */
.cobranding-section {
  min-height: 100vh; /* 至少占满整个屏幕 */
  height: 100vh; /* 固定为整个屏幕高度 */
  background: url('/hz_bg2.webp') no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0;
  box-sizing: border-box; /* 确保padding不会增加总高度 */
}

.brands-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 43px 40px; /* 上下间隔43px，左右间隔40px */
  max-width: 900px;
  margin: 0 auto clamp(8px, 2vw, 20px);
}

.brand-item {
  /* 去除卡片半透明背景与边框，只保留Logo本身 */
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0; /* 移除padding，间距由grid gap控制 */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  min-height: 0; /* 移除最小高度限制 */
}

.brand-item:hover {
  transform: translateY(-5px);
}

.brand-logo {
  width: 178px; /* 固定宽度178px */
  height: 100px; /* 固定高度100px */
  object-fit: contain;
}

.brand-logo.placeholder {
  opacity: 0.5;
}

/* Learn More按钮 */
.learn-more-btn {
  margin-top: 44px; /* 与上面logo墙距离44px */
  padding: 0.8rem 2rem; /* 与首页统一 */
  background: transparent;
  color: #ffffff;
  border: 2px solid #ffffff; /* 增加边框粗细 */
  cursor: pointer;
  font-size: 0.9rem; /* 与首页统一 */
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  border-radius: 4px;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
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
  color: #ffffff; /* 保持文字为白色 */
  border-color: #ffffff; /* 保持边框为白色 */
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(1, 206, 126, 0.3);
}

.learn-more-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(1, 206, 126, 0.2);
}

/* 滚动指示器 */
.scroll-indicator {
  position: absolute;
  bottom: 20px; /* 更贴近底部 */
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 1001;
  cursor: pointer;
  transition: transform 0.3s ease;
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
  opacity: 0.3; /* 默认更柔和 */
  transition: opacity 0.3s ease;
}

.scroll-indicator:hover .scroll-arrow-img {
  opacity: 1;
}

@keyframes floatArrow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}


/* 响应式设计 */
@media (max-width: 1440px) {
  .cooperation-container {
    --nav-h: 75px;
  }
  .navbar {
    height: 75px;
  }
  
  .main-content {
    padding-top: 75px;
  }
  
  .logo {
    left: 150px;
  }
  
  .logo-img {
    width: 188px;
  }
  
  .nav-links {
    left: 488px;
  }
  
  .nav-right {
    right: 107px;
  }
  
  .main-title {
    font-size: 48px;
  }
  
  .main-subtitle {
    font-size: 28px;
    margin-bottom: 60px;
  }
  
  .contacts-grid {
    gap: 45px;
  }
  
  .contact-card {
    padding: 30px;
  }
  
  .brands-grid {
    gap: 30px;
  }
  
}

@media (max-width: 1024px) {
  .cooperation-container {
    --nav-h: 60px;
  }
  .navbar {
    height: 60px;
  }
  
  .main-content {
    padding-top: 60px;
  }
  
  .logo {
    left: 120px;
  }
  
  .logo-img {
    width: 150px;
  }
  
  .nav-links {
    left: 390px;
    gap: 2rem;
  }
  
  .nav-right {
    right: 85px;
  }
  
  .main-title {
    font-size: 40px;
  }
  
  .main-subtitle {
    font-size: 24px;
    margin-bottom: 48px;
  }
  
  .contacts-grid {
    gap: 36px;
  }
  
  .contact-card {
    padding: 24px;
    flex-direction: column;
  }
  
  .brands-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  
}

@media (max-width: 768px) {
  .cooperation-container {
    --nav-h: 80px;
  }
  
  .navbar {
    height: 80px;
  }
  
  .main-content {
    padding-top: 80px;
  }
  
  /* 业务联系部分移动端优化 */
  .business-section {
    height: auto;
    min-height: 100vh;
    padding: 2rem 0;
  }
  
  .business-section .section-container {
    transform: none;
    padding-top: 2rem;
  }
  
  .section-container {
    padding: 0 1.5rem;
  }
  
  .main-title {
    font-size: 28px;
    margin-bottom: 8px;
  }
  
  .main-subtitle {
    font-size: 18px;
    margin-bottom: 1.5rem;
  }
  
  .contacts-grid {
    gap: 2.5rem;
    max-width: 100%;
  }
  
  .contact-card {
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 12px;
  }
  
  .contact-info {
    flex: 1;
    width: 100%;
    text-align: center;
  }
  
  .contact-title {
    font-size: 14px;
    margin-bottom: 0.8rem;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .contact-title-cn {
    font-size: 13px;
  }
  
  .contact-desc {
    font-size: 13px;
    line-height: 1.6;
    margin-bottom: 0.8rem;
    text-align: center;
  }
  
  .contact-details {
    gap: 0.5rem;
    align-items: center;
  }
  
  .contact-item {
    font-size: 13px;
    text-align: center;
  }
  
  .qr-code-box {
    width: 100%;
    padding: 1rem 0;
  }
  
  .qr-image {
    width: 140px;
    height: 140px;
  }
  
  .qr-label {
    font-size: 13px;
  }
  
  /* 品牌合作部分移动端优化 */
  .cobranding-section {
    height: auto;
    min-height: 100vh;
    padding: 2rem 0;
  }
  
  .brands-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    max-width: 100%;
    margin-bottom: 1.5rem;
  }
  
  .brand-item {
    padding: 0;
    min-height: auto;
  }
  
  .brand-logo {
    width: 100%;
    max-width: 140px;
    height: auto;
    max-height: 80px;
  }
  
  .learn-more-btn {
    margin-top: 1.5rem;
    padding: 0.7rem 1.5rem;
    font-size: 0.85rem;
  }
  
  /* 滚动指示器移动端 */
  .scroll-indicator {
    bottom: 1rem;
  }
  
  .scroll-arrow-img {
    width: 24px;
    height: 22px;
  }
  
}

@media (max-width: 480px) {
  .cooperation-container {
    --nav-h: 60px;
  }
  
  .navbar {
    height: 60px;
  }
  
  .main-content {
    padding-top: 60px;
  }
  
  /* 业务联系部分 */
  .business-section {
    padding: 1.5rem 0;
  }
  
  .business-section .section-container {
    padding-top: 1rem;
  }
  
  .section-container {
    padding: 0 1rem;
  }
  
  .main-title {
    font-size: 22px;
    margin-bottom: 6px;
  }
  
  .main-subtitle {
    font-size: 16px;
    margin-bottom: 1.2rem;
  }
  
  .contacts-grid {
    gap: 2rem;
  }
  
  .contact-card {
    padding: 1.2rem;
    gap: 0.8rem;
  }
  
  .contact-title {
    font-size: 13px;
    margin-bottom: 0.6rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .contact-title-cn {
    font-size: 12px;
  }
  
  .contact-desc {
    font-size: 12px;
    line-height: 1.5;
    margin-bottom: 0.6rem;
  }
  
  .contact-item {
    font-size: 12px;
  }
  
  .contact-item .label {
    display: inline-block;
    min-width: 70px;
  }
  
  .qr-image {
    width: 120px;
    height: 120px;
  }
  
  .qr-label {
    font-size: 12px;
  }
  
  /* 品牌合作部分 */
  .cobranding-section {
    padding: 1.5rem 0;
  }
  
  .brands-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
    margin-bottom: 1.2rem;
  }
  
  .brand-logo {
    max-width: 120px;
    max-height: 70px;
  }
  
  .learn-more-btn {
    margin-top: 1.2rem;
    padding: 0.6rem 1.2rem;
    font-size: 0.8rem;
  }
  
  /* 滚动指示器 */
  .scroll-indicator {
    bottom: 0.8rem;
  }
  
  .scroll-arrow-img {
    width: 20px;
    height: 18px;
  }
  
}
</style>

