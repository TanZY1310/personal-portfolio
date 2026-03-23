'use client'

import { useState } from 'react'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import type { Easing } from 'motion/react'
import { Icon } from '@iconify/react'

const contactLinks = [
  { icon: <Icon icon="material-icon-theme:email"></Icon>, label: 'Email', value: 'tanzy1310@gmail.com', href: 'mailto:tanzy1310@gmail.com' },
  { icon: <Icon icon="devicon:linkedin"></Icon>, label: 'LinkedIn', value: 'linkedin.com/in/tan-ze-yan', href: 'https://www.linkedin.com/in/tan-ze-yan-60715716b/' },
  { icon: <Icon icon="skill-icons:github-dark"></Icon>, label: 'GitHub', value: 'github.com/TanZY1310', href: 'https://github.com/TanZY1310' },
]

const topics = ['Freelance project', 'Full-time role', 'Collaboration', 'Just saying hi']

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as Easing, // Cast to Easing if needed
    },
  },
};

export default function ContactSection() {
  const [activeTopics, setActiveTopics] = useState<string[]>(['Freelance project'])
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' })

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const toggleTopic = (topic: string) => {
    setActiveTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    )
  }

  const handleSend = () => {
    setSent(true)
    setTimeout(() => setSent(false), 2500)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen grid relative"
      style={{ gridTemplateColumns: '1fr 1fr' }}
    >
      {/* ── LEFT ── */}
      <div
        className="px-12 py-24 flex flex-col justify-center relative overflow-hidden border-b md:border-b-0 md:border-r"
        style={{ borderColor: 'var(--border)' }}
      >
        {/* Big decorative background text */}
        <div
          className="font-serif absolute bottom-0 left-0 leading-none pointer-events-none select-none"
          style={{
            fontSize: 'clamp(6rem, 14vw, 12rem)',
            color: 'var(--border)',
            letterSpacing: '-0.05em',
          }}
        >
          Hi.
        </div>

        {/* Section label */}
        <motion.div
          className="section-label"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          Contact
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="font-serif leading-[1.1] mb-4"
          style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'var(--text)' }}
          custom={1}
          variants={fadeUp}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Let&apos;s build
          <br />
          something{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--accent3)' }}>great</em>
          <br />
          together.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-[0.8rem] leading-[1.8] mb-12 max-w-[36ch]"
          style={{ color: 'var(--muted)' }}
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          Have a project in mind, a question, or just want to say hello? My inbox is
          always open.
        </motion.p>

        {/* Contact links */}
        <motion.div
          className="flex flex-col"
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="flex items-center justify-between py-5 border-b no-underline
                transition-all duration-250 group"
              style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ paddingLeft: '0.75rem' }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-9 h-9 border rounded-lg flex items-center justify-center text-base
                    transition-all duration-250 shrink-0"
                  style={{
                    borderColor: 'var(--border)',
                    background: 'var(--card-bg)',
                  }}
                  whileHover={{
                    borderColor: 'var(--accent)',
                    backgroundColor: 'rgba(200,240,96,0.08)',
                  }}
                >
                  {link.icon}
                </motion.div>
                <div>
                  <div
                    className="text-[0.6rem] tracking-[0.15em] uppercase mb-0.5"
                    style={{ color: 'var(--muted)' }}
                  >
                    {link.label}
                  </div>
                  <div className="text-[0.8rem]" style={{ color: 'var(--text)' }}>
                    {link.value}
                  </div>
                </div>
              </div>
              <motion.span
                className="text-[0.9rem]"
                style={{ color: 'var(--muted)' }}
                whileHover={{ x: 4, y: -4, color: 'var(--accent)' }}
                transition={{ duration: 0.2 }}
              >
                ↗
              </motion.span>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* ── RIGHT: Form ── */}
      <motion.div
        className="px-12 py-24 flex flex-col justify-center"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="font-sans font-semibold text-[1rem] tracking-[0.2em] uppercase mb-8"
          style={{ color: 'var(--accent2)' }}
        >
          Send a message
        </div>

        <div className="grid gap-5 mb-5" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {/* First name */}
          <div className="flex flex-col gap-2">
            <label
              className="text-[0.6rem] tracking-[0.15em] uppercase"
              style={{ color: 'var(--muted)' }}
            >
              First name
            </label>
            <input
              type="text"
              placeholder="John"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="rounded-lg px-4 py-3 text-[0.8rem] font-mono outline-none
                border transition-all duration-250 w-full"
              style={{
                background: 'var(--card-bg)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--accent)'
                e.target.style.boxShadow = '0 0 0 3px rgba(200,240,96,0.06)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          {/* Last name */}
          <div className="flex flex-col gap-2">
            <label
              className="text-[0.6rem] tracking-[0.15em] uppercase"
              style={{ color: 'var(--muted)' }}
            >
              Last name
            </label>
            <input
              type="text"
              placeholder="Doe"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="rounded-lg px-4 py-3 text-[0.8rem] font-mono outline-none
                border transition-all duration-250 w-full"
              style={{
                background: 'var(--card-bg)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--accent)'
                e.target.style.boxShadow = '0 0 0 3px rgba(200,240,96,0.06)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          {/* Email */}
          <div className="col-span-2 flex flex-col gap-2">
            <label
              className="text-[0.6rem] tracking-[0.15em] uppercase"
              style={{ color: 'var(--muted)' }}
            >
              Email address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="rounded-lg px-4 py-3 text-[0.8rem] font-mono outline-none
                border transition-all duration-250 w-full"
              style={{
                background: 'var(--card-bg)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--accent)'
                e.target.style.boxShadow = '0 0 0 3px rgba(200,240,96,0.06)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          {/* Topic chips */}
          <div className="col-span-2 flex flex-col gap-3">
            <label
              className="text-[0.6rem] tracking-[0.15em] uppercase"
              style={{ color: 'var(--muted)' }}
            >
              I&apos;m interested in…
            </label>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => {
                const active = activeTopics.includes(topic)
                return (
                  <motion.button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className="text-[0.65rem] tracking-[0.08em] uppercase px-3 py-1.5
                      rounded-full border font-mono transition-all duration-200"
                    style={{
                      borderColor: active ? 'var(--accent)' : 'var(--border)',
                      color: active ? 'var(--accent)' : 'var(--muted)',
                      background: active ? 'rgba(200,240,96,0.06)' : 'var(--card-bg)',
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {topic}
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Message */}
          <div className="col-span-2 flex flex-col gap-2">
            <label
              className="text-[0.6rem] tracking-[0.15em] uppercase"
              style={{ color: 'var(--muted)' }}
            >
              Message
            </label>
            <textarea
              placeholder="Tell me about your project or idea…"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="rounded-lg px-4 py-3 text-[0.8rem] font-mono outline-none
                border transition-all duration-250 w-full resize-none"
              style={{
                background: 'var(--card-bg)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--accent)'
                e.target.style.boxShadow = '0 0 0 3px rgba(200,240,96,0.06)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>
        </div>

        {/* Send button */}
        <motion.button
          onClick={handleSend}
          className="w-full py-4 rounded-xl font-sans font-semibold text-[0.75rem]
            tracking-[0.15em] uppercase flex items-center justify-center gap-3
            transition-colors duration-300 relative overflow-hidden"
          style={{
            background: sent ? '#4ade80' : 'var(--accent)',
            color: '#0a0a0f',
          }}
          whileHover={{ y: -2, boxShadow: '0 12px 32px rgba(200,240,96,0.25)' }}
          whileTap={{ y: 0, boxShadow: 'none' }}
        >
          {sent ? (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              ✓ Message sent!
            </motion.span>
          ) : (
            <>
              Send message
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </>
          )}
        </motion.button>

        {/* Availability */}
        <div
          className="flex items-center gap-2 mt-5 text-[0.65rem] tracking-widest uppercase"
          style={{ color: 'var(--muted)' }}
        >
          <span
            className="avail-dot w-2 h-2 rounded-full shrink-0"
            style={{ background: '#4ade80' }}
          />
          Available for new projects · Usually replies within 24h
        </div>
      </motion.div>
    </section>
  )
}
