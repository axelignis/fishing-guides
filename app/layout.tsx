import type { ReactNode } from 'react'
import './globals.css'

export const metadata = {
  title: 'Pesca Marketplace',
  description: 'MVP Guías de Pesca',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
