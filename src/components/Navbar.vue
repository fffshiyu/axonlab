<template>
  <nav class="navbar" :class="{ 'navbar-hidden': !isNavbarVisible }">
    <div class="nav-content">
      <div class="logo">
        <img src="/logo.svg" alt="AXON LABS" class="logo-img" />
      </div>
      <div class="nav-links">
        <router-link 
          v-if="activePage === 'home'" 
          to="/home" 
          class="nav-link active"
        >首页</router-link>
        <router-link 
          v-else 
          to="/home" 
          class="nav-link"
        >首页</router-link>
        
        <router-link 
          to="/news" 
          class="nav-link" 
          :class="{ 'active': activePage === 'news' }"
        >新闻</router-link>
        
        <router-link 
          to="/product-series" 
          class="nav-link" 
          :class="{ 'active': activePage === 'product-series' }"
        >产品系列</router-link>
        
        <div class="nav-dropdown" @mouseenter="showDropdown" @mouseleave="hideDropdown">
          <a href="#" class="nav-link" :class="{ 'active': isDropdownVisible }">线上商城</a>
          <div class="dropdown-menu" :class="{ 'show': isDropdownVisible }">
            <div class="dropdown-item" @click="showQRCode('tmall')">天猫商城</div>
            <div class="dropdown-item" @click="showQRCode('douyin')">抖音商城</div>
            <div class="dropdown-item" @click="showQRCode('jd')">京东商城</div>
            <div class="dropdown-item" @click="showQRCode('xiaochengxu')">小程序官方商城</div>
            <!-- 二维码显示区域 -->
            <div class="qr-code-container" :class="{ 'show': isQRCodeVisible }">
              <div class="qr-code-placeholder">二维码</div>
              <div class="qr-code-title">{{ currentQRTitle }}</div>
            </div>
          </div>
        </div>
        
        <router-link 
          to="/cooperation" 
          class="nav-link" 
          :class="{ 'active': activePage === 'cooperation' }"
        >合作</router-link>
        
        <router-link 
          to="/join" 
          class="nav-link" 
          :class="{ 'active': activePage === 'join' }"
        >加入我们</router-link>
      </div>
      
      <!-- 移动端菜单按钮 -->
      <div class="mobile-menu-btn" :class="{ 'active': isMobileMenuOpen }" @click="toggleMobileMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <div class="nav-right">
        <span class="nav-language"><span class="active-lang">CN</span> | EN</span>
      </div>
    </div>
    
    <!-- 移动端菜单 -->
    <div class="mobile-menu" :class="{ 'active': isMobileMenuOpen }">
      <div class="mobile-menu-content">
        <router-link 
          to="/home" 
          class="mobile-nav-link" 
          :class="{ 'active': activePage === 'home' }"
          @click="closeMobileMenu"
        >首页</router-link>
        
        <router-link 
          to="/news" 
          class="mobile-nav-link" 
          :class="{ 'active': activePage === 'news' }"
          @click="closeMobileMenu"
        >新闻</router-link>
        
        <router-link 
          to="/product-series" 
          class="mobile-nav-link" 
          :class="{ 'active': activePage === 'product-series' }"
          @click="closeMobileMenu"
        >产品系列</router-link>
        
        <div class="mobile-dropdown">
          <div class="mobile-nav-link" @click="toggleMobileDropdown">线上商城</div>
          <div class="mobile-dropdown-menu" :class="{ 'active': isMobileDropdownOpen }">
            <div class="mobile-dropdown-item" @click="toggleMobileQRCode('tmall')">
              <span>天猫商城</span>
              <div class="mobile-qr-code" :class="{ 'show': mobileQRCode === 'tmall' }">
                <div class="mobile-qr-placeholder">二维码</div>
                <div class="mobile-qr-title">天猫商城</div>
              </div>
            </div>
            <div class="mobile-dropdown-item" @click="toggleMobileQRCode('douyin')">
              <span>抖音商城</span>
              <div class="mobile-qr-code" :class="{ 'show': mobileQRCode === 'douyin' }">
                <div class="mobile-qr-placeholder">二维码</div>
                <div class="mobile-qr-title">抖音商城</div>
              </div>
            </div>
            <div class="mobile-dropdown-item" @click="toggleMobileQRCode('jd')">
              <span>京东商城</span>
              <div class="mobile-qr-code" :class="{ 'show': mobileQRCode === 'jd' }">
                <div class="mobile-qr-placeholder">二维码</div>
                <div class="mobile-qr-title">京东商城</div>
              </div>
            </div>
            <div class="mobile-dropdown-item" @click="toggleMobileQRCode('xiaochengxu')">
              <span>小程序官方商城</span>
              <div class="mobile-qr-code" :class="{ 'show': mobileQRCode === 'xiaochengxu' }">
                <div class="mobile-qr-placeholder">二维码</div>
                <div class="mobile-qr-title">小程序官方商城</div>
              </div>
            </div>
          </div>
        </div>
        
        <router-link 
          to="/cooperation" 
          class="mobile-nav-link" 
          :class="{ 'active': activePage === 'cooperation' }"
          @click="closeMobileMenu"
        >合作</router-link>
        
        <router-link 
          to="/join" 
          class="mobile-nav-link" 
          :class="{ 'active': activePage === 'join' }"
          @click="closeMobileMenu"
        >加入我们</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 定义 props
