<template>
  <div class="product-container">
    <!-- 导航栏 -->
    <Navbar active-page="product-series" />

    <!-- 产品展示区域 -->
    <section class="product-section" id="product-1">
      <div class="product-content">
        <!-- 产品标题 -->
        <div class="product-header">
          <h1 class="product-title">LUUMI</h1>
          <h2 class="product-subtitle">Loomi噜咪AI智能充电宝</h2>
        </div>

        <!-- 产品3D模型 -->
        <div class="product-image-container">
          <div ref="modelContainer" class="model-container"></div>
        </div>

        <!-- 视图切换按钮 -->
        <div class="view-buttons">
          <button 
            class="view-btn" 
            :class="{ active: currentView === 'front' }"
            @click="switchView('front')"
          >
            <img src="/front-view-btn.webp" :alt="currentLanguage === 'zh' ? '正视图' : 'Front View'" class="view-btn-img" />
          </button>
          <button 
            class="view-btn" 
            :class="{ active: currentView === 'side' }"
            @click="switchView('side')"
          >
            <img src="/side-view-btn.webp" :alt="currentLanguage === 'zh' ? '侧视图' : 'Side View'" class="view-btn-img" />
          </button>
          <button 
            class="view-btn" 
            :class="{ active: currentView === 'top' }"
            @click="switchView('top')"
          >
            <img src="/top-view-btn.webp" :alt="currentLanguage === 'zh' ? '俯视图' : 'Top View'" class="view-btn-img" />
          </button>
        </div>

        <!-- 向下箭头 -->
        <div class="scroll-indicator" @click="scrollToSecondProduct">
          <img src="/arrow.webp" :alt="currentLanguage === 'zh' ? '向下箭头' : 'Scroll Down'" class="scroll-arrow-img" />
        </div>
      </div>
    </section>

    <!-- 第二个产品展示区域 -->
    <section class="product-section" id="second-product">
      <div class="product-content">
        <!-- 产品标题 -->
        <div class="product-header">
          <h1 class="product-title">AXON ROB</h1>
          <h2 class="product-subtitle">羽山机器人系列</h2>
        </div>

        <!-- 产品图片 -->
        <div class="product-image-container">
          <img :src="currentProductImage2" alt="AXON ROB产品" class="product-image" />
        </div>

        <!-- 视图切换按钮 -->
        <div class="view-buttons">
          <button 
            class="view-btn" 
            :class="{ active: currentView2 === 'front' }"
            @click="switchView2('front')"
          >
            <img src="/front-view-btn.webp" :alt="currentLanguage === 'zh' ? '正视图' : 'Front View'" class="view-btn-img" />
          </button>
          <button 
            class="view-btn" 
            :class="{ active: currentView2 === 'side' }"
            @click="switchView2('side')"
          >
            <img src="/side-view-btn.webp" :alt="currentLanguage === 'zh' ? '侧视图' : 'Side View'" class="view-btn-img" />
          </button>
          <button 
            class="view-btn" 
            :class="{ active: currentView2 === 'top' }"
            @click="switchView2('top')"
          >
            <img src="/top-view-btn.webp" :alt="currentLanguage === 'zh' ? '俯视图' : 'Top View'" class="view-btn-img" />
          </button>
        </div>

        <!-- 向上箭头 -->
        <div class="scroll-indicator" @click="scrollToFirstProduct">
          <img src="/arrow.webp" :alt="currentLanguage === 'zh' ? '向上箭头' : 'Scroll Up'" class="scroll-arrow-img scroll-arrow-up" />
        </div>
      </div>
    </section>

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

// 场景缓存键
const sceneKey = 'product-page-scene'

// 导航栏可见性
const isNavbarVisible = ref(true)

// 3D模型相关
const modelContainer = ref<HTMLDivElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let content: THREE.Object3D | null = null
let animationId: number
let retryCount = 0
let resizeTimeout: number | null = null



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

// 第一个产品的视图状态
const currentView = ref('front')
const productImages = {
  front: '/product1.webp',
  side: '/product1.webp',  // 暂时使用同一张图片
  top: '/product1.webp'    // 暂时使用同一张图片
}
const currentProductImage = ref(productImages.front)

