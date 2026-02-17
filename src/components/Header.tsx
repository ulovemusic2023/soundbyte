import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
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

function RadarIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block mr-2 -mt-1"
    >
      <circle cx="16" cy="16" r="12" stroke="var(--accent)" strokeWidth="1" opacity="0.15" />
      <circle cx="16" cy="16" r="8" stroke="var(--accent)" strokeWidth="1" opacity="0.3" />
      <circle cx="16" cy="16" r="4" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />
      <circle cx="16" cy="16" r="2" fill="var(--accent)" />
      <line
        x1="16"
        y1="16"
        x2="26"
        y2="8"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  )
}

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
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems: { page: NavPage; labelKey: TranslationKeys }[] = [
    { page: 'insights', labelKey: 'navInsights' },
    { page: 'trends', labelKey: 'navTrends' },
    { page: 'collections', labelKey: 'navCollections' },
  ]

  return (
    <>
      {/* Fixed top bar with glass effect */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 header-glass"
        style={{
          opacity: scrolled ? 1 : 0,
          pointerEvents: scrolled ? 'auto' : 'none',
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-base font-bold gradient-text">
            <RadarIcon />
            SoundByte
          </span>
          <div className="flex items-center gap-2">
            <button onClick={onToggleLang} className="icon-btn text-xs font-semibold" aria-label="Toggle language">
              {lang === 'zh-TW' ? 'EN' : '中'}
            </button>
            <button onClick={onToggleTheme} className="icon-btn" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Hero header section */}
      <header className="relative overflow-hidden">
        {/* Background orbs */}
        <div className="gradient-orb gradient-orb-1" />
        <div className="gradient-orb gradient-orb-2" />

        {/* Dot pattern overlay */}
        <div className="absolute inset-0 dot-pattern" />

        <div className="relative z-10 px-6 pt-10 pb-6 sm:pt-14 sm:pb-8">
          {/* Top-right controls */}
          <motion.div
            className="absolute top-6 right-6 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <button
              onClick={onToggleLang}
              className="icon-btn text-xs font-semibold"
              aria-label={`Switch to ${lang === 'zh-TW' ? 'English' : '中文'}`}
            >
              {lang === 'zh-TW' ? 'EN' : '中'}
            </button>
            <button
              onClick={onToggleTheme}
              className="icon-btn"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </motion.div>

          <div className="text-center max-w-3xl mx-auto">
            {/* Logo */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 gradient-text fade-in-up"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <RadarIcon />
              <span>SoundByte</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="text-base sm:text-lg tracking-wide mb-6 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t('tagline')}
            </motion.p>

            {/* Stats pills */}
            <motion.div
              className="flex items-center justify-center gap-3 md:gap-5 text-sm mb-8"
              style={{ color: 'var(--text-muted)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: 'var(--accent)' }}
                />
                {entryCount} {t('insights')}
              </span>
              <span style={{ color: 'var(--border-hover)' }}>·</span>
              <span>{t('radars')}</span>
              <span style={{ color: 'var(--border-hover)' }}>·</span>
              <span>{t('updatedDaily')}</span>
            </motion.div>

            {/* Navigation tabs with animated underline */}
            <motion.nav
              ref={navRef}
              className="flex items-center justify-center gap-1 relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <div className="flex items-center rounded-xl p-1" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                {navItems.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => onNavigate(item.page)}
                    className="relative px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-200"
                    style={{
                      color: currentPage === item.page ? 'var(--text-primary)' : 'var(--text-secondary)',
                      background: 'transparent',
                      border: 'none',
                      zIndex: 1,
                    }}
                  >
                    {currentPage === item.page && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: 'var(--accent-subtle)', border: '1px solid var(--accent)' }}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{t(item.labelKey)}</span>
                  </button>
                ))}
              </div>
            </motion.nav>
          </div>
        </div>
      </header>
    </>
  )
}
