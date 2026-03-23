'use client'

import { motion } from 'motion/react'
import type { Easing } from 'motion/react'

import { useScroll, useTransform } from 'motion/react'
import FadeInWhenVisible from './FadeInWhenVisible'

const skills = ['MySQL', 'Java', 'Spring', 'Python', 'FastAPI', 'Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'PostgreSQL']

const stats = [
  { num: '2', suffix: '+', label: 'Years exp.' },
  { num: '2', suffix: '+', label: 'Projects' },
  { num: '2', suffix: '+', label: 'Personal Projects'}
]

const experience = [
  { year: '2023–24', role: 'Software Developer', company: 'FPT Software Malaysia' },
  { year: '2022–23', role: 'Java Developer', company: 'Protech Digital Sdn Bhd' },
]

const badges = [
  { label: 'Available for work', color: 'var(--accent)', className: 'top-[8%] -right-4' },
  { label: 'Open Source', color: 'var(--accent2)', className: 'bottom-[28%] -left-8' },
  { label: 'KL, Malaysia', color: 'var(--accent3)', className: 'bottom-[8%] right-0' },
]

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as Easing,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as Easing,
    },
  },
};

// ── Download icon (arrow-down into tray) ──────────────────────────────────────
function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v13" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 20h14" />
    </svg>
  )
}

