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
            <!-- 第一行：仅图片+右侧文字，等高，文字底部与图片底部对齐 -->
            <div class="hero-image-row">
              <div class="hero-image">
                <img :src="currentImage" alt="news" class="hero-img" :class="{ 'hero-img-first': currentImageIndex === 0 }" />
                <div v-if="currentImageIndex === 0" class="date-overlay">{{ latestNews.date }}</div>
                <button class="hero-arrow hero-arrow-inside hero-arrow-left" @click="prevImage">
                  <img src="/arrow_right.webp" :alt="currentLanguage === 'zh' ? '上一张' : 'Previous'" class="arrow-icon arrow-icon-left" />
                </button>
                <button class="hero-arrow hero-arrow-inside hero-arrow-right" @click="nextImage">
                  <img src="/arrow_right.webp" :alt="currentLanguage === 'zh' ? '下一张' : 'Next'" class="arrow-icon arrow-icon-right" />
                </button>
              </div>
              <!-- 桌面：右侧文字；手机：在标题下、按钮上（同一份 DOM，靠 CSS 控制位置） -->
              <div class="hero-right">
                <div
                  class="right-text-wrapper"
                  @wheel.stop="onRightTextWheel"
                >
                  <div
                    ref="rightTextEl"
                    class="right-text right-text-all"
                    @scroll="onRightTextScroll"
                  >
                    <p v-for="(content, idx) in latestNews.contents" :key="idx">{{ content }}</p>
                  </div>
                  <div
                    v-show="showCustomScrollbar"
                    class="custom-scrollbar"
                    ref="scrollbarTrackEl"
                    @click="onScrollbarTrackClick"
                  >
                    <button
                      type="button"
                      class="custom-scrollbar-thumb"
                      :style="customThumbStyle"
                      @pointerdown="onThumbPointerDown"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- 第二行：点 + 标题 + 正文 + 按钮（手机端顺序：标题→文字→按钮；桌面端标题+按钮在下方，文字在右侧） -->
            <div class="hero-below">
              <div class="hero-controls-below">
                <div class="hero-dots-below">
                  <span 
                    v-for="(_, index) in latestNews.images" 
                    :key="index"
                    :class="['dot-below', { active: currentImageIndex === index, wide: currentImageIndex === index }]"
                    @click="goToImage(index)">
                  </span>
                </div>
              </div>
              <h3 class="news-bottom-title">{{ latestNews.title }}</h3>
              <!-- 手机端：此处显示正文（标题下、按钮上）；桌面端隐藏，正文在 hero-right -->
              <div class="hero-below-text">
                <p v-for="(content, idx) in latestNews.contents" :key="idx">{{ content }}</p>
              </div>
              <button class="learn-more-btn" @click="handleLearnMore">LEARN MORE</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
import { useLanguage } from '../composables/useLanguage'

const { currentLanguage } = useLanguage()

// 最新新闻数据（只有一条）
const latestNews = ref({
  title: '新一代陪伴玩具"Loomi噜咪"',
  date: '2024.02',
  images: ['/news/1.webp', '/news/2.webp', '/news/3.jpg', '/news/4.webp', '/news/5.jpg', '/news/6.jpg'],
  contents: [
    `2026年春节后，Axonlabs羽山将正式揭晓"LOOMI鹿米"系列首作——"Loomi噜咪"。`,
    `有灵魂的对话：内置原创猫咪角色，依托AI情感大模型深度模拟真实猫咪习性，它能秒懂你的情绪，提供即时、治愈的实时对话。`,
    `次元壁的突破：特有的"呼猫"功能，让用户能随时随地召唤周边的猫咪伙伴，将数字陪伴延伸至物理世界。`,
    `无忧的旅途伴侣：它是符合2026.03最新3C执行标准的可上机充电宝，支持20W快充与多设备连接。扫描机身二维码即可即时查询合规信息，确保在每一段旅途中，都能给你最踏实、最简单的快乐。`
  ]
})

const currentImageIndex = ref(0)

// 当前显示的图片
const currentImage = computed(() => {
  return latestNews.value.images[currentImageIndex.value]
})

// 切换到上一张图片（点击左箭头跳到最右边）
const prevImage = () => {
  if (currentImageIndex.value === 0) {
    currentImageIndex.value = latestNews.value.images.length - 1
  } else {
    currentImageIndex.value = currentImageIndex.value - 1
  }
}

// 切换到下一张图片
const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % latestNews.value.images.length
}

// 切换到指定图片
const goToImage = (index: number) => {
  currentImageIndex.value = index
}

// 处理"了解更多"按钮点击
const handleLearnMore = () => {
  window.open('http://xhslink.com/o/2GgKGpJ5lLQ', '_blank')
}

