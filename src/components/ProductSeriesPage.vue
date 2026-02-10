<template>
  <div class="product-series-container">
    <!-- 导航栏 -->
    <Navbar active-page="product-series" />
    
    <!-- 第一个产品区域 - LOOMI -->
    <div class="product-section">
      <!-- 背景图片 -->
      <div class="product-series-background loomi-bg"></div>
      
      <!-- 主要内容 -->
      <div class="product-series-content">
        <!-- 小标题 -->
        <div class="product-title-container">
          <img src="/loomi_text.webp" alt="LOOMI" class="product-title-img loomi-title" />
          <p class="product-hint-text">{{ currentLanguage === 'zh' ? '点击产品拖拽，可360度观看' : 'Click and drag to rotate 360°' }}</p>
        </div>
        
        <!-- 产品图片 -->
        <div class="product-image-container">
          <!-- 主产品图 - 3D模型 -->
          <div class="product-main-wrapper">
            <div ref="modelContainer1" class="model-3d-container">
              <!-- 3D模型加载状态 -->
              <div v-if="!isFirstModelLoaded" class="model-loading">
                <div class="model-loading-spinner"></div>
                <p class="model-loading-text">{{ currentLanguage === 'zh' ? '3D模型加载中...' : 'Loading 3D Model...' }}</p>
              </div>
            </div>
            
            <!-- 音频按钮 - 5个位置 -->
            <button 
              class="audio-btn audio-btn-1" 
              @click.stop="playAudio(1, $event)"
            >
              <img src="/audio.png" alt="音频1" />
            </button>
            <button 
              class="audio-btn audio-btn-2" 
              @click.stop="playAudio(2, $event)"
            >
              <img src="/audio.png" alt="音频2" />
            </button>
            <button 
              class="audio-btn audio-btn-3" 
              @click.stop="playAudio(3, $event)"
            >
              <img src="/audio.png" alt="音频3" />
            </button>
            <button 
              class="audio-btn audio-btn-4" 
              @click.stop="playAudio(4, $event)"
            >
              <img src="/audio.png" alt="音频4" />
            </button>
            <button 
              class="audio-btn audio-btn-5" 
              @click.stop="playAudio(5, $event)"
            >
              <img src="/audio.png" alt="音频5" />
            </button>
            
            <!-- 叠加的侧边图片 -->
            <transition name="fade">
              <img 
                v-if="sideImage" 
                :src="sideImage" 
                alt="详细信息" 
                :class="['overlay-img', overlayPosition]"
                @click="closeOverlay"
              />
            </transition>
          </div>
        </div>
        
        <!-- 右侧图标列 -->
        <div class="icon-column">
          <!-- 参数图片显示区域 -->
          <transition name="fade-params">
            <img 
              v-if="showParamsImage" 
              src="/csys.webp" 
              alt="参数详情" 
              class="params-detail-img"
              @click="closeParamsImage"
            />
          </transition>
          
          <div class="icon-item" @click="handleIconClick('参数')">
            <div class="icon-fill"></div>
            <img src="/canshu_icon.webp" alt="参数" class="icon-img" />
            <span class="icon-label">参数</span>
          </div>
          <div class="icon-item" @click="handleIconClick('正面')">
            <div class="icon-fill"></div>
            <img src="/zhengmian_icon.webp" alt="正面" class="icon-img" />
            <span class="icon-label">正面</span>
          </div>
          <div class="icon-item" @click="handleIconClick('侧面')">
            <div class="icon-fill"></div>
            <img src="/cemian_icon.webp" alt="侧面" class="icon-img" />
            <span class="icon-label">侧面</span>
          </div>
          <div class="icon-item" @click="handleIconClick('右侧')">
            <div class="icon-fill"></div>
            <img src="/cemian_icon.webp" alt="右侧" class="icon-img icon-mirror" />
            <span class="icon-label">右侧</span>
          </div>
          <div class="icon-item" @click="handleIconClick('背面')">
            <div class="icon-fill"></div>
            <img src="/beimian_icon.webp" alt="背面" class="icon-img" />
            <span class="icon-label">背面</span>
          </div>
        </div>
      </div>
      
      <!-- 滚动指示器 -->
      <div class="scroll-indicator" @click="scrollToNextProduct">
        <img src="/arrow.webp" alt="向下箭头" class="scroll-arrow-img" />
      </div>
    </div>

    <!-- 第二个产品区域 - AXONROB -->
    <div class="product-section">
      <!-- 背景图片 -->
      <div class="product-series-background axonrob-bg"></div>
      
      <!-- 主要内容 -->
      <div class="product-series-content">
        <!-- 小标题 -->
        <div class="product-title-container">
          <img src="/axonrob_text.webp" alt="AXONROB" class="product-title-img" />
          <p class="product-hint-text">{{ currentLanguage === 'zh' ? '点击产品拖拽，可360度观看' : 'Click and drag to rotate 360°' }}</p>
        </div>
        
        <!-- 产品图片 - 3D模型 -->
        <div class="product-image-container">
          <!-- 3D模型容器 -->
          <div class="product-main-wrapper">
            <div ref="modelContainer" class="model-3d-container">
              <!-- 3D模型加载状态 -->
              <div v-if="!isSecondModelLoaded" class="model-loading">
                <div class="model-loading-spinner"></div>
                <p class="model-loading-text">{{ currentLanguage === 'zh' ? '3D模型加载中...' : 'Loading 3D Model...' }}</p>
              </div>
            </div>
            
          </div>
        </div>
        
        <!-- 右侧图标列 -->
        <div class="icon-column">
          <div class="icon-item" @click="handleIconClick2('正面')">
            <div class="icon-fill"></div>
            <img src="/zhengmian_icon.webp" alt="正面" class="icon-img" />
            <span class="icon-label">正面</span>
          </div>
          <div class="icon-item" @click="handleIconClick2('侧面')">
            <div class="icon-fill"></div>
            <img src="/cemian_icon.webp" alt="侧面" class="icon-img" />
            <span class="icon-label">侧面</span>
          </div>
          <div class="icon-item" @click="handleIconClick2('右侧')">
            <div class="icon-fill"></div>
            <img src="/cemian_icon.webp" alt="右侧" class="icon-img icon-mirror" />
            <span class="icon-label">右侧</span>
          </div>
          <div class="icon-item" @click="handleIconClick2('背面')">
            <div class="icon-fill"></div>
            <img src="/beimian_icon.webp" alt="背面" class="icon-img" />
            <span class="icon-label">背面</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 视频播放弹窗 -->
    <transition name="fade">
      <div v-if="showVideoModalRef" class="video-modal-overlay" @click="closeVideoModal">
        <div class="video-modal-content" @click.stop>
          <button class="video-modal-close" @click="closeVideoModal">×</button>
          <video 
            :src="currentVideoSrc" 
            controls 
            autoplay
            class="video-modal-player"
            @ended="closeVideoModal"
          ></video>
        </div>
      </div>
    </transition>
    
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
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { getCachedModel } from '../utils/modelPreloader'
import { getCachedScene, cacheScene, restoreScene, hasCachedScene } from '../utils/sceneCache'

// 第一个产品的状态
const activeButton = ref<string | null>(null)
const sideImage = ref<string | null>(null)
const overlayPosition = ref<string>('')
const showParamsImage = ref(false)
const showVideoModalRef = ref(false) // 视频弹窗显示状态
const currentVideoSrc = ref<string>('') // 当前播放的视频路径
let autoRotateTimer1: number | null = null // 第一个产品旋转恢复定时器

// 音频播放相关
const currentAudio = ref<HTMLAudioElement | null>(null)
const audioFiles = [
  '/audio/d_lumi_callover01_audio.WAV', // 音频1
  '/audio/d_lumi_callover02_audio.WAV', // 音频2
  '/audio/d_lumi_callover03_audio.WAV', // 音频3
  '/audio/d_lumi_callover04_audio.WAV', // 音频4
  '/audio/d_lumi_callover05_audio.WAV'  // 音频5
]

// 播放音频函数
const playAudio = (index: number, event?: Event) => {
  // 如果视频弹窗打开，不播放音频
  if (showVideoModalRef.value) {
    return
  }
  
  // 阻止事件冒泡，避免影响其他元素的点击
  if (event) {
    event.stopPropagation()
  }
  
  // 如果正在播放其他音频，先停止
  if (currentAudio.value) {
    currentAudio.value.pause()
    currentAudio.value.currentTime = 0
  }
  
  // 播放对应索引的音频（索引从1开始，数组从0开始）
  const audioIndex = index - 1
  if (audioIndex >= 0 && audioIndex < audioFiles.length) {
    const audio = new Audio(audioFiles[audioIndex])
    currentAudio.value = audio
    audio.play().catch(err => {
      console.error('音频播放失败:', err)
    })
    
    // 音频播放结束后清理
    audio.onended = () => {
      currentAudio.value = null
    }
  }
}

// 第二个产品的状态
let autoRotateTimer2: number | null = null // 第二个产品旋转恢复定时器

// 第一个产品的3D模型相关（LOOMI - loomy.glb）
const modelContainer1 = ref<HTMLDivElement | null>(null)
let scene1: THREE.Scene
let camera1: THREE.PerspectiveCamera
let renderer1: THREE.WebGLRenderer
let controls1: OrbitControls
let content1: THREE.Object3D | null = null
let videoLabelFront1: THREE.Sprite | null = null
let videoLabelBack1: THREE.Sprite | null = null
let raycaster1: THREE.Raycaster | null = null
let mouse1 = new THREE.Vector2()
let animationId1: number
let retryCount1 = 0
let isSection1Visible = ref(true) // 第一个区域是否可见
const isFirstModelLoaded = ref(false) // 第一个模型是否加载完成（响应式）

// 创建 Sprite 标签函数
const createSpriteLabel = (imagePath: string, onClick: () => void): THREE.Sprite => {
  // 加载图片并创建纹理
  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load(imagePath)
  
  // 创建 SpriteMaterial，启用深度测试和深度写入
  const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.8,
    depthTest: true,  // 启用深度测试
    depthWrite: true // 启用深度写入
  })
  
  // 创建 Sprite
  const sprite = new THREE.Sprite(spriteMaterial)
  
  // 设置 Sprite 的 center 属性（底部中心）
  sprite.center.set(0.5, 0)
  
  // 存储点击回调
  ;(sprite.userData as any).onClick = onClick
  
  // 为 Sprite 创建一个不可见的几何体用于点击检测
  // Sprite 本身无法直接进行射线检测，我们需要手动计算
  sprite.userData.isVideoLabel = true
  
  return sprite
}

