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
        AXON LABS羽山成立于2024年，我们是一家新锐科技公司，正在打造面向年轻消费市场的"潮流科技"品牌。设计至上、体验为王，结合AI技术，打造"实用好物，科技潮玩"，以设计驱动情绪价值，让科技更有温度。
      </p>
      <p class="intro-paragraph intro-paragraph-en" v-else>
        AXON LABS Yushan was founded in 2024. We are a cutting-edge technology company building a "trendy tech" brand targeting the young consumer market. Design-first and experience-driven, we combine AI technology to create "practical goods, tech toys", driving emotional value through design, making technology more warm.
      </p>
        <div v-show="isIntroExpanded" class="intro-more">
                <p class="intro-paragraph" v-if="isZh">
                 "羽山"是《山海经》中的上古神山，象征着华夏先民对宇宙万物的求索。我们要做的，是利用AI与硬件技术的深度融合，重塑科技产品的"生命逻辑"。
                </p>
                <p class="intro-paragraph intro-paragraph-en" v-else>
                 "Yushan" is an ancient sacred mountain in the Classic of Mountains and Seas, symbolizing the Chinese ancestors' quest for the universe. What we aim to do is deeply integrate AI with hardware technology to reshape the "life logic" of tech products.
                </p>
                <p class="intro-paragraph" v-if="isZh">
                 AXON LABS追求的产品，即是实用好物也是潮流玩具，融入现实生活场景，好看好玩又好用。我们有自研IP——Loomi噜咪、同时与全球顶级科幻、二次元游戏、文体明星等知名IP联名，辐射多领域需求。2026年，随着LOOMI系列的上市，AXON LABS将逐步搭建并完善AI智能陪伴软硬件生态，全面渗透居家、办公、出行等生活场景。
                </p>
                <p class="intro-paragraph intro-paragraph-en" v-else>
                 AXON LABS pursues products that are both practical goods and trendy toys, integrating into real-life scenarios—beautiful, fun, and useful. We have our own IP—Loomi, and collaborate with top global sci-fi, anime game, and celebrity IPs, meeting diverse needs. In 2026, with the launch of the LOOMI series, AXON LABS will gradually build and perfect an AI intelligent companion software and hardware ecosystem, fully penetrating home, office, and travel scenarios.
                </p>
                <p class="intro-paragraph" v-if="isZh">
                 AXON LABS聚集海内外顶尖人才，团队成员覆盖人工智能、具身机器人、潮玩设计、游戏开发等多个领域。其中，人工智能领域人才深耕机器学习、自然语言处理与计算机视觉技术；具身机器人团队由机械工程、感知控制、人机交互专家组成；潮玩设计曾打造多款现象级IP，平台累计销量破亿。
                </p>
                <p class="intro-paragraph intro-paragraph-en" v-else>
                 AXON LABS gathers top talent from home and abroad, with team members covering AI, embodied robotics, trendy toy design, game development, and more. AI talent focuses on machine learning, natural language processing, and computer vision; the embodied robotics team consists of mechanical engineering, perception control, and human-computer interaction experts; trendy toy design has created multiple phenomenal IPs with cumulative platform sales exceeding 100 million.
                </p>
                <p class="intro-paragraph intro-paragraph-last" v-if="isZh">
                 2026年，当科技与潮玩的边界彻底模糊，我们或许不再需要定义"什么是玩具，什么是工具"。希望在我们的手中，每一个硬件都将拥有自己的名字，每一段电力交互，都将是一次有温度的重逢。
                </p>
                <p class="intro-paragraph intro-paragraph-last intro-paragraph-en" v-else>
                 In 2026, when the boundary between technology and trendy toys completely blurs, we may no longer need to define "what is a toy, what is a tool." We hope that in our hands, every hardware will have its own name, and every power interaction will be a warm reunion.
                </p>
            </div>
            <div class="intro-button">
              <button v-if="!isIntroExpanded" class="learn-more-btn" @click="handleLearnMore">Learn More</button>
            </div>
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
                <!-- 色块 - 始终显示，使用 history1-4 图片作为背景 -->
                <div class="timeline-bar timeline-bar-img" 
                     :style="{ backgroundImage: `url(/history${index + 1}.png)` }">
                </div>
                <!-- 展开状态：图片覆盖层 -->
                <div v-if="expandedCardIndex === index" 
                     class="timeline-expanded-overlay"
                     :class="getOverlayPositionClass(index)">
                  <img :src="`/history${index + 1}-${index + 1}.png`" alt="历史事件" class="expanded-image" />
                </div>
                <div class="timeline-date" 
                     :class="{ 'dimmed-date': expandedCardIndex !== -1 && expandedCardIndex !== index }">
                  {{ item.date }}
                </div>
              </div>
              <!-- 固定的"CONSTANLY UPDATING"色块 -->
              <div class="timeline-item timeline-item-fixed" 
                   :class="{ 'dimmed-card': expandedCardIndex !== -1 }">
                <div class="timeline-bar timeline-bar-fixed timeline-bar-img" 
                     :style="{ backgroundImage: 'url(/history5.png)' }">
                  <div class="constantly-updating-text">
                    <span>CONSTANLY</span>
                    <span>UPDATING</span>
                  </div>
                </div>
                <div class="timeline-date timeline-date-hidden" 
                     :class="{ 'dimmed-date': expandedCardIndex !== -1 }">
                  2026
                </div>
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
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
import { useLanguage } from '../composables/useLanguage'

