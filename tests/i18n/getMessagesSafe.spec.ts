describe('getMessagesSafe', () => {
  it('returns messages for es (mocked server)', async () => {
    jest.resetModules()
    jest.doMock('next-intl/server', () => ({
      getMessages: async ({ locale }: any) => ({ app: { title: locale === 'es' ? 'Marketplace Guías de Pesca (MVP)' : 'Fishing Guides Marketplace (MVP)' } })
    }))
    const { getMessagesSafe } = await import('@/lib/i18n/getMessagesSafe')
    const msgs = await getMessagesSafe('es')
    expect(msgs).toBeDefined()
    expect(msgs.app?.title).toMatch(/Guías de Pesca|Marketplace/)
    jest.dontMock('next-intl/server')
  })

  it('returns messages for en (mocked server)', async () => {
    jest.resetModules()
    jest.doMock('next-intl/server', () => ({
      getMessages: async ({ locale }: any) => ({ app: { title: locale === 'es' ? 'Marketplace Guías de Pesca (MVP)' : 'Fishing Guides Marketplace (MVP)' } })
    }))
    const { getMessagesSafe } = await import('@/lib/i18n/getMessagesSafe')
    const msgs = await getMessagesSafe('en')
    expect(msgs).toBeDefined()
    expect(msgs.app?.title).toMatch(/Fishing Guides Marketplace/)
    jest.dontMock('next-intl/server')
  })
})
