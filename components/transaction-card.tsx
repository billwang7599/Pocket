import { Transaction } from "@/lib/generated/prisma";

export const TransactionCard = ({
    transaction,
}: {
    transaction: Transaction;
}) => {
    return (
        <div className="flex flex-col gap-2 border-t-lime-100">
            <div className="flex justify-between">
                <h3 className="text-lg font-semibold">
                    {transaction.description}
                </h3>
                <p className="text-sm text-gray-500">
                    {transaction.date.toDateString()}
                </p>
            </div>
            <p className="text-xl font-bold">{transaction.amount}</p>
        </div>
    );
};
