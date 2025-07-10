"use client";
import { Balance } from "@/lib/generated/prisma";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useBalanceTotalStore } from "@/lib/states/totalMapping";
import { useShallow } from "zustand/react/shallow";

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
        router.push(`/${balance.id}`);
    };

    return (
        <button
            onClick={handleClick}
            className="rounded-lg shadow-md p-4 border-2 border-white w-full h-full"
        >
            <h3 className="text-lg font-medium mb-2">{balance.name}</h3>
            <p className="text-gray-600">
                Total:{" "}
                <span>
                    {getTotalBalance(balance.id) !== undefined
                        ? getTotalBalance(balance.id)!.toFixed(2)
                        : "Loading..."}
                </span>{" "}
                | Amount: {balance.amount}
            </p>
        </button>
    );
};
