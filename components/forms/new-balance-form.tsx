"use client"; // This makes this a Client Component
import { createBalance } from "@/actions/balanceActions"; // Assuming this path is correct
import { useState } from "react";

interface NewBalanceFormProps {
    userId: string;
    parentId?: string;
    onClose?: () => void;
}

export function NewBalanceForm(props: NewBalanceFormProps) {
    const [name, setName] = useState("");

    const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default browser form submission (page reload)
        const form = event.currentTarget;

        const userId = props.userId;
        const balanceName = name.trim();
        const parentId = props.parentId;
        const amount = 0;
        const currencyId = parseInt(form.currency.value, 10);

        // clear form
        event.currentTarget.reset();

        if (!parentId) {
            await createBalance(userId, balanceName, null, amount, currencyId);
        } else {
            await createBalance(
                userId,
                balanceName,
                parentId,
                amount,
                currencyId,
            );
        }

        // Close popup if onClose prop is provided
        if (props.onClose) {
            props.onClose();
        }
    };

    const CURRENCIES = [
        { id: 1, code: "USD", name: "US Dollar" },
        { id: 2, code: "EUR", name: "Euro" },
        { id: 3, code: "GBP", name: "British Pound" },
        { id: 4, code: "JPY", name: "Japanese Yen" },
    ];
    return (
        <form
            onSubmit={onFormSubmit}
            className="flex flex-col gap-4 p-5 bg-white rounded-lg"
        >
            <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">Name</span>
                <input
                    type="text"
                    placeholder="e.g., Groceries, Savings, Kids Fund"
                    required
                    className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </label>
            <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">
                    Currency
                </span>
                <select
                    required
                    className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="currency"
                    defaultValue={1}
                >
                    {CURRENCIES.map((currency) => (
                        <option key={currency.id} value={currency.id}>
                            {currency.code} - {currency.name}
                        </option>
                    ))}
                </select>
            </label>

            <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-700"
                disabled={name.trim().length === 0}
            >
                Create New Balance
            </button>
        </form>
    );
}
