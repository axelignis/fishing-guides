describe('getMessagesSafe (advanced)', () => {
  it('uses next-intl server getMessages when available', async () => {
    // Mock the module 'next-intl/server' to ensure getMessages is called
    jest.resetModules()
    jest.doMock('next-intl/server', () => ({
      getMessages: async ({ locale }: any) => ({ app: { title: `MOCK-${locale}` } })
    }))
    const { getMessagesSafe } = await import('@/lib/i18n/getMessagesSafe')
    const msgs = await getMessagesSafe('en')
    expect(msgs.app?.title).toBe('MOCK-en')
    jest.dontMock('next-intl/server')
  })
})