// 自定义滚动条：强制始终显示（不依赖系统）
const rightTextEl = ref<HTMLElement | null>(null)
const scrollbarTrackEl = ref<HTMLElement | null>(null)
const scrollThumbTop = ref(0)
const scrollThumbHeight = ref(30)
const showCustomScrollbar = ref(true)
let thumbDragging = false
let thumbJustDragged = false
let thumbStartY = 0
let scrollStartTop = 0
let scrollbarResizeObserver: ResizeObserver | null = null

const updateCustomScrollbar = () => {
  const el = rightTextEl.value
  if (!el) return
  const { scrollHeight, clientHeight, scrollTop } = el
  if (scrollHeight <= clientHeight) {
    showCustomScrollbar.value = false
    return
  }
  showCustomScrollbar.value = true
  const ratio = clientHeight / scrollHeight
  scrollThumbHeight.value = Math.max(20, Math.round(ratio * clientHeight))
  scrollThumbTop.value = (scrollTop / (scrollHeight - clientHeight)) * (clientHeight - scrollThumbHeight.value)
}

const customThumbStyle = computed(() => ({
  height: `${scrollThumbHeight.value}px`,
  transform: `translateY(${scrollThumbTop.value}px)`
}))

const onRightTextScroll = () => {
  if (!thumbDragging) updateCustomScrollbar()
}

/** 右侧文字区域滚轮：只滚动文字，不触发页面滚动 */
const onRightTextWheel = (e: WheelEvent) => {
  e.stopPropagation()
}

const onScrollbarTrackClick = (e: MouseEvent) => {
  if (thumbJustDragged) {
    thumbJustDragged = false
    return
  }
  const el = rightTextEl.value
  const track = scrollbarTrackEl.value
  if (!el || !track || thumbDragging) return
  if ((e.target as HTMLElement)?.classList?.contains('custom-scrollbar-thumb')) return
  const rect = track.getBoundingClientRect()
  const y = e.clientY - rect.top
  const trackHeight = rect.height
  const thumbH = scrollThumbHeight.value
  const clickRatio = (y - thumbH / 2) / (trackHeight - thumbH)
  const maxScroll = el.scrollHeight - el.clientHeight
  el.scrollTop = Math.max(0, Math.min(maxScroll, clickRatio * maxScroll))
  updateCustomScrollbar()
}

const onThumbPointerDown = (e: PointerEvent) => {
  e.preventDefault()
  e.stopPropagation()
  const thumbEl = e.currentTarget as HTMLElement
  thumbEl.setPointerCapture(e.pointerId)
  thumbDragging = true
  thumbStartY = e.clientY
  scrollStartTop = rightTextEl.value?.scrollTop ?? 0

  const onPointerMove = (e2: PointerEvent) => {
    e2.preventDefault()
    if (!rightTextEl.value) return
    const delta = e2.clientY - thumbStartY
    const trackHeight = scrollbarTrackEl.value?.getBoundingClientRect().height ?? 1
    const maxScroll = rightTextEl.value.scrollHeight - rightTextEl.value.clientHeight
    const thumbH = scrollThumbHeight.value
    const moveRange = trackHeight - thumbH
    if (moveRange <= 0) return
    const ratio = maxScroll / moveRange
    const newScroll = scrollStartTop + delta * ratio
    rightTextEl.value.scrollTop = Math.max(0, Math.min(maxScroll, newScroll))
    updateCustomScrollbar()
  }

  const onPointerUp = () => {
    thumbEl.releasePointerCapture(e.pointerId)
    thumbDragging = false
    thumbJustDragged = true
    thumbEl.removeEventListener('pointermove', onPointerMove)
    thumbEl.removeEventListener('pointerup', onPointerUp)
    thumbEl.removeEventListener('pointercancel', onPointerUp)
    document.body.style.removeProperty('user-select')
  }

  document.body.style.userSelect = 'none'
  thumbEl.addEventListener('pointermove', onPointerMove)
  thumbEl.addEventListener('pointerup', onPointerUp)
  thumbEl.addEventListener('pointercancel', onPointerUp)
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
  nextTick(() => {
    updateCustomScrollbar()
  })
  scrollbarResizeObserver = new ResizeObserver(() => updateCustomScrollbar())
  const el = rightTextEl.value
  if (el) scrollbarResizeObserver.observe(el)

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
      updateCustomScrollbar()
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
  if (scrollbarResizeObserver && rightTextEl.value) {
    scrollbarResizeObserver.unobserve(rightTextEl.value)
    scrollbarResizeObserver = null
  }
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
  background: url('/news_bg.webp') no-repeat center center;
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
  justify-content: center; /* 垂直居中 */
  flex-direction: column; /* 垂直布局 */
  padding-top: 100px; /* 减少顶部padding，让内容更居中 */
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
  justify-content: center;
  width: 100%;
}

