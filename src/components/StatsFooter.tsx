import { motion } from 'framer-motion'
import type { Entry } from '../types'

interface StatsFooterProps {
  entries: Entry[]
}

export default function StatsFooter({ entries }: StatsFooterProps) {
  // Compute tag frequencies
  const tagCount: Record<string, number> = {}
  entries.forEach((e) => {
    e.tags.forEach((t) => {
      tagCount[t] = (tagCount[t] || 0) + 1
    })
  })

  const sortedTags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)

  // Radar distribution
  const radarCount = {
    'music-tech': entries.filter((e) => e.radar === 'music-tech').length,
    'ai-infra': entries.filter((e) => e.radar === 'ai-infra').length,
    'software-dev': entries.filter((e) => e.radar === 'software-dev').length,
  }

  const total = entries.length || 1
  const radarItems = [
    { label: '🎵 Music Tech', count: radarCount['music-tech'], color: 'var(--color-accent-cyan)' },
    { label: '🤖 AI Infra', count: radarCount['ai-infra'], color: 'var(--color-accent-blue)' },
    { label: '💻 Software Dev', count: radarCount['software-dev'], color: '#A855F7' },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 mb-16"
    >
      <div className="bg-bg-secondary/50 border border-border-subtle rounded-2xl p-6 md:p-8">
        <h2 className="font-mono text-lg md:text-xl font-bold text-text-primary mb-6 text-center">
          📊 Insight Landscape
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tag cloud */}
          <div>
            <h3 className="font-mono text-xs text-text-tertiary uppercase tracking-wider mb-3">
              Top Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {sortedTags.map(([tag, count], i) => {
                const maxCount = sortedTags[0][1]
                const opacity = 0.4 + (count / maxCount) * 0.6
                return (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03, duration: 0.3 }}
                    className="px-2.5 py-1 rounded-full text-xs font-mono border border-border-subtle
                               bg-bg-tertiary text-text-secondary"
                    style={{ opacity }}
                  >
                    {tag}
                    <span className="ml-1 text-text-tertiary">{count}</span>
                  </motion.span>
                )
              })}
            </div>
          </div>

          {/* Radar distribution bars */}
          <div>
            <h3 className="font-mono text-xs text-text-tertiary uppercase tracking-wider mb-3">
              Radar Distribution
            </h3>
            <div className="space-y-3">
              {radarItems.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-text-secondary">{item.label}</span>
                    <span className="font-mono text-text-tertiary">{item.count}</span>
                  </div>
                  <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: item.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.count / total) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
