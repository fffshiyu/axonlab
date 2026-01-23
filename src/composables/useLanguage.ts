import { ref, computed } from 'vue'

export type Language = 'zh' | 'en'

const currentLanguage = ref<Language>('zh')

export const useLanguage = () => {
  const setLanguage = (lang: Language) => {
    currentLanguage.value = lang
    localStorage.setItem('language', lang)
  }

  const toggleLanguage = () => {
    currentLanguage.value = currentLanguage.value === 'zh' ? 'en' : 'zh'
    localStorage.setItem('language', currentLanguage.value)
  }

  const initLanguage = () => {
    const savedLang = localStorage.getItem('language') as Language | null
    if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
      currentLanguage.value = savedLang
    }
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
