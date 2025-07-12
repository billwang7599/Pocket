"use client";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // for App Router
import Link from "next/link";
import Image from "next/image";

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        async function fetchUser() {
            const { data } = await createClient().auth.getUser();
            if (data?.user) {
                router.push("/dashboard");
            }
        }
        fetchUser();
    }, [router]);

    return (
        <main className="min-h-screen flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full bg-white py-12 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="flex-1">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                                Simplify Your{" "}
                                <span className="text-blue-600">Budget</span>{" "}
                                With Pocket
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Budgeting made simple and accessible. Track your
                                finances across all your devices with our
                                intuitive platform.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/auth/sign-up"
                                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-3 text-center transition-colors"
                                >
                                    Get Started Free
                                </Link>
                                <Link
                                    href="/auth/login"
                                    className="inline-block bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg px-6 py-3 text-center transition-colors"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="relative w-full h-[400px] rounded-lg shadow-xl bg-gray-100 overflow-hidden">
                                <div className="absolute inset-0 text-gray-400">
                                    <Image
                                        src="/images/dashboard.png"
                                        alt="Hero Image"
                                        fill
                                        style={{
                                            objectFit: "cover",
                                            objectPosition: "left top",
                                        }}
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="w-full bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Why Choose Pocket?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our simple yet powerful budgeting app helps you take
                            control of your finances with ease.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-blue-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Simple & Fast
                            </h3>
                            <p className="text-gray-600">
                                Get started in minutes with our intuitive
                                interface. No complex setup required.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-blue-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Cross Platform
                            </h3>
                            <p className="text-gray-600">
                                Access your budget from any device with our
                                web-based platform. Always in sync.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-blue-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Insightful Reports
                            </h3>
                            <p className="text-gray-600">
                                Visualize your spending habits with clear
                                reports and make smarter financial decisions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full bg-blue-600 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        Ready to Take Control of Your Finances?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                        Join thousands of users who have simplified their
                        budgeting with Pocket.
                    </p>
                    <Link
                        href="/auth/sign-up"
                        className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-medium rounded-lg px-8 py-3 text-lg transition-colors"
                    >
                        Start Your Free Account
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full bg-gray-900 text-gray-400 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-8 md:mb-0">
                            <h3 className="text-2xl font-bold text-white mb-2">
                                Pocket
                            </h3>
                            <p>Simple budgeting for everyone</p>
                        </div>
                        <div>
                            <ul className="flex gap-8">
                                <li>
                                    <Link
                                        href="/auth/login"
                                        className="hover:text-white transition-colors"
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/auth/sign-up"
                                        className="hover:text-white transition-colors"
                                    >
                                        Sign Up
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
                        <p>
                            &copy; {new Date().getFullYear()} Pocket. All rights
                            reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
