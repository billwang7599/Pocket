import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Balance } from "@prisma/client";
import { getBalanceTotal } from "@/actions/balanceActions";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const balanceTotalMapping = async (
    userId: string,
    balances: Balance[],
) => {
    // Step 1 & 2: Map each balance to a Promise that resolves to its total amount
    const totalAmountsPromises = balances.map(async (balance) => {
        // Call the async function for each balance
        return await getBalanceTotal(userId, balance.id);
    });

    // Step 3: Wait for all promises to resolve
    const resolvedAmounts = await Promise.all(totalAmountsPromises);

    const balanceMapping: { [key: string]: number } = {};
    resolvedAmounts.forEach((amount, index) => {
        balanceMapping[balances[index].id] = amount;
    });

    return balanceMapping;
};

export const formatNumberToMoney = (number: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "CAD",
    }).format(number);
};
