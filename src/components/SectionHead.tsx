'use client'

import { motion } from 'motion/react'
import type { Easing, Variants } from 'motion/react'

const easeOut: Easing = [0.22, 1, 0.36, 1]

const sectionHead: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

interface SectionHeadProps {
  kicker: string
  title: string
  rule?: boolean
  compact?: boolean
}

export default function SectionHead({ kicker, title, rule = true, compact = false }: SectionHeadProps) {
  return (
    <motion.div
      className={`flex items-center gap-4 ${compact ? 'mb-6' : 'mb-[clamp(2rem,5vw,3.5rem)]'}`}
      variants={sectionHead}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <span className="font-mono text-[0.82rem] font-medium tracking-[0.02em] text-accent-2">
        {kicker}
      </span>
      <h2 className="text-[clamp(1.7rem,3.4vw,2.4rem)] font-extrabold tracking-[-0.02em] leading-[1.1] text-fg-bright">
        {title}
      </h2>
      {rule && <span className="rule flex-1 h-px bg-[linear-gradient(90deg,var(--border),transparent)]"></span>}
    </motion.div>
  )
}