"use client";
import { hasEnvVars } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // for App Router
import Link from "next/link";

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
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
                <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
                    <main className="flex-1 flex flex-col gap-6 px-4">
                        <h2 className="font-medium text-xl mb-4">Next steps</h2>
                        {hasEnvVars ?? (
                            <div>
                                <Link href="/auth/sign-up">
                                    Sign up with email
                                </Link>
                                <Link href="/auth/login">
                                    Sign in with email
                                </Link>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </main>
    );
}
