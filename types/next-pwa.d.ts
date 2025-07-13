declare module 'next-pwa' {
  import { NextConfig } from 'next';

  interface PWAConfig {
    /**
     * The directory where PWA files will be saved
     * @default "public"
     */
    dest?: string;

    /**
     * Whether to disable the PWA functionality
     * Useful for disabling in development mode
     * @default false
     */
    disable?: boolean;

    /**
     * Register the service worker
     * @default true
     */
    register?: boolean;

    /**
     * Use the skipWaiting option in the service worker
     * @default true
     */
    skipWaiting?: boolean;

    /**
     * Runtime caching configuration
     */
    runtimeCaching?: Array<{
      urlPattern: RegExp | string;
      handler: string;
      options?: {
        cacheName?: string;
        expiration?: {
          maxEntries?: number;
          maxAgeSeconds?: number;
        };
        cacheableResponse?: {
          statuses?: number[];
          headers?: Record<string, string>;
        };
      };
    }>;

    /**
     * Path to a custom service worker file
     * @default undefined
     */
    swSrc?: string;

    /**
     * Path where the service worker will be saved
     * @default "sw.js"
     */
    swDest?: string;

    /**
     * Whether to build standalone service worker files
     * @default true
     */
    buildExcludes?: Array<string | RegExp> | null;
  }

  /**
   * Wraps a Next.js config object with PWA functionality
   * @param config PWA configuration object
   * @returns A higher-order function that wraps Next.js config
   */
  function withPWA(config?: PWAConfig):
    (nextConfig: NextConfig) => NextConfig;

  export = withPWA;
}