// 显示视频弹窗
const showVideoModal = (videoPath: string) => {
  // 如果正在播放音频，先停止
  if (currentAudio.value) {
    currentAudio.value.pause()
    currentAudio.value.currentTime = 0
    currentAudio.value = null
  }
  
  currentVideoSrc.value = videoPath
  showVideoModalRef.value = true
  // 禁用页面滚动
  document.body.style.overflow = 'hidden'
}

// 关闭视频弹窗
const closeVideoModal = () => {
  showVideoModalRef.value = false
  currentVideoSrc.value = ''
  // 恢复页面滚动
  document.body.style.overflow = ''
}

// Sprite 点击事件处理
const onSpriteClick1 = (event: MouseEvent) => {
  // 如果视频弹窗已打开，不处理点击
  if (showVideoModalRef.value) {
    return
  }
  
  if (!camera1 || !renderer1 || !modelContainer1.value) return
  
  const rect = renderer1.domElement.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const clickY = event.clientY - rect.top
  
  // 手动检测 Sprite 点击（Sprite 无法直接使用 Raycaster）
  const sprites: Array<{ sprite: THREE.Sprite, onClick: () => void, name: string }> = []
  if (videoLabelFront1) {
    sprites.push({ 
      sprite: videoLabelFront1, 
      onClick: (videoLabelFront1.userData as any).onClick,
      name: 'front'
    })
  }
  if (videoLabelBack1) {
    sprites.push({ 
      sprite: videoLabelBack1, 
      onClick: (videoLabelBack1.userData as any).onClick,
      name: 'back'
    })
  }
  
  // 检查每个 Sprite 是否被点击
  for (const { sprite, onClick, name } of sprites) {
    if (!sprite.visible) continue
    
    // 将 Sprite 的世界位置转换为屏幕坐标
    const worldPosition = new THREE.Vector3()
    sprite.getWorldPosition(worldPosition)
    
    // 将世界坐标转换为屏幕坐标（归一化坐标）
    const vector = worldPosition.clone().project(camera1)
    // 转换为屏幕像素坐标
    const x = (vector.x * 0.5 + 0.5) * rect.width
    const y = (-vector.y * 0.5 + 0.5) * rect.height
    
    // 获取 Sprite 的屏幕尺寸
    // Sprite 的 scale 是 Three.js 单位，需要转换为屏幕像素
    const distance = camera1.position.distanceTo(worldPosition)
    const scale = sprite.scale.x
    // 使用相机的视野角度来计算屏幕尺寸
    const fov = camera1.fov * Math.PI / 180
    const viewHeight = 2 * Math.tan(fov / 2) * distance
    const pixelPerUnit = rect.height / viewHeight
    const spriteScreenSize = scale * pixelPerUnit
    
    // 扩大点击区域以提高响应性（增加50%的容差）
    const tolerance = spriteScreenSize * 0.5
    
    // 检查点击是否在 Sprite 范围内
    const dx = clickX - x
    const dy = clickY - y
    const distanceFromCenter = Math.sqrt(dx * dx + dy * dy)
    
    if (distanceFromCenter <= spriteScreenSize / 2 + tolerance) {
      // 检查 Sprite 是否被模型遮挡
      if (raycaster1 && content1) {
        const direction = worldPosition.clone().sub(camera1.position).normalize()
        raycaster1.set(camera1.position, direction)
        const intersects = raycaster1.intersectObject(content1, true)
        if (intersects.length > 0) {
          const intersectionDistance = camera1.position.distanceTo(intersects[0].point)
          const spriteDistance = camera1.position.distanceTo(worldPosition)
          // 如果模型在 Sprite 之前，说明 Sprite 被遮挡
          if (intersectionDistance < spriteDistance - 0.05) {
            continue // Sprite 被遮挡，跳过
          }
        }
      }
      
      // 点击在 Sprite 上且未被遮挡，执行点击回调
      if (onClick && typeof onClick === 'function') {
        console.log('Sprite clicked:', name)
        onClick()
        event.stopPropagation()
        event.preventDefault()
        return // 只处理第一个点击的 Sprite
      }
    }
  }
}

// 第二个产品的3D模型相关（AXONROB - zbh.glb）
const modelContainer = ref<HTMLDivElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let content: THREE.Object3D | null = null
let animationId: number
let retryCount = 0
let resizeTimeout: number | null = null
let isSection2Visible = ref(false) // 第二个区域是否可见
const isSecondModelLoaded = ref(false) // 第二个模型是否已加载（响应式）

// 初始化第一个产品的Three.js场景（LOOMI）
const init3DScene1 = () => {
  if (!modelContainer1.value) {
    console.error('第一个产品模型容器未找到')
    return
  }

  const sceneKey1 = 'product-series-scene1'
  
  // 检查是否有缓存的场景
  if (hasCachedScene(sceneKey1)) {
    console.log('发现缓存的第一个产品场景，正在恢复...')
    if (restoreScene(sceneKey1, modelContainer1.value)) {
      // 恢复场景变量引用
      const cached = getCachedScene(sceneKey1)!
      scene1 = cached.scene as THREE.Scene
      camera1 = cached.camera as THREE.PerspectiveCamera
      renderer1 = cached.renderer as THREE.WebGLRenderer
      controls1 = cached.controls as OrbitControls
      content1 = cached.content
      
      // 重置动画状态
      isAnimating1 = false
      
      // 重新配置controls
      controls1.enableZoom = false // 禁用缩放，固定大小
      controls1.autoRotate = true // 启用默认左右旋转
      controls1.autoRotateSpeed = 1.0
      
      // 重新绑定拖拽事件监听器
      controls1.removeEventListener('start', () => {})
      controls1.addEventListener('start', () => {
        controls1.autoRotate = false
        if (autoRotateTimer1) {
          clearTimeout(autoRotateTimer1)
          autoRotateTimer1 = null
        }
      })
      
      // 重新启动动画
      startAnimation1()
      
      // 重新绑定窗口大小变化事件
      window.addEventListener('resize', onWindowResize1)
      
      isFirstModelLoaded.value = true
      console.log('第一个产品场景已从缓存恢复，无需重新加载模型')
      return
    }
  }

  const width = modelContainer1.value.clientWidth
  const height = modelContainer1.value.clientHeight
  
  if (width === 0 || height === 0) {
    retryCount1++
    if (retryCount1 > 10) {
      console.error('第一个产品模型容器尺寸始终为0，停止重试。')
      return
    }
    console.log('第一个产品模型容器尺寸为0，延迟重试 (', retryCount1, '/10)')
    setTimeout(() => init3DScene1(), 200)
    return
  }

  console.log('初始化新的第一个产品Three.js场景，容器尺寸:', width, height)

  // 创建场景
  scene1 = new THREE.Scene()
  scene1.background = null // 透明背景

  // 创建相机
  camera1 = new THREE.PerspectiveCamera(60, width / height, 0.01, 1000)
  camera1.position.set(0, 0, 5)
  scene1.add(camera1)

  // 创建渲染器
  renderer1 = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: window.devicePixelRatio === 1, // 高分辨率屏幕禁用抗锯齿以提升性能
    powerPreference: 'high-performance',
    stencil: false,
    depth: true
  })
  renderer1.setSize(width, height)
  // 限制像素比，避免在高分辨率设备上渲染过多像素
  renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer1.setClearColor(0x000000, 0)
  renderer1.outputColorSpace = THREE.SRGBColorSpace
  // 启用物理正确的光照模式，对玻璃材质很重要
  renderer1.toneMapping = THREE.ACESFilmicToneMapping
  renderer1.toneMappingExposure = 1.0
  modelContainer1.value.appendChild(renderer1.domElement)

  // 创建 Raycaster 用于检测 Sprite 点击
  raycaster1 = new THREE.Raycaster()
  
  // 添加点击事件监听（使用捕获阶段确保事件被处理）
  renderer1.domElement.addEventListener('click', onSpriteClick1, true)

  // 创建OrbitControls
  controls1 = new OrbitControls(camera1, renderer1.domElement)
  controls1.screenSpacePanning = false // 禁用平移
  controls1.enableDamping = true
  controls1.dampingFactor = 0.1
  controls1.autoRotate = true // 启用默认左右旋转
  controls1.autoRotateSpeed = 1.0 // 旋转速度
  controls1.enableRotate = true // 允许旋转查看各个方向
  controls1.enableZoom = false // 禁用缩放，固定大小
  controls1.rotateSpeed = 0.8 // 旋转速度
  controls1.enablePan = false // 禁用平移，保持模型居中
  
  // 监听拖拽开始事件，取消旋转
  controls1.addEventListener('start', () => {
    controls1.autoRotate = false
    // 清除旋转恢复定时器
    if (autoRotateTimer1) {
      clearTimeout(autoRotateTimer1)
      autoRotateTimer1 = null
    }
  })

  // 添加灯光 - 为玻璃材质优化
  // 增强环境光，让玻璃更明亮
  const ambientLight1 = new THREE.AmbientLight(0xffffff, 0.6)
  scene1.add(ambientLight1)

  // 主光源 - 从多个角度照射玻璃
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.2)
  directionalLight1.position.set(5, 5, 5)
  scene1.add(directionalLight1)

  // 添加补光
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight2.position.set(-5, 3, -5)
  scene1.add(directionalLight2)

  // 半球光，模拟天空和地面反射
  const hemiLight1 = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5)
  hemiLight1.position.set(0, 200, 0)
  scene1.add(hemiLight1)
  
  // 添加点光源，增强玻璃的反射效果
  const pointLight1 = new THREE.PointLight(0xffffff, 1.0, 100)
  pointLight1.position.set(0, 10, 10)
  scene1.add(pointLight1)

  const modelPath1 = '/models/loomydraco.glb'
  
  // 检查全局缓存
  const cachedModel1 = getCachedModel(modelPath1)
  if (cachedModel1) {
    setContent1(cachedModel1.clone())
    isFirstModelLoaded.value = true
    console.log('使用预加载的第一个产品模型缓存')
    setTimeout(() => {
      resetCameraToFront1()
    }, 100)
    return
  }
  
  // 加载3D模型 - loomy.glb
  const dracoLoader1 = new DRACOLoader()
  dracoLoader1.setDecoderPath('/draco/')
  dracoLoader1.preload()
  
  const loader1 = new GLTFLoader()
  loader1.setDRACOLoader(dracoLoader1)
  loader1.setRequestHeader({ 'Accept': 'application/octet-stream' })
  
  loader1.load(
    modelPath1,
    (gltf) => {
      const object = gltf.scene || gltf.scenes[0]
      
      if (!object) {
        console.error('第一个产品模型中没有场景')
        return
      }
      
      console.log('第一个产品模型（Draco压缩版）加载成功')

      // 材质优化 - 正确处理玻璃材质
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.frustumCulled = true
          
          if (child.material) {
            const materials = Array.isArray(child.material) ? child.material : [child.material]
            materials.forEach(material => {
              // 启用透明渲染（对玻璃材质很重要）
              if (material.transparent || material.opacity < 1.0) {
                material.transparent = true
                material.depthWrite = false // 玻璃材质关闭深度写入
                material.side = THREE.DoubleSide // 双面渲染
              }
              
              // 如果是物理材质，确保正确配置
              if (material.type === 'MeshPhysicalMaterial' || material.type === 'MeshStandardMaterial') {
                material.envMapIntensity = material.envMapIntensity || 1.0
                material.metalness = material.metalness !== undefined ? material.metalness : 0
                material.roughness = material.roughness !== undefined ? material.roughness : 0.5
              }
              
              material.needsUpdate = true
            })
          }
          
          if (child.geometry) {
            child.geometry.computeBoundingBox()
            child.geometry.computeBoundingSphere()
          }
        }
      })

      setContent1(object)
      isFirstModelLoaded.value = true // 标记第一个模型加载完成
      console.log('第一个产品模型加载成功并已优化')
      
      // 加载完成后，添加一个短暂延迟，然后播放旋转到正面的动画
      setTimeout(() => {
        resetCameraToFront1()
      }, 100)
    },
    (progress) => {
      console.log('第一个产品加载进度:', (progress.loaded / progress.total * 100).toFixed(2) + '%')
    },
    (error) => {
      console.error('加载第一个产品模型失败:', error)
      isFirstModelLoaded.value = false
    }
  )

  // 缓存场景
  cacheScene(sceneKey1, {
    scene: scene1,
    camera: camera1,
    renderer: renderer1,
    controls: controls1,
    content: content1,
    container: modelContainer1.value,
    animationId: null // 动画ID会在startAnimation1中设置
  })

  // 开始动画循环
  startAnimation1()

  // 处理窗口大小变化
  window.addEventListener('resize', onWindowResize1)
}

