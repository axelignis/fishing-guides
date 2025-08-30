import Link from 'next/link'
import LoginForm from './form'
import { isLocale } from '@/lib/i18n/config'
import { getMessagesSafe } from '@/lib/i18n/getMessagesSafe'
import { notFound } from 'next/navigation'

export const metadata = { robots: { index: false } }

export default async function LoginPage({ params }: { params: { locale: string } }) {
  const { locale } = params
  if (!isLocale(locale)) return notFound()
  const messages = (await getMessagesSafe(locale)) as any

  return (
    <main className="max-w-sm mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">{String(messages.auth?.login?.title)}</h1>
  <LoginForm />
      <p className="text-sm text-muted-foreground">
        {String(messages.auth?.links?.noAccount)}{' '}
        <Link href="../signup" className="text-primary underline-offset-4 hover:underline">
          {String(messages.auth?.actions?.signup)}
        </Link>
      </p>
    </main>
  )
}
