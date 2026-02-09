<template>
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
          <a href="#" class="social-icon qr-icon" @click.prevent="showQR('wechat')" ref="wechatIconRef">
            <img src="/wechat.png" alt="微信公众号" />
          </a>
          <a href="#" class="social-icon qr-icon" @click.prevent="showQR('xhs')" ref="xhsIconRef">
            <img src="/redbook.png" alt="小红书" />
          </a>
          <a href="#" class="social-icon qr-icon" @click.prevent="showQR('douyin')" ref="douyinIconRef">
            <img src="/douyin.png" alt="抖音" />
          </a>
          <a href="#" class="social-icon qr-icon" @click.prevent="showQR('weibo')" ref="weiboIconRef">
            <img src="/weibo.png" alt="微博" />
          </a>
          <a href="#" class="social-icon bilibili-icon qr-icon" @click.prevent="showQR('bilibili')" ref="bilibiliIconRef">
            <img src="/bilibil.png" alt="哔哩哔哩" />
          </a>
        </div>
        
        <!-- 页脚文字区域 -->
        <div class="footer-text-area">
          <!-- 页脚链接 -->
          <div class="footer-links">
            <a href="#" class="footer-link">{{ currentLanguage === 'zh' ? '知识产权保护' : 'Intellectual Property Protection' }}</a>
            <span class="separator">|</span>
            <a href="#" class="footer-link">{{ currentLanguage === 'zh' ? '隐私声明' : 'Privacy Statement' }}</a>
          </div>
          
          <!-- 联系信息 -->
          <div class="footer-contact">
            <p>{{ currentLanguage === 'zh' ? '互联网违法和不良信息举报邮箱' : 'Report illegal and harmful information' }}   mrkt@axonlabs.com</p>
          </div>
          
          <!-- 版权信息 -->
          <div class="footer-copyright">
            <p>COPYRIGHT © AXON LABS {{ currentLanguage === 'zh' ? '羽山' : 'Yushan' }} ALL RIGHTS RESERVED    |    <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" class="footer-link">{{ currentLanguage === 'zh' ? '京ICP备2025105570号' : 'ICP No. 2025105570' }}</a>    |    <a href="/business-license.pdf" target="_blank" class="footer-link">{{ currentLanguage === 'zh' ? '营业执照' : 'Business License' }}</a></p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 页脚二维码弹层：微信/小红书/微博/B站 -->
    <Teleport to="body">
      <div v-if="currentQR" class="bilibili-qr-portal footer-qr-portal" :style="qrPortalStyle">
        <img v-if="currentQR === 'wechat'" src="/wxqr.png" alt="微信公众号二维码" />
        <img v-else-if="currentQR === 'xhs'" src="/xhsqr.png" alt="小红书二维码" />
        <img v-else-if="currentQR === 'weibo'" src="/weibo.png" alt="微博二维码" />
        <img v-else-if="currentQR === 'douyin'" src="/dyqr.png" alt="抖音二维码" />
        <img v-else-if="currentQR === 'bilibili'" src="/qr.webp" alt="B站二维码" />
      </div>
    </Teleport>
  </footer>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useLanguage } from '../composables/useLanguage'

const { currentLanguage } = useLanguage()

// 页脚二维码：微信 wxqr.png、小红书 xhsqr.png、抖音 dyqr.png、微博 weibo.png、B站 qr.webp
type QRType = 'wechat' | 'xhs' | 'douyin' | 'weibo' | 'bilibili'
const currentQR = ref<QRType | null>(null)
const wechatIconRef = ref<HTMLElement | null>(null)
const xhsIconRef = ref<HTMLElement | null>(null)
const douyinIconRef = ref<HTMLElement | null>(null)
const weiboIconRef = ref<HTMLElement | null>(null)
const bilibiliIconRef = ref<HTMLElement | null>(null)

const qrPortalStyle = ref({ left: '0px', bottom: '0px' })

function getActiveIconRef() {
  switch (currentQR.value) {
    case 'wechat': return wechatIconRef.value
    case 'xhs': return xhsIconRef.value
    case 'douyin': return douyinIconRef.value
    case 'weibo': return weiboIconRef.value
    case 'bilibili': return bilibiliIconRef.value
    default: return null
  }
}

