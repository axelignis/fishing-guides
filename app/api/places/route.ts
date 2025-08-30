import { NextResponse } from 'next/server'
import { searchPlaces } from '../../../lib/placesService'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const params = Object.fromEntries(url.searchParams.entries())
  const { data, total } = await searchPlaces(params as any)
  return NextResponse.json({ data, total })
}
