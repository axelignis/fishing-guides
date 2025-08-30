// NOTE: Workaround: direct import of enums from generated .prisma client due to re-export typing anomaly
import { PrismaClient } from '@prisma/client'
import { UserRole, ServiceStatus, Currency, BookingStatus } from '.prisma/client'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'
import { regions } from './data/regions'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding start...')
  // Purge (order due to FKs)
  await prisma.review.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.service.deleteMany()
  await prisma.address.deleteMany()
  await prisma.user.deleteMany()

  const guideCount = 12
  const clientCount = 8

  const passwordHash = await bcrypt.hash('Password123!', 10)

  const allRegions = regions.flatMap(r => r.comunas.map(c => ({ r, c })))

  // Create Guides with Address and Services
  const guides: { id: string }[] = []
  for (let i = 0; i < guideCount; i++) {
    const pick = faker.helpers.arrayElement(allRegions)
    const languages = faker.helpers.arrayElements(['es','en','pt','fr'], faker.number.int({ min:1, max:2 }))
    const user = await prisma.user.create({
      data: {
        email: `guide${i+1}@demo.test`,
        password: passwordHash,
        name: faker.person.fullName(),
        bio: faker.lorem.sentences({ min: 1, max: 3 }),
  role: UserRole.GUIDE,
        languages,
        address: {
          create: {
            regionCode: pick.r.code,
            comunaCode: pick.c.code,
            lat: Number(faker.location.latitude()),
            lng: Number(faker.location.longitude()),
          }
        }
      }
    })
    guides.push({ id: user.id })
  }

  // Create Clients
  for (let i = 0; i < clientCount; i++) {
    await prisma.user.create({
      data: {
        email: `client${i+1}@demo.test`,
        password: passwordHash,
        name: faker.person.fullName(),
  role: UserRole.CLIENT,
        languages: ['es']
      }
    })
  }

  // Create Services for each guide (1-2)
  const services: { id: string; guideId: string; status: ServiceStatus }[] = []
  for (const g of guides) {
    const svcPerGuide = faker.number.int({ min:1, max:2 })
    for (let s=0; s<svcPerGuide; s++) {
      const service = await prisma.service.create({
        data: {
          guideId: g.id,
          title: faker.commerce.productName() + ' Fishing Trip',
          description: faker.lorem.paragraph(),
          pricePerDay: faker.number.int({ min: 40000, max: 150000 }),
          currency: Currency.CLP,
          status: faker.helpers.arrayElement<ServiceStatus>([
            ServiceStatus.PUBLISHED,
            ServiceStatus.DRAFT
          ])
        }
      })
      services.push({ id: service.id, guideId: g.id, status: service.status })
    }
  }

  // Create a few Bookings for published services (up to 8)
  const publishedServices = services.filter(s => s.status === ServiceStatus.PUBLISHED).slice(0, 8)
  const clients = await prisma.user.findMany({ where: { role: UserRole.CLIENT } })
  let bookingCreated = 0
  for (const svc of publishedServices) {
    const client = faker.helpers.arrayElement<typeof clients[number]>(clients)
    const start = faker.date.soon({ days: 30 })
    const end = new Date(start.getTime() + 24*60*60*1000)
    await prisma.booking.create({
      data: {
        serviceId: svc.id,
        clientId: client.id,
        guideId: svc.guideId,
        startDate: start,
        endDate: end,
        totalPrice: faker.number.int({ min: 50000, max: 160000 }),
        currency: Currency.CLP,
        status: faker.helpers.arrayElement<BookingStatus>([
          BookingStatus.REQUESTED,
          BookingStatus.CONFIRMED,
          BookingStatus.COMPLETED
        ])
      }
    })
    bookingCreated++
  }

  console.log('Seed summary:', { guides: guides.length, clients: clientCount, services: services.length, bookings: bookingCreated })
}

main().catch(e => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
