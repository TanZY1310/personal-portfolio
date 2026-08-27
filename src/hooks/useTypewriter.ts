'use client'

import { useEffect, useState } from 'react'
import { typeSteps, START_DELAY, type TypeFrame, type TypeToken } from '@/lib/typewriter'

const EMPTY_FRAME: TypeFrame = { complete: [], current: null }

export function useTypewriter(lines: TypeToken[][]) {
  const [frame, setFrame] = useState<TypeFrame>(EMPTY_FRAME)

  useEffect(() => {
    let cancelled = false
    let timer: ReturnType<typeof setTimeout>
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const iterator = typeSteps(lines)[Symbol.iterator]()

    const run = () => {
      if (cancelled) return
      const step = iterator.next()
      if (step.done) return
      setFrame(step.value.frame)
      timer = setTimeout(run, reduce ? 0 : step.value.nextDelay)
    }
    timer = setTimeout(run, reduce ? 0 : START_DELAY)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [lines])

  return frame
}