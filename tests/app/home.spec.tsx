import { renderWithIntl } from '../utils/renderWithIntl'
import { screen } from '@testing-library/react'

describe('HomeLocalePage i18n', () => {
  it('renderiza título ES', async () => {
    jest.resetModules()
    jest.doMock('next-intl/server', () => ({
      getMessages: async ({ locale }: any) => ({ app: { title: locale === 'es' ? 'Marketplace Guías de Pesca (MVP)' : 'Fishing Guides Marketplace (MVP)' } })
    }))
    const HomeLocalePage = (await import('@/app/[locale]/page')).default
    const element = await HomeLocalePage({ params: { locale: 'es' } })
    renderWithIntl(element, 'es')
    expect(screen.getByText('Marketplace Guías de Pesca (MVP)')).toBeInTheDocument()
    jest.dontMock('next-intl/server')
  })

  it('renders EN title', async () => {
    jest.resetModules()
    jest.doMock('next-intl/server', () => ({
      getMessages: async ({ locale }: any) => ({ app: { title: locale === 'es' ? 'Marketplace Guías de Pesca (MVP)' : 'Fishing Guides Marketplace (MVP)' } })
    }))
    const HomeLocalePage = (await import('@/app/[locale]/page')).default
    const element = await HomeLocalePage({ params: { locale: 'en' } })
    renderWithIntl(element, 'en')
    expect(screen.getByText('Fishing Guides Marketplace (MVP)')).toBeInTheDocument()
    jest.dontMock('next-intl/server')
  })
})
