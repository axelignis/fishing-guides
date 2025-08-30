jest.mock('jose', () => {
  return {
    SignJWT: class MockSignJWT {
      private payload: any
      constructor(payload: any) { this.payload = payload }
      setProtectedHeader() { return this }
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

const setCalls: any[] = []
jest.mock('next/headers', () => ({
  cookies: () => ({
    get: (name: string) => undefined,
    set: (opts: any) => setCalls.push(opts),
  })
}))

import { createSession, destroySession } from '@/lib/auth/session'

describe('session cookie helpers', () => {
  beforeEach(() => {
    setCalls.length = 0
  })

  it('sets a cookie on createSession', async () => {
    await createSession({ sub: 'u1', role: 'CLIENT' })
    expect(setCalls.length).toBeGreaterThan(0)
    const set = setCalls[0]
    expect(set.name).toBe('app_session')
    expect(typeof set.value).toBe('string')
    expect(set.httpOnly).toBe(true)
  })

  it('clears cookie on destroySession', async () => {
    await destroySession()
    const last = setCalls[setCalls.length - 1]
    expect(last.name).toBe('app_session')
    expect(last.maxAge).toBe(0)
  })
})
