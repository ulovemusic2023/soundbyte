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
}

function Pill({ label, active, onClick }: PillProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm font-medium
        transition-all duration-200 cursor-pointer whitespace-nowrap
        ${active
          ? 'text-white bg-accent-cyan shadow-sm'
          : 'text-text-secondary bg-white border border-border-subtle hover:border-border-medium hover:text-text-primary'
        }
      `}
    >
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
      className="max-w-4xl mx-auto px-6 mb-12 space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      {/* Radar filters */}
      <div className="flex flex-wrap gap-3 justify-center items-center">
        <span className="text-xs text-text-tertiary font-medium uppercase tracking-wider mr-1">
          Radar
        </span>
        {radarOptions.map((opt) => (
          <Pill
            key={opt.value}
            label={opt.label}
            active={radarFilter === opt.value}
            onClick={() => onRadarChange(opt.value)}
          />
        ))}
      </div>

      {/* Priority + Time filters */}
      <div className="flex flex-wrap gap-3 justify-center items-center">
        <span className="text-xs text-text-tertiary font-medium uppercase tracking-wider mr-1">
          Priority
        </span>
        {priorityOptions.map((opt) => (
          <Pill
            key={opt.value}
            label={opt.label}
            active={priorityFilter === opt.value}
            onClick={() => onPriorityChange(opt.value)}
          />
        ))}
        <span className="text-border-medium mx-1 hidden md:inline">|</span>
        <span className="text-xs text-text-tertiary font-medium uppercase tracking-wider mr-1">
          Time
        </span>
        {timeOptions.map((opt) => (
          <Pill
            key={opt.value}
            label={opt.label}
            active={timeFilter === opt.value}
            onClick={() => onTimeChange(opt.value)}
          />
        ))}
      </div>
    </motion.div>
  )
}
