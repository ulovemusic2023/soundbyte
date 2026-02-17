import { motion } from 'framer-motion'
import type { Entry } from '../types'
import type { TranslationKeys } from '../i18n/zh-TW'

interface StatsFooterProps {
  entries: Entry[]
  t: (key: TranslationKeys) => string
}

export default function StatsFooter({ entries, t }: StatsFooterProps) {
  const tagCount: Record<string, number> = {}
  entries.forEach((e) => {
    e.tags.forEach((t) => {
      tagCount[t] = (tagCount[t] || 0) + 1
    })
  })

  const sortedTags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)

  const radarCount = {
    'music-tech': entries.filter((e) => e.radar === 'music-tech').length,
    'ai-infra': entries.filter((e) => e.radar === 'ai-infra').length,
    'software-dev': entries.filter((e) => e.radar === 'software-dev').length,
  }

  const total = entries.length || 1
  const radarItems = [
    { label: t('musicTech'), count: radarCount['music-tech'], color: 'var(--radar-music)' },
    { label: t('aiInfra'), count: radarCount['ai-infra'], color: 'var(--radar-ai)' },
    { label: t('softwareDev'), count: radarCount['software-dev'], color: 'var(--radar-dev)' },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-6 py-16 sm:py-20 lg:py-24"
    >
      <div className="card-hover rounded-xl p-8 md:p-10">
        <h2
          className="text-xl md:text-2xl font-bold mb-8 text-center gradient-text"
        >
          {t('insightLandscape')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Tag cloud */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--text-muted)' }}
            >
              {t('topTags')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {sortedTags.map(([tag, count], i) => {
                const maxCount = sortedTags[0][1]
                const opacity = 0.5 + (count / maxCount) * 0.5
                return (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03, duration: 0.3 }}
                    className="tag-chip !cursor-default"
                    style={{ opacity }}
                  >
                    {tag}
                    <span className="ml-1.5" style={{ color: 'var(--text-muted)' }}>
                      {count}
                    </span>
                  </motion.span>
                )
              })}
            </div>
          </div>

          {/* Radar distribution bars */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--text-muted)' }}
            >
              {t('radarDistribution')}
            </h3>
            <div className="space-y-4">
              {radarItems.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span
                      className="font-medium"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {item.label}
                    </span>
                    <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{item.count}</span>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ background: 'var(--bg-elevated)' }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: item.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.count / total) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        delay: 0.2,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
