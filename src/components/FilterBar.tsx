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
  dot?: string
}

function Pill({ label, active, onClick, dot }: PillProps) {
  return (
    <button
      onClick={onClick}
      className={`pill ${active ? 'pill-active' : ''}`}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full inline-block"
          style={{ background: dot }}
        />
      )}
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
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const radarOptions: { value: RadarFilter; labelKey: TranslationKeys }[] = [
    { value: 'all', labelKey: 'all' },
    { value: 'music-tech', labelKey: 'musicTech' },
    { value: 'ai-infra', labelKey: 'aiInfra' },
    { value: 'software-dev', labelKey: 'softwareDev' },
    { value: 'founder-mind', labelKey: 'founderMind' },
  ]

  const priorityOptions: { value: PriorityFilter; labelKey: TranslationKeys; color?: string }[] = [
    { value: 'all', labelKey: 'all' },
    { value: 'paradigm-shift', labelKey: 'paradigmShift', color: 'var(--priority-paradigm)' },
    { value: 'high', labelKey: 'high', color: 'var(--priority-high)' },
    { value: 'medium', labelKey: 'medium', color: 'var(--priority-medium)' },
    { value: 'mental-model', labelKey: 'mentalModel', color: 'var(--priority-mental-model)' },
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
      style={{ top: '56px' }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Single scrollable row */}
        <div className="flex items-center gap-4 overflow-x-auto pb-1 scrollbar-none">
          {/* Radar segment */}
          <div className="flex items-center gap-1.5 shrink-0">
            {radarOptions.map((opt) => (
              <Pill
                key={opt.value}
                label={t(opt.labelKey)}
                active={radarFilter === opt.value}
                onClick={() => onRadarChange(opt.value)}
              />
            ))}
          </div>

          <div className="w-px h-5 shrink-0" style={{ background: 'var(--border)' }} />

          {/* Priority segment */}
          <div className="flex items-center gap-1.5 shrink-0">
            {priorityOptions.map((opt) => (
              <Pill
                key={opt.value}
                label={t(opt.labelKey)}
                active={priorityFilter === opt.value}
                onClick={() => onPriorityChange(opt.value)}
                dot={opt.color}
              />
            ))}
          </div>

          <div className="w-px h-5 shrink-0" style={{ background: 'var(--border)' }} />

          {/* Time segment */}
          <div className="flex items-center gap-1.5 shrink-0">
            {timeOptions.map((opt) => (
              <Pill
                key={opt.value}
                label={t(opt.labelKey)}
                active={timeFilter === opt.value}
                onClick={() => onTimeChange(opt.value)}
              />
            ))}
          </div>

          {/* Spacer to push right controls */}
          <div className="flex-1 min-w-2" />

          {/* Sort + View controls */}
          <div className="flex items-center gap-2 shrink-0">
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

            <div className="flex items-center gap-0.5">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`icon-btn ${viewMode === 'grid' ? 'icon-btn-active' : ''}`}
                aria-label="Grid view"
              >
                <LayoutGrid size={14} />
              </button>
              <button
                onClick={() => onViewModeChange('timeline')}
                className={`icon-btn ${viewMode === 'timeline' ? 'icon-btn-active' : ''}`}
                aria-label="Timeline view"
              >
                <Clock size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
