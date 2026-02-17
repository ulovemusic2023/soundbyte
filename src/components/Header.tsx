import { motion } from 'framer-motion'

interface HeaderProps {
  entryCount: number
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
      <circle cx="16" cy="16" r="12" stroke="var(--color-accent-cyan)" strokeWidth="1" opacity="0.2" />
      <circle cx="16" cy="16" r="8" stroke="var(--color-accent-cyan)" strokeWidth="1" opacity="0.4" />
      <circle cx="16" cy="16" r="4" stroke="var(--color-accent-cyan)" strokeWidth="1.5" opacity="0.6" />
      <circle cx="16" cy="16" r="2" fill="var(--color-accent-cyan)" />
      <line
        x1="16"
        y1="16"
        x2="26"
        y2="8"
        stroke="var(--color-accent-cyan)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
        className="radar-sweep origin-center"
        style={{ transformOrigin: '16px 16px' }}
      />
    </svg>
  )
}

export default function Header({ entryCount }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center pt-12 pb-6 px-4 md:pt-16 md:pb-8"
    >
      {/* Logo */}
      <motion.h1
        className="font-mono text-3xl md:text-5xl font-bold tracking-tight text-text-primary mb-3"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <RadarIcon />
        <span className="relative">
          Sound
          <span className="text-accent-cyan">Byte</span>
          {/* Glow behind text */}
          <span
            className="absolute inset-0 blur-2xl opacity-20 -z-10"
            style={{ background: 'var(--color-accent-cyan)' }}
          />
        </span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="font-mono text-sm md:text-base text-text-secondary tracking-widest uppercase mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Tech intelligence, distilled.
      </motion.p>

      {/* Stats bar */}
      <motion.div
        className="flex items-center justify-center gap-2 md:gap-4 text-xs md:text-sm text-text-tertiary font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
          {entryCount} insights
        </span>
        <span className="text-border-medium">•</span>
        <span>3 radars</span>
        <span className="text-border-medium">•</span>
        <span>updated daily</span>
      </motion.div>
    </motion.header>
  )
}
