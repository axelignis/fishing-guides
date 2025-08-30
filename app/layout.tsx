// This root layout remains minimal; actual locale layouts under app/[locale]/layout.tsx
import type { ReactNode } from 'react'
import './globals.css'
import ClientSafety from '@/components/client-safety'

export const metadata = {
  title: 'Pesca Marketplace',
  description: 'MVP Guías de Pesca',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        {/* Inline early guard: prevents third-party or compiled scripts from throwing
            when they try to attach listeners to missing share elements. This is
            defensive and short-lived until we map the real source. */}
        <script dangerouslySetInnerHTML={{ __html: `(() => {
          try {
            // remove server-injected attribute if present
            try { document.querySelectorAll('[cz-shortcut-listen]').forEach(n => n.removeAttribute('cz-shortcut-listen')) } catch(e){}

            const dummy = () => {
              const d = document.createElement('div');
              d.addEventListener = function(){};
              d.removeEventListener = function(){};
              return d;
            }

            const origGet = document.getElementById.bind(document);
            document.getElementById = function(id) {
              const el = origGet(id);
              if (!el && /share|shareModal|share-button|share_modal/i.test(id)) return dummy();
              return el;
            }

            const origQS = document.querySelector.bind(document);
            document.querySelector = function(sel) {
              try { const el = origQS(sel); if (!el && /share|\\[data-share\\]|\\.share|\\#share-button/.test(sel)) return dummy(); return el } catch(e){ return origQS(sel) }
            }
          } catch (e) { /* no-op */ }
        })();` }} />
      </head>
      <body className="min-h-screen font-sans antialiased bg-background text-foreground">
        {/* client safety runs only in the browser */}
        <ClientSafety />
        {children}
      </body>
    </html>
  )
}

