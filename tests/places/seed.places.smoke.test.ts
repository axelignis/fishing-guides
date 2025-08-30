/** @jest-environment node */
import { getPrisma, disconnectPrisma } from '@/lib/prisma'

// This test is guarded: set RUN_DB_TESTS=true to enable (local use only / CI must opt-in)
const run = process.env.RUN_DB_TESTS === 'true'

describe('DB seed places smoke (guarded)', () => {
  if (!run) {
    test.skip('DB tests disabled', () => {})
    return
  }

  const prisma = getPrisma()
  afterAll(async () => {
    await disconnectPrisma()
  })

  test('seeded guide with address exists', async () => {
    const u = await prisma.user.findUnique({ where: { email: 'seed-guide@demo.test' }, include: { address: true, services: true } })
    expect(u).toBeTruthy()
    expect(u?.address?.lat).toBeDefined()
    expect(u?.services?.length).toBeGreaterThan(0)
  })
})
