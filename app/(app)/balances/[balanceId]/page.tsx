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
import { formatNumberToMoney } from "@/lib/utils";
import { redirect } from "next/navigation";
import { DeleteBalanceButton } from "@/components/buttons/delete-balance-button";

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
    if (!balance) {
        redirect("/dashboard");
    }
    const children = await getChildBalances(userId, balanceId);
    const total = await getBalanceTotal(userId, balanceId);
    const transactions = await getBalanceTransactions(userId, balanceId);

    return (
        <div className="flex flex-col gap-4">
            <div className="mb-8">
                <h3 className="text-2xl font-bold">{balance.name}</h3>
                <h1 className="text-4xl font-thin">
                    {formatNumberToMoney(total)}
                </h1>
                <p className="text-xl font-thin">
                    {formatNumberToMoney(balance.amount)}
                </p>
            </div>
            <div className="flex flex-row gap-4">
                <BalanceFormPopupButton userId={userId} parentId={balanceId} />
                <TransactionFormPopupButton
                    userId={userId}
                    balanceId={balanceId}
                />
                <DeleteBalanceButton userId={userId} balanceId={balanceId} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                {children.map((balance) => (
                    <div key={balance.id}>
                        <BalanceCard balance={balance} />
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-4 mt-8">
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