// 第二个产品的视图状态
const currentView2 = ref('front')
const productImages2 = {
  front: '/product1.webp',
  side: '/product1.webp',  // 暂时使用同一张图片
  top: '/product1.webp'    // 暂时使用同一张图片
}
const currentProductImage2 = ref(productImages2.front)

// 切换第一个产品视图（切换3D模型相机视角）
const switchView = (view: 'front' | 'side' | 'top') => {
  currentView.value = view
  if (!content || !camera || !controls) return
  
  const box = new THREE.Box3().setFromObject(content)
  const size = box.getSize(new THREE.Vector3()).length()
  const center = box.getCenter(new THREE.Vector3())
  
  let targetPosition = new THREE.Vector3()
  
  // 根据视图设置相机位置
  switch(view) {
    case 'front':
      targetPosition.set(center.x + size / 2.6, center.y + size / 4.8, center.z + size / 2.6)
      break
    case 'side':
      targetPosition.set(center.x + size / 1.5, center.y + size / 4.8, center.z)
      break
    case 'top':
      targetPosition.set(center.x, center.y + size / 1.5, center.z + size / 4.8)
      break
  }
  
  animateCameraToPosition(targetPosition, center)
}

// 切换第二个产品视图
const switchView2 = (view: 'front' | 'side' | 'top') => {
  currentView2.value = view
  currentProductImage2.value = productImages2[view]
}

