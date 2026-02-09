import { ref, computed } from 'vue'

export type Language = 'zh' | 'en'

const currentLanguage = ref<Language>('zh')

export const useLanguage = () => {
  const setLanguage = (lang: Language) => {
    currentLanguage.value = lang
    localStorage.setItem('language', lang)
  }

  // 暂时锁掉 EN，待文案优化后开放
  const toggleLanguage = () => {
    // 仅允许 CN，不切换到 EN
    if (currentLanguage.value === 'zh') return
    currentLanguage.value = 'zh'
    localStorage.setItem('language', 'zh')
  }

  const initLanguage = () => {
    // 暂时强制中文，待 EN 开放后恢复：localStorage 读取
    currentLanguage.value = 'zh'
    localStorage.setItem('language', 'zh')
  }

  return {
    currentLanguage: computed(() => currentLanguage.value),
    setLanguage,
    toggleLanguage,
    initLanguage,
    isZh: computed(() => currentLanguage.value === 'zh'),
    isEn: computed(() => currentLanguage.value === 'en')
  }
}
