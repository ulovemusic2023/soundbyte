import { motion } from 'framer-motion'
import type { RadarFilter, PriorityFilter, TimeFilter } from '../types'

interface FilterBarProps {
  radarFilter: RadarFilter
  priorityFilter: PriorityFilter
  timeFilter: TimeFilter
  onRadarChange: (f: RadarFilter) => void
  onPriorityChange: (f: PriorityFilter) => void
  onTimeChange: (f: TimeFilter) => void
}

interface PillProps {
  label: string
  active: boolean
  onClick: () => void
  glowColor?: string
}

function Pill({ label, active, onClick, glowColor }: PillProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium
        transition-all duration-200 cursor-pointer whitespace-nowrap
        ${active
          ? 'text-text-primary bg-bg-tertiary border border-accent-cyan/30'
          : 'text-text-secondary bg-bg-secondary/50 border border-border-subtle hover:border-border-medium hover:text-text-primary'
        }
      `}
    >
      {active && glowColor && (
        <span
          className="absolute inset-0 rounded-full opacity-10 blur-md -z-10"
          style={{ background: glowColor }}
        />
      )}
      {label}
    </button>
  )
}

const radarOptions: { value: RadarFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'music-tech', label: '🎵 Music Tech' },
  { value: 'ai-infra', label: '🤖 AI Infra' },
  { value: 'software-dev', label: '💻 Software Dev' },
]

const priorityOptions: { value: PriorityFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'paradigm-shift', label: '🔴 Paradigm Shift' },
  { value: 'high', label: '🟡 High' },
  { value: 'medium', label: '🟢 Medium' },
]

const timeOptions: { value: TimeFilter; label: string }[] = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
]

export default function FilterBar({
  radarFilter,
  priorityFilter,
  timeFilter,
  onRadarChange,
  onPriorityChange,
  onTimeChange,
}: FilterBarProps) {
  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 mb-8 space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      {/* Radar filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        <span className="text-[10px] md:text-xs text-text-tertiary font-mono uppercase tracking-wider self-center mr-1">
          Radar
        </span>
        {radarOptions.map((opt) => (
          <Pill
            key={opt.value}
            label={opt.label}
            active={radarFilter === opt.value}
            onClick={() => onRadarChange(opt.value)}
            glowColor="var(--color-accent-cyan)"
          />
        ))}
      </div>

      {/* Priority + Time filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        <span className="text-[10px] md:text-xs text-text-tertiary font-mono uppercase tracking-wider self-center mr-1">
          Priority
        </span>
        {priorityOptions.map((opt) => (
          <Pill
            key={opt.value}
            label={opt.label}
            active={priorityFilter === opt.value}
            onClick={() => onPriorityChange(opt.value)}
            glowColor="var(--color-accent-blue)"
          />
        ))}
        <span className="text-border-subtle self-center mx-1 hidden md:inline">|</span>
        <span className="text-[10px] md:text-xs text-text-tertiary font-mono uppercase tracking-wider self-center mr-1">
          Time
        </span>
        {timeOptions.map((opt) => (
          <Pill
            key={opt.value}
            label={opt.label}
            active={timeFilter === opt.value}
            onClick={() => onTimeChange(opt.value)}
            glowColor="var(--color-accent-cyan)"
          />
        ))}
      </div>
    </motion.div>
  )
}