// 初始化Three.js场景
// 性能优化措施：
// 1. 动态像素比调整（移动设备/低端设备降低到1，桌面设备最高1.5）
// 2. 完全禁用抗锯齿以提升性能
// 3. 优化渲染器设置（禁用不必要的缓冲和特性）
// 4. 减少灯光数量（移动设备禁用半球光）
// 5. 深度优化材质和几何体
// 6. 帧率限制和智能渲染（只在有变化时渲染）
// 7. 视锥剔除和阴影禁用
const init3DScene = () => {
  if (!modelContainer.value) {
    console.error('模型容器未找到')
    return
  }

  // 检查是否有缓存的场景
  if (hasCachedScene(sceneKey)) {
    console.log('发现缓存的场景，正在恢复...')
    if (restoreScene(sceneKey, modelContainer.value)) {
      // 恢复场景变量引用
      const cached = getCachedScene(sceneKey)!
      scene = cached.scene
      camera = cached.camera
      renderer = cached.renderer
      controls = cached.controls
      content = cached.content
      
      // 重置渲染标志
      needsRender = true
      
      // 重新启动动画
      animate()
      
      // 重新绑定窗口大小变化事件
      window.addEventListener('resize', onWindowResize)
      
      console.log('场景已从缓存恢复，无需重新加载模型')
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
    console.log('模型容器尺寸为0，延迟重试 (', retryCount, '/10)')
    setTimeout(() => init3DScene(), 200)
    return
  }

  console.log('初始化新的Three.js场景，容器尺寸:', width, height)

  // 创建场景
  scene = new THREE.Scene()
  scene.background = null // 透明背景

  // 创建相机
  camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 1000)
  camera.position.set(0, 0, 5)
  scene.add(camera)

  // 创建渲染器（性能优化）
  // 检测设备性能，动态调整像素比
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const isLowEndDevice = navigator.hardwareConcurrency <= 4 || (navigator.deviceMemory && navigator.deviceMemory <= 4)
  const maxPixelRatio = isMobile || isLowEndDevice ? 1 : 1.5 // 降低最大像素比
  
  renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: false, // 完全禁用抗锯齿以提升性能
    powerPreference: 'high-performance', // 优先使用高性能GPU
    stencil: false, // 禁用模板缓冲以节省内存
    depth: true, // 启用深度缓冲
    preserveDrawingBuffer: false, // 不保留绘制缓冲区以节省内存
    logarithmicDepthBuffer: false, // 禁用对数深度缓冲以提升性能
    precision: 'mediump' // 使用中等精度
  })
  renderer.setSize(width, height)
  // 限制像素比，根据设备性能动态调整
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio))
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  // 禁用阴影映射以提升性能
  renderer.shadowMap.enabled = false
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  // 启用自动清理以释放内存
  renderer.autoClear = true
  // 优化渲染信息
  renderer.info.autoReset = false
  modelContainer.value.appendChild(renderer.domElement)

  // 创建OrbitControls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.screenSpacePanning = true
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.autoRotate = true
  controls.autoRotateSpeed = isMobile ? 0.5 : 1.0 // 移动设备降低旋转速度
  controls.enableZoom = false
  // 优化控制更新频率
  controls.update()

  // 添加灯光（优化：减少灯光数量以提升性能）
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4) // 提高环境光强度，减少其他灯光
  camera.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI) // 降低强度
  directionalLight.position.set(0.866, 0.5, 0.5)
  directionalLight.castShadow = false // 禁用阴影投射
  camera.add(directionalLight)

  // 在移动设备上禁用半球光以提升性能
  if (!isMobile) {
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8) // 降低强度
    hemiLight.position.set(0, 200, 0)
    scene.add(hemiLight)
  }

  // 加载3D模型（使用Draco压缩版本）
  const modelPath = '/models/loomydraco.glb'
  
  // 检查全局缓存
  const cachedModel = getCachedModel(modelPath)
  if (cachedModel) {
    setContent(cachedModel.clone())
    console.log('使用预加载的模型缓存')
    return
  }
  
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/')
  dracoLoader.preload()
  
  const loader = new GLTFLoader()
  loader.setDRACOLoader(dracoLoader)
  
  // 设置加载优先级
  loader.setRequestHeader({ 'Accept': 'application/octet-stream' })
  
  loader.load(
    modelPath,
    (gltf) => {
      const object = gltf.scene || gltf.scenes[0]
      
      if (!object) {
        console.error('模型中没有场景')
        return
      }

      // 性能优化：深度优化模型
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // 启用视锥剔除
          child.frustumCulled = true
          // 禁用不必要的渲染特性
          child.castShadow = false
          child.receiveShadow = false
          
          // 优化材质
          if (child.material) {
            const materials = Array.isArray(child.material) ? child.material : [child.material]
            materials.forEach(material => {
              // 使用中等精度
              material.precision = 'mediump'
              // 禁用不必要的材质特性
              if (material instanceof THREE.MeshStandardMaterial || material instanceof THREE.MeshPhysicalMaterial) {
                material.roughness = Math.max(material.roughness || 0.5, 0.3) // 优化粗糙度计算
                material.metalness = material.metalness || 0
              }
              // 禁用环境贴图以提升性能
              if (material.envMap) {
                material.envMapIntensity = 0.5 // 降低强度
              }
              // 禁用不必要的纹理更新
              material.needsUpdate = true
              // 优化纹理采样
              if (material.map) {
                material.map.generateMipmaps = true
                material.map.minFilter = THREE.LinearMipmapLinearFilter
              }
            })
          }
          
          // 优化几何体
          if (child.geometry) {
            // 计算边界框和边界球用于视锥剔除
            child.geometry.computeBoundingBox()
            child.geometry.computeBoundingSphere()
            // 合并顶点以提高性能（如果几何体支持）
            if (!child.geometry.attributes.position) {
              child.geometry.computeVertexNormals()
            }
            // 优化索引
            if (child.geometry.index) {
              child.geometry.index.needsUpdate = false
            }
          }
        }
      })

      setContent(object)
      console.log('模型（Draco压缩版）加载成功并已优化')
    },
    (progress) => {
      const percent = progress.total > 0 
        ? (progress.loaded / progress.total * 100).toFixed(2) 
        : '0.00'
      console.log('加载进度:', percent + '%')
    },
    (error) => {
      console.error('加载模型失败:', error)
    }
  )

  // 缓存场景
  cacheScene(sceneKey, {
    scene,
    camera,
    renderer,
    controls,
    content,
    container: modelContainer.value,
    animationId: null // 动画ID会在animate中设置
  })

  // 开始动画循环
  animate()

  // 处理窗口大小变化
  window.addEventListener('resize', onWindowResize)
}

