"use server";
import { createClient } from "@/lib/supabase/server";
import { getTopBalances } from "@/actions/balanceActions";
import { getBalanceTransactions } from "@/actions/transactionActions";
import { balanceTotalMapping } from "@/lib/utils";
import { BalanceFormPopupButton } from "@/components/buttons/balance-form-popup-button";
import { TransactionFormPopupButton } from "@/components/buttons/transaction-form-popup-button";
import { BalanceCard } from "@/components/balance-card";
import { TransactionCard } from "@/components/transaction-card";
import { formatNumberToMoney } from "@/lib/utils";

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser(); // should always be true since layout
    const userId = data.user!.id;
    const topBalances = await getTopBalances(userId).then((balances) =>
        balances.sort((a, b) =>
            a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1,
        ),
    );
    const balanceTotals = await balanceTotalMapping(userId, topBalances);
    const transactions = await getBalanceTransactions(userId);
    const netWorth = topBalances.reduce(
        (acc, bal) => acc + balanceTotals[bal.id],
        0,
    );

    return (
        <div className="flex flex-col gap-4">
            <div className="mb-8">
                <h3 className="text-2xl font-bold">Net Worth</h3>
                <h1 className="text-4xl font-thin">
                    {formatNumberToMoney(netWorth)}
                </h1>
            </div>
            <div className="flex flex-row gap-4">
                <BalanceFormPopupButton userId={userId} parentId={null} />
                <TransactionFormPopupButton userId={userId} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                {topBalances.map((balance) => (
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
