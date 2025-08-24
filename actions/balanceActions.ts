"use server";
import { Balance } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Get top-level balances for a user (balances without a parent)
 */
export const getTopBalances = async (userId: string): Promise<Balance[]> => {
    try {
        const balances = await prisma.balance.findMany({
            where: { userId, parentId: null },
        });
        return balances;
    } catch (error) {
        console.error("Error fetching top balances:", error);
        throw error;
    }
};

/**
 * Get child balances for a specific parent balance
 */
export const getChildBalances = async (
    userId: string,
    parentId: string,
): Promise<Balance[]> => {
    try {
        const balances = await prisma.balance.findMany({
            where: { userId, parentId },
        });
        return balances;
    } catch (error) {
        console.error("Error fetching child balances:", error);
        throw error;
    }
};

/**
 * Get the total amount across all balances for a user
 */
export const getUserTotal = async (userId: string): Promise<number> => {
    try {
        const balances = await prisma.balance.findMany({
            where: { userId, active: true },
        });
        const total = balances.reduce(
            (acc, balance) => acc + balance.amount,
            0,
        );
        return total;
    } catch (error) {
        console.error("Error calculating user total:", error);
        throw error;
    }
};

/**
 * Recursively calculate the total for a balance including all its children
 */
export async function getBalanceTotal(
    userId: string,
    balanceId: string,
): Promise<number> {
    try {
        const currentBalance = await prisma.balance.findUnique({
            where: {
                id: balanceId,
                userId,
            },
        });

        if (!currentBalance) {
            throw new Error(
                `Balance not found for user ${userId} and balance ${balanceId}`,
            );
        }

        const childBalances = await prisma.balance.findMany({
            where: {
                userId,
                parentId: balanceId,
                active: true,
            },
        });

        const childTotals = await Promise.all(
            childBalances.map(async (childBalance) => {
                return await getBalanceTotal(userId, childBalance.id);
            }),
        );

        const total = childTotals.reduce(
            (acc, curr) => acc + curr,
            currentBalance.amount,
        );

        return total;
    } catch (error) {
        console.error(
            `Error calculating balance total for ${balanceId}:`,
            error,
        );
        throw error;
    }
}

/**
 * Create a new balance
 */
export const createBalance = async (
    userId: string,
    name: string,
    parentId: string | null,
    amount: number,
    currencyId: number,
): Promise<Balance> => {
    try {
        const balance = await prisma.balance.create({
            data: {
                userId,
                name,
                parentId,
                amount,
                currencyId,
            },
        });

        // Revalidate the parent balance page if it exists
        if (parentId) {
            revalidatePath(`/balances/${parentId}`);
        }

        // Always revalidate the balances page
        revalidatePath("/balances");

        return balance;
    } catch (error) {
        console.error("Error creating balance:", error);
        throw error;
    }
};

/**
 * Get a specific balance by ID
 */
export const getBalance = async (
    userId: string,
    balanceId: string,
): Promise<Balance | null> => {
    try {
        const balance = await prisma.balance.findUnique({
            where: {
                id: balanceId,
                userId,
            },
        });
        return balance;
    } catch (error) {
        console.error(`Error fetching balance ${balanceId}:`, error);
        throw error;
    }
};

/**
 * Update a balance's amount by adding/subtracting the specified change
 */
export const updateBalanceAmount = async (
    userId: string,
    balanceId: string,
    change: number,
): Promise<Balance> => {
    try {
        const currentBalance = await prisma.balance.findUnique({
            where: {
                id: balanceId,
                userId,
            },
        });

        if (!currentBalance) {
            throw new Error(`Balance ${balanceId} not found`);
        }

        const balance = await prisma.balance.update({
            where: {
                id: balanceId,
                userId,
            },
            data: {
                amount: {
                    increment: change,
                },
                updatedAt: new Date(),
            },
        });

        // Revalidate relevant paths
        if (balance.parentId) {
            revalidatePath(`/balances/${balance.parentId}`);
        }
        revalidatePath(`/balances/${balanceId}`);
        revalidatePath("/balances");

        return balance;
    } catch (error) {
        console.error(`Error updating balance ${balanceId}:`, error);
        throw error;
    }
};

/**
 * Get all balances for a user
 */
export const getAllBalances = async (userId: string): Promise<Balance[]> => {
    try {
        const balances = await prisma.balance.findMany({
            where: {
                userId,
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
        return balances;
    } catch (error) {
        console.error(`Error fetching all balances for user ${userId}:`, error);
        throw error;
    }
};

/**
 * Delete a balance
 */
export const deleteBalance = async (
    userId: string,
    balanceId: string,
): Promise<boolean> => {
    try {
        const balance = await prisma.balance.findUnique({
            where: {
                id: balanceId,
                userId,
            },
        });

        if (!balance) {
            throw new Error(`Balance ${balanceId} not found`);
        }

        const parentId = balance.parentId;

        await prisma.balance.delete({
            where: {
                id: balanceId,
                userId,
            },
        });

        // Revalidate relevant paths
        if (parentId) {
            revalidatePath(`/balances/${parentId}`);
        }
        revalidatePath("/balances");

        return true;
    } catch (error) {
        console.error(`Error deleting balance ${balanceId}:`, error);
        throw error;
    }
};

/**
 * Rename a balance
 */
export const renameBalance = async (
    userId: string,
    balanceId: string,
    newName: string,
): Promise<boolean> => {
    try {
        const balance = await prisma.balance.findUnique({
            where: {
                id: balanceId,
                userId,
            },
        });

        if (!balance) {
            throw new Error(`Balance ${balanceId} not found`);
        }

        await prisma.balance.update({
            where: {
                id: balanceId,
                userId,
            },
            data: {
                name: newName.trim(),
                updatedAt: new Date(),
            },
        });

        // Revalidate relevant paths
        if (balance.parentId) {
            revalidatePath(`/balances/${balance.parentId}`);
        }
        revalidatePath(`/balances/${balanceId}`);
        revalidatePath("/balances");

        return true;
    } catch (error) {
        console.error(`Error renaming balance ${balanceId}:`, error);
        throw error;
    }
};

/**
 * Activate a balance
 */
export const toggleBalance = async (
    userId: string,
    balanceId: string,
    active: boolean,
): Promise<boolean> => {
    try {
        const balance = await prisma.balance.findUnique({
            where: {
                id: balanceId,
                userId,
            },
        });

        if (!balance) {
            throw new Error(`Balance ${balanceId} not found`);
        }

        await prisma.balance.update({
            where: {
                id: balanceId,
                userId,
            },
            data: {
                active,
                updatedAt: new Date(),
            },
        });

        // Revalidate relevant paths
        if (balance.parentId) {
            revalidatePath(`/balances/${balance.parentId}`);
        }
        revalidatePath(`/balances/${balanceId}`);

        return true;
    } catch (error) {
        console.error(`Error activating balance ${balanceId}:`, error);
        throw error;
    }
};
