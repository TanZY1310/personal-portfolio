'use client'

import { motion } from 'motion/react'

export default function Footer() {
  return (
    <motion.footer
      className="border-t px-12 py-6 flex flex-col md:flex-row justify-between
        items-center gap-2 text-center"
      style={{ borderColor: 'var(--border)' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span
        className="text-[0.65rem] tracking-widest"
        style={{ color: 'var(--muted)' }}
      >
        © 2026 Tan Ze Yan — All rights reserved
      </span>
      <span
        className="text-[0.65rem] tracking-widest"
        style={{ color: 'var(--muted)' }}
      >
        Built with{' '}
        <span style={{ color: 'var(--accent)' }}>Next.js</span>
        {' '}+ Tailwind + Framer Motion
      </span>
    </motion.footer>
  )
}
