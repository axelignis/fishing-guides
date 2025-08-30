import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

// Provide a minimal mock for next-intl so hooks like useTranslations/useLocale work in tests
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en'
}))

import LoginForm from '@/app/[locale]/(auth)/login/form'

describe('LoginForm (integration)', () => {
  const originalFetch = global.fetch
  const originalLocation = window.location

  beforeEach(() => {
    // Stub window.location to avoid jsdom navigation errors when assigning href
    // @ts-ignore
    delete (window as any).location
    ;(window as any).location = { href: '' }
  })

  afterEach(() => {
    global.fetch = originalFetch
    // @ts-ignore
    window.location = originalLocation
    jest.resetAllMocks()
  })

  it('shows error when fields missing', async () => {
    const { container } = render(<LoginForm />)
    const form = container.querySelector('form') as HTMLFormElement
    fireEvent.submit(form)
    await screen.findByRole('alert')
  })

  it('submits and redirects on success', async () => {
    global.fetch = jest.fn(async () => ({ ok: true })) as any
  const { container } = render(<LoginForm />)
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } })
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Abcdefg1' } })
  const form = container.querySelector('form') as HTMLFormElement
  fireEvent.submit(form)
  await waitFor(() => expect((window.location as any).href).toContain('/dashboard'))
  })
})
