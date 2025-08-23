import HomeLocalePage from '@/app/[locale]/page'
import { renderWithIntl } from '../utils/renderWithIntl'
import { screen } from '@testing-library/react'

describe('HomeLocalePage i18n', () => {
  it('renderiza título ES', () => {
    renderWithIntl(<HomeLocalePage />,'es')
    expect(screen.getByText('Marketplace Guías de Pesca (MVP)')).toBeInTheDocument()
  })
  it('renders EN title', () => {
    renderWithIntl(<HomeLocalePage />,'en')
    expect(screen.getByText('Fishing Guides Marketplace (MVP)')).toBeInTheDocument()
  })
})
