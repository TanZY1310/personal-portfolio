'use client'

import { motion } from 'motion/react'
import type { Easing, Variants } from 'motion/react'
import SectionHead from './SectionHead'
import { experience, sections } from '@/content'

const easeOut: Easing = [0.22, 1, 0.36, 1]

const listContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
}

const listItem: Variants = {
  hidden: { opacity: 0, x: -22 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-[clamp(4rem,10vw,7.5rem)]">
      <div className="page-container relative">
        <SectionHead kicker={sections.experience.kicker} title={sections.experience.title} />

        <motion.div
          className="relative ml-[0.35rem] pl-[2.2rem]"
          variants={listContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="absolute left-0 top-[6px] bottom-[6px] w-[2px] rounded bg-[linear-gradient(180deg,var(--frost),var(--pink))]" />

          {experience.map((item) => (
            <motion.div
              className="relative pb-[2.6rem] last:pb-0"
              key={item.role}
              variants={listItem}
              whileHover={{ x: 4 }}
            >
              <motion.span
                className="absolute -left-[2.2rem] top-[6px] h-3 w-3 rounded-full border-2 -translate-x-[5px] bg-bg"
                style={{ borderColor: item.color, color: item.color }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                <span className="absolute -inset-[5px] rounded-full border border-current opacity-40" />
              </motion.span>

              <p className="font-mono text-[0.78rem] font-medium tracking-[0.04em] text-accent-2 mb-[0.25rem]">
                {item.period}
              </p>
              <h3 className="text-[1.2rem] font-bold tracking-[-0.01em] text-fg-bright">{item.role}</h3>
              <p className="font-mono text-[0.84rem] text-fg mt-[0.2rem] mb-[0.7rem]">{item.company}</p>
              {item.bullets && (
                <ul className="text-muted text-[0.92rem] max-w-[60ch]">
                  {item.bullets.map((b) => (
                    <li key={b} className="relative pl-[1.25rem] mb-[0.45rem]">
                      <span className="absolute left-0 top-[0.62em] h-[2px] w-2 rounded bg-accent-2 opacity-70" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}