.hero-left {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 下方点/按钮与图片左对齐，在图片正下方 */
}

/* 第一行：仅图片+右侧文字，等高，文字底部与图片底部对齐 */
.hero-image-row {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 20px;
}

/* 第二行：点与按钮，与图片居中对齐 */
.hero-below {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 900px; /* 与图片同宽 */
  flex-shrink: 0;
}

.hero-right {
  color: #fff;
  max-width: 240px;
  width: 240px;
  flex-shrink: 0;
  min-height: 0;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
}

.right-text-wrapper {
  display: flex;
  align-items: stretch;
  width: 100%;
  min-height: 0;
  flex: 1;
}

.custom-scrollbar {
  flex-shrink: 0;
  width: 8px;
  height: 100%;
  min-height: 0;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  margin-left: 4px;
  z-index: 10;
}

.custom-scrollbar-thumb {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  margin: 0;
  padding: 0;
  border: none;
  background: #01CE7E;
  border-radius: 4px;
  cursor: grab;
  min-height: 20px;
  width: 100%;
  display: block;
  outline: none;
  font: inherit;
  -webkit-appearance: none;
  appearance: none;
  touch-action: none;
}

.custom-scrollbar-thumb:active {
  cursor: grabbing;
}

.custom-scrollbar-thumb:focus {
  outline: none;
}

.hero-image {
  position: relative;
  width: 900px;
  height: 600px;
  border-radius: 0;
  overflow: hidden;
  transition: opacity 0.3s ease;
  margin: 0;
  flex-shrink: 0;
}

