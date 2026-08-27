'use client'

import { motion } from 'motion/react'
import type { Easing } from 'motion/react'
import { useTypewriter } from '@/hooks/useTypewriter'
import { terminal, terminalLines } from '@/content'
import type { TypeToken } from '@/lib/typewriter'

const easeOut: Easing = [0.22, 1, 0.36, 1]

function Line({ tokens }: { tokens: TypeToken[] }) {
  return (
    <div>
      {tokens.map((tok, i) => (
        <span key={i} className={tok.c}>
          {tok.t}
        </span>
      ))}
    </div>
  )
}

export default function Terminal() {
  const frame = useTypewriter(terminalLines)

  return (
    <motion.div
      className="terminal rounded-card overflow-hidden border"
      role="img"
      aria-label={terminal.ariaLabel}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
      whileHover={{ y: -6 }}
      style={{
        background: 'color-mix(in srgb, var(--surface) 55%, transparent)',
        borderColor: 'var(--border)',
        boxShadow:
          '0 30px 60px -30px rgba(0,0,0,0.55), inset 0 1px 0 color-mix(in srgb, var(--fg-bright) 6%, transparent)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
      >
        <span className="h-[11px] w-[11px] rounded-full bg-red"></span>
        <span className="h-[11px] w-[11px] rounded-full bg-yellow"></span>
        <span className="h-[11px] w-[11px] rounded-full bg-green"></span>
        <span className="ml-2 font-mono text-[0.74rem] tracking-[0.02em] text-muted">
          {terminal.title}
        </span>
      </div>
      <div className="font-mono text-[clamp(0.78rem,1.55vw,0.9rem)] leading-[1.85] min-h-[340px] max-[900px]:min-h-0 overflow-x-auto whitespace-pre-wrap break-words px-[1.35rem] py-[1.35rem]">
        {frame.complete.map((line, i) => (
          <Line key={`complete-${i}`} tokens={line} />
        ))}
        {frame.current && <Line key="current" tokens={frame.current} />}
        <span id="cursor"></span>
      </div>
    </motion.div>
  )
}