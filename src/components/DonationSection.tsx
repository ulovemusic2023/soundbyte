import type { TranslationKeys } from '../i18n/zh-TW'

interface DonationSectionProps {
  t: (key: TranslationKeys) => string
}

export default function DonationSection({ t }: DonationSectionProps) {
  return (
    <section
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p
              className="text-sm font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('supportTitle')}
            </p>
            <p
              className="text-[12px] mt-0.5"
              style={{ color: 'var(--text-muted)' }}
            >
              {t('supportDesc')}
            </p>
          </div>
          <a
            href="https://ko-fi.com/ulovemusic2023"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent !py-2 !px-5 !text-[13px] shrink-0"
          >
            ☕ {t('kofi')}
          </a>
        </div>
      </div>
    </section>
  )
}
