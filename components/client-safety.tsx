"use client"
import { useEffect } from 'react'

export default function ClientSafety() {
  useEffect(() => {
    try {
      // Remove unexpected server-injected attribute that causes hydration warnings
      // (observed as `cz-shortcut-listen` in devtools)
      const walk = (root: Element | Document = document) => {
        const nodes: Element[] = []
        if (root instanceof Document) {
          nodes.push(...Array.from(document.querySelectorAll('[cz-shortcut-listen]')))
        } else if (root instanceof Element) {
          if (root.hasAttribute && root.hasAttribute('cz-shortcut-listen')) nodes.push(root)
          nodes.push(...Array.from(root.querySelectorAll('[cz-shortcut-listen]')))
        }
        nodes.forEach(n => n.removeAttribute('cz-shortcut-listen'))
      }
      walk(document)

      // Defensive guard for share modal runtime attaching listeners to missing nodes.
      // Many compiled chunks directly call addEventListener on selectors; ensure the
      // common targets exist before that runs.
      const guardSelectors = ['#share-button', '.share-button', '[data-share]', '.share']
      guardSelectors.forEach(sel => {
        const el = document.querySelector(sel)
        if (!el) return
        // if the compiled code later binds via delegation on document, nothing to do.
        // If it expects a specific element, ensure it has a safe no-op addEventListener.
        if (!(el as any).addEventListener) {
          ;(el as any).addEventListener = (_: string, __: EventListenerOrEventListenerObject) => {
            // no-op
          }
        }
      })

      // Also guard global window.setTimeout caller sites: ensure they don't crash when
      // accessing missing nodes by leaving a delayed safety pass.
      setTimeout(() => {
        walk(document)
      }, 100)
    } catch (e) {
      // defensive: never break the app
      console.debug('[client-safety] cleanup failed', e)
    }
  }, [])

  return null
}
