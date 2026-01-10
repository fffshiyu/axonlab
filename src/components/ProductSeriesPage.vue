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
        </div>
        
        <!-- 产品图片 -->
        <div class="product-image-container">
          <!-- 主产品图 - 3D模型 -->
          <div class="product-main-wrapper">
            <div ref="modelContainer1" class="model-3d-container">
              <!-- 3D模型加载状态 -->
              <div v-if="!isFirstModelLoaded" class="model-loading">
                <div class="model-loading-spinner"></div>
                <p class="model-loading-text">3D模型加载中...</p>
              </div>
            </div>
            
            <!-- 顶部按钮 -->
            <button 
              class="product-btn top-btn" 
              :class="{ active: activeButton === 'top' }"
              @click="handleButtonClick('top')"
            >
              <img :src="activeButton === 'top' ? '/BTN_onmodel.webp' : '/BTN_before.webp'" alt="顶部" />
            </button>
            
            <!-- 左侧按钮 -->
            <button 
              v-show="activeButton !== 'left'"
              class="product-btn left-btn" 
              :class="{ active: activeButton === 'left' }"
              @click="handleButtonClick('left')"
            >
              <img :src="activeButton === 'left' ? '/BTN_onmodel.webp' : '/BTN_before.webp'" alt="左侧" />
            </button>
            
            <!-- 底部按钮 -->
            <button 
              v-show="activeButton !== 'bottom'"
              class="product-btn bottom-btn" 
              :class="{ active: activeButton === 'bottom' }"
              @click="handleButtonClick('bottom')"
            >
              <img :src="activeButton === 'bottom' ? '/BTN_onmodel.webp' : '/BTN_before.webp'" alt="底部" />
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
        </div>
        
        <!-- 产品图片 - 3D模型 -->
        <div class="product-image-container">
          <!-- 3D模型容器 -->
          <div class="product-main-wrapper">
            <div ref="modelContainer" class="model-3d-container">
              <!-- 3D模型加载状态 -->
              <div v-if="!isSecondModelLoaded" class="model-loading">
                <div class="model-loading-spinner"></div>
                <p class="model-loading-text">3D模型加载中...</p>
              </div>
            </div>
            
            <!-- 顶部按钮 -->
            <button 
              class="product-btn top-btn" 
              :class="{ active: activeButton2 === 'top' }"
              @click="handleButtonClick2('top')"
            >
              <img :src="activeButton2 === 'top' ? '/BTN_onmodel.webp' : '/BTN_before.webp'" alt="顶部" />
            </button>
            
            <!-- 左侧按钮 -->
            <button 
              v-show="activeButton2 !== 'left'"
              class="product-btn left-btn" 
              :class="{ active: activeButton2 === 'left' }"
              @click="handleButtonClick2('left')"
            >
              <img :src="activeButton2 === 'left' ? '/BTN_onmodel.webp' : '/BTN_before.webp'" alt="左侧" />
            </button>
            
            <!-- 底部按钮 -->
            <button 
              v-show="activeButton2 !== 'bottom'"
              class="product-btn bottom-btn" 
              :class="{ active: activeButton2 === 'bottom' }"
              @click="handleButtonClick2('bottom')"
            >
              <img :src="activeButton2 === 'bottom' ? '/BTN_onmodel.webp' : '/BTN_before.webp'" alt="底部" />
            </button>
            
            <!-- 叠加的侧边图片 -->
            <transition name="fade">
              <img 
                v-if="sideImage2" 
                :src="sideImage2" 
                alt="详细信息" 
                :class="['overlay-img', overlayPosition2]"
                @click="closeOverlay2"
              />
            </transition>
          </div>
        </div>
        
        <!-- 右侧图标列 -->
        <div class="icon-column">
          <!-- 参数图片显示区域 -->
          <transition name="fade-params">
            <img 
              v-if="showParamsImage2" 
              src="/csys.webp" 
              alt="参数详情" 
              class="params-detail-img"
              @click="closeParamsImage2"
            />
          </transition>
          
          <div class="icon-item" @click="handleIconClick2('参数')">
            <div class="icon-fill"></div>
            <img src="/canshu_icon.webp" alt="参数" class="icon-img" />
            <span class="icon-label">参数</span>
          </div>
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
          <div class="icon-item" @click="handleIconClick2('背面')">
            <div class="icon-fill"></div>
            <img src="/beimian_icon.webp" alt="背面" class="icon-img" />
            <span class="icon-label">背面</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 页脚 -->
    <footer class="footer" id="footer">
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
              <a href="#" class="footer-link">知识产权保护</a>
              <span class="separator">|</span>
              <a href="#" class="footer-link">隐私声明</a>
              <span class="separator">|</span>
              <a href="#" class="footer-link">ISO27001信息安全管理体系认证</a>
            </div>
            
            <!-- 联系信息 -->
            <div class="footer-contact">
              <p>互联网违法和不良信息举报邮箱   LD@axonlabs.com</p>
            </div>
            
            <!-- 版权信息 -->
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

