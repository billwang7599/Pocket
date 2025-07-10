"use server";
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
    try {
        // Using a recursive Common Table Expression (CTE) to traverse the balance hierarchy
        // This SQL query efficiently sums the 'amount' for the given balance and all its children.
        const result = await prisma.$queryRaw<{ total_amount: number }[]>`
            WITH RECURSIVE BalanceTree AS (
                    -- Anchor Member: Selects the initial balance (the root of the sub-tree)
                    SELECT
                      id,
                      "parentBalanceId",
                      amount,
                      "userId" -- Include userId here to filter descendants by owner if needed later
                    FROM
                      public.balances
                    WHERE
                      id = ${balanceId}::uuid AND "userId" = ${userId}::uuid
                    UNION ALL

                    -- Recursive Member: Joins back to BalanceTree to find direct children
                    SELECT
                      b.id,
                      b."parentBalanceId",
                      b.amount,
                      b."userId"
                    FROM
                      public.balances b
                    INNER JOIN
                      BalanceTree bt ON b."parentBalanceId" = bt.id
                    WHERE b."userId" = ${userId}::uuid
                  )
                  -- Final SELECT: Sums the 'amount' for all balances in the collected tree
                  SELECT COALESCE(SUM(amount), 0) AS total_amount
                  FROM BalanceTree;
    `;

        // The queryRaw returns an array of objects. We expect one object with total_amount.
        // Ensure the result is valid and extract the sum.
        if (result && result.length > 0 && result[0].total_amount !== null) {
            // Convert to a number as queryRaw might return Decimal or string depending on DB driver
            return Number(result[0].total_amount);
        }

        // If no result or total_amount is null (e.g., balanceId not found)
        return 0;
    } catch (error) {
        console.error(
            `Error calculating total for balanceId ${balanceId}:`,
            error,
        );
        // Depending on your error handling strategy, you might re-throw,
        // return null, or return 0. Returning 0 indicates failure to calculate.
        return 0;
    }
}

export const createBalance = async (
    userId: string,
    name: string,
    parentBalanceId: string | null,
    amount: number,
) => {
    try {
        const balance = await prisma.balance.create({
            data: {
                userId,
                name,
                parentBalanceId,
                amount,
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
