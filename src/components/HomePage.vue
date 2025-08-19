<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <nav class="navbar" :class="{ 'navbar-hidden': !isNavbarVisible }">
      <div class="nav-content">
        <div class="logo">
          <img src="/logo.svg" alt="AXON LABS" class="logo-img" />
        </div>
        <div class="nav-links">
          <a href="#introduction" class="nav-link active">首页</a>
          <router-link to="/news" class="nav-link">新闻</router-link>
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
          <a href="#about" class="nav-link">合作</a>
          <a href="#join" class="nav-link">加入我们</a>
        </div>
        <!-- 移动端菜单按钮 -->
        <div class="mobile-menu-btn" @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <div class="nav-right">
          <span class="nav-language"><span class="active-lang">CN</span> | EN</span>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 产品介绍区域 -->
      <section class="introduction-section" id="introduction">
        <div class="section-container">
          <div class="section-content">
            <h2 class="section-title">INTRODUCTION</h2>
            <h3 class="section-subtitle">品牌介绍</h3>
            <div class="section-text">
              <p>北京玄圃科技有限公司成立于2024年，为国内领先的AI技术与智能硬件开发公司。AXON LABS羽山作为公司旗下最重要的品牌，以"AI为爱，智趣未来，AI for Love, Smart Fun Future"为品牌理念，以用户情感需求为导向，推动智能产品从功能工具向 "有温度的伙伴" 进化。</p>
            </div>
          </div>
    
        </div>
        <div class="scroll-indicator" @click="scrollToTeam">
          <img src="/箭头.png" alt="向下箭头" class="scroll-arrow-img" />
        </div>
      </section>

      <!-- 团队介绍区域 -->
      <section class="team-section" id="team">
        <div class="section-container">
          <div class="section-content">
            <h2 class="section-title">TEAM INTRODUCTION</h2>
            <h3 class="section-subtitle">团队介绍</h3>
            <div class="team-button">
              <button class="learn-more-btn">Learn More</button>
            </div>
          </div>
       
        </div>
        <div class="scroll-indicator" @click="scrollToHistory">
          <img src="/箭头.png" alt="向下箭头" class="scroll-arrow-img" />
        </div>
      </section>

      <!-- 历史大事件区域 -->
      <section class="history-section" id="history">
        <div class="section-container">
          <div class="history-content">
            <h2 class="section-title">HISTORY</h2>
            <h3 class="section-subtitle">大事件</h3>
            
            <!-- 时间线 -->
            <div class="timeline">
              <div class="timeline-item" 
                   v-for="(item, index) in timelineData" 
                   :key="index">
                <div class="timeline-bar" 
                     :style="{ backgroundColor: item.color }">
                </div>
                <div class="timeline-date">{{ item.date }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-container">
        <!-- AXON LABS Logo - 左侧200px -->
        <div class="footer-logo">
          <img src="/logo/greenlogo.png" alt="AXON LABS" class="footer-logo-img" />
        </div>
        
        <!-- 页脚主要内容 - 居中左对齐 -->
        <div class="footer-content">
          <!-- 社交媒体图标 -->
          <div class="social-icons">
            <a href="#" class="social-icon">
              <img src="/logo/新浪.png" alt="微博" />
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
              <a href="#" class="footer-link">加入我们</a>
              <span class="separator">|</span>
              <a href="#" class="footer-link">联系我们</a>
              <span class="separator">|</span>
              <a href="#" class="footer-link">廉洁合规</a>
              <span class="separator">|</span>
              <a href="#" class="footer-link">知识产权保护</a>
              <span class="separator">|</span>
              <a href="#" class="footer-link">隐私声明</a>
              <span class="separator">|</span>
              <a href="#" class="footer-link">ISO27001信息安全管理体系认证</a>
            </div>
            
            <!-- 联系信息 -->
            <div class="footer-contact">
              <p>北京东城区光华长安大厦1-615 | 4000252253@POPMART.COM</p>
            </div>
            
            <!-- 版权信息 -->
            <div class="footer-copyright">
              <p>COPYRIGHT © 泡泡玛特 POPMART.COM ALL RIGHTS RESERVED | 京公网安备 11010502051946号 | 京ICP备11028233号-4 | 营业执照</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 时间线数据
const timelineData = ref([
  { date: '2024', color: '#B0D0C3' }, // 从左到右第一个
  { date: '2025', color: '#83D5B5' }, // 从左到右第二个
  { date: '2026', color: '#6AD9A1' }, // 从左到右第三个
  { date: '2027', color: '#40CF97' }, // 从左到右第四个
  { date: '2028', color: '#01CE7E' }  // 从左到右第五个
])

// 时间线交互功能已移除，只显示静态格子

// 移动端菜单控制
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
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

// 导航栏自动隐藏控制
const isNavbarVisible = ref(true)
let lastScrollY = 0
let ticking = false

const updateNavbarVisibility = () => {
  const currentScrollY = window.scrollY
  
  // 如果在页面顶部，始终显示导航栏
  if (currentScrollY < 100) {
    isNavbarVisible.value = true
  } else {
    // 向下滚动隐藏，向上滚动显示
    if (currentScrollY > lastScrollY) {
      // 向下滚动
      isNavbarVisible.value = false
    } else {
      // 向上滚动
      isNavbarVisible.value = true
    }
  }
  
  lastScrollY = currentScrollY
  ticking = false
}

const handleScroll = () => {
  // 如果正在进行全屏滚动，不处理导航栏隐藏
  if (isScrolling) return
  
  if (!ticking) {
    requestAnimationFrame(updateNavbarVisibility)
    ticking = true
  }
}

// 滚动到团队介绍区域
const scrollToTeam = () => {
  scrollToSection(1) // 使用统一的滚动函数
}

// 滚动到历史区域
const scrollToHistory = () => {
  scrollToSection(2) // 使用统一的滚动函数
}

// 全屏滚动功能
let currentSection = 0
const sections = ['introduction', 'team', 'history']
let isScrolling = false
let scrollAccumulator = 0
let lastScrollTime = 0
const SCROLL_THRESHOLD = 50 // 降低滚动阈值，更容易触发
const SCROLL_COOLDOWN = 1000 // 冷却时间改为1秒，和箭头点击一致

// 检测当前在哪个区域 - 更精确的检测
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
      
      // 特殊处理历史区域 - 使用更宽松的检测范围
      if (i === 2) { // 历史区域
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
  if (scrollTop > windowHeight * 2) return 2 // 如果滚动超过2屏，认为在历史区域
  
  return Math.round(scrollTop / windowHeight)
}

const scrollToSection = (index: number) => {
  if (index < 0 || index >= sections.length || isScrolling) return
  
  const sectionId = sections[index]
  const element = document.getElementById(sectionId)
  if (element) {
    isScrolling = true
    lastScrollTime = Date.now() // 记录滚动时间
    
    // 使用requestAnimationFrame优化性能
    requestAnimationFrame(() => {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    })
    
    currentSection = index
    
    // 滚动完成后重置标志，缩短时间提高响应性
    setTimeout(() => {
      isScrolling = false
    }, 800) // 从1000ms减少到800ms
  }
}

const handleWheel = (event: WheelEvent) => {
  if (isScrolling) return
  
  const now = Date.now()
  const timeSinceLastScroll = now - lastScrollTime
  
  // 减少延迟，提高响应性
  if (timeSinceLastScroll < 50) return
  
  // 检查当前是否在历史区域
  const currentSectionIndex = getCurrentSection()
  const isInHistorySection = currentSectionIndex === 2 // history是第3个区域（索引2）
  
  // 如果在历史区域，允许正常滚动
  if (isInHistorySection) {
    // 更新导航栏显示状态
    if (event.deltaY > 0) {
      isNavbarVisible.value = false
    } else {
      isNavbarVisible.value = true
    }
    
    // 不阻止默认滚动行为，允许正常滚动
    return
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
  
  // 使用更简单的滚动检测，减少复杂性
  const scrollDelta = Math.abs(event.deltaY)
  
  // 降低阈值，提高响应性，并添加防抖
  if (scrollDelta >= 30 && timeSinceLastScroll >= 300) {
    // 更新当前区域和时间戳
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

// 初始化页面位置，确保对齐到正确的区域
const initializePagePosition = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  
  // 如果页面不在正确位置，自动调整
  if (scrollTop % windowHeight !== 0 && scrollTop < windowHeight * 0.1) {
    // 接近顶部，滚动到顶部
    window.scrollTo({ top: 0, behavior: 'auto' })
    currentSection = 0
    isNavbarVisible.value = true // 在顶部显示导航栏
  } else {
    // 找到最近的区域并对齐
    const nearestSection = Math.round(scrollTop / windowHeight)
    if (nearestSection < sections.length) {
      scrollToSection(nearestSection)
    }
    // 根据当前位置设置导航栏状态
    isNavbarVisible.value = nearestSection === 0
  }
}

onMounted(() => {
  // 初始化页面位置
  setTimeout(() => {
    initializePagePosition()
  }, 100)
  
  // 平滑滚动
  const links = document.querySelectorAll('a[href^="#"]')
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const target = document.querySelector(link.getAttribute('href')!)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    })
  })
  
  // 添加全屏滚动事件监听
  window.addEventListener('wheel', handleWheel, { passive: false })
  
  // 添加键盘事件监听（可选）
  window.addEventListener('keydown', (event) => {
    if (isScrolling) return
    
    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      event.preventDefault()
      isNavbarVisible.value = false // 向下键隐藏导航栏
      if (currentSection < sections.length - 1) {
        scrollToSection(currentSection + 1)
      }
    } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault()
      isNavbarVisible.value = true // 向上键显示导航栏
      if (currentSection > 0) {
        scrollToSection(currentSection - 1)
      }
    }
  })
  
  // 添加窗口大小变化监听，重新对齐页面
  window.addEventListener('resize', () => {
    setTimeout(() => {
      initializePagePosition()
    }, 200)
  })
  
  // 添加导航栏自动隐藏的滚动监听
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // 添加页脚区域的正常滚动支持
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 当页脚可见时，确保导航栏隐藏
        isNavbarVisible.value = false
      }
    })
  }, { threshold: 0.1 })
  
  const footer = document.querySelector('.footer')
  if (footer) {
    footerObserver.observe(footer)
  }
  
  // 添加点击空白处隐藏下拉菜单的事件监听
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  // 清理事件监听器
  window.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.home-container {
  width: 100%;
  min-height: 100vh;
  color: #ffffff;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
}