// 第二个产品的状态
const activeButton2 = ref<string | null>(null)
const sideImage2 = ref<string | null>(null)
const overlayPosition2 = ref<string>('')
const showParamsImage2 = ref(false)

// 第一个产品的3D模型相关（LOOMI - loomy.glb）
const modelContainer1 = ref<HTMLDivElement | null>(null)
let scene1: THREE.Scene
let camera1: THREE.PerspectiveCamera
let renderer1: THREE.WebGLRenderer
let controls1: OrbitControls
let content1: THREE.Object3D | null = null
let animationId1: number
let retryCount1 = 0
let isSection1Visible = ref(true) // 第一个区域是否可见
const isFirstModelLoaded = ref(false) // 第一个模型是否加载完成（响应式）

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
    antialias: true, // 启用抗锯齿以更好显示玻璃材质
    powerPreference: 'high-performance',
    stencil: false,
    depth: true
  })
  renderer1.setSize(width, height)
  renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer1.setClearColor(0x000000, 0)
  renderer1.outputColorSpace = THREE.SRGBColorSpace
  // 启用物理正确的光照模式，对玻璃材质很重要
  renderer1.toneMapping = THREE.ACESFilmicToneMapping
  renderer1.toneMappingExposure = 1.0
  modelContainer1.value.appendChild(renderer1.domElement)

  // 创建OrbitControls
  controls1 = new OrbitControls(camera1, renderer1.domElement)
  controls1.screenSpacePanning = false // 禁用平移
  controls1.enableDamping = true
  controls1.dampingFactor = 0.1
  controls1.autoRotate = false // 关闭自动旋转
  controls1.enableRotate = true // 允许旋转查看各个方向
  controls1.enableZoom = true // 允许轻微缩放
  controls1.zoomSpeed = 0.3 // 更低的缩放速度，配合距离限制，实现微微放大
  controls1.rotateSpeed = 0.8 // 旋转速度
  controls1.enablePan = false // 禁用平移，保持模型居中

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

  // 设置缩放范围，只允许轻微缩放
  const distance = Math.sqrt(
    Math.pow(size / 1.8, 2) + 
    Math.pow(size / 3.5, 2) + 
    Math.pow(size / 1.8, 2)
  )
  controls1.minDistance = distance * 0.9 // 限制放大，只能微微放大到90%
  controls1.maxDistance = distance * 1.3 // 最多缩小到130%

  camera1.near = size / 100
  camera1.far = size * 100
  camera1.updateProjectionMatrix()

  camera1.position.copy(center)
  camera1.position.x += size / 1.8  // 从2.6改为1.8，相机更远
  camera1.position.y += size / 3.5  // 从4.8改为3.5，相机更远
  camera1.position.z += size / 1.8  // 从2.6改为1.8，相机更远
  camera1.lookAt(center)

  controls1.saveState()

  scene1.add(object)
  content1 = object

  console.log('第一个产品模型已居中，相机位置:', camera1.position)
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
const targetFrameRate1 = 1000 / 30 // 30 FPS，降低渲染频率节省性能
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
  
  // 限制帧率到30fps，减少GPU负载
  if (delta < targetFrameRate1) {
    return
  }
  
  lastFrameTime1 = now - (delta % targetFrameRate1)
  
  // 只在第一个区域可见时才渲染
  if (isSection1Visible.value && controls1 && renderer1 && scene1 && camera1) {
    controls1.update()
    renderer1.render(scene1, camera1)
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
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  // 启用输出编码以获得更好的颜色
  renderer.outputColorSpace = THREE.SRGBColorSpace
  modelContainer.value.appendChild(renderer.domElement)

  // 创建OrbitControls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.screenSpacePanning = false // 禁用平移
  controls.enableDamping = true
  controls.dampingFactor = 0.1
  controls.autoRotate = false // 关闭自动旋转
  controls.enableRotate = true // 允许旋转查看各个方向
  controls.enableZoom = true // 允许轻微缩放
  controls.zoomSpeed = 0.3 // 更低的缩放速度，配合距离限制，实现微微放大
  controls.rotateSpeed = 0.8 // 旋转速度
  controls.enablePan = false // 禁用平移，保持模型居中

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

  // 设置缩放范围，只允许轻微缩放
  const distance = Math.sqrt(
    Math.pow(size / 1.8, 2) + 
    Math.pow(size / 3.5, 2) + 
    Math.pow(size / 1.8, 2)
  )
  controls.minDistance = distance * 0.9 // 限制放大，只能微微放大到90%
  controls.maxDistance = distance * 1.3 // 最多缩小到130%

  // 设置相机的近远裁剪面
  camera.near = size / 100
  camera.far = size * 100
  camera.updateProjectionMatrix()

  // 设置相机位置（调整相机距离让模型缩小）
  camera.position.copy(center)
  camera.position.x += size / 1.8  // 从2.6改为1.8，相机更远
  camera.position.y += size / 3.5  // 从4.8改为3.5，相机更远
  camera.position.z += size / 1.8  // 从2.6改为1.8，相机更远
  camera.lookAt(center)

  // 保存controls状态
  controls.saveState()

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
const targetFrameRate2 = 1000 / 30 // 30 FPS，降低渲染频率节省性能
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
  
  // 限制帧率到30fps，减少GPU负载
  if (delta < targetFrameRate2) {
    return
  }
  
  lastFrameTime2 = now - (delta % targetFrameRate2)
  
  // 只在第二个区域可见时才渲染
  if (isSection2Visible.value && controls && renderer && scene && camera) {
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
  } else if (type === '正面' || type === '侧面' || type === '背面') {
    // 旋转相机到对应视角
    rotateCameraToView1(type)
  }
}

