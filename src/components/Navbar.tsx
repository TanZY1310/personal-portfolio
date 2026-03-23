'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '@/lib/ThemeContext'

import { motion, useScroll, useTransform, useMotionTemplate } from 'motion/react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [activeSection, setActiveSection] = useState('about')

  const { scrollY } = useScroll()
  const navOpacity = useTransform(scrollY, [0, 100], [0.5, 0.95])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      let current = ''
      sections.forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 200) {
          current = s.id
        }
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-100 flex border-b backdrop-blur-xl"
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.25rem 3rem',
        background: 'var(--nav-bg)',
        borderColor: 'var(--border)',
        backdropFilter: 'blur(20px)',
        backgroundColor: useMotionTemplate`rgba(10, 10, 15, ${navOpacity})`,
      }}
    >
      {/* Logo */}
      <a
        href="#"
        className="font-sans font-extrabold text-lg tracking-tight"
        style={{ color: 'var(--text)' }}
      >
        ZY<span style={{ color: 'var(--accent)' }}>.</span>DEV
      </a>

      {/* Links */}
      <ul className="flex items-center list-none" style={{ gap: '2.5rem' }}>
        {navLinks.map((link) => {
          const isActive = activeSection === link.href.replace('#', '')
          return (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[0.7rem] tracking-[0.12em] uppercase transition-colors duration-200 relative"
                style={{ color: isActive ? 'var(--accent)' : 'var(--muted)' }}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{ background: 'var(--accent)' }}
                  />
                )}
              </a>
            </li>
          )
        })}
      </ul>

      {/* Theme Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className="text-[0.65rem] tracking-widest uppercase px-3 py-1.5 rounded-full
          border transition-all duration-200"
        style={{
          background: 'var(--card-bg)',
          borderColor: 'var(--border)',
          color: 'var(--muted)',
        }}
      >
        {theme === 'dark' ? '☀ Light' : '☾ Dark'}
      </motion.button>
    </motion.nav>
  )
}
