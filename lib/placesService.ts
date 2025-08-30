import mockPlaces from './mockPlaces'

type SearchParams = {
  region?: string
  comuna?: string
  q?: string
  page?: string | number
  per?: string | number
}

export function searchPlaces(params: SearchParams) {
  const { region, comuna, q } = params
  let results = mockPlaces

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

  return { data: paged, total: results.length }
}

export default searchPlaces
