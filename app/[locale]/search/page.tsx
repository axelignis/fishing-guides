import { ReactNode } from 'react'
import Link from 'next/link'
import MapClient from '@/components/MapClient'

type Props = {
  params: { locale: 'es' | 'en' }
  searchParams?: { region?: string; comuna?: string }
}

export default async function SearchPage({ params, searchParams }: Props) {
  const locale = params.locale
  const region = searchParams?.region ?? null
  const comuna = searchParams?.comuna ?? null

  // Placeholder: in a full implementation we'd query Prisma for services by region/comuna
  const services = [
    { id: 's1', title: 'Pesca en Lago', guide: 'Juan', region: region ?? 'Biobío' },
    { id: 's2', title: 'Pesca en Mar', guide: 'María', region: region ?? 'Valparaíso' },
  ]

  return (
    <div>
      <h1>Buscar prestadores</h1>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <MapClient initialRegion={region} initialComuna={comuna} services={services} />
        </div>
        <div style={{ width: 360 }}>
          <ul>
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`/${locale}/guide/${s.id}`}>{s.title} — {s.guide} — {s.region}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
