// CommonJS config for next-intl runtime detection
module.exports = {
  locales: ['es', 'en'],
  defaultLocale: 'es',
  messagesDirectory: './messages',
}
// CommonJS config for next-intl - ensure runtime discovery in Next dev
module.exports = {
  locales: ['es', 'en'],
  defaultLocale: 'es',
  // Where message JSON files live relative to project root
  messagesDirectory: './messages'
}
// CommonJS fallback for next-intl detection in dev.
module.exports = {
  locales: ['es', 'en'],
  defaultLocale: 'es',
}
