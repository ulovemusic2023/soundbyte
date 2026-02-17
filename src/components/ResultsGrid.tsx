import { AnimatePresence, motion } from 'framer-motion'
import type { Entry } from '../types'
import type { TranslationKeys } from '../i18n/zh-TW'
import type { Collection } from '../hooks/useCollections'
import EntryCard from './EntryCard'

interface ResultsGridProps {
  entries: Entry[]
  onTagClick: (tag: string) => void
  t: (key: TranslationKeys) => string
  collections: Collection[]
  onAddToCollection: (collectionId: string, entryId: string) => void
}

export default function ResultsGrid({ entries, onTagClick, t, collections, onAddToCollection }: ResultsGridProps) {
  if (entries.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-24 px-6"
      >
        <div className="text-5xl mb-5">🔍</div>
        <p
          className="text-base font-medium"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('noResults')}
        </p>
        <p
          className="text-sm mt-2"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('noResultsHint')}
        </p>
      </motion.div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 mb-16">
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
      >
        <AnimatePresence mode="popLayout">
          {entries.map((entry, i) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              index={i}
              onTagClick={onTagClick}
              t={t}
              collections={collections}
              onAddToCollection={onAddToCollection}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