/* 移除全页面背景遮罩，每个区域有自己的遮罩 */

/* 品牌介绍区域 */
.introduction-section {
  position: relative;
  width: 100vw;
  height: 100vh; /* 固定高度，确保全屏滚动效果 */
  margin-left: calc(-50vw + 50%);
  margin-top: -100px; /* 向上偏移导航栏高度100px */
  padding-top: 100px; /* 内容区域保持原位置 */
  z-index: 1;
}

/* 团队介绍区域背景图 */
.team-section {
  position: relative;
  background: url('/BG2.png') no-repeat center center;
  background-size: cover;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  height: 100vh; /* 固定高度，确保全屏滚动效果 */
  min-height: 100vh; /* 确保最小高度 */
  overflow: hidden; /* 确保背景不会溢出 */
}

.team-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.team-section .section-container {
  position: relative;
  z-index: 2;
  height: 100vh; /* 容器也占满整个视口高度 */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 历史区域背景 */
.history-section {
  position: relative;
  background: url('/BG3.png') no-repeat center center;
  background-size: cover;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  min-height: 100vh; /* 改为min-height，允许内容撑开 */
  padding: 2rem 0;
  box-sizing: border-box;
}

.history-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* 稍深的遮罩，确保文字可读性 */
  z-index: 1;
}