// 设置第一个产品模型内容
const setContent1 = (object: THREE.Object3D) => {
  if (content1) {
    scene1.remove(content1)
  }

  object.updateMatrixWorld()

  const box = new THREE.Box3().setFromObject(object)
  const size = box.getSize(new THREE.Vector3()).length()
  const center = box.getCenter(new THREE.Vector3())

  console.log('第一个产品模型中心:', center)
  console.log('第一个产品模型尺寸:', size)

  controls1.reset()

  object.position.x -= center.x
  object.position.y -= center.y
  object.position.z -= center.z
  
  // 向下移动模型
  object.position.y -= size / 20

  // 设置固定距离，不允许缩放
  const distance = Math.sqrt(
    Math.pow(size / 1.5, 2) + 
    Math.pow(size / 2.5, 2) + 
    Math.pow(size / 1.5, 2)
  )
  controls1.minDistance = distance // 固定距离，不允许缩放
  controls1.maxDistance = distance // 固定距离，不允许缩放

  // 创建视频标签
  createVideoLabels1(size)

  camera1.near = size / 100
  camera1.far = size * 100
  camera1.updateProjectionMatrix()

  // 放大模型本身（1.2倍）
  object.scale.set(1.2, 1.2, 1.2)

  camera1.position.copy(center)
  camera1.position.x += size / 1.5  // 放大产品，相机更近
  camera1.position.y += size / 2.5  // 放大产品，相机更近
  camera1.position.z += size / 1.5  // 放大产品，相机更近
  camera1.lookAt(center)

  controls1.saveState()
  
  // 确保启用自动旋转
  controls1.autoRotate = true
  controls1.autoRotateSpeed = 1.0

  scene1.add(object)
  content1 = object

  // 创建视频标签
  createVideoLabels1(size)

  console.log('第一个产品模型已居中，相机位置:', camera1.position)
}

// 创建视频标签函数
const createVideoLabels1 = (size: number) => {
  // 移除旧的标签
  if (videoLabelFront1) {
    scene1.remove(videoLabelFront1)
    videoLabelFront1.material.dispose()
    videoLabelFront1 = null
  }
  if (videoLabelBack1) {
    scene1.remove(videoLabelBack1)
    videoLabelBack1.material.dispose()
    videoLabelBack1 = null
  }

  // 创建正面偏下的 Sprite 标签
  videoLabelFront1 = createSpriteLabel('/video.png', () => {
    showVideoModal('/video/正面触点-语音交互.mp4')
  })
  // 正面偏下位置：Z轴正方向（正面），往下移动一点
  videoLabelFront1.position.set(0, -size /4.5, size / 4) // 从 -size/6 改为 -size/5，往下移动
  // 根据模型大小调整 Sprite 尺寸
  const spriteSize = size * 0.08 // 标签大小约为模型的8%
  videoLabelFront1.scale.set(spriteSize, spriteSize, 1)
  // 存储原始缩放值用于呼吸动画
  videoLabelFront1.userData.baseScale = spriteSize
  // 设置 Sprite 可点击
  videoLabelFront1.userData.isClickable = true
  scene1.add(videoLabelFront1)

  // 创建背面偏上的 Sprite 标签
  videoLabelBack1 = createSpriteLabel('/video.png', () => {
    showVideoModal('/video/背面触点-呼猫模式.mp4')
  })
  // 背面偏上位置：Z轴负方向（背面），往上移动一点
  videoLabelBack1.position.set(0, size / 3.8, -size / 4) // 从 size/4 改为 size/3，往上移动
  videoLabelBack1.scale.set(spriteSize, spriteSize, 1)
  // 存储原始缩放值用于呼吸动画
  videoLabelBack1.userData.baseScale = spriteSize
  // 设置 Sprite 可点击
  videoLabelBack1.userData.isClickable = true
  scene1.add(videoLabelBack1)
}

// 窗口大小变化处理 - 第一个产品（节流优化）
let resizeTimeout1: number | null = null
const onWindowResize1 = () => {
  if (!modelContainer1.value) return
  
  // 使用节流，避免频繁调整大小
  if (resizeTimeout1) {
    clearTimeout(resizeTimeout1)
  }
  
  resizeTimeout1 = window.setTimeout(() => {
    if (!modelContainer1.value) return
    
    const width = modelContainer1.value.clientWidth
    const height = modelContainer1.value.clientHeight
    
    camera1.aspect = width / height
    camera1.updateProjectionMatrix()
    renderer1.setSize(width, height)
    
    resizeTimeout1 = null
  }, 150) // 150ms节流
}

// 动画循环 - 第一个产品（优化帧率，只在可见时渲染）
let lastFrameTime1 = 0
const targetFrameRate1 = 1000 / 24 // 24 FPS，进一步降低渲染频率节省性能
let isAnimating1 = false

const animate1 = () => {
  if (!isAnimating1) return // 如果动画已停止，不继续请求帧
  
  animationId1 = requestAnimationFrame(animate1)
  
  // 更新缓存的动画ID
  const sceneKey1 = 'product-series-scene1'
  const cached = getCachedScene(sceneKey1)
  if (cached) {
    cached.animationId = animationId1
  }
  
  const now = Date.now()
  const delta = now - lastFrameTime1
  
  // 限制帧率到24fps，减少GPU负载
  if (delta < targetFrameRate1) {
    return
  }
  
  lastFrameTime1 = now - (delta % targetFrameRate1)
  
  // 只在第一个区域可见时才渲染
  if (isSection1Visible.value && controls1 && renderer1 && scene1 && camera1) {
    // 更新controls（包括自动旋转）- 必须调用才能让自动旋转生效
    controls1.update()
    
    // 更新视频标签的呼吸动画
    updateVideoLabelsBreathing1()
    
    renderer1.render(scene1, camera1)
  }
}

// 更新视频标签的呼吸动画
const updateVideoLabelsBreathing1 = () => {
  const time = Date.now() * 0.001 // 转换为秒
  const breatheSpeed = 2.0 // 呼吸速度（每秒2次）
  const breatheAmount = 0.15 // 呼吸幅度（15%）
  
  // 正面标签呼吸动画
  if (videoLabelFront1 && videoLabelFront1.userData.baseScale) {
    const baseScale = videoLabelFront1.userData.baseScale
    const scale = baseScale * (1 + Math.sin(time * breatheSpeed) * breatheAmount)
    videoLabelFront1.scale.set(scale, scale, 1)
  }
  
  // 背面标签呼吸动画
  if (videoLabelBack1 && videoLabelBack1.userData.baseScale) {
    const baseScale = videoLabelBack1.userData.baseScale
    const scale = baseScale * (1 + Math.sin(time * breatheSpeed) * breatheAmount)
    videoLabelBack1.scale.set(scale, scale, 1)
  }
}

// 启动动画1
const startAnimation1 = () => {
  if (!isAnimating1) {
    isAnimating1 = true
    animate1()
  }
}

// 停止动画1
const stopAnimation1 = () => {
  isAnimating1 = false
  if (animationId1) {
    cancelAnimationFrame(animationId1)
  }
}

