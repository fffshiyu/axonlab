<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <Navbar active-page="home" />

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 产品介绍区域 -->
      <section class="introduction-section" id="introduction">
        <div class="section-container">
          <div class="section-content" :class="{ expanded: isIntroExpanded, 'lang-en': !isZh }">
            <!-- 品牌介绍：用文字还原图片UI（替代 index-text.webp / axonrob_text_open.webp） -->
            <div class="intro-text" :class="{ expanded: isIntroExpanded }">
              <h2 class="intro-title-en">BRAND INTRODUCTION</h2>
              <h3 class="intro-title-cn">品牌介绍</h3>
              <p class="intro-paragraph" v-if="isZh">
        AXON LABS 羽山，是成立于2024年的新锐科技公司，正在打造面向年轻消费市场<br>的“潮流科技品牌”。设计至上、体验为王，结合人工智能技术，打造“实用好物、科<br>技潮玩”的潮流单品，以设计驱动情绪价值，
        让科技产品更有温度。
      </p>
      <p class="intro-paragraph intro-paragraph-en" v-else>
        AXON LABS Yushan is a cutting-edge technology company founded in 2024, building a<br>"trendy tech brand" targeting the young consumer market. Design-first and experience-<br>driven, we combine AI technology to create trendy products that are "practical goods,<br>tech toys", driving emotional value through design, making tech products more warm.
      </p>
        <div v-show="isIntroExpanded" class="intro-more">
                <p class="intro-paragraph" v-if="isZh">
                 「羽山」，是《山海经》中的上古神山，象征着华夏先民对宇宙万物的求索。但我<br>们要做的，是利用 AI 与硬件技术的深度融合，重塑科技产品的“生命逻辑”。
                </p>
                <p class="intro-paragraph intro-paragraph-en" v-else>
                 "Yushan" is an ancient sacred mountain in the Classic of Mountains and Seas,<br>symbolizing the Chinese ancestors' quest for the universe. But what we aim to do is<br>deeply integrate AI with hardware technology to reshape the "life logic" of tech products.
                </p>
                <p class="intro-paragraph" v-if="isZh">
                  我们的团队来自于潮玩、游戏、互联网大厂，带着热爱和生命力，探索如何「连接<br>文化、科技与生活」。
                </p>
                <p class="intro-paragraph intro-paragraph-en" v-else>
                  Our team comes from trendy toys, gaming, and internet giants, bringing passion<br>and vitality to explore how to "connect culture, technology, and life".
                </p>
                   <p class="intro-paragraph" v-if="isZh">
                在「陪伴产品」层出不穷的今天，我们认为陪伴不应是额外负担，而应是基于「高<br>频场景」的「润物无声」。
                </p>
                <p class="intro-paragraph intro-paragraph-en" v-else>
                 In an era where "companion products" are emerging endlessly, we believe<br>companionship should not be an extra burden, but rather "silent nurturing" based on<br>"high-frequency scenarios".
                </p>
                <p class="intro-paragraph intro-paragraph-last" v-if="isZh">
             品牌旗下首个系列 LOOMI 鹿米，AI 智能充电宝产品于 2025 年开始研发。以「时<br>尚美观，情感陪伴」为核心定位的潮流数码单品。
             在满足用户日常充电需求的基<br>础上，它更像是一位默默守护的伙伴——通过细腻的问候传递温暖，借助定制化<br>的智能语音、触控等交互功能，把用户理想中的他她，甚至它，融入到产品中，<br>让用户看得见、摸得着，使每一次充电都成为一次内心的充电。
              </p>
                <p class="intro-paragraph intro-paragraph-last intro-paragraph-en" v-else>
              The brand's first series LOOMI, an AI smart power bank product, began development<br>in 2025. A trendy digital product positioned as "fashionable, beautiful, emotional<br>companionship". Beyond meeting daily charging needs, it's more like a silently<br>guarding companion—conveying warmth through thoughtful greetings, integrating<br>customized smart voice, touch interactions, and bringing users' ideal companions<br>into the product, making every charge a recharge of the heart.
              </p>
              </div>
            </div>
            <div class="intro-button">
              <button v-if="!isIntroExpanded" class="learn-more-btn" @click="handleLearnMore">Learn More</button>
            </div>
          </div>
    
        </div>
        <div class="scroll-indicator" @click="scrollToHistory">
          <img src="/arrow.webp" :alt="currentLanguage === 'zh' ? '向下箭头' : 'Scroll Down'" class="scroll-arrow-img" />
        </div>
      </section>


      <!-- 历史大事件区域 -->
      <section class="history-section" id="history">
        <div class="section-container">
          <div class="history-content">
            <h2 class="section-title">HISTORY</h2>
            <h3 class="section-subtitle">大事件</h3>
            
            <!-- 时间线 -->
            <div class="timeline" 
                 @mouseleave="expandedCardIndex = -1"
                 @touchend="handleTimelineTouchEnd">
              <div class="timeline-item card" 
                   v-for="(item, index) in timelineData" 
                   :key="index"
                   :class="{ 
                     'hidden-by-overlay': isCardHiddenByOverlay(index),
                     'dimmed-card': expandedCardIndex !== -1 && expandedCardIndex !== index && !isCardHiddenByOverlay(index)
                   }"
                   @mouseenter="expandedCardIndex = index"
                   @click="handleCardClick(index)">
                <!-- 色块 - 始终显示 -->
                <div class="timeline-bar" 
                     :style="{ backgroundColor: item.color }">
                </div>
                <!-- 展开状态：图片覆盖层 -->
                <div v-if="expandedCardIndex === index" 
                     class="timeline-expanded-overlay"
                     :class="getOverlayPositionClass(index)">
                  <img src="/Group%203.webp" alt="历史事件" class="expanded-image" />
                </div>
                <div class="timeline-date" 
                     :class="{ 'dimmed-date': expandedCardIndex !== -1 && expandedCardIndex !== index }">
                  {{ item.date }}
                </div>
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
          <img src="/logo.svg" alt="AXON LABS" class="footer-logo-img" />
        </div>
        
        <!-- 页脚主要内容 - 居中左对齐 -->
        <div class="footer-content">
          <!-- 社交媒体图标 -->
          <div class="social-icons">
            <a href="#" class="social-icon">
              <img src="/logo/weibo.webp" alt="微博" />
            </a>
            <a href="#" class="social-icon">
              <img src="/bilibil.png" alt="哔哩哔哩" />
            </a>
            <a href="#" class="social-icon">
              <img src="/wechat.png" alt="微信" />
            </a>
            <a href="#" class="social-icon">
              <img src="/redbook.png" alt="小红书" />
            </a>
            <a href="#" class="social-icon">
              <img src="/ins.png" alt="Instagram" />
            </a>
            <a href="#" class="social-icon">
              <img src="/facebook.png" alt="Facebook" />
            </a>
            <a href="#" class="social-icon">
              <img src="/youtube.png" alt="YouTube" />
            </a>
          </div>
          
          <!-- 页脚文字区域 -->
          <div class="footer-text-area">
            <!-- 页脚链接 -->
            <div class="footer-links">
              <a href="#" class="footer-link">{{ currentLanguage === 'zh' ? '知识产权保护' : 'Intellectual Property Protection' }}</a>
              <span class="separator">|</span>
              <a href="#" class="footer-link">{{ currentLanguage === 'zh' ? '隐私声明' : 'Privacy Statement' }}</a>
              <span class="separator">|</span>
              <a href="#" class="footer-link">ISO27001</a>
            </div>
            
            <!-- 联系信息 -->
            <div class="footer-contact">
              <p>{{ currentLanguage === 'zh' ? '互联网违法和不良信息举报邮箱' : 'Report illegal and harmful information' }}   LD@axonlabs.com</p>
            </div>
            
            <!-- 版权信息 -->
            <div class="footer-copyright">
              <p>COPYRIGHT © AXON LABS {{ currentLanguage === 'zh' ? '羽山' : 'Yushan' }} ALL RIGHTS RESERVED    |    {{ currentLanguage === 'zh' ? '京公网安备 XXXXXX号    |    京ICP备XXXXX    |    营业执照' : 'Beijing Public Network Security No. XXXXXX    |    ICP No. XXXXXX    |    Business License' }}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import Navbar from './Navbar.vue'