/* 箭头在图片内左右两侧 */
.hero-arrow-inside {
  position: absolute !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  z-index: 2;
  margin: 0 !important;
}
.hero-arrow-inside.hero-arrow-left {
  left: 16px;
  right: auto;
}
.hero-arrow-inside.hero-arrow-right {
  right: 16px;
  left: auto;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

/* 只有首图显示暗色遮罩 */
.hero-img-first {
  filter: brightness(0.6);
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

/* 点容器：紧贴图片下方 */
.hero-controls-below {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 900px;
  margin-top: 12px; /* 点离图片更近 */
  padding: 0;
  z-index: 2;
  position: relative;
  box-sizing: border-box;
}

.hero-arrow {
  position: relative;
  width: 32px !important; /* 固定宽度 */
  height: 32px !important; /* 固定高度 */
  min-width: 32px !important; /* 最小宽度 */
  min-height: 32px !important; /* 最小高度 */
  max-width: 32px !important; /* 最大宽度 */
  max-height: 32px !important; /* 最大高度 */
  border-radius: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 !important;
  margin: 0 !important;
  flex-shrink: 0 !important; /* 防止缩小 */
  box-sizing: border-box !important; /* 盒模型 */
}

.hero-arrow-left,
.hero-arrow-right {
  width: 32px !important;
  height: 32px !important;
  min-width: 32px !important;
  min-height: 32px !important;
  max-width: 32px !important;
  max-height: 32px !important;
}

.hero-arrow-right {
  /* 移除translateY，使用镜像后应该自然对齐 */
}

.arrow-icon {
  width: 32px !important; /* 固定宽度 */
  height: 32px !important; /* 固定高度 */
  max-width: 32px !important; /* 最大宽度 */
  max-height: 32px !important; /* 最大高度 */
  min-width: 32px !important; /* 最小宽度 */
  min-height: 32px !important; /* 最小高度 */
  object-fit: contain !important; /* 保持比例 */
  transition: all 0.3s ease;
  display: block !important;
  margin: 0 !important; /* 移除margin */
  padding: 0 !important; /* 移除padding */
  vertical-align: middle !important; /* 垂直对齐 */
  box-sizing: border-box !important; /* 盒模型 */
}

.arrow-icon-left {
  transform: rotate(180deg) !important; /* 左箭头旋转180度 */
  width: 32px !important; /* 确保宽度一致 */
  height: 32px !important; /* 确保高度一致 */
  max-width: 32px !important;
  max-height: 32px !important;
  min-width: 32px !important;
  min-height: 32px !important;
}

.arrow-icon-right {
  transform: rotate(180deg) scaleX(-1) !important; /* 右侧按钮：先旋转180度（和左侧一样），再水平镜像 */
  width: 32px !important; /* 确保宽度一致 */
  height: 32px !important; /* 确保高度一致 */
  max-width: 32px !important;
  max-height: 32px !important;
  min-width: 32px !important;
  min-height: 32px !important;
}

.hero-arrow:hover .arrow-icon:not(.arrow-icon-left):not(.arrow-icon-right) {
  transform: scale(1.2); /* 悬停时放大（仅适用于没有特殊类的箭头） */
  width: 32px !important; /* 保持宽度 */
  height: 32px !important; /* 保持高度 */
}

.hero-arrow:hover .arrow-icon-left {
  transform: rotate(180deg) scale(1.2) !important; /* 左箭头悬停时保持旋转并放大 */
  width: 32px !important; /* 保持宽度 */
  height: 32px !important; /* 保持高度 */
}

.hero-arrow:hover .arrow-icon-right {
  transform: rotate(180deg) scaleX(-1) scale(1.2) !important; /* 右箭头悬停时保持镜像并放大 */
  width: 32px !important; /* 保持宽度 */
  height: 32px !important; /* 保持高度 */
}

/* 绿色标签移到图片下面 */
.hero-dots-below {
  display: flex;
  justify-content: center;
  gap: 10px;
  z-index: 2;
}

.hero-dots-below .dot-below {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ffffff; /* 未选中的圆点是纯白色 */
  cursor: pointer;
  transition: all 0.3s ease;
}

/* 激活的标签显示为宽型（圆角矩形） */
.hero-dots-below .dot-below.wide {
  width: 24px;
  height: 10px;
  border-radius: 5px;
  background: #01CE7E;
}

.hero-dots-below .dot-below:hover {
  background: rgba(255, 255, 255, 0.7); /* 悬停时保持白色但稍微透明 */
  transform: scale(1.2);
}

.hero-dots-below .dot-below.active { 
  background: #01CE7E;
}

.hero-dots-below .dot-below.active.wide {
  transform: scale(1.1);
}

.right-text {
  height: 100%;
  min-height: 0;
  max-height: 600px;
  overflow-y: scroll;
  overflow-x: hidden;
  flex: 1;
  min-width: 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
  line-height: 1.9;
  color: #d0d0d0;
  padding-right: 4px;
  font-size: 14px;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
  text-align: left;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.right-text::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

.right-text p {
  margin-bottom: 16px;
  text-align: justify;
  margin-top: 0; /* 移除顶部边距 */
}

.right-text p:last-child {
  margin-bottom: 0;
}

/* 全部文字从顶部排布，不超出容器，超出部分往下滚动 */
.right-text-all {
  justify-content: flex-start !important;
}

/* 原生滚动条已隐藏，使用右侧自定义 div 滚动条，始终显示 */

.news-bottom {
  margin-top: 28px;
  text-align: center;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.hero-below .news-bottom {
  width: 100%;
  max-width: 100%;
}

/* 手机端：标题下、按钮上的正文块（桌面端隐藏） */
.hero-below-text {
  display: none;
}

.news-bottom-title {
  color: #fff;
  font-size: 20px;
  margin-bottom: 12px;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
  font-weight: 400; /* Demibold */
}

.hero-below .news-bottom-title {
  margin-top: 28px;
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
  border-radius: 0; /* 移除圆角 */
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
    width: 675px;
    height: 450px;
  }
  
  .hero-below {
    width: 675px;
  }
  
  .hero-controls-below {
    width: 675px;
    margin-top: 10px;
  }
  
  .hero-right {
    max-width: 180px;
    width: 180px;
  }
  
  .right-text {
    min-height: 0;
    max-height: 450px;
    margin-bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
}

@media (max-width: 1024px) {
  .hero-image {
    width: 540px;
    height: 360px;
  }
  
  .hero-below {
    width: 540px;
  }
  
  .hero-controls-below {
    width: 540px;
    margin-top: 8px;
  }
  
  .hero-right {
    max-width: 144px;
    width: 144px;
  }
  
  .right-text {
    min-height: 0;
    max-height: 360px;
    margin-bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
}

@media (max-width: 768px) {
  .news-section {
    background-attachment: scroll; /* 移动端禁用固定背景 */
  }
  
  .news-section {
    min-height: 100vh; /* 确保一页内显示 */
    height: auto; /* 允许内容撑开 */
    padding: 0 !important; /* 移除section的padding */
  }
  
  .news-section .section-container {
    padding-top: 65px !important; /* 增加顶部padding，让整体往下移，导航栏高度50px + 15px间距 */
    padding-bottom: 10px !important; /* 增加底部padding */
    padding-left: 1.5rem !important; /* 确保左右留白对称 */
    padding-right: 1.5rem !important; /* 确保左右留白对称 */
    min-height: calc(100vh - 50px); /* 导航栏高度50px */
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* 顶部对齐 */
    align-items: stretch !important; /* 拉伸子元素 */
  }
  
  .news-hero-layout {
    flex-direction: column; /* 垂直布局 */
    align-items: center;
    gap: 0 !important; /* 移除容器之间的间距 */
    width: 100%;
  }
  
  .hero-left {
    width: 100%;
    max-width: 90vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start !important; /* 顶部对齐，移除居中造成的空白 */
    position: relative;
    margin-top: 0 !important; /* 移除margin-top */
    margin-bottom: 0 !important; /* 移除底部margin */
    padding: 0 !important; /* 移除所有padding */
  }
  
  .hero-image-row {
    gap: 12px;
    width: 100%;
    max-width: 100%;
    justify-content: center;
  }
  
  .hero-below {
    width: 75vw !important;
    max-width: 380px !important;
    align-items: center;
    text-align: center;
    margin-top: 16px;
  }
  
  .hero-right {
    display: none !important;
  }
  
  .hero-below .news-bottom-title {
    margin-top: 36px;
    margin-bottom: 8px;
  }
  
  .hero-below-text {
    display: block !important;
    width: 100%;
    max-height: none;
    overflow: visible;
    color: #fff;
    text-align: left;
    padding: 0.3rem 0;
  }
  
  .hero-below-text p {
    font-size: 0.8rem !important;
    line-height: 1.5 !important;
    margin-bottom: 0.5rem !important;
    text-align: left;
  }
  
  .hero-below .learn-more-btn {
    margin-top: 12px;
  }
  
  .hero-image {
    width: 75vw !important;
    max-width: 380px !important;
    height: auto;
    aspect-ratio: 3/2;
    margin-bottom: 0 !important;
    margin-top: 0 !important;
    margin-left: auto;
    margin-right: auto;
  }
  
  .hero-arrow-inside.hero-arrow-left {
    left: 10px !important;
  }
  .hero-arrow-inside.hero-arrow-right {
    right: 10px !important;
  }
  
  .hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .date-overlay {
    font-size: 1rem !important; /* 减小日期字体 */
    font-weight: 600; /* 加粗 */
    padding: 0.4rem 0.8rem !important; /* 减小padding */
  }
  
  .hero-controls-below {
    width: 75vw !important;
    max-width: 380px !important;
    margin-top: 6px !important; /* 点离图片更近 */
    margin-bottom: 0 !important;
    padding: 0 !important;
    justify-content: center;
    align-items: center !important;
    display: flex !important;
  }
  
  .hero-arrow {
    width: 32px !important;
    height: 32px !important;
    min-width: 32px !important;
    min-height: 32px !important;
    max-width: 32px !important;
    max-height: 32px !important;
    display: flex !important; /* 确保flex布局 */
    align-items: center !important; /* 垂直居中 */
    justify-content: center !important; /* 水平居中 */
    padding: 0 !important; /* 移除padding */
    margin: 0 !important; /* 移除margin */
    box-sizing: border-box !important; /* 盒模型 */
  }
  
  .hero-arrow-left {
    width: 32px !important;
    height: 32px !important;
    min-width: 32px !important;
    min-height: 32px !important;
    max-width: 32px !important;
    max-height: 32px !important;
    align-items: center !important; /* 确保左箭头垂直居中 */
  }
  
  .hero-arrow-right {
    width: 32px !important;
    height: 32px !important;
    min-width: 32px !important;
    min-height: 32px !important;
    max-width: 32px !important;
    max-height: 32px !important;
    align-items: center !important; /* 确保右箭头垂直居中 */
  }
  
  .arrow-icon {
    width: 32px !important;
    height: 32px !important;
    max-width: 32px !important; /* 最大宽度 */
    max-height: 32px !important; /* 最大高度 */
    min-width: 32px !important; /* 最小宽度 */
    min-height: 32px !important; /* 最小高度 */
    display: block !important; /* 确保是块级元素 */
    margin: 0 !important; /* 移除margin */
    padding: 0 !important; /* 移除padding */
    vertical-align: middle !important; /* 垂直对齐 */
    object-fit: contain !important; /* 保持比例 */
    box-sizing: border-box !important; /* 盒模型 */
  }
  
  .arrow-icon-left {
    transform: rotate(180deg) !important; /* 左箭头旋转180度 */
    width: 32px !important; /* 确保宽度一致 */
    height: 32px !important; /* 确保高度一致 */
    max-width: 32px !important;
    max-height: 32px !important;
    min-width: 32px !important;
    min-height: 32px !important;
  }
  
  .arrow-icon-right {
    transform: rotate(180deg) scaleX(-1) !important; /* 右侧按钮：先旋转180度（和左侧一样），再水平镜像 */
    width: 32px !important; /* 确保宽度一致 */
    height: 32px !important; /* 确保高度一致 */
    max-width: 32px !important;
    max-height: 32px !important;
    min-width: 32px !important;
    min-height: 32px !important;
  }
  
  .hero-dots-below {
    gap: 8px;
  }
  
  .hero-dots-below .dot-below {
    width: 8px;
    height: 8px;
  }
  
  .hero-dots-below .dot-below.wide {
    width: 20px;
    height: 8px;
  }
  
  .hero-right {
    position: relative !important;
    margin-left: 0 !important;
    max-width: 40%;
    width: auto;
    min-width: 120px;
    left: auto !important;
    bottom: auto !important;
    top: auto !important;
    transform: none !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    align-items: flex-start !important;
  }
  
  .right-text {
    height: 100% !important;
    min-height: 0 !important;
    max-height: none !important;
    padding: 0.5rem 0.4rem 0.4rem 0.4rem !important;
    text-align: center;
    margin-bottom: 0 !important;
    margin-top: 0 !important;
    display: flex;
    flex-direction: column;
    justify-content: flex-start !important;
    align-items: center;
    line-height: 1.5 !important;
  }
  
  .right-text p {
    font-size: 0.8rem !important; /* 稍微减小字体 */
    line-height: 1.5 !important; /* 适当增加行高 */
    text-align: center !important; /* 文字居中，使用!important确保生效 */
    margin-bottom: 0.7rem !important; /* 增加段落间距 */
    margin-top: 0 !important; /* 移除顶部margin */
    padding: 0 !important; /* 移除所有padding */
  }
  
  .right-text p:first-child {
    margin-top: 0 !important; /* 第一个段落没有顶部margin */
  }
  
  .right-text p:last-child {
    margin-bottom: 0 !important; /* 最后一个段落没有底部margin */
  }
  
  .news-bottom {
    margin-top: 0.8rem !important;
    width: 100% !important; /* 与图片列同宽，与图片居中对齐 */
    margin-bottom: 0 !important;
    padding: 0 !important;
  }
  
  .hero-below .news-bottom {
    width: 100% !important;
    max-width: 100% !important;
  }
  
  .news-bottom-title {
    font-size: 1.1rem !important; /* 稍微减小字体 */
    margin-bottom: 0.5rem !important; /* 适当增加间距 */
    margin-top: 0 !important; /* 移除顶部margin */
    padding: 0 !important; /* 移除所有padding */
  }
  
  .learn-more-btn {
    padding: 0.5rem 1.2rem !important; /* 减小按钮大小 */
    font-size: 0.7rem !important; /* 减小字体 */
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
    min-height: auto !important;
    justify-content: center;
  }
  
  .footer-copyright p {
    font-size: 12px !important;
    text-align: center !important;
  }
}

@media (max-width: 480px) {
  .news-section {
    min-height: 100vh; /* 确保一页内显示 */
    height: auto; /* 允许内容撑开 */
    padding: 0 !important; /* 移除section的padding */
  }
  
  .news-section .section-container {
    padding-top: 55px !important; /* 增加顶部padding，让整体往下移，导航栏高度40px + 15px间距 */
    padding-bottom: 8px !important; /* 增加底部padding */
    padding-left: 1rem !important; /* 确保左右留白对称 */
    padding-right: 1rem !important; /* 确保左右留白对称 */
    min-height: calc(100vh - 40px); /* 导航栏高度40px */
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* 顶部对齐 */
    align-items: stretch !important; /* 拉伸子元素 */
  }
  
  .news-hero-layout {
    gap: 0 !important; /* 移除容器之间的间距 */
  }
  
  .hero-left {
    max-width: 95vw;
    margin-top: 0 !important; /* 移除margin-top */
    margin-bottom: 0 !important; /* 移除底部margin */
    padding: 0 !important; /* 移除所有padding */
    justify-content: flex-start !important; /* 顶部对齐 */
  }
  
  .hero-image-row {
    gap: 10px;
  }
  
  .hero-below {
    width: 70vw !important;
    max-width: 320px !important;
    margin-top: 14px;
  }
  
  .hero-right {
    display: none !important;
  }
  
  .hero-below .news-bottom-title {
    margin-top: 32px;
  }
  
  .hero-below-text {
    max-height: none;
    overflow: visible;
    text-align: left;
  }
  
  .hero-below-text p {
    text-align: left;
  }
  
  .hero-image {
    width: 70vw !important;
    max-width: 320px !important;
    aspect-ratio: 3/2;
    margin-bottom: 0 !important;
    margin-top: 0 !important;
    margin-left: auto;
    margin-right: auto;
  }
  
  .hero-arrow-inside.hero-arrow-left {
    left: 8px !important;
  }
  .hero-arrow-inside.hero-arrow-right {
    right: 8px !important;
  }
  
  .date-overlay {
    font-size: 0.9rem !important;
    font-weight: 600;
    padding: 0.35rem 0.7rem !important;
  }
  
  .hero-controls-below {
    width: 70vw !important;
    max-width: 320px !important;
    margin-top: 4px !important; /* 点离图片更近 */
    margin-bottom: 0 !important;
    padding: 0 !important;
    justify-content: center;
    align-items: center !important;
    display: flex !important;
  }
  
  .hero-arrow {
    width: 28px !important;
    height: 28px !important;
    min-width: 28px !important;
    min-height: 28px !important;
    max-width: 28px !important;
    max-height: 28px !important;
    display: flex !important; /* 确保flex布局 */
    align-items: center !important; /* 垂直居中 */
    justify-content: center !important; /* 水平居中 */
    padding: 0 !important; /* 移除padding */
    margin: 0 !important; /* 移除margin */
    box-sizing: border-box !important; /* 盒模型 */
  }
  
  .hero-arrow-left {
    width: 28px !important;
    height: 28px !important;
    min-width: 28px !important;
    min-height: 28px !important;
    max-width: 28px !important;
    max-height: 28px !important;
    align-items: center !important; /* 确保左箭头垂直居中 */
  }
  
  .hero-arrow-right {
    width: 28px !important;
    height: 28px !important;
    min-width: 28px !important;
    min-height: 28px !important;
    max-width: 28px !important;
    max-height: 28px !important;
    align-items: center !important; /* 确保右箭头垂直居中 */
  }
  
  .arrow-icon {
    width: 28px !important;
    height: 28px !important;
    max-width: 28px !important; /* 最大宽度 */
    max-height: 28px !important; /* 最大高度 */
    min-width: 28px !important; /* 最小宽度 */
    min-height: 28px !important; /* 最小高度 */
    display: block !important; /* 确保是块级元素 */
    margin: 0 !important; /* 移除margin */
    padding: 0 !important; /* 移除padding */
    vertical-align: middle !important; /* 垂直对齐 */
    object-fit: contain !important; /* 保持比例 */
    box-sizing: border-box !important; /* 盒模型 */
  }
  
  .arrow-icon-left {
    transform: rotate(180deg) !important; /* 左箭头旋转180度 */
    width: 28px !important; /* 确保宽度一致 */
    height: 28px !important; /* 确保高度一致 */
    max-width: 28px !important;
    max-height: 28px !important;
    min-width: 28px !important;
    min-height: 28px !important;
  }
  
  .arrow-icon-right {
    transform: rotate(180deg) scaleX(-1) !important; /* 右侧按钮：先旋转180度（和左侧一样），再水平镜像 */
    width: 28px !important; /* 确保宽度一致 */
    height: 28px !important; /* 确保高度一致 */
    max-width: 28px !important;
    max-height: 28px !important;
    min-width: 28px !important;
    min-height: 28px !important;
  }
  
  .hero-dots-below {
    gap: 6px;
  }
  
  .hero-dots-below .dot-below {
    width: 6px;
    height: 6px;
  }
  
  .hero-dots-below .dot-below.wide {
    width: 18px;
    height: 6px;
  }
  
  .hero-right {
    position: relative !important;
    max-width: 38%;
    width: auto;
    min-width: 100px;
    left: auto !important;
    bottom: auto !important;
    top: auto !important;
    transform: none !important;
    margin-left: 0 !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    align-items: flex-start !important;
  }
  
  .right-text {
    height: 100% !important;
    min-height: 0 !important;
    max-height: none !important;
    padding: 0.4rem 0.3rem 0.35rem 0.3rem !important;
    text-align: center;
    margin-bottom: 0 !important;
    margin-top: 0 !important;
    display: flex;
    flex-direction: column;
    justify-content: flex-start !important;
    align-items: center;
    line-height: 1.45 !important;
  }
  
  .right-text p {
    font-size: 0.7rem !important; /* 稍微减小字体 */
    line-height: 1.45 !important; /* 适当增加行高 */
    text-align: center !important; /* 文字居中，使用!important确保生效 */
    margin-bottom: 0.6rem !important; /* 增加段落间距 */
    margin-top: 0 !important; /* 移除顶部margin */
    padding: 0 !important; /* 移除所有padding */
  }
  
  .right-text p:first-child {
    margin-top: 0 !important; /* 第一个段落没有顶部margin */
  }
  
  .right-text p:last-child {
    margin-bottom: 0 !important; /* 最后一个段落没有底部margin */
  }
  
  .news-bottom {
    margin-top: 0.6rem !important;
    width: 100% !important; /* 与图片列同宽，与图片居中对齐 */
    margin-bottom: 0 !important;
    padding: 0 !important;
  }
  
  .hero-below .news-bottom {
    width: 100% !important;
    max-width: 100% !important;
  }
  
  .news-bottom-title {
    font-size: 0.95rem !important; /* 稍微减小字体 */
    margin-bottom: 0.4rem !important; /* 适当增加间距 */
    margin-top: 0 !important; /* 移除顶部margin */
    padding: 0 !important; /* 移除所有padding */
  }
  
  .learn-more-btn {
    padding: 0.45rem 1rem !important; /* 减小按钮大小 */
    font-size: 0.6rem !important; /* 减小字体 */
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
  }
  
  .footer-contact p {
    font-size: 10px !important;
    text-align: center !important;
  }
  
  .footer-copyright p {
    font-size: 10px !important;
    text-align: center !important;
  }
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
  width: 24px; /* 调整为24px */
  height: 24px; /* 调整为24px */
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

/* 4K屏幕适配 (min-width: 2560px) - 按2倍放大 */
@media (min-width: 2560px) {
  .navbar {
    height: 240px !important; /* 增加高度，从200px增加到240px */
  }
  
  .section-container {
    padding-top: 240px !important; /* 匹配导航栏高度 */
  }
  
  .hero-image {
    width: 2160px !important;
    height: 1440px !important;
  }
  
  .hero-below {
    width: 2160px !important;
  }
  
  .hero-controls-below {
    width: 2160px !important;
    margin-top: 24px !important;
    padding: 0 !important;
  }
  
  .hero-arrow-inside.hero-arrow-left {
    left: 40px !important;
  }
  .hero-arrow-inside.hero-arrow-right {
    right: 40px !important;
  }
  
  .hero-image-row {
    gap: 48px;
  }
  
  .hero-arrow {
    width: 77px !important; /* 进一步放大 */
    height: 77px !important; /* 进一步放大 */
    min-width: 77px !important;
    min-height: 77px !important;
    max-width: 77px !important;
    max-height: 77px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 0 !important;
    margin: 0 !important;
    box-sizing: border-box !important;
  }
  
  .hero-arrow-left,
  .hero-arrow-right {
    width: 77px !important;
    height: 77px !important;
    min-width: 77px !important;
    min-height: 77px !important;
    max-width: 77px !important;
    max-height: 77px !important;
  }
  
  .hero-arrow-right {
    /* 移除translateY，使用镜像后应该自然对齐 */
  }

  .arrow-icon {
    width: 77px !important; /* 进一步放大 */
    height: 77px !important; /* 进一步放大 */
    max-width: 77px !important; /* 最大宽度 */
    max-height: 77px !important; /* 最大高度 */
    min-width: 77px !important; /* 最小宽度 */
    min-height: 77px !important; /* 最小高度 */
    object-fit: contain !important; /* 保持比例 */
    display: block !important;
    margin: 0 !important;
    padding: 0 !important;
    box-sizing: border-box !important;
  }
  
  .arrow-icon-left {
    width: 77px !important; /* 确保宽度一致 */
    height: 77px !important; /* 确保高度一致 */
    max-width: 77px !important;
    max-height: 77px !important;
    min-width: 77px !important;
    min-height: 77px !important;
  }
  
  .arrow-icon-right {
    transform: rotate(180deg) scaleX(-1) !important; /* 右侧按钮：先旋转180度（和左侧一样），再水平镜像 */
    width: 77px !important; /* 确保宽度一致 */
    height: 77px !important; /* 确保高度一致 */
    max-width: 77px !important;
    max-height: 77px !important;
    min-width: 77px !important;
    min-height: 77px !important;
  }
  
  .hero-dots-below {
    gap: 24px !important; /* 进一步放大 */
  }
  
  .hero-dots-below .dot-below {
    width: 24px !important; /* 进一步放大 */
    height: 24px !important; /* 进一步放大 */
  }
  
  .hero-dots-below .dot-below.wide {
    width: 58px !important; /* 进一步放大 */
    height: 24px !important; /* 进一步放大 */
  }
  
  .hero-right {
    max-width: 576px !important;
    width: 576px !important;
  }
  
  .right-text {
    min-height: 0 !important;
    max-height: 1440px !important;
    height: 100% !important;
    font-size: 34px !important;
    padding-right: 19px !important;
    line-height: 2.5 !important;
  }
  
  .right-text p {
    margin-bottom: 20px !important; /* 减少段落间距，从38px减少到20px */
  }
  
  .date-overlay {
    font-size: 154px !important; /* 进一步放大，从128px增加到154px */
    letter-spacing: 5px !important; /* 进一步放大 */
  }
  
  .news-bottom {
    margin-top: 67px !important; /* 进一步放大 */
  }
  
  .news-bottom-title {
    font-size: 40px; /* 20px * 2 */
    margin-bottom: 24px; /* 12px * 2 */
  }
  
  .learn-more-btn {
    padding: 1.6rem 4rem; /* 0.8rem 2rem * 2 */
    font-size: 1.8rem; /* 0.9rem * 2 */
  }
  
  .scroll-indicator {
    bottom: 98px; /* 49px * 2 */
  }
  
  .scroll-arrow-img {
    width: 60px; /* 30px * 2 */
    height: 56px; /* 28px * 2 */
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