// 第一个产品 - 旋转相机到指定视角
const rotateCameraToView1 = (view: string) => {
  if (!content1 || !controls1) return
  
  // 获取当前相机到目标点的距离
  const currentDistance = camera1.position.distanceTo(controls1.target)
  const center = controls1.target.clone() // 使用当前的观察目标点
  
  // 根据视角设置相机目标位置，保持当前的距离
  let targetPosition = new THREE.Vector3()
  
  switch (view) {
    case '正面':
      // 正面视角 - 相机在Z轴正方向
      targetPosition.set(center.x, center.y, center.z + currentDistance)
      break
    case '侧面':
      // 侧面视角 - 相机在X轴正方向
      targetPosition.set(center.x + currentDistance, center.y, center.z)
      break
    case '背面':
      // 背面视角 - 相机在Z轴负方向
      targetPosition.set(center.x, center.y, center.z - currentDistance)
      break
  }
  
  // 使用动画平滑过渡到目标位置
  animateCameraToPosition1(targetPosition, center)
}

// 第一个产品 - 相机位置动画
const animateCameraToPosition1 = (targetPosition: THREE.Vector3, targetLookAt: THREE.Vector3) => {
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
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
    // 不再恢复自动旋转，保持静止
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
  
  // 保持静止，不自动旋转
  controls1.autoRotate = false
  
  // 平滑过渡到正面视角
  animateCameraToPosition1(targetPosition, center)
}

