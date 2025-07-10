import {
    getBalance,
    getBalanceTotal,
    getChildBalances,
} from "@/actions/balanceActions";
import { createClient } from "@/lib/supabase/server";
import { BalanceFormPopupButton } from "@/components/buttons/balance-form-popup-button";
import { BalanceCard } from "@/components/balance-card";
import { getBalanceTransactions } from "@/actions/transactionActions";
import { TransactionCard } from "@/components/transaction-card";
import { TransactionFormPopupButton } from "@/components/buttons/transaction-form-popup-button";

interface BalancePageProps {
    params: {
        balanceId: string; // The dynamic segment from the URL (e.g., /balances/abc-123 will have balanceId: 'abc-123')
    };
    // searchParams: { [key: string]: string | string[] | undefined }; // Query parameters are also available here
}

export default async function BalancePage({ params }: BalancePageProps) {
    const { balanceId } = params;
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser(); // should always be true since layout
    const userId = data.user!.id;

    const balance = await getBalance(userId, balanceId);
    const children = await getChildBalances(userId, balanceId);
    const total = await getBalanceTotal(userId, balanceId);
    const transactions = await getBalanceTransactions(userId, balanceId);

    return (
        <div>
            <h1>Balance</h1>
            <p>Total: {total}</p>
            <p>Amount: {balance!.amount}</p>
            <BalanceFormPopupButton userId={userId} parentId={balanceId} />
            <TransactionFormPopupButton userId={userId} balanceId={balanceId} />
            {children.map((child) => (
                <div key={child.id} className="m-4">
                    <BalanceCard balance={child} />
                </div>
            ))}
            {transactions.map((transaction) => (
                <div key={transaction.id} className="m-4">
                    <TransactionCard transaction={transaction} />
                </div>
            ))}
        </div>
    );
}
