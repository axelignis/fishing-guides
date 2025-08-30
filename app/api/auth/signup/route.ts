import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { hashPassword, validatePassword, createSession } from '@/lib/auth'
import { isEmail } from '@/lib/validation/email'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password, name, role } = body || {}
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
    }
    if (!isEmail(email)) {
      return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
    }
    const pwCheck = validatePassword(password)
    if (!pwCheck.valid) {
      return NextResponse.json({ error: pwCheck.message }, { status: 400 })
    }
    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) {
      return NextResponse.json({ error: 'email_in_use' }, { status: 409 })
    }
    const hashed = await hashPassword(password)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
        role: role && ['GUIDE','CLIENT'].includes(role) ? role : 'CLIENT',
        languages: ['es']
      },
      select: { id: true, email: true, name: true, role: true }
    })
    await createSession({ sub: user.id, role: user.role })
    return NextResponse.json({ user })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'internal_error' }, { status: 500 })
  }
}
