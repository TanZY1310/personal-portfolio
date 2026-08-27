import type { ReactNode } from 'react'
import { EmailIcon, GitHubIcon, LinkedInIcon } from './components/icons'
import type { TypeToken } from './lib/typewriter'

export interface NavItem {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export interface HeroFact {
  color: string
  bold?: string
  text: string
}

export interface HeroBioSegment {
  text: string
  strong?: boolean
}

export const hero = {
  eyebrow: '// hello_world — portfolio',
  name: 'Tan Ze Yan',
  role: ['full-stack developer', 'upcoming AI engineer'] as const,
  bio: [
    { text: 'I craft ' },
    { text: 'thoughtful digital experiences', strong: true },
    {
      text: ' where engineering meets design. Based in Kuala Lumpur, I build products with Java, Python and TypeScript that are ',
    },
    { text: 'functional and interactive', strong: true },
    { text: ' — from backend services to polished front-ends.' },
  ] as HeroBioSegment[],
  facts: [
    { color: 'bg-blue', bold: '2+', text: 'yrs experience' },
    { color: 'bg-warn', text: 'Kuala Lumpur' },
    { color: 'bg-green', text: 'Available' },
  ] as HeroFact[],
  cta: {
    projectsLabel: 'View projects',
    contactLabel: 'Get in touch',
  },
}

export const sections = {
  projects: { kicker: '02', title: 'Selected work' },
  experience: { kicker: '03', title: 'Experience' },
  contact: { kicker: '04', title: 'Contact' },
} as const

export interface ProjectTag {
  label: string
  color: string
}

export interface Project {
  id: string
  year: string
  kind: string
  title: string
  desc: string
  tags: ProjectTag[]
  thumb: ReactNode
  featured?: boolean
}

const Code = {
  kw: (t: string) => <span className="text-mauve">{t}</span>,
  id: (t: string) => <span className="text-blue">{t}</span>,
  str: (t: string) => <span className="text-green">{t}</span>,
  fn: (t: string) => <span className="text-frost">{t}</span>,
}

export const projects: Project[] = [
  {
    id: 'project-card-order-api',
    featured: true,
    year: '2024',
    kind: 'Backend service',
    title: 'Order Management API',
    desc: 'A Spring Boot REST service handling the full order workflow — JWT authentication, validation and PostgreSQL persistence — built for clean separation of concerns.',
    tags: [
      { label: 'Java', color: 'green' },
      { label: 'Spring Boot', color: 'green' },
      { label: 'PostgreSQL', color: 'blue' },
      { label: 'MySQL', color: 'mauve' },
    ],
    thumb: (
      <pre>
        <span className="block">{Code.kw('@RestController')}</span>
        <span className="block">
          {Code.kw('class')} {Code.id('OrderController')} {'{'}
        </span>
        <span className="block">
          {'  '}
          {Code.kw('@GetMapping')}({Code.str('"/orders"')})
        </span>
        <span className="block">
          {'  '}
          {Code.id('List')}&lt;{Code.id('Order')}&gt; {Code.fn('list')}() {'{ … }'}
        </span>
        <span className="block">{'}'}</span>
      </pre>
    ),
  },
  {
    id: 'project-card-ml-inference',
    year: '2023',
    kind: 'ML service',
    title: 'ML Inference Service',
    desc: 'A FastAPI microservice that serves trained models behind a clean, documented REST interface for low-latency predictions.',
    tags: [
      { label: 'Python', color: 'green' },
      { label: 'FastAPI', color: 'green' },
      { label: 'Docker', color: 'blue' },
    ],
    thumb: (
      <pre>
        <span className="block">
          {Code.kw('from')} {Code.id('fastapi')} {Code.kw('import')} {Code.id('FastAPI')}
        </span>
        <span className="block" />
        <span className="block">
          {Code.fn('app')} = {Code.id('FastAPI')}()
        </span>
        <span className="block" />
        <span className="block">
          {Code.kw('@app')}.post({Code.str('"/predict"')})
        </span>
        <span className="block">
          {Code.kw('def')} {Code.fn('predict')}(x): {Code.kw('return')} model(x)
        </span>
      </pre>
    ),
  },
  {
    id: 'project-card-portfolio',
    year: '2026',
    kind: 'Front-end',
    title: 'Portfolio & Design System',
    desc: 'This very site — a responsive interface with a custom Nordic–Catppuccin theme, terminal hero and accessible interactions.',
    tags: [
      { label: 'Next.js', color: 'blue' },
      { label: 'TypeScript', color: 'blue' },
      { label: 'React', color: 'mauve' },
      { label: 'Tailwind', color: 'peach' },
    ],
    thumb: (
      <pre>
        <span className="block">
          {Code.kw('const')} {Code.id('stack')} = {'{'}
        </span>
        <span className="block">{'  '}ui: {Code.str("'Next.js'")},</span>
        <span className="block">{'  '}lang: {Code.str("'TypeScript'")},</span>
        <span className="block">{'  '}style: {Code.str("'Tailwind'")},</span>
        <span className="block">{'}'}</span>
      </pre>
    ),
  },
]

export interface ExperienceItem {
  period: string
  role: string
  company: string
  color: string
  bullets: string[] | null
}

export const experience: ExperienceItem[] = [
  {
    period: 'Present',
    role: 'Open to new opportunities',
    company: 'Seeking full-stack / AI engineering roles',
    color: 'var(--green)',
    bullets: null,
  },
  {
    period: '2023 — 2024',
    role: 'Software Developer',
    company: 'FPT Software Malaysia',
    color: 'var(--blue)',
    bullets: [
      'Built and maintained web applications with Java and the Spring ecosystem.',
      'Collaborated with designers and QA in an agile, cross-functional team.',
    ],
  },
  {
    period: '2022 — 2023',
    role: 'Java Developer',
    company: 'Protech Digital Sdn Bhd',
    color: 'var(--pink)',
    bullets: [
      'Developed Java backend services for client projects.',
      'Wrote and optimized SQL queries for relational databases.',
    ],
  },
]

export interface ContactLink {
  label: string
  value: string
  href: string
  icon: ReactNode
}

export const contactLinks: ContactLink[] = [
  {
    label: 'Email',
    value: 'tanzy1310@gmail.com',
    href: 'mailto:tanzy1310@gmail.com',
    icon: <EmailIcon />,
  },
  {
    label: 'LinkedIn',
    value: 'in/tan-ze-yan',
    href: 'https://www.linkedin.com/in/tan-ze-yan-60715716b/',
    icon: <LinkedInIcon />,
  },
  {
    label: 'GitHub',
    value: 'github.com/TanZY1310',
    href: 'https://github.com/TanZY1310',
    icon: <GitHubIcon />,
  },
]

export const topics = ['Freelance project', 'Full-time role', 'Collaboration', 'Just saying hi']

export const contact = {
  sub: 'Have a project in mind, a question, or just want to say hello? My inbox is always open.',
  formTitle: 'Send a message',
  availability: 'Available for new projects · usually replies within 24h',
}

const blank: TypeToken[] = [{ t: '\u00A0', c: '' }]

const PROMPT: TypeToken[] = [
  { t: 'tan@zydev', c: 'text-green' },
  { t: ':', c: 'text-fg' },
  { t: '~', c: 'text-blue' },
  { t: '$ ', c: 'text-accent' },
]

export const terminalLines: TypeToken[][] = [
  [{ t: 'Last login: Thu Aug 27 2026 from Kuala Lumpur', c: 'text-muted-dim' }],
  blank,
  PROMPT.concat([{ t: 'whoami', c: 'text-mauve' }]),
  [{ t: 'Tan Ze Yan', c: 'text-fg-bright' }],
  blank,
  PROMPT.concat([{ t: 'cat', c: 'text-mauve' }, { t: ' ', c: '' }, { t: 'role.txt', c: 'text-green' }]),
  [{ t: '"Full-Stack Developer · Upcoming AI Engineer"', c: 'text-green' }],
  blank,
  PROMPT.concat([{ t: 'ls', c: 'text-mauve' }, { t: ' ', c: '' }, { t: 'skills/', c: 'text-green' }]),
  [
    { t: 'Java  ', c: 'text-green' },
    { t: 'Spring  ', c: 'text-blue' },
    { t: 'Python  ', c: 'text-mauve' },
    { t: 'FastAPI  ', c: 'text-warn' },
    { t: 'Next.js', c: 'text-frost' },
  ],
  [
    { t: 'React  ', c: 'text-green' },
    { t: 'TypeScript  ', c: 'text-blue' },
    { t: 'Node.js  ', c: 'text-mauve' },
    { t: 'PostgreSQL', c: 'text-warn' },
  ],
  blank,
  PROMPT.concat([{ t: './status', c: 'text-mauve' }, { t: ' ', c: '' }, { t: '--check', c: 'text-warn' }]),
  [{ t: '● ', c: 'text-green' }, { t: 'Available for new projects', c: 'text-fg' }],
]

export const terminal = {
  title: 'tan@zydev: ~',
  ariaLabel: 'Terminal window typing an introduction',
}