import { NextRequest, NextResponse } from 'next/server'
import { computeLocaleRedirect } from './lib/i18n/localeRedirect'

// Strategy: if pathname has no locale prefix, redirect adding defaultLocale
export function __localeRedirect(pathname: string): string | null { return computeLocaleRedirect(pathname); }

export function middleware(req: NextRequest) {
  const redirectPath = __localeRedirect(req.nextUrl.pathname)
  if (!redirectPath) return
  const url = req.nextUrl.clone()
  url.pathname = redirectPath
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
