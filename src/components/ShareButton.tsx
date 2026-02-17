import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Share2 } from 'lucide-react'
import type { Entry } from '../types'
import type { TranslationKeys } from '../i18n/zh-TW'

const SOUNDBYTE_URL = 'https://ulovemusic2023.github.io/soundbyte/'

interface ShareButtonProps {
  entry: Entry
  t: (key: TranslationKeys) => string
}

function getFirstSentence(text: string): string {
  const match = text.match(/^[^。！？.!?]+[。！？.!?]?/)
  return match ? match[0] : text.slice(0, 100)
}

export default function ShareButton({ entry, t }: ShareButtonProps) {
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState('')
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

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(''), 2500)
    return () => clearTimeout(timer)
  }, [toast])

  const showToast = (msg: string) => {
    setToast(msg)
    setOpen(false)
  }

  const shareToX = () => {
    const firstSentence = getFirstSentence(entry.summary)
    const text = `${entry.title}\n\n${firstSentence}\n\nSource: ${SOUNDBYTE_URL}\n\n#SoundByte #TechIntel`
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      '_blank'
    )
    setOpen(false)
  }

  const shareToThreads = () => {
    const summaryTruncated =
      entry.summary.length > 400 ? entry.summary.slice(0, 397) + '...' : entry.summary
    const text = `${entry.title}\n\n${summaryTruncated}\n\nSource: ${SOUNDBYTE_URL}\n\n#SoundByte #TechIntel`
    navigator.clipboard.writeText(text).then(() => {
      showToast(t('copiedForThreads'))
    })
  }

  const shareToFacebook = () => {
    const url = entry.url || SOUNDBYTE_URL
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank'
    )
    setOpen(false)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(SOUNDBYTE_URL).then(() => {
      showToast(t('copiedToClipboard'))
    })
  }

  const menuItems = [
    { label: t('shareToX'), icon: '𝕏', action: shareToX },
    { label: t('shareToThreads'), icon: '🧵', action: shareToThreads },
    { label: t('shareToFacebook'), icon: '📘', action: shareToFacebook },
    { label: t('copyLink'), icon: '🔗', action: copyLink },
  ]

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation()
          setOpen(!open)
        }}
        className="p-1.5 rounded-lg cursor-pointer transition-all duration-200"
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
        aria-label={t('share')}
      >
        <Share2 size={14} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 bottom-full mb-2 z-50 rounded-xl overflow-hidden min-w-[180px]"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-hover)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={(e) => {
                  e.stopPropagation()
                  item.action()
                }}
                className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5
                           transition-colors duration-100 cursor-pointer"
                style={{ color: 'var(--text-primary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bg-hover)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-xl text-sm font-medium"
            style={{
              background: 'var(--accent)',
              color: '#fff',
              boxShadow: 'var(--shadow-glow), 0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
