// components/InstallPWAButton.tsx (or integrate into Navbar)
"use client"; // This component needs to be a Client Component

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a button component

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>;
    readonly userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
    prompt(): Promise<void>;
}

export default function PWABanner() {
    // Store the beforeinstallprompt event
    const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
    const [showInstallButton, setShowInstallButton] = useState(false);

    useEffect(() => {
        // Listener for the `beforeinstallprompt` event
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault(); // Prevent the default browser prompt (the mini-infobar)
            console.log("beforeinstallprompt event fired");

            // Stash the event so it can be triggered later.
            deferredPrompt.current = e as BeforeInstallPromptEvent;
            // Show your custom install button/UI
            setShowInstallButton(true);
        };

        // Add the event listener when the component mounts
        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt,
        );

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt,
            );
        };
    }, []);

    // Function to handle the install button click
    const handleInstallClick = async () => {
        if (!deferredPrompt.current) {
            console.log("No deferred prompt found.");
            return;
        }

        // Show the browser's install prompt
        deferredPrompt.current.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.current.userChoice;

        // Log user's choice and hide the button
        if (outcome === "accepted") {
            console.log("User accepted the A2HS prompt");
        } else {
            console.log("User dismissed the A2HS prompt");
        }

        // Clear the deferred prompt and hide the button
        deferredPrompt.current = null;
        setShowInstallButton(false);
    };

    if (!showInstallButton) {
        return null; // Don't render the button if the prompt is not available
    }

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white p-3 rounded-lg shadow-lg flex items-center justify-between z-50">
            <span>Add Pocket to your home screen for quick access!</span>
            <Button
                onClick={handleInstallClick}
                className="ml-4 bg-white text-blue-600 hover:bg-gray-100"
            >
                Install App
            </Button>
        </div>
    );
}