export default function AboutSection() {
  const { scrollYProgress } = useScroll()
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section
      id="about"
      className="min-h-screen grid relative overflow-hidden"
      style={{ gridTemplateColumns: '1fr 1fr' }}
    >
      {/* ── LEFT ── */}
      <motion.div
        className="px-12 pt-28 pb-16 flex flex-col justify-center relative border-b md:border-b-0 md:border-r"
        style={{ borderColor: 'var(--border)' }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Grid overlay */}
        <div className="grid-overlay" />

        <FadeInWhenVisible delay={0}>
          <div className="section-label">About me</div>
        </FadeInWhenVisible>

        {/* Name + Role*/}
        <FadeInWhenVisible delay={0.1}>
          <h1>Tan Ze Yan</h1>
          <p className="about-role">Full-Stack Developer &amp; Upcoming AI Engineer</p>
        </FadeInWhenVisible>

        {/* Bio */}
        <FadeInWhenVisible delay={0.2}>
          <p className="about-bio">I craft{' '}
          <strong style={{ color: 'var(--text)', fontWeight: 400 }}>
            thoughtful digital experiences
          </strong>{' '}
          at the intersection of engineering and design. Based in Kuala Lumpur, I work
          with modern web technologies to build products that are both{' '}
          <strong style={{ color: 'var(--text)', fontWeight: 400 }}>
            functional and interactive
          </strong>
          .
          <br />
          <br />
          When I&apos;m not pushing pixels or debugging APIs, you&apos;ll find me playing badminton,
          exploring tech products, or experimenting with generative ai content.</p>
        </FadeInWhenVisible>

        {/* Skill Tags */}
        <FadeInWhenVisible delay={0.3}>
          <div className="flex flex-wrap gap-2 mb-12">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                className="text-[0.65rem] tracking-widest uppercase px-3 py-1.5 rounded-full
                  border cursor-default transition-all duration-200"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--muted)',
                  background: 'var(--card-bg)',
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
                whileHover={{
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)',
                  backgroundColor: 'rgba(200,240,96,0.05)',
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </FadeInWhenVisible>

        {/* Stats */}
        <FadeInWhenVisible delay={0.4}>
          <motion.div
            className="grid grid-cols-3 border rounded-xl overflow-hidden"
            style={{ borderColor: 'var(--border)' }}
            variants={fadeUp}
          >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="px-6 py-5 transition-colors duration-200"
                  style={{
                    borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                  whileHover={{ backgroundColor: 'var(--card-bg)' }}
                >
                  <div
                    className="font-serif text-[1.8rem] leading-none mb-1"
                    style={{ color: 'var(--text)' }}
                  >
                    {s.num}
                    <span style={{ color: 'var(--accent)' }}>{s.suffix}</span>
                  </div>
                  <div
                    className="text-[0.6rem] tracking-[0.12em] uppercase"
                    style={{ color: 'var(--muted)' }}
                  >
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
        </FadeInWhenVisible>    
      </motion.div>

      {/* ── RIGHT ── */}
      <div className="px-12 py-16 flex flex-col justify-center items-center gap-10">

        {/* Photo Frame — click to download resume */}
        <motion.div
          className="relative w-70 h-90"
          style={{ y: photoY }}
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Offset border accents */}
          <div
            className="absolute rounded-md pointer-events-none"
            style={{
              inset: '-10px',
              border: '1px solid var(--accent)',
              opacity: 0.3,
              transform: 'rotate(2deg)',
            }}
          />
          <div
            className="absolute rounded-md pointer-events-none"
            style={{
              inset: '-6px',
              border: '1px solid var(--accent2)',
              opacity: 0.15,
              transform: 'rotate(-1deg)',
            }}
          />

          {/*
           * ── Resume download wrapper ──────────────────────────────────────────
           * Place your resume PDF at /public/resume.pdf (or adjust the href below).
           * The `download` attribute triggers a save-as dialog in the browser.
           */}
          <a
            href="/resume.pdf"
            download="Tan_Ze_Yan_Resume.pdf"
            aria-label="Download resume"
            className="block w-full h-full rounded-sm relative group"
            style={{ cursor: 'pointer' }}
          >
            {/* Photo placeholder */}
            <div
              className="w-full h-full rounded-sm border flex items-center justify-center text-[5rem] relative overflow-hidden"
              style={{
                background: 'var(--surface2)',
                borderColor: 'var(--border)',
              }}
            >
              🧑‍💻

              {/* Subtle shine overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(135deg, transparent 40%, rgba(200,240,96,0.05) 60%, transparent 80%)',
                }}
              />

              {/* ── Hover overlay with download CTA ── */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-sm"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: 'rgba(0,0,0,0.72)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                }}
              >
                {/* Animated icon bounce */}
                <motion.div
                  style={{ color: 'var(--accent)' }}
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <DownloadIcon />
                </motion.div>

                <span
                  className="text-[0.65rem] tracking-[0.18em] uppercase"
                  style={{ color: 'var(--accent)' }}
                >
                  Download Résumé
                </span>

                <span
                  className="text-[0.55rem] tracking-widest uppercase"
                  style={{ color: 'var(--muted)' }}
                >
                  PDF · Click to save
                </span>
              </motion.div>
            </div>
          </a>

          {/* Floating badges */}
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              className={`absolute items-center gap-2 px-3 py-2 rounded-lg border
                text-[0.65rem] tracking-[0.08em] uppercase backdrop-blur-md whitespace-nowrap
                hidden md:flex`}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4,
                delay: i * 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                background: 'var(--surface2)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
                top: i === 0 ? '8%' : undefined,
                bottom: i === 1 ? '28%' : i === 2 ? '8%' : undefined,
                right: i === 0 ? '-1rem' : i === 2 ? '0' : undefined,
                left: i === 1 ? '-3rem' : undefined,
                // Ensure badges sit above the download overlay
                zIndex: 10,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: badge.color }}
              />
              {badge.label}
            </motion.div>
          ))}
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          className="w-full max-w-85"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {experience.map((exp, i) => (
            <FadeInWhenVisible key={exp.year} delay={i * 0.15} direction="left">
              <motion.div
                key={exp.year}
                className="grid pb-6 mb-6 border-b last:border-b-0 last:mb-0 last:pb-0"
                style={{
                  gridTemplateColumns: 'auto 1fr',
                  gap: '1rem',
                  borderColor: 'var(--border)',
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
              >
                <div
                  className="text-[1.2rem] tracking-widest pt-0.5 min-w-16"
                  style={{ color: 'var(--accent)' }}
                >
                  {exp.year}
                </div>
                <div>
                  <div className="text-[1rem] mb-0.5" style={{ color: 'var(--text)' }}>
                    {exp.role}
                  </div>
                  <div
                    className="text-[0.75rem] tracking-[0.05em]"
                    style={{ color: 'var(--muted)' }}
                  >
                    {exp.company}
                  </div>
                </div>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