// 第一个产品 - 关闭参数图片
const closeParamsImage = () => {
  showParamsImage.value = false
}

// 第二个产品 - 处理按钮点击
const handleButtonClick2 = (position: string) => {
  if (activeButton2.value === position) {
    activeButton2.value = null
    sideImage2.value = null
    overlayPosition2.value = ''
  } else {
    activeButton2.value = position
    
    if (position === 'left') {
      sideImage2.value = '/button2.webp'
      overlayPosition2.value = 'left-overlay'
    } else if (position === 'bottom') {
      sideImage2.value = '/button3.webp'
      overlayPosition2.value = 'bottom-overlay'
    } else {
      sideImage2.value = null
      overlayPosition2.value = ''
    }
  }
}

// 第二个产品 - 关闭叠加图片
const closeOverlay2 = () => {
  activeButton2.value = null
  sideImage2.value = null
  overlayPosition2.value = ''
}

// 第二个产品 - 处理图标点击
const handleIconClick2 = (type: string) => {
  if (type === '参数') {
    showParamsImage2.value = !showParamsImage2.value
  } else if (type === '正面' || type === '侧面' || type === '背面') {
    // 旋转相机到对应视角
    rotateCameraToView(type)
  }
}

// 旋转相机到指定视角
const rotateCameraToView = (view: string) => {
  if (!content || !controls) return
  
  // 获取当前相机到目标点的距离
  const currentDistance = camera.position.distanceTo(controls.target)
  const center = controls.target.clone() // 使用当前的观察目标点
  
  // 根据视角设置相机目标位置，保持当前的距离
  let targetPosition = new THREE.Vector3()
  
  switch (view) {
    case '正面':
      // 正面视角 - 相机在Z轴正方向
      targetPosition.set(center.x, center.y, center.z + currentDistance)
      break
    case '侧面':
      // 侧面视角 - 相机在X轴正方向
      targetPosition.set(center.x + currentDistance, center.y, center.z)
      break
    case '背面':
      // 背面视角 - 相机在Z轴负方向
      targetPosition.set(center.x, center.y, center.z - currentDistance)
      break
  }
  
  // 使用动画平滑过渡到目标位置
  animateCameraToPosition(targetPosition, center)
}

// 相机位置动画
const animateCameraToPosition = (targetPosition: THREE.Vector3, targetLookAt: THREE.Vector3) => {
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
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      // 动画完成后，可以选择重新启用自动旋转
      // controls.autoRotate = true
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
  
  // 保持静止，不自动旋转
  controls.autoRotate = false
  
  // 平滑过渡到正面视角
  animateCameraToPosition(targetPosition, center)
}

// 第二个产品 - 关闭参数图片
const closeParamsImage2 = () => {
  showParamsImage2.value = false
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
  
  console.log('组件卸载，场景已保存到缓存，下次进入将直接恢复')
  
  // 注意：不再调用cleanup3DScene1和cleanup3DScene，保留场景资源在缓存中
  
  // 移除事件监听器
  window.removeEventListener('wheel', handleWheel)
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
  background: rgba(217, 217, 217, 0.4);
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
  bottom: 30px; /* 从49px改为30px，往下移动 */
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
  height: 200px; /* 1920*1080基准高度200px */
  padding: 40px 0; /* 上下各40px内边距 */
  color: #ffffff;
  box-sizing: border-box;
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
  top: 40px; /* 距离顶部40px */
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
  margin-left: 550px; /* logo位置200px + logo宽度250px + 间距100px = 550px */
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
  white-space: nowrap; /* 营业执照不换行 */
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
  
  .icon-label {
    font-size: 12px; /* 从14px进一步缩小到12px */
  }
}
</style>

