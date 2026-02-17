import { motion } from 'framer-motion'
import { ArrowUpDown } from 'lucide-react'
import type { RadarFilter, PriorityFilter, TimeFilter, SortOption } from '../types'

interface FilterBarProps {
  radarFilter: RadarFilter
  priorityFilter: PriorityFilter
  timeFilter: TimeFilter
  sortOption: SortOption
  hasQuery: boolean
  onRadarChange: (f: RadarFilter) => void
  onPriorityChange: (f: PriorityFilter) => void
  onTimeChange: (f: TimeFilter) => void
  onSortChange: (s: SortOption) => void
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
      className="px-3.5 py-1.5 rounded-full text-sm font-medium
                 transition-all duration-200 cursor-pointer whitespace-nowrap"
      style={{
        background: active ? 'var(--accent)' : 'transparent',
        color: active ? '#FFFFFF' : 'var(--text-secondary)',
        border: active ? '1px solid var(--accent)' : '1px solid var(--border)',
      }}
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

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'date', label: 'Newest' },
  { value: 'priority', label: 'Priority' },
  { value: 'relevance', label: 'Relevance' },
]

export default function FilterBar({
  radarFilter,
  priorityFilter,
  timeFilter,
  sortOption,
  hasQuery,
  onRadarChange,
  onPriorityChange,
  onTimeChange,
  onSortChange,
}: FilterBarProps) {
  return (
    <motion.div
      className="max-w-4xl mx-auto px-6 mb-12 space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      {/* Radar filters */}
      <div className="flex flex-wrap gap-2.5 justify-center items-center">
        <span
          className="text-xs font-medium uppercase tracking-wider mr-1"
          style={{ color: 'var(--text-muted)' }}
        >
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

      {/* Priority + Time + Sort */}
      <div className="flex flex-wrap gap-2.5 justify-center items-center">
        <span
          className="text-xs font-medium uppercase tracking-wider mr-1"
          style={{ color: 'var(--text-muted)' }}
        >
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

        <span
          className="mx-1 hidden md:inline"
          style={{ color: 'var(--border-hover)' }}
        >
          |
        </span>

        <span
          className="text-xs font-medium uppercase tracking-wider mr-1"
          style={{ color: 'var(--text-muted)' }}
        >
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

        <span
          className="mx-1 hidden md:inline"
          style={{ color: 'var(--border-hover)' }}
        >
          |
        </span>

        {/* Sort dropdown */}
        <div className="flex items-center gap-1.5">
          <ArrowUpDown size={14} style={{ color: 'var(--text-muted)' }} />
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="text-sm font-medium rounded-lg px-2.5 py-1.5
                       outline-none cursor-pointer transition-all duration-200
                       appearance-none"
            style={{
              background: 'var(--bg-secondary)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
            }}
          >
            {sortOptions.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                disabled={opt.value === 'relevance' && !hasQuery}
              >
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  )
}