.history-section .section-container,
.history-section .history-content {
  position: relative;
  z-index: 2;
}

/* 导航栏 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100px; /* 1920*1080基准高度 */
  background: rgba(0, 0, 0, 0.6); /* 黑色60%透明度 */
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
  max-width: 1920px; /* 1920*1080基准最大宽度 */
  display: flex;
  align-items: center;
  padding: 0 2rem;
  position: relative;
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
  border-radius: 8px 0 8px 0; /* 右侧无圆角，与二维码框拼接 */
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
}

.nav-language {
  color: #cccccc;
  font-size: 0.9rem;
  font-weight: 400; /* 使用Regular字重 */
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
}

.active-lang {
  color: #01CE7E;
}

/* 移动端菜单按钮 */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  position: absolute;
  right: 60px;
  z-index: 1002;
}

.mobile-menu-btn span {
  width: 24px;
  height: 2px;
  background: #ffffff;
  transition: all 0.3s ease;
}

/* 主要内容 */
.main-content {
  padding-top: 100px;
}

/* 区域容器 */
.section-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem; /* 增加上下内边距 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  position: relative;
}

/* 品牌介绍区域容器 */
.introduction-section .section-container {
  position: relative;
  z-index: 2;
}

.section-content {
  position: absolute;
  left: 200px; /* 1920*1080基准：距离左侧200px */
  bottom: 212px; /* 1920*1080基准：距离底部212px */
  max-width: 600px;
  color: #ffffff;
}

