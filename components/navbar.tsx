"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const supabase = createClient(); // Initialize your Supabase client
    const [authenticated, setAuthenticated] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        supabase.auth.getUser().then((response) => {
            setAuthenticated(response.data.user !== null);
        });
    }, [supabase, pathname]);

    return <>{authenticated ? loggedInNavbar() : loggedOutNavbar()}</>;
}

function loggedInNavbar() {
    const navItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Settings", href: "/settings" },
    ];

    return (
        <nav className="bg-transparent shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/dashboard">
                                <span className="text-xl font-bold text-blue-600">
                                    Pocket
                                </span>
                            </Link>
                        </div>
                        <div className="ml-6 flex space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function loggedOutNavbar() {
    const navItems = [
        { label: "Login", href: "/auth/login" },
        { label: "Register", href: "/auth/sign-up" },
    ];

    return (
        <nav className="bg-transparent shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/">
                                <span className="text-xl font-bold text-blue-600">
                                    Pocket
                                </span>
                            </Link>
                        </div>
                        <div className="ml-6 flex space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
