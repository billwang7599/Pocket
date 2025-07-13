// next.config.mjs
// Using import type for NextConfig for type safety
import type { NextConfig } from "next";
import {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
} from "next/constants";
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";
import withPWAInit from "@ducanh2912/next-pwa";

// Initialize withPWA
const withPWA = withPWAInit({
    dest: "public", // Output directory for service worker and other PWA files
    disable: process.env.NODE_ENV === "development", // Disable PWA in development for easier debugging
    register: true, // Automatically registers the service worker
    // Add other PWA options here if needed, e.g., runtimeCaching, fallbacks
    // runtimeCaching: require('next-pwa/cache'), // Uncomment if you want default caching strategies
});

/** @type {import("next").NextConfig} */
const nextConfig: NextConfig = {
    reactStrictMode: true, // Keep your existing strict mode
    webpack: (config, { isServer }) => {
        // Apply PrismaPlugin only to the server build
        if (isServer) {
            config.plugins.push(new PrismaPlugin());
        }
        return config;
    },
    // Add any other Next.js specific configurations here
};

// Conditionally apply the PWA plugin based on the build phase
// This prevents the PWA plugin from running during `next export` or other specific phases
const config = (phase: string) => {
    if (
        phase === PHASE_DEVELOPMENT_SERVER ||
        phase === PHASE_PRODUCTION_BUILD
    ) {
        // Apply the PWA wrapper to your nextConfig
        return withPWA(nextConfig);
    }
    return nextConfig;
};

export default config;
