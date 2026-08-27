import { describe, expect, it } from 'vitest'
import { validateContact } from './validateContact'

const valid = { fname: 'Tan', lname: 'Ze Yan', email: 'tanzy1310@gmail.com', message: 'hi' }

describe('validateContact', () => {
  it('returns no errors for a valid form', () => {
    expect(validateContact(valid)).toEqual({})
  })

  it('flags missing required fields', () => {
    expect(validateContact({ ...valid, fname: '   ' })).toEqual({ fname: true })
    expect(validateContact({ ...valid, lname: '' })).toEqual({ lname: true })
    expect(validateContact({ ...valid, message: '  ' })).toEqual({ message: true })
  })

  it('flags invalid emails', () => {
    expect(validateContact({ ...valid, email: 'not-an-email' })).toEqual({ email: true })
    expect(validateContact({ ...valid, email: 'a@b' })).toEqual({ email: true })
  })

  it('trims surrounding whitespace before validating', () => {
    expect(validateContact({ ...valid, email: ' a@b.c ' })).toEqual({})
  })

  it('flags every invalid field at once', () => {
    expect(validateContact({ fname: '', lname: '', email: 'x', message: '' })).toEqual({
      fname: true,
      lname: true,
      email: true,
      message: true,
    })
  })
})