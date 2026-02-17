import { motion } from 'framer-motion'
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
        className="text-center py-20 px-6"
      >
        <div className="empty-state-icon">
          🔍
        </div>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-16 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
        {entries.map((entry) => (
          <EntryCard
            key={entry.id}
            entry={entry}
            onTagClick={onTagClick}
            t={t}
            collections={collections}
            onAddToCollection={onAddToCollection}
          />
        ))}
      </div>
    </div>
  )
}
