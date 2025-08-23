"use client"
import { usePathname } from 'next/navigation'
import { useLocale as useNextLocale } from 'next-intl'
import Link from 'next/link'
import { locales } from '@/lib/i18n/config'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname()
  const locale = useNextLocale()
  const t = useTranslations('nav')
  // Remove leading locale from current path to build links
  const segments = pathname?.split('/').filter(Boolean) ?? []
  segments.shift() // remove current locale
  const restPath = segments.join('/')
  return (
    <nav className="flex gap-2 text-xs" aria-label={t('changeLanguage')}>
      {locales.map(l => {
        const href = '/' + [l, restPath].filter(Boolean).join('/')
        const active = l === currentLocale
        return (
          <Link
            key={l}
            href={href}
            className={cn(
              'px-2 py-1 rounded border transition-colors',
              active
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted text-muted-foreground'
            )}
            hrefLang={l}
          >
            {t('lang.' + l) ?? l}
          </Link>
        )
      })}
    </nav>
  )
}
