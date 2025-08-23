import { useTranslations } from 'next-intl'
import Link from 'next/link'
import SignupForm from './form'

export const metadata = { robots: { index: false } }

export default function SignupPage() {
  const t = useTranslations('auth')
  return (
    <main className="max-w-sm mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">{t('signup.title')}</h1>
      <SignupForm />
      <p className="text-sm text-muted-foreground">
        {t('links.haveAccount')}{' '}
        <Link href="../login" className="text-primary underline-offset-4 hover:underline">
          {t('actions.login')}
        </Link>
      </p>
    </main>
  )
}
