"use server";
import { Balance } from "@/lib/generated/prisma";
import { formatNumberToMoney } from "@/lib/utils";
import { getBalanceTotal } from "@/actions/balanceActions";
import Link from "next/link";

export async function BalanceCard({ balance }: { balance: Balance }) {
    const total = await getBalanceTotal(balance.userId, balance.id);
    return (
        <Link
            href={`/balances/${balance.id}`}
            className="rounded-lg shadow-md p-4 w-full h-full flex flex-col md:flex-row md:justify-between md:items-end hover:bg-gray-50"
        >
            <h3 className="text-lg font-medium text-left">
                {balance.name
                    .trim()
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
            </h3>
            <p className="text-gray-600 font-light text-left md:text-right">
                {formatNumberToMoney(total, "USD")}
            </p>
        </Link>
    );
}
