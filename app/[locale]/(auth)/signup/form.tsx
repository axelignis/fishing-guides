"use client"
import { useState, FormEvent } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'

export default function SignupForm() {
  const t = useTranslations('auth')
  const locale = useLocale()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    const body = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    }
    if (!body.name || !body.email || !body.password) {
      setError(t('errors.missing_fields'))
      return
    }
    try {
      setLoading(true)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        const code = data?.error || 'unknown'
        setError(t(`errors.${code}` as any))
      } else {
        window.location.href = `/${locale}/dashboard`
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && <div className="text-sm text-red-600" role="alert">{error}</div>}
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="name">{t('name')}</label>
        <input id="name" name="name" type="text" className="w-full border rounded px-3 py-2 text-sm bg-background" required />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="email">{t('email')}</label>
        <input id="email" name="email" type="email" className="w-full border rounded px-3 py-2 text-sm bg-background" required />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="password">{t('password')}</label>
        <input id="password" name="password" type="password" className="w-full border rounded px-3 py-2 text-sm bg-background" required />
      </div>
      <Button disabled={loading} className="w-full" type="submit">{loading ? '...' : t('actions.signup')}</Button>
    </form>
  )
}
