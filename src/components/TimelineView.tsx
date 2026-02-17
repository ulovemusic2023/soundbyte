import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Entry } from '../types'
import type { TranslationKeys } from '../i18n/zh-TW'
import type { Collection } from '../hooks/useCollections'
import ShareButton from './ShareButton'

interface TimelineViewProps {
  entries: Entry[]
  onTagClick: (tag: string) => void
  t: (key: TranslationKeys) => string
  collections: Collection[]
  onAddToCollection: (collectionId: string, entryId: string) => void
}

const priorityConfig: Record<string, { label: string; dot: string }> = {
  'paradigm-shift': { label: 'Paradigm Shift', dot: '#FF375F' },
  high: { label: 'High', dot: '#FF9F0A' },
  medium: { label: 'Medium', dot: '#30D158' },
  low: { label: 'Low', dot: '#71717A' },
}

const radarEmoji: Record<string, string> = {
  'software-dev': '💻',
  'ai-infra': '🤖',
  'music-tech': '🎵',
}

export default function TimelineView({ entries, onTagClick, t, collections, onAddToCollection }: TimelineViewProps) {
  // Group by date
  const grouped = useMemo(() => {
    const groups: { date: string; entries: Entry[] }[] = []
    const dateMap = new Map<string, Entry[]>()
    entries.forEach((e) => {
      const existing = dateMap.get(e.date)
      if (existing) {
        existing.push(e)
      } else {
        const arr = [e]
        dateMap.set(e.date, arr)
        groups.push({ date: e.date, entries: arr })
      }
    })
    return groups
  }, [entries])

  if (entries.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-24 px-6"
      >
        <div className="text-5xl mb-5">🔍</div>
        <p className="text-base font-medium" style={{ color: 'var(--text-secondary)' }}>
          {t('noResults')}
        </p>
        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
          {t('noResultsHint')}
        </p>
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 mb-16">
      <AnimatePresence mode="popLayout">
        {grouped.map((group, gi) => (
          <motion.div
            key={group.date}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, delay: gi * 0.05 }}
            className="relative"
          >
            {/* Date header */}
            <div className="flex items-center gap-4 mb-4 mt-8 first:mt-0">
              <div
                className="w-3 h-3 rounded-full shrink-0 relative z-10"
                style={{ background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }}
              />
              <h3
                className="text-lg font-bold font-mono"
                style={{ color: 'var(--text-primary)' }}
              >
                {group.date}
              </h3>
              <span
                className="text-xs font-mono"
                style={{ color: 'var(--text-muted)' }}
              >
                {group.entries.length} {t('items')}
              </span>
            </div>

            {/* Timeline line + entries */}
            <div className="relative ml-1.5 pl-8 border-l-2" style={{ borderColor: 'var(--border)' }}>
              {group.entries.map((entry, i) => {
                const priority = priorityConfig[entry.priority] ?? priorityConfig.low
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: gi * 0.05 + i * 0.03, duration: 0.35 }}
                    className="relative mb-4 last:mb-6"
                  >
                    {/* Dot on timeline */}
                    <div
                      className="absolute -left-[calc(2rem+5px)] w-2.5 h-2.5 rounded-full
                                 top-5 z-10"
                      style={{
                        background: priority.dot,
                        border: '2px solid var(--bg-primary)',
                      }}
                    />

                    {/* Card */}
                    <div
                      className="rounded-xl p-5 transition-all duration-200"
                      style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        boxShadow: 'var(--shadow-card)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-hover)'
                        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border)'
                        e.currentTarget.style.boxShadow = 'var(--shadow-card)'
                      }}
                    >
                      {/* Top row */}
                      <div className="flex items-center justify-between mb-2 gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="inline-flex items-center gap-1.5 text-xs font-medium"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ background: priority.dot }}
                            />
                            {priority.label}
                          </span>
                          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            {radarEmoji[entry.radar]}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {/* Add to collection */}
                          {collections.length > 0 && (
                            <CollectionAddButton
                              entry={entry}
                              collections={collections}
                              onAddToCollection={onAddToCollection}
                              t={t}
                            />
                          )}
                          <ShareButton entry={entry} t={t} />
                        </div>
                      </div>

                      {/* Title */}
                      <h4
                        className="text-base font-semibold mb-2 leading-snug"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {entry.title}
                      </h4>

                      {/* Summary */}
                      <p
                        className="text-sm leading-relaxed mb-3 line-clamp-2"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {entry.summary}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => onTagClick(tag)}
                            className="px-2.5 py-1 text-xs rounded-md font-mono font-medium
                                       transition-all duration-150 cursor-pointer"
                            style={{
                              color: 'var(--text-muted)',
                              background: 'var(--tag-bg)',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'var(--tag-bg-hover)'
                              e.currentTarget.style.color = 'var(--text-secondary)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'var(--tag-bg)'
                              e.currentTarget.style.color = 'var(--text-muted)'
                            }}
                          >
                            {tag}
                          </button>
                        ))}
                        {entry.url && (
                          <a
                            href={entry.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 text-xs rounded-md font-medium
                                       transition-all duration-150"
                            style={{ color: 'var(--accent)' }}
                          >
                            Open →
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

/* Small inline component for adding to collection in timeline */
function CollectionAddButton({
  entry,
  collections,
  onAddToCollection,
  t,
}: {
  entry: Entry
  collections: Collection[]
  onAddToCollection: (collectionId: string, entryId: string) => void
  t: (key: TranslationKeys) => string
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (collections.length === 1) {
      onAddToCollection(collections[0].id, entry.id)
    }
    // For multiple collections, we use EntryCard's approach - just add to first
    // Or could show a picker. For simplicity, just add to first.
    if (collections.length > 0) {
      onAddToCollection(collections[0].id, entry.id)
    }
  }

  return (
    <button
      onClick={handleClick}
      className="p-1.5 rounded-lg transition-all duration-150 cursor-pointer text-xs"
      style={{
        color: 'var(--text-muted)',
        background: 'transparent',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--tag-bg-hover)'
        e.currentTarget.style.color = 'var(--text-secondary)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.color = 'var(--text-muted)'
      }}
      title={t('addToCollection')}
    >
      +
    </button>
  )
}
