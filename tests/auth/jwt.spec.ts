jest.mock('jose', () => {
  return {
    SignJWT: class MockSignJWT {
      private payload: any
      private header: any
      constructor(payload: any) { this.payload = payload }
      setProtectedHeader(h: any) { this.header = h; return this }
      setIssuedAt() { return this }
      setExpirationTime() { return this }
      async sign() { return JSON.stringify({ p: this.payload }) }
    },
    jwtVerify: async (token: string) => {
      const obj = JSON.parse(token)
      return { payload: { sub: obj.p.sub, role: obj.p.role } }
    }
  }
})

import { signSession, verifySession } from '@/lib/auth'

describe('jwt session', () => {
  it('signs and verifies', async () => {
  const token = await signSession({ sub: 'user1', role: 'CLIENT' }, '1h')
  const payload = await verifySession(token as any)
  expect(payload?.sub).toBe('user1')
    expect(payload?.role).toBe('CLIENT')
  })
})
