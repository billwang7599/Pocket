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
        const amount = Number(formData.get("amount"));

        // clear form
        event.currentTarget.reset();

        await createBalance(props.userId, name, props.parentId, amount);

        // Close popup if onClose prop is provided
        if (props.onClose) {
            props.onClose();
        }
    };

    return (
        <form
            onSubmit={onFormSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                padding: "20px",
                border: "1px solid #eee",
                borderRadius: "8px",
            }}
        >
            <label
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
                Name:
                <input
                    type="text"
                    name="name"
                    placeholder="e.g., Groceries, Savings, Kids Fund"
                    required
                    style={{
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                />
            </label>
            <label
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
                Amount:
                <input
                    type="number"
                    name="amount"
                    step="0.01"
                    placeholder="e.g., 50.00"
                    required
                    style={{
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                />
            </label>

            <button
                type="submit"
                style={{
                    padding: "10px 15px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "1em",
                }}
            >
                Create Sub-Balance
            </button>
        </form>
    );
}
