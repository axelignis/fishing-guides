import { redirect } from 'next/navigation'
import { getSession } from './session'

export async function requireAuth(options?: { role?: string }) {
  const session = await getSession()
  if (!session) redirect('/es/login') // TODO: dynamic locale
  if (options?.role && session.role !== options.role) redirect('/es')
  return session
}
