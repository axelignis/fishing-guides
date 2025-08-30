const withNextIntl = require('next-intl/plugin')('./next-intl.config.cjs');

/** @type {import('next').NextConfig} */
module.exports = withNextIntl({
  // Keep existing defaults; add any other Next config here if needed.
});