// 设置模型内容
const setContent = (object: THREE.Object3D) => {
  if (content) {
    scene.remove(content)
  }

  object.updateMatrixWorld()

  const box = new THREE.Box3().setFromObject(object)
  const size = box.getSize(new THREE.Vector3()).length()
  const center = box.getCenter(new THREE.Vector3())

  console.log('模型中心:', center)
  console.log('模型尺寸:', size)

  controls.reset()

  object.position.x -= center.x
  object.position.y -= center.y
  object.position.z -= center.z

  controls.maxDistance = size * 10

  camera.near = size / 100
  camera.far = size * 100
  camera.updateProjectionMatrix()

  camera.position.copy(center)
  camera.position.x += size / 2.6
  camera.position.y += size / 4.8
  camera.position.z += size / 2.6
  camera.lookAt(center)

  controls.saveState()

  scene.add(object)
  content = object

  console.log('模型已居中，相机位置:', camera.position)
}

// 窗口大小变化处理（优化：防抖和性能优化）
const onWindowResize = () => {
  if (!modelContainer.value) return
  
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
  }
  
  resizeTimeout = window.setTimeout(() => {
    const width = modelContainer.value!.clientWidth
    const height = modelContainer.value!.clientHeight
    
    // 只在尺寸真正改变时更新
    if (camera.aspect !== width / height || renderer.domElement.width !== width || renderer.domElement.height !== height) {
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      needsRender = true // 标记需要重新渲染
    }
    resizeTimeout = null
  }, 150) // 稍微增加防抖延迟以减少频繁更新
}

// 动画循环（性能优化）
let needsRender = true
let lastFrameTime = 0
const targetFPS = 60
const frameInterval = 1000 / targetFPS

const animate = () => {
  animationId = requestAnimationFrame(animate)
  
  // 更新缓存的动画ID
  const cached = getCachedScene(sceneKey)
  if (cached) {
    cached.animationId = animationId
  }
  
  // 帧率限制：只在达到目标帧率时渲染
  const currentTime = performance.now()
  const elapsed = currentTime - lastFrameTime
  
  if (elapsed >= frameInterval) {
    if (controls) {
      const hasChanged = controls.update()
      // 只在有变化或需要渲染时渲染
      if (hasChanged || needsRender) {
        renderer.render(scene, camera)
        needsRender = false
        lastFrameTime = currentTime - (elapsed % frameInterval) // 保持帧率稳定
      }
    } else {
      renderer.render(scene, camera)
      lastFrameTime = currentTime
    }
  }
}

// 相机位置动画（优化：减少不必要的更新）
const animateCameraToPosition = (targetPosition: THREE.Vector3, targetLookAt: THREE.Vector3) => {
  const startPosition = camera.position.clone()
  const startLookAt = controls.target.clone()
  const duration = 800 // 稍微缩短动画时间以提升响应性
  const startTime = performance.now() // 使用performance.now()获得更高精度
  
  const animateCamera = () => {
    const elapsed = performance.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    
    camera.position.lerpVectors(startPosition, targetPosition, eased)
    const newTarget = new THREE.Vector3().lerpVectors(startLookAt, targetLookAt, eased)
    controls.target.copy(newTarget)
    controls.update()
    
    // 标记需要渲染
    needsRender = true
    
    if (progress < 1) {
      requestAnimationFrame(animateCamera)
    } else {
      // 动画结束后确保最终位置准确
      camera.position.copy(targetPosition)
      controls.target.copy(targetLookAt)
      controls.update()
      needsRender = true
    }
  }
  
  animateCamera()
}

// 全屏滚动功能 - 参考首页实现
let currentSection = 0
const sections = ['product-1', 'second-product', 'footer']
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

// 滚动到第二个产品
const scrollToSecondProduct = () => {
  scrollToSection(1)
}

// 滚动到第一个产品
const scrollToFirstProduct = () => {
  scrollToSection(0)
}

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

onMounted(() => {
  // 初始化3D场景
  init3DScene()
  
  // 添加点击空白处隐藏下拉菜单的事件监听
  window.addEventListener('click', handleClickOutside)
  
  // 添加全屏滚动事件监听
  window.addEventListener('wheel', handleWheel, { passive: false })
  
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
  // 停止动画循环，但保留场景资源
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = 0
  }
  
  // 更新缓存的动画ID
  const cached = getCachedScene(sceneKey)
  if (cached) {
    cached.animationId = null
  }
  
  // 从DOM中移除渲染器，但不销毁它（保留在缓存中）
  if (renderer && modelContainer.value && modelContainer.value.contains(renderer.domElement)) {
    modelContainer.value.removeChild(renderer.domElement)
  }
  
  // 清理事件监听器
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('resize', onWindowResize)
  window.removeEventListener('keydown', () => {})
  
  console.log('组件卸载，场景已保存到缓存，下次进入将直接恢复')
})
</script>

