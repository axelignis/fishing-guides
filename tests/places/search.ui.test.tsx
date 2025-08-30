/** @jest-environment jsdom */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SearchPage from '../../../app/search/page'

describe('SearchPage UI', () => {
  it('loads comunas when region selected', async () => {
    render(<SearchPage />)
    const regionSelect = screen.getByRole('combobox', { name: /-- Región --/i })
    // fallback: select elements exist
    const selects = screen.getAllByRole('combobox')
    expect(selects.length).toBeGreaterThanOrEqual(2)
    // select first region option (value will be region name)
    fireEvent.change(selects[0], { target: { value: 'Valparaíso' } })
    // after selecting region, the comunas select should contain Viña del Mar option
    const comunaSelect = selects[1]
    expect(Array.from(comunaSelect.querySelectorAll('option')).some(o => o.textContent === 'Viña del Mar')).toBe(true)
  })
})
