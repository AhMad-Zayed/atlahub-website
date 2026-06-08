const { withPayload } = require('@payloadcms/next/withPayload');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Next.js handles images automatically, but we might want to specify domains if requested later
};

module.exports = withPayload(nextConfig);
