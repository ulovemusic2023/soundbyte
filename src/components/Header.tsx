import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, Radio, TrendingUp, FolderOpen } from 'lucide-react'
import type { TranslationKeys } from '../i18n/zh-TW'
import type { Lang } from '../hooks/useI18n'

export type NavPage = 'insights' | 'trends' | 'collections'

interface HeaderProps {
  entryCount: number
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  lang: Lang
  onToggleLang: () => void
  t: (key: TranslationKeys) => string
  currentPage: NavPage
  onNavigate: (page: NavPage) => void
}

const navItems: { page: NavPage; labelKey: TranslationKeys; icon: typeof Radio }[] = [
  { page: 'insights', labelKey: 'navInsights', icon: Radio },
  { page: 'trends', labelKey: 'navTrends', icon: TrendingUp },
  { page: 'collections', labelKey: 'navCollections', icon: FolderOpen },
]

export default function Header({
  entryCount,
  theme,
  onToggleTheme,
  lang,
  onToggleLang,
  t,
  currentPage,
  onNavigate,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 header-glass"
      style={{
        boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-14">
          {/* Left: Logo + entry count */}
          <div className="flex items-center gap-3">
            <span className="text-base font-bold gradient-text tracking-tight">
              SoundByte
            </span>
            <span
              className="text-[11px] font-mono px-2 py-0.5 rounded-full hidden sm:inline-flex"
              style={{
                color: 'var(--text-muted)',
                background: 'var(--bg-elevated)',
              }}
            >
              {entryCount} {t('insights')}
            </span>
          </div>

          {/* Center: Segmented control */}
          <nav className="flex items-center">
            <div
              className="relative flex items-center rounded-lg p-[3px] gap-[2px]"
              style={{ background: 'var(--bg-elevated)' }}
            >
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPage === item.page
                return (
                  <button
                    key={item.page}
                    onClick={() => onNavigate(item.page)}
                    className="relative flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-md text-[12px] sm:text-[13px] font-medium cursor-pointer transition-colors duration-150"
                    style={{
                      color: isActive
                        ? 'var(--text-primary)'
                        : 'var(--text-muted)',
                      background: 'transparent',
                      border: 'none',
                      zIndex: 1,
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute inset-0 rounded-md"
                        style={{
                          background: 'var(--bg-surface)',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.2), 0 0 0 1px var(--border-hover)',
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <Icon
                      size={14}
                      className="relative z-10 shrink-0"
                      style={{
                        color: isActive ? 'var(--accent)' : undefined,
                      }}
                    />
                    <span className="relative z-10 hidden sm:inline">
                      {t(item.labelKey)}
                    </span>
                  </button>
                )
              })}
            </div>
          </nav>

          {/* Right: Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onToggleLang}
              className="icon-btn text-[11px] font-semibold"
              aria-label={`Switch to ${lang === 'zh-TW' ? 'English' : '中文'}`}
            >
              {lang === 'zh-TW' ? 'EN' : '中'}
            </button>
            <button
              onClick={onToggleTheme}
              className="icon-btn"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
