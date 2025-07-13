import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Pocket - Budget App",
        short_name: "Pocket",
        description:
            "Your web-based budget app that makes budgeting simple and accessible cross platform",
        start_url: "/dashboard",
        display: "standalone",
        display_override: ["standalone", "fullscreen", "minimal-ui"],
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#2563eb",
        id: "/",
        scope: "/",
        categories: ["finance", "productivity", "utilities"],
        launch_handler: {
            client_mode: "focus-existing",
        },
        prefer_related_applications: false,
        icons: [
            {
                src: "/icons/icon-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icons/icon-256x256.png",
                sizes: "256x256",
                type: "image/png",
            },
            {
                src: "/icons/icon-384x384.png",
                sizes: "384x384",
                type: "image/png",
            },
            {
                src: "/icons/icon-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "/icons/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
                purpose: "any",
            },
        ],
        screenshots: [
            {
                src: "/screenshots/screenshot1.png",
                type: "image/png",
                sizes: "1280x720",
                form_factor: "wide",
            },
            {
                src: "/screenshots/screenshot2.png",
                type: "image/png",
                sizes: "750x1334",
                form_factor: "narrow",
            },
        ],
    };
}
