/** @jest-environment node */

describe('requireAuth guard', () => {
  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('throws when no session', async () => {
    jest.mock('@/lib/auth/session', () => ({ getSession: async () => null }))
    const mod = await import('@/lib/auth/requireAuth')
    let threw = false
    try {
      await mod.requireAuth()
    } catch (e) {
      threw = true
    }
    expect(threw).toBe(true)
  })

  it('returns session when present', async () => {
    const fake = { sub: 'u1', role: 'CLIENT' }
    jest.mock('@/lib/auth/session', () => ({ getSession: async () => fake }))
    const mod = await import('@/lib/auth/requireAuth')
    const session = await mod.requireAuth()
    expect(session).toEqual(fake)
  })
})
