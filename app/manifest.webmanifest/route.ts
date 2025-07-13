import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const host = request.headers.get("host") || "localhost:3000";
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const baseUrl = `${protocol}://${host}`;

    const manifest = {
        name: "Pocket - Budget App",
        short_name: "Pocket",
        description: "Your web-based budget app that makes budgeting simple and accessible cross platform",
        start_url: "/",
        display: "standalone",
        display_override: ["standalone", "fullscreen", "minimal-ui"],
        orientation: "portrait-primary",
        background_color: "#ffffff",
        theme_color: "#2563eb",
        id: "/",
        scope: "/",
        categories: ["finance", "productivity", "utilities"],
        lang: "en-US",
        dir: "ltr",
        launch_handler: {
            client_mode: "focus-existing"
        },
        prefer_related_applications: false,
        edge_side_panel: {
            preferred_width: 400
        },
        icons: [
            {
                src: `${baseUrl}/icons/icon-192x192.png`,
                sizes: "192x192",
                type: "image/png",
                purpose: "any"
            },
            {
                src: `${baseUrl}/icons/icon-512x512.png`,
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: `${baseUrl}/icons/apple-touch-icon-180x180.png`,
                sizes: "180x180",
                type: "image/png",
                purpose: "any"
            },
            {
                src: `${baseUrl}/icons/apple-touch-icon-152x152.png`,
                sizes: "152x152",
                type: "image/png",
                purpose: "any"
            },
            {
                src: `${baseUrl}/icons/apple-touch-icon-144x144.png`,
                sizes: "144x144",
                type: "image/png",
                purpose: "any"
            },
            {
                src: `${baseUrl}/icons/apple-touch-icon-120x120.png`,
                sizes: "120x120",
                type: "image/png",
                purpose: "any"
            },
            {
                src: `${baseUrl}/icons/apple-touch-icon-114x114.png`,
                sizes: "114x114",
                type: "image/png",
                purpose: "any"
            },
            {
                src: `${baseUrl}/icons/apple-touch-icon-76x76.png`,
                sizes: "76x76",
                type: "image/png",
                purpose: "any"
            },
            {
                src: `${baseUrl}/icons/apple-touch-icon-72x72.png`,
                sizes: "72x72",
                type: "image/png",
                purpose: "any"
            },
            {
                src: `${baseUrl}/icons/apple-touch-icon-60x60.png`,
                sizes: "60x60",
                type: "image/png",
                purpose: "any"
            },
            {
                src: `${baseUrl}/icons/apple-touch-icon-57x57.png`,
                sizes: "57x57",
                type: "image/png",
                purpose: "any"
            }
        ],
        shortcuts: [
            {
                name: "Add Transaction",
                short_name: "Add",
                description: "Add a new transaction",
                url: "/add-transaction",
                icons: [
                    {
                        src: `${baseUrl}/icons/icon-192x192.png`,
                        sizes: "192x192"
                    }
                ]
            },
            {
                name: "View Budget",
                short_name: "Budget",
                description: "View your budget overview",
                url: "/budget",
                icons: [
                    {
                        src: `${baseUrl}/icons/icon-192x192.png`,
                        sizes: "192x192"
                    }
                ]
            }
        ],
        screenshots: [
            {
                src: `${baseUrl}/screenshots/screenshot1.png`,
                type: "image/png",
                sizes: "1280x720",
                form_factor: "wide"
            },
            {
                src: `${baseUrl}/screenshots/screenshot2.png`,
                type: "image/png",
                sizes: "750x1334",
                form_factor: "narrow"
            }
        ]
    };

    return new Response(JSON.stringify(manifest, null, 2), {
        headers: {
            "Content-Type": "application/manifest+json",
            "Cache-Control": "public, max-age=3600"
        }
    });
}
