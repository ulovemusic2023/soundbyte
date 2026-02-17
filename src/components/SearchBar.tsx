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
      className="max-w-2xl mx-auto px-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative search-glow rounded-2xl">
        {/* Search icon */}
        <div className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-accent-cyan)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-60"
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
          className="w-full bg-bg-secondary/80 backdrop-blur-xl border border-border-subtle rounded-2xl
                     pl-12 md:pl-14 pr-4 py-4 md:py-5
                     text-sm md:text-base text-text-primary placeholder:text-text-tertiary
                     font-sans outline-none
                     focus:border-accent-cyan/40 transition-colors duration-300"
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
            <span className="font-mono text-xs text-accent-cyan bg-accent-cyan-dim px-2.5 py-1 rounded-full">
              {resultCount} / {totalCount}
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
