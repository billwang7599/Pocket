import type { Metadata } from "next";
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
    },
    icons: {
        apple: [{ url: "/icons/apple-touch-icon.png" }],
    },
    themeColor: "#2563eb",
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
                <link
                    rel="apple-touch-icon"
                    href="/icons/apple-touch-icon.png"
                />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="black-translucent"
                />
                <meta name="apple-mobile-web-app-title" content="Pocket" />
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
