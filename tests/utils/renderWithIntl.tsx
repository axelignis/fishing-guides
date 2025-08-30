import { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import esMessages from '@/messages/es.json'
import enMessages from '@/messages/en.json'

const allMessages = { es: esMessages, en: enMessages } as const

export function renderWithIntl(ui: ReactNode, locale: 'es' | 'en' = 'es') {
  return render(
    <NextIntlClientProvider messages={allMessages[locale]} locale={locale} timeZone="UTC">
      {ui}
    </NextIntlClientProvider>
  )
}
