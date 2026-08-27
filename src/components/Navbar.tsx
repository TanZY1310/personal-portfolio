'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import type { Easing } from 'motion/react'
import { useTheme } from '@/lib/ThemeContext'
import { navItems } from '@/content'

const easeOut: Easing = [0.22, 1, 0.36, 1]

export default function Navbar() {
  const [active, setActive] = useState('hero')
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll('main section[id]')
      let current = 'hero'
      sections.forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 160) current = s.id
      })
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-100 border-b"
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: easeOut }}
      aria-label="Primary"
      style={{
        background: 'color-mix(in srgb, var(--bg) 72%, transparent)',
        borderColor: 'var(--border)',
        backdropFilter: 'blur(16px) saturate(140%)',
      }}
    >
      <div className="page-container flex h-16 items-center justify-between gap-6">
        <motion.a
          href="#hero"
          className="font-mono font-semibold text-[1.05rem] tracking-[-0.02em] text-fg-bright"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          zy<span className="text-accent">.</span>dev
        </motion.a>

        <ul
          className={`flex items-center gap-[2.1rem] max-[720px]:fixed max-[720px]:top-16 max-[720px]:left-0 max-[720px]:right-0 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-0 max-[720px]:border-b max-[720px]:border-border max-[720px]:px-6 max-[720px]:pb-5 max-[720px]:pt-2 max-[720px]:transition-transform max-[720px]:duration-300 max-[720px]:[transform:translateY(-120%)] max-[720px]:[background:color-mix(in_srgb,var(--bg)_97%,transparent)] ${
            open ? 'max-[720px]:[transform:translateY(0)]' : ''
          }`}
        >
          {navItems.map((item) => {
            const isActive = active === item.href.slice(1)
            return (
              <li key={item.href} className="max-[720px]:w-full">
                <motion.a
                  href={item.href}
                  className={`relative py-[0.35rem] text-[0.82rem] font-medium tracking-[0.02em] no-underline transition-colors duration-200 max-[720px]:block max-[720px]:w-full max-[720px]:py-[0.85rem] max-[720px]:text-[0.95rem] ${
                    isActive ? 'text-fg-bright' : 'text-muted hover:text-fg'
                  }`}
                  whileHover={{ y: -1 }}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-[2px] left-0 right-0 h-[2px] rounded bg-accent"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </motion.a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-3">
          <motion.div
            className="hidden min-[721px]:flex items-center gap-2 rounded-full border border-border px-[0.85rem] py-[0.42rem] text-[0.72rem] font-medium tracking-[0.04em] text-muted"
            style={{ background: 'color-mix(in srgb, var(--surface) 40%, transparent)' }}
            whileHover={{ scale: 1.04 }}
          >
            <span className="h-[7px] w-[7px] rounded-full bg-green animate-[glowPulse_2.4s_ease-out_infinite]"></span>
            Open to work
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full border border-border px-3 py-1.5 font-mono text-[0.68rem] tracking-[0.04em] uppercase text-muted transition-colors duration-200 hover:text-fg"
            style={{ background: 'color-mix(in srgb, var(--surface) 40%, transparent)' }}
          >
            {theme === 'dark' ? '☀ Light' : '☾ Dark'}
          </motion.button>

          <motion.button
            className="hidden max-[720px]:flex h-[42px] w-[42px] cursor-pointer flex-col items-center justify-center gap-1 rounded-card-sm border border-border"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            whileTap={{ scale: 0.9 }}
          >
            <span
              className={`block h-[2px] w-[18px] rounded bg-fg transition-transform duration-300 ${
                open ? 'translate-y-[6px] rotate-45' : ''
              }`}
            ></span>
            <span className={`block h-[2px] w-[18px] rounded bg-fg transition-opacity duration-200 ${open ? 'opacity-0' : ''}`}></span>
            <span
              className={`block h-[2px] w-[18px] rounded bg-fg transition-transform duration-300 ${
                open ? '-translate-y-[6px] -rotate-45' : ''
              }`}
            ></span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}