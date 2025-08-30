"use client"
import React from 'react'

type Place = {
  id: string
  title: string
  lat?: number
  lng?: number
}

type Service = { id: string; title: string; guide?: string; region?: string }

export default function MapClient(props: { places?: Place[]; initialRegion?: string | null; initialComuna?: string | null; services?: Service[] }) {
  const { places, initialRegion, initialComuna, services } = props

  if (places && places.length > 0) {
    const lats = places.map(p => p.lat ?? 0)
    const lngs = places.map(p => p.lng ?? 0)
    const minLat = Math.min(...lats, -90)
    const maxLat = Math.max(...lats, 90)
    const minLng = Math.min(...lngs, -180)
    const maxLng = Math.max(...lngs, 180)

    const normalize = (lat: number, lng: number) => {
      const x = (lng - minLng) / (maxLng - minLng || 1)
      const y = 1 - (lat - minLat) / (maxLat - minLat || 1)
      return { x: 10 + x * 280, y: 10 + y * 180 }
    }

    return (
      <svg width={300} height={200} role="img" aria-label="Mapa de resultados" style={{ border: '1px solid #ddd' }}>
        <rect x={0} y={0} width={300} height={200} fill="#f8fafc" />
        {places.map(p => {
          if (p.lat == null || p.lng == null) return null
          const pos = normalize(p.lat, p.lng)
          return (
            <g key={p.id} transform={`translate(${pos.x}, ${pos.y})`}>
              <circle r={6} fill="#0ea5a4" stroke="#064e3b" strokeWidth={1} />
              <title>{p.title}</title>
            </g>
          )
        })}
      </svg>
    )
  }

  // fallback list view when services provided
  return (
    <div data-testid="map-client">
      <div>Map placeholder</div>
      <div>Region: {initialRegion ?? 'all'}</div>
      <div>Comuna: {initialComuna ?? 'all'}</div>
      <ul>
        {services?.map((s) => (
          <li key={s.id}>{s.title} — {s.guide} — {s.region}</li>
        ))}
      </ul>
    </div>
  )
}
