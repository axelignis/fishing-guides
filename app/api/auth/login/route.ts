import { NextRequest, NextResponse } from 'next/server'
import { getPrisma } from '@/lib/prisma'
import { verifyPassword, createSession } from '@/lib/auth'
import { isEmail } from '@/lib/validation/email'

const prisma = getPrisma()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body || {}
    if (!email || !password) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
    }
    if (!isEmail(email)) {
      return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
    }
    const user = await prisma.user.findUnique({ where: { email }, select: { id: true, password: true, name: true, email: true, role: true } })
    if (!user) {
      return NextResponse.json({ error: 'invalid_credentials' }, { status: 401 })
    }
    const ok = await verifyPassword(password, user.password)
    if (!ok) {
      return NextResponse.json({ error: 'invalid_credentials' }, { status: 401 })
    }
    await createSession({ sub: user.id, role: user.role })
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'internal_error' }, { status: 500 })
  }
}
