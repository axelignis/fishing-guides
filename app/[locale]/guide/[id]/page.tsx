import { getPrisma } from '@/lib/prisma'
const prisma = getPrisma()
import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n/config'
import Link from 'next/link'

export default async function GuidePage({ params }: { params: { locale: string; id: string } }) {
  const { locale, id } = params
  if (!isLocale(locale)) return notFound()

  const guide = await prisma.user.findUnique({ where: { id }, select: { id: true, name: true, bio: true, languages: true } })
  if (!guide) return notFound()

  const services = await prisma.service.findMany({ where: { guideId: id, status: 'PUBLISHED' }, select: { id: true, title: true, pricePerDay: true, currency: true } })

  const formatPrice = (value: number, currency: string) => {
    try {
      return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
    } catch {
      return `${currency} ${value}`
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{guide.name}</h1>
      {guide.languages && guide.languages.length > 0 && (
        <div className="text-sm text-muted-foreground mt-1">{guide.languages.join(' · ')}</div>
      )}
      {guide.bio && <p className="mt-2 text-muted-foreground">{guide.bio}</p>}

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Servicios publicados</h2>
        {services.length === 0 ? (
          <p className="text-sm text-muted-foreground">No hay servicios publicados.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {services.map((s: { id: string; title: string; pricePerDay: number; currency: string }) => (
              <li key={s.id} className="p-3 border rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <Link href={`/${locale}/service/${s.id}`} className="font-medium text-primary">
                      {s.title}
                    </Link>
                    <div className="text-sm text-muted-foreground">{formatPrice(s.pricePerDay, s.currency)}</div>
                  </div>
                  <div>
                    <Link href={`/${locale}/guide/${id}/contact`} className="text-sm px-3 py-1 border rounded">Contactar</Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
