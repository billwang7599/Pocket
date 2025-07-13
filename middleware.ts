// middleware.ts
import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    // If the request path is for PWA assets, bypass updateSession.
    // This check here is redundant if the matcher is perfect, but adds an extra layer of safety.
    // The matcher is the primary mechanism for exclusion.
    // This line is often part of the 'updateSession' logic itself (e.g., if it's a static file, return next()).
    // For now, let's rely on the matcher.
    return await updateSession(request);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - manifest.json (PWA manifest, for older links/compatibility)
         * - manifest.webmanifest (PWA manifest, standard for App Router)  <-- NEW ADDITION
         * - sw.js (service worker)
         * - workbox-*.js (Workbox runtime files)
         * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
         * - _next/data (data for SSG/SSR pages - generally good to exclude)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|manifest.json|manifest.webmanifest|sw.js|workbox-.*\\.js$|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|_next/data).*)",
    ],
};
