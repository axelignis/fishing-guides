export async function getMessagesSafe(locale: string) {
  // Use next-intl server API (requires a valid next-intl config to be present)
  // This will throw if next-intl cannot find its config; we intentionally
  // surface the error so developers can fix their configuration.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { getMessages } = await import('next-intl/server')
  const msgs = await getMessages({ locale: locale as any })
  return msgs as any
}