function updateQRPosition() {
  const icon = getActiveIconRef()
  if (!currentQR.value || !icon) return
  nextTick(() => {
    const rect = icon.getBoundingClientRect()
    const qrWidth = 140
    qrPortalStyle.value = {
      left: `${rect.left + rect.width / 2 - qrWidth / 2}px`,
      bottom: `${window.innerHeight - rect.top + 10}px`
    }
  })
}

function showQR(type: QRType) {
  if (currentQR.value === type) {
    currentQR.value = null
    return
  }
  currentQR.value = type
  updateQRPosition()
}

watch(currentQR, (val) => {
  if (val) updateQRPosition()
})

// 点击页面其他地方关闭二维码
const handlePageClick = (event: Event) => {
  const target = event.target as HTMLElement
  const portal = document.querySelector('.footer-qr-portal')
  const icons = [wechatIconRef.value, xhsIconRef.value, douyinIconRef.value, weiboIconRef.value, bilibiliIconRef.value]
  const inIcon = icons.some(el => el && el.contains(target))
  const inPortal = portal && portal.contains(target)
  if (!inIcon && !inPortal) currentQR.value = null
}

const handleResize = () => {
  if (currentQR.value) updateQRPosition()
}
const handleScroll = () => {
  if (currentQR.value) updateQRPosition()
}

onMounted(() => {
  window.addEventListener('click', handlePageClick)
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('click', handlePageClick)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
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
  overflow: visible; /* 确保二维码不会被裁剪 */
}

.social-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease, opacity 0.3s ease;
  position: relative;
}

.social-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* B站图标单独尺寸 42×19 */
.social-icon.bilibili-icon {
  width: 42px;
  height: 19px;
}

.social-icon.bilibili-icon img {
  width: 42px;
  height: 19px;
  object-fit: contain;
}

.social-icon:hover {
  transform: scale(1.1);
  opacity: 0.8;
}

/* B站二维码样式 */
.bilibili-icon {
  position: relative;
  z-index: 1;
}

/* 使用Teleport渲染的二维码样式 */
.bilibili-qr-portal {
  position: fixed;
  z-index: 99999; /* 确保在最顶层，高于所有其他元素 */
  background: #ffffff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  pointer-events: auto; /* 确保可以点击 */
  transform: translateX(-50%);
}

