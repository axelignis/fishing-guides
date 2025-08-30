import React from 'react'

type Service = { id: string; title: string; guide: string; region: string }

export default function MapClient({ initialRegion, initialComuna, services }: { initialRegion?: string | null; initialComuna?: string | null; services?: Service[] }) {
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
