import { searchPlaces } from '../../lib/placesService'

describe('GET /api/places', () => {
  it('returns all places when no filters', async () => {
    const json = await searchPlaces({})
    expect(json.total).toBeGreaterThanOrEqual(3)
    expect(Array.isArray(json.data)).toBe(true)
  })

  it('filters by region', async () => {
    const json = await searchPlaces({ region: 'Valparaíso' })
    expect(json.data.every((p: any) => p.region === 'Valparaíso')).toBe(true)
  })
})
