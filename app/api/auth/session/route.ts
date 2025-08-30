import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getPrisma } from '@/lib/prisma'

const prisma = getPrisma()

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ user: null }, { status: 200 })
  const user = await prisma.user.findUnique({ where: { id: session.sub }, select: { id: true, email: true, name: true, role: true } })
  if (!user) return NextResponse.json({ user: null }, { status: 200 })
  return NextResponse.json({ user })
}
