"use client";

import { useEffect, useState } from "react";

// Define interface for iOS-specific navigator properties
interface NavigatorWithStandalone extends Navigator {
    standalone?: boolean;
}

export const AddToHomeScreenPrompt = () => {
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        // Function to check if the app is already in standalone mode (added to home screen)
        const isInStandaloneMode = () => {
            const navigator = window.navigator as NavigatorWithStandalone;
            return (
                window.matchMedia("(display-mode: standalone)").matches ||
                navigator.standalone === true
            );
        };

        // Function to check if the device is iOS
        const isIOS = () => {
            const userAgent = window.navigator.userAgent.toLowerCase();
            return /iphone|ipad|ipod/.test(userAgent);
        };

        // Function to check if prompt has been dismissed before
        const hasPromptBeenDismissed = () => {
            try {
                return localStorage.getItem("pwaPromptDismissed") === "true";
            } catch (e) {
                // In case localStorage is not available
                console.error("Error checking prompt dismissal:", e);
                return false;
            }
        };

        // Check if we should show the prompt
        if (isIOS() && !isInStandaloneMode() && !hasPromptBeenDismissed()) {
            // Delay showing the prompt by 2 seconds to not interrupt initial page load experience
            const timer = setTimeout(() => {
                setShowPrompt(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, []);

    // Function to handle dismissing the prompt
    const dismissPrompt = () => {
        try {
            localStorage.setItem("pwaPromptDismissed", "true");
        } catch (e) {
            // Silent fail if localStorage is not available
            console.error("Error dismissing prompt:", e);
        }
        setShowPrompt(false);
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 shadow-lg z-50">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex-1">
                    <p className="font-medium">
                        Install Pocket to your Home Screen
                    </p>
                    <p className="text-sm text-blue-100">
                        Tap{" "}
                        <span className="inline-block">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 inline"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                        <span>{`then "Add to Home Screen"`}</span>
                    </p>
                </div>
                <button
                    onClick={dismissPrompt}
                    className="p-2 text-white"
                    aria-label="Dismiss prompt"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default AddToHomeScreenPrompt;
