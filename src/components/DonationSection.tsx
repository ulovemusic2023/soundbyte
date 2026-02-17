import { motion } from 'framer-motion'

export default function DonationSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto px-6 py-16"
    >
      <div className="text-center bg-white border border-border-subtle rounded-2xl p-8 md:p-10"
        style={{
          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
        }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-3">
          ☕ Support SoundByte
        </h2>
        <p className="text-base text-text-secondary mb-8 leading-relaxed">
          SoundByte is free. Your support keeps the radar running.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#kofi"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl
                       bg-accent-cyan text-white
                       text-sm font-semibold
                       hover:bg-accent-blue
                       transition-colors duration-200
                       shadow-sm"
          >
            🌏 Ko-fi (International)
          </a>
          <a
            href="#ecpay"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl
                       bg-white border border-border-medium
                       text-sm font-semibold text-text-primary
                       hover:bg-bg-secondary hover:border-border-medium
                       transition-colors duration-200"
          >
            🇹🇼 綠界 ECPay (台灣)
          </a>
        </div>
      </div>
    </motion.section>
  )
}
