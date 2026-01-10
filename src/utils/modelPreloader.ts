// 3D模型预加载工具
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

// 全局模型缓存
const globalModelCache = new Map<string, THREE.Object3D>()
let dracoLoader: DRACOLoader | null = null

// 初始化Draco加载器（只初始化一次）
const initDracoLoader = () => {
  if (!dracoLoader) {
    dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    dracoLoader.preload()
  }
  return dracoLoader
}

// 预加载模型
export const preloadModel = async (modelPath: string): Promise<THREE.Object3D | null> => {
  // 检查缓存
  if (globalModelCache.has(modelPath)) {
    console.log(`模型 ${modelPath} 已在缓存中`)
    return globalModelCache.get(modelPath)!
  }

  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader()
    const draco = initDracoLoader()
    loader.setDRACOLoader(draco)
    loader.setRequestHeader({ 'Accept': 'application/octet-stream' })

    loader.load(
      modelPath,
      (gltf) => {
        const object = gltf.scene || gltf.scenes[0]
        if (!object) {
          reject(new Error(`模型 ${modelPath} 中没有场景`))
          return
        }

        // 优化模型
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.frustumCulled = true
            
            if (child.material) {
              const materials = Array.isArray(child.material) ? child.material : [child.material]
              materials.forEach(material => {
                material.precision = 'mediump'
                material.needsUpdate = true
              })
            }
            
            if (child.geometry) {
              child.geometry.computeBoundingBox()
              child.geometry.computeBoundingSphere()
            }
          }
        })

        // 缓存模型
        globalModelCache.set(modelPath, object)
        console.log(`模型 ${modelPath} 预加载完成`)
        resolve(object)
      },
      (progress) => {
        if (progress.total > 0) {
          const percent = (progress.loaded / progress.total * 100).toFixed(2)
          console.log(`预加载 ${modelPath}: ${percent}%`)
        }
      },
      (error) => {
        console.error(`预加载模型 ${modelPath} 失败:`, error)
        reject(error)
      }
    )
  })
}

// 获取缓存的模型
export const getCachedModel = (modelPath: string): THREE.Object3D | null => {
  return globalModelCache.get(modelPath) || null
}

// 预加载所有常用模型
export const preloadAllModels = async () => {
  const models = [
    '/models/loomydraco.glb',
    '/models/zbhdraco.glb'
  ]

  console.log('开始预加载所有3D模型...')
  
  try {
    await Promise.allSettled(
      models.map(model => preloadModel(model))
    )
    console.log('所有3D模型预加载完成')
  } catch (error) {
    console.error('预加载模型时出错:', error)
  }
}
