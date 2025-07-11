"use client"; // This makes this a Client Component
import { createBalance } from "@/actions/balanceActions"; // Assuming this path is correct

interface NewBalanceFormProps {
    userId: string;
    parentId: string | null;
    onClose?: () => void;
}

export default function NewBalanceForm(props: NewBalanceFormProps) {
    const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default browser form submission (page reload)

        // Get form data directly from the event target
        const formData = new FormData(event.currentTarget);

        const name = formData.get("name") as string;

        // clear form
        event.currentTarget.reset();

        await createBalance(props.userId, name, props.parentId, 0);

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
                <span className="text-sm font-medium text-gray-700">Name</span>
                <input
                    type="text"
                    name="name"
                    placeholder="e.g., Groceries, Savings, Kids Fund"
                    required
                    className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </label>

            <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
                Create Sub-Balance
            </button>
        </form>
    );
}
