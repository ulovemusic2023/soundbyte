import type { TranslationKeys } from '../i18n/zh-TW'

interface FooterProps {
  t: (key: TranslationKeys) => string
}

export default function Footer({ t }: FooterProps) {
  return (
    <footer
      className="py-6 px-4"
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="max-w-5xl mx-auto text-center space-y-1">
        <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
          {t('builtBy')}{' '}
          <span
            className="font-medium transition-colors duration-200 cursor-pointer"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
          >
            uLove Music
          </span>
        </p>
        <p className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
          {t('dataRefreshed')}
        </p>
      </div>
    </footer>
  )
}
