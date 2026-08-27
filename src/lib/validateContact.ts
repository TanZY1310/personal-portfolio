export interface ContactForm {
  fname: string
  lname: string
  email: string
  message: string
}

export type ContactField = keyof ContactForm
export type ContactErrors = Partial<Record<ContactField, boolean>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContact(form: ContactForm): ContactErrors {
  const errors: ContactErrors = {}
  if (!form.fname.trim()) errors.fname = true
  if (!form.lname.trim()) errors.lname = true
  if (!EMAIL_RE.test(form.email.trim())) errors.email = true
  if (!form.message.trim()) errors.message = true
  return errors
}