<template>
  <div class="join-us-container">
    <!-- 导航栏 -->
    <Navbar active-page="join" />

    <!-- 主要内容 -->
    <main class="main-content">
      <section class="join-us-section">
        <div class="section-container">
          <h1 class="main-title">JOIN US</h1>
          <h2 class="main-subtitle">加入我们</h2>

          <div class="jobs-list">
            <div class="job-card" v-for="(job, index) in jobs" :key="index">
              <h3 class="job-category">{{ job.category }} <span class="job-title">{{ job.title }}</span></h3>
              <p class="job-description">{{ job.description }}</p>
              <div class="job-contact">
                <p class="contact-item">{{ currentLanguage === 'zh' ? '联系人：' : 'Contact: ' }}{{ job.contact }}</p>
                <p class="contact-item">{{ currentLanguage === 'zh' ? '联系邮箱：' : 'Email: ' }}{{ job.email }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
import { useLanguage } from '../composables/useLanguage'

const { currentLanguage } = useLanguage()

// 导航栏控制
const isNavbarVisible = ref(true) // 始终显示
const isDropdownVisible = ref(false)
const isQRCodeVisible = ref(false)
const currentQRTitle = ref('')
// 移动端菜单开关（与首页保持一致结构）
const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const showDropdown = () => {
  isDropdownVisible.value = true
}

const hideDropdown = () => {
  setTimeout(() => {}, 200)
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

const handleClickOutside = (event: Event) => {
  const dropdown = document.querySelector('.nav-dropdown')
  if (dropdown && !dropdown.contains(event.target as Node)) {
    isDropdownVisible.value = false
    isQRCodeVisible.value = false
  }
}

// 职位数据（只保留2个，让页面内容适中）
const jobs = computed(() => {
  if (currentLanguage.value === 'zh') {
    return [
      {
        category: '职能类型',
        title: '职位名称',
        description: '职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求',
        contact: 'XXX',
        email: 'BD@axonlabs.com'
      },
      {
        category: '职能类型',
        title: '职位名称',
        description: '职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求',
        contact: 'XXX',
        email: 'BD@axonlabs.com'
      }
    ]
  } else {
    return [
      {
        category: 'Function Type',
        title: 'Job Title',
        description: 'Job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements',
        contact: 'XXX',
        email: 'BD@axonlabs.com'
      },
      {
        category: 'Function Type',
        title: 'Job Title',
        description: 'Job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements job requirements',
        contact: 'XXX',
        email: 'BD@axonlabs.com'
      }
    ]
  }
})

// 背景图片加载状态
const isBackgroundLoaded = ref(false)

// 简单的滚动检测：往下隐藏，往上显示（优化性能）
let lastScrollY = 0
let ticking = false
let scrollTimeout: number | null = null

const handleScroll = () => {
  // 添加防抖，减少计算频率
  if (scrollTimeout) {
    window.clearTimeout(scrollTimeout)
  }
  
  scrollTimeout = window.setTimeout(() => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0

        if (currentScrollY > lastScrollY && currentScrollY > 10) {
          // 往下滚动且不在顶部时，隐藏导航
          isNavbarVisible.value = false
        } else if (currentScrollY < lastScrollY) {
          // 往上滚动，显示导航
          isNavbarVisible.value = true
        }

        lastScrollY = currentScrollY
        ticking = false
      })
      ticking = true
    }
  }, 10) // 10ms 防抖
}

// 预加载背景图片以避免首次滚动卡顿
const preloadBackground = () => {
  const img = new Image()
  img.onload = () => {
    isBackgroundLoaded.value = true
    console.log('加入我们页面背景图片加载完成')
  }
  img.onerror = () => {
    // 即使加载失败也标记为已加载，避免永久阻塞
    isBackgroundLoaded.value = true
    console.warn('加入我们页面背景图片加载失败')
  }
  img.src = '/join_bg.webp'
}

onMounted(() => {
  // 预加载背景图片
  preloadBackground()
  
  window.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll, { passive: true })
  lastScrollY = window.pageYOffset || document.documentElement.scrollTop || 0
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll)
  if (scrollTimeout) {
    window.clearTimeout(scrollTimeout)
  }
})
</script>

<style scoped>
.join-us-container {
  width: 100%;
  min-height: 100vh;
  background: #000000;
  color: #ffffff;
  overflow-x: hidden;
  /* 强制覆盖全局设置，确保连续流畅滚动 */
  scroll-snap-type: none !important;
  scroll-snap-align: none !important;
  scroll-snap-stop: normal !important;
  -webkit-overflow-scrolling: touch;
  /* 禁用平滑滚动，避免卡顿 */
  scroll-behavior: auto !important;
  /* 优化渲染性能，减少首次加载卡顿 */
  isolation: isolate;
  transform: translateZ(0);
}

