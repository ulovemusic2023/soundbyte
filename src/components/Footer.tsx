import { motion } from 'framer-motion'

export default function Footer() {
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
          Built by{' '}
          <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>
            uLove Music
          </span>
          {' '}·{' '}
          Powered by AI
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Data refreshed 6× daily from 30+ sources
        </p>
      </div>
    </motion.footer>
  )
}
