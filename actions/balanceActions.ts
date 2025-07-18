"use server";
import { Balance } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getTopBalances = async (userId: string) => {
    try {
        const balances = await prisma.balance.findMany({
            where: { userId, parentBalanceId: null },
        });
        return balances;
    } catch (error) {
        console.error("Error fetching user balances:", error);
        throw error;
    }
};

export const getChildBalances = async (
    userId: string,
    parentBalanceId: string,
) => {
    try {
        const balances = await prisma.balance.findMany({
            where: { userId, parentBalanceId },
        });
        return balances;
    } catch (error) {
        console.error("Error fetching child balances:", error);
        throw error;
    }
};

export const getUserTotal = async (userId: string) => {
    try {
        const balances = await prisma.balance.findMany({
            where: { userId },
        });
        const total = balances.reduce(
            (acc, balance) => acc + balance.amount,
            0,
        );
        return total;
    } catch (error) {
        console.error("Error fetching user total:", error);
        throw error;
    }
};

export async function getBalanceTotal(
    userId: string,
    balanceId: string,
): Promise<number> {
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

    const childBalances: Balance[] = await prisma.balance.findMany({
        where: {
            userId,
            parentBalanceId: balanceId,
        },
    });

    const promises: Promise<number>[] = childBalances.map(
        async (childBalance) => {
            return await getBalanceTotal(userId, childBalance.id);
        },
    );

    const childTotals = await Promise.all(promises);

    const total = childTotals.reduce(
        (acc, curr) => acc + curr,
        currentBalance.amount,
    );

    return total;
}

export const createBalance = async (
    userId: string,
    name: string,
    parentBalanceId: string | null,
    amount: number,
    currency: number,
) => {
    try {
        const balance = await prisma.balance.create({
            data: {
                userId,
                name,
                parentBalanceId,
                amount,
                currency,
            },
        });
        revalidatePath(`/balances/${parentBalanceId}`); // Revalidate the current balance page
        return balance;
    } catch (error) {
        console.error("Error creating balance:", error);
        throw error;
    }
};

export const getBalance = async (userId: string, balanceId: string) => {
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

export const updateBalanceAmount = async (
    userId: string,
    balanceId: string,
    change: number,
) => {
    try {
        const currentAmount = await prisma.balance.findUnique({
            where: {
                id: balanceId,
                userId,
            },
            select: {
                amount: true,
            },
        });

        if (!currentAmount) {
            throw new Error(`Balance ${balanceId} not found`);
        }

        const balance = await prisma.balance.update({
            where: {
                id: balanceId,
                userId,
            },
            data: {
                amount: currentAmount!.amount + change,
                updatedAt: new Date(),
            },
        });
        revalidatePath(`/balances/${balance.parentBalanceId}`); // Revalidate the parent balance page
        return balance;
    } catch (error) {
        console.error(`Error updating balance ${balanceId}:`, error);
        throw error;
    }
};

export const getAllBalances = async (userId: string) => {
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
        console.error(`Error fetching balances for user ${userId}:`, error);
        throw error;
    }
};

export const deleteBalance = async (userId: string, balanceId: string) => {
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

        await prisma.balance.delete({
            where: {
                id: balanceId,
                userId,
            },
        });
        revalidatePath(`/balances/${balance.parentBalanceId}`); // Revalidate the parent balance page
        return true;
    } catch (error) {
        console.error(`Error deleting balance ${balanceId}:`, error);
        throw error;
    }
};

export const renameBalance = async (
    userId: string,
    balanceId: string,
    newName: string,
) => {
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
        revalidatePath(`/balances/${balance.parentBalanceId}`); // Revalidate the parent balance page
        return true;
    } catch (error) {
        console.error(`Error renaming balance ${balanceId}:`, error);
        throw error;
    }
};
