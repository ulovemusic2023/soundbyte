import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'

interface TagSuggestion {
  tag: string
  count: number
}

interface SearchBarProps {
  query: string
  onQueryChange: (query: string) => void
  resultCount: number
  totalCount: number
  allTags: TagSuggestion[]
  onTagClick: (tag: string) => void
}

export default function SearchBar({
  query,
  onQueryChange,
  resultCount,
  totalCount,
  allTags,
  onTagClick,
}: SearchBarProps) {
  const [focused, setFocused] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const isFiltered = query.length > 0

  // Compute suggestions based on current query
  const suggestions = query.trim().length > 0
    ? allTags
        .filter((t) => t.tag.toLowerCase().includes(query.toLowerCase().trim()))
        .slice(0, 8)
    : []

  const showDropdown = focused && suggestions.length > 0

  // Reset highlight when suggestions change
  useEffect(() => {
    setHighlightIndex(-1)
  }, [query])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const selectSuggestion = useCallback(
    (tag: string) => {
      onTagClick(tag)
      setFocused(false)
      inputRef.current?.blur()
    },
    [onTagClick]
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIndex((prev) => Math.min(prev + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && highlightIndex >= 0) {
      e.preventDefault()
      selectSuggestion(suggestions[highlightIndex].tag)
    } else if (e.key === 'Escape') {
      setFocused(false)
      inputRef.current?.blur()
    }
  }

  return (
    <motion.div
      className="max-w-2xl mx-auto px-6 mb-10 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative">
        {/* Search icon */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search insights... (e.g. 'multi-agent', 'plugin', 'Rust')"
          className="w-full h-12 rounded-xl pl-12 pr-24 text-base font-sans outline-none
                     transition-all duration-200"
          style={{
            background: 'var(--bg-secondary)',
            border: `1px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
            color: 'var(--text-primary)',
            boxShadow: focused ? '0 0 0 3px rgba(59,130,246,0.15)' : 'none',
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
            <span
              className="text-xs font-mono font-medium px-3 py-1.5 rounded-full"
              style={{
                color: 'var(--accent)',
                background: 'var(--tag-bg)',
              }}
            >
              {resultCount} / {totalCount}
            </span>
          </motion.div>
        )}
      </div>

      {/* Autocomplete dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-6 right-6 mt-2 rounded-xl overflow-hidden z-50"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-hover)',
              boxShadow: 'var(--shadow-card-hover)',
            }}
          >
            <div className="py-1.5">
              {suggestions.map((s, i) => (
                <button
                  key={s.tag}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    selectSuggestion(s.tag)
                  }}
                  onMouseEnter={() => setHighlightIndex(i)}
                  className="w-full text-left px-4 py-2.5 flex items-center justify-between
                             transition-colors duration-100 cursor-pointer"
                  style={{
                    background:
                      i === highlightIndex ? 'var(--bg-card-hover)' : 'transparent',
                    color: 'var(--text-primary)',
                  }}
                >
                  <span className="font-mono text-sm">{s.tag}</span>
                  <span
                    className="text-xs font-mono"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {s.count}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