const { currentLanguage, isZh } = useLanguage()

// 时间线数据
const timelineData = ref([
  { 
    date: '2024.09', 
    color: '#B0D0C3',
    title: 'AXON LABS成立',
    description: '北京玄圃科技有限公司成立于2024年，为国内新锐的AI技术与智能硬件开发公司。AXON LABS羽山作为公司旗下最重要的品牌，利用AI与硬件技术的深度融合，重塑科技产品的"生命逻辑"。以用户情感需求为导向，推动智能产品从功能工具向"有温度的伙伴"进化。'
  },
  { 
    date: '2025.06', 
    color: '#83D5B5',
    title: '"三体"机器人项目启动',
    description: '2024年9月，AXON LABS羽山品牌旗下系列AXON ROBO与"三体宇宙"旗下《三体》IP联名项目启动，以"章北海"为原型开发的第一款"具身智能机器人"进入研发阶段。'
  },
  { 
    date: '2025.07', 
    color: '#6AD9A1',
    title: '自研IP"Loomi噜咪"项目启动',
    description: 'AXON LABS羽山旗下首个智能潮玩系列"LOOMI鹿米"立项，它的首款产品为自研IP"Loomi噜咪"AI 智能玩具，这是一款以 "时尚美观，情感陪伴" 为核心定位的潮流数码单品，同年9月正式进入IP创作及产品研发阶段。'
  },
  { 
    date: '2026.02', 
    color: '#40CF97',
    title: 'Loomi噜咪AI智能充电宝上市',
    description: '作为LOOMI鹿米系列的开山作，Loomi噜咪AI智能充电宝在2026年2月春节期间上市，动作即语境、感知即回应、可进化的"生命体"为这款产品的特点。'
  }
])

// 时间线悬停状态管理 - 简化为只需要展开索引
const expandedCardIndex = ref(-1)

// 品牌介绍“Learn More”展开
const isIntroExpanded = ref(false)
const handleLearnMore = (event: Event) => {
  event.stopPropagation() // 阻止事件冒泡，防止触发 handlePageClick
  isIntroExpanded.value = true
}

