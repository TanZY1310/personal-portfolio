'use client'

import { Fragment, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import type { Easing, Variants } from 'motion/react'
import Terminal from './Terminal'
import { ArrowRightIcon } from './icons'
import { hero } from '@/content'

const easeOut: Easing = [0.22, 1, 0.36, 1]

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
}

const heroItem: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const termY = useTransform(scrollYProgress, [0, 1], [0, -36])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex items-center max-[900px]:items-start overflow-hidden min-h-dvh pt-24 pb-16"
    >
      <div className="hero-glow" />
      <div className="page-container w-full">
        <div className="grid items-center grid-cols-1 min-[901px]:grid-cols-[1.02fr_1.08fr] gap-[clamp(2rem,5vw,4rem)]">
          <motion.div variants={heroContainer} initial="hidden" animate="show">
            <motion.p
              variants={heroItem}
              className="font-mono text-[0.82rem] tracking-[0.04em] text-accent-2 mb-[1.1rem]"
            >
              {hero.eyebrow}
            </motion.p>
            <motion.h1
              variants={heroItem}
              className="text-balance font-extrabold tracking-[-0.035em] leading-[1.02] text-fg-bright mb-4"
              style={{ fontSize: 'clamp(2.6rem,6.2vw,4.6rem)' }}
            >
              {hero.name}
              <span className="text-accent">.</span>
            </motion.h1>
            <motion.p
              variants={heroItem}
              className="font-mono text-fg mb-[1.4rem]"
              style={{ fontSize: 'clamp(0.95rem,1.6vw,1.12rem)' }}
            >
              <span className="text-mauve">&gt;</span> {hero.role[0]}{' '}
              <span className="text-blue">~/</span> {hero.role[1]}
            </motion.p>
            <motion.p
              variants={heroItem}
              className="text-pretty text-muted max-w-[46ch] mb-[1.75rem]"
            >
              {hero.bio.map((seg, i) =>
                seg.strong ? (
                  <strong key={i} className="text-fg font-semibold">
                    {seg.text}
                  </strong>
                ) : (
                  <Fragment key={i}>{seg.text}</Fragment>
                ),
              )}
            </motion.p>
            <motion.div variants={heroItem} className="flex flex-wrap gap-[0.6rem] mb-8">
              {hero.facts.map((fact) => (
                <span key={fact.text} className="fact">
                  <span className={`h-[6px] w-[6px] rounded-full ${fact.color}`}></span>
                  {fact.bold && (
                    <>
                      <b>{fact.bold}</b>&nbsp;
                    </>
                  )}
                  {fact.text}
                </span>
              ))}
            </motion.div>
            <motion.div variants={heroItem} className="flex flex-wrap items-center gap-[0.9rem]">
              <motion.a
                href="#projects"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn btn-primary"
              >
                {hero.cta.projectsLabel} <ArrowRightIcon />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn btn-ghost"
              >
                {hero.cta.contactLabel}
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div style={{ y: termY }}>
            <Terminal />
          </motion.div>
        </div>
      </div>
    </section>
  )
}