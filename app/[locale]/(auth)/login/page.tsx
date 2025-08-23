import { useTranslations } from 'next-intl'
import Link from 'next/link'
import LoginForm from './form'

export const metadata = { robots: { index: false } }

export default function LoginPage() {
  const t = useTranslations('auth')
  return (
    <main className="max-w-sm mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">{t('login.title')}</h1>
      <LoginForm />
      <p className="text-sm text-muted-foreground">
        {t('links.noAccount')}{' '}
        <Link href="../signup" className="text-primary underline-offset-4 hover:underline">
          {t('actions.signup')}
        </Link>
      </p>
    </main>
  )
}