import { useLanguage } from '../composables/useLanguage'

const { currentLanguage, isZh } = useLanguage()

// 时间线数据
const timelineData = ref([
  { 
    date: '2024.09', 
    color: '#B0D0C3',
    title: '标题标题',
    description: '北京玄圃科技有限公司成立于2024年，为国内领先的AI技术与智能硬件开发公司。AXON LABS羽山作为公司旗下最重要的品牌，以"AI为爱，智趣未来，AI for Love, Smart Fun Future"为品牌理念，以用户情感需求为导向，推动智能产品从功能工具向 "有温度的伙伴" 进化。'
  },
  { 
    date: '2024.09', 
    color: '#83D5B5',
    title: '标题标题',
    description: '北京玄圃科技有限公司成立于2024年，为国内领先的AI技术与智能硬件开发公司。'
  },
  { 
    date: '2024.09', 
    color: '#6AD9A1',
    title: '标题标题',
    description: '北京玄圃科技有限公司成立于2024年，为国内领先的AI技术与智能硬件开发公司。'
  },
  { 
    date: '2024.09', 
    color: '#40CF97',
    title: '标题标题',
    description: '北京玄圃科技有限公司成立于2024年，为国内领先的AI技术与智能硬件开发公司。'
  },
  { 
    date: '2024.09', 
    color: '#01CE7E',
    title: '标题标题',
    description: '北京玄圃科技有限公司成立于2024年，为国内领先的AI技术与智能硬件开发公司。'
  }
])

// 时间线悬停状态管理 - 简化为只需要展开索引
const expandedCardIndex = ref(-1)

