import {
    getBalance,
    getBalanceTotal,
    getChildBalances,
} from "@/actions/balanceActions";
import { BalanceFormPopupButton } from "@/components/buttons/balance-form-popup-button";
import { BalanceCard } from "@/components/balance-card";
import { getAllTransactions } from "@/actions/transactionActions";
import { TransactionCard } from "@/components/transaction-card";
import { TransactionFormPopupButton } from "@/components/buttons/transaction-form-popup-button";
import { redirect } from "next/navigation";
import { DeleteBalanceButton } from "@/components/buttons/delete-balance-button";
import { InputBalanceTitle } from "@/components/input-balance-title";
// import { formatNumberToCurrency } from "@/lib/utils";
import Link from "next/link";
import { getUserbyAuth0Id } from "@/actions/userActions";

interface BalancePageProps {
    params: Promise<{ balanceId: string }>;
}

export default async function BalancePage({ params }: BalancePageProps) {
    const user = await getUserbyAuth0Id();
    if (!user) {
        redirect("/login");
    }
    const { balanceId } = await params;

    const balance = await getBalance(user.id, balanceId);
    if (!balance) {
        redirect("/dashboard");
    }
    const children = await getChildBalances(user.id, balanceId);
    const total = await getBalanceTotal(user.id, balanceId);
    const transactions = await getAllTransactions(user.id, balanceId);

    return (
        <div className="flex flex-col gap-4">
            <Link
                href={
                    balance.parentId
                        ? `/balances/${balance.parentId}`
                        : "/dashboard"
                }
            >
                Back
            </Link>
            <div className="mb-8 mt-4">
                <InputBalanceTitle
                    balance={JSON.parse(JSON.stringify(balance))}
                />
                <h1 className="text-5xl font-thin">${total}</h1>
            </div>
            <div className="flex flex-row flex-wrap gap-4 w-full mb-4">
                <BalanceFormPopupButton userId={user.id} parentId={balanceId} />
                <TransactionFormPopupButton
                    userId={user.id}
                    balanceId={balanceId}
                />
                <DeleteBalanceButton userId={user.id} balanceId={balanceId} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                {children.map((balance) => (
                    <div key={balance.id}>
                        <BalanceCard
                            balance={JSON.parse(JSON.stringify(balance))}
                        />
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-4 mt-8">
                <h2 className="text-2xl font-bold">Transactions</h2>
                {transactions.map((transaction) => (
                    <div key={transaction.id}>
                        <TransactionCard
                            transaction={JSON.parse(
                                JSON.stringify(transaction),
                            )}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
