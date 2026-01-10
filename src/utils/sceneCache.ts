// 3D场景缓存管理器
import * as THREE from 'three'
import { WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export interface CachedScene {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: WebGLRenderer
  controls: OrbitControls
  content: THREE.Object3D | null
  container: HTMLElement | null
  animationId: number | null
}

// 全局场景缓存
const sceneCache = new Map<string, CachedScene>()

// 保存场景到缓存
export const cacheScene = (key: string, sceneData: CachedScene) => {
  sceneCache.set(key, sceneData)
  console.log(`场景 ${key} 已缓存`)
}

// 从缓存获取场景
export const getCachedScene = (key: string): CachedScene | null => {
  return sceneCache.get(key) || null
}

// 检查场景是否已缓存
export const hasCachedScene = (key: string): boolean => {
  return sceneCache.has(key)
}

// 恢复场景到容器（不重新创建，只是重新附加到DOM）
export const restoreScene = (key: string, container: HTMLElement): boolean => {
  const cached = getCachedScene(key)
  if (!cached) return false

  // 如果容器已存在，先移除
  if (cached.container && cached.container.contains(cached.renderer.domElement)) {
    cached.container.removeChild(cached.renderer.domElement)
  }

  // 重新附加到新容器
  container.appendChild(cached.renderer.domElement)
  cached.container = container

  // 更新渲染器尺寸
  const width = container.clientWidth
  const height = container.clientHeight
  cached.renderer.setSize(width, height)
  cached.camera.aspect = width / height
  cached.camera.updateProjectionMatrix()

  console.log(`场景 ${key} 已恢复`)
  return true
}

// 清理场景（可选，用于释放内存）
export const clearSceneCache = (key?: string) => {
  if (key) {
    const cached = sceneCache.get(key)
    if (cached) {
      // 清理资源
      if (cached.animationId) {
        cancelAnimationFrame(cached.animationId)
      }
      if (cached.renderer) {
        cached.renderer.dispose()
      }
      if (cached.controls) {
        cached.controls.dispose()
      }
      // 清理模型
      if (cached.content) {
        cached.scene.remove(cached.content)
        cached.content.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry) child.geometry.dispose()
            if (child.material) {
              const materials = Array.isArray(child.material) ? child.material : [child.material]
              materials.forEach(material => {
                if (material.map) material.map.dispose()
                if (material.normalMap) material.normalMap.dispose()
                material.dispose()
              })
            }
          }
        })
      }
      sceneCache.delete(key)
      console.log(`场景 ${key} 已清理`)
    }
  } else {
    // 清理所有场景
    sceneCache.forEach((_, key) => {
      clearSceneCache(key)
    })
  }
}
