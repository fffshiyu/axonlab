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
          <img src="/loomi_text.png" alt="LOOMI" class="product-title-img" />
        </div>
        
        <!-- 产品图片 -->
        <div class="product-image-container">
          <!-- 主产品图 -->
          <div class="product-main-wrapper">
            <img src="/loomi.png" alt="LOOMI产品" class="product-img" />
            
            <!-- 顶部按钮 -->
            <button 
              class="product-btn top-btn" 
              :class="{ active: activeButton === 'top' }"
              @click="handleButtonClick('top')"
            >
              <img :src="activeButton === 'top' ? '/BTN_onmodel.png' : '/BTN_before.png'" alt="顶部" />
            </button>
            
            <!-- 左侧按钮 -->
            <button 
              v-show="activeButton !== 'left'"
              class="product-btn left-btn" 
              :class="{ active: activeButton === 'left' }"
              @click="handleButtonClick('left')"
            >
              <img :src="activeButton === 'left' ? '/BTN_onmodel.png' : '/BTN_before.png'" alt="左侧" />
            </button>
            
            <!-- 底部按钮 -->
            <button 
              v-show="activeButton !== 'bottom'"
              class="product-btn bottom-btn" 
              :class="{ active: activeButton === 'bottom' }"
              @click="handleButtonClick('bottom')"
            >
              <img :src="activeButton === 'bottom' ? '/BTN_onmodel.png' : '/BTN_before.png'" alt="底部" />
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
              src="/csys.png" 
              alt="参数详情" 
              class="params-detail-img"
              @click="closeParamsImage"
            />
          </transition>
          
          <div class="icon-item" @click="handleIconClick('参数')">
            <div class="icon-fill"></div>
            <img src="/canshu_icon.png" alt="参数" class="icon-img" />
            <span class="icon-label">参数</span>
          </div>
          <div class="icon-item" @click="handleIconClick('正面')">
            <div class="icon-fill"></div>
            <img src="/zhengmian_icon.png" alt="正面" class="icon-img" />
            <span class="icon-label">正面</span>
          </div>
          <div class="icon-item" @click="handleIconClick('侧面')">
            <div class="icon-fill"></div>
            <img src="/cemian_icon.png" alt="侧面" class="icon-img" />
            <span class="icon-label">侧面</span>
          </div>
          <div class="icon-item" @click="handleIconClick('背面')">
            <div class="icon-fill"></div>
            <img src="/beimian_icon.png" alt="背面" class="icon-img" />
            <span class="icon-label">背面</span>
          </div>
        </div>
      </div>
      
      <!-- 滚动指示器 -->
      <div class="scroll-indicator" @click="scrollToNextProduct">
        <img src="/arrow.png" alt="向下箭头" class="scroll-arrow-img" />
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
          <img src="/axonrob_text.png" alt="AXONROB" class="product-title-img" />
        </div>
        
        <!-- 产品图片 - 3D模型 -->
        <div class="product-image-container">
          <!-- 3D模型容器 -->
          <div class="product-main-wrapper">
            <div ref="modelContainer" class="model-3d-container"></div>
            
            <!-- 顶部按钮 -->
            <button 
              class="product-btn top-btn" 
              :class="{ active: activeButton2 === 'top' }"
              @click="handleButtonClick2('top')"
            >
              <img :src="activeButton2 === 'top' ? '/BTN_onmodel.png' : '/BTN_before.png'" alt="顶部" />
            </button>
            
            <!-- 左侧按钮 -->
            <button 
              v-show="activeButton2 !== 'left'"
              class="product-btn left-btn" 
              :class="{ active: activeButton2 === 'left' }"
              @click="handleButtonClick2('left')"
            >
              <img :src="activeButton2 === 'left' ? '/BTN_onmodel.png' : '/BTN_before.png'" alt="左侧" />
            </button>
            
            <!-- 底部按钮 -->
            <button 
              v-show="activeButton2 !== 'bottom'"
              class="product-btn bottom-btn" 
              :class="{ active: activeButton2 === 'bottom' }"
              @click="handleButtonClick2('bottom')"
            >
              <img :src="activeButton2 === 'bottom' ? '/BTN_onmodel.png' : '/BTN_before.png'" alt="底部" />
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
              src="/csys.png" 
              alt="参数详情" 
              class="params-detail-img"
              @click="closeParamsImage2"
            />
          </transition>
          
          <div class="icon-item" @click="handleIconClick2('参数')">
            <div class="icon-fill"></div>
            <img src="/canshu_icon.png" alt="参数" class="icon-img" />
            <span class="icon-label">参数</span>
          </div>
          <div class="icon-item" @click="handleIconClick2('正面')">
            <div class="icon-fill"></div>
            <img src="/zhengmian_icon.png" alt="正面" class="icon-img" />
            <span class="icon-label">正面</span>
          </div>
          <div class="icon-item" @click="handleIconClick2('侧面')">
            <div class="icon-fill"></div>
            <img src="/cemian_icon.png" alt="侧面" class="icon-img" />
            <span class="icon-label">侧面</span>
          </div>
          <div class="icon-item" @click="handleIconClick2('背面')">
            <div class="icon-fill"></div>
            <img src="/beimian_icon.png" alt="背面" class="icon-img" />
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
              <img src="/logo/weibo.png" alt="微博" />
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

