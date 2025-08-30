import { renderWithIntl } from '../utils/renderWithIntl'
import { screen } from '@testing-library/react'

describe('GuidePage server component', () => {
  it('renders guide info and published services', async () => {
    jest.resetModules()
  // Mock next/link to avoid client-only context/hooks during render
  jest.doMock('next/link', () => ({ __esModule: true, default: ({ children, href }: any) => (children) }))
    // Mock Prisma client methods used by the page
    jest.doMock('@prisma/client', () => {
      const PrismaClient = function PrismaClient() {
        return {
          user: {
            findUnique: async ({ where: { id } }: any) => ({ id, name: 'Juan Perez', bio: 'Guide bio' })
          },
          service: {
            findMany: async () => [
              { id: 's1', title: 'Fishing Trip', pricePerDay: 200, currency: 'USD' },
              { id: 's2', title: 'Casting Lesson', pricePerDay: 80, currency: 'USD' }
            ]
          }
        }
      }
      return { PrismaClient }
    })

    const GuidePage = (await import('@/app/[locale]/guide/[id]/page')).default
    const element = await GuidePage({ params: { locale: 'es', id: 'u1' } })
    renderWithIntl(element, 'es')

    expect(screen.getByText('Juan Perez')).toBeInTheDocument()
    expect(screen.getByText('Fishing Trip')).toBeInTheDocument()
    expect(screen.getByText('Casting Lesson')).toBeInTheDocument()

    jest.dontMock('@prisma/client')
  })
})
