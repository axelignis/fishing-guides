import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { isLocale, locales, type Locale } from '@/lib/i18n/config'
import '@/app/globals.css'
import { LanguageSwitcher } from '@/components/language-switcher'

export function generateStaticParams() {
  return locales.map(l => ({ locale: l }))
}

export const dynamic = 'force-static'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { locale: string }
}) {
  const { locale } = params
  if (!isLocale(locale)) return notFound()
  const messages = await getMessages({ locale })
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased bg-background text-foreground">
        <NextIntlClientProvider messages={messages} locale={locale} timeZone="UTC">
          <header className="border-b p-4 flex items-center justify-between">
            <strong className="text-sm">{String(messages['app.title'])}</strong>
            <LanguageSwitcher currentLocale={locale as Locale} />
          </header>
          <div className="p-6">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
