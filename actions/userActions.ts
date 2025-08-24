import { auth0 } from "@/lib/auth0";
import prisma from "@/lib/prisma";

export async function getUserbyAuth0Id() {
    const session = await auth0.getSession();

    if (!session) {
        // Return null or throw a custom error
        return null; // or throw new Error("Unauthorized")
    }

    const auth0Id = session.user.sub;

    if (!auth0Id) {
        return null; // or throw new Error("Auth0 user ID not found")
    }

    try {
        // Find the user in the database
        const internalUser = await prisma.user.findUnique({
            where: { auth0Id: auth0Id },
        });

        // Just return the user (could be null if not found)
        return internalUser;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error; // Let the caller handle the error
    }
}
