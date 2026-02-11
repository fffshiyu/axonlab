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
            <p>
              <span class="copyright-first">COPYRIGHT © AXON LABS {{ currentLanguage === 'zh' ? '羽山' : 'Yushan' }} ALL RIGHTS RESERVED |</span>
              <span class="copyright-second"> <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" class="footer-link">{{ currentLanguage === 'zh' ? '京ICP备2025105570号' : 'ICP No. 2025105570' }}</a> | <a href="/北京玄圃执照-盖章版.pdf" target="_blank" rel="noopener noreferrer" class="footer-link">{{ currentLanguage === 'zh' ? '营业执照' : 'Business License' }}</a></span>
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 页脚二维码弹层：微信/小红书/微博/B站 -->
    <Teleport to="body">
      <div v-if="currentQR" class="bilibili-qr-portal footer-qr-portal" :style="qrPortalStyle">
        <img v-if="currentQR === 'wechat'" src="/wxqr.png" alt="微信公众号二维码" />
        <img v-else-if="currentQR === 'xhs'" src="/xhsqr.png" alt="小红书二维码" />
        <img v-else-if="currentQR === 'weibo'" src="/weiboqr.png" alt="微博二维码" />
        <img v-else-if="currentQR === 'douyin'" src="/dyqr.png" alt="抖音二维码" />
        <img v-else-if="currentQR === 'bilibili'" src="/bqr.png" alt="B站二维码" />
      </div>
    </Teleport>
  </footer>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useLanguage } from '../composables/useLanguage'

const { currentLanguage } = useLanguage()

// 页脚二维码：微信 wxqr.png、小红书 xhsqr.png、抖音 dyqr.png、微博 weiboqr.png、B站 bqr.png
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
    // 检测是否为4K屏幕，如果是则使用更大的二维码尺寸
    const is4K = window.innerWidth >= 2560
    const qrWidth = is4K ? 260 : 130 // 4K下使用2倍尺寸，非4K从140缩小到130
    const bottomOffset = is4K ? 20 : 10 // 4K下使用2倍间距
    qrPortalStyle.value = {
      left: `${rect.left + rect.width / 2 - qrWidth / 2}px`,
      bottom: `${window.innerHeight - rect.top + bottomOffset}px`
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
  width: 20px; /* 从24px缩小到20px */
  height: 20px; /* 从24px缩小到20px */
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
  width: 35px; /* 从42px缩小到35px */
  height: 16px; /* 从19px缩小到16px */
}

.social-icon.bilibili-icon img {
  width: 35px; /* 从42px缩小到35px */
  height: 16px; /* 从19px缩小到16px */
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
  width: 130px; /* 从160px缩小到130px */
  height: 130px; /* 从160px缩小到130px */
  object-fit: contain; /* 保持图片比例，完整显示 */
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
  line-height: 1.2; /* 统一行间距 */
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
  line-height: 1.2; /* 统一行间距 */
}

/* 版权信息 */
.footer-copyright {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  height: 20px; /* 恢复固定高度 */
  display: flex;
  align-items: center;
}

.footer-copyright p {
  color: #9E9E9E;
  font-size: 14px; /* 从16px缩小到14px */
  margin: 0;
  line-height: 1.2;
  text-align: left;
}

.footer-copyright .footer-link {
  color: #9E9E9E; /* 与同行文字颜色一致 */
}

.footer-copyright .footer-link:hover {
  color: #9E9E9E; /* 悬停时保持相同颜色 */
}

/* 响应式设计 - 以1920*1080为基准 */
/* 1220 宽（大事件 1090 布局）下图标 20×20，B站 35×16 */
@media (max-width: 1220px) {
  .social-icon {
    width: 20px;
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
    height: 14.4px; /* 20px * 0.72 */
  }
  
  .social-icon {
    width: 15px; /* 20*0.75 */
    height: 15px;
  }
  
  .social-icon.bilibili-icon {
    width: 26px; /* 35*0.75 */
    height: 12px; /* 16*0.75 */
  }
  
  .social-icon.bilibili-icon img {
    width: 26px;
    height: 12px;
  }
  
  .footer-logo-img {
    width: 150px; /* 200px * 0.75 */
  }
  
  .footer-links {
    font-size: 10.5px; /* 14px * 0.75 */
    line-height: 1.2; /* 统一行间距 */
  }
  
  .footer-contact p,
  .footer-copyright p {
    font-size: 10.5px; /* 14px * 0.75 */
    line-height: 1.2; /* 统一行间距 */
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
    width: 13px; /* 20*2/3 */
    height: 13px;
  }
  
  .social-icon.bilibili-icon {
    width: 23px; /* 35*2/3 */
    height: 11px; /* 16*2/3 */
  }
  
  .social-icon.bilibili-icon img {
    width: 23px;
    height: 11px;
  }
  
  .footer-logo-img {
    width: 150px; /* 200px * 0.75 */
  }
  
  .footer-links {
    font-size: 8.4px; /* 14px * 0.6 */
    line-height: 1.2; /* 统一行间距 */
  }
  
  .footer-contact p,
  .footer-copyright p {
    font-size: 8.4px; /* 14px * 0.6 */
    line-height: 1.2; /* 统一行间距 */
  }
}

