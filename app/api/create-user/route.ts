// File: app/api/webhooks/user-created/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ensure you have a prisma client instance

/**
 * This endpoint handles the creation of a new user in your internal database.
 * It's designed to be called as a webhook by an Auth0 Action after a user
 * successfully signs up.
 *
 * SECURITY: This endpoint is protected by a secret bearer token. The Auth0 Action
 * must send this secret in the Authorization header to prove it's a legitimate request.
 */
export async function POST(request: Request) {
    // 1. Verify the secret token from the Authorization header
    const authHeader = request.headers.get("authorization");
    const expectedToken = `Bearer ${process.env.AUTH0_SECRET}`;

    if (!authHeader || authHeader !== expectedToken) {
        // If the token is missing or incorrect, deny access
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        // 2. Parse the incoming request body
        const body = await request.json();
        const { auth0Id, email } = body;

        // 3. Validate the required fields
        if (!auth0Id || !email) {
            return NextResponse.json(
                { error: "auth0Id and email are required" },
                { status: 400 },
            );
        }

        // 4. Check if the user already exists to prevent duplicates
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email: email }, { auth0Id: auth0Id }],
            },
        });

        if (existingUser) {
            // If user exists, it's not an error. The webhook might have been sent twice.
            // Simply return the existing user.
            return NextResponse.json(existingUser, { status: 200 });
        }

        // 5. Create the new user in the database using Prisma
        const newUser = await prisma.user.create({
            data: {
                auth0Id: auth0Id,
                email: email,
            },
        });

        // 6. Return the newly created user with a 201 status code
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        // Handle unexpected errors, such as a database connection issue
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
