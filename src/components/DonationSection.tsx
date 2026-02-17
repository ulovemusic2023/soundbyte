import { motion } from 'framer-motion'
import type { TranslationKeys } from '../i18n/zh-TW'

interface DonationSectionProps {
  t: (key: TranslationKeys) => string
}

export default function DonationSection({ t }: DonationSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto px-6 py-16 sm:py-20 lg:py-24"
    >
      <div
        className="text-center rounded-xl p-8 md:p-10"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <h2
          className="text-xl md:text-2xl font-bold mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('supportTitle')}
        </h2>
        <p
          className="text-base mb-8 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('supportDesc')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#kofi"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl
                       text-sm font-semibold text-white
                       transition-colors duration-200 shadow-sm"
            style={{ background: 'var(--accent)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent-hover)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--accent)'
            }}
          >
            {t('kofi')}
          </a>
          <a
            href="#ecpay"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl
                       text-sm font-semibold
                       transition-colors duration-200"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-hover)',
              color: 'var(--text-primary)',
            }}
          >
            {t('ecpay')}
          </a>
        </div>
      </div>
    </motion.section>
  )
}