@media (max-width: 768px) {
  .footer-logo {
    left: 20px; /* 与导航栏左侧边距一致 */
  }
  
  .footer {
    height: 150px; /* 160px * 0.94 */
    padding: 30px 0; /* 30px * 1 */
  }
  
  .footer-content {
    max-width: none;
    padding-left: 227.5px; /* logo位置20px + logo宽度187.5px + 间距20px = 227.5px */
    padding-right: 20px; /* 与导航栏右侧边距一致 */
    margin-left: 0; /* 移动端不需要左边距 */
    text-align: left; /* 靠左显示 */
  }
  
  .social-icons {
    margin-bottom: 11.25px; /* 12px * 0.94 */
    gap: 0.8rem;
    justify-content: flex-start; /* 靠左显示 */
  }
  
  .footer-text-area {
    height: 67.5px; /* 75px * 0.9 */
  }
  
  .footer-links {
    height: 18px; /* 20px * 0.9 */
    justify-content: flex-start; /* 靠左显示 */
  }
  
  .footer-contact {
    height: 18px; /* 20px * 0.9 */
  }
  
  .footer-copyright {
    height: auto; /* 手机版允许高度自适应以支持换行 */
    min-height: 18px; /* 20px * 0.9 */
    align-items: flex-start; /* 顶部对齐 */
  }
  
  .social-icon {
    width: 17px; /* 20*0.85 */
    height: 17px;
  }
  
  .social-icon.bilibili-icon {
    width: 30px; /* 35*0.85 */
    height: 14px; /* 16*0.85 */
  }
  
  .social-icon.bilibili-icon img {
    width: 30px;
    height: 14px;
  }
  
  .footer-logo-img {
    width: 187.5px; /* 200px * 0.94 */
  }
  
  .footer-links {
    justify-content: flex-start; /* 靠左显示 */
    font-size: 10.5px; /* 14px * 0.75 */
    gap: 0.4rem;
    line-height: 1.2; /* 统一行间距 */
  }
  
  .footer-contact p,
  .footer-copyright p {
    font-size: 10.5px; /* 14px * 0.75 */
    text-align: left; /* 靠左显示 */
    line-height: 1.2; /* 统一行间距 */
  }
  
  /* 手机版：从"京ICP备"开始的内容换到下一行 */
  .footer-copyright p {
    display: flex;
    flex-direction: column;
  }
  
  .footer-copyright .copyright-second {
    display: block;
    margin-top: 4px;
  }
}