<style scoped>
/* 产品页面容器 */
.product-container {
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

/* 导航栏隐藏状态 */
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

/* 当显示二维码时，调整下拉框右侧圆角 */
.nav-dropdown:has(.qr-code-container.show) .dropdown-menu {
  border-radius: 8px 0 8px 0; /* 右侧无圆角，与二维码框拼接 */
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

/* 产品展示区域 */
.product-section {
  min-height: 100vh;
  background-image: url('/BG3.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.product-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
  width: 100%;
  height: 100vh;
  position: relative;
}

/* 产品标题 */
.product-header {
  position: absolute;
  top: 120px; /* 距离顶部120px，1920*1080基准 */
  left: 50%;
  transform: translateX(-50%);
}

.product-title {
  font-family: 'MiSans', sans-serif;
  font-weight: 600; /* semibold */
  font-size: 80px; /* 1920*1080基准 */
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
  letter-spacing: 8px;
}

.product-subtitle {
  font-family: 'MiSans', sans-serif;
  font-weight: 400; /* regular */
  font-size: 24px; /* 1920*1080基准 */
  color: #ffffff;
  margin: 10px 0 0 0;
  line-height: 1.2;
  letter-spacing: 2px;
}

/* 产品图片 */
.product-image-container {
  position: absolute;
  top: 55%; /* 向下移动到55% */
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100vw - 80px); /* 左右各留40px */
  max-width: 990px; /* 最大宽度990px，1920*1080基准 */
  height: calc(100vh - 350px - 80px); /* 减少标题区域高度，增加可用空间 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain; /* 保持图片比例 */
  transition: all 0.3s ease;
}

/* 3D模型容器 */
.model-container {
  width: 100%;
  height: 100%;
  position: relative;
}

/* 视图切换按钮 */
.view-buttons {
  position: absolute;
  bottom: 80px; /* 距离底部80px，1920*1080基准 */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 100px; /* 按钮间距100px */
}

.view-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.6;
  outline: none; /* 移除外边框 */
  box-shadow: none; /* 移除阴影 */
}

.view-btn:hover {
  opacity: 1; /* hover时完全不透明 */
  transform: scale(1.15); /* 稍微放大一点 */
}

.view-btn.active {
  opacity: 1;
  transform: scale(1.15); /* 激活时放大 */
}

.view-btn-img {
  width: 50px; /* 1920*1080基准宽度50px */
  height: 50px; /* 1920*1080基准高度50px */
  border-radius: 50%;
  transition: all 0.3s ease;
  border: none; /* 移除边框 */
  outline: none; /* 移除外边框 */
  box-shadow: none; /* 移除阴影 */
}

/* 滚动指示器 */
.scroll-indicator {
  position: absolute;
  bottom: 10px; /* 更靠近底部，1920*1080基准 */
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
  animation: floatArrowUp 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
}

@keyframes floatArrow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

@keyframes floatArrowUp {
  0%, 100% {
    transform: rotate(180deg) translateY(0);
  }
  50% {
    transform: rotate(180deg) translateY(-12px);
  }
}

/* 响应式设计 */
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
  
  .product-header {
    top: 90px; /* 120px * 0.75 */
  }
  
  .product-title {
    font-size: 60px; /* 80px * 0.75 */
    letter-spacing: 6px; /* 8px * 0.75 */
  }
  
  .product-subtitle {
    font-size: 18px; /* 24px * 0.75 */
  }
  
  .product-image-container {
    width: calc(100vw - 60px); /* 左右各留30px，40px * 0.75 */
    height: calc(100vh - 263px - 60px); /* 减去标题和按钮区域高度，上下各留30px */
  }
  
  .view-buttons {
    bottom: 60px; /* 80px * 0.75 */
    gap: 75px; /* 100px * 0.75 */
  }
  
  .view-btn-img {
    width: 37.5px; /* 50px * 0.75 */
    height: 37.5px; /* 50px * 0.75 */
  }
  
  .scroll-indicator {
    bottom: 7.5px; /* 10px * 0.75 */
  }
  
  .scroll-arrow-img {
    width: 22.5px; /* 30px * 0.75 */
    height: 21px; /* 28px * 0.75 */
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
  
  .product-header {
    top: 72px; /* 120px * 0.6 */
  }
  
  .product-title {
    font-size: 48px; /* 80px * 0.6 */
    letter-spacing: 5px; /* 8px * 0.6 */
  }
  
  .product-subtitle {
    font-size: 14px; /* 24px * 0.6 */
  }
  
  .product-image-container {
    width: calc(100vw - 48px); /* 左右各留24px，40px * 0.6 */
    height: calc(100vh - 210px - 48px); /* 减去标题和按钮区域高度，上下各留24px */
  }
  
  .view-buttons {
    bottom: 48px; /* 80px * 0.6 */
    gap: 60px; /* 100px * 0.6 */
  }
  
  .view-btn-img {
    width: 30px; /* 50px * 0.6 */
    height: 30px; /* 50px * 0.6 */
  }
  
  .scroll-indicator {
    bottom: 6px; /* 10px * 0.6 */
  }
  
  .scroll-arrow-img {
    width: 18px; /* 30px * 0.6 */
    height: 16.8px; /* 28px * 0.6 */
  }
}

@media (max-width: 768px) {
  .navbar {
    height: 50px; /* 100px * 0.5 */
  }
  
  .logo {
    left: 100px; /* 200px * 0.5 */
  }
  
  .logo-img {
    width: 100px; /* 移动端logo更小 */
  }
  
  .nav-links {
    display: none; /* 移动端隐藏导航菜单 */
  }
  
  .nav-right {
    right: 71px; /* 142px * 0.5 */
  }
  
  .product-header {
    top: 60px; /* 120px * 0.5 */
  }
  
  .product-title {
    font-size: 40px; /* 80px * 0.5 */
    letter-spacing: 4px; /* 8px * 0.5 */
  }
  
  .product-subtitle {
    font-size: 12px; /* 24px * 0.5 */
  }
  
  .product-image-container {
    width: calc(100vw - 40px); /* 左右各留20px，40px * 0.5 */
    height: calc(100vh - 175px - 40px); /* 减去标题和按钮区域高度，上下各留20px */
  }
  
  .view-buttons {
    bottom: 40px; /* 80px * 0.5 */
    gap: 50px; /* 100px * 0.5 */
  }
  
  .view-btn-img {
    width: 25px; /* 50px * 0.5 */
    height: 25px; /* 50px * 0.5 */
  }
  
  .scroll-indicator {
    bottom: 5px; /* 10px * 0.5 */
  }
  
  .scroll-arrow-img {
    width: 15px; /* 30px * 0.5 */
    height: 14px; /* 28px * 0.5 */
  }
}

@media (max-width: 480px) {
  .navbar {
    height: 40px; /* 100px * 0.4 */
  }
  
  .logo {
    left: 80px; /* 200px * 0.4 */
  }
  
  .logo-img {
    width: 80px; /* 小屏幕logo更小 */
  }
  
  .nav-links {
    display: none; /* 小屏幕隐藏导航菜单 */
  }
  
  .nav-right {
    right: 57px; /* 142px * 0.4 */
  }
  
  .product-header {
    top: 48px; /* 120px * 0.4 */
  }
  
  .product-title {
    font-size: 32px; /* 80px * 0.4 */
    letter-spacing: 3px; /* 8px * 0.4 */
  }
  
  .product-subtitle {
    font-size: 10px; /* 24px * 0.4 */
  }
  
  .product-image-container {
    width: calc(100vw - 32px); /* 左右各留16px，40px * 0.4 */
    height: calc(100vh - 140px - 32px); /* 减去标题和按钮区域高度，上下各留16px */
  }
  
  .view-buttons {
    bottom: 32px; /* 80px * 0.4 */
    gap: 40px; /* 100px * 0.4 */
  }
  
  .view-btn-img {
    width: 20px; /* 50px * 0.4 */
    height: 20px; /* 50px * 0.4 */
  }
  
  .scroll-indicator {
    bottom: 4px; /* 10px * 0.4 */
  }
  
  .scroll-arrow-img {
    width: 12px; /* 30px * 0.4 */
    height: 11.2px; /* 28px * 0.4 */
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

/* 页脚内容 - 中部左对齐 */
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
  width: 24px; /* 调整为24px */
  height: 24px; /* 调整为24px */
  transition: transform 0.3s ease, opacity 0.3s ease;
  object-fit: fill;
}

.social-icon:hover {
  transform: scale(1.1);
  opacity: 0.8;
}

/* 文字区域 */
.footer-text-area {
  height: 90px; /* 1920*1080基准下三行文字总高度90px */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.footer-links, .footer-contact, .footer-copyright {
  height: 30px; /* 每行高度30px */
  display: flex;
  align-items: center;
}

.footer-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.footer-link {
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
}

.footer-link:hover {
  color: #01CE7E;
}

.footer-divider {
  color: #666666;
  margin: 0 0.5rem;
}

.footer-contact {
  color: #cccccc;
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
}

.footer-copyright {
  color: #999999;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 0; /* 移除padding，使用flex布局控制间距 */
  font-family: 'MiSans', 'Noto Sans SC', sans-serif;
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
    height: auto !important;
    justify-content: center;
  }
  
  .footer-copyright p {
    font-size: 12px !important;
    text-align: center !important;
    white-space: normal !important;
  }
}

@media (max-width: 480px) {
  .footer {
    height: auto !important;
    min-height: 120px;
    padding: 15px 0 !important;
  }
  
  /* 页脚移动端适配 */
  .footer-logo {
    position: relative !important;
    left: 0 !important;
    top: 0 !important;
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .footer-logo-img {
    width: 120px !important;
  }
  
  .footer-content {
    max-width: none !important;
    padding-left: 1rem !important;
    padding-right: 1rem !important;
    text-align: center !important;
    margin-left: 0 !important;
  }
  
  .social-icons {
    margin-bottom: 8px !important;
    justify-content: center !important;
    gap: 0.6rem;
  }
  
  .social-icon {
    width: 18px !important;
    height: 18px !important;
  }
  
  .footer-links {
    height: auto !important;
    justify-content: center !important;
    font-size: 10px !important;
    gap: 0.3rem;
  }
  
  .footer-text-area {
    height: auto !important;
  }
  
  .footer-contact {
    height: auto !important;
    justify-content: center;
  }
  
  .footer-contact p {
    font-size: 10px !important;
    text-align: center !important;
  }
  
  .footer-copyright {
    height: auto !important;
    justify-content: center;
  }
  
  .footer-copyright p {
    font-size: 10px !important;
    text-align: center !important;
    white-space: normal !important;
  }
}

/* 4K屏幕适配 (min-width: 2560px) - 按2倍放大 */
@media (min-width: 2560px) {
  .navbar {
    height: 240px !important; /* 与首页一致，从200px增加到240px */
  }
  
  .main-content {
    padding-top: 240px !important; /* 匹配导航栏高度，与首页一致 */
  }
  
  .product-section-title {
    font-size: 120px; /* 60px * 2 */
    margin-bottom: 80px; /* 40px * 2 */
  }
  
  .product-section-subtitle {
    font-size: 60px; /* 30px * 2 */
    margin-bottom: 120px; /* 60px * 2 */
  }
  
  .product-grid {
    gap: 80px; /* 40px * 2 */
    margin-bottom: 120px; /* 60px * 2 */
  }
  
  .product-card {
    padding: 60px; /* 30px * 2 */
  }
  
  .product-card-title {
    font-size: 48px; /* 24px * 2 */
    margin-bottom: 32px; /* 16px * 2 */
  }
  
  .product-card-description {
    font-size: 28px; /* 14px * 2 */
    line-height: 3; /* 1.5 * 2 */
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

/* 真 4K 视口 (3840px) */
@media (min-width: 3840px) {
  .navbar {
    height: 320px !important;
  }
  .main-content {
    padding-top: 320px !important;
  }
  .product-section-title {
    font-size: 160px;
    margin-bottom: 100px;
  }
  .product-section-subtitle {
    font-size: 78px;
  }
}
</style>
