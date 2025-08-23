import { defaultLocale, isLocale } from './config'

export function computeLocaleRedirect(pathname: string): string | null {
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/assets')
  ) return null
  const segments = pathname.split('/').filter(Boolean)
  const first = segments[0]
  if (first && isLocale(first)) return null
  if (pathname === '' || pathname === '/') return `/${defaultLocale}/`
  return `/${defaultLocale}${pathname.endsWith('/') ? pathname : pathname + '/'}`
}
