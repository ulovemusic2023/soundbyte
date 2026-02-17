import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Entry } from '../types'

interface EntryCardProps {
  entry: Entry
  index: number
}

const priorityConfig = {
  'paradigm-shift': {
    label: 'Paradigm Shift',
    color: '#FF375F',
    bg: 'rgba(255, 55, 95, 0.08)',
    border: 'rgba(255, 55, 95, 0.15)',
  },
  high: {
    label: 'High',
    color: '#FF9F0A',
    bg: 'rgba(255, 159, 10, 0.08)',
    border: 'rgba(255, 159, 10, 0.15)',
  },
  medium: {
    label: 'Medium',
    color: '#30D158',
    bg: 'rgba(48, 209, 88, 0.08)',
    border: 'rgba(48, 209, 88, 0.15)',
  },
  low: {
    label: 'Low',
    color: '#86868B',
    bg: 'rgba(134, 134, 139, 0.08)',
    border: 'rgba(134, 134, 139, 0.15)',
  },
}

const radarEmoji = {
  'software-dev': '💻',
  'ai-infra': '🤖',
  'music-tech': '🎵',
}

export default function EntryCard({ entry, index }: EntryCardProps) {
  const [expanded, setExpanded] = useState(false)
  const priority = priorityConfig[entry.priority]

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{
        duration: 0.4,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={() => setExpanded(!expanded)}
      className="group bg-bg-card border border-border-subtle rounded-2xl p-6 sm:p-8
                 cursor-pointer transition-all duration-200
                 hover:border-border-medium hover:shadow-lg"
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
      }}
    >
      {/* Top row: priority badge + radar + date */}
      <div className="flex items-center justify-between mb-3 gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Priority badge */}
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium"
            style={{
              color: priority.color,
              background: priority.bg,
              border: `1px solid ${priority.border}`,
            }}
          >
            {priority.label}
          </span>
          {/* Radar */}
          <span className="text-sm text-text-tertiary">
            {radarEmoji[entry.radar]}
          </span>
        </div>
        {/* Date */}
        <span className="text-xs text-text-tertiary font-medium shrink-0">
          {entry.date}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-text-primary mb-3 leading-snug
                      group-hover:text-accent-cyan transition-colors duration-200">
        {entry.title}
      </h3>

      {/* Summary */}
      <p className={`text-base text-text-secondary leading-relaxed mb-4 ${
        expanded ? '' : 'line-clamp-2'
      }`}>
        {entry.summary}
      </p>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-3 pb-2 border-t border-border-subtle mt-1 space-y-3">
              {/* Meta info */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-text-tertiary">
                {entry.price && (
                  <span>💰 {entry.price}</span>
                )}
                {entry.vram && (
                  <span>🖥️ {entry.vram}</span>
                )}
                {entry.license && (
                  <span>📜 {entry.license}</span>
                )}
                <span>⏰ {entry.cycle}</span>
              </div>
              {/* Link */}
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-sm text-accent-cyan hover:text-accent-blue
                           transition-colors font-medium"
              >
                Open source →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs rounded-lg font-medium
                       text-text-tertiary bg-tag-bg
                       transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  )
}
