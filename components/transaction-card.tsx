"use server";
import { getBalance } from "@/actions/balanceActions";
import { Transaction } from "@/lib/generated/prisma";
import { formatNumberToMoney } from "@/lib/utils";
import Link from "next/link";

export async function TransactionCard({
    transaction,
}: {
    transaction: Transaction;
}) {
    // Parse transaction properties to handle Decimal types
    const amount =
        typeof transaction.amount === "object" &&
        "toNumber" in transaction.amount
            ? transaction.amount
            : Number(transaction.amount);

    const balance = await getBalance(transaction.userId, transaction.balanceId);

    // Format the description (capitalize first letter of each word)
    const formattedDescription = transaction.description
        .trim()
        .split(" ")
        .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : ""))
        .join(" ");

    return (
        <div className="flex flex-col border-b border-gray-200">
            <div className="flex justify-between">
                <h3 className="text-xl font-semibold">
                    {formattedDescription}
                </h3>
                <p className="text-sm text-gray-500">
                    {transaction.date.toDateString()}
                </p>
            </div>
            <p className="text-lg font-thin">
                <span
                    className={
                        transaction.type === "INCOME" ? "" : "text-red-500"
                    }
                >
                    {formatNumberToMoney(amount, "USD")}
                </span>
                <span> → </span>
                <Link href={`/balances/${balance?.id}`}>{balance?.name}</Link>
            </p>
        </div>
    );
}
