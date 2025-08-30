import { NextResponse } from 'next/server'
import { NextResponse } from 'next/server'
import { searchPlaces } from '../../../lib/placesService'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const params = Object.fromEntries(url.searchParams.entries())
  const { data, total } = searchPlaces(params)
  return NextResponse.json({ data, total })
}
