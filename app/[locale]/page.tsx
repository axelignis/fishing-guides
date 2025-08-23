import { Button } from '@/components/ui/button'
import { isLocale } from '@/lib/i18n/config'
import { notFound } from 'next/navigation'
import { getMessagesSafe } from '@/lib/i18n/getMessagesSafe'

export default async function HomeLocalePage({ params }: { params: { locale: string } }) {
  const { locale } = params
  if (!isLocale(locale)) return notFound()
  const messages = (await getMessagesSafe(locale)) as any

  return (
    <main className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">{String(messages.app?.title)}</h1>
        <p className="text-muted-foreground text-sm mt-2">{String(messages.app?.subtitle)}</p>
      </div>
      <Button>{String(messages.app?.cta)}</Button>
    </main>
  )
}