// 初始化第二个产品的Three.js场景（AXONROB）
const init3DScene = () => {
  if (!modelContainer.value) {
    console.error('第二个产品模型容器未找到')
    return
  }

  const sceneKey2 = 'product-series-scene2'
  
  // 检查是否有缓存的场景
  if (hasCachedScene(sceneKey2)) {
    console.log('发现缓存的第二个产品场景，正在恢复...')
    if (restoreScene(sceneKey2, modelContainer.value)) {
      // 恢复场景变量引用
      const cached = getCachedScene(sceneKey2)!
      scene = cached.scene as THREE.Scene
      camera = cached.camera as THREE.PerspectiveCamera
      renderer = cached.renderer as THREE.WebGLRenderer
      controls = cached.controls as OrbitControls
      content = cached.content
      
      // 重置动画状态
      isAnimating2 = false
      
      // 重新配置controls
      controls.enableZoom = false // 禁用缩放，固定大小
      controls.autoRotate = true // 启用默认左右旋转
      controls.autoRotateSpeed = 1.0
      
      // 重新绑定拖拽事件监听器
      controls.removeEventListener('start', () => {})
      controls.addEventListener('start', () => {
        controls.autoRotate = false
        if (autoRotateTimer2) {
          clearTimeout(autoRotateTimer2)
          autoRotateTimer2 = null
        }
      })
      
      // 重新启动动画
      startAnimation2()
      
      // 重新绑定窗口大小变化事件
      window.addEventListener('resize', onWindowResize)
      
      isSecondModelLoaded.value = true
      console.log('第二个产品场景已从缓存恢复，无需重新加载模型')
      return
    }
  }

  const width = modelContainer.value.clientWidth
  const height = modelContainer.value.clientHeight
  
  // 确保容器有有效的尺寸
  if (width === 0 || height === 0) {
    retryCount++
    if (retryCount > 10) {
      console.error('模型容器尺寸始终为0，停止重试。')
      return
    }
    console.error('模型容器尺寸为0，延迟重试 (', retryCount, '/10)')
    setTimeout(() => init3DScene(), 200)
    return
  }

  console.log('初始化新的第二个产品Three.js场景，容器尺寸:', width, height)

  // 创建场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)
  scene.background = null // 透明背景

  // 创建相机
  camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 1000)
  camera.position.set(0, 0, 5)
  scene.add(camera)

  // 创建渲染器（性能优化）
  renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: window.devicePixelRatio === 1, // 高分辨率屏幕禁用抗锯齿以提升性能
    powerPreference: 'high-performance', // 优先使用高性能GPU
    stencil: false, // 禁用模板缓冲
    depth: true // 启用深度缓冲
  })
  renderer.setSize(width, height)
  // 限制像素比，避免在高分辨率设备上渲染过多像素
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setClearColor(0x000000, 0)
  // 启用输出编码以获得更好的颜色
  renderer.outputColorSpace = THREE.SRGBColorSpace
  modelContainer.value.appendChild(renderer.domElement)

  // 创建OrbitControls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.screenSpacePanning = false // 禁用平移
  controls.enableDamping = true
  controls.dampingFactor = 0.1
  controls.autoRotate = true // 启用默认左右旋转
  controls.autoRotateSpeed = 1.0 // 旋转速度
  controls.enableRotate = true // 允许旋转查看各个方向
  controls.enableZoom = false // 禁用缩放，固定大小
  controls.rotateSpeed = 0.8 // 旋转速度
  controls.enablePan = false // 禁用平移，保持模型居中
  
  // 监听拖拽开始事件，取消旋转
  controls.addEventListener('start', () => {
    controls.autoRotate = false
    // 清除旋转恢复定时器
    if (autoRotateTimer2) {
      clearTimeout(autoRotateTimer2)
      autoRotateTimer2 = null
    }
  })

  // 添加灯光（优化方向以减少正面反光）
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3) // 恢复原始强度
  camera.add(ambientLight)

  // 主光源 - 调整方向避免正面直射
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8 * Math.PI) // 恢复原始强度
  directionalLight.position.set(0.866, 0.5, 0.5) // 调整方向：从侧上方照射
  camera.add(directionalLight)

  // 添加半球光
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1) // 恢复原始强度
  hemiLight.position.set(0, 200, 0)
  scene.add(hemiLight)

  const modelPath = '/models/zbhdraco.glb'
  
  // 检查全局缓存
  const cachedModel = getCachedModel(modelPath)
  if (cachedModel) {
    setContent(cachedModel.clone())
    isSecondModelLoaded.value = true
    console.log('使用预加载的第二个产品模型缓存')
    return
  }
  
  // 加载3D模型
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/')
  dracoLoader.preload()
  
  const loader = new GLTFLoader()
  loader.setDRACOLoader(dracoLoader)
  loader.setRequestHeader({ 'Accept': 'application/octet-stream' })
  
  loader.load(
    modelPath,
    (gltf) => {
      const object = gltf.scene || gltf.scenes[0]
      
      if (!object) {
        console.error('第二个产品模型中没有场景')
        return
      }
      
      console.log('第二个产品模型（Draco压缩版）加载成功')

      // 性能优化：遍历模型并优化材质和几何体
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // 启用几何体的frustum culling
          child.frustumCulled = true
          
          // 优化材质
          if (child.material) {
            // 如果是数组材质
            const materials = Array.isArray(child.material) ? child.material : [child.material]
            materials.forEach(material => {
              // 禁用不必要的材质功能以提升性能
              material.precision = 'mediump' // 使用中等精度
              material.needsUpdate = true
            })
          }
          
          // 如果几何体有顶点颜色，可以考虑删除以减少内存
          if (child.geometry) {
            child.geometry.computeBoundingBox()
            child.geometry.computeBoundingSphere()
          }
        }
      })

      setContent(object)
      isSecondModelLoaded.value = true // 标记第二个模型加载完成
      console.log('第二个产品模型加载成功并已优化')
    },
    (progress) => {
      console.log('第二个产品加载进度:', (progress.loaded / progress.total * 100).toFixed(2) + '%')
    },
    (error) => {
      console.error('加载第二个产品模型失败:', error)
      isSecondModelLoaded.value = false
    }
  )

  // 缓存场景
  cacheScene(sceneKey2, {
    scene,
    camera,
    renderer,
    controls,
    content,
    container: modelContainer.value,
    animationId: null // 动画ID会在startAnimation2中设置
  })

  // 开始动画循环
  startAnimation2()

  // 处理窗口大小变化
  window.addEventListener('resize', onWindowResize)
}

// 设置模型内容（参考three-gltf-viewer）
const setContent = (object: THREE.Object3D) => {
  // 清除旧内容
  if (content) {
    scene.remove(content)
  }

  object.updateMatrixWorld()

  // 计算边界框
  const box = new THREE.Box3().setFromObject(object)
  const size = box.getSize(new THREE.Vector3()).length()
  const center = box.getCenter(new THREE.Vector3())

  console.log('模型中心:', center)
  console.log('模型尺寸:', size)

  // 重置controls
  controls.reset()

  // 将模型移到中心（参考three-gltf-viewer的方式）
  object.position.x -= center.x
  object.position.y -= center.y
  object.position.z -= center.z

  // 将模型稍微往下移动（减少偏移量，让模型显示更高）
  object.position.y -= size * 0.05  // 向下移动模型高度的5%（从15%减少到5%）

  // 设置固定距离，不允许缩放
  const distance = Math.sqrt(
    Math.pow(size / 1.5, 2) + 
    Math.pow(size / 2.5, 2) + 
    Math.pow(size / 1.5, 2)
  )
  controls.minDistance = distance // 固定距离，不允许缩放
  controls.maxDistance = distance // 固定距离，不允许缩放

  // 设置相机的近远裁剪面
  camera.near = size / 100
  camera.far = size * 100
  camera.updateProjectionMatrix()

  // 设置相机位置（放大产品）
  camera.position.copy(center)
  camera.position.x += size / 1.5  // 放大产品，相机更近
  camera.position.y += size / 2.5  // 放大产品，相机更近
  camera.position.z += size / 1.5  // 放大产品，相机更近
  camera.lookAt(center)

  // 保存controls状态
  controls.saveState()
  
  // 确保启用自动旋转
  controls.autoRotate = true
  controls.autoRotateSpeed = 1.0

  // 将模型添加到场景
  scene.add(object)
  content = object

  console.log('模型已居中，相机位置:', camera.position)
}

// 窗口大小变化处理（节流优化）
const onWindowResize = () => {
  if (!modelContainer.value) return
  
  // 使用节流避免频繁调整大小
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
  }
  
  resizeTimeout = window.setTimeout(() => {
    const width = modelContainer.value!.clientWidth
    const height = modelContainer.value!.clientHeight
    
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    resizeTimeout = null
  }, 100) // 100ms节流
}

// 动画循环 - 第二个产品（优化帧率，只在可见时渲染）
let lastFrameTime2 = 0
const targetFrameRate2 = 1000 / 24 // 24 FPS，进一步降低渲染频率节省性能
let isAnimating2 = false

const animate = () => {
  if (!isAnimating2) return // 如果动画已停止，不继续请求帧
  
  animationId = requestAnimationFrame(animate)
  
  // 更新缓存的动画ID
  const sceneKey2 = 'product-series-scene2'
  const cached = getCachedScene(sceneKey2)
  if (cached) {
    cached.animationId = animationId
  }
  
  const now = Date.now()
  const delta = now - lastFrameTime2
  
  // 限制帧率到24fps，减少GPU负载
  if (delta < targetFrameRate2) {
    return
  }
  
  lastFrameTime2 = now - (delta % targetFrameRate2)
  
  // 只在第二个区域可见时才渲染
  if (isSection2Visible.value && controls && renderer && scene && camera) {
    // 更新controls（包括自动旋转）- 必须调用才能让自动旋转生效
    controls.update()
    renderer.render(scene, camera)
  }
}

// 启动动画2
const startAnimation2 = () => {
  if (!isAnimating2) {
    isAnimating2 = true
    animate()
  }
}

// 停止动画2
const stopAnimation2 = () => {
  isAnimating2 = false
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
}

