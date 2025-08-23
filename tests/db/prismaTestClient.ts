import { PrismaClient } from '@prisma/client'

// Reuse single PrismaClient across tests to avoid connection churn.
// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient

export function getPrisma() {
  if (!prisma) {
    prisma = new PrismaClient()
  }
  return prisma
}

export async function disconnectPrisma() {
  if (prisma) {
    await prisma.$disconnect()
  }
}
