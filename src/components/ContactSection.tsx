'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Easing, Variants } from 'motion/react'
import SectionHead from './SectionHead'
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon } from './icons'
import { contact, contactLinks, sections, topics } from '@/content'
import type { ContactLink } from '@/content'
import { validateContact } from '@/lib/validateContact'
import type { ContactErrors, ContactForm } from '@/lib/validateContact'

const easeOut: Easing = [0.22, 1, 0.36, 1]

const leftCol: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
}

const formPanel: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.12, ease: easeOut } },
}

function ContactLink({ link }: { link: ContactLink }) {
  return (
    <motion.a
      className="flex items-center gap-4 py-4 px-[0.15rem] border-b border-border first:border-t no-underline"
      href={link.href}
      target={link.href.startsWith('http') ? '_blank' : undefined}
      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      whileHover={{ x: 8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <span
        className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-card-sm border border-border text-fg"
        style={{ background: 'color-mix(in srgb, var(--surface) 40%, transparent)' }}
        aria-hidden="true"
      >
        {link.icon}
      </span>
      <span>
        <span className="block font-mono text-[0.68rem] tracking-[0.12em] uppercase text-muted mb-[0.1rem]">
          {link.label}
        </span>
        <span className="text-[0.92rem] text-fg">{link.value}</span>
      </span>
      <motion.span
        className="ml-auto text-muted-dim"
        aria-hidden="true"
        whileHover={{ x: 3, y: -3, color: 'var(--accent)' }}
      >
        <ArrowUpRightIcon />
      </motion.span>
    </motion.a>
  )
}

function ContactForm() {
  const [form, setForm] = useState<ContactForm>({ fname: '', lname: '', email: '', message: '' })
  const [errors, setErrors] = useState<ContactErrors>({})
  const [activeTopics, setActiveTopics] = useState<string[]>(['Freelance project'])
  const [sent, setSent] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  const toggleTopic = (topic: string) => {
    setActiveTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validateContact(form)
    setErrors(errs)
    if (Object.keys(errs).length) return

    setSent(true)
    setForm({ fname: '', lname: '', email: '', message: '' })
    setActiveTopics(['Freelance project'])
    clearTimeout(timerRef.current ?? undefined)
    timerRef.current = setTimeout(() => setSent(false), 2600)
  }

  useEffect(() => () => clearTimeout(timerRef.current ?? undefined), [])

  const inputClass = (name: keyof ContactErrors) =>
    `w-full font-sans text-[0.92rem] text-fg rounded-card-sm border px-[0.9rem] py-[0.72rem] outline-none transition-all duration-200 focus:border-accent-2 focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent-2)_14%,transparent)] ${
      errors[name] ? 'border-red' : 'border-border'
    }`

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 min-[721px]:grid-cols-2 gap-4">
        <div className="flex flex-col gap-[0.4rem] mb-[1.1rem]">
          <label htmlFor="fname" className="font-mono text-[0.7rem] tracking-[0.08em] uppercase text-muted">
            First name
          </label>
          <input
            type="text"
            id="fname"
            name="fname"
            placeholder="John"
            autoComplete="given-name"
            className={inputClass('fname')}
            style={{ background: 'color-mix(in srgb, var(--bg) 60%, transparent)' }}
            value={form.fname}
            onChange={(e) => setForm({ ...form, fname: e.target.value })}
          />
          <span className={`text-[0.76rem] text-red ${errors.fname ? 'block' : 'hidden'}`}>
            Please enter your first name.
          </span>
        </div>
        <div className="flex flex-col gap-[0.4rem] mb-[1.1rem]">
          <label htmlFor="lname" className="font-mono text-[0.7rem] tracking-[0.08em] uppercase text-muted">
            Last name
          </label>
          <input
            type="text"
            id="lname"
            name="lname"
            placeholder="Doe"
            autoComplete="family-name"
            className={inputClass('lname')}
            style={{ background: 'color-mix(in srgb, var(--bg) 60%, transparent)' }}
            value={form.lname}
            onChange={(e) => setForm({ ...form, lname: e.target.value })}
          />
          <span className={`text-[0.76rem] text-red ${errors.lname ? 'block' : 'hidden'}`}>
            Please enter your last name.
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-[0.4rem] mb-[1.1rem]">
        <label htmlFor="email" className="font-mono text-[0.7rem] tracking-[0.08em] uppercase text-muted">
          Email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="john@example.com"
          autoComplete="email"
          className={inputClass('email')}
          style={{ background: 'color-mix(in srgb, var(--bg) 60%, transparent)' }}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <span className={`text-[0.76rem] text-red ${errors.email ? 'block' : 'hidden'}`}>
          Please enter a valid email address.
        </span>
      </div>

      <div className="font-mono text-[0.7rem] tracking-[0.08em] uppercase text-muted mb-[0.6rem]">
        I&apos;m interested in…
      </div>
      <div className="flex flex-wrap gap-2 mb-[1.4rem]">
        {topics.map((topic) => (
          <motion.button
            type="button"
            key={topic}
            className={`chip ${activeTopics.includes(topic) ? 'active' : ''}`}
            onClick={() => toggleTopic(topic)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {topic}
          </motion.button>
        ))}
      </div>

      <div className="flex flex-col gap-[0.4rem] mb-[1.1rem]">
        <label htmlFor="message" className="font-mono text-[0.7rem] tracking-[0.08em] uppercase text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me about your project or idea…"
          className={`${inputClass('message')} min-h-[120px] resize-y`}
          style={{ background: 'color-mix(in srgb, var(--bg) 60%, transparent)' }}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <span className={`text-[0.76rem] text-red ${errors.message ? 'block' : 'hidden'}`}>
          Please add a short message.
        </span>
      </div>

      <motion.button
        type="submit"
        className="btn btn-primary w-full"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.span
              key="sent"
              className="inline-flex items-center gap-[0.55rem]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              Message sent <CheckIcon />
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              className="inline-flex items-center gap-[0.55rem]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              Send message <ArrowRightIcon />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <div className="flex items-center gap-[0.55rem] mt-[1.1rem] font-mono text-[0.72rem] tracking-[0.04em] text-muted">
        <span className="h-[7px] w-[7px] rounded-full bg-green animate-[glowPulse_2.4s_ease-out_infinite]"></span>
        {contact.availability}
      </div>
    </form>
  )
}

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-[clamp(4rem,10vw,7.5rem)]">
      <div className="page-container grid grid-cols-1 min-[901px]:grid-cols-[0.95fr_1.05fr] items-start gap-[clamp(2rem,5vw,4rem)]">
        <motion.div
          variants={leftCol}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <SectionHead kicker={sections.contact.kicker} title={sections.contact.title} compact rule={false} />
          <h2
            className="text-balance font-extrabold tracking-[-0.03em] leading-[1.08] text-fg-bright mb-[1.1rem]"
            style={{ fontSize: 'clamp(1.9rem,4vw,3rem)' }}
          >
            Let&apos;s build something <em className="not-italic text-accent-2">great</em> together.
          </h2>
          <p className="text-muted max-w-[44ch] mb-[2.2rem]">{contact.sub}</p>
          <div className="flex flex-col">
            {contactLinks.map((link) => (
              <ContactLink key={link.label} link={link} />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="rounded-card border p-[clamp(1.4rem,3vw,2.2rem)]"
          variants={formPanel}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            background: 'color-mix(in srgb, var(--surface) 40%, transparent)',
            borderColor: 'var(--border)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="font-mono text-[0.76rem] tracking-[0.14em] uppercase text-accent-2 mb-6">
            {contact.formTitle}
          </div>
          <ContactForm />
        </motion.div>
      </div>
    </section>
  )
}