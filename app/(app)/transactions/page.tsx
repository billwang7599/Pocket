"use server";
import NewTransactionForm from "@/components/forms/new-transaction-form";
import { TransactionCard } from "@/components/transaction-card";
import { getBalanceTransactions } from "@/actions/transactionActions";
import { getAllBalances } from "@/actions/balanceActions";
import { getUserbyAuth0Id } from "@/actions/userActions";
import { Balance } from "@/lib/generated/prisma";

export default async function TransactionsPage() {
    const user = await getUserbyAuth0Id();
    if (!user) {
        return <div>Please log in to view transactions</div>;
    }
    // Fetch all transactions for the user
    const transactions = await getBalanceTransactions(user.id);

    // Fetch all balances for the user in a single request
    const balances = await getAllBalances(user.id);

    // Create a lookup map for quick balance access by ID
    const balanceMap = balances.reduce<Record<string, Balance>>(
        (map, balance) => {
            map[balance.id] = balance;
            return map;
        },
        {},
    );

    return (
        <div>
            <NewTransactionForm userId={user.id} balanceId={undefined} />
            <div className="flex flex-col gap-4 my-16">
                <h2 className="text-2xl font-bold">Transactions</h2>
                {transactions.map((transaction) => {
                    const balance = balanceMap[transaction.balanceId];

                    // Skip transactions with missing balances
                    if (!balance) return null;

                    return (
                        <div key={transaction.id}>
                            <TransactionCard transaction={transaction} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
