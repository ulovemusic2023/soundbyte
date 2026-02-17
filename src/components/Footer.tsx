import { motion } from 'framer-motion'
import type { TranslationKeys } from '../i18n/zh-TW'

interface FooterProps {
  t: (key: TranslationKeys) => string
}

export default function Footer({ t }: FooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-8 px-6"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-4xl mx-auto text-center space-y-2">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {t('builtBy')}{' '}
          <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>
            uLove Music
          </span>
          {' '}·{' '}
          {t('poweredBy')}
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {t('dataRefreshed')}
        </p>
      </div>
    </motion.footer>
  )
}
