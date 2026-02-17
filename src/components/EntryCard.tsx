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
    color: 'var(--color-priority-paradigm)',
    bg: 'rgba(239, 68, 68, 0.1)',
    border: 'rgba(239, 68, 68, 0.2)',
  },
  high: {
    label: 'High',
    color: 'var(--color-priority-high)',
    bg: 'rgba(245, 158, 11, 0.1)',
    border: 'rgba(245, 158, 11, 0.2)',
  },
  medium: {
    label: 'Medium',
    color: 'var(--color-priority-medium)',
    bg: 'rgba(34, 197, 94, 0.1)',
    border: 'rgba(34, 197, 94, 0.2)',
  },
  low: {
    label: 'Low',
    color: 'var(--color-priority-low)',
    bg: 'rgba(107, 114, 128, 0.1)',
    border: 'rgba(107, 114, 128, 0.2)',
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={() => setExpanded(!expanded)}
      className="group relative bg-bg-card border border-border-subtle rounded-xl p-4 md:p-5
                 cursor-pointer transition-all duration-300
                 hover:border-border-medium hover:bg-bg-card-hover"
      style={{
        boxShadow: '0 1px 2px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.1)',
      }}
      whileHover={{
        boxShadow: '0 2px 8px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.15), 0 0 40px rgba(6,182,212,0.03)',
      }}
    >
      {/* Top row: priority badge + radar + date */}
      <div className="flex items-center justify-between mb-2.5 gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Priority badge */}
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] md:text-xs font-mono font-medium"
            style={{
              color: priority.color,
              background: priority.bg,
              border: `1px solid ${priority.border}`,
            }}
          >
            {priority.label}
          </span>
          {/* Radar */}
          <span className="text-xs text-text-tertiary">
            {radarEmoji[entry.radar]}
          </span>
        </div>
        {/* Date */}
        <span className="text-[10px] md:text-xs text-text-tertiary font-mono shrink-0">
          {entry.date}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-mono text-sm md:text-base font-semibold text-text-primary mb-2 leading-snug
                      group-hover:text-accent-cyan transition-colors duration-200">
        {entry.title}
      </h3>

      {/* Summary */}
      <p className={`text-xs md:text-sm text-text-secondary leading-relaxed mb-3 ${
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
            <div className="pt-2 pb-1 border-t border-border-subtle mt-1 space-y-2">
              {/* Meta info */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] md:text-xs text-text-tertiary font-mono">
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
                className="inline-flex items-center gap-1 text-xs text-accent-cyan hover:text-accent-blue
                           transition-colors font-mono"
              >
                Open source →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-[10px] md:text-xs rounded-md font-mono
                       text-text-tertiary bg-bg-secondary border border-border-subtle
                       group-hover:border-border-medium transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  )
}
