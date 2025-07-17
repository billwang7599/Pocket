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

        // clear form
        event.currentTarget.reset();

        if (!props.parentId) {
            await createBalance(props.userId, name.trim(), null, 0);
        } else {
            await createBalance(props.userId, name.trim(), props.parentId, 0);
        }

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

            <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                disabled={name.trim().length === 0}
            >
                Create New Balance
            </button>
        </form>
    );
}