interface Props {
  activePage?: string
}

const props = withDefaults(defineProps<Props>(), {
  activePage: ''
})

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
  setTimeout(() => {
    // 延迟隐藏以防止意外关闭
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

// 移动端菜单控制
const isMobileMenuOpen = ref(false)
const isMobileDropdownOpen = ref(false)
const mobileQRCode = ref<string | null>(null)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  // 关闭移动菜单时也关闭下拉菜单和二维码
  if (!isMobileMenuOpen.value) {
    isMobileDropdownOpen.value = false
    mobileQRCode.value = null
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  isMobileDropdownOpen.value = false
  mobileQRCode.value = null
}

const toggleMobileDropdown = () => {
  isMobileDropdownOpen.value = !isMobileDropdownOpen.value
  // 收起下拉菜单时也关闭二维码
  if (!isMobileDropdownOpen.value) {
    mobileQRCode.value = null
  }
}

const toggleMobileQRCode = (platform: string) => {
  // 如果点击的是已经打开的二维码，则关闭它
  if (mobileQRCode.value === platform) {
    mobileQRCode.value = null
  } else {
    // 否则显示新的二维码
    mobileQRCode.value = platform
  }
}

// 滚动隐藏导航栏逻辑
let lastScrollTop = 0
let lastWheelDelta = 0
let ticking = false

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      
      // 如果在页面顶部（小于100px），始终显示导航栏
      if (scrollTop < 100) {
        isNavbarVisible.value = true
      } else {
        // 向下滚动隐藏，向上滚动显示
        if (scrollTop > lastScrollTop) {
          // 向下滚动
          isNavbarVisible.value = false
        } else {
          // 向上滚动
          isNavbarVisible.value = true
        }
      }
      
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
      ticking = false
    })
    ticking = true
  }
}

// 处理wheel事件（用于全屏滚动页面）
const handleWheel = (event: WheelEvent) => {
  // 使用wheel事件的方向来控制导航栏
  if (Math.abs(event.deltaY) > 10) {
    if (event.deltaY > 0) {
      // 向下滚动 - 隐藏导航栏
      isNavbarVisible.value = false
    } else {
      // 向上滚动 - 显示导航栏
      isNavbarVisible.value = true
    }
  }
}

// 点击空白处隐藏下拉菜单
const handleClickOutside = (event: Event) => {
  const dropdown = document.querySelector('.nav-dropdown')
  if (dropdown && !dropdown.contains(event.target as Node)) {
    isDropdownVisible.value = false
    isQRCodeVisible.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('wheel', handleWheel, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('wheel', handleWheel)
})
</script>

<style scoped>
/* 导航栏样式 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: none; /* 移除模糊效果，让背景完全透明可见 */
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
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0;
  position: relative;
}

.logo {
  position: fixed; /* 改为fixed，相对于视口定位 */
  left: 200px;
  top: 25px; /* 调整垂直位置使其在导航栏中居中 */
  z-index: 1001; /* 确保在导航栏之上 */
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

.nav-language {
  color: #cccccc;
  font-size: 16px;
  font-weight: 400;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
}

.active-lang {
  color: #01CE7E;
}

/* 移动端菜单按钮 */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  position: absolute;
  right: 60px;
  z-index: 1002;
  padding: 5px;
}

.mobile-menu-btn span {
  width: 24px;
  height: 2px;
  background: #ffffff;
  transition: all 0.3s ease;
  transform-origin: center;
}

/* 汉堡菜单动画 */
.mobile-menu-btn.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.mobile-menu-btn.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* 移动端菜单 */
.mobile-menu {
  position: fixed;
  top: 80px; /* 导航栏下方 */
  left: 0;
  width: 100%;
  height: calc(100vh - 80px);
  background: rgba(0, 0, 0, 0.98);
  backdrop-filter: blur(10px);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 999;
  overflow-y: auto;
}

