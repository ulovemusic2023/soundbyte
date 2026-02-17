import { useMemo } from 'react'
import { motion } from 'framer-motion'
import type { Entry } from '../types'
import type { TranslationKeys } from '../i18n/zh-TW'

interface TrendsDashboardProps {
  entries: Entry[]
  onTagClick: (tag: string) => void
  t: (key: TranslationKeys) => string
}

export default function TrendsDashboard({ entries, onTagClick, t }: TrendsDashboardProps) {
  // Top 20 tags by frequency
  const topTags = useMemo(() => {
    const tagCount: Record<string, number> = {}
    entries.forEach((e) => {
      e.tags.forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      })
    })
    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([tag, count]) => ({ tag, count }))
  }, [entries])

  const maxTagCount = topTags[0]?.count ?? 1

  // Daily item counts for last 14 days
  const dailyCounts = useMemo(() => {
    const now = new Date()
    const days: { date: string; count: number; label: string }[] = []
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      const count = entries.filter((e) => e.date === dateStr).length
      const label = `${d.getMonth() + 1}/${d.getDate()}`
      days.push({ date: dateStr, count, label })
    }
    return days
  }, [entries])

  const maxDailyCount = Math.max(...dailyCounts.map((d) => d.count), 1)

  // Hot tags ranking — top 10, with "new" indicator
  const hotTags = useMemo(() => {
    // Check which tags only appear in the last 3 days
    const now = new Date()
    const threeDaysAgo = new Date(now)
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
    const recentEntries = entries.filter((e) => new Date(e.date) >= threeDaysAgo)
    const olderEntries = entries.filter((e) => new Date(e.date) < threeDaysAgo)

    const recentTags = new Set<string>()
    recentEntries.forEach((e) => e.tags.forEach((t) => recentTags.add(t)))

    const olderTags = new Set<string>()
    olderEntries.forEach((e) => e.tags.forEach((t) => olderTags.add(t)))

    const tagCount: Record<string, number> = {}
    entries.forEach((e) => {
      e.tags.forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      })
    })

    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag, count]) => ({
        tag,
        count,
        isNew: recentTags.has(tag) && !olderTags.has(tag),
      }))
  }, [entries])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-5xl mx-auto px-6 pb-16"
    >
      {/* Title */}
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-center mb-12"
        style={{ color: 'var(--text-primary)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {t('trendsTitle')}
      </motion.h2>

      {/* Keyword Frequency Chart */}
      <motion.section
        className="rounded-xl p-6 md:p-8 mb-8"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-card)',
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <h3
          className="text-sm font-semibold uppercase tracking-wider mb-6"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('keywordFrequency')}
        </h3>
        <div className="space-y-2.5">
          {topTags.map((item, i) => (
            <motion.div
              key={item.tag}
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => onTagClick(item.tag)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.03, duration: 0.4 }}
            >
              <span
                className="text-xs font-mono w-28 sm:w-36 truncate shrink-0 text-right
                           transition-colors duration-150 group-hover:underline"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.tag}
              </span>
              <div className="flex-1 h-6 rounded-md overflow-hidden relative"
                style={{ background: 'var(--bg-secondary)' }}
              >
                <motion.div
                  className="h-full rounded-md"
                  style={{
                    background: `linear-gradient(90deg, var(--accent), var(--accent-hover))`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.count / maxTagCount) * 100}%` }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + i * 0.03,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
              <span
                className="text-xs font-mono w-8 text-right shrink-0"
                style={{ color: 'var(--text-muted)' }}
              >
                {item.count}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Weekly Item Count */}
      <motion.section
        className="rounded-xl p-6 md:p-8 mb-8"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-card)',
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <h3
          className="text-sm font-semibold uppercase tracking-wider mb-6"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('weeklyItemCount')}
        </h3>
        {/* SVG chart */}
        <div className="w-full overflow-x-auto">
          <svg viewBox="0 0 700 200" className="w-full min-w-[400px]" preserveAspectRatio="xMidYMid meet">
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
              <line
                key={ratio}
                x1="50"
                y1={20 + (1 - ratio) * 150}
                x2="680"
                y2={20 + (1 - ratio) * 150}
                stroke="var(--border)"
                strokeWidth="0.5"
              />
            ))}
            {/* Y-axis labels */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
              <text
                key={ratio}
                x="45"
                y={24 + (1 - ratio) * 150}
                textAnchor="end"
                fill="var(--text-muted)"
                fontSize="10"
                fontFamily="var(--font-mono)"
              >
                {Math.round(maxDailyCount * ratio)}
              </text>
            ))}
            {/* Bars */}
            {dailyCounts.map((day, i) => {
              const barHeight = maxDailyCount > 0 ? (day.count / maxDailyCount) * 150 : 0
              const x = 55 + i * 45
              return (
                <g key={day.date}>
                  <motion.rect
                    x={x}
                    y={170 - barHeight}
                    width="30"
                    height={barHeight}
                    rx="4"
                    fill="var(--accent)"
                    opacity={day.count > 0 ? 0.85 : 0.15}
                    initial={{ height: 0, y: 170 }}
                    animate={{ height: barHeight, y: 170 - barHeight }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + i * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                  {/* Count label above bar */}
                  {day.count > 0 && (
                    <motion.text
                      x={x + 15}
                      y={170 - barHeight - 6}
                      textAnchor="middle"
                      fill="var(--text-secondary)"
                      fontSize="10"
                      fontFamily="var(--font-mono)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + i * 0.04 }}
                    >
                      {day.count}
                    </motion.text>
                  )}
                  {/* X-axis label */}
                  <text
                    x={x + 15}
                    y={188}
                    textAnchor="middle"
                    fill="var(--text-muted)"
                    fontSize="9"
                    fontFamily="var(--font-mono)"
                  >
                    {day.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </motion.section>

      {/* Hot Tags Ranking */}
      <motion.section
        className="rounded-xl p-6 md:p-8"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-card)',
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <h3
          className="text-sm font-semibold uppercase tracking-wider mb-6"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('hotTagsRanking')}
        </h3>
        <div className="space-y-1">
          {/* Header */}
          <div
            className="flex items-center gap-3 px-3 py-2 text-xs font-semibold uppercase tracking-wider"
            style={{ color: 'var(--text-muted)' }}
          >
            <span className="w-8 text-center">{t('rank')}</span>
            <span className="flex-1">{t('tag')}</span>
            <span className="w-16 text-right">{t('count')}</span>
          </div>
          {hotTags.map((item, i) => (
            <motion.div
              key={item.tag}
              className="flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer
                         transition-colors duration-150"
              onClick={() => onTagClick(item.tag)}
              style={{ color: 'var(--text-primary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-card-hover)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
            >
              <span
                className="w-8 text-center font-bold text-base"
                style={{
                  color:
                    i === 0
                      ? '#FFD700'
                      : i === 1
                        ? '#C0C0C0'
                        : i === 2
                          ? '#CD7F32'
                          : 'var(--text-muted)',
                }}
              >
                {i + 1}
              </span>
              <span className="flex-1 font-mono text-sm font-medium flex items-center gap-2">
                {item.tag}
                {item.isNew && (
                  <span className="text-xs">🆕</span>
                )}
              </span>
              <span
                className="w-16 text-right font-mono text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.count}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  )
}
