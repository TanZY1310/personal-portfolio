'use client'

import { motion } from 'motion/react'
import type { Easing } from 'motion/react'
import SectionHead from './SectionHead'
import { projects, sections } from '@/content'
import type { Project, ProjectTag } from '@/content'

const easeOut: Easing = [0.22, 1, 0.36, 1]

const tagColorClasses: Record<string, string> = {
  green: 'text-green border-green/35 bg-green/10',
  blue: 'text-blue border-blue/35 bg-blue/10',
  mauve: 'text-mauve border-mauve/35 bg-mauve/10',
  peach: 'text-warn border-warn/35 bg-warn/10',
}

function Tag({ label, color }: ProjectTag) {
  return (
    <motion.span
      className={`tag ${tagColorClasses[color] ?? tagColorClasses.green}`}
      whileHover={{ scale: 1.08, y: -1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {label}
    </motion.span>
  )
}

function handleSpotlight(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const { featured, year, kind, title, desc, tags, thumb } = project
  return (
    <motion.article
      className={`project-card rounded-card border overflow-hidden ${
        featured ? 'grid grid-cols-1 min-[901px]:grid-cols-[1.05fr_1fr]' : ''
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: easeOut, delay }}
      whileHover={{ y: -7 }}
      onMouseMove={handleSpotlight}
      style={{
        background: 'color-mix(in srgb, var(--surface) 42%, transparent)',
        borderColor: 'color-mix(in srgb, var(--fg-bright) 7%, transparent)',
        boxShadow: 'inset 0 1px 0 color-mix(in srgb, var(--fg-bright) 7%, transparent)',
        backdropFilter: 'blur(14px)',
      }}
    >
      <div
        className={`project-thumb relative overflow-hidden p-[1.1rem_1.2rem] border-b border-border min-h-[150px] ${
          featured ? 'min-[901px]:border-b-0 min-[901px]:border-r min-[901px]:min-h-[220px]' : ''
        }`}
        style={{
          background: 'linear-gradient(140deg, var(--surface-2), var(--surface))',
        }}
      >
        <pre className="relative z-[1] font-mono text-[0.78rem] leading-[1.7] whitespace-pre-wrap break-words">
          {thumb}
        </pre>
      </div>
      <div className="relative z-[1] flex flex-col gap-[0.7rem] p-[1.4rem_1.4rem_1.5rem]">
        <div className="project-meta font-mono text-[0.72rem] tracking-[0.05em] text-muted flex items-center gap-[0.6rem]">
          <span className="text-accent-2">{year}</span>
          <span className="text-muted-dim">/</span> {kind}
        </div>
        <h3 className="text-[1.28rem] font-bold tracking-[-0.01em] text-fg-bright">{title}</h3>
        <p className="text-muted text-[0.93rem] max-w-[62ch]">{desc}</p>
        <div className="project-tags mt-auto pt-[0.7rem] flex flex-wrap gap-[0.45rem]">
          {tags.map((t) => (
            <Tag key={t.label} label={t.label} color={t.color} />
          ))}
        </div>
        <span className="project-link-note font-mono text-[0.7rem] text-muted-dim inline-flex items-center gap-[0.4rem] mt-[0.35rem]">
          case study · coming soon
        </span>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden py-[clamp(4rem,10vw,7.5rem)]">
      <div className="projects-glow" />
      <div className="page-container relative">
        <SectionHead kicker={sections.projects.kicker} title={sections.projects.title} />

        <div className="grid grid-cols-1 min-[721px]:grid-cols-2 gap-[1.4rem]">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}