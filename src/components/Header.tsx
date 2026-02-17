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
  const navItems: { page: NavPage; labelKey: TranslationKeys }[] = [
    { page: 'insights', labelKey: 'navInsights' },
    { page: 'trends', labelKey: 'navTrends' },
    { page: 'collections', labelKey: 'navCollections' },
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-12 sm:py-16 lg:py-20 px-6"
    >
      {/* Top-right controls: lang toggle + theme toggle */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
        {/* Language toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          onClick={onToggleLang}
          className="px-3 py-2 rounded-xl border cursor-pointer
                     transition-all duration-300 text-xs font-semibold"
          style={{
            borderColor: 'var(--border)',
            background: 'var(--bg-secondary)',
            color: 'var(--text-secondary)',
          }}
          aria-label={`Switch to ${lang === 'zh-TW' ? 'English' : '中文'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {lang === 'zh-TW' ? 'EN' : '中'}
        </motion.button>

        {/* Theme toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          onClick={onToggleTheme}
          className="p-2.5 rounded-xl border cursor-pointer
                     transition-all duration-300"
          style={{
            borderColor: 'var(--border)',
            background: 'var(--bg-secondary)',
            color: 'var(--text-secondary)',
          }}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>
      </div>

      <div className="text-center">
        {/* Logo */}
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <RadarIcon />
          <span>
            Sound
            <span style={{ color: 'var(--accent)' }}>Byte</span>
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-base md:text-lg tracking-wide mb-6 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {t('tagline')}
        </motion.p>

        {/* Stats bar */}
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

        {/* Navigation tabs */}
        <motion.nav
          className="flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className="px-4 py-2 rounded-xl text-sm font-semibold
                         transition-all duration-200 cursor-pointer"
              style={{
                background: currentPage === item.page ? 'var(--accent)' : 'transparent',
                color: currentPage === item.page ? '#FFFFFF' : 'var(--text-secondary)',
                border:
                  currentPage === item.page
                    ? '1px solid var(--accent)'
                    : '1px solid var(--border)',
              }}
            >
              {t(item.labelKey)}
            </button>
          ))}
        </motion.nav>
      </div>
    </motion.header>
  )
}
