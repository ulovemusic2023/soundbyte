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
    .slice(0, 12)

  const radarCount = {
    'music-tech': entries.filter((e) => e.radar === 'music-tech').length,
    'ai-infra': entries.filter((e) => e.radar === 'ai-infra').length,
    'software-dev': entries.filter((e) => e.radar === 'software-dev').length,
    'founder-mind': entries.filter((e) => e.radar === 'founder-mind').length,
  }

  const total = entries.length || 1
  const radarItems = [
    { label: t('musicTech'), count: radarCount['music-tech'], color: 'var(--radar-music)' },
    { label: t('aiInfra'), count: radarCount['ai-infra'], color: 'var(--radar-ai)' },
    { label: t('softwareDev'), count: radarCount['software-dev'], color: 'var(--radar-dev)' },
    { label: t('founderMind'), count: radarCount['founder-mind'], color: 'var(--radar-founder)' },
  ]

  return (
    <section
      className="mt-8"
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Radar distribution - compact inline bars */}
          <div>
            <h3
              className="text-[11px] font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--text-muted)' }}
            >
              {t('radarDistribution')}
            </h3>
            <div className="space-y-3">
              {radarItems.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1">
                    <span
                      className="text-[13px] font-medium"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="text-[11px] font-mono"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {item.count}
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
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

          {/* Top tags - compact cloud */}
          <div className="md:col-span-2">
            <h3
              className="text-[11px] font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--text-muted)' }}
            >
              {t('topTags')}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {sortedTags.map(([tag, count]) => {
                const maxCount = sortedTags[0][1]
                const opacity = 0.5 + (count / maxCount) * 0.5
                return (
                  <span
                    key={tag}
                    className="tag-chip !cursor-default"
                    style={{ opacity }}
                  >
                    {tag}
                    <span className="ml-1" style={{ color: 'var(--text-muted)' }}>
                      {count}
                    </span>
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
