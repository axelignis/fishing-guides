import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Fishing Guide Home - Guías de Pesca',
}

export default function HomePage() {
  return (
    <main className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Marketplace Guías de Pesca (MVP)</h1>
        <p className="text-muted-foreground text-sm mt-2">
          Inicio temporal - iteraremos más adelante.
        </p>
      </div>
      <Button>CTA Ejemplo</Button>
    </main>
  )
}
