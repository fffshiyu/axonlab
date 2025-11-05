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
                <p class="contact-item">联系人：{{ job.contact }}</p>
                <p class="contact-item">联系邮箱：{{ job.email }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-logo">
          <img src="/logo.svg" alt="AXON LABS" class="footer-logo-img" />
        </div>
        
        <div class="footer-content">
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
          
          <div class="footer-text-area">
            <div class="footer-links">
              <a href="#" class="footer-link">知识产权保护</a>
              <span class="separator">|</span>
              <a href="#" class="footer-link">隐私声明</a>
              <span class="separator">|</span>
              <a href="#" class="footer-link">ISO27001信息安全管理体系认证</a>
            </div>
            
            <div class="footer-contact">
              <p>互联网违法和不良信息举报邮箱   LD@axonlabs.com</p>
            </div>
            
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

// 职位数据
const jobs = ref([
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
  },
  {
    category: '职能类型',
    title: '职位名称',
    description: '职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求',
    contact: 'XXX',
    email: 'BD@axonlabs.com'
  },
  {
    category: '职能类型',
    title: '职位名称',
    description: '职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求职位要求',
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
])

// 简单的滚动检测：往下隐藏，往上显示（优化性能）
let lastScrollY = 0
let ticking = false

const handleScroll = () => {
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
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll, { passive: true })
  lastScrollY = window.pageYOffset || document.documentElement.scrollTop || 0
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.join-us-container {
  width: 100%;
  min-height: 100vh;
  background: #000000;
  color: #ffffff;
  overflow-x: hidden;
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
.main-content { padding-top: 100px; }

.join-us-section {
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  min-height: 100vh;
  padding: 140px 0 100px;
  background: url('/join_bg.png') no-repeat center top;
  background-size: cover;
  /* 移除 background-attachment: fixed 以解决滚动卡顿问题 */
  /* 优化渲染性能 */
  will-change: transform;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  perspective: 1000;
  -webkit-perspective: 1000;
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

.jobs-list { display: flex; flex-direction: column; gap: 40px; max-width: 820px; margin: 0 auto; }

.job-card { background: transparent; padding: 24px 0; border-top: 1px solid rgba(255, 255, 255, 0.25); }
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
  height: 200px;
  padding: 40px 0;
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
  top: 40px;
}

.footer-logo-img {
  width: 250px;
  height: auto;
}

/* 页脚主要内容区域 - 居中左对齐 */
.footer-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
  padding-left: 2rem;
  margin-left: 550px;
  display: flex;
  flex-direction: column;
}

/* 社交媒体图标 */
.social-icons {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin-bottom: 15px;
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
  object-fit: contain;
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
.footer-copyright { border-top: 1px solid rgba(255, 255, 255, 0.1); height: 24px; display: flex; align-items: center; }
.footer-copyright p { color: #9E9E9E; font-size: 16px; margin: 0; line-height: 1.4; text-align: left; white-space: nowrap; }

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
  .navbar { height: 50px; }
  .main-content { padding-top: 50px; }
  .logo { left: 100px; }
  .logo-img { width: 100px; }
  .nav-links { display: none; }
  .mobile-menu-btn { display: flex; right: 50px; }
  .nav-right { right: 20px; }
}

@media (max-width: 480px) {
  .navbar { height: 40px; }
  .main-content { padding-top: 40px; }
  .logo { left: 15px; }
  .logo-img { width: 80px; }
  .mobile-menu-btn { right: 40px; }
  .nav-right { right: 15px; }
  .nav-content { padding: 0 1rem; }
}
</style>

