"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PwaTestPage() {
    const [isPwa, setIsPwa] = useState<boolean | null>(null);
    const [userAgent, setUserAgent] = useState<string>("");
    const [isIOS, setIsIOS] = useState<boolean | null>(null);
    const [isStandalone, setIsStandalone] = useState<boolean | null>(null);
    const [displayMode, setDisplayMode] = useState<string>("");
    const [iosVersion, setIosVersion] = useState<string>("");
    const [safariVersion, setSafariVersion] = useState<string>("");

    useEffect(() => {
        // Get user agent
        const ua = window.navigator.userAgent;
        setUserAgent(ua);

        // Check if iOS
        const ios = /iphone|ipad|ipod/.test(ua.toLowerCase());
        setIsIOS(ios);

        // Get iOS version
        if (ios) {
            const iosVersionMatch = ua.match(/OS (\d+)_(\d+)_?(\d+)?/);
            if (iosVersionMatch) {
                const version = `${iosVersionMatch[1]}.${iosVersionMatch[2]}${
                    iosVersionMatch[3] ? `.${iosVersionMatch[3]}` : ""
                }`;
                setIosVersion(version);
            }

            // Get Safari version
            const safariMatch = ua.match(/Version\/(\d+\.\d+)/);
            if (safariMatch) {
                setSafariVersion(safariMatch[1]);
            }
        }

        // Define type for iOS Safari's navigator object
        interface SafariNavigator extends Navigator {
            standalone?: boolean;
        }

        // Check if in standalone mode
        const standalone =
            ("standalone" in window.navigator &&
                (window.navigator as SafariNavigator).standalone === true) ||
            window.matchMedia("(display-mode: standalone)").matches;

        setIsStandalone(standalone);

        // Check display mode
        if (window.matchMedia("(display-mode: standalone)").matches) {
            setDisplayMode("standalone");
        } else if (window.matchMedia("(display-mode: fullscreen)").matches) {
            setDisplayMode("fullscreen");
        } else if (window.matchMedia("(display-mode: minimal-ui)").matches) {
            setDisplayMode("minimal-ui");
        } else {
            setDisplayMode("browser");
        }

        // Determine if running as PWA
        setIsPwa(standalone);
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">iOS PWA Diagnostic</h1>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-xl font-semibold mb-2">
                    {isPwa
                        ? "✅ Running as PWA"
                        : isPwa === false
                          ? "❌ Not running as PWA"
                          : "Loading..."}
                </p>

                <p className="text-lg">
                    Display Mode:{" "}
                    <span className="font-mono">{displayMode}</span>
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
                <InfoCard
                    title="Device Type"
                    value={isIOS ? "iOS Device" : "Non-iOS Device"}
                    status={isIOS !== null ? "loaded" : "loading"}
                />

                <InfoCard
                    title="Standalone Mode"
                    value={isStandalone ? "Yes" : "No"}
                    status={isStandalone !== null ? "loaded" : "loading"}
                />

                {isIOS && (
                    <>
                        <InfoCard
                            title="iOS Version"
                            value={iosVersion || "Unknown"}
                            status="loaded"
                        />
                        <InfoCard
                            title="Safari Version"
                            value={safariVersion || "Unknown"}
                            status="loaded"
                        />
                    </>
                )}
            </div>

            <div className="border border-gray-200 rounded-lg p-4 mb-8">
                <h2 className="font-semibold mb-2">User Agent</h2>
                <p className="bg-gray-50 p-2 rounded text-xs font-mono break-words">
                    {userAgent}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="font-bold text-xl mb-4">
                        Core PWA Requirements
                    </h2>
                    <div className="space-y-2">
                        <RequirementCheck
                            title="Manifest File"
                            description="Web app manifest accessible"
                            url="/manifest.json"
                        />

                        <RequirementCheck
                            title="Service Worker"
                            description="Service worker registration available"
                            check={() => "serviceWorker" in navigator}
                        />

                        <RequirementCheck
                            title="HTTPS Connection"
                            description="Running on secure connection"
                            check={() =>
                                window.location.protocol === "https:" ||
                                window.location.hostname === "localhost"
                            }
                        />

                        <RequirementCheck
                            title="Viewport Meta Tag"
                            description="Proper viewport configuration"
                            check={() =>
                                document.querySelector(
                                    'meta[name="viewport"]',
                                ) !== null
                            }
                        />
                    </div>
                </div>

                <div>
                    <h2 className="font-bold text-xl mb-4">
                        iOS-Specific Requirements
                    </h2>
                    <div className="space-y-2">
                        <RequirementCheck
                            title="Apple Web App Capable"
                            description="apple-mobile-web-app-capable meta tag"
                            check={() =>
                                document.querySelector(
                                    'meta[name="apple-mobile-web-app-capable"][content="yes"]',
                                ) !== null
                            }
                        />

                        <RequirementCheck
                            title="Apple Web App Title"
                            description="apple-mobile-web-app-title meta tag"
                            check={() =>
                                document.querySelector(
                                    'meta[name="apple-mobile-web-app-title"]',
                                ) !== null
                            }
                        />

                        <RequirementCheck
                            title="Apple Touch Icon"
                            description="Apple touch icon 180x180"
                            url="/icons/apple-touch-icon-180x180.png"
                        />

                        <RequirementCheck
                            title="Apple Splash Screens"
                            description="iPhone splash screen present"
                            url="/icons/apple-splash-1170-2532.png"
                        />

                        <RequirementCheck
                            title="Status Bar Style"
                            description="apple-mobile-web-app-status-bar-style"
                            check={() =>
                                document.querySelector(
                                    'meta[name="apple-mobile-web-app-status-bar-style"]',
                                ) !== null
                            }
                        />

                        <RequirementCheck
                            title="Safari Pinned Tab"
                            description="Safari pinned tab icon"
                            url="/icons/safari-pinned-tab.svg"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">
                    📱 iOS Installation Instructions
                </h3>
                <ol className="text-yellow-700 text-sm space-y-1">
                    <li>1. Open this app in Safari on iOS</li>
                    <li>2. Tap the Share button (square with arrow up)</li>
                    <li>
                        3. Scroll down and tap &ldquo;Add to Home Screen&rdquo;
                    </li>
                    <li>4. Tap &ldquo;Add&rdquo; to confirm</li>
                    <li>5. The app icon will appear on your home screen</li>
                    <li>
                        6. Launch from home screen to run in standalone mode
                    </li>
                </ol>
            </div>

            <div className="mt-6">
                <Link
                    href="/dashboard"
                    className="text-blue-600 hover:underline"
                >
                    ← Back to Dashboard
                </Link>
            </div>
        </div>
    );
}

