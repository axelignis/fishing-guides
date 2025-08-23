export async function getMessagesSafe(locale: string) {
  // Try next-intl server API first (if available and config is detected)
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - optional import if next-intl is present
    const { getMessages } = await import('next-intl/server')
    const msgs = await getMessages({ locale: locale as any })
    return msgs as any
  } catch (e) {
    // Fallback: import JSON message file directly
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const mod = await import(`@/messages/${locale}.json`)
      return mod?.default ?? mod
    } catch (err) {
      return { app: { title: 'Fallback Title' } }
    }
  }
}
