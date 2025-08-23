import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { isLocale, locales, type Locale } from '@/lib/i18n/config'
import '@/app/globals.css'
import { LanguageSwitcher } from '@/components/language-switcher'
import { getSession } from '@/lib/auth'
import Link from 'next/link'

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
  const session = await getSession()
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased bg-background text-foreground">
        <NextIntlClientProvider messages={messages} locale={locale} timeZone="UTC">
          <header className="border-b p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <strong className="text-sm">{String((messages as any).app?.title)}</strong>
              <nav className="flex items-center gap-3 text-xs">
                {session ? (
                  <>
                    <Link href={`/${locale}/dashboard`} className="underline-offset-4 hover:underline">Dashboard</Link>
                    <form action="/api/auth/logout" method="POST">
                      <button className="text-red-600 underline-offset-4 hover:underline" type="submit">{String((messages as any).auth?.actions?.logout || 'Logout')}</button>
                    </form>
                  </>
                ) : (
                  <>
                    <Link href={`/${locale}/login`} className="underline-offset-4 hover:underline">{String((messages as any).auth?.actions?.login || 'Login')}</Link>
                    <Link href={`/${locale}/signup`} className="underline-offset-4 hover:underline">{String((messages as any).auth?.actions?.signup || 'Signup')}</Link>
                  </>
                )}
              </nav>
            </div>
            <LanguageSwitcher currentLocale={locale as Locale} />
          </header>
          <div className="p-6">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