function InfoCard({
    title,
    value,
    status,
}: {
    title: string;
    value: string;
    status: "loading" | "loaded";
}) {
    return (
        <div className="border border-gray-200 rounded-lg p-4">
            <h2 className="font-semibold mb-1">{title}</h2>
            {status === "loading" ? (
                <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
            ) : (
                <p className="text-lg">{value}</p>
            )}
        </div>
    );
}

function RequirementCheck({
    title,
    description,
    check,
    url,
}: {
    title: string;
    description: string;
    check?: () => boolean;
    url?: string;
}) {
    const [isValid, setIsValid] = useState<boolean | null>(null);

    useEffect(() => {
        if (check) {
            try {
                setIsValid(check());
            } catch (e) {
                console.log(e);
                setIsValid(false);
            }
        } else if (url) {
            fetch(url)
                .then((res) => setIsValid(res.ok))
                .catch(() => setIsValid(false));
        }
    }, [check, url]);

    return (
        <div className="flex items-start gap-2 p-2 bg-gray-50 rounded">
            <div className="mt-0.5">
                {isValid === null ? (
                    <div className="w-5 h-5 rounded-full bg-gray-200 animate-pulse"></div>
                ) : isValid ? (
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white">
                        ✓
                    </div>
                ) : (
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white">
                        ×
                    </div>
                )}
            </div>
            <div>
                <h3 className="font-medium">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    );
}
