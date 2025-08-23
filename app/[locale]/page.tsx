import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'

export default function HomeLocalePage() {
  const t = useTranslations()
  return (
    <main className="space-y-4">
      <div>
  <h1 className="text-2xl font-bold">{t('app.title')}</h1>
  <p className="text-muted-foreground text-sm mt-2">{t('app.subtitle')}</p>
      </div>
  <Button>{t('app.cta')}</Button>
    </main>
  )
}
