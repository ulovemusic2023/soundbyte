import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Entry } from '../types'
import type { Collection } from '../hooks/useCollections'
import type { TranslationKeys } from '../i18n/zh-TW'
import ShareButton from './ShareButton'

interface CollectionManagerProps {
  entries: Entry[]
  collections: Collection[]
  onCreateCollection: (name: string) => string
  onRenameCollection: (id: string, name: string) => void
  onDeleteCollection: (id: string) => void
  onRemoveFromCollection: (collectionId: string, entryId: string) => void
  onTagClick: (tag: string) => void
  t: (key: TranslationKeys) => string
}

const priorityConfig: Record<string, { label: string; dot: string }> = {
  'paradigm-shift': { label: 'Paradigm Shift', dot: '#FF375F' },
  high: { label: 'High', dot: '#FF9F0A' },
  medium: { label: 'Medium', dot: '#30D158' },
  low: { label: 'Low', dot: '#71717A' },
}

const radarEmoji: Record<string, string> = {
  'software-dev': '💻',
  'ai-infra': '🤖',
  'music-tech': '🎵',
}

export default function CollectionManager({
  entries,
  collections,
  onCreateCollection,
  onRenameCollection,
  onDeleteCollection,
  onRemoveFromCollection,
  onTagClick,
  t,
}: CollectionManagerProps) {
  const [viewingCollectionId, setViewingCollectionId] = useState<string | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  const viewingCollection = viewingCollectionId
    ? collections.find((c) => c.id === viewingCollectionId)
    : null

  const handleCreate = () => {
    if (newName.trim()) {
      onCreateCollection(newName)
      setNewName('')
      setShowCreateDialog(false)
    }
  }

  const handleRename = (id: string) => {
    if (editingName.trim()) {
      onRenameCollection(id, editingName)
      setEditingId(null)
      setEditingName('')
    }
  }

  // Viewing a specific collection
  if (viewingCollection) {
    const collectionEntries = entries.filter((e) =>
      viewingCollection.entryIds.includes(e.id)
    )

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto px-6 pb-16"
      >
        {/* Back button + collection name */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setViewingCollectionId(null)}
            className="text-sm font-medium cursor-pointer transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            {t('backToCollections')}
          </button>
        </div>

        <h2
          className="text-2xl md:text-3xl font-bold mb-8"
          style={{ color: 'var(--text-primary)' }}
        >
          📁 {viewingCollection.name}
        </h2>

        {collectionEntries.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">📭</div>
            <p className="text-base font-medium" style={{ color: 'var(--text-secondary)' }}>
              {t('emptyCollection')}
            </p>
            <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
              {t('emptyCollectionHint')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <AnimatePresence mode="popLayout">
              {collectionEntries.map((entry, i) => {
                const priority = priorityConfig[entry.priority] ?? priorityConfig.low
                return (
                  <motion.article
                    key={entry.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.04, duration: 0.35 }}
                    className="rounded-xl p-5 sm:p-6 relative group"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      boxShadow: 'var(--shadow-card)',
                    }}
                  >
                    {/* Remove button */}
                    <button
                      onClick={() => onRemoveFromCollection(viewingCollection.id, entry.id)}
                      className="absolute top-3 right-3 p-1.5 rounded-lg text-xs
                                 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      style={{
                        color: 'var(--priority-paradigm)',
                        background: 'var(--tag-bg)',
                      }}
                      title={t('removeFromCollection')}
                    >
                      ✕
                    </button>

                    {/* Top row */}
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          <span className="w-2 h-2 rounded-full" style={{ background: priority.dot }} />
                          {priority.label}
                        </span>
                        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          {radarEmoji[entry.radar]}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ShareButton entry={entry} t={t} />
                        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                          {entry.date}
                        </span>
                      </div>
                    </div>

                    <h3
                      className="text-base font-semibold mb-2 leading-snug truncate"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {entry.title}
                    </h3>

                    <p
                      className="text-sm leading-relaxed mb-4 line-clamp-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {entry.summary}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => onTagClick(tag)}
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
              })}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    )
  }

  // Collections list view
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto px-6 pb-16"
    >
      <h2
        className="text-2xl md:text-3xl font-bold text-center mb-8"
        style={{ color: 'var(--text-primary)' }}
      >
        {t('collectionsTitle')}
      </h2>

      {/* Create button */}
      <div className="flex justify-center mb-8">
        <motion.button
          onClick={() => setShowCreateDialog(true)}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer
                     transition-all duration-200"
          style={{
            background: 'var(--accent)',
            color: '#fff',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {t('createCollection')}
        </motion.button>
      </div>

      {/* Create dialog */}
      <AnimatePresence>
        {showCreateDialog && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6"
          >
            <div
              className="rounded-xl p-5 flex flex-col sm:flex-row gap-3"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
            >
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                placeholder={t('newCollectionName')}
                className="flex-1 h-10 rounded-lg px-4 text-sm outline-none"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                }}
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCreate}
                  className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
                  style={{ background: 'var(--accent)', color: '#fff' }}
                >
                  {t('create')}
                </button>
                <button
                  onClick={() => { setShowCreateDialog(false); setNewName('') }}
                  className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
                  style={{
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {t('cancel')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collections list */}
      {collections.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">📁</div>
          <p className="text-base font-medium" style={{ color: 'var(--text-secondary)' }}>
            {t('noCollections')}
          </p>
          <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
            {t('noCollectionsHint')}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {collections.map((col, i) => (
              <motion.div
                key={col.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="rounded-xl p-5 flex items-center justify-between gap-4
                           cursor-pointer transition-all duration-200"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-card)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-hover)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                }}
                onClick={() => setViewingCollectionId(col.id)}
              >
                <div className="flex-1 min-w-0">
                  {editingId === col.id ? (
                    <div
                      className="flex gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleRename(col.id)}
                        className="flex-1 h-8 rounded-lg px-3 text-sm outline-none"
                        style={{
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--accent)',
                          color: 'var(--text-primary)',
                        }}
                        autoFocus
                      />
                      <button
                        onClick={() => handleRename(col.id)}
                        className="px-3 py-1 rounded-lg text-xs font-medium cursor-pointer"
                        style={{ background: 'var(--accent)', color: '#fff' }}
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => { setEditingId(null); setEditingName('') }}
                        className="px-3 py-1 rounded-lg text-xs font-medium cursor-pointer"
                        style={{ color: 'var(--text-muted)', background: 'var(--tag-bg)' }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                        📁 {col.name}
                      </h3>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                        {col.entryIds.length} {t('itemCount')}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                {editingId !== col.id && (
                  <div
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => { setEditingId(col.id); setEditingName(col.name) }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer
                                 transition-colors"
                      style={{
                        color: 'var(--text-secondary)',
                        background: 'var(--tag-bg)',
                      }}
                    >
                      {t('rename')}
                    </button>

                    {confirmDeleteId === col.id ? (
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => {
                            onDeleteCollection(col.id)
                            setConfirmDeleteId(null)
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer"
                          style={{
                            color: '#fff',
                            background: 'var(--priority-paradigm)',
                          }}
                        >
                          {t('confirmDelete')}{t('confirmDeleteSuffix')}
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer"
                          style={{
                            color: 'var(--text-muted)',
                            background: 'var(--tag-bg)',
                          }}
                        >
                          {t('cancel')}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(col.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer
                                   transition-colors"
                        style={{
                          color: 'var(--priority-paradigm)',
                          background: 'var(--tag-bg)',
                        }}
                      >
                        {t('delete')}
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}
