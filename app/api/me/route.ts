// File: app/api/me/route.ts
import { NextResponse } from "next/server";
import { getUserbyAuth0Id } from "@/actions/userActions";

export async function GET() {
    try {
        const user = await getUserbyAuth0Id();

        if (!user) {
            // No user found or unauthorized
            return NextResponse.json(
                { error: "User not found or unauthorized" },
                { status: 401 },
            );
        }

        // Return the user data
        return NextResponse.json(user);
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
