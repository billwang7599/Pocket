"use client";
import { createTransaction } from "@/actions/transactionActions";
import { TransactionType } from "@/lib/generated/prisma";
import { Balance } from "@/lib/generated/prisma";

interface NewTransactionFormProps {
    userId: string;
    balanceId?: string;
    balances: Balance[];
    onClose?: () => void;
}

export default function NewTransactionForm(props: NewTransactionFormProps) {
    const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default browser form submission (page reload)

        // Get form data directly from the event target
        const formData = new FormData(event.currentTarget);
        const amount = Number(formData.get("amount"));
        const description = formData.get("description") as string;
        const type = formData.get("type") as TransactionType;
        const date = new Date((formData.get("date") as string) || new Date());
        const balanceId = formData.get("balanceId") as string;

        // clear form
        event.currentTarget.reset();

        // Call your actual createTransaction Server Action with the correct parameters
        await createTransaction(
            amount,
            description,
            type,
            false, // dont use repeating transactions for now
            date,
            props.userId,
            balanceId,
        );

        // Close popup if onClose prop is provided
        if (props.onClose) {
            props.onClose();
        }
    };

    return (
        <form
            onSubmit={onFormSubmit}
            className="flex flex-col gap-4 p-5 bg-white rounded-lg shadow-md border border-gray-200"
        >
            <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">
                    Description
                </span>
                <input
                    type="text"
                    name="description"
                    placeholder="e.g., Groceries, Rent, Salary"
                    required
                    className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </label>
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
                <span className="text-sm font-medium text-gray-700">Type</span>
                <select
                    name="type"
                    required
                    className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="INCOME">Income</option>
                    <option value="EXPENSE">Expense</option>
                </select>
            </label>
            <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">
                    Balance
                </span>
                <select
                    name="balanceId"
                    required
                    defaultValue={props.balanceId || props.balances[0]?.id}
                    className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    {props.balances.map((balance) => (
                        <option key={balance.id} value={balance.id}>
                            {balance.name} (${balance.amount})
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
                    defaultValue={new Date().toISOString().split("T")[0]}
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
        </form>
    );
}
