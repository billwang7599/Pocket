"use server";
import { getTopBalances, getUserTotal } from "@/actions/balanceActions";
import { getBalanceTransactions } from "@/actions/transactionActions";
// import { balanceTotalMapping } from "@/lib/utils";
import { BalanceFormPopupButton } from "@/components/buttons/balance-form-popup-button";
import { TransactionFormPopupButton } from "@/components/buttons/transaction-form-popup-button";
import { BalanceTransferPopupButton } from "@/components/buttons/balance-transfer-popup-button";
import { BalanceCard } from "@/components/balance-card";
import { TransactionCard } from "@/components/transaction-card";
import { formatNumberToMoney } from "@/lib/utils";
import { getUserbyAuth0Id } from "@/actions/userActions";

export default async function DashboardPage() {
    const user = await getUserbyAuth0Id();
    if (!user) {
        return <div>User not found</div>;
    }
    const topBalances = await getTopBalances(user.id).then((balances) =>
        balances.sort((a, b) =>
            a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1,
        ),
    );
    const transactions = await getBalanceTransactions(user.id);
    const netWorth = await getUserTotal(user.id);

    return (
        <div className="flex flex-col gap-4">
            <div className="my-16">
                <h3 className="text-4xl font-bold">Net Worth</h3>
                <h1 className="text-5xl font-thin">
                    {formatNumberToMoney(netWorth, "USD")}
                </h1>
            </div>
            <div className="flex flex-row gap-4 mb-4">
                <BalanceFormPopupButton userId={user.id} />
                <TransactionFormPopupButton userId={user.id} />
                <BalanceTransferPopupButton userId={user.id} />
            </div>
            {topBalances.length == 0 ? (
                <div className="text-center">
                    <p>No balances found. Add a balance to start budgeting!</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    {topBalances.map((balance) => (
                        <div key={balance.id}>
                            <BalanceCard balance={balance} />
                        </div>
                    ))}
                </div>
            )}

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