// 品牌介绍“Learn More”展开
const isIntroExpanded = ref(false)
const handleLearnMore = () => {
  isIntroExpanded.value = true
}

// 获取覆盖层位置类名
const getOverlayPositionClass = (index: number) => {
  // 5个格子，index: 0, 1, 2, 3, 4
  if (index === 0) {
    return 'overlay-position-0' // 索引0：覆盖0,1,2
  } else if (index === 1) {
    return 'overlay-position-1' // 索引1：覆盖0,1,2
  } else if (index === 2) {
    return 'overlay-position-2' // 索引2：覆盖1,2,3
  } else if (index === 3) {
    return 'overlay-position-3' // 索引3：覆盖1,2,3
  } else {
    return 'overlay-position-4' // 索引4：覆盖2,3,4
  }
}

// 判断某个格子是否应该被隐藏（被图片覆盖）
const isCardHiddenByOverlay = (index: number) => {
  if (expandedCardIndex.value === -1) return false // 没有展开，不隐藏
  
  const expanded = expandedCardIndex.value
  
  // 根据展开的格子，判断哪些格子应该被隐藏
  if (expanded === 0) {
    // 展开0：隐藏0,1,2
    return index >= 0 && index <= 2
  } else if (expanded === 1) {
    // 展开1：隐藏0,1,2
    return index >= 0 && index <= 2
  } else if (expanded === 2) {
    // 展开2：隐藏1,2,3
    return index >= 1 && index <= 3
  } else if (expanded === 3) {
    // 展开3：隐藏1,2,3（不隐藏索引4）
    return index >= 1 && index <= 3
  } else {
    // 展开4：隐藏2,3,4
    return index >= 2 && index <= 4
  }
}

// 移动端点击卡片交互
const handleCardClick = (index: number) => {
  // 如果点击的是当前已展开的卡片，则收起
  if (expandedCardIndex.value === index) {
    expandedCardIndex.value = -1
  } else {
    // 否则展开当前点击的卡片
    expandedCardIndex.value = index
  }
}

// 移动端触摸结束时的处理（点击时间线外部区域收起）
const handleTimelineTouchEnd = (event: TouchEvent) => {
  // 如果点击的是时间线容器本身（而不是卡片），则收起
  if (event.target === event.currentTarget) {
    expandedCardIndex.value = -1
  }
}

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

// 全屏翻页滚动功能
const updateParallax = () => {
  const scrollY = window.pageYOffset
  const parallaxElements = document.querySelectorAll('.introduction-section, .history-section')
  
  parallaxElements.forEach((element) => {
    const htmlElement = element as HTMLElement
    if (!htmlElement) return
    
    // 检测是否为移动设备
    const isMobile = window.innerWidth <= 768
    
    if (isMobile) {
      // 移动端使用transform实现视差效果，性能更好
      const rect = htmlElement.getBoundingClientRect()
      const elementTop = rect.top + scrollY
      const elementHeight = htmlElement.offsetHeight
      const windowHeight = window.innerHeight
      
      // 当元素在视口内时计算视差偏移
      if (scrollY + windowHeight > elementTop && scrollY < elementTop + elementHeight) {
        const parallaxSpeed = 0.5 // 视差速度，0.5表示背景移动速度是滚动速度的一半
        const yPos = -(scrollY - elementTop) * parallaxSpeed
        htmlElement.style.backgroundPosition = `center ${yPos}px`
      }
    }
  })
}

let parallaxTicking = false
const handleParallaxScroll = () => {
  if (!parallaxTicking) {
    requestAnimationFrame(() => {
      updateParallax()
      parallaxTicking = false
    })
    parallaxTicking = true
  }
}

// 滚动到历史区域
const scrollToHistory = () => {
  scrollToSection(1) // 使用统一的滚动函数
}

// 全屏滚动功能
let currentSection = 0
const sections = ['introduction', 'history']
let isScrolling = false
let lastScrollTime = 0

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
    // 不阻止默认滚动行为，允许正常滚动
    return
  }
  
  // 对于其他区域，使用全屏翻页
  event.preventDefault()
  
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
  } else {
    // 找到最近的区域并对齐
    const nearestSection = Math.round(scrollTop / windowHeight)
    if (nearestSection < sections.length) {
      scrollToSection(nearestSection)
    }
  }
}

onMounted(() => {
  // 初始化页面位置
  setTimeout(() => {
    initializePagePosition()
  }, 100)

  // 大事件时间线动画 - 参考提供的代码实现
  const cards = document.querySelectorAll<HTMLElement>('.card')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up')
          observer.unobserve(entry.target) // 动画只执行一次
        }
      })
    },
    { threshold: 0.2 }
  )

  cards.forEach((card) => observer.observe(card))
  
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
  
  // 添加窗口大小变化监听，重新对齐页面
  window.addEventListener('resize', () => {
    setTimeout(() => {
      initializePagePosition()
    }, 200)
  })
  
  // 添加视差滚动效果监听器
  window.addEventListener('scroll', handleParallaxScroll, { passive: true })
  
  // 添加页脚区域的正常滚动支持
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // 当页脚可见时的处理逻辑（如果需要）
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
  window.removeEventListener('scroll', handleParallaxScroll)
})
</script>

