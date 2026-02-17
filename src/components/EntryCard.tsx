import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Entry } from '../types'
import type { TranslationKeys } from '../i18n/zh-TW'
import type { Collection } from '../hooks/useCollections'
import ShareButton from './ShareButton'

interface EntryCardProps {
  entry: Entry
  onTagClick: (tag: string) => void
  t: (key: TranslationKeys) => string
  collections: Collection[]
  onAddToCollection: (collectionId: string, entryId: string) => void
}

const priorityConfig = {
  'paradigm-shift': {
    label: 'PARADIGM SHIFT',
    dotClass: 'priority-dot-paradigm',
    cardClass: 'card-priority-paradigm',
  },
  high: {
    label: 'HIGH',
    dotClass: 'priority-dot-high',
    cardClass: 'card-priority-high',
  },
  medium: {
    label: 'MEDIUM',
    dotClass: 'priority-dot-medium',
    cardClass: 'card-priority-medium',
  },
  low: {
    label: 'LOW',
    dotClass: 'priority-dot-low',
    cardClass: 'card-priority-low',
  },
}

const radarLabel: Record<string, string> = {
  'software-dev': 'DEV',
  'ai-infra': 'AI',
  'music-tech': 'MUSIC',
}

export default function EntryCard({ entry, onTagClick, t, collections, onAddToCollection }: EntryCardProps) {
  const [expanded, setExpanded] = useState(false)
  const priority = priorityConfig[entry.priority]

  return (
    <article
      onClick={() => setExpanded(!expanded)}
      className={`card-hover ${priority.cardClass} rounded-xl p-7 sm:p-9 cursor-pointer group`}
    >
      {/* Top row: priority + radar + date */}
      <div className="flex items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-2.5">
          {/* Priority badge */}
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest"
            style={{ color: 'var(--text-muted)' }}
          >
            <span className={`priority-dot ${priority.dotClass}`} />
            {priority.label}
          </span>
          {/* Radar label */}
          <span
            className="text-[10px] font-mono font-medium uppercase tracking-wider px-2 py-0.5 rounded"
            style={{
              color: 'var(--text-muted)',
              background: 'var(--bg-elevated)',
            }}
          >
            {radarLabel[entry.radar]}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Add to collection */}
          {collections.length > 0 && (
            <AddToCollectionButton
              entry={entry}
              collections={collections}
              onAddToCollection={onAddToCollection}
              t={t}
            />
          )}
          {/* Share */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <ShareButton entry={entry} t={t} />
          </div>
          {/* Date */}
          <span
            className="text-[11px] font-mono shrink-0"
            style={{ color: 'var(--text-muted)' }}
          >
            {entry.date}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3
        className="text-[15px] sm:text-base font-semibold mb-3 leading-normal transition-colors duration-200
                    group-hover:!text-[var(--accent)]"
        style={{ color: 'var(--text-primary)' }}
      >
        {entry.title}
      </h3>

      {/* Summary */}
      <p
        className={`text-[13px] leading-[1.7] mb-5 ${expanded ? '' : 'line-clamp-2'}`}
        style={{ color: 'var(--text-secondary)' }}
      >
        {entry.summary}
      </p>

      {/* Expanded details */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="expanded-content"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{
              opacity: 1,
              height: 'auto',
              marginTop: 12,
              transition: {
                height: { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 },
                opacity: { duration: 0.25, delay: 0.1 },
                marginTop: { duration: 0.2 }
              }
            }}
            exit={{
              opacity: 0,
              height: 0,
              marginTop: 0,
              transition: {
                height: { type: 'spring', stiffness: 400, damping: 35 },
                opacity: { duration: 0.15 },
                marginTop: { duration: 0.15 }
              }
            }}
            className="overflow-hidden"
          >
            <div
              className="pt-4 pb-2 space-y-3"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              {/* Meta info */}
              <div
                className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-mono"
                style={{ color: 'var(--text-muted)' }}
              >
                {entry.price && <span>💰 {entry.price}</span>}
                {entry.vram && <span>🖥️ {entry.vram}</span>}
                {entry.license && <span>📜 {entry.license}</span>}
                <span>⏰ {entry.cycle}</span>
              </div>
              {/* Links */}
              <div className="flex flex-wrap gap-2">
                {entry.url && (
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-[12px] font-medium py-1 px-2.5 rounded-md
                               transition-all duration-200 hover:underline"
                    style={{ color: 'var(--accent)', background: 'var(--accent-subtle)' }}
                  >
                    Official →
                  </a>
                )}
                {entry.sourceUrl && (
                  <a
                    href={entry.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-[12px] font-medium py-1 px-2.5 rounded-md
                               transition-all duration-200 hover:underline"
                    style={{ color: 'var(--text-secondary)', background: 'var(--bg-hover)' }}
                  >
                    {entry.source || 'Source'} →
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {entry.tags.map((tag) => (
          <button
            key={tag}
            onClick={(e) => {
              e.stopPropagation()
              onTagClick(tag)
            }}
            className="tag-chip"
          >
            {tag}
          </button>
        ))}
      </div>
    </article>
  )
}

/* Add to collection dropdown button */
function AddToCollectionButton({
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
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }
  }, [open])

  if (collections.length === 0) return null

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation()
          if (collections.length === 1) {
            onAddToCollection(collections[0].id, entry.id)
            return
          }
          setOpen(!open)
        }}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
                   p-1.5 rounded-lg text-sm cursor-pointer"
        style={{
          color: 'var(--text-muted)',
          background: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--tag-bg-hover)'
          e.currentTarget.style.color = 'var(--accent)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = 'var(--text-muted)'
        }}
        title={t('addToCollection')}
      >
        +
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 bottom-full mb-2 z-50 rounded-xl overflow-hidden min-w-[160px]"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-hover)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div className="py-1 px-1">
              <div
                className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                {t('addToCollection')}
              </div>
              {collections.map((col) => {
                const alreadyIn = col.entryIds.includes(entry.id)
                return (
                  <button
                    key={col.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!alreadyIn) {
                        onAddToCollection(col.id, entry.id)
                      }
                      setOpen(false)
                    }}
                    className="w-full text-left px-3 py-2 text-sm rounded-lg
                               transition-colors duration-100 cursor-pointer flex items-center gap-2"
                    style={{
                      color: alreadyIn ? 'var(--text-muted)' : 'var(--text-primary)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--bg-hover)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                    }}
                    disabled={alreadyIn}
                  >
                    <span className="truncate">{col.name}</span>
                    {alreadyIn && <span className="text-xs ml-auto" style={{ color: 'var(--accent)' }}>✓</span>}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
