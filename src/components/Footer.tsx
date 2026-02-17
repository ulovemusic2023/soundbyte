import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-border-subtle py-8 px-4"
    >
      <div className="max-w-4xl mx-auto text-center space-y-2">
        <p className="text-xs text-text-tertiary font-mono">
          Built by{' '}
          <span className="text-text-secondary">uLove Music</span>
          {' '}•{' '}
          Powered by AI
        </p>
        <p className="text-xs text-text-tertiary">
          Data refreshed 6× daily from 30+ sources
        </p>
      </div>
    </motion.footer>
  )
}
