import { motion } from 'framer-motion'

export default function DonationSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto px-4 mb-16"
    >
      <div className="text-center bg-bg-secondary/30 border border-border-subtle rounded-2xl p-6 md:p-8
                      backdrop-blur-sm">
        <h2 className="font-mono text-lg md:text-xl font-bold text-text-primary mb-2">
          ☕ Support SoundByte
        </h2>
        <p className="text-sm text-text-secondary mb-6">
          SoundByte is free. Your support keeps the radar running.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#kofi"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                       bg-bg-tertiary border border-border-subtle
                       text-sm font-medium text-text-primary
                       hover:border-accent-cyan/30 hover:bg-bg-card-hover
                       transition-all duration-200"
          >
            🌏 Ko-fi (International)
          </a>
          <a
            href="#ecpay"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                       bg-bg-tertiary border border-border-subtle
                       text-sm font-medium text-text-primary
                       hover:border-accent-cyan/30 hover:bg-bg-card-hover
                       transition-all duration-200"
          >
            🇹🇼 綠界 ECPay (台灣)
          </a>
        </div>
      </div>
    </motion.section>
  )
}
