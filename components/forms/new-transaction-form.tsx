"use client";
import { createTransaction } from "@/actions/transactionActions";
import { TransactionType } from "@/lib/generated/prisma";
import { Balance } from "@/lib/generated/prisma";

interface NewTransactionFormProps {
    userId: string;
    balanceId: string | undefined;
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
                Description:
                <input
                    type="text"
                    name="description"
                    placeholder="e.g., Groceries, Rent, Salary"
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
            <label
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
                Type:
                <select
                    name="type"
                    required
                    style={{
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                >
                    <option value="INCOME">Income</option>
                    <option value="EXPENSE">Expense</option>
                </select>
            </label>
            <label
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
                Balance:
                <select
                    name="balanceId"
                    required
                    defaultValue={props.balanceId || props.balances[0]?.id}
                    style={{
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                >
                    {props.balances.map((balance) => (
                        <option key={balance.id} value={balance.id}>
                            {balance.name} (${balance.amount})
                        </option>
                    ))}
                </select>
            </label>
            <label
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
                Date:
                <input
                    type="date"
                    name="date"
                    required
                    defaultValue={new Date().toISOString().split("T")[0]}
                    style={{
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                />
            </label>
            <input type="hidden" name="categoryId" value="" />

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
                Add Transaction
            </button>
        </form>
    );
}
