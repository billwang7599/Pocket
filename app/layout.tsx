// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
//import Navbar from "@/components/navbar";
import PWABanner from "@/components/PWABanner";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

// --- PWA Constants ---
const APP_NAME = "Pocket - Your Budget App";
//const APP_SHORT_NAME = "Pocket";
const APP_DESCRIPTION =
    "Your web-based budget app, accessible offline and installable.";
const APP_THEME_COLOR = "#000000"; // Example theme color, match your app's primary color
//const APP_BACKGROUND_COLOR = "#ffffff"; // Example background color, for splash screen

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: {
        default: APP_NAME,
        template: `%s | ${APP_NAME}`, // Allows for dynamic page titles
    },
    description: APP_DESCRIPTION,

    // --- PWA Metadata ---
    applicationName: APP_NAME,
    manifest: "/manifest.ts", // Link to your PWA manifest file
    appleWebApp: {
        capable: true,
        statusBarStyle: "default", // Or 'black-translucent'
        title: APP_NAME,
        // If you have specific startup images for iOS, you'd add them here:
        // startupImage: [
        //   '/icons/apple-splash-2048x2732.png',
        //   { url: '/icons/apple-splash-1668x2224.png', media: '(device-width: 834px) and (device-height: 1112px)' },
        // ],
    },
    formatDetection: {
        telephone: false, // Prevents iOS from detecting phone numbers as clickable links
    },
    // Optional: Open Graph and Twitter metadata for social sharing and previews
    openGraph: {
        type: "website",
        siteName: APP_NAME,
        title: {
            default: APP_NAME,
            template: `%s | ${APP_NAME}`,
        },
        description: APP_DESCRIPTION,
        url: defaultUrl,
        // images: [{ url: '/og-image.png' }], // Optional: social sharing image
    },
    twitter: {
        card: "summary", // Or 'summary_large_image' if you have an image
        title: {
            default: APP_NAME,
            template: `%s | ${APP_NAME}`,
        },
        description: APP_DESCRIPTION,
        // images: ['/twitter-image.png'], // Optional: social sharing image
    },
    // --- End PWA Metadata ---
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    minimumScale: 1, // Prevent zooming out
    userScalable: false, // Prevent manual zooming
    viewportFit: "cover", // Ensures content fills entire viewport on notched devices

    // --- PWA Viewport Meta ---
    themeColor: APP_THEME_COLOR, // Sets the browser's theme color (toolbar color)
    // --- End PWA Viewport Meta ---
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
            {/* The <head> tag here is not strictly necessary when using Metadata API,
                as Next.js will inject the metadata automatically.
                However, if you have any custom external scripts or links that are
                NOT handled by the Metadata API, you might keep it.
                For most PWA meta, it's handled by `metadata` and `viewport` exports.
            */}
            {/* <head></head> */}
            <body
                className={`${geistSans.className} antialiased bg-white text-black min-h-screen`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {/* <Navbar /> */}
                    <main className="pt-16">{children}</main>
                    <PWABanner />
                </ThemeProvider>
            </body>
        </html>
    );
}