// 点击页面任意位置后还原品牌介绍
const handlePageClick = (event: Event) => {
  const target = event.target as HTMLElement
  
  // 如果品牌介绍已展开
  if (isIntroExpanded.value) {
    // 检查点击的元素是否在品牌介绍文字区域内（intro-text 或 intro-more）
    const introText = document.querySelector('.intro-text')
    const introMore = document.querySelector('.intro-more')
    const introButton = document.querySelector('.intro-button')
    
    // 如果点击的不是品牌介绍文字区域内的元素，则还原
    const isInIntroText = introText && introText.contains(target)
    const isInIntroMore = introMore && introMore.contains(target)
    const isInIntroButton = introButton && introButton.contains(target)
    
    if (!isInIntroText && !isInIntroMore && !isInIntroButton) {
      isIntroExpanded.value = false
    }
  }
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
  
  // 添加点击页面任意位置还原品牌介绍的事件监听
  window.addEventListener('click', handlePageClick)

  // 大事件时间线动画 - 卡片与固定块一起入场，最终都 translateY(0)，避免色块5低一截
  const cards = document.querySelectorAll<HTMLElement>('.card')
  const fixedTimelineItem = document.querySelector<HTMLElement>('.timeline-item-fixed')

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
  if (fixedTimelineItem) observer.observe(fixedTimelineItem)
  
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
  
  // 添加点击空白处隐藏下拉菜单的事件监听
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  // 清理事件监听器
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('click', handlePageClick)
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
  overflow: visible; /* 展开覆盖层图片可伸出不裁切 */
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
  overflow: visible;
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

/* 时间线 - 任意尺寸下保持悬停/点击展开、覆盖层、变暗交互一致 */
.timeline {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 0; /* 确保无缝隙 */
  margin: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
  padding: 0;
  max-width: 1220px; /* 5个色块 * 244px = 1220px，1920*1080基准 */
  overflow: visible;
  touch-action: manipulation;
  font-size: 0; /* 消除 HTML 换行符导致的空格，参考泡泡马特 */
  letter-spacing: 0;
  word-spacing: 0;
}



.timeline-item {
  flex: 0 0 244px; /* 固定宽度，与 timeline-bar 一致 */
  display: flex;
  flex-direction: column;
  align-items: stretch; /* 拉伸填充，确保色块填满 */
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  width: 244px;
  margin: 0; /* 确保没有 margin */
  padding: 0; /* 确保没有 padding */
  position: relative; /* 添加相对定位，作为覆盖层的参考 */
  overflow: visible; /* 展开覆盖层可伸出 */
  box-sizing: border-box;
  border: none;
  outline: none;
  vertical-align: top; /* 参考泡泡马特，消除垂直对齐空隙 */
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

/* 固定块同样入场后 translateY(0)，与左侧四块顶对齐 */
.timeline-item-fixed.fade-in-up {
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
  height: 400px !important; /* 1920*1080基准高度400px，使用!important确保不被覆盖 */
  min-height: 400px !important; /* 确保最小高度一致 */
  max-height: 400px !important; /* 确保最大高度一致 */
  width: 100%; /* 使用 100% 填满父容器 */
  margin: 0 0 1rem 0; /* 底部 margin 用于日期间距 */
  padding: 0; /* 确保没有 padding */
  flex-shrink: 0;
  box-sizing: border-box;
  border: none; /* 确保没有边框 */
  outline: none;
  display: block; /* 参考泡泡马特，确保是块级元素 */
}

/* 展开前色块使用 history1-5 图片作为背景，完全填充无缝隙 */
.timeline-bar-img {
  background-size: 103.5% 104%; /* 宽度103%稍微放大，消除可能的透明边缘 */
  background-position: center center;
  background-repeat: no-repeat;
  border: none;
  outline: none;
  /* 不设置高度相关属性，使用父元素的高度设置 */
}

/* 固定的"CONSTANLY UPDATING"色块 */
.timeline-item-fixed {
  flex: 0 0 244px; /* 固定宽度，不伸缩 */
  width: 244px;
  margin: 0; /* 移除底部 margin，让色块本身控制间距 */
  padding: 0; /* 确保没有 padding */
  cursor: default; /* 不可点击 */
  pointer-events: none; /* 不响应鼠标事件 */
  transform: translateY(40px); /* 与其他色块对齐 */
  transition: all 0.8s ease;
  box-sizing: border-box;
  border: none;
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  vertical-align: top; /* 参考泡泡马特，消除垂直对齐空隙 */
}

.timeline-bar-fixed {
  height: 400px !important; /* 与其他色块一致的高度，使用!important确保不被覆盖 */
  min-height: 400px !important;
  max-height: 400px !important;
  width: 100%; /* 完全填满父容器 */
  margin: 0 0 1rem 0; /* 底部 margin 与其他色块完全一致 */
  padding: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden; /* 确保内容不会超出高度 */
}

.constantly-updating-text {
  position: absolute;
  color: #000000; /* 黑色文字 */
  font-size: 12px;
  font-weight: 600;
  font-family: 'MiSans-Demibold', 'MiSans', 'Noto Sans SC', sans-serif;
  text-align: center;
  letter-spacing: 0.15em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.constantly-updating-text span {
  display: block;
  line-height: 1.2;
}

/* 当其他内容被选中时，固定色块也变浅 */
.timeline-item-fixed.dimmed-card .timeline-bar-fixed {
  opacity: 0.5;
  transition: opacity 0.3s ease;
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

/* 色块五的日期设置为隐藏 */
.timeline-date-hidden {
  visibility: hidden; /* 隐藏但保留占位空间 */
  /* 或者使用 display: none; 完全隐藏不占位 */
}

/* 展开内容样式 - 改为覆盖层 */
.timeline-expanded-overlay {
  position: absolute;
  top: 0;
  width: 300%; /* 3个格子的宽度 */
  height: 400px !important; /* 与timeline-bar一致的高度，使用!important确保不被覆盖 */
  min-height: 400px !important; /* 确保最小高度一致 */
  max-height: 400px !important; /* 确保最大高度一致 */
  z-index: 10;
  animation: expandAnimation 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  pointer-events: none; /* 不阻挡下面元素的点击 */
  transform-origin: center center;
  overflow: hidden; /* 确保内容不会超出高度 */
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
  min-width: 200px;
  height: 400px !important; /* 与timeline-bar一样的高度，使用!important确保不被覆盖 */
  min-height: 400px !important; /* 与timeline-bar一致的最小高度 */
  max-height: 400px !important; /* 与timeline-bar一致的最大高度 */
  object-fit: cover; /* 完全填充，裁剪多余部分 */
  display: block;
  vertical-align: top;
}

/* 展开内容文字样式 */
.timeline-expanded-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%; /* 只占左侧50% */
  padding: 30px 40px 25px;
  color: #000000; /* 黑色文字 */
  z-index: 11;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: left;
}

.timeline-expanded-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #000000; /* 黑色文字 */
  line-height: 1.2;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
  white-space: nowrap; /* 确保标题在一行显示 */
}

.timeline-expanded-description {
  font-size: 1rem;
  line-height: 1.7;
  color: #000000; /* 黑色文字 */
  margin: 0;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
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

/* 1220 宽下大事件时间线收窄为 1090，交互与桌面一致 */
@media (max-width: 1220px) {
  .timeline {
    max-width: 1090px;
    overflow: visible;
  }
  
  .timeline-item.card {
    flex: 0 0 182px;
    overflow: visible;
    cursor: pointer;
  }
  
  .timeline-bar {
    width: 182px;
    height: 298px !important;
    min-height: 298px !important;
    max-height: 298px !important;
  }
  
  .timeline-item-fixed {
    flex: 0 0 182px;
  }
  
  .timeline-bar-fixed {
    height: 298px !important;
    min-height: 298px !important;
    max-height: 298px !important;
  }
  
  .timeline-expanded-overlay {
    height: 298px !important;
    min-height: 298px !important;
    max-height: 298px !important;
  }
  
  .expanded-image {
    height: 298px !important;
    min-height: 298px !important;
    max-height: 298px !important;
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
  
  
  .timeline {
    max-width: 732px; /* 1220px * 0.6 */
    overflow: visible;
  }
  
  .timeline-bar {
    height: 240px !important; /* 400px * 0.6 */
    min-height: 240px !important;
    max-height: 240px !important;
    width: 146px; /* 244px * 0.6 */
  }
  
  .timeline-bar-fixed {
    height: 240px !important;
    min-height: 240px !important;
    max-height: 240px !important;
  }
  
  .timeline-item {
    overflow: visible;
    cursor: pointer;
  }
  
  .timeline-expanded-overlay {
    height: 240px !important;
    min-height: 240px !important;
    max-height: 240px !important;
  }
  
  .expanded-image {
    height: 240px !important;
    min-height: 240px !important;
    max-height: 240px !important;
  }
  
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
    flex-direction: row;
    gap: 0;
    max-width: 100%;
    padding: 0 1rem;
    justify-content: center;
    flex-wrap: nowrap;
    overflow: visible;
    touch-action: manipulation; /* 减少触屏点击延迟，保持交互一致 */
  }
  
  .timeline-bar {
    height: 100px !important;
    min-height: 100px !important;
    max-height: 100px !important;
    width: 58px;
    flex-shrink: 0;
  }
  
  .timeline-bar-fixed {
    height: 100px !important;
    min-height: 100px !important;
    max-height: 100px !important;
  }
  
  .timeline-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    position: relative;
    overflow: visible;
    cursor: pointer;
  }
  
  .timeline-item-fixed {
    flex: 0 0 58px;
  }
  
  .constantly-updating-text {
    font-size: 8px; /* 中等屏幕字体 */
    letter-spacing: 0.1em;
    padding: 0 6px;
    color: #000000; /* 黑色文字 */
  }
  
  .constantly-updating-text span {
    display: block;
    line-height: 1.2;
  }
  
  .timeline-date {
    margin-top: 0.4rem;
    font-size: 0.7rem;
    color: #cccccc;
    text-align: center;
    white-space: nowrap; /* 不换行 */
  }
  
  /* 移动端覆盖层 - 与桌面端一致：覆盖3格、隐藏/变暗逻辑不变 */
  .timeline-expanded-overlay {
    position: absolute;
    top: 0;
    width: 300%;
    height: 100px !important;
    min-height: 100px !important;
    max-height: 100px !important;
    z-index: 10;
    animation: expandAnimation 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    pointer-events: none;
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
  
  /* 移动端展开内容文字样式 */
  .timeline-expanded-content {
    width: 60%; /* 移动端占60% */
    padding: 15px 18px 12px;
  }
  
  .timeline-expanded-title {
    font-size: 1.1rem;
    margin-bottom: 8px;
    color: #000000; /* 黑色文字 */
  }
  
  .timeline-expanded-description {
    font-size: 0.85rem;
    line-height: 1.5;
    margin: 0;
    color: #000000; /* 黑色文字 */
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
  
  .timeline {
    max-width: 915px;
    overflow: visible;
  }
  
  .timeline-bar {
    height: 300px !important;
    min-height: 300px !important;
    max-height: 300px !important;
    width: 183px;
  }
  
  .timeline-bar-fixed {
    height: 300px !important;
    min-height: 300px !important;
    max-height: 300px !important;
  }
  
  .timeline-expanded-overlay {
    height: 300px !important;
    min-height: 300px !important;
    max-height: 300px !important;
  }
  
  .expanded-image {
    height: 300px !important;
    min-height: 300px !important;
    max-height: 300px !important;
  }
  
  .history-content {
    padding-top: 75px;
  }
  
  .history-content .section-subtitle {
    margin-bottom: 46px;
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
    flex-direction: row;
    gap: 0;
    max-width: 100%;
    padding: 0 0.5rem;
    justify-content: center;
    flex-wrap: nowrap;
    overflow: visible;
    touch-action: manipulation;
  }
  
  .timeline-bar {
    height: 80px !important;
    min-height: 80px !important;
    max-height: 80px !important;
    width: 50px;
    flex-shrink: 0;
  }
  
  .timeline-bar-fixed {
    height: 80px !important;
    min-height: 80px !important;
    max-height: 80px !important;
  }
  
  .timeline-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    position: relative;
    overflow: visible;
    cursor: pointer;
  }
  
  .timeline-item-fixed {
    flex: 0 0 50px;
  }
  
  .constantly-updating-text {
    font-size: 7px; /* 小屏幕字体 */
    letter-spacing: 0.1em;
    padding: 0 5px;
    color: #000000; /* 黑色文字 */
  }
  
  .constantly-updating-text span {
    display: block;
    line-height: 1.2;
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
    height: 80px !important; /* 与色块高度一致 */
    min-height: 80px !important;
    max-height: 80px !important;
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
  
  /* 小屏幕展开内容文字样式 */
  .timeline-expanded-content {
    width: 65%; /* 小屏幕占65% */
    padding: 12px 15px 10px;
  }
  
  .timeline-expanded-title {
    font-size: 1rem;
    margin-bottom: 6px;
    color: #000000; /* 黑色文字 */
  }
  
  .timeline-expanded-description {
    font-size: 0.8rem;
    line-height: 1.4;
    margin: 0;
    color: #000000; /* 黑色文字 */
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
}
</style>