// 3D模型相关（Three.js）
const modelContainer = ref<HTMLDivElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let content: THREE.Object3D | null = null
let animationId: number
let retryCount = 0
let resizeTimeout: number | null = null

// 初始化Three.js场景
const init3DScene = () => {
  if (!modelContainer.value) {
    console.error('模型容器未找到')
    return
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

  console.log('初始化Three.js场景，容器尺寸:', width, height)

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
  controls.screenSpacePanning = true
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.autoRotate = true  // 启用自动旋转
  controls.autoRotateSpeed = 1.0  // 设置旋转速度
  controls.enableZoom = false  // 禁用缩放功能

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

  // 加载3D模型
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/')
  
  const loader = new GLTFLoader()
  loader.setDRACOLoader(dracoLoader)
  
  loader.load(
    '/models/zbh.glb',
    (gltf) => {
      const object = gltf.scene || gltf.scenes[0]
      
      if (!object) {
        console.error('模型中没有场景')
        return
      }

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
      console.log('模型加载成功并已优化')
    },
    (progress) => {
      console.log('加载进度:', (progress.loaded / progress.total * 100).toFixed(2) + '%')
    },
    (error) => {
      console.error('加载模型失败:', error)
    }
  )

  // 开始动画循环
  animate()

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

  // 设置controls的最大距离
  controls.maxDistance = size * 10

  // 设置相机的近远裁剪面
  camera.near = size / 100
  camera.far = size * 100
  camera.updateProjectionMatrix()

  // 设置相机位置
  camera.position.copy(center)
  camera.position.x += size / 2.0
  camera.position.y += size / 5.0
  camera.position.z += size / 2.0
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

// 动画循环
const animate = () => {
  animationId = requestAnimationFrame(animate)
  
  // 更新controls（OrbitControls会处理autoRotate）
  controls.update()
  
  renderer.render(scene, camera)
}

// 清理3D场景（完整的资源释放）
const cleanup3DScene = () => {
  // 取消动画循环
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  
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
      sideImage.value = '/button2.png'
      overlayPosition.value = 'left-overlay'
    } else if (position === 'bottom') {
      sideImage.value = '/button3.png'
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
  }
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
      sideImage2.value = '/button2.png'
      overlayPosition2.value = 'left-overlay'
    } else if (position === 'bottom') {
      sideImage2.value = '/button3.png'
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
  
  // 暂停自动旋转
  controls.autoRotate = false
  
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
    init3DScene()
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
})

// 组件卸载时清理3D场景
onUnmounted(() => {
  cleanup3DScene()
  
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
  background-image: url('/loomi_bg.png');
}

/* AXONROB 背景 */
.axonrob-bg {
  background-image: url('/axonrob_bg.png');
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
}

/* 小标题容器 */
.product-title-container {
  margin-bottom: 40px;
  z-index: 3;
}

.product-title-img {
  max-width: 400px;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
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
  width: 60vw;
  height: 60vh;
  max-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 3D模型容器 - 放大到整个区域 */
.model-3d-container {
  width: 100vw;
  height: 80vh;
  position: relative;
  z-index: 1;
}

.model-3d-container canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
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
  z-index: 2;
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
    max-width: 350px;
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
    max-width: 300px;
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
    padding-top: 80px;
  }
  
  .product-title-container {
    margin-bottom: 30px;
  }
  
  .product-title-img {
    max-width: 250px;
  }
  
  .product-image-container {
    max-width: 75vw;
    max-height: 45vh;
  }
  
  .icon-column {
    right: 30px;
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .product-series-content {
    padding-top: 60px;
  }
  
  .product-title-container {
    margin-bottom: 20px;
  }
  
  .product-title-img {
    max-width: 200px;
  }
  
  .product-image-container {
    max-width: 80vw;
    max-height: 40vh;
  }
  
  .icon-column {
    right: 20px;
    gap: 10px;
  }
}
</style>

