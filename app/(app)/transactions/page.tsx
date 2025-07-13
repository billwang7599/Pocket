"use server";
import NewTransactionForm from "@/components/forms/new-transaction-form";
import { createClient } from "@/lib/supabase/server";
import { TransactionCard } from "@/components/transaction-card";
import { getBalanceTransactions } from "@/actions/transactionActions";

export default async function TransactionsPage() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const userId = data.user?.id;
    if (!userId) {
        return <div>Please log in to view transactions</div>;
    }
    const transactions = await getBalanceTransactions(userId);

    return (
        <div>
            <NewTransactionForm userId={userId} balanceId={undefined} />
            <div className="flex flex-col gap-4 my-16">
                <h2 className="text-2xl font-bold">Transactions</h2>
                {transactions.map((transaction) => (
                    <div key={transaction.id}>
                        <TransactionCard transaction={transaction} />
                    </div>
                ))}
            </div>
        </div>
    );
}
