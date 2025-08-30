export function isEmail(value: unknown): value is string {
  if (typeof value !== 'string') return false
  // simple email regex: non-empty local@domain with at least one dot in domain
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
