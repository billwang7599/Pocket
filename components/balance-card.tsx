"use client";
import { Balance } from "@/lib/generated/prisma";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useBalanceTotalStore } from "@/lib/states/totalMapping";
import { useShallow } from "zustand/react/shallow";
import { formatNumberToMoney } from "@/lib/utils";

export const BalanceCard = ({ balance }: { balance: Balance }) => {
    const { update, getTotalBalance } = useBalanceTotalStore(
        useShallow((state) => ({
            // Wrap your selector with useShallow
            data: state.data,
            update: state.update,
            getTotalBalance: state.getTotalBalance,
        })),
    );

    useEffect(() => {
        if (!getTotalBalance(balance.id)) update(balance.userId, balance.id);
    }, [balance, getTotalBalance, update]);

    const router = useRouter();
    const handleClick = () => {
        router.push(`/balances/${balance.id}`);
    };

    return (
        <button
            onClick={handleClick}
            className="rounded-lg shadow-md p-4 w-full h-full flex flex-row justify-between items-end hover:bg-gray-50"
        >
            <h3 className="text-lg font-medium text-left">
                {balance.name
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
            </h3>
            <p className="text-gray-600 text-right">
                {getTotalBalance(balance.id) !== undefined
                    ? formatNumberToMoney(getTotalBalance(balance.id)!)
                    : "Loading..."}
            </p>
        </button>
    );
};
