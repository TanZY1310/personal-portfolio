export interface TypeToken {
  t: string
  c: string
}

export interface TypeFrame {
  /** lines fully typed so far */
  complete: TypeToken[][]
  /** the line currently being typed (may be partial) */
  current: TypeToken[] | null
}

export interface TypeStep {
  frame: TypeFrame
  /** ms to wait before producing the next step */
  nextDelay: number
}

export const CHAR_DELAY = 16
export const LINE_DELAY = 170
export const START_DELAY = 350

function cloneLine(line: TypeToken[]): TypeToken[] {
  return line.map((tok) => ({ t: tok.t, c: tok.c }))
}

export function cloneLines(lines: TypeToken[][]): TypeToken[][] {
  return lines.map(cloneLine)
}

/**
 * Yields the typewriter's frames one character at a time, with the delay to
 * wait before advancing to the next step. Pure: no DOM, no timers, no state —
 * only the input lines and a cursor.
 */
export function* typeSteps(lines: TypeToken[][]): Generator<TypeStep> {
  for (let li = 0; li < lines.length; li++) {
    const line = lines[li]
    for (let ti = 0; ti < line.length; ti++) {
      const token = line[ti]
      for (let ci = 1; ci <= token.t.length; ci++) {
        const isLineEnd = ti === line.length - 1 && ci === token.t.length
        yield {
          frame: {
            complete: cloneLines(lines.slice(0, li)),
            current: [
              ...cloneLine(line.slice(0, ti)),
              { t: token.t.slice(0, ci), c: token.c },
            ],
          },
          nextDelay: isLineEnd ? LINE_DELAY : CHAR_DELAY,
        }
      }
    }
  }
  yield { frame: { complete: cloneLines(lines), current: null }, nextDelay: 0 }
}