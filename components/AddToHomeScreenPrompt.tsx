"use client";

import { useEffect, useState } from "react";

// Define interface for iOS-specific navigator properties
interface NavigatorWithStandalone extends Navigator {
    standalone?: boolean;
}

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
    prompt(): Promise<void>;
}

export const AddToHomeScreenPrompt = () => {
    const [showPrompt, setShowPrompt] = useState(false);
    const [deferredPrompt, setDeferredPrompt] =
        useState<BeforeInstallPromptEvent | null>(null);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Function to check if the app is already in standalone mode (added to home screen)
        const isInStandaloneMode = () => {
            const navigator = window.navigator as NavigatorWithStandalone;
            return (
                window.matchMedia("(display-mode: standalone)").matches ||
                navigator.standalone === true ||
                window.matchMedia("(display-mode: fullscreen)").matches ||
                window.matchMedia("(display-mode: minimal-ui)").matches
            );
        };

        // Function to check if the device is iOS
        const checkIsIOS = () => {
            const userAgent = window.navigator.userAgent.toLowerCase();
            const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
            const isSafari =
                /safari/.test(userAgent) &&
                !/chrome|crios|fxios/.test(userAgent);
            return isIOSDevice && isSafari;
        };

        // Function to check if prompt has been dismissed before
        const hasPromptBeenDismissed = () => {
            try {
                const dismissed = localStorage.getItem("pwaPromptDismissed");
                const dismissedTime = localStorage.getItem(
                    "pwaPromptDismissedTime",
                );

                if (dismissed === "true" && dismissedTime) {
                    const timeDiff = Date.now() - parseInt(dismissedTime);
                    // Show prompt again after 7 days
                    return timeDiff < 7 * 24 * 60 * 60 * 1000;
                }
                return dismissed === "true";
            } catch (e) {
                console.error("Error checking prompt dismissal:", e);
                return false;
            }
        };

        const iosDevice = checkIsIOS();
        setIsIOS(iosDevice);

        // Handle Android PWA prompt
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            if (!hasPromptBeenDismissed()) {
                setTimeout(() => setShowPrompt(true), 3000);
            }
        };

        // Check if we should show the iOS prompt
        if (iosDevice && !isInStandaloneMode() && !hasPromptBeenDismissed()) {
            // Delay showing the prompt by 3 seconds for better UX
            const timer = setTimeout(() => {
                setShowPrompt(true);
            }, 3000);

            return () => clearTimeout(timer);
        }

        // Listen for Android install prompt
        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt,
        );

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt,
            );
        };
    }, []);

    // Function to handle dismissing the prompt
    const dismissPrompt = () => {
        try {
            localStorage.setItem("pwaPromptDismissed", "true");
            localStorage.setItem(
                "pwaPromptDismissedTime",
                Date.now().toString(),
            );
        } catch (e) {
            console.error("Error dismissing prompt:", e);
        }
        setShowPrompt(false);
    };

    // Function to handle the install button click
    const handleInstallClick = async () => {
        if (deferredPrompt) {
            try {
                await deferredPrompt.prompt();
                const choiceResult = await deferredPrompt.userChoice;
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the install prompt");
                }
                setDeferredPrompt(null);
                setShowPrompt(false);
            } catch (error) {
                console.error("Error during installation:", error);
            }
        }
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg z-50 animate-slide-up">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex-1 mr-4">
                    <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="text-blue-600 font-bold text-sm">
                                P
                            </span>
                        </div>
                        <div>
                            <p className="font-semibold text-lg">
                                Install Pocket
                            </p>
                            <p className="text-blue-100 text-sm">
                                Add to your home screen for quick access
                            </p>
                        </div>
                    </div>

                    {isIOS ? (
                        <div className="flex items-center text-sm text-blue-100">
                            <span className="mr-2">Tap</span>
                            <div className="inline-flex items-center bg-blue-500 rounded px-2 py-1 mr-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8zM21 16v-1.5C21 12.57 19.43 11 17.5 11H16V7.5C16 5.57 14.43 4 12.5 4S9 5.57 9 7.5V11H7.5C5.57 11 4 12.57 4 14.5V21c0 .55.45 1 1 1h15c.55 0 1-.45 1-1v-6.5c0-.55-.45-1-1-1zM11 7.5C11 6.67 11.67 6 12.5 6S14 6.67 14 7.5V11h-3V7.5zM20 21H5v-6h15v6z" />
                                    <path d="M7 16h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z" />
                                </svg>
                            </div>
                            <span>then &ldquo;Add to Home Screen&rdquo;</span>
                        </div>
                    ) : (
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={handleInstallClick}
                                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors"
                            >
                                Install App
                            </button>
                        </div>
                    )}
                </div>

                <button
                    onClick={dismissPrompt}
                    className="p-2 text-white hover:bg-blue-500 rounded-lg transition-colors flex-shrink-0"
                    aria-label="Dismiss prompt"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default AddToHomeScreenPrompt;
