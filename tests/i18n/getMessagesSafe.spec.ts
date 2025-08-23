import { getMessagesSafe } from '@/lib/i18n/getMessagesSafe'

describe('getMessagesSafe', () => {
  it('returns messages for es', async () => {
    const msgs = await getMessagesSafe('es')
    expect(msgs).toBeDefined()
    expect(msgs.app?.title).toMatch(/Guías de Pesca|Marketplace/)
  })

  it('returns messages for en', async () => {
    const msgs = await getMessagesSafe('en')
    expect(msgs).toBeDefined()
    expect(msgs.app?.title).toMatch(/Fishing Guides Marketplace/)
  })
})
