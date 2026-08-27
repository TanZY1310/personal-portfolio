'use client'

import { motion } from 'motion/react'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t py-8"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="page-container flex flex-wrap items-center justify-between gap-4 font-mono text-[0.72rem] text-muted">
        <span>© 2026 Tan Ze Yan — All rights reserved</span>
        <span>
          Built with <span className="text-accent-2">Next.js</span> + Tailwind + Framer Motion
        </span>
        <motion.a href="#hero" className="inline-flex items-center gap-[0.4rem] text-muted no-underline transition-colors duration-200 hover:text-accent" whileHover={{ y: -2 }}>
          Back to top ↑
        </motion.a>
      </div>
    </motion.footer>
  )
}