import { computeLocaleRedirect } from '@/lib/i18n/localeRedirect'

describe('computeLocaleRedirect', () => {
  it('redirects root to /es/', () => {
  expect(computeLocaleRedirect('/')).toBe('/es/')
  })
  it('redirects empty string to /es/', () => {
  expect(computeLocaleRedirect('')).toBe('/es/')
  })
  it('passes through existing locale', () => {
  expect(computeLocaleRedirect('/en')).toBeNull()
  })
  it('ignores api path', () => {
  expect(computeLocaleRedirect('/api/health')).toBeNull()
  })
})
