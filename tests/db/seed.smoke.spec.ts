/** @jest-environment node */
import { getPrisma, disconnectPrisma } from './prismaTestClient'

// Basic smoke tests over seeded database state.
// Assumes `npm run seed:dev` executed before running these tests.

describe('Seed data smoke', () => {
  const prisma = getPrisma()

  afterAll(async () => {
    await disconnectPrisma()
  })

  test('counts within expected ranges', async () => {
    const users = await prisma.user.count()
    const services = await prisma.service.count()
    const bookings = await prisma.booking.count()
    expect(users).toBeGreaterThanOrEqual(18) // 12 guides + 6 clients minimum tolerance
  // Allow some tolerance for variations in seeded data across environments
  expect(users).toBeLessThanOrEqual(40)
    expect(services).toBeGreaterThan(0)
    expect(bookings).toBeLessThanOrEqual(12)
  })

  test('all guide services reference guide role', async () => {
    const rows = await prisma.service.findMany({
      select: { guide: { select: { role: true } } }
    })
    expect(rows.length).toBeGreaterThan(0)
  expect(rows.every((r: { guide: { role: string } }) => r.guide.role === 'GUIDE')).toBe(true)
  })

  test('bookings align service + guideId redundancy', async () => {
    const bookings = await prisma.booking.findMany({
      take: 10,
      include: { service: { select: { guideId: true } } }
    })
  expect(bookings.every((b: { guideId: string; service: { guideId: string } }) => b.guideId === b.service.guideId)).toBe(true)
  })

  test('addresses only for guides', async () => {
    const addresses = await prisma.address.findMany({ include: { user: { select: { role: true } } } })
    expect(addresses.length).toBeGreaterThan(0)
  expect(addresses.every((a: { user: { role: string } }) => a.user.role === 'GUIDE')).toBe(true)
  })

  test('no orphan reviews', async () => {
    const reviews = await prisma.review.findMany({ select: { bookingId: true } })
    if (reviews.length) {
  const bookingIds = new Set((await prisma.booking.findMany({ select: { id: true } })).map((b: { id: string }) => b.id))
  expect(reviews.every((r: { bookingId: string }) => bookingIds.has(r.bookingId))).toBe(true)
    } else {
      expect(reviews.length).toBe(0)
    }
  })
})
