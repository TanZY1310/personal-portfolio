'use client'

import Navbar from '@/components/Navbar'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

import { motion, useScroll } from 'motion/react'



export default function Home() {
  const { scrollYProgress } = useScroll()

  return (
    <>
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'var(--accent)',
          transformOrigin: '0%',
          zIndex: 200,
        }}
      />
      <Navbar />
      <main className="pt-20">
        <AboutSection />

        {/* Gradient divider */}
        <div className="section-divider" />

        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
