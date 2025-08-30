/** @jest-environment node */
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

// We hit the route handlers directly by importing them (unit-ish) to avoid spinning up a server.
import { POST as signup } from '@/app/api/auth/signup/route'
import { POST as login } from '@/app/api/auth/login/route'

// Mock session helpers to bypass Next.js request store dependency
jest.mock('@/lib/auth/session', () => ({
  createSession: jest.fn(async () => {}),
  destroySession: jest.fn(async () => {}),
  getSession: jest.fn(async () => null)
}))

const prisma = new PrismaClient()

describe('auth flows', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('signup then login', async () => {
    const email = `${randomUUID()}@test.dev`
    const password = 'Abcdefg1'
    const name = 'Test User'

    // signup
    const signupReq = new Request('http://localhost/api/auth/signup', { method: 'POST', body: JSON.stringify({ email, password, name }), headers: { 'Content-Type': 'application/json' } })
    const signupRes = await signup(signupReq as any)
    expect(signupRes.status).toBe(200)
    const signupJson: any = await signupRes.json()
    expect(signupJson.user.email).toBe(email)

    // login (ensure existing password works)
    const loginReq = new Request('http://localhost/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }), headers: { 'Content-Type': 'application/json' } })
    const loginRes = await login(loginReq as any)
    expect(loginRes.status).toBe(200)
    const loginJson: any = await loginRes.json()
    expect(loginJson.user.email).toBe(email)
  })

  it('rejects invalid email on signup and login', async () => {
    const badEmail = 'not-an-email'
    const password = 'Abcdefg1'
    const name = 'Bad Email'

    const signupReq = new Request('http://localhost/api/auth/signup', { method: 'POST', body: JSON.stringify({ email: badEmail, password, name }), headers: { 'Content-Type': 'application/json' } })
    const signupRes = await signup(signupReq as any)
    expect(signupRes.status).toBe(400)
    const signupJson: any = await signupRes.json()
    expect(signupJson.error).toBe('invalid_email')

    const loginReq = new Request('http://localhost/api/auth/login', { method: 'POST', body: JSON.stringify({ email: badEmail, password }), headers: { 'Content-Type': 'application/json' } })
    const loginRes = await login(loginReq as any)
    expect(loginRes.status).toBe(400)
    const loginJson: any = await loginRes.json()
    expect(loginJson.error).toBe('invalid_email')
  })

  it('logout clears session', async () => {
    const { POST: logout } = await import('@/app/api/auth/logout/route')
    const res = await logout()
    expect(res.status).toBe(200)
    const json: any = await res.json()
    expect(json.success).toBe(true)
  })
})