// 清理第一个产品的3D场景（完整的资源释放）
const cleanup3DScene1 = () => {
  // 停止动画循环
  stopAnimation1()
  
  // 清理resize timeout
  if (resizeTimeout1) {
    clearTimeout(resizeTimeout1)
    resizeTimeout1 = null
  }
  
  // 移除事件监听
  window.removeEventListener('resize', onWindowResize1)
  
  // 清理controls
  if (controls1) {
    controls1.dispose()
  }
  
  // 清理场景中的所有对象
  if (scene1) {
    scene1.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        if (object.geometry) {
          object.geometry.dispose()
        }
        
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => {
              Object.keys(material).forEach(key => {
                const value = material[key]
                if (value && value instanceof THREE.Texture) {
                  value.dispose()
                }
              })
              material.dispose()
            })
          } else {
            Object.keys(object.material).forEach(key => {
              const value = object.material[key]
              if (value && value instanceof THREE.Texture) {
                value.dispose()
              }
            })
            object.material.dispose()
          }
        }
      }
    })
    
    while(scene1.children.length > 0) { 
      scene1.remove(scene1.children[0])
    }
  }
  
  // 清理渲染器
  if (renderer1 && modelContainer1.value) {
    renderer1.renderLists.dispose()
    if (modelContainer1.value.contains(renderer1.domElement)) {
      modelContainer1.value.removeChild(renderer1.domElement)
    }
    renderer1.dispose()
  }
  
  // 清空引用
  content1 = null
}

// 清理第二个产品的3D场景（完整的资源释放）
const cleanup3DScene = () => {
  // 停止动画循环
  stopAnimation2()
  
  // 清理resize定时器
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
    resizeTimeout = null
  }
  
  // 移除事件监听
  window.removeEventListener('resize', onWindowResize)
  
  // 清理controls
  if (controls) {
    controls.dispose()
  }
  
  // 清理场景中的所有对象
  if (scene) {
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        // 释放几何体
        if (object.geometry) {
          object.geometry.dispose()
        }
        
        // 释放材质
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => {
              // 释放材质中的纹理
              Object.keys(material).forEach(key => {
                const value = material[key]
                if (value && value instanceof THREE.Texture) {
                  value.dispose()
                }
              })
              material.dispose()
            })
          } else {
            // 释放材质中的纹理
            Object.keys(object.material).forEach(key => {
              const value = object.material[key]
              if (value && value instanceof THREE.Texture) {
                value.dispose()
              }
            })
            object.material.dispose()
          }
        }
      }
    })
    
    // 清空场景
    while(scene.children.length > 0) { 
      scene.remove(scene.children[0])
    }
  }
  
  // 清理渲染器
  if (renderer && modelContainer.value) {
    renderer.renderLists.dispose()
    if (modelContainer.value.contains(renderer.domElement)) {
      modelContainer.value.removeChild(renderer.domElement)
    }
    renderer.dispose()
  }
  
  // 清空引用
  content = null
}

// 第一个产品 - 处理按钮点击
const handleButtonClick = (position: string) => {
  if (activeButton.value === position) {
    activeButton.value = null
    sideImage.value = null
    overlayPosition.value = ''
  } else {
    activeButton.value = position
    
    if (position === 'left') {
      sideImage.value = '/button2.webp'
      overlayPosition.value = 'left-overlay'
    } else if (position === 'bottom') {
      sideImage.value = '/button3.webp'
      overlayPosition.value = 'bottom-overlay'
    } else {
      sideImage.value = null
      overlayPosition.value = ''
    }
  }
}

// 第一个产品 - 关闭叠加图片
const closeOverlay = () => {
  activeButton.value = null
  sideImage.value = null
  overlayPosition.value = ''
}

// 第一个产品 - 处理图标点击
const handleIconClick = (type: string) => {
  if (type === '参数') {
    showParamsImage.value = !showParamsImage.value
  } else if (type === '正面' || type === '侧面' || type === '右侧' || type === '背面') {
    // 旋转相机到对应视角（旋转逻辑在rotateCameraToView1内部处理）
    rotateCameraToView1(type)
  }
}

// 第一个产品 - 旋转相机到指定视角
const rotateCameraToView1 = (view: string) => {
  if (!content1 || !controls1 || !camera1) {
    console.warn('rotateCameraToView1: 场景未初始化', { content1: !!content1, controls1: !!controls1, camera1: !!camera1 })
    return
  }
  
  // 模型已居中到原点，所以中心点是原点
  const center = new THREE.Vector3(0, 0, 0)
  
  // 获取当前相机到原点的距离
  const currentDistance = camera1.position.distanceTo(center)
  
  // 根据视角设置相机目标位置，保持当前的距离
  let targetPosition = new THREE.Vector3()
  
  // 计算模型尺寸以确定合适的相机距离
  const box = new THREE.Box3().setFromObject(content1)
  const size = box.getSize(new THREE.Vector3()).length()
  const distance = Math.sqrt(
    Math.pow(size / 1.5, 2) + 
    Math.pow(size / 2.5, 2) + 
    Math.pow(size / 1.5, 2)
  )
  
  // 检测当前视角（通过相机位置判断）
  const currentPos = camera1.position
  const isCurrentlyRight = currentPos.x < -0.1
  const isCurrentlyLeft = currentPos.x > 0.1
  
  // 判断是否是从侧面到右侧（或反之）的切换
  const isSideToRightTransition = (isCurrentlyLeft && view === '右侧') || (isCurrentlyRight && view === '侧面')
  
  switch (view) {
    case '正面':
      // 正面视角 - 相机在Z轴正方向，稍微向上偏移
      targetPosition.set(0, size / 2.5, distance)
      break
    case '侧面':
      // 侧面视角 - 相机在X轴正方向，稍微向上偏移
      targetPosition.set(distance, size / 2.5, 0)
      break
    case '右侧':
      // 右侧视角 - 相机在X轴负方向，稍微向上偏移
      targetPosition.set(-distance, size / 2.5, 0)
      break
    case '背面':
      // 背面视角 - 相机在Z轴负方向，稍微向上偏移
      targetPosition.set(0, size / 2.5, -distance)
      break
    default:
      console.warn('rotateCameraToView1: 未知视角', view)
      return
  }
  
  // 禁用旋转，准备动画
  controls1.autoRotate = false
  
  // 清除之前的定时器
  if (autoRotateTimer1) {
    clearTimeout(autoRotateTimer1)
    autoRotateTimer1 = null
  }
  
  // 更新标签可见性
  updateVideoLabelsVisibility1(view)

  // 如果是侧面到右侧的切换，使用水平旋转动画
  if (isSideToRightTransition) {
    animateCameraHorizontalRotation1(targetPosition, center, () => {
      // 动画完成后，根据view类型决定是否恢复旋转
      if (view === '侧面' || view === '右侧' || view === '背面') {
        // 侧面、右侧和背面不恢复旋转
        controls1.autoRotate = false
      } else if (view === '正面') {
        // 正面3秒后恢复旋转
        autoRotateTimer1 = window.setTimeout(() => {
          if (controls1) {
            controls1.autoRotate = true
          }
        }, 3000)
      }
    })
  } else {
    // 使用普通动画平滑过渡到目标位置
    animateCameraToPosition1(targetPosition, center, () => {
      // 动画完成后，根据view类型决定是否恢复旋转
      if (view === '侧面' || view === '右侧' || view === '背面') {
        // 侧面、右侧和背面不恢复旋转
        controls1.autoRotate = false
      } else if (view === '正面') {
        // 正面3秒后恢复旋转
        autoRotateTimer1 = window.setTimeout(() => {
          if (controls1) {
            controls1.autoRotate = true
          }
        }, 3000)
      }
    })
  }
}

// 更新视频标签可见性（根据视角）- Sprite 会自动处理深度，无需手动更新
const updateVideoLabelsVisibility1 = (_view: string) => {
  // Sprite 使用 depthTest 和 depthWrite，会自动被模型遮挡
  // 无需手动更新可见性
}

// 第一个产品 - 相机位置动画
const animateCameraToPosition1 = (targetPosition: THREE.Vector3, targetLookAt: THREE.Vector3, onComplete?: () => void) => {
  if (!camera1 || !controls1 || !renderer1 || !scene1) {
    console.warn('animateCameraToPosition1: 场景未初始化')
    return
  }
  
  const startPosition = camera1.position.clone()
  const startLookAt = controls1.target.clone()
  const duration = 1000 // 1秒动画
  const startTime = Date.now()
  
  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // 使用easeInOutCubic缓动函数
    const eased = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2
    
    // 插值相机位置
    camera1.position.lerpVectors(startPosition, targetPosition, eased)
    
    // 插值相机目标
    const newTarget = new THREE.Vector3().lerpVectors(startLookAt, targetLookAt, eased)
    controls1.target.copy(newTarget)
    camera1.lookAt(newTarget)
    
    controls1.update()
    
    // 确保在动画过程中也渲染场景
    if (renderer1 && scene1 && camera1) {
      renderer1.render(scene1, camera1)
    }
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    } else if (onComplete) {
      onComplete()
    }
  }
  
  animate()
}

// 第一个产品 - 水平旋转动画（侧面到右侧）
const animateCameraHorizontalRotation1 = (targetPosition: THREE.Vector3, targetLookAt: THREE.Vector3, onComplete?: () => void) => {
  if (!camera1 || !controls1 || !renderer1 || !scene1) {
    console.warn('animateCameraHorizontalRotation1: 场景未初始化')
    return
  }
  
  const startPosition = camera1.position.clone()
  const startLookAt = controls1.target.clone()
  const duration = 1000 // 1秒动画
  const startTime = Date.now()
  
  // 保持Y坐标不变（水平旋转）
  const fixedY = startPosition.y
  
  // 计算起始和目标角度（绕Y轴的水平角度）
  const startAngle = Math.atan2(startPosition.x, startPosition.z)
  const targetAngle = Math.atan2(targetPosition.x, targetPosition.z)
  
  // 计算水平距离（半径）
  const radius = Math.sqrt(startPosition.x * startPosition.x + startPosition.z * startPosition.z)
  
  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // 使用easeInOutCubic缓动函数
    const eased = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2
    
    // 插值角度（水平旋转）
    const currentAngle = startAngle + (targetAngle - startAngle) * eased
    
    // 计算新的相机位置（保持Y坐标不变，只改变X和Z）
    camera1.position.x = Math.sin(currentAngle) * radius
    camera1.position.y = fixedY // 保持Y坐标不变
    camera1.position.z = Math.cos(currentAngle) * radius
    
    // 插值相机目标
    const newTarget = new THREE.Vector3().lerpVectors(startLookAt, targetLookAt, eased)
    controls1.target.copy(newTarget)
    camera1.lookAt(newTarget)
    
    controls1.update()
    
    // 确保在动画过程中也渲染场景
    if (renderer1 && scene1 && camera1) {
      renderer1.render(scene1, camera1)
    }
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    } else if (onComplete) {
      onComplete()
    }
  }
  
  animate()
}

