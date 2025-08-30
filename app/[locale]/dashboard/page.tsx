import { requireAuth } from '@/lib/auth/requireAuth'

export default async function DashboardPage() {
  const session = await requireAuth()
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-sm text-muted-foreground">User ID: {session.sub}</p>
    </div>
  )
}
