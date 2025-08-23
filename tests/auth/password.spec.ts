import { validatePassword } from '@/lib/auth'

describe('validatePassword', () => {
  it('accepts strong password', () => {
    expect(validatePassword('Abcdefg1').valid).toBe(true)
  })
  it('rejects short', () => {
    expect(validatePassword('Abc1').valid).toBe(false)
  })
  it('rejects missing uppercase', () => {
    expect(validatePassword('abcdefg1').valid).toBe(false)
  })
  it('rejects missing digit', () => {
    expect(validatePassword('Abcdefgh').valid).toBe(false)
  })
})