/* 导航栏样式 */
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
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
  /* 优化导航栏渲染性能 */
  will-change: transform;
  backface-visibility: hidden;
}

.navbar-hidden {
  transform: translateY(-100%);
}

.nav-content {
  max-width: 1920px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 2rem;
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

/* 当显示二维码时，调整下拉框右侧圆角（与首页一致） */
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-language { color: #cccccc; font-size: 16px; font-weight: 400; font-family: 'MiSans', 'Noto Sans SC', sans-serif; }
.active-lang { color: #01CE7E; }

/* 移动端菜单按钮 */
.mobile-menu-btn { display: none; flex-direction: column; gap: 4px; cursor: pointer; position: absolute; right: 60px; z-index: 1002; }
.mobile-menu-btn span { width: 24px; height: 2px; background: #ffffff; transition: all 0.3s ease; }

/* 主要内容 */
.main-content { 
  padding-top: 100px;
  /* 强制禁用滚动吸附 */
  scroll-snap-align: none !important;
  scroll-snap-stop: normal !important;
}

.join-us-section {
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  min-height: auto; /* 改为auto，让内容自然流动，避免分页效果 */
  padding: 140px 0 100px;
  background: url('/join_bg.webp') no-repeat center top;
  background-size: cover;
  background-attachment: scroll; /* 使用scroll而不是fixed以避免卡顿 */
  /* 强制禁用滚动吸附 */
  scroll-snap-align: none !important;
  scroll-snap-stop: normal !important;
  /* 优化首次渲染性能 */
  content-visibility: auto;
  contain-intrinsic-size: auto 1000px;
  /* GPU加速，减少重排 */
  transform: translateZ(0);
  will-change: auto;
}

.join-us-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  pointer-events: none;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
  /* 优化渲染 */
  transform: translateZ(0);
}

.main-title {
  font-size: 60px;
  font-weight: 600;
  background: linear-gradient(to right, #01CE7E, #016840);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin-bottom: 0;
  font-family: 'MiSans-Demibold', 'MiSans', 'Noto Sans SC', sans-serif;
  letter-spacing: 0.1em;
  white-space: nowrap;
}

.main-subtitle {
  font-size: 30px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 0;
  font-weight: 700;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
}

.jobs-list { 
  display: flex; 
  flex-direction: column; 
  gap: 40px; 
  max-width: 820px; 
  margin: 0 auto;
  /* 优化渲染性能 */
  contain: layout style paint;
}

.job-card { 
  background: transparent; 
  padding: 24px 0; 
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  /* 优化每个卡片的渲染 */
  transform: translateZ(0);
  will-change: auto;
}
.job-card:first-child { border-top: none; }

.job-card:last-child {
  border-bottom: none;
}

.job-category {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 16px;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
}

.job-title {
  font-weight: 600;
  color: #ffffff;
  margin-left: 8px;
}

.job-description {
  font-size: 13px;
  color: #cccccc;
  line-height: 1.8;
  margin-bottom: 20px;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
}

.job-contact {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact-item {
  font-size: 13px;
  color: #999999;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
}

/* 页脚样式 */
.footer {
  background: #000000;
  height: 160px; /* 从200px缩小到160px (80%) */
  padding: 30px 0; /* 从40px缩小到30px */
  color: #ffffff;
  box-sizing: border-box;
}

.footer-container {
  max-width: 1920px;
  margin: 0 auto;
  padding: 0;
  position: relative;
}

/* AXON LABS Logo - 左侧200px */
.footer-logo {
  position: absolute;
  left: 200px;
  top: 30px; /* 从40px缩小到30px */
}

.footer-logo-img {
  width: 200px; /* 从250px缩小到200px (80%) */
  height: auto;
  filter: brightness(0) invert(1);
}

/* 页脚主要内容区域 - 居中左对齐 */
.footer-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
  padding-left: 2rem;
  margin-left: 480px; /* logo位置200px + logo宽度200px + 间距80px = 480px */
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: visible; /* 确保二维码不会被裁剪 */
  z-index: 1;
}

/* 社交媒体图标 */
.social-icons {
  display: flex;
  justify-content: flex-start;
  gap: 0.8rem; /* 从1rem缩小到0.8rem */
  margin-bottom: 12px; /* 从15px缩小到12px */
  position: relative; /* 为二维码定位提供参考 */
  z-index: 1;
}

.social-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.social-icon img {
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.social-icon:hover {
  transform: scale(1.1);
  opacity: 0.8;
}

/* 页脚文字区域 */
.footer-text-area {
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* 页脚链接 */
.footer-links {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 16px;
  height: 24px;
}

.footer-link {
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover { color: #01CE7E; }
.separator { color: #ffffff; margin: 0 0.25rem; }

/* 联系信息 */
.footer-contact { height: 24px; display: flex; align-items: center; }
.footer-contact p { color: #9E9E9E; font-size: 16px; margin: 0; text-align: left; }

/* 版权信息 */
.footer-copyright { border-top: 1px solid rgba(255, 255, 255, 0.1); min-height: 24px; display: flex; align-items: center; }
.footer-copyright p { color: #9E9E9E; font-size: 16px; margin: 0; line-height: 1.4; text-align: left; }

/* 响应式 - 与首页保持一致的导航适配 */
@media (max-width: 1440px) {
  .navbar { height: 75px; }
  .main-content { padding-top: 75px; }
  .logo { left: 150px; }
  .logo-img { width: 188px; }
  .nav-links { left: 488px; }
  .nav-right { right: 107px; }
}

@media (max-width: 1024px) {
  .navbar { height: 60px; }
  .main-content { padding-top: 60px; }
  .logo { left: 120px; }
  .logo-img { width: 150px; }
  .nav-links { left: 390px; gap: 2rem; }
  .nav-right { right: 85px; }
}

@media (max-width: 768px) {
  .navbar { height: 80px; }
  .main-content { padding-top: 80px; }
  .logo { left: 20px; }
  .logo-img { width: 120px; }
  .nav-links { display: none; }
  .mobile-menu-btn { display: flex; right: 80px; }
  .nav-right { right: 20px; }
  
  /* 主内容区域移动端优化 */
  .join-us-section {
    padding: 2rem 0;
    min-height: auto;
    background-attachment: scroll;
  }
  
  .section-container {
    padding: 0 1.5rem;
  }
  
  .main-title {
    font-size: 32px;
    margin-bottom: 8px;
    letter-spacing: 0.05em;
    white-space: normal;
  }
  
  .main-subtitle {
    font-size: 20px;
    margin-bottom: 2rem;
  }
  
  .jobs-list {
    gap: 1.5rem;
    max-width: 100%;
  }
  
  .job-card {
    padding: 1.5rem 0;
  }
  
  .job-category {
    font-size: 16px;
    margin-bottom: 12px;
  }
  
  .job-title {
    display: block;
    margin-left: 0;
    margin-top: 0.3rem;
  }
  
  .job-description {
    font-size: 13px;
    line-height: 1.7;
    margin-bottom: 1rem;
  }
  
  .job-contact {
    gap: 0.6rem;
  }
  
  .contact-item {
    font-size: 12px;
  }
  
  /* 页脚响应式 */
  .footer {
    height: auto !important;
    min-height: 150px;
    padding: 20px 0 !important;
  }
  
  .footer-logo {
    position: relative !important;
    left: 0 !important;
    top: 0 !important;
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .footer-logo-img {
    width: 150px !important;
  }
  
  .footer-content {
    max-width: none !important;
    padding-left: 1rem !important;
    padding-right: 1rem !important;
    text-align: center !important;
    margin-left: 0 !important;
  }
  
  .social-icons {
    margin-bottom: 10px !important;
    justify-content: center !important;
    gap: 0.8rem;
  }
  
  .social-icon {
    width: 20px !important;
    height: 20px !important;
  }
  
  .footer-text-area {
    height: auto !important;
  }
  
  .footer-links {
    height: auto !important;
    justify-content: center !important;
    font-size: 12px !important;
    gap: 0.4rem;
  }
  
  .footer-contact {
    height: auto !important;
    justify-content: center;
  }
  
  .footer-contact p {
    font-size: 12px !important;
    text-align: center !important;
  }
  
  .footer-copyright {
    height: auto !important;
    justify-content: center;
  }
  
  .footer-copyright p {
    font-size: 12px !important;
    text-align: center !important;
    white-space: normal !important;
  }
}

@media (max-width: 480px) {
  .navbar { height: 60px; }
  .main-content { padding-top: 60px; }
  .logo { left: 15px; }
  .logo-img { width: 100px; }
  .mobile-menu-btn { right: 70px; }
  .nav-right { right: 15px; }
  .nav-content { padding: 0 1rem; }
  
  /* 主内容区域小屏优化 */
  .join-us-section {
    padding: 1.5rem 0;
  }
  
  .section-container {
    padding: 0 1rem;
  }
  
  .main-title {
    font-size: 24px;
    margin-bottom: 6px;
    letter-spacing: 0.03em;
  }
  
  .main-subtitle {
    font-size: 16px;
    margin-bottom: 1.5rem;
  }
  
  .jobs-list {
    gap: 1.2rem;
  }
  
  .job-card {
    padding: 1.2rem 0;
  }
  
  .job-category {
    font-size: 15px;
    margin-bottom: 10px;
  }
  
  .job-title {
    font-size: 15px;
  }
  
  .job-description {
    font-size: 12px;
    line-height: 1.6;
    margin-bottom: 0.8rem;
  }
  
  .job-contact {
    gap: 0.5rem;
  }
  
  .contact-item {
    font-size: 11px;
    word-break: break-word;
  }
  
  /* 页脚响应式 */
  .footer {
    height: auto !important;
    min-height: 120px;
    padding: 15px 0 !important;
  }
  
  .footer-logo-img {
    width: 120px !important;
  }
  
  .social-icon {
    width: 18px !important;
    height: 18px !important;
  }
  
  .footer-links {
    font-size: 10px !important;
    gap: 0.3rem;
    flex-wrap: wrap;
  }
  
  .footer-contact p {
    font-size: 10px !important;
    text-align: center !important;
    word-break: break-word;
  }
  
  .footer-copyright p {
    font-size: 10px !important;
    text-align: center !important;
    word-break: break-word;
  }
}

/* 4K屏幕适配 (min-width: 2560px) - 按2倍放大 */
@media (min-width: 2560px) {
  .navbar {
    height: 240px !important; /* 与首页一致，从200px增加到240px */
  }
  
  .main-content {
    padding-top: 240px !important; /* 匹配导航栏高度，与首页一致 */
  }
  
  .logo {
    left: 400px; /* 200px * 2 */
  }
  
  .logo-img {
    width: 500px; /* 250px * 2 */
  }
  
  .nav-links {
    left: 1300px; /* 650px * 2 */
    gap: 6rem; /* 3rem * 2 */
  }
  
  .nav-link {
    font-size: 1.8rem; /* 0.9rem * 2 */
  }
  
  .nav-right {
    right: 284px; /* 142px * 2 */
  }
  
  .joinus-section-title {
    font-size: 120px; /* 60px * 2 */
    margin-bottom: 80px; /* 40px * 2 */
  }
  
  .joinus-section-subtitle {
    font-size: 60px; /* 30px * 2 */
    margin-bottom: 120px; /* 60px * 2 */
  }
  
  .positions-grid {
    gap: 80px; /* 40px * 2 */
    margin-bottom: 120px; /* 60px * 2 */
  }
  
  .position-card {
    padding: 60px; /* 30px * 2 */
  }
  
  .position-title {
    font-size: 48px; /* 24px * 2 */
    margin-bottom: 32px; /* 16px * 2 */
  }
  
  .position-description {
    font-size: 28px; /* 14px * 2 */
    line-height: 3; /* 1.5 * 2 */
    margin-bottom: 32px; /* 16px * 2 */
  }
  
  .apply-btn {
    padding: 1.6rem 4rem; /* 0.8rem 2rem * 2 */
    font-size: 1.8rem; /* 0.9rem * 2 */
  }
  
  .footer {
    height: 320px; /* 160px * 2 */
    padding: 60px 0; /* 30px * 2 */
  }
  
  .footer-logo {
    left: 400px; /* 200px * 2 */
    top: 60px; /* 30px * 2 */
  }
  
  .footer-logo-img {
    width: 400px; /* 200px * 2 */
  }
  
  .footer-content {
    max-width: 1600px; /* 800px * 2 */
    margin-left: 960px; /* 480px * 2 */
    padding-left: 4rem; /* 2rem * 2 */
  }
  
  .social-icons {
    gap: 1.6rem; /* 0.8rem * 2 */
    margin-bottom: 24px; /* 12px * 2 */
  }
  
  .social-icon {
    width: 48px; /* 24px * 2 */
    height: 48px; /* 24px * 2 */
  }
  
  .footer-text-area {
    height: 180px; /* 90px * 2 */
  }
  
  .footer-links {
    font-size: 32px; /* 16px * 2 */
    height: 48px; /* 24px * 2 */
    gap: 1rem; /* 0.5rem * 2 */
  }
  
  .footer-contact {
    height: 48px; /* 24px * 2 */
  }
  
  .footer-contact p {
    font-size: 32px; /* 16px * 2 */
  }
  
  .footer-copyright {
    height: 48px; /* 24px * 2 */
  }
  
  .footer-copyright p {
    font-size: 32px; /* 16px * 2 */
  }
}
</style>

