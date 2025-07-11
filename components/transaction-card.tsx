"use server";
import { Transaction } from "@/lib/generated/prisma";
import { formatNumberToMoney } from "@/lib/utils";
import { getBalance } from "@/actions/balanceActions";
import { createClient } from "@/lib/supabase/server";

export const TransactionCard = async ({
    transaction,
}: {
    transaction: Transaction;
}) => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error) {
        console.error(error);
        return null;
    }

    const balance = await getBalance(data.user.id, transaction.balanceId);
    if (!balance) {
        console.error("Balance not found");
        return null;
    }

    return (
        <div className="flex flex-col border-b border-gray-200">
            <div className="flex justify-between">
                <h3 className="text-xl font-semibold">
                    {transaction.description
                        .split(" ")
                        .map((word) => word[0].toUpperCase() + word.slice(1))
                        .join(" ")}
                </h3>
                <p className="text-sm text-gray-500">
                    {transaction.date.toDateString()}
                </p>
            </div>
            <p className="text-lg font-thin">
                {formatNumberToMoney(transaction.amount)}
                <span> → </span>
                <a href={`/balances/${balance.id}`}>{balance.name}</a>
            </p>
        </div>
    );
};
