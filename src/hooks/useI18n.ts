import { useState, useCallback, useEffect } from 'react'
import { zhTW, type TranslationKeys } from '../i18n/zh-TW'
import { en } from '../i18n/en'

export type Lang = 'zh-TW' | 'en'

const STORAGE_KEY = 'soundbyte-lang'

const translations: Record<Lang, Record<TranslationKeys, string>> = {
  'zh-TW': zhTW,
  en,
}

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'zh-TW'
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'zh-TW' || stored === 'en') return stored
  return 'zh-TW'
}

export function useI18n() {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang === 'zh-TW' ? 'zh-TW' : 'en')
  }, [lang])

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next = prev === 'zh-TW' ? 'en' : 'zh-TW'
      localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }, [])

  const t = useCallback(
    (key: TranslationKeys): string => {
      return translations[lang][key] ?? key
    },
    [lang]
  )

  return { lang, toggleLang, t } as const
}
