import { AnimatePresence, motion } from 'framer-motion'
import type { Entry } from '../types'
import EntryCard from './EntryCard'

interface ResultsGridProps {
  entries: Entry[]
}

export default function ResultsGrid({ entries }: ResultsGridProps) {
  if (entries.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20 px-4"
      >
        <div className="text-4xl mb-4">🔍</div>
        <p className="font-mono text-text-secondary text-sm">No insights found</p>
        <p className="text-text-tertiary text-xs mt-1">Try adjusting your search or filters</p>
      </motion.div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 mb-16">
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {entries.map((entry, i) => (
            <EntryCard key={entry.id} entry={entry} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
