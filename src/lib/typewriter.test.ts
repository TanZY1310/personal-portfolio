import { describe, expect, it } from 'vitest'
import { CHAR_DELAY, LINE_DELAY, typeSteps, type TypeStep } from './typewriter'

function collect(iterator: Generator<TypeStep>): TypeStep[] {
  return [...iterator]
}

describe('typeSteps', () => {
  it('yields the final complete frame with no partial line', () => {
    const lines = [[{ t: 'ab', c: 'x' }]]
    const steps = collect(typeSteps(lines))
    const last = steps[steps.length - 1]
    expect(last.frame.complete).toEqual(lines)
    expect(last.frame.current).toBeNull()
    expect(last.nextDelay).toBe(0)
  })

  it('types character by character', () => {
    const steps = collect(typeSteps([[{ t: 'ab', c: 'x' }]]))
    expect(steps).toHaveLength(3)
    expect(steps[0].frame.current).toEqual([{ t: 'a', c: 'x' }])
    expect(steps[1].frame.current).toEqual([{ t: 'ab', c: 'x' }])
    expect(steps[2].frame.complete[0][0]).toEqual({ t: 'ab', c: 'x' })
  })

  it('moves completed lines into the complete list', () => {
    const lines = [[{ t: 'a', c: 'x' }], [{ t: 'b', c: 'y' }]]
    const steps = collect(typeSteps(lines))
    const secondLineFirstChar = steps[1]
    expect(secondLineFirstChar.frame.complete).toEqual([[{ t: 'a', c: 'x' }]])
    expect(secondLineFirstChar.frame.current).toEqual([{ t: 'b', c: 'y' }])
  })

  it('uses char delay within a line and line delay at line ends', () => {
    const lines = [[{ t: 'ab', c: 'x' }], [{ t: 'c', c: 'y' }]]
    const delays = collect(typeSteps(lines)).map((s) => s.nextDelay)
    expect(delays).toEqual([CHAR_DELAY, LINE_DELAY, LINE_DELAY, 0])
  })

  it('does not mutate the input lines', () => {
    const input: TypeToken[][] = [[{ t: 'ab', c: 'x' }]]
    const before = JSON.stringify(input)
    collect(typeSteps(input))
    expect(JSON.stringify(input)).toBe(before)
  })
})