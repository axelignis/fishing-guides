import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  // allow a shared global in dev to prevent creating many connections
  var __prisma: PrismaClient | undefined
}

let prisma: PrismaClient | undefined

export function getPrisma(): PrismaClient {
  if (prisma) return prisma
  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
  } else {
    if (!global.__prisma) {
      global.__prisma = new PrismaClient()
    }
    prisma = global.__prisma
  }
  return prisma
}

export async function disconnectPrisma() {
  if (prisma) await prisma.$disconnect()
}

const prismaDefault = getPrisma()
export default prismaDefault
