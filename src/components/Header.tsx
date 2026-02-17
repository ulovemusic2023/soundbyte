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
      <circle cx="16" cy="16" r="12" stroke="#0071E3" strokeWidth="1" opacity="0.15" />
      <circle cx="16" cy="16" r="8" stroke="#0071E3" strokeWidth="1" opacity="0.3" />
      <circle cx="16" cy="16" r="4" stroke="#0071E3" strokeWidth="1.5" opacity="0.5" />
      <circle cx="16" cy="16" r="2" fill="#0071E3" />
      <line
        x1="16"
        y1="16"
        x2="26"
        y2="8"
        stroke="#0071E3"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
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
      className="text-center py-16 sm:py-20 px-6"
    >
      {/* Logo */}
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <RadarIcon />
        <span>
          Sound
          <span className="text-accent-cyan">Byte</span>
        </span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="text-base md:text-lg text-text-secondary tracking-wide mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Tech intelligence, distilled.
      </motion.p>

      {/* Stats bar */}
      <motion.div
        className="flex items-center justify-center gap-3 md:gap-5 text-sm text-text-tertiary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
          {entryCount} insights
        </span>
        <span className="text-border-medium">·</span>
        <span>3 radars</span>
        <span className="text-border-medium">·</span>
        <span>updated daily</span>
      </motion.div>
    </motion.header>
  )
}