.mobile-menu.active {
  transform: translateX(0);
}

.mobile-menu-content {
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.mobile-nav-link {
  padding: 1rem 0;
  color: #ffffff;
  text-decoration: none;
  font-size: 1.1rem;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: color 0.3s ease;
}

.mobile-nav-link:hover,
.mobile-nav-link.active {
  color: #01CE7E;
}

.mobile-dropdown {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-dropdown .mobile-nav-link {
  border-bottom: none;
}

.mobile-dropdown-menu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: rgba(1, 206, 126, 0.05);
}

.mobile-dropdown-menu.active {
  max-height: 800px; /* 增加高度以容纳展开的二维码 */
}

.mobile-dropdown-item {
  padding: 0.8rem 1.5rem;
  color: #cccccc;
  font-size: 1rem;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.mobile-dropdown-item span {
  display: block;
}

.mobile-dropdown-item:last-child {
  border-bottom: none;
}

.mobile-dropdown-item:hover {
  color: #01CE7E;
  background: rgba(1, 206, 126, 0.1);
  padding-left: 2rem;
}

/* 移动端二维码样式 */
.mobile-qr-code {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0;
  padding: 0;
}

.mobile-qr-code.show {
  max-height: 200px;
  opacity: 1;
  margin-top: 1rem;
  padding: 1rem 0;
}

.mobile-qr-placeholder {
  width: 120px;
  height: 120px;
  background: #666666;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
  font-size: 14px;
  margin-bottom: 0.5rem;
}

.mobile-qr-title {
  color: #ffffff;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
  font-size: 12px;
  text-align: center;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 1440px) {
  .navbar {
    height: 75px;
  }
  
  .logo {
    left: 150px;
    top: 18.75px; /* 75px导航栏高度的中心 */
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
}

/* 添加中间断点避免重叠 */
@media (max-width: 1200px) {
  .nav-links {
    left: 380px;
    gap: 1.5rem;
  }
  
  .nav-link {
    font-size: 0.85rem;
  }
  
  .nav-right {
    right: 80px;
  }
}

@media (max-width: 1024px) {
  .navbar {
    height: 60px;
  }
  
  .logo {
    left: 120px;
    top: 15px; /* 60px导航栏高度的中心 */
  }
  
  .logo-img {
    width: 150px;
  }
  
  .nav-links {
    left: 320px;
    gap: 1.5rem;
  }
  
  .nav-link {
    font-size: 0.8rem;
  }
  
  .nav-right {
    right: 70px;
  }
}

/* 小屏幕隐藏导航链接 */
@media (max-width: 900px) {
  .nav-links {
    display: none;
  }
  
  .mobile-menu-btn {
    display: flex;
    right: 80px;
  }
}

@media (max-width: 768px) {
  .navbar {
    height: 80px;
  }
  
  .logo {
    left: 20px;
    display: flex;
    align-items: flex-end; /* 底部对齐 */
  }
  
  .logo-img {
    height: 16px; /* 缩小移动端logo */
    width: auto; /* 宽度自适应 */
  }
  
  .nav-links {
    display: none;
  }
  
  .mobile-menu-btn {
    display: flex;
    right: 90px;
  }
  
  .nav-right {
    right: 20px;
  }
  
  .nav-content {
    padding: 0 1rem;
  }
  
  .mobile-menu {
    top: 80px;
    height: calc(100vh - 80px);
  }
}

@media (max-width: 480px) {
  .navbar {
    height: 60px;
  }
  
  .logo {
    left: 15px;
    display: flex;
    align-items: flex-end; /* 底部对齐 */
  }
  
  .logo-img {
    height: 14px; /* 缩小小屏幕logo */
    width: auto; /* 宽度自适应 */
  }
  
  .mobile-menu-btn {
    display: flex;
    right: 70px;
  }
  
  .mobile-menu-btn span {
    width: 20px;
  }
  
  .nav-right {
    right: 15px;
  }
  
  .nav-language {
    font-size: 13px;
  }
  
  .nav-content {
    padding: 0 1rem;
  }
  
  .mobile-menu {
    top: 60px;
    height: calc(100vh - 60px);
  }
  
  .mobile-menu-content {
    padding: 1.5rem 1rem;
  }
  
  .mobile-nav-link {
    font-size: 1rem;
    padding: 0.8rem 0;
  }
  
  .mobile-dropdown-item {
    font-size: 0.9rem;
    padding: 0.7rem 1.2rem;
  }
}
</style>

