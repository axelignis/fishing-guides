"use client"
import { NextIntlClientProvider } from 'next-intl'
import type { ReactNode } from 'react'

export default function IntlProviderClient({
  children,
  locale,
  messages,
}: {
  children: ReactNode
  locale: string
  messages: Record<string, any>
}) {
  return (
    <NextIntlClientProvider messages={messages} locale={locale} timeZone="UTC">
      {children}
    </NextIntlClientProvider>
  )
}
