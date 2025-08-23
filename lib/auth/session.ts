import { cookies } from 'next/headers'
import { verifySession, signSession, SessionPayload } from './jwt'

const COOKIE_NAME = 'app_session'

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies()
  const token = store.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifySession(token)
}

export async function createSession(payload: SessionPayload) {
  const token = await signSession(payload)
  const store = await cookies()
  store.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7
  })
}

export async function destroySession() {
  const store = await cookies()
  store.set({ name: COOKIE_NAME, value: '', path: '/', maxAge: 0 })
}
