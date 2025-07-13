import type { NextConfig } from "next";
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";
import withPWA from "next-pwa";

// Determine if we're in development mode
const isDev = process.env.NODE_ENV === "development";

// Define PWA configuration
const pwaConfig = {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: isDev,
    runtimeCaching: [
        {
            urlPattern: /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
            handler: "CacheFirst",
            options: {
                cacheName: "google-fonts-webfonts",
                expiration: {
                    maxEntries: 4,
                    maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
                },
            },
        },
        {
            urlPattern: /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
                cacheName: "google-fonts-stylesheets",
                expiration: {
                    maxEntries: 4,
                    maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
                },
            },
        },
        {
            urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
            handler: "StaleWhileRevalidate",
            options: {
                cacheName: "static-font-assets",
                expiration: {
                    maxEntries: 4,
                    maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
                },
            },
        },
        {
            urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
            handler: "StaleWhileRevalidate",
            options: {
                cacheName: "static-image-assets",
                expiration: {
                    maxEntries: 64,
                    maxAgeSeconds: 24 * 60 * 60, // 24 hours
                },
            },
        },
        {
            urlPattern: /\/_next\/image\?url=.+$/i,
            handler: "StaleWhileRevalidate",
            options: {
                cacheName: "next-image",
                expiration: {
                    maxEntries: 64,
                    maxAgeSeconds: 24 * 60 * 60, // 24 hours
                },
            },
        },
        {
            urlPattern: /\.(?:js)$/i,
            handler: "StaleWhileRevalidate",
            options: {
                cacheName: "static-js-assets",
                expiration: {
                    maxEntries: 32,
                    maxAgeSeconds: 24 * 60 * 60, // 24 hours
                },
            },
        },
        {
            urlPattern: /\.(?:css|less)$/i,
            handler: "StaleWhileRevalidate",
            options: {
                cacheName: "static-style-assets",
                expiration: {
                    maxEntries: 32,
                    maxAgeSeconds: 24 * 60 * 60, // 24 hours
                },
            },
        },
        {
            urlPattern: /\/_next\/data\/.+\/.+\.json$/i,
            handler: "StaleWhileRevalidate",
            options: {
                cacheName: "next-data",
                expiration: {
                    maxEntries: 32,
                    maxAgeSeconds: 24 * 60 * 60, // 24 hours
                },
            },
        },
        {
            urlPattern: /\.(?:json|xml|csv)$/i,
            handler: "NetworkFirst",
            options: {
                cacheName: "static-data-assets",
                expiration: {
                    maxEntries: 32,
                    maxAgeSeconds: 24 * 60 * 60, // 24 hours
                },
            },
        },
        {
            urlPattern: /^\/api\//i,
            handler: "NetworkFirst",
            options: {
                cacheName: "apis",
                expiration: {
                    maxEntries: 16,
                    maxAgeSeconds: 24 * 60 * 60, // 24 hours
                },
            },
        },
    ],
};

// Apply PWA to Next.js config
const nextConfig: NextConfig = withPWA(pwaConfig)({
    webpack: (config) => {
        config.plugins.push(new PrismaPlugin());
        return config;
    },
});

export default nextConfig;