<style scoped>
/* 字体定义 */
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
  background: url('/BG1.webp') no-repeat center center;
  background-size: cover;
  background-attachment: fixed; /* 启用视差滚动效果 */
  overflow: hidden;
}

.introduction-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2); /* 轻微遮罩确保文字可读性 */
  z-index: 1;
}


/* 历史区域背景 */
.history-section {
  position: relative;
  background: url('/BG2.webp') no-repeat center center;
  background-size: cover;
  background-attachment: fixed; /* 启用视差滚动效果 */
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
  font-size: 16px;
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
  height: 100vh; /* 容器也占满整个视口高度 */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0; /* 移除padding，避免影响绝对定位 */
  max-width: none; /* 移除最大宽度限制 */
  margin: 0; /* 移除自动居中的margin */
}

.section-content {
  position: absolute; /* 使用absolute，相对于introduction-section定位 */
  left: 200px; /* 1920*1080基准：距离左侧200px，与logo对齐 */
  bottom: 280px; /* 1920*1080基准：距离底部280px */
  max-width: 900px; /* 增加宽度，确保英文标题完整显示 */
  color: #ffffff;
  padding: 0; /* 移除padding */
  margin: 0; /* 移除margin */
  z-index: 10; /* 确保在其他内容之上 */
  transition: transform 400ms ease-out;
}

.section-content.expanded {
  transform: translateY(-10px);
}

/* 英文版本往下移动 */
.section-content.lang-en {
  bottom: 240px; /* 从280px减少到240px，往下移动40px */
}

.section-content.lang-en.expanded {
  bottom: 230px; /* 展开状态下也往下移动 */
}

/* 品牌介绍文字块（还原 index-text.webp 视觉样式） */
.intro-text {
  max-width: 650px; /* 减小宽度以匹配段落宽度 */
  transition: transform 400ms ease-out;
  text-align: left; /* 确保文字左对齐 */
}

.intro-text.expanded {
  transform: translateY(-5px);
}

.intro-title-en {
  font-family: 'MiSans-Demibold', 'MiSans', 'Noto Sans SC', sans-serif;
  font-weight: 600;
  font-size: 44px;
  line-height: 1.05;
  letter-spacing: 0.02em;
  margin: 0 0 6px 0;
  background: linear-gradient(to right, #01CE7E, #016840);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
}

.intro-title-cn {
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
  font-weight: 700;
  font-size: 28px;
  line-height: 1.1;
  margin: 0 0 12px 0;
  color: #ffffff;
}

.intro-paragraph {
  font-family: 'MiSans-Regular', 'MiSans', 'Noto Sans SC', sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.78);
  margin: 0 0 1rem 0;
  max-width: 600px;
}

/* 英文版本段落更宽的行宽 */
.intro-paragraph-en {
  max-width: 750px;
}

.intro-more {
  animation: intro-expand 400ms ease-out;
}

.intro-paragraph-last {
  margin-bottom: 1rem;
}

