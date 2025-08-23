import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale, isLocale } from './lib/i18n/config'

// Strategy: if pathname has no locale prefix, redirect adding defaultLocale
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Ignore next internal paths and assets
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/assets')
  ) {
    return
  }

  const segments = pathname.split('/').filter(Boolean)
  const first = segments[0]
  if (first && isLocale(first)) {
    return
  }

  const url = req.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