.section-decoration {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* 标题样式 */
.section-title {
  font-size: 60px; /* 1920*1080基准字号 */
  font-weight: 600; /* 使用Semibold字重 */
  color: #ffffff;
  margin-bottom: 0; /* h2和h3距离为0 */
  letter-spacing: 0.1em;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
  white-space: nowrap; /* 不换行 */
}

.section-subtitle {
  font-size: 30px;
  color: #cccccc;
  margin-bottom: 20px; /* h3和section-text距离为20px */
  margin-top: 0; /* h2和h3距离为0 */
  font-weight: 700; /* 使用Bold字重 */
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
}

.section-text {
  line-height: 1.8;
  color: #cccccc;
  font-size: 16px;
  font-weight: 400; /* 使用Regular字重 */
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
}

.section-text p {
  margin-bottom: 1rem;
}

/* 科技线条装饰 */
.tech-lines {
  width: 400px;
  height: 600px;
  background-image: 
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  position: relative;
  opacity: 0.3;
}

.tech-lines::before {
  content: '';
  position: absolute;
  top: 20%;
  left: 20%;
  width: 60%;
  height: 60%;
  border: 2px solid rgba(0, 255, 136, 0.3);
  border-radius: 10px;
}

.tech-lines::after {
  content: '';
  position: absolute;
  top: 40%;
  left: 40%;
  width: 20%;
  height: 20%;
  border: 1px solid rgba(0, 255, 136, 0.5);
  border-radius: 50%;
}

/* 滚动指示器 */
.scroll-indicator {
  position: absolute;
  bottom: 49px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 1001; /* 确保在导航栏之上 */
  cursor: pointer; /* 鼠标悬停显示手型 */
  transition: transform 0.3s ease;
}

.scroll-indicator:hover {
  transform: translateX(-50%) scale(1.1); /* 悬停时放大 */
}

.scroll-arrow-img {
  width: 30px;
  height: 28px;
  animation: floatArrow 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
  /* 移除复杂滤镜，保持原始绿色 */
  display: block;
  margin: 0 auto;
  opacity: 0.3; /* 默认透明度较高 */
  transition: opacity 0.3s ease;
}

.scroll-indicator:hover .scroll-arrow-img {
  opacity: 1; /* 悬停时完全不透明 */
}

@keyframes floatArrow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

/* Learn More 按钮 */
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
  background: linear-gradient(90deg, #01CE7E 0%, #00b86b 100%);
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
  color: #000000;
  border-color: #01CE7E;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(1, 206, 126, 0.3);
}

.learn-more-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(1, 206, 126, 0.2);
}

/* 历史区域 */
.history-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.history-content {
  text-align: center;
  max-width: 800px;
}

/* HISTORY标题距离页面内容顶部100px（不包括导航栏） */
.history-content .section-title {
  margin-top: 0; /* 移除额外间距，使用history-content的定位 */
}

.history-content {
  padding-top: 100px; /* 1920*1080基准：内容区距离页面顶部100px */
}

/* 大事件标题距离色块144px */
.history-content .section-subtitle {
  margin-bottom: 144px; /* 1920*1080基准：大事件距离色块144px */
}

/* 时间线 */
.timeline {
  display: flex;
  justify-content: center;
  gap: 0;
  margin-top: 0; /* 移除额外间距，使用subtitle的margin-bottom控制 */
  max-width: 1220px; /* 5个色块 * 244px = 1220px，1920*1080基准 */
  margin-left: auto;
  margin-right: auto;
}

.timeline-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-bar {
  height: 400px; /* 1920*1080基准高度400px */
  width: 244px; /* 1920*1080基准宽度244px */
  margin-bottom: 1rem;
}

.timeline-date {
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 500;
  /* 年份文字紧贴时间线方框底部 */
}

