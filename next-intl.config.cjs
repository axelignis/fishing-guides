// CommonJS config for next-intl runtime detection
// Export a function so the next-intl runtime can call it (supports
// dynamic getRequestConfig signatures). Accepts an optional context arg.
module.exports = function getNextIntlConfig(/* ctx */) {
  return {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    // Where message JSON files live relative to project root
    messagesDirectory: './messages',
  }
}
