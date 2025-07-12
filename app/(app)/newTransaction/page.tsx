"use server";
import NewTransactionForm from "@/components/forms/new-transaction-form";
import { createClient } from "@/lib/supabase/server";

export default async function TransactionsPage() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const userId = data.user?.id;

    if (!userId) {
        return <div>Please log in to view transactions</div>;
    }

    return (
        <div>
            <h1>Transactions</h1>
            <NewTransactionForm userId={userId} balanceId={undefined} />
        </div>
    );
}
