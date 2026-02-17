import { motion } from 'framer-motion'
import { ArrowUpDown } from 'lucide-react'
import type { RadarFilter, PriorityFilter, TimeFilter, SortOption } from '../types'
import type { TranslationKeys } from '../i18n/zh-TW'

export type ViewMode = 'grid' | 'timeline'

interface FilterBarProps {
  radarFilter: RadarFilter
  priorityFilter: PriorityFilter
  timeFilter: TimeFilter
  sortOption: SortOption
  hasQuery: boolean
  viewMode: ViewMode
  onRadarChange: (f: RadarFilter) => void
  onPriorityChange: (f: PriorityFilter) => void
  onTimeChange: (f: TimeFilter) => void
  onSortChange: (s: SortOption) => void
  onViewModeChange: (m: ViewMode) => void
  t: (key: TranslationKeys) => string
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

export default function FilterBar({
  radarFilter,
  priorityFilter,
  timeFilter,
  sortOption,
  hasQuery,
  viewMode,
  onRadarChange,
  onPriorityChange,
  onTimeChange,
  onSortChange,
  onViewModeChange,
  t,
}: FilterBarProps) {
  const radarOptions: { value: RadarFilter; labelKey: TranslationKeys }[] = [
    { value: 'all', labelKey: 'all' },
    { value: 'music-tech', labelKey: 'musicTech' },
    { value: 'ai-infra', labelKey: 'aiInfra' },
    { value: 'software-dev', labelKey: 'softwareDev' },
  ]

  const priorityOptions: { value: PriorityFilter; labelKey: TranslationKeys }[] = [
    { value: 'all', labelKey: 'all' },
    { value: 'paradigm-shift', labelKey: 'paradigmShift' },
    { value: 'high', labelKey: 'high' },
    { value: 'medium', labelKey: 'medium' },
  ]

  const timeOptions: { value: TimeFilter; labelKey: TranslationKeys }[] = [
    { value: 'all', labelKey: 'allTime' },
    { value: 'today', labelKey: 'today' },
    { value: 'week', labelKey: 'thisWeek' },
    { value: 'month', labelKey: 'thisMonth' },
  ]

  const sortOptions: { value: SortOption; labelKey: TranslationKeys }[] = [
    { value: 'date', labelKey: 'newest' },
    { value: 'priority', labelKey: 'prioritySort' },
    { value: 'relevance', labelKey: 'relevance' },
  ]

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
          {t('radar')}
        </span>
        {radarOptions.map((opt) => (
          <Pill
            key={opt.value}
            label={t(opt.labelKey)}
            active={radarFilter === opt.value}
            onClick={() => onRadarChange(opt.value)}
          />
        ))}
      </div>

      {/* Priority + Time + Sort + View toggle */}
      <div className="flex flex-wrap gap-2.5 justify-center items-center">
        <span
          className="text-xs font-medium uppercase tracking-wider mr-1"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('priority')}
        </span>
        {priorityOptions.map((opt) => (
          <Pill
            key={opt.value}
            label={t(opt.labelKey)}
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
          {t('time')}
        </span>
        {timeOptions.map((opt) => (
          <Pill
            key={opt.value}
            label={t(opt.labelKey)}
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
                {t(opt.labelKey)}
              </option>
            ))}
          </select>
        </div>

        <span
          className="mx-1 hidden md:inline"
          style={{ color: 'var(--border-hover)' }}
        >
          |
        </span>

        {/* View toggle */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onViewModeChange('grid')}
            className="px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer
                       transition-all duration-200"
            style={{
              background: viewMode === 'grid' ? 'var(--accent)' : 'transparent',
              color: viewMode === 'grid' ? '#fff' : 'var(--text-secondary)',
              border: viewMode === 'grid' ? '1px solid var(--accent)' : '1px solid var(--border)',
            }}
          >
            {t('gridView')}
          </button>
          <button
            onClick={() => onViewModeChange('timeline')}
            className="px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer
                       transition-all duration-200"
            style={{
              background: viewMode === 'timeline' ? 'var(--accent)' : 'transparent',
              color: viewMode === 'timeline' ? '#fff' : 'var(--text-secondary)',
              border: viewMode === 'timeline' ? '1px solid var(--accent)' : '1px solid var(--border)',
            }}
          >
            {t('timelineView')}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
