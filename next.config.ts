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
};

// Apply PWA to Next.js config
const nextConfig: NextConfig = withPWA(pwaConfig)({
    webpack: (config) => {
        config.plugins.push(new PrismaPlugin());
        return config;
    },
});

export default nextConfig;