// 第一个产品 - 重置相机到正面视角
const resetCameraToFront1 = () => {
  if (!content1 || !controls1 || !camera1) return
  
  // 获取当前相机到目标点的距离
  const currentDistance = camera1.position.distanceTo(controls1.target)
  const center = controls1.target.clone()
  
  // 正面视角 - 相机在Z轴正方向
  const targetPosition = new THREE.Vector3(center.x, center.y, center.z + currentDistance)
  
  // 暂时禁用旋转，动画完成后恢复
  controls1.autoRotate = false
  
  // 平滑过渡到正面视角
  animateCameraToPosition1(targetPosition, center, () => {
    // 动画完成后，3秒后恢复旋转
    if (autoRotateTimer1) {
      clearTimeout(autoRotateTimer1)
    }
    autoRotateTimer1 = window.setTimeout(() => {
      if (controls1) {
        controls1.autoRotate = true
      }
    }, 3000)
  })
}

// 第一个产品 - 关闭参数图片
const closeParamsImage = () => {
  showParamsImage.value = false
}

// 第二个产品 - 处理图标点击
const handleIconClick2 = (type: string) => {
  if (type === '正面' || type === '侧面' || type === '右侧' || type === '背面') {
    // 旋转相机到对应视角（旋转逻辑在rotateCameraToView内部处理）
    rotateCameraToView(type)
  }
}

// 旋转相机到指定视角
const rotateCameraToView = (view: string) => {
  if (!content || !controls || !camera) {
    console.warn('rotateCameraToView: 场景未初始化', { content: !!content, controls: !!controls, camera: !!camera })
    return
  }
  
  // 模型已居中到原点，所以中心点是原点
  const center = new THREE.Vector3(0, 0, 0)
  
  // 计算模型尺寸以确定合适的相机距离
  const box = new THREE.Box3().setFromObject(content)
  const size = box.getSize(new THREE.Vector3()).length()
  const distance = Math.sqrt(
    Math.pow(size / 1.5, 2) + 
    Math.pow(size / 2.5, 2) + 
    Math.pow(size / 1.5, 2)
  )
  
  // 根据视角设置相机目标位置
  let targetPosition = new THREE.Vector3()
  
  switch (view) {
    case '正面':
      // 正面视角 - 相机在Z轴正方向，稍微向上偏移
      targetPosition.set(0, size / 2.5, distance)
      break
    case '侧面':
      // 侧面视角 - 相机在X轴正方向，稍微向上偏移
      targetPosition.set(distance, size / 2.5, 0)
      break
    case '右侧':
      // 右侧视角 - 相机在X轴负方向，稍微向上偏移
      targetPosition.set(-distance, size / 2.5, 0)
      break
    case '背面':
      // 背面视角 - 相机在Z轴负方向，稍微向上偏移
      targetPosition.set(0, size / 2.5, -distance)
      break
    default:
      console.warn('rotateCameraToView: 未知视角', view)
      return
  }
  
  // 禁用旋转，准备动画
  controls.autoRotate = false
  
  // 清除之前的定时器
  if (autoRotateTimer2) {
    clearTimeout(autoRotateTimer2)
    autoRotateTimer2 = null
  }
  
  // 使用动画平滑过渡到目标位置
  animateCameraToPosition(targetPosition, center, () => {
    // 动画完成后，根据view类型决定是否恢复旋转
    if (view === '侧面' || view === '右侧' || view === '背面') {
      // 侧面、右侧和背面不恢复旋转
      controls.autoRotate = false
    } else if (view === '正面') {
      // 正面3秒后恢复旋转
      autoRotateTimer2 = window.setTimeout(() => {
        if (controls) {
          controls.autoRotate = true
        }
      }, 3000)
    }
  })
}

// 相机位置动画
const animateCameraToPosition = (targetPosition: THREE.Vector3, targetLookAt: THREE.Vector3, onComplete?: () => void) => {
  if (!camera || !controls || !renderer || !scene) {
    console.warn('animateCameraToPosition: 场景未初始化')
    return
  }
  
  const startPosition = camera.position.clone()
  const startLookAt = controls.target.clone()
  const duration = 1000 // 1秒动画
  const startTime = Date.now()
  
  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // 使用easeInOutCubic缓动函数
    const eased = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2
    
    // 插值相机位置
    camera.position.lerpVectors(startPosition, targetPosition, eased)
    
    // 插值相机目标
    const newTarget = new THREE.Vector3().lerpVectors(startLookAt, targetLookAt, eased)
    controls.target.copy(newTarget)
    camera.lookAt(newTarget)
    
    controls.update()
    
    // 确保在动画过程中也渲染场景
    if (renderer && scene && camera) {
      renderer.render(scene, camera)
    }
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    } else if (onComplete) {
      onComplete()
    }
  }
  
  animate()
}

// 第二个产品 - 重置相机到正面视角
const resetCameraToFront2 = () => {
  if (!content || !controls || !camera) return
  
  // 获取当前相机到目标点的距离
  const currentDistance = camera.position.distanceTo(controls.target)
  const center = controls.target.clone()
  
  // 正面视角 - 相机在Z轴正方向
  const targetPosition = new THREE.Vector3(center.x, center.y, center.z + currentDistance)
  
  // 暂时禁用旋转，动画完成后恢复
  controls.autoRotate = false
  
  // 平滑过渡到正面视角
  animateCameraToPosition(targetPosition, center, () => {
    // 动画完成后，3秒后恢复旋转
    if (autoRotateTimer2) {
      clearTimeout(autoRotateTimer2)
    }
    autoRotateTimer2 = window.setTimeout(() => {
      if (controls) {
        controls.autoRotate = true
      }
    }, 3000)
  })
}


// 滚动到下一个产品
const scrollToNextProduct = () => {
  scrollToSection(1) // 滚动到第二个产品区域
}

// 全屏滚动功能
let currentSection = 0
const sections = ['product-loomi', 'product-axonrob', 'footer']
let isScrolling = false
let lastScrollTime = 0

// 检测当前在哪个区域
const getCurrentSection = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  
  // 计算每个区域的精确位置
  for (let i = 0; i < sections.length; i++) {
    const sectionId = sections[i]
    let element: Element | null = null
    
    if (sectionId === 'product-loomi' || sectionId === 'product-axonrob') {
      const productSections = document.querySelectorAll('.product-section')
      if (sectionId === 'product-loomi' && productSections[0]) {
        element = productSections[0]
      } else if (sectionId === 'product-axonrob' && productSections[1]) {
        element = productSections[1]
      }
    } else {
      element = document.getElementById(sectionId)
    }
    
    if (element) {
      const rect = element.getBoundingClientRect()
      const elementTop = rect.top + scrollTop
      const elementBottom = elementTop + (element as HTMLElement).offsetHeight
      
      // 如果当前滚动位置在这个区域范围内
      if (scrollTop >= elementTop - windowHeight * 0.3 && 
          scrollTop < elementBottom - windowHeight * 0.7) {
        return i
      }
    }
  }
  
  // 如果没有匹配的区域，返回最接近的
  if (scrollTop < windowHeight * 0.5) return 0
  
  return Math.min(Math.round(scrollTop / windowHeight), sections.length - 1)
}

const scrollToSection = (index: number) => {
  if (index < 0 || index >= sections.length || isScrolling) return
  
  const sectionId = sections[index]
  let element: Element | null = null
  
  if (sectionId === 'product-loomi' || sectionId === 'product-axonrob') {
    const productSections = document.querySelectorAll('.product-section')
    if (sectionId === 'product-loomi' && productSections[0]) {
      element = productSections[0]
    } else if (sectionId === 'product-axonrob' && productSections[1]) {
      element = productSections[1]
    }
  } else {
    element = document.getElementById(sectionId)
  }
  
  if (element) {
    isScrolling = true
    lastScrollTime = Date.now()
    
    requestAnimationFrame(() => {
      element!.scrollIntoView({ 
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
    return
  }
  
  // 对于其他区域，使用全屏翻页
  event.preventDefault()
  
  const scrollDelta = Math.abs(event.deltaY)
  
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

// 组件挂载时初始化3D场景
onMounted(() => {
  // 增加延迟，确保canvas元素完全渲染
  setTimeout(() => {
    init3DScene1() // 初始化第一个产品的3D场景（LOOMI）
    init3DScene()  // 同时初始化第二个产品的3D场景（AXONROB）
  }, 300)
  
  // 初始化页面位置
  initializePagePosition()
  
  // 添加全屏滚动事件监听
  window.addEventListener('wheel', handleWheel, { passive: false })
  
  // 添加窗口大小变化监听，重新对齐页面
  window.addEventListener('resize', () => {
    setTimeout(() => {
      initializePagePosition()
    }, 200)
  })
  
  // 性能优化：使用Intersection Observer监控section可见性
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3 // 当30%的内容可见时触发
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target.classList.contains('product-section')) {
        // 判断是第几个section
        const sections = document.querySelectorAll('.product-section')
        const index = Array.from(sections).indexOf(entry.target as Element)
        
        if (index === 0) {
          // 第一个产品区域
          const wasVisible = isSection1Visible.value
          isSection1Visible.value = entry.isIntersecting
          console.log('第一个产品区域可见:', entry.isIntersecting)
          
          // 性能优化：根据可见性启动/停止动画
          if (entry.isIntersecting) {
            startAnimation1()
          } else {
            stopAnimation1()
          }
          
          // 当区域从不可见变为可见时，重置相机到正面视角
          if (!wasVisible && entry.isIntersecting && content1 && controls1) {
            console.log('重置第一个产品相机到正面视角')
            resetCameraToFront1()
          }
        } else if (index === 1) {
          // 第二个产品区域
          const wasVisible = isSection2Visible.value
          isSection2Visible.value = entry.isIntersecting
          console.log('第二个产品区域可见:', entry.isIntersecting)
          
          // 性能优化：根据可见性启动/停止动画
          if (entry.isIntersecting) {
            startAnimation2()
          } else {
            stopAnimation2()
          }
          
          // 当区域从不可见变为可见时，重置相机到正面视角
          if (!wasVisible && entry.isIntersecting && content && controls) {
            console.log('重置第二个产品相机到正面视角')
            resetCameraToFront2()
          }
        }
      }
    })
  }, observerOptions)
  
  // 观察所有product-section
  setTimeout(() => {
    const sections = document.querySelectorAll('.product-section')
    sections.forEach(section => {
      observer.observe(section)
    })
  }, 500)
})

