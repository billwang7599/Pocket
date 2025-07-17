"use client";
import { createTransaction } from "@/actions/transactionActions";
import { Balance } from "@/lib/generated/prisma";
import { getAllBalances } from "@/actions/balanceActions";
import LoadingPage from "@/components/loading";
import { useState, useEffect } from "react";
import { useBalanceTotalStore } from "@/lib/states/totalMapping";
import { useShallow } from "zustand/react/shallow";

interface NewBalanceTransferFormProps {
    userId: string;
    balanceId?: string;
    onClose?: () => void;
}

export function NewBalanceTransferForm(props: NewBalanceTransferFormProps) {
    const [balances, setBalances] = useState<Balance[] | null>(null);
    const { update } = useBalanceTotalStore(
        useShallow((state) => ({
            // Wrap your selector with useShallow
            data: state.data,
            update: state.update,
            getTotalBalance: state.getTotalBalance,
        })),
    );
    useEffect(() => {
        getAllBalances(props.userId).then(setBalances);
    }, [props.userId]);

    const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default browser form submission (page reload)

        // Get form data directly from the event target
        const formData = new FormData(event.currentTarget);
        const amount = Number(formData.get("amount"));
        const date = new Date((formData.get("date") as string) || new Date());
        const fromBalance = formData.get("fromBalanceId") as string;
        const toBalance = formData.get("toBalanceId") as string;

        // clear form
        event.currentTarget.reset();

        // Call your actual createTransaction Server Action with the correct parameters
        await createTransaction(
            amount,
            "Transfer To " + toBalance[1],
            "EXPENSE",
            false,
            date,
            props.userId,
            fromBalance[0],
        ).then(() => {
            // Update total mapping state
            update(props.userId, fromBalance[0]);
        });

        await createTransaction(
            amount,
            "Transfer From " + fromBalance[1],
            "INCOME",
            false,
            date,
            props.userId,
            toBalance[0],
        ).then(() => {
            // Update total mapping state
            update(props.userId, toBalance[0]);
        });

        // Close popup if onClose prop is provided
        if (props.onClose) {
            props.onClose();
        }
    };

    return (
        <form
            onSubmit={onFormSubmit}
            className="flex flex-col gap-4 p-5 bg-white rounded-lg"
        >
            {!balances ? (
                <LoadingPage />
            ) : (
                <>
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-gray-700">
                            Amount
                        </span>
                        <input
                            type="number"
                            name="amount"
                            step="0.01"
                            placeholder="e.g., 50.00"
                            min={0}
                            required
                            className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-gray-700">
                            From
                        </span>
                        <select
                            name="fromBalanceId"
                            required
                            defaultValue={props.balanceId || balances[0]?.id}
                            className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {balances.map((balance) => (
                                <option
                                    key={balance.id}
                                    value={[balance.id, balance.name]}
                                >
                                    {balance.name} (${balance.amount})
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-gray-700">
                            To
                        </span>
                        <select
                            name="toBalanceId"
                            required
                            defaultValue={props.balanceId || balances[0]?.id}
                            className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {balances.map((balance) => (
                                <option key={balance.id} value={balance.id}>
                                    {balance.name} (${balance.amount})
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-gray-700">
                            Date
                        </span>
                        <input
                            type="date"
                            name="date"
                            required
                            defaultValue={
                                new Date().toISOString().split("T")[0]
                            }
                            className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <input type="hidden" name="categoryId" value="" />

                    <button
                        type="submit"
                        className="mt-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        Add Transaction
                    </button>
                </>
            )}
        </form>
    );
}
