import { motion } from 'framer-motion'

interface SearchBarProps {
  query: string
  onQueryChange: (query: string) => void
  resultCount: number
  totalCount: number
}

export default function SearchBar({ query, onQueryChange, resultCount, totalCount }: SearchBarProps) {
  const isFiltered = query.length > 0

  return (
    <motion.div
      className="max-w-2xl mx-auto px-6 mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative rounded-2xl">
        {/* Search icon */}
        <div className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#86868B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search insights... (e.g. 'multi-agent', 'plugin', 'Rust')"
          className="w-full bg-white border border-border-subtle rounded-2xl
                     pl-14 md:pl-16 pr-5 py-4 md:py-5
                     text-base text-text-primary placeholder:text-text-tertiary
                     font-sans outline-none
                     focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/20
                     transition-all duration-200"
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
          }}
          autoComplete="off"
          spellCheck={false}
        />

        {/* Result count badge */}
        {isFiltered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <span className="text-xs font-medium text-accent-cyan bg-accent-cyan-dim px-3 py-1.5 rounded-full">
              {resultCount} / {totalCount}
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