// 组件卸载时清理3D场景
onUnmounted(() => {
  // 清理旋转恢复定时器
  if (autoRotateTimer1) {
    clearTimeout(autoRotateTimer1)
    autoRotateTimer1 = null
  }
  if (autoRotateTimer2) {
    clearTimeout(autoRotateTimer2)
    autoRotateTimer2 = null
  }
  
  // 停止动画循环，但保留场景资源
  stopAnimation1()
  stopAnimation2()
  
  // 更新缓存的动画ID
  const sceneKey1 = 'product-series-scene1'
  const sceneKey2 = 'product-series-scene2'
  const cached1 = getCachedScene(sceneKey1)
  const cached2 = getCachedScene(sceneKey2)
  if (cached1) {
    cached1.animationId = null
  }
  if (cached2) {
    cached2.animationId = null
  }
  
  // 从DOM中移除渲染器，但不销毁它（保留在缓存中）
  if (renderer1 && modelContainer1.value && modelContainer1.value.contains(renderer1.domElement)) {
    modelContainer1.value.removeChild(renderer1.domElement)
  }
  if (renderer && modelContainer.value && modelContainer.value.contains(renderer.domElement)) {
    modelContainer.value.removeChild(renderer.domElement)
  }
  
  // 清理事件监听器
  window.removeEventListener('resize', onWindowResize1)
  window.removeEventListener('resize', onWindowResize)
  window.removeEventListener('wheel', handleWheel)
  
  // 移除 Sprite 点击事件监听
  if (renderer1 && renderer1.domElement) {
    renderer1.domElement.removeEventListener('click', onSpriteClick1)
  }
  
  console.log('组件卸载，场景已保存到缓存，下次进入将直接恢复')
  
  // 注意：不再调用cleanup3DScene1和cleanup3DScene，保留场景资源在缓存中
})
</script>

<style scoped>
/* 产品系列页面容器 */
.product-series-container {
  width: 100%;
  height: auto;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
}

/* 3D模型加载状态（局部） */
.model-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent; /* 纯透明，不遮挡背景 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  z-index: 5;
  pointer-events: none; /* 不阻止鼠标事件 */
}

.model-loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(1, 206, 126, 0.2);
  border-top-color: #01CE7E;
  border-radius: 50%;
  animation: model-spin 1s linear infinite;
}

@keyframes model-spin {
  to {
    transform: rotate(360deg);
  }
}

.model-loading-text {
  color: #ffffff;
  font-family: 'MiSans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  margin: 0;
}

/* 产品区域 */
.product-section {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

/* 背景图片 */
.product-series-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

/* LOOMI 背景 */
.loomi-bg {
  background-image: url('/loomi_bg.webp');
}

/* AXONROB 背景 */
.axonrob-bg {
  background-image: url('/axonrob_bg.webp');
}

/* 主要内容 */
.product-series-content {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  padding-top: 0; /* 移除顶部padding，让内容完全居中 */
  padding-bottom: 0; /* 移除底部padding */
  pointer-events: none; /* 容器本身不阻止点击 */
}

.product-series-content > * {
  pointer-events: auto; /* 子元素可以点击 */
}

/* 小标题容器 */
.product-title-container {
  margin-bottom: 40px;
  position: relative; /* 必须有position才能让z-index生效 */
  z-index: 10; /* 提高z-index，确保在3D之上 */
  pointer-events: auto; /* 确保可点击 */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-title-img {
  max-width: 400px;
  width: 400px; /* 固定宽度 */
  height: auto;
  object-fit: contain;
  position: relative;
  z-index: 10; /* 确保图片也在最上层 */
  display: block;
}

/* loomi标题缩小以匹配axonrob - 原图860*127 */
.loomi-title {
  max-width: 250px !important;
  width: 250px !important;
}

/* 产品提示文字 */
.product-hint-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  margin-top: 8px;
  margin-bottom: 0;
  text-align: center;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
  z-index: 10;
  position: relative;
}

/* 产品图片容器 */
.product-image-container {
  z-index: 2;
  max-width: 60vw;
  max-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* 主产品图包装器 */
.product-main-wrapper {
  position: relative;
  width: 85vw; /* 匹配放大后的canvas */
  height: 75vh; /* 匹配放大后的canvas */
  max-width: 1200px;
  max-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 3D模型容器 - 居中显示，放大canvas */
.model-3d-container {
  width: 85vw; /* 从60vw放大到85vw */
  max-width: 1200px; /* 从800px放大到1200px */
  height: 75vh; /* 从60vh放大到75vh */
  position: relative;
  z-index: 1; /* 保持在文字下方 */
  margin: 0 auto; /* 水平居中 */
  pointer-events: auto; /* canvas可以交互 */
}

.model-3d-container canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
  pointer-events: auto; /* 允许canvas上的鼠标交互 */
}

/* 叠加图片 */
.overlay-img {
  position: absolute;
  max-height: 50vh;
  max-width: 35vw;
  width: auto;
  height: auto;
  object-fit: contain;
  z-index: 5;
  pointer-events: auto;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.overlay-img:hover {
  opacity: 0.95;
}

/* 左侧按钮的叠加图片位置 - 图片右下角对齐左侧按钮右下角 */
.left-overlay {
  left: calc(5% + 150px + 40px);
  top: calc(50% + 20px);
  transform: translate(-100%, -100%);
  transform-origin: right bottom;
}

/* 底部按钮的叠加图片位置 - 图片右下角对齐底部按钮右下角 */
.bottom-overlay {
  left: calc(50% + 20px);
  bottom: calc(0% - 0px);
  transform: translate(-100%, 0);
  transform-origin: right bottom;
}

/* 淡入淡出动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 产品按钮通用样式 */
.product-btn {
  position: absolute;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s ease;
  z-index: 10;
}

.product-btn:hover {
  transform: scale(1.1);
}

.product-btn img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  display: block;
}

/* 顶部按钮 */
.top-btn {
  top: 0%;
  left: 50%;
  transform: translateX(-50%);
}

.top-btn:hover {
  transform: translateX(-50%) scale(1.1);
}

/* 左侧按钮 */
.left-btn {
  left: calc(5% + 200px); /* 从150px改为200px，往右移动50px */
  top: 50%;
  transform: translateY(-50%);
}

.left-btn:hover {
  transform: translateY(-50%) scale(1.1);
}

/* 底部按钮 */
.bottom-btn {
  bottom: 0%;
  left: 50%;
  transform: translateX(-50%);
}

.bottom-btn:hover {
  transform: translateX(-50%) scale(1.1);
}

/* 音频按钮样式 */
.audio-btn {
  position: absolute;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.audio-btn img {
  width: 50px; /* 缩小按钮 */
  height: 50px;
  object-fit: contain;
  display: block;
  animation: breathe 2s ease-in-out infinite;
}

.audio-btn:hover img {
  animation: breathe 1s ease-in-out infinite;
}

/* 呼吸动画 */
@keyframes breathe {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
}

/* 音频按钮位置 - 根据图片描述的5个位置 */
.audio-btn-1 {
  /* 位置1：右下曲线 */
  bottom: 35%; /* 再往上移动 */
  right: 35%; /* 与中间右侧按钮对齐 */
  transform: translate(50%, 50%);
}

.audio-btn-2 {
  /* 位置2：中右曲线（猫的右耳上方） */
  top: 35%;
  right: 35%; /* 继续往中心移动 */
  transform: translate(50%, -50%);
}

.audio-btn-3 {
  /* 位置3：顶部中心曲线（猫头正上方） */
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
}

.audio-btn-4 {
  /* 位置4：中左曲线（猫的左耳位置） */
  top: 35%;
  left: 35%; /* 继续往中心移动 */
  transform: translate(-50%, -50%);
}

.audio-btn-5 {
  /* 位置5：左下曲线（扬声器格栅上方） */
  bottom: 35%; /* 再往上移动 */
  left: 35%; /* 与中间左侧按钮对齐 */
  transform: translate(-50%, 50%);
}

/* 3D视频按钮样式 - 3D标签效果 */
.video-btn {
  position: absolute;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  perspective: 1000px;
}

.video-btn img {
  width: 50px;
  height: 50px;
  object-fit: contain;
  display: block;
  transition: transform 0.3s ease, opacity 0.3s ease, filter 0.3s ease;
  opacity: 0.9;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3)) 
          drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  transform-style: preserve-3d;
}

.video-btn:hover img {
  transform: scale(1.15) translateZ(10px);
  opacity: 1;
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4)) 
          drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))
          drop-shadow(0 0 20px rgba(1, 206, 126, 0.3));
}

/* 正面偏下的3D按钮 - 添加3D倾斜效果 */
.video-btn-front {
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%) perspective(1000px) rotateX(15deg);
}

.video-btn-front img {
  transform: translateZ(5px);
}

.video-btn-front:hover {
  transform: translateX(-50%) perspective(1000px) rotateX(10deg);
}

/* 背面偏上的3D按钮 - 添加3D倾斜效果 */
.video-btn-back {
  top: 15%;
  left: 50%;
  transform: translateX(-50%) perspective(1000px) rotateX(-15deg);
}

.video-btn-back img {
  transform: translateZ(5px);
}

.video-btn-back:hover {
  transform: translateX(-50%) perspective(1000px) rotateX(-10deg);
}

/* 右侧图标列 */
.icon-column {
  position: absolute;
  right: clamp(50px, 7vw, 140px);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 3vh, 40px);
  z-index: 10; /* 提高z-index，确保在3D之上 */
  pointer-events: auto; /* 确保图标可点击 */
}

/* 参数详情图片 */
.params-detail-img {
  position: absolute;
  right: 100%;
  top: 0;
  max-height: 40vh;
  max-width: 30vw;
  width: auto;
  height: auto;
  object-fit: contain;
  margin-right: 30px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  z-index: 3;
}

.params-detail-img:hover {
  opacity: 0.95;
}

/* 参数图片淡入淡出动画 */
.fade-params-enter-active, .fade-params-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-params-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-params-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* 图标项 */
.icon-item {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* 填充动画层 */
.icon-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: rgba(1, 206, 126, 1); /* 页面专属绿色，透明填充 */
  border-radius: 25px;
  transition: width 0.4s ease;
  z-index: 1;
}

