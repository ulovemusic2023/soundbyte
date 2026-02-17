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
      <div className="donation-gradient text-center rounded-xl p-8 md:p-10">
        <h2
          className="text-xl md:text-2xl font-bold mb-3 gradient-text"
        >
          {t('supportTitle')}
        </h2>
        <p
          className="text-base mb-8 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('supportDesc')}
        </p>

        <div className="flex justify-center">
          <a
            href="https://ko-fi.com/ulovemusic2023"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent"
          >
            ☕ {t('kofi')}
          </a>
        </div>
      </div>
    </motion.section>
  )
}
