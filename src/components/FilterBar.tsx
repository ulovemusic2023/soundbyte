import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LayoutGrid, Clock } from 'lucide-react'
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
      className={`pill ${active ? 'pill-active' : ''}`}
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
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      className={`filter-bar-sticky ${isScrolled ? 'filter-bar-scrolled' : ''}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="max-w-5xl mx-auto px-6 space-y-3">
        {/* Row 1: Radar filters */}
        <div className="flex flex-wrap gap-2 justify-center items-center">
          <span
            className="text-xs font-semibold uppercase tracking-wider mr-1"
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

        {/* Row 2: Priority + Time + Sort + View toggle */}
        <div className="flex flex-wrap gap-2 justify-center items-center">
          <span
            className="text-xs font-semibold uppercase tracking-wider mr-1"
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
            className="mx-1 hidden md:inline text-sm"
            style={{ color: 'var(--border-hover)' }}
          >
            |
          </span>

          <span
            className="text-xs font-semibold uppercase tracking-wider mr-1"
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
            className="mx-1 hidden md:inline text-sm"
            style={{ color: 'var(--border-hover)' }}
          >
            |
          </span>

          {/* Sort dropdown */}
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="styled-select"
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

          <span
            className="mx-1 hidden md:inline text-sm"
            style={{ color: 'var(--border-hover)' }}
          >
            |
          </span>

          {/* View toggle as icon buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`icon-btn ${viewMode === 'grid' ? 'icon-btn-active' : ''}`}
              aria-label="Grid view"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => onViewModeChange('timeline')}
              className={`icon-btn ${viewMode === 'timeline' ? 'icon-btn-active' : ''}`}
              aria-label="Timeline view"
            >
              <Clock size={15} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
