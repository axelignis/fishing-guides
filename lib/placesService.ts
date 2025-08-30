import mockPlaces from './mockPlaces'
import { getPrisma } from './prisma'
import { regions as regionDefs } from '../prisma/data/regions'

type SearchParams = {
  region?: string
  comuna?: string
  q?: string
  page?: string | number
  per?: string | number
}

export async function searchPlaces(params: SearchParams) {
  const { region, comuna, q } = params

  // Try Prisma first; if anything fails, fallback to mockPlaces
  try {
    const prisma = getPrisma()
    // fetch published services with guide and address
    const services = await prisma.service.findMany({
      where: { status: 'PUBLISHED' },
      include: { guide: { include: { address: true } } },
      take: 200,
    })

    const mapped = services.map(s => {
      const addr = (s.guide as any)?.address
      // map region/comuna codes to names
      let regionName = ''
      let comunaName = ''
      if (addr?.regionCode) {
        const r = regionDefs.find(rd => rd.code === addr.regionCode)
        if (r) regionName = r.name
      }
      if (addr?.comunaCode) {
        const r = regionDefs.find(rd => rd.comunas.find((c: any) => c.code === addr.comunaCode))
        if (r) {
          const c = r.comunas.find((c: any) => c.code === addr.comunaCode)
          comunaName = c?.name || ''
        }
      }

      return {
        id: s.id,
        title: s.title,
        description: s.description,
        region: regionName || '',
        comuna: comunaName || '',
        lat: addr?.lat || undefined,
        lng: addr?.lng || undefined,
      }
    })

    let results = mapped
    if (region) results = results.filter(p => p.region === region)
    if (comuna) results = results.filter(p => p.comuna === comuna)
    if (q) {
      const lower = String(q).toLowerCase()
      results = results.filter(p => p.title.toLowerCase().includes(lower) || p.description.toLowerCase().includes(lower))
    }

    const page = Number(params.page || 1)
    const per = Math.min(50, Number(params.per || 10))
    const start = (page - 1) * per
    const paged = results.slice(start, start + per)

    // If no data found in DB, fallback to mock data to keep UX/testability
    if (results.length === 0) {
      // fallback
      return {
        data: mockPlaces.slice(start, start + per),
        total: mockPlaces.length,
      }
    }

    return { data: paged, total: results.length }
  } catch (err) {
    // fallback to mock
    const { region: r, comuna: c, q: qry } = params
    let results = mockPlaces
    if (r) results = results.filter(p => p.region === r)
    if (c) results = results.filter(p => p.comuna === c)
    if (qry) {
      const lower = String(qry).toLowerCase()
      results = results.filter(p => p.title.toLowerCase().includes(lower) || p.description.toLowerCase().includes(lower))
    }
    const page = Number(params.page || 1)
    const per = Math.min(50, Number(params.per || 10))
    const start = (page - 1) * per
    const paged = results.slice(start, start + per)
    return { data: paged, total: results.length }
  }
}

export default searchPlaces