@media (max-width: 480px) {
  .footer-logo {
    left: 15px; /* 与导航栏左侧边距一致 */
    position: absolute; /* 保持绝对定位 */
    top: 30px; /* 垂直位置 */
  }
  
  .footer {
    height: auto;
    padding-bottom: 12.8px; /* 32px * 0.4 */
  }
  
  .footer-content {
    max-width: none;
    padding-left: 130px; /* logo位置15px + logo宽度100px + 间距15px = 130px */
    padding-right: 15px; /* 与导航栏右侧边距一致 */
    text-align: left; /* 靠左显示 */
    margin-left: 0; /* 移动端不需要左边距 */
  }
  
  .social-icons {
    margin-bottom: 6px; /* 12px * 0.5 */
    justify-content: flex-start; /* 靠左显示 */
    gap: 0.6rem;
  }
  
  .footer-text-area {
    height: 36px; /* 75px * 0.48 */
  }
  
  .footer-links {
    height: 9.6px; /* 20px * 0.48 */
    justify-content: flex-start; /* 靠左显示 */
  }
  
  .footer-contact {
    height: 9.6px; /* 20px * 0.48 */
  }
  
  .footer-copyright {
    height: auto; /* 手机版允许高度自适应以支持换行 */
    min-height: 9.6px; /* 20px * 0.48 */
    align-items: flex-start; /* 顶部对齐 */
  }
  
  .social-icon {
    width: 17px; /* 20*0.85 */
    height: 17px;
  }
  
  .social-icon.bilibili-icon {
    width: 30px; /* 35*0.85 */
    height: 14px; /* 16*0.85 */
  }
  
  .social-icon.bilibili-icon img {
    width: 30px;
    height: 14px;
  }
  
  .footer-logo-img {
    width: 100px; /* 200px * 0.5 */
  }
  
  .footer-links {
    justify-content: flex-start; /* 靠左显示 */
    font-size: 5.6px; /* 14px * 0.4 */
    gap: 0.3rem;
    line-height: 1.2; /* 统一行间距 */
  }
  
  .footer-contact p,
  .footer-copyright p {
    font-size: 5.6px; /* 14px * 0.4 */
    text-align: left; /* 靠左显示 */
    line-height: 1.2; /* 统一行间距 */
  }
  
  /* 手机版：从"京ICP备"开始的内容换到下一行 */
  .footer-copyright p {
    display: flex;
    flex-direction: column;
  }
  
  .footer-copyright .copyright-second {
    display: block;
    margin-top: 4px;
  }
}

/* 4K屏幕适配 (min-width: 2560px) - 按2倍放大 */
@media (min-width: 2560px) {
  .footer {
    height: 320px; /* 160px * 2 */
    padding: 60px 0; /* 30px * 2 */
  }
  
  .footer-container {
    margin: 0; /* 覆盖基础样式中的 margin: 0 auto;，避免居中 */
    max-width: none; /* 移除最大宽度限制 */
  }
  
  .footer-logo {
    left: 300px; /* 靠左一些，从400px减少到300px */
    top: 60px; /* 30px * 2 */
  }
  
  .footer-logo-img {
    width: 400px; /* 200px * 2 */
  }
  
  .footer-content {
    max-width: 1600px; /* 800px * 2 */
    margin: 0; /* 覆盖基础样式中的 margin: 0 auto; */
    margin-left: 900px; /* 增加间距，从760px增加到900px */
    padding-left: 4rem; /* 2rem * 2 */
  }
  
  .social-icons {
    gap: 1.6rem; /* 0.8rem * 2 */
    margin-bottom: 24px; /* 12px * 2 */
  }
  
  .social-icon {
    width: 40px; /* 20px * 2 */
    height: 40px; /* 20px * 2 */
  }
  
  .social-icon.bilibili-icon {
    width: 70px; /* 35px * 2 */
    height: 32px; /* 16px * 2 */
  }
  
  .social-icon.bilibili-icon img {
    width: 70px; /* 35px * 2 */
    height: 32px; /* 16px * 2 */
  }
  
  .footer-text-area {
    height: 150px; /* 75px * 2 */
  }
  
  .footer-links {
    font-size: 28px; /* 14px * 2 */
    height: 40px; /* 20px * 2 */
    gap: 1rem; /* 0.5rem * 2 */
    line-height: 1.2; /* 统一行间距 */
  }
  
  .separator {
    margin: 0 0.5rem; /* 0.25rem * 2 */
  }
  
  .footer-contact {
    height: 40px; /* 20px * 2 */
  }
  
  .footer-contact p {
    font-size: 28px; /* 14px * 2 */
    line-height: 1.2; /* 统一行间距 */
  }
  
  .footer-copyright {
    height: 40px; /* 20px * 2 */
    border-top-width: 2px; /* 1px * 2 */
  }
  
  .footer-copyright p {
    font-size: 28px; /* 14px * 2 */
    line-height: 1.2; /* 统一行间距 */
  }
  
  /* 二维码弹窗在4K下也需要放大 */
  .bilibili-qr-portal {
    padding: 20px; /* 10px * 2 */
    border-radius: 16px; /* 8px * 2 */
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3); /* 0 4px 12px * 2 */
  }
  
  .bilibili-qr-portal img {
    width: 260px !important; /* 130px * 2，使用固定宽度，确保所有二维码大小一致 */
    height: 260px !important; /* 130px * 2，使用固定高度，确保所有二维码大小一致 */
    object-fit: contain !important; /* 保持图片比例，完整显示 */
  }
}
</style>
