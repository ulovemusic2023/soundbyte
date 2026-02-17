import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Entry } from '../types'

interface EntryCardProps {
  entry: Entry
  index: number
  onTagClick: (tag: string) => void
}

const priorityConfig = {
  'paradigm-shift': {
    label: 'Paradigm Shift',
    dot: '#FF375F',
  },
  high: {
    label: 'High',
    dot: '#FF9F0A',
  },
  medium: {
    label: 'Medium',
    dot: '#30D158',
  },
  low: {
    label: 'Low',
    dot: '#71717A',
  },
}

const radarEmoji: Record<string, string> = {
  'software-dev': '💻',
  'ai-infra': '🤖',
  'music-tech': '🎵',
}

export default function EntryCard({ entry, index, onTagClick }: EntryCardProps) {
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
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={() => setExpanded(!expanded)}
      className="group rounded-xl p-5 sm:p-6 cursor-pointer
                 transition-all duration-200"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-card)',
      }}
      whileHover={{
        y: -1,
        scale: 1.005,
        transition: { duration: 0.2 },
      }}
    >
      {/* Top row: priority + radar + date */}
      <div className="flex items-center justify-between mb-3 gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Priority badge — dot + text */}
          <span className="inline-flex items-center gap-1.5 text-xs font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: priority.dot }}
            />
            {priority.label}
          </span>
          {/* Radar */}
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {radarEmoji[entry.radar]}
          </span>
        </div>
        {/* Date */}
        <span
          className="text-xs font-medium shrink-0"
          style={{ color: 'var(--text-muted)' }}
        >
          {entry.date}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-base font-semibold mb-2 leading-snug truncate transition-colors duration-200"
        style={{ color: 'var(--text-primary)' }}
      >
        {entry.title}
      </h3>

      {/* Summary */}
      <p
        className={`text-sm leading-relaxed mb-4 ${expanded ? '' : 'line-clamp-2'}`}
        style={{ color: 'var(--text-secondary)' }}
      >
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
            <div
              className="pt-3 pb-2 mt-1 space-y-3"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              {/* Meta info */}
              <div
                className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                {entry.price && <span>💰 {entry.price}</span>}
                {entry.vram && <span>🖥️ {entry.vram}</span>}
                {entry.license && <span>📜 {entry.license}</span>}
                <span>⏰ {entry.cycle}</span>
              </div>
              {/* Link */}
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-sm font-medium
                           transition-colors"
                style={{ color: 'var(--accent)' }}
              >
                Open source →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tags — clickable */}
      <div className="flex flex-wrap gap-2">
        {entry.tags.map((tag) => (
          <button
            key={tag}
            onClick={(e) => {
              e.stopPropagation()
              onTagClick(tag)
            }}
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
      </div>
    </motion.article>
  )
}
