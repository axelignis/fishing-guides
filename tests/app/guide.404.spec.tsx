describe('GuidePage 404 behavior', () => {
  it('throws notFound when guide does not exist', async () => {
    jest.resetModules()
    jest.doMock('@prisma/client', () => {
      const PrismaClient = function PrismaClient() {
        return {
          user: {
            findUnique: async () => null
          },
          service: {
            findMany: async () => []
          }
        }
      }
      return { PrismaClient }
    })

    const GuidePage = (await import('@/app/[locale]/guide/[id]/page')).default

    let threw = false
    try {
      await GuidePage({ params: { locale: 'es', id: 'missing' } })
    } catch (e) {
      threw = true
    }

    expect(threw).toBe(true)
    jest.dontMock('@prisma/client')
  })
})