.icon-item:hover .icon-fill {
  width: 100%;
}

/* 图标图片 */
.icon-img {
  width: 50px;
  height: 50px;
  object-fit: contain;
  opacity: 1;
  transition: opacity 0.3s ease;
  position: absolute;
  z-index: 2;
}

.icon-item:hover .icon-img {
  opacity: 1;
}

/* 镜像图标（用于右侧按钮） */
.icon-mirror {
  transform: scaleX(-1);
}

/* 图标标签 */
.icon-label {
  font-size: 16px;
  color: #ffffff;
  font-weight: 500;
  opacity: 0;
  white-space: nowrap;
  transition: opacity 0.3s ease 0.2s;
  z-index: 3;
  position: relative;
}

.icon-item:hover .icon-label {
  opacity: 1;
}

/* 滚动指示器 */
.scroll-indicator {
  position: absolute;
  bottom: 20px; /* 往下移动 */
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
  min-height: 24px; /* 从固定高度改为最小高度，允许内容换行 */
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

/* 响应式设计 */
@media (max-width: 1440px) {
  .product-title-img {
    max-width: 400px; /* 保持与桌面端一致 */
    width: 400px;
  }
  
  .loomi-title {
    max-width: 250px !important;
    width: 250px !important;
  }
  
  .product-title-container {
    margin-bottom: 50px;
  }
  
  .product-image-container {
    max-width: 55vw;
    max-height: 55vh;
  }
}

@media (max-width: 1024px) {
  .product-title-container {
    margin-bottom: 40px;
  }
  
  .product-title-img {
    max-width: 400px !important; /* 保持与桌面端一致 */
    width: 400px !important;
  }
  
  .loomi-title {
    max-width: 250px !important;
    width: 250px !important;
  }
  
  .product-image-container {
    max-width: 65vw;
    max-height: 50vh;
  }
  
  .icon-column {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .product-series-content {
    height: auto !important; /* 强制改为auto，不再固定100vh高度 */
    min-height: 100vh !important; /* 最小高度保持100vh */
    padding-top: 60px !important; /* 紧贴导航栏下方，约等于导航栏高度 */
    padding-bottom: 0 !important;
    justify-content: flex-start !important; /* 从顶部开始，标题在顶部 */
  }
  
  .product-title-container {
    margin-top: 10px !important; /* 距离导航栏10px */
    margin-bottom: 20px !important; /* 从30px减少到20px */
    overflow: visible !important; /* 允许内容溢出 */
  }
  
  .product-title-img {
    max-width: 250px !important; /* 移动端缩小标题 */
    width: 250px !important;
  }
  
  .loomi-title {
    max-width: 200px !important;
    width: 200px !important;
  }
  
  .product-hint-text {
    font-size: 12px;
    margin-top: 6px;
  }
  
  .product-image-container {
    max-width: 75vw;
    max-height: 45vh;
  }
  
  /* 3D容器移动端样式 - 往下移动到中间 */
  .model-3d-container {
    width: 90vw;
    max-width: 100%;
    height: 50vh;
    margin-top: 15vh; /* 往下移动，使3D内容在页面中间 */
  }
  
  .icon-column {
    right: 30px;
    gap: 15px;
  }
  
  /* 右侧icon缩小 */
  .icon-item {
    width: 40px; /* 从50px缩小到40px */
    height: 40px; /* 从50px缩小到40px */
    border-radius: 20px; /* 对应调整圆角 */
  }
  
  .icon-fill {
    border-radius: 20px; /* 对应调整圆角 */
  }
  
  .icon-img {
    width: 40px; /* 从50px缩小到40px */
    height: 40px; /* 从50px缩小到40px */
  }
  
  .icon-mirror {
    transform: scaleX(-1);
  }
  
  .icon-label {
    font-size: 14px; /* 从16px缩小到14px */
  }
}

@media (max-width: 480px) {
  .product-series-content {
    height: auto !important; /* 强制改为auto，不再固定100vh高度 */
    min-height: 100vh !important; /* 最小高度保持100vh */
    padding-top: 50px !important; /* 紧贴导航栏下方，约等于导航栏高度 */
    padding-bottom: 0 !important;
    justify-content: flex-start !important; /* 从顶部开始，标题在顶部 */
  }
  
  .product-title-container {
    margin-top: 10px !important; /* 距离导航栏10px */
    margin-bottom: 15px !important; /* 从20px减少到15px */
    overflow: visible !important; /* 允许内容溢出 */
  }
  
  .product-title-img {
    max-width: 200px !important; /* 小屏幕进一步缩小标题 */
    width: 200px !important;
  }
  
  .loomi-title {
    max-width: 160px !important;
    width: 160px !important;
  }
  
  .product-hint-text {
    font-size: 11px;
    margin-top: 5px;
  }
  
  .product-image-container {
    max-width: 80vw;
    max-height: 40vh;
  }
  
  /* 3D容器移动端样式 - 往下移动到中间 */
  .model-3d-container {
    width: 95vw;
    max-width: 100%;
    height: 45vh;
    margin-top: 12vh; /* 往下移动，使3D内容在页面中间 */
  }
  
  .icon-column {
    right: 20px;
    gap: 10px;
  }
  
  /* 右侧icon进一步缩小 */
  .icon-item {
    width: 35px; /* 从40px进一步缩小到35px */
    height: 35px; /* 从40px进一步缩小到35px */
    border-radius: 17.5px; /* 对应调整圆角 */
  }
  
  .icon-fill {
    border-radius: 17.5px; /* 对应调整圆角 */
  }
  
  .icon-img {
    width: 35px; /* 从40px进一步缩小到35px */
    height: 35px; /* 从40px进一步缩小到35px */
  }
  
  .icon-mirror {
    transform: scaleX(-1);
  }
  
  .icon-label {
    font-size: 12px; /* 从14px进一步缩小到12px */
  }
}

/* 视频播放弹窗样式 */
.video-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: none;
}

.video-modal-content {
  position: relative;
  max-width: 70vw;
  max-height: 70vh;
  width: auto;
  height: auto;
  background: #000;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.video-modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  background: rgba(1, 206, 126, 0.5);
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease, transform 0.3s ease;
  line-height: 1;
  padding: 0;
}

.video-modal-close:hover {
  background: rgba(1, 206, 126, 0.7);
  transform: scale(1.1);
}

.video-modal-player {
  width: 100%;
  height: 100%;
  max-width: 70vw;
  max-height: 70vh;
  display: block;
}

/* 弹窗淡入淡出动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 4K屏幕适配 (min-width: 2560px) - 按2倍放大 */
@media (min-width: 2560px) {
  /* 导航栏设置 - 与首页一致 */
  .navbar {
    height: 240px !important; /* 与首页一致 */
  }
  
  .product-title-img {
    max-width: 800px !important; /* 400px * 2 */
    width: 800px !important;
  }
  
  .loomi-title {
    max-width: 500px !important; /* 250px * 2 */
    width: 500px !important;
  }
  
  .product-hint-text {
    font-size: 28px; /* 14px * 2 */
    margin-top: 20px; /* 10px * 2 */
  }
  
  .product-title-container {
    margin-bottom: 80px; /* 40px * 2 */
  }
  
  .icon-column {
    right: clamp(100px, 14vw, 280px); /* 50px-140px * 2 */
    gap: clamp(40px, 6vh, 80px); /* 20px-40px * 2 */
  }
  
  .icon-item {
    width: 120px; /* 放大一些，从100px增加到120px */
    height: 120px; /* 放大一些，从100px增加到120px */
    border-radius: 60px; /* 对应调整圆角 */
  }
  
  .icon-img {
    width: 72px; /* 放大一些，从60px增加到72px */
    height: 72px; /* 放大一些，从60px增加到72px */
  }
  
  .icon-label {
    font-size: 36px; /* 放大一些，从32px增加到36px */
    margin-top: 14px; /* 对应调整 */
  }
  
  /* 下方4个音频按钮往外侧摆放 */
  .audio-btn-1 {
    /* 位置1：右下曲线 - 更靠右 */
    right: 15%; /* 进一步减少，更靠右 */
  }
  
  .audio-btn-2 {
    /* 位置2：中右曲线 - 更靠右 */
    right: 15%; /* 进一步减少，更靠右 */
  }
  
  .audio-btn-4 {
    /* 位置4：中左曲线 - 更靠左 */
    left: 15%; /* 进一步减少，更靠左 */
  }
  
  .audio-btn-5 {
    /* 位置5：左下曲线 - 更靠左 */
    left: 15%; /* 进一步减少，更靠左 */
  }
  
  .audio-btn img {
    width: 100px; /* 50px * 2 */
    height: 100px; /* 50px * 2 */
  }
  
  /* 参数图片在4K下放大 */
  .params-detail-img {
    max-height: none !important; /* 移除最大高度限制 */
    max-width: none !important; /* 移除最大宽度限制 */
    width: 400px !important; /* 设置固定宽度，强制放大 */
    height: auto !important;
    top: 220px !important; /* 往下移动，让顶部和参数按钮对齐（参数按钮高度120px的一半） */
    transform: scale(2) !important; /* 使用scale放大2倍 */
    transform-origin: right center !important; /* 从右侧中心点缩放 */
    margin-right: 60px !important; /* 30px * 2 */
  }
  
  .video-modal-content {
    max-width: 180vw !important; /* 进一步放大，从140vw增加到180vw */
    max-height: 180vh !important; /* 进一步放大，从140vh增加到180vh */
  }
  
  .video-modal-close {
    width: 100px !important; /* 放大一些，从80px增加到100px */
    height: 100px !important; /* 放大一些，从80px增加到100px */
    font-size: 70px !important; /* 放大一些，从56px增加到70px */
    top: 20px; /* 10px * 2 */
    right: 20px; /* 10px * 2 */
  }
  
  .video-modal-player {
    max-width: 180vw !important; /* 进一步放大，从140vw增加到180vw */
    max-height: 180vh !important; /* 进一步放大，从140vh增加到180vh */
  }
  
  .scroll-indicator {
    bottom: 40px; /* 20px * 2 */
  }
  
  .scroll-arrow-img {
    width: 60px; /* 30px * 2 */
    height: 56px; /* 28px * 2 */
  }
}
</style>

