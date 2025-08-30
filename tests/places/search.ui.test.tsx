/** @jest-environment jsdom */
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SearchPage from '@/app/search/page'

describe('SearchPage UI', () => {
  it('loads comunas when region selected', async () => {
    render(<SearchPage />)
    // select elements are rendered without an associated label, so query all
    const selects = screen.getAllByRole('combobox')
    expect(selects.length).toBeGreaterThanOrEqual(2)

    // select Valparaíso
    fireEvent.change(selects[0], { target: { value: 'Valparaíso' } })

    // wait for the comuna options to be populated
    await waitFor(() => {
      const comunaOptions = Array.from(selects[1].querySelectorAll('option')).map(o => o.textContent)
      expect(comunaOptions).toContain('Viña del Mar')
    })
  })
})
