import { getPrisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const prisma = getPrisma()

async function main() {
  console.log('Seeding deterministic places...')
  // minimal purge
  await prisma.service.deleteMany()
  await prisma.address.deleteMany()
  await prisma.user.deleteMany()

  const passwordHash = await bcrypt.hash('Password123!', 10)

  // Create one guide with fixed coords in Valparaíso / Viña del Mar
  const guide = await prisma.user.create({
    data: {
      email: 'seed-guide@demo.test',
      password: passwordHash,
      name: 'Seed Guide',
      role: 'GUIDE',
      languages: ['es'],
      address: { create: { regionCode: '05', comunaCode: '05109', lat: -33.024, lng: -71.551 } }
    }
  })

  await prisma.service.create({
    data: {
      guideId: guide.id,
      title: 'Viña Fishing Trip',
      description: 'Demo seed service for Viña del Mar',
      pricePerDay: 60000,
      currency: 'CLP',
      status: 'PUBLISHED'
    }
  })

  console.log('Seed places done')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(async () => {
  await prisma.$disconnect()
})