.bilibili-qr-portal img {
  max-width: 160px;
  max-height: 160px;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
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
/* 1220 宽（大事件 1090 布局）下图标 24×24，B站 42×19 */
@media (max-width: 1220px) {
  .social-icon {
    width: 24px;
    height: 24px;
  }
  .social-icon.bilibili-icon {
    width: 42px;
    height: 19px;
  }
  .social-icon.bilibili-icon img {
    width: 42px;
    height: 19px;
  }
}

@media (max-width: 1440px) {
  .footer-logo {
    left: 150px; /* 200px * 0.75 */
  }
  
  .footer {
    height: 120px; /* 160px * 0.75 */
    padding: 24px 0; /* 30px * 0.8 */
  }
  
  .footer-content {
    margin-left: 330px; /* logo位置150px + logo宽度150px + 间距30px = 330px */
    max-width: 500px;
  }
  
  .social-icons {
    margin-bottom: 9px; /* 12px * 0.75 */
  }
  
  .footer-text-area {
    height: 54px; /* 75px * 0.72 */
  }
  
  .footer-links {
    height: 14.4px; /* 20px * 0.72 */
  }
  
  .footer-contact {
    height: 14.4px; /* 20px * 0.72 */
  }
  
  .footer-copyright {
    min-height: 14.4px; /* 20px * 0.72 */
  }
  
  .social-icon {
    width: 18px; /* 24*0.75 */
    height: 18px;
  }
  
  .social-icon.bilibili-icon {
    width: 32px; /* 42*0.75 */
    height: 14px; /* 19*0.75 */
  }
  
  .social-icon.bilibili-icon img {
    width: 32px;
    height: 14px;
  }
  
  .footer-logo-img {
    width: 150px; /* 200px * 0.75 */
  }
  
  .footer-links {
    font-size: 10.5px; /* 14px * 0.75 */
  }
  
  .footer-contact p,
  .footer-copyright p {
    font-size: 10.5px; /* 14px * 0.75 */
  }
}

@media (max-width: 1024px) {
  .footer-logo {
    left: 120px; /* 200px * 0.6 */
  }
  
  .footer {
    height: 100px; /* 160px * 0.625 */
    padding: 20px 0; /* 30px * 0.67 */
  }
  
  .footer-content {
    margin-left: 330px; /* logo位置120px + logo宽度150px + 间距60px = 330px */
    max-width: 500px;
  }
  
  .social-icons {
    margin-bottom: 9px; /* 12px * 0.75 */
  }
  
  .footer-text-area {
    height: 45px; /* 75px * 0.6 */
  }
  
  .footer-links {
    height: 12px; /* 20px * 0.6 */
  }
  
  .footer-contact {
    height: 12px; /* 20px * 0.6 */
  }
  
  .footer-copyright {
    min-height: 12px; /* 20px * 0.6 */
  }
  
  .social-icon {
    width: 16px; /* 24*2/3 */
    height: 16px;
  }
  
  .social-icon.bilibili-icon {
    width: 28px; /* 42*2/3 */
    height: 13px; /* 19*2/3 */
  }
  
  .social-icon.bilibili-icon img {
    width: 28px;
    height: 13px;
  }
  
  .footer-logo-img {
    width: 150px; /* 200px * 0.75 */
  }
  
  .footer-links {
    font-size: 8.4px; /* 14px * 0.6 */
  }
  
  .footer-contact p,
  .footer-copyright p {
    font-size: 8.4px; /* 14px * 0.6 */
  }
}

@media (max-width: 768px) {
  .footer-logo {
    left: 150px; /* 200px * 0.75 */
  }
  
  .footer {
    height: 150px; /* 160px * 0.94 */
    padding: 30px 0; /* 30px * 1 */
  }
  
  .footer-content {
    max-width: 600px;
    padding-left: 1.5rem;
    margin-left: 412.5px; /* logo位置150px + logo宽度187.5px + 间距75px = 412.5px */
  }
  
  .social-icons {
    margin-bottom: 11.25px; /* 12px * 0.94 */
    gap: 0.8rem;
  }
  
  .footer-text-area {
    height: 67.5px; /* 75px * 0.9 */
  }
  
  .footer-links {
    height: 18px; /* 20px * 0.9 */
  }
  
  .footer-contact {
    height: 18px; /* 20px * 0.9 */
  }
  
  .footer-copyright {
    min-height: 18px; /* 20px * 0.9 */
  }
  
  .social-icon {
    width: 20px; /* 24*0.83 */
    height: 20px;
  }
  
  .social-icon.bilibili-icon {
    width: 35px; /* 42*20/24 */
    height: 16px; /* 19*20/24 */
  }
  
  .social-icon.bilibili-icon img {
    width: 35px;
    height: 16px;
  }
  
  .footer-logo-img {
    width: 187.5px; /* 200px * 0.94 */
  }
  
  .footer-links {
    justify-content: center; /* 移动端居中 */
    font-size: 10.5px; /* 14px * 0.75 */
    gap: 0.4rem;
  }
  
  .footer-contact p,
  .footer-copyright p {
    font-size: 10.5px; /* 14px * 0.75 */
  }
}

@media (max-width: 480px) {
  .footer-logo {
    position: relative; /* 移动端改为相对定位 */
    left: 0;
    top: 0;
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .footer {
    height: auto;
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
    margin-bottom: 6px; /* 12px * 0.5 */
    justify-content: center; /* 移动端居中 */
    gap: 0.6rem;
  }
  
  .footer-text-area {
    height: 36px; /* 75px * 0.48 */
  }
  
  .footer-links {
    height: 9.6px; /* 20px * 0.48 */
    justify-content: center; /* 移动端居中 */
  }
  
  .footer-contact {
    height: 9.6px; /* 20px * 0.48 */
  }
  
  .footer-copyright {
    min-height: 9.6px; /* 20px * 0.48 */
  }
  
  .social-icon {
    width: 20px; /* 24*0.83 */
    height: 20px;
  }
  
  .social-icon.bilibili-icon {
    width: 35px;
    height: 16px;
  }
  
  .social-icon.bilibili-icon img {
    width: 35px;
    height: 16px;
  }
  
  .footer-logo-img {
    width: 100px; /* 200px * 0.5 */
  }
  
  .footer-links {
    justify-content: center; /* 移动端居中 */
    font-size: 5.6px; /* 14px * 0.4 */
    gap: 0.3rem;
  }
  
  .footer-contact p,
  .footer-copyright p {
    font-size: 5.6px; /* 14px * 0.4 */
    text-align: center; /* 移动端居中 */
  }
}
</style>
