import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

interface HeaderProps {
  entryCount: number
  theme: 'dark' | 'light'
  onToggleTheme: () => void
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

export default function Header({ entryCount, theme, onToggleTheme }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-16 sm:py-20 lg:py-24 px-6"
    >
      {/* Theme toggle — top right */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        onClick={onToggleTheme}
        className="absolute top-6 right-6 p-2.5 rounded-xl
                   border cursor-pointer
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
          className="text-base md:text-lg tracking-wide mb-8 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Tech intelligence, distilled.
        </motion.p>

        {/* Stats bar */}
        <motion.div
          className="flex items-center justify-center gap-3 md:gap-5 text-sm"
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
            {entryCount} insights
          </span>
          <span style={{ color: 'var(--border-hover)' }}>·</span>
          <span>3 radars</span>
          <span style={{ color: 'var(--border-hover)' }}>·</span>
          <span>updated daily</span>
        </motion.div>
      </div>
    </motion.header>
  )
}
