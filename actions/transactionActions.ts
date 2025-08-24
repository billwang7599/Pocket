"use server";
import prisma from "@/lib/prisma";
import { TransactionType, Transaction, Balance } from "@/lib/generated/prisma";
import { updateBalanceAmount } from "@/actions/balanceActions";

export const createTransaction = async (
    amount: number,
    description: string,
    type: TransactionType,
    date: Date,
    userId: string,
    balanceId: string,
) => {
    const data = {
        amount,
        description,
        type,
        date,
        userId,
        balanceId,
    };
    const transaction = await prisma.transaction.create({
        data,
    });

    if (type === TransactionType.INCOME) {
        await updateBalanceAmount(userId, balanceId, amount);
    } else if (type === TransactionType.EXPENSE) {
        await updateBalanceAmount(userId, balanceId, -amount);
    }

    return transaction;
};

export const updateTransaction = async (
    userId: string,
    id: string,
    formData: FormData,
) => {
    const data = {
        amount: parseFloat(formData.get("amount") as string) || 0,
        description: (formData.get("description") as string) || "",
        date: new Date(formData.get("date") as string) || new Date(),
        categoryId: (formData.get("categoryId") as string) || "",
        balanceId: (formData.get("balanceId") as string) || "",
    };
    const transaction = await prisma.transaction.update({
        where: { userId, id },
        data,
    });
    return transaction;
};

export const deleteTransaction = async (userId: string, id: string) => {
    const transaction = await prisma.transaction.delete({
        where: { userId, id },
    });
    return transaction;
};

export const getBalanceTransactions = async (
    userId: string,
    balanceId?: string,
) => {
    let transactions: Transaction[];
    if (!balanceId) {
        transactions = await prisma.transaction.findMany({
            where: { userId },
            orderBy: [{ date: "desc" }, { updatedAt: "desc" }],
        });
    } else {
        transactions = await prisma.transaction.findMany({
            where: { userId, balanceId },
            orderBy: [{ date: "desc" }, { updatedAt: "desc" }],
        });
    }
    return transactions;
};

export const getAllTransactions = async (
    userId: string,
    balanceId: string,
): Promise<Transaction[]> => {
    // Find direct children
    const children = await prisma.transaction.findMany({
        where: { userId, balanceId },
        orderBy: [{ date: "desc" }, { updatedAt: "desc" }],
    });

    const childBalances: Balance[] = await prisma.balance.findMany({
        where: { parentId: balanceId },
    });

    // Recursively get descendants for each child
    const descendantsArrays = await Promise.all(
        childBalances.map((child) => getAllTransactions(userId, child.id)),
    );

    // Flatten the results and include direct children, in order
    return children.concat(...descendantsArrays).sort((a, b) => {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        if (a.updatedAt > b.updatedAt) return -1;
        if (a.updatedAt < b.updatedAt) return 1;
        return 0;
    });
};
