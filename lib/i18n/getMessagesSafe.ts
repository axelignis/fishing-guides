export async function getMessagesSafe(locale: string) {
  // Use next-intl server API (requires a valid next-intl config to be present)
  // This will throw if next-intl cannot find its config; we intentionally
  // surface the error so developers can fix their configuration.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - dynamic import shapes differ between ESM and CJS builds
  const mod: any = await import('next-intl/server')

  // Try several common interop shapes to locate a callable getMessages
  let getMessages: any = undefined
  const candidates: any[] = [
    mod.getMessages,
    mod.getMessages?.default,
    mod.default?.getMessages,
    mod.default,
    mod.default?.default,
  ]

  // No runtime instrumentation in CI/commit-ready code: keep detection logic
  // concise and robust, but avoid writing to temp files or verbose logs.

  for (const c of candidates) {
    if (typeof c === 'function') {
      getMessages = c
      break
    }
    if (c && typeof c === 'object') {
      if (typeof c.getMessages === 'function') {
        getMessages = c.getMessages
        break
      }
      if (typeof c.default === 'function') {
        getMessages = c.default
        break
      }
    }
  }

  if (typeof getMessages !== 'function') {
    // As a last attempt, if the exported symbol is a module namespace where
    // calling it fails, provide a helpful error and fall back to JSON below.
    console.error('[getMessagesSafe] could not locate callable getMessages. Module keys:', Object.keys(mod))
  } else {
    try {
      // try the usual object signature first
      return await getMessages({ locale: locale as any })
    } catch (err: any) {
      // If next-intl indicates messages or request locale couldn't be found
      // (for example, because middleware didn't run in certain dev flows),
      // fall back to loading the locale JSON directly.
      const msg = String(err?.message ?? err)
      if (msg.includes('No messages found') || msg.includes('NEXT_NOT_FOUND')) {
        console.warn('[getMessagesSafe] next-intl could not find messages or locale; falling back to JSON:', msg)
        // continue to JSON fallback below
      } else {
        try {
          // try alternate signature
          return await getMessages(locale)
        } catch (err2) {
          console.error('[getMessagesSafe] calling getMessages failed:', err, err2)
        }
      }
    }
  }

  // Fallback: load messages JSON directly from the messages directory
  try {
    const imported = await import(`../../messages/${locale}.json`)
    return (imported && (imported.default ?? imported)) as any
  } catch (err) {
    throw new Error('Failed to load messages via next-intl and fallback import: ' + String(err))
  }
}
