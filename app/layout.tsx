import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/navbar";
import AddToHomeScreenPrompt from "@/components/AddToHomeScreenPrompt";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Pocket",
    description: "Your web-based budget app",
    manifest: "/manifest.json",
    appleWebApp: {
        title: "Pocket",
        statusBarStyle: "black-translucent",
        capable: true,
        startupImage: [
            // iPhone 5/SE
            {
                url: "/icons/apple-splash-640-1136.png",
                media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            },
            {
                url: "/icons/apple-splash-1136-640.png",
                media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
            },
            // iPhone 6/7/8
            {
                url: "/icons/apple-splash-750-1334.png",
                media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            },
            {
                url: "/icons/apple-splash-1334-750.png",
                media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
            },
            // iPhone 6/7/8 Plus
            {
                url: "/icons/apple-splash-1242-2208.png",
                media: "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
            },
            {
                url: "/icons/apple-splash-2208-1242.png",
                media: "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
            },
            // iPhone X/XS
            {
                url: "/icons/apple-splash-1125-2436.png",
                media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
            },
            {
                url: "/icons/apple-splash-2436-1125.png",
                media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
            },
            // iPhone 11/XR
            {
                url: "/icons/apple-splash-828-1792.png",
                media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            },
            {
                url: "/icons/apple-splash-1792-828.png",
                media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
            },
            // iPhone 12/12 Pro
            {
                url: "/icons/apple-splash-1170-2532.png",
                media: "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
            },
            {
                url: "/icons/apple-splash-2532-1170.png",
                media: "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
            },
            // iPhone 12 Pro Max/13/14 Plus
            {
                url: "/icons/apple-splash-1284-2778.png",
                media: "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
            },
            {
                url: "/icons/apple-splash-2778-1284.png",
                media: "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
            },
            // iPhone 14 Pro/15 Pro
            {
                url: "/icons/apple-splash-1179-2556.png",
                media: "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
            },
            {
                url: "/icons/apple-splash-2556-1179.png",
                media: "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
            },
            // iPhone 14 Pro Max/15 Pro Max
            {
                url: "/icons/apple-splash-1290-2796.png",
                media: "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
            },
            {
                url: "/icons/apple-splash-2796-1290.png",
                media: "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
            },
            // iPad 9.7"
            {
                url: "/icons/apple-splash-1536-2048.png",
                media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            },
            {
                url: "/icons/apple-splash-2048-1536.png",
                media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
            },
            // iPad 10.5"
            {
                url: "/icons/apple-splash-1668-2224.png",
                media: "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            },
            {
                url: "/icons/apple-splash-2224-1668.png",
                media: "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
            },
            // iPad 11"
            {
                url: "/icons/apple-splash-1668-2388.png",
                media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            },
            {
                url: "/icons/apple-splash-2388-1668.png",
                media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
            },
            // iPad 12.9"
            {
                url: "/icons/apple-splash-2048-2732.png",
                media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            },
            {
                url: "/icons/apple-splash-2732-2048.png",
                media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
            },
        ],
    },
    icons: {
        apple: [
            { url: "/icons/apple-touch-icon-57x57.png", sizes: "57x57" },
            { url: "/icons/apple-touch-icon-60x60.png", sizes: "60x60" },
            { url: "/icons/apple-touch-icon-72x72.png", sizes: "72x72" },
            { url: "/icons/apple-touch-icon-76x76.png", sizes: "76x76" },
            { url: "/icons/apple-touch-icon-114x114.png", sizes: "114x114" },
            { url: "/icons/apple-touch-icon-120x120.png", sizes: "120x120" },
            { url: "/icons/apple-touch-icon-144x144.png", sizes: "144x144" },
            { url: "/icons/apple-touch-icon-152x152.png", sizes: "152x152" },
            { url: "/icons/apple-touch-icon-180x180.png", sizes: "180x180" },
        ],
        icon: [
            { url: "/icons/icon-192x192.png", sizes: "192x192" },
            { url: "/icons/icon-512x512.png", sizes: "512x512" },
        ],
    },
};

export const viewport: Viewport = {
    themeColor: "#2563eb",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
};

const geistSans = Geist({
    variable: "--font-geist-sans",
    display: "swap",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="black-translucent"
                />
                <meta name="apple-mobile-web-app-title" content="Pocket" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="application-name" content="Pocket" />

                {/* iOS PWA specific meta tags */}
                <meta name="apple-touch-fullscreen" content="yes" />
                <meta
                    name="apple-mobile-web-app-orientations"
                    content="portrait"
                />
                <meta name="HandheldFriendly" content="True" />
                <meta name="MobileOptimized" content="320" />
                <meta name="msapplication-TileColor" content="#2563eb" />
                <meta name="msapplication-config" content="none" />
                <meta name="full-screen" content="yes" />
                <meta name="browsermode" content="application" />
                <meta name="x5-orientation" content="portrait" />
                <meta name="x5-fullscreen" content="true" />
                <meta name="x5-page-mode" content="app" />

                {/* Apple Touch Icons */}
                <link
                    rel="apple-touch-icon"
                    sizes="57x57"
                    href="/icons/apple-touch-icon-57x57.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="60x60"
                    href="/icons/apple-touch-icon-60x60.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="72x72"
                    href="/icons/apple-touch-icon-72x72.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="76x76"
                    href="/icons/apple-touch-icon-76x76.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="114x114"
                    href="/icons/apple-touch-icon-114x114.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="120x120"
                    href="/icons/apple-touch-icon-120x120.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="144x144"
                    href="/icons/apple-touch-icon-144x144.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="152x152"
                    href="/icons/apple-touch-icon-152x152.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/icons/apple-touch-icon-180x180.png"
                />

                {/* Standard Icons */}
                <link
                    rel="icon"
                    type="image/png"
                    sizes="192x192"
                    href="/icons/icon-192x192.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="512x512"
                    href="/icons/icon-512x512.png"
                />
                <link
                    rel="mask-icon"
                    href="/icons/safari-pinned-tab.svg"
                    color="#2563eb"
                />
                <link rel="shortcut icon" href="/favicon.ico" />
            </head>
            <body
                className={`${geistSans.className} antialiased bg-white text-black min-h-screen`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />
                    <main className="pt-16">{children}</main>
                    <AddToHomeScreenPrompt />
                </ThemeProvider>
            </body>
        </html>
    );
}
