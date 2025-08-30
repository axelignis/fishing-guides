import { getPrisma as libGetPrisma, disconnectPrisma as _disconnectPrisma } from '@/lib/prisma'

// Keep previous test-helper API: export getPrisma and disconnectPrisma
export function getPrisma() {
  return libGetPrisma()
}

export async function disconnectPrisma() {
  await _disconnectPrisma()
}
