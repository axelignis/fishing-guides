export const dynamic = 'force-static'

export default function HealthPage() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold">Health Check</h1>
      <p className="text-sm text-muted-foreground">Status: OK – {new Date().toISOString()}</p>
    </main>
  )
}
