import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: 'standalone', // Required for Cloud Run
  images: {
    domains: ["images.unsplash.com", "back.firststep-app.com"],
  },
};

console.log('Next.js config loaded with domains:', nextConfig.images?.domains);

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);