@keyframes intro-expand {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 品牌介绍按钮容器 */
.intro-button {
  margin: 0; /* 移除margin，完全左对齐 */
  padding: 0; /* 移除padding */
  display: flex; /* 使用flex布局 */
  justify-content: flex-start; /* 确保按钮左对齐 */
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
  background: linear-gradient(to right, #01CE7E, #016840); /* 绿色渐变从左到右 */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0; /* h2和h3距离为0 */
  letter-spacing: 0.1em;
  font-family: 'MiSans-Demibold', 'MiSans', 'Noto Sans SC', sans-serif;
  white-space: nowrap; /* 保持单行显示 */
}

.section-subtitle {
  font-size: 30px;
  color: #ffffff; /* 中文标题使用白色 */
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
  font-family: 'MiSans-Regular', 'MiSans', 'Noto Sans SC', sans-serif;
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
  transform: translateY(-5vh); /* 整体上移5% */
}

/* 大事件标题距离色块 - 减少间距 */
.history-content .section-subtitle {
  margin-bottom: 40px; /* 从76px减少到40px */
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
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  position: relative; /* 添加相对定位，作为覆盖层的参考 */
}

/* 移除展开和收起状态的flex变化 */

/* 被覆盖的格子：完全透明 - 添加延迟让图片先展开 */
.timeline-item.hidden-by-overlay .timeline-bar {
  opacity: 0 !important;
  transition: opacity 0.2s ease 0.1s; /* 延迟0.1s */
}

/* 其他未选中的格子：只改变透明度为50%，不变暗 */
.timeline-item.dimmed-card .timeline-bar {
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

/* 卡片强制始终可见 */
.card {
  opacity: 1 !important; /* 强制始终可见，不会为0 */
  transform: translateY(40px);
  transition: all 0.8s ease;
}

/* 进入视口时添加的动画效果 */
.card.fade-in-up {
  opacity: 1 !important; /* 强制始终可见 */
  transform: translateY(0);
}

/* 悬停时的效果 - 移除scale，保持原位 */
.card:hover {
  /* transform: scale(1.1); */ /* 移除放大效果 */
  /* box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3); */ /* 移除阴影 */
  opacity: 1 !important; /* 强制始终可见 */
}

/* 其他卡片变浅效果 - 最低透明度0.4，绝不为0 */
.card.card-dimmed {
  opacity: 0.4 !important; /* 最浅状态，但绝不为0 */
  transition: opacity 0.3s ease;
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
  transition: opacity 0.3s ease;
  /* 年份文字紧贴时间线方框底部 */
}

/* 其他未选中的年份：透明度50% */
.timeline-date.dimmed-date {
  opacity: 0.5;
}

/* 展开内容样式 - 改为覆盖层 */
.timeline-expanded-overlay {
  position: absolute;
  top: 0;
  width: 300%; /* 3个格子的宽度 */
  height: 400px;
  z-index: 10;
  animation: expandAnimation 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  pointer-events: none; /* 不阻挡下面元素的点击 */
  transform-origin: center center;
}

/* 索引0：从当前位置开始向右，覆盖0,1,2 */
.overlay-position-0 {
  left: 0;
}

/* 索引1：从当前位置向左1个格子，覆盖0,1,2 */
.overlay-position-1 {
  left: -100%;
}

/* 索引2：从当前位置向左1个格子，覆盖1,2,3 */
.overlay-position-2 {
  left: -100%;
}

/* 索引3：从当前位置向左2个格子，覆盖1,2,3（不覆盖索引4） */
.overlay-position-3 {
  left: -200%;
}

/* 索引4：从当前位置向左2个格子，覆盖2,3,4 */
.overlay-position-4 {
  left: -200%;
}

@keyframes expandAnimation {
  from {
    opacity: 0;
    transform: scaleX(0.3) scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: scaleX(1) scaleY(1);
  }
}

.expanded-image {
  width: 100%;
  height: 400px; /* 与timeline-bar一样的高度 */
  object-fit: cover; /* 完全填充，裁剪多余部分 */
  display: block;
}

/* 页脚 */
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
}

/* 社交媒体图标 */
.social-icons {
  display: flex;
  justify-content: flex-start;
  gap: 0.8rem; /* 从1rem缩小到0.8rem */
  margin-bottom: 12px; /* 从15px缩小到12px */
}

.social-icon {
  display: inline-block;
  width: 20px; /* 从24px缩小到20px */
  height: 20px; /* 从24px缩小到20px */
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
  height: 75px; /* 从90px缩小到75px */
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
  font-size: 14px; /* 从16px缩小到14px */
  height: 20px; /* 从24px缩小到20px */
}

.footer-link {
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #01CE7E;
}

.separator {
  color: #ffffff;
  margin: 0 0.25rem;
}

/* 联系信息 */
.footer-contact {
  height: 20px; /* 从24px缩小到20px */
  display: flex;
  align-items: center;
}

.footer-contact p {
  color: #9E9E9E;
  font-size: 14px; /* 从16px缩小到14px */
  margin: 0;
  text-align: left;
}

/* 版权信息 */
.footer-copyright {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  min-height: 20px; /* 从固定高度改为最小高度，允许内容换行 */
  display: flex;
  align-items: center;
}

.footer-copyright p {
  color: #9E9E9E;
  font-size: 14px; /* 从16px缩小到14px */
  margin: 0;
  line-height: 1.4;
  text-align: left;
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
    left: 150px; /* 200px * 0.75，与logo左对齐 */
    bottom: 210px; /* 280px * 0.75 */
    max-width: 700px; /* 增加最大宽度，确保英文标题完整显示 */
  }
  
  .section-content.lang-en {
    bottom: 180px; /* 往下移动30px */
  }
  
  .section-content.lang-en.expanded {
    bottom: 173px;
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
    left: 120px; /* 200px * 0.6，与logo左对齐 */
    bottom: 168px; /* 280px * 0.6 */
    max-width: 600px; /* 增加最大宽度，确保英文标题完整显示 */
  }
  
  .section-content.lang-en {
    bottom: 144px; /* 往下移动24px */
  }
  
  .section-content.lang-en.expanded {
    bottom: 138px;
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
    height: 120px; /* 200px * 0.6 */
    padding: 24px 0; /* 40px * 0.6 */
  }
  
  .footer-content {
    margin-left: 330px; /* logo位置120px + logo宽度150px + 间距60px = 330px */
    max-width: 500px;
  }
  
  .social-icons {
    margin-bottom: 9px; /* 15px * 0.6 */
  }
  
  .footer-text-area {
    height: 54px; /* 90px * 0.6 */
  }
  
  .footer-links {
    height: 14.4px; /* 24px * 0.6 */
  }
  
  .footer-contact {
    height: 14.4px; /* 24px * 0.6 */
  }
  
  .footer-copyright {
    height: 14.4px; /* 24px * 0.6 */
  }
  
  .social-icon {
    width: 18px; /* 24px * 0.75 */
    height: 18px; /* 24px * 0.75 */
  }
  
  .footer-logo-img {
    width: 150px; /* 250px * 0.6 */
    height: auto;
  }
  
  .footer-links {
    font-size: 9.6px; /* 16px * 0.6 */
  }
  
  .footer-contact p,
  .footer-copyright p {
    font-size: 9.6px; /* 16px * 0.6 */
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
    margin-bottom: 57px; /* 76px * 0.75 */
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
    /* 移动端禁用background-attachment: fixed，使用JavaScript实现视差效果 */
    background-attachment: scroll;
  }
  
  
  .history-section {
    /* 移动端禁用background-attachment: fixed */
    background-attachment: scroll;
    display: flex; /* 使用flex布局 */
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    min-height: 100vh; /* 最小高度为一屏 */
  }
  
  .history-content {
    padding-top: 0; /* 移除顶部padding，使用flex居中 */
    padding-bottom: 0;
    transform: none; /* 移除原有的transform */
  }
  
  .history-content .section-subtitle {
    margin-bottom: 30px; /* 调整副标题与色块的间距 */
  }
  
  .section-content {
    left: 20px; /* 与logo左对齐 */
    bottom: auto; /* 改为自动定位 */
    top: 50px; /* 从顶部开始，确保标题可见 */
    max-width: calc(100% - 40px); /* 调整最大宽度 */
    position: relative; /* 改为相对定位，避免被遮挡 */
  }
  
  .section-content.lang-en {
    top: 50px; /* 英文版本也从顶部开始 */
  }
  
  .section-content.lang-en.expanded {
    top: 50px; /* 展开后也保持顶部位置 */
  }
  
  /* 移动端品牌介绍区域容器调整 */
  .introduction-section {
    height: auto; /* 改为自动高度，允许内容撑开 */
    min-height: 100vh; /* 最小高度为一屏 */
    overflow-y: auto; /* 允许垂直滚动 */
  }
  
  .introduction-section .section-container {
    height: auto; /* 改为自动高度 */
    min-height: 100vh; /* 最小高度为一屏 */
    align-items: flex-start; /* 顶部对齐 */
    padding-top: 20px; /* 添加顶部内边距 */
    padding-bottom: 40px; /* 添加底部内边距，确保内容完整显示 */
  }
  
  /* 品牌介绍文字移动端适配 */
  .intro-text { max-width: 92vw; text-align: left; }
  .intro-title-en { font-size: 26px; white-space: normal; }
  .intro-title-cn { font-size: 18px; }
  .intro-paragraph { font-size: 12px; line-height: 1.7; max-width: 92vw; margin-bottom: 0.9rem !important; text-align: left; }
  .intro-paragraph br { display: none; } /* 移动端隐藏br标签，让文字自然换行 */
  .intro-paragraph-en { max-width: 95vw; text-align: left; }
  .intro-paragraph-en br { display: none; } /* 移动端隐藏br标签 */
  .intro-paragraph-last { margin-bottom: 0.9rem !important; text-align: left; }
  .intro-paragraph-last br { display: none; } /* 移动端隐藏br标签 */
  
  /* 移动端展开后优化布局 */
  .intro-text.expanded {
    transform: none; /* 移除向上移动，保持原位 */
  }
  
  .section-content.expanded {
    transform: none; /* 移除向上移动，保持原位 */
  }
  
  /* Learn More按钮移动端样式 */
  .learn-more-btn {
    padding: 0.6rem 1.5rem; /* 减小按钮尺寸 */
    font-size: 0.75rem; /* 减小字体 */
  }
  
  /* 滚动箭头移动端样式 */
  .scroll-indicator {
    bottom: 30px; /* 调整位置 */
  }
  
  .scroll-arrow-img {
    width: 28px;
    height: 26px;
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
    flex-direction: row; /* 横向排列 */
    gap: 0; /* 无间距，紧密相连 */
    max-width: 100%; /* 使用全宽 */
    padding: 0 1rem; /* 左右内边距 */
    justify-content: center; /* 居中对齐 */
    flex-wrap: nowrap; /* 不换行 */
  }
  
  .timeline-bar {
    height: 100px; /* 紧凑高度 */
    width: 58px; /* 紧凑宽度，5个色块约290px */
    flex-shrink: 0; /* 防止压缩 */
  }
  
  .timeline-item {
    display: flex;
    flex-direction: column; /* 垂直排列：色块+日期 */
    align-items: center;
    flex-shrink: 0; /* 防止压缩 */
    position: relative;
  }
  
  .timeline-date {
    margin-top: 0.4rem;
    font-size: 0.7rem;
    color: #cccccc;
    text-align: center;
    white-space: nowrap; /* 不换行 */
  }
  
  /* 移动端覆盖层 - 完全复刻桌面端，覆盖3个格子 */
  .timeline-expanded-overlay {
    position: absolute;
    top: 0;
    width: 300%; /* 覆盖3个格子的宽度 */
    height: 100px; /* 与色块高度一致 */
    z-index: 10;
    animation: expandAnimation 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    pointer-events: none; /* 不阻挡下面元素的点击 */
    transform-origin: center center;
  }
  
  /* 移动端覆盖层位置类 */
  .overlay-position-0 {
    left: 0;
  }
  
  .overlay-position-1 {
    left: -100%;
  }
  
  .overlay-position-2 {
    left: -100%;
  }
  
  .overlay-position-3 {
    left: -200%;
  }
  
  .overlay-position-4 {
    left: -200%;
  }
  
  .expanded-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* 移动端保持桌面端的隐藏逻辑 */
  .timeline-item.hidden-by-overlay .timeline-bar {
    opacity: 0 !important;
    transition: opacity 0.2s ease 0.1s;
  }
  
  /* 移动端保持桌面端的变暗效果 */
  .timeline-item.dimmed-card .timeline-bar {
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }
  
  /* 移除交互样式，只保留基础时间线样式 */
  
  .history-section {
    display: flex; /* 使用flex布局 */
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    min-height: 100vh; /* 最小高度为一屏 */
  }
  
  .history-content {
    padding-top: 0; /* 移除顶部padding，使用flex居中 */
    padding-bottom: 0;
    transform: none; /* 移除原有的transform */
  }
  
  .history-content .section-subtitle {
    margin-bottom: 20px; /* 调整副标题与色块的间距 */
  }
  

  
  /* 页脚响应式 */
  .footer-logo {
    left: 100px; /* 200px * 0.5 */
  }
  
  .footer {
    height: 100px; /* 200px * 0.5 */
    padding: 20px 0; /* 40px * 0.5 */
  }
  
  .footer-content {
    margin-left: 275px; /* logo位置100px + logo宽度125px + 间距50px = 275px */
    max-width: 400px;
  }
  
  .social-icons {
    margin-bottom: 7.5px; /* 15px * 0.5 */
  }
  
  .footer-text-area {
    height: 45px; /* 90px * 0.5 */
  }
  
  .footer-links {
    height: 12px; /* 24px * 0.5 */
  }
  
  .footer-contact {
    height: 12px; /* 24px * 0.5 */
  }
  
  .footer-copyright {
    height: 12px; /* 24px * 0.5 */
  }
  
  .social-icon {
    width: 16px; /* 24px * 0.67 */
    height: 16px; /* 24px * 0.67 */
  }
  
  .footer-logo-img {
    width: 125px; /* 250px * 0.5 */
    height: auto;
  }
  
  .footer-links {
    font-size: 8px; /* 16px * 0.5 */
  }
  
  .footer-contact p,
  .footer-copyright p {
    font-size: 8px; /* 16px * 0.5 */
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
    margin-bottom: 46px; /* 76px * 0.6 */
  }
  

  
  /* 页脚响应式 */
  .footer-logo {
    left: 150px; /* 200px * 0.75 */
  }
  
  .footer {
    height: 150px; /* 200px * 0.75 */
    padding: 30px 0; /* 40px * 0.75 */
  }
  
  .footer-content {
    max-width: 600px;
    padding-left: 1.5rem;
    margin-left: 412.5px; /* logo位置150px + logo宽度187.5px + 间距75px = 412.5px */
  }
  
  .social-icons {
    margin-bottom: 11.25px; /* 15px * 0.75 */
    gap: 0.8rem;
  }
  
  .footer-text-area {
    height: 67.5px; /* 90px * 0.75 */
  }
  
  .footer-links {
    height: 18px; /* 24px * 0.75 */
  }
  
  .footer-contact {
    height: 18px; /* 24px * 0.75 */
  }
  
  .footer-copyright {
    height: 18px; /* 24px * 0.75 */
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
    justify-content: center; /* 移动端居中 */
    font-size: 12px; /* 16px * 0.75 */
    gap: 0.4rem;
  }
  
  .footer-contact p,
  .footer-copyright p {
    font-size: 12px; /* 16px * 0.75 */
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
    left: 15px; /* 与logo左对齐 */
    bottom: auto; /* 改为自动定位 */
    top: 40px; /* 从顶部开始，确保标题可见 */
    max-width: calc(100% - 30px); /* 限制最大宽度 */
    position: relative; /* 改为相对定位，避免被遮挡 */
  }
  
  .section-content.lang-en {
    top: 40px; /* 英文版本也从顶部开始 */
  }
  
  .section-content.lang-en.expanded {
    top: 40px; /* 展开后也保持顶部位置 */
  }
  
  /* 小屏幕品牌介绍区域容器调整 */
  .introduction-section {
    height: auto; /* 改为自动高度，允许内容撑开 */
    min-height: 100vh; /* 最小高度为一屏 */
    overflow-y: auto; /* 允许垂直滚动 */
  }
  
  .introduction-section .section-container {
    height: auto; /* 改为自动高度 */
    min-height: 100vh; /* 最小高度为一屏 */
    align-items: flex-start; /* 顶部对齐 */
    padding-top: 15px; /* 添加顶部内边距 */
    padding-bottom: 40px; /* 添加底部内边距，确保内容完整显示 */
  }
  
  /* 品牌介绍文字小屏适配 */
  .intro-text { max-width: 94vw; text-align: left; }
  .intro-title-en { font-size: 24px; }
  .intro-title-cn { font-size: 16px; }
  .intro-paragraph { font-size: 11px; line-height: 1.65; max-width: 94vw; margin-bottom: 0.8rem !important; text-align: left; }
  .intro-paragraph br { display: none; } /* 小屏幕隐藏br标签，让文字自然换行 */
  .intro-paragraph-en { max-width: 96vw; text-align: left; }
  .intro-paragraph-en br { display: none; } /* 小屏幕隐藏br标签 */
  .intro-paragraph-last { margin-bottom: 0.8rem !important; text-align: left; }
  .intro-paragraph-last br { display: none; } /* 小屏幕隐藏br标签 */
  
  /* 小屏幕展开后优化布局 */
  .intro-text.expanded {
    transform: none; /* 移除向上移动，保持原位 */
  }
  
  .section-content.expanded {
    transform: none; /* 移除向上移动，保持原位 */
  }
  
  /* Learn More按钮小屏幕样式 */
  .learn-more-btn {
    padding: 0.5rem 1.2rem; /* 进一步减小按钮尺寸 */
    font-size: 0.65rem; /* 进一步减小字体 */
  }
  
  /* 滚动箭头小屏幕样式 */
  .scroll-indicator {
    bottom: 20px; /* 调整位置 */
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
    flex-direction: row; /* 横向排列 */
    gap: 0; /* 无间距，紧密相连 */
    max-width: 100%; /* 使用全宽 */
    padding: 0 0.5rem; /* 减小左右内边距 */
    justify-content: center; /* 居中对齐 */
    flex-wrap: nowrap; /* 不换行 */
  }
  
  .timeline-bar {
    height: 80px; /* 更紧凑高度 */
    width: 50px; /* 更紧凑宽度，5个色块约250px */
    flex-shrink: 0; /* 防止压缩 */
  }
  
  .timeline-item {
    display: flex;
    flex-direction: column; /* 垂直排列：色块+日期 */
    align-items: center;
    flex-shrink: 0; /* 防止压缩 */
    position: relative;
  }
  
  .timeline-date {
    margin-top: 0.3rem;
    font-size: 0.65rem;
    color: #cccccc;
    text-align: center;
    white-space: nowrap; /* 不换行 */
  }
  
  /* 小屏幕覆盖层 - 完全复刻桌面端，覆盖3个格子 */
  .timeline-expanded-overlay {
    position: absolute;
    top: 0;
    width: 300%; /* 覆盖3个格子的宽度 */
    height: 80px; /* 与色块高度一致 */
    z-index: 10;
    animation: expandAnimation 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    pointer-events: none; /* 不阻挡下面元素的点击 */
    transform-origin: center center;
  }
  
  /* 小屏幕覆盖层位置类 */
  .overlay-position-0 {
    left: 0;
  }
  
  .overlay-position-1 {
    left: -100%;
  }
  
  .overlay-position-2 {
    left: -100%;
  }
  
  .overlay-position-3 {
    left: -200%;
  }
  
  .overlay-position-4 {
    left: -200%;
  }
  
  .expanded-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* 小屏幕保持桌面端的隐藏逻辑 */
  .timeline-item.hidden-by-overlay .timeline-bar {
    opacity: 0 !important;
    transition: opacity 0.2s ease 0.1s;
  }
  
  /* 小屏幕保持桌面端的变暗效果 */
  .timeline-item.dimmed-card .timeline-bar {
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }
  
  /* 移除交互样式，只保留基础时间线样式 */
  
  .history-section {
    display: flex; /* 使用flex布局 */
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    min-height: 100vh; /* 最小高度为一屏 */
  }
  
  .history-content {
    padding-top: 0; /* 移除顶部padding，使用flex居中 */
    padding-bottom: 0;
    transform: none; /* 移除原有的transform */
  }
  
  .history-content .section-subtitle {
    margin-bottom: 20px; /* 调整副标题与色块的间距 */
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
    height: 9.6px; /* 24px * 0.4 */
    justify-content: center; /* 移动端居中 */
  }
  
  .footer-contact {
    height: 9.6px; /* 24px * 0.4 */
  }
  
  .footer-copyright {
    height: 9.6px; /* 24px * 0.4 */
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
    font-size: 6.4px; /* 16px * 0.4 */
    gap: 0.3rem;
  }
  
  .footer-contact p,
  .footer-copyright p {
    font-size: 6.4px; /* 16px * 0.4 */
    text-align: center; /* 移动端居中 */
  }
}
</style>
