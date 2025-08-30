"use client"
import React, { useEffect, useState } from 'react'
import { regions as regionData } from '../../prisma/data/regions'

type Place = {
  id: string
  title: string
  description: string
  region: string
  comuna: string
}

export default function SearchPage() {
  const [region, setRegion] = useState('')
  const [comuna, setComuna] = useState('')
  const [q, setQ] = useState('')
  const [results, setResults] = useState<Place[]>([])

  useEffect(() => {
    const params = new URLSearchParams()
    if (region) params.set('region', region)
    if (comuna) params.set('comuna', comuna)
    if (q) params.set('q', q)

    fetch(`/api/places?${params.toString()}`)
      .then(r => r.json())
      .then(d => setResults(d.data || []))
      .catch(() => setResults([]))
  }, [region, comuna, q])

  const regionOptions = regionData.map(r => r.name)
  const comunasForRegion = region ? (regionData.find(r => r.name === region)?.comunas.map(c => c.name) || []) : []

  return (
    <div style={{ padding: 20 }}>
      <h1>Buscar guías</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <select value={region} onChange={e => { setRegion(e.target.value); setComuna('') }}>
          <option value="">-- Región --</option>
          {regionOptions.map(rn => (
            <option key={rn} value={rn}>{rn}</option>
          ))}
        </select>
        <select value={comuna} onChange={e => setComuna(e.target.value)}>
          <option value="">-- Comuna --</option>
          {comunasForRegion.map(cn => (
            <option key={cn} value={cn}>{cn}</option>
          ))}
        </select>
        <input placeholder="Buscar" value={q} onChange={e => setQ(e.target.value)} />
      </div>

      <ul>
        {results.map(r => (
          <li key={r.id}>
            <strong>{r.title}</strong>
            <div>{r.description}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{r.region} — {r.comuna}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
