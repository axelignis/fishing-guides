import HomeLocalePage from '@/app/[locale]/page'
import { renderWithIntl } from '../utils/renderWithIntl'
import { screen } from '@testing-library/react'

describe('HomeLocalePage i18n', () => {
  it('renderiza título ES', async () => {
    const element = await HomeLocalePage({ params: { locale: 'es' } })
    renderWithIntl(element, 'es')
    expect(screen.getByText('Marketplace Guías de Pesca (MVP)')).toBeInTheDocument()
  })
  it('renders EN title', async () => {
    const element = await HomeLocalePage({ params: { locale: 'en' } })
    renderWithIntl(element, 'en')
    expect(screen.getByText('Fishing Guides Marketplace (MVP)')).toBeInTheDocument()
  })
})
