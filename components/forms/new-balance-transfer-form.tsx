"use client";
import { createTransaction } from "@/actions/transactionActions";
import { Balance } from "@/lib/generated/prisma";
import { getAllBalances } from "@/actions/balanceActions";
import Loading from "@/components/loading";
import { useState, useEffect } from "react";
import { formatNumberToMoney } from "@/lib/utils";

interface NewBalanceTransferFormProps {
    userId: string;
    balanceId?: string;
    onClose?: () => void;
}

export function NewBalanceTransferForm({
    userId,
    balanceId,
    onClose,
}: NewBalanceTransferFormProps) {
    const [balances, setBalances] = useState<Balance[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fromBalanceId, setFromBalanceId] = useState<string>(balanceId || "");
    const [toBalanceId, setToBalanceId] = useState<string>("");

    // Fetch all balances on component mount
    useEffect(() => {
        async function fetchBalances() {
            try {
                const fetchedBalances = await getAllBalances(userId);
                setBalances(fetchedBalances);

                // Set initial values if not already set
                if (!fromBalanceId && fetchedBalances.length > 0) {
                    setFromBalanceId(fetchedBalances[0].id);
                }

                if (!toBalanceId && fetchedBalances.length > 1) {
                    setToBalanceId(fetchedBalances[1].id);
                } else if (!toBalanceId && fetchedBalances.length > 0) {
                    setToBalanceId(fetchedBalances[0].id);
                }

                setIsLoading(false);
            } catch (err) {
                console.error("Failed to fetch balances:", err);
                setError("Failed to load balances. Please try again.");
                setIsLoading(false);
            }
        }

        fetchBalances();
    }, [userId, balanceId, fromBalanceId, toBalanceId]);

    // Format balance amount for display
    const formatBalanceAmount = (balance: Balance): string => {
        const amount =
            typeof balance.amount === "object" && "toNumber" in balance.amount
                ? balance.amount
                : Number(balance.amount);

        return formatNumberToMoney(amount, "USD");
    };

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const formData = new FormData(event.currentTarget);
            const amount = Number(formData.get("amount"));
            const date = new Date(
                (formData.get("date") as string) || new Date(),
            );
            const sourceBalanceId = formData.get("fromBalanceId") as string;
            const targetBalanceId = formData.get("toBalanceId") as string;

            // Find balance names for better descriptions
            const sourceBalance = balances.find(
                (b) => b.id === sourceBalanceId,
            );
            const targetBalance = balances.find(
                (b) => b.id === targetBalanceId,
            );

            if (!sourceBalance || !targetBalance) {
                throw new Error("Selected balances not found");
            }

            // Create expense transaction from source balance
            await createTransaction(
                amount,
                `Transfer to ${targetBalance.name}`,
                "EXPENSE",
                date,
                userId,
                sourceBalanceId,
            );

            // Create income transaction to target balance
            await createTransaction(
                amount,
                `Transfer from ${sourceBalance.name}`,
                "INCOME",
                date,
                userId,
                targetBalanceId,
            );

            // Close popup if callback provided
            if (onClose) {
                onClose();
            }
        } catch (err) {
            console.error("Failed to process transfer:", err);
            setError("Failed to process the transfer. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-5 bg-white rounded-lg"
        >
            {error && (
                <div className="p-3 bg-red-100 text-red-800 rounded-md text-sm">
                    {error}
                </div>
            )}

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
                    disabled={isSubmitting}
                    className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </label>

            <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">From</span>
                <select
                    name="fromBalanceId"
                    required
                    value={fromBalanceId}
                    onChange={(e) => setFromBalanceId(e.target.value)}
                    disabled={isSubmitting}
                    className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    {balances.map((balance) => (
                        <option key={balance.id} value={balance.id}>
                            {balance.name} ({formatBalanceAmount(balance)})
                        </option>
                    ))}
                </select>
            </label>

            <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">To</span>
                <select
                    name="toBalanceId"
                    required
                    value={toBalanceId}
                    onChange={(e) => setToBalanceId(e.target.value)}
                    disabled={isSubmitting}
                    className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    {balances.map((balance) => (
                        <option key={balance.id} value={balance.id}>
                            {balance.name} ({formatBalanceAmount(balance)})
                        </option>
                    ))}
                </select>
            </label>

            <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">Date</span>
                <input
                    type="date"
                    name="date"
                    required
                    disabled={isSubmitting}
                    defaultValue={new Date().toISOString().split("T")[0]}
                    className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </label>

            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Processing..." : "Transfer Funds"}
            </button>
        </form>
    );
}
