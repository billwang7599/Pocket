"use server";
import { createClient } from "@/lib/supabase/server";
import { getTopBalances } from "@/actions/balanceActions";
import { balanceTotalMapping } from "@/lib/utils";
import { BalanceFormPopupButton } from "@/components/buttons/balance-form-popup-button";
import { BalanceCard } from "@/components/balance-card";

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser(); // should always be true since layout
    const userId = data.user!.id;
    const topBalances = await getTopBalances(userId);
    const balanceTotals = await balanceTotalMapping(userId, topBalances);
    const netWorth = topBalances.reduce(
        (acc, bal) => acc + balanceTotals[bal.id],
        0,
    );

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Net Worth: {netWorth}</p>
            <BalanceFormPopupButton userId={userId} parentId={null} />
            <div className="grid grid-cols-2 gap-4">
                {topBalances.map((balance) => (
                    <div key={balance.id}>
                        <BalanceCard balance={balance} />
                    </div>
                ))}
            </div>
        </div>
    );
}
