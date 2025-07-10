"use server";
import NewTransactionForm from "@/components/forms/new-transaction-form";
import { createClient } from "@/lib/supabase/server";
import { getAllBalances } from "@/actions/balanceActions";

export default async function TransactionsPage() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const userId = data.user?.id;

    if (!userId) {
        return <div>Please log in to view transactions</div>;
    }

    // Fetch all balances for the user
    const balances = await getAllBalances(userId);

    return (
        <div>
            <h1>Transactions</h1>
            <NewTransactionForm
                userId={userId}
                balanceId={undefined}
                balances={balances}
            />
        </div>
    );
}