/* 页脚 */
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

/* 页脚主要内容区域 - 居中左对齐 */
.footer-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: left; /* 左对齐 */
  padding-left: 2rem;
  margin-left: 450px; /* logo宽度250px + 距离左侧200px = 450px，确保不重叠 */
  /* 移除固定高度，使用自然布局 */
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
  font-size: 0.85rem;
  height: 30px; /* 第一行高度30px */
}

.footer-link {
  color: #cccccc;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #01CE7E;
}

.separator {
  color: #666666;
  margin: 0 0.25rem;
}

/* 联系信息 */
.footer-contact {
  height: 30px; /* 第二行高度30px */
  display: flex;
  align-items: center;
}

.footer-contact p {
  color: #cccccc;
  font-size: 0.85rem;
  margin: 0;
  text-align: left; /* 左对齐 */
}

/* 版权信息 */
.footer-copyright {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  height: 30px; /* 第三行高度30px */
  display: flex;
  align-items: center;
}

.footer-copyright p {
  color: #888888;
  font-size: 0.75rem;
  margin: 0;
  line-height: 1.4;
  text-align: left; /* 左对齐 */
}

/* 响应式设计 - 以1920*1080为基准 */
@media (max-width: 1440px) {
  .navbar {
    height: 75px; /* 100px * 0.75 */
  }
  
  .main-content {
    padding-top: 75px;
  }
  
  .introduction-section {
    margin-top: -75px;
    padding-top: 75px;
  }
  
  .section-content {
    left: 150px; /* 200px * 0.75 */
    bottom: 159px; /* 212px * 0.75 */
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
  
  /* 1440p屏幕字体和间距调整 */
  .section-title {
    font-size: 45px; /* 60px * 0.75 */
  }
  
  .section-subtitle {
    margin-bottom: 15px; /* 20px * 0.75 */
  }
}

@media (max-width: 1024px) {
  .navbar {
    height: 60px; /* 100px * 0.6 */
  }
  
  .main-content {
    padding-top: 60px;
  }
  
  .introduction-section {
    margin-top: -60px;
    padding-top: 60px;
  }
  
  .section-content {
    left: 120px; /* 200px * 0.6 */
    bottom: 127px; /* 212px * 0.6 */
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
  
  /* 1024p屏幕字体和间距调整 */
  .section-title {
    font-size: 36px; /* 60px * 0.6 */
  }
  
  .section-subtitle {
    margin-bottom: 12px; /* 20px * 0.6 */
  }
  
  /* 页脚响应式 */
  .footer-logo {
    left: 120px; /* 200px * 0.6 */
  }
  
  .footer {
    padding-bottom: 19.2px; /* 32px * 0.6 */
  }
  
  .footer-content {
    margin-left: 270px; /* 150px + 120px，logo宽度 + 距离左侧 */
    max-width: 500px;
  }
  
  .social-icons {
    margin-bottom: 9px; /* 15px * 0.6 */
  }
  
  .footer-text-area {
    height: 54px; /* 90px * 0.6 */
  }
  
  .footer-links {
    height: 18px; /* 30px * 0.6 */
  }
  
  .footer-contact {
    height: 18px; /* 30px * 0.6 */
  }
  
  .footer-copyright {
    height: 18px; /* 30px * 0.6 */
  }
  
  .social-icon {
    width: 18px; /* 24px * 0.75 */
    height: 18px; /* 24px * 0.75 */
  }
  
  .footer-logo-img {
    width: 150px; /* 250px * 0.6 */
    height: auto;
  }
  
  .timeline {
    max-width: 732px; /* 1220px * 0.6 */
  }
  
  .timeline-bar {
    height: 240px; /* 400px * 0.6 */
    width: 146px; /* 244px * 0.6 */
  }
  
  /* 移除交互样式，只保留基础时间线样式 */
  
  .history-content {
    padding-top: 60px; /* 100px * 0.6 */
  }
  
  .history-content .section-subtitle {
    margin-bottom: 86.4px; /* 144px * 0.6 */
  }
}

@media (max-width: 768px) {
  .navbar {
    height: 50px; /* 100px * 0.5 */
  }
  
  .main-content {
    padding-top: 50px;
  }
  
  .introduction-section {
    margin-top: -50px;
    padding-top: 50px;
  }
  
  .section-content {
    left: 100px; /* 200px * 0.5 */
    bottom: 106px; /* 212px * 0.5 */
    max-width: calc(100% - 120px); /* 调整最大宽度 */
  }
  
  .logo {
    left: 20px; /* 移动端logo靠左 */
  }
  
  .logo-img {
    width: 100px; /* 移动端logo更小 */
  }
  
  .nav-links {
    display: none; /* 移动端隐藏导航菜单 */
  }
  
  .mobile-menu-btn {
    display: flex; /* 移动端显示菜单按钮 */
    right: 50px;
  }
  
  .nav-right {
    right: 20px; /* 移动端语言切换靠右 */
  }
  
  /* 移动端文字尺寸调整 */
  .section-title {
    font-size: 30px; /* 60px * 0.5 */
    margin-bottom: 0; /* h2和h3距离为0 */
  }
  
  .section-subtitle {
    font-size: 24px; /* 30px -> 24px */
    margin-top: 0; /* h2和h3距离为0 */
    margin-bottom: 15px; /* h3和section-text距离：20px * 0.75 */
  }
  
  .section-text {
    font-size: 14px; /* 16px -> 14px */
  }
  
  .section-container {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1rem;
  }
  
  .section-decoration {
    margin-top: 2rem;
  }
  
  .tech-lines {
    width: 300px;
    height: 400px;
  }
  
    .nav-link {
    font-size: 0.8rem;
  }

  .timeline {
    flex-direction: column;
    gap: 1rem;
    max-width: 610px; /* 1220px * 0.5 */
  }
  
  .timeline-bar {
    height: 200px; /* 400px * 0.5 */
    width: 122px; /* 244px * 0.5 */
  }
  
  /* 移除交互样式，只保留基础时间线样式 */
  
  .history-content {
    padding-top: 50px; /* 100px * 0.5 */
  }
  
  .history-content .section-subtitle {
    margin-bottom: 72px; /* 144px * 0.5 */
  }
  
  /* 页脚响应式 */
  .footer-logo {
    left: 100px; /* 200px * 0.5 */
  }
  
  .footer {
    padding-bottom: 16px; /* 32px * 0.5 */
  }
  
  .footer-content {
    margin-left: 225px; /* 125px + 100px，logo宽度 + 距离左侧 */
    max-width: 400px;
  }
  
  .social-icons {
    margin-bottom: 7.5px; /* 15px * 0.5 */
  }
  
  .footer-text-area {
    height: 45px; /* 90px * 0.5 */
  }
  
  .footer-links {
    height: 15px; /* 30px * 0.5 */
  }
  
  .footer-contact {
    height: 15px; /* 30px * 0.5 */
  }
  
  .footer-copyright {
    height: 15px; /* 30px * 0.5 */
  }
  
  .social-icon {
    width: 16px; /* 24px * 0.67 */
    height: 16px; /* 24px * 0.67 */
  }
  
  .footer-logo-img {
    width: 125px; /* 250px * 0.5 */
    height: auto;
  }
  
  .timeline {
    max-width: 915px; /* 1220px * 0.75 */
  }
  
  .timeline-bar {
    height: 300px; /* 400px * 0.75 */
    width: 183px; /* 244px * 0.75 */
  }
  
  /* 移除交互样式，只保留基础时间线样式 */
  
  .history-content {
    padding-top: 75px; /* 100px * 0.75 */
  }
  
  .history-content .section-subtitle {
    margin-bottom: 108px; /* 144px * 0.75 */
  }
  
  /* 页脚响应式 */
  .footer-logo {
    left: 150px; /* 200px * 0.75 */
  }
  
  .footer {
    padding-bottom: 24px; /* 32px * 0.75 */
  }
  
  .footer-content {
    max-width: 600px;
    padding-left: 1.5rem;
    margin-left: 337.5px; /* (187.5px + 150px) logo宽度 + 距离左侧 */
  }
  
  .social-icons {
    margin-bottom: 11.25px; /* 15px * 0.75 */
    gap: 0.8rem;
  }
  
  .footer-text-area {
    height: 67.5px; /* 90px * 0.75 */
  }
  
  .footer-links {
    height: 22.5px; /* 30px * 0.75 */
  }
  
  .footer-contact {
    height: 22.5px; /* 30px * 0.75 */
  }
  
  .footer-copyright {
    height: 22.5px; /* 30px * 0.75 */
  }
  
  .social-icon {
    width: 20px; /* 24px * 0.83 */
    height: 20px; /* 24px * 0.83 */
  }
  
  .footer-logo-img {
    width: 187.5px; /* 250px * 0.75 */
    height: auto;
  }
  
  .footer-links {
    font-size: 0.8rem;
    gap: 0.4rem;
  }
  
  .footer-contact p,
  .footer-copyright p {
    font-size: 0.7rem;
  }
}

@media (max-width: 480px) {
  .navbar {
    height: 40px; /* 100px * 0.4 */
  }
  
  .main-content {
    padding-top: 40px;
  }
  
  .introduction-section {
    margin-top: -40px;
    padding-top: 40px;
  }
  
  .section-content {
    left: 20px; /* 移动端左侧边距减小 */
    bottom: 85px; /* 212px * 0.4 */
    max-width: calc(100% - 40px); /* 限制最大宽度 */
  }
  
  .logo {
    left: 15px; /* 小屏幕logo靠左 */
  }
  
  .logo-img {
    width: 80px; /* 小屏幕logo更小 */
  }
  
  .nav-links {
    display: none; /* 小屏幕隐藏导航菜单 */
  }
  
  .mobile-menu-btn {
    display: flex; /* 小屏幕显示菜单按钮 */
    right: 40px;
  }
  
  .nav-right {
    right: 15px; /* 小屏幕语言切换靠右 */
  }
  
  .nav-content {
    padding: 0 1rem;
  }
  
  /* 小屏幕文字尺寸进一步调整 */
  .section-title {
    font-size: 24px; /* 60px * 0.4 */
    margin-bottom: 0; /* h2和h3距离为0 */
  }
  
  .section-subtitle {
    font-size: 20px; /* 24px -> 20px */
    margin-top: 0; /* h2和h3距离为0 */
    margin-bottom: 12px; /* h3和section-text距离：20px * 0.6 */
  }
  
  .section-text {
    font-size: 13px; /* 14px -> 13px */
    line-height: 1.6;
  }
  
  /* 箭头在小屏幕上的调整 */
  .scroll-arrow-img {
    width: 24px;
    height: 22px;
  }
  
  .timeline {
    max-width: 488px; /* 1220px * 0.4 */
  }
  
  .timeline-bar {
    height: 160px; /* 400px * 0.4 */
    width: 98px; /* 244px * 0.4 */
  }
  
  /* 移除交互样式，只保留基础时间线样式 */
  
  .history-content {
    padding-top: 40px; /* 100px * 0.4 */
  }
  
  .history-content .section-subtitle {
    margin-bottom: 57.6px; /* 144px * 0.4 */
  }
  
  /* 页脚移动端适配 */
  .footer-logo {
    position: relative; /* 移动端改为相对定位 */
    left: 0;
    top: 0;
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .footer {
    padding-bottom: 12.8px; /* 32px * 0.4 */
  }
  
  .footer-content {
    max-width: none;
    padding-left: 1rem;
    padding-right: 1rem;
    text-align: center; /* 移动端居中对齐 */
    margin-left: 0; /* 移动端不需要左边距 */
  }
  
  .social-icons {
    margin-bottom: 6px; /* 15px * 0.4 */
    justify-content: center; /* 移动端居中 */
    gap: 0.6rem;
  }
  
  .footer-text-area {
    height: 36px; /* 90px * 0.4 */
  }
  
  .footer-links {
    height: 12px; /* 30px * 0.4 */
    justify-content: center; /* 移动端居中 */
  }
  
  .footer-contact {
    height: 12px; /* 30px * 0.4 */
  }
  
  .footer-copyright {
    height: 12px; /* 30px * 0.4 */
  }
  
  .social-icon {
    width: 20px; /* 保持在24px以下 */
    height: 20px; /* 保持在24px以下 */
  }
  
  .footer-logo-img {
    width: 100px; /* 250px * 0.4 */
    height: auto;
  }
  
  .footer-links {
    justify-content: center; /* 移动端居中 */
    font-size: 0.7rem;
    gap: 0.3rem;
  }
  
  .footer-contact p,
  .footer-copyright p {
    font-size: 0.65rem;
    text-align: center; /* 移动端居中 */
  }
}
</style>
