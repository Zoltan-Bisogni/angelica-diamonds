import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Abilita l'ottimizzazione delle immagini
    formats: ['image/webp', 'image/avif'],
    // Dimensioni predefinite per il responsive loading
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Abilita placeholder blur
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Compressione
  compress: true,
  // Experimental features per performance
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
  }
};

export default nextConfig;
