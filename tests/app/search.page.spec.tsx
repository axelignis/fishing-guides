import React from 'react'
import { render, screen } from '@testing-library/react'
import SearchPage from '@/app/[locale]/search/page'
import MapClient from '@/components/MapClient'

jest.mock('@/components/MapClient', () => ({
  __esModule: true,
  default: () => <div data-testid="map-client-mock">mock-map</div>
}))

describe('Search page', () => {
  it('renders list and map', async () => {
    const result = await SearchPage({ params: { locale: 'es' }, searchParams: {} } as any)
    const { container } = render(result as any)
    expect(container).toBeTruthy()
    expect(container.querySelector('[data-testid="map-client-mock"]')).toBeTruthy()
  })
})
