"use client";
import { Button } from "../ui/button";
import { deleteBalance } from "@/actions/balanceActions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const DeleteBalanceButton = ({
    userId,
    balanceId,
    parentId,
}: {
    userId: string;
    balanceId: string;
    parentId?: string;
}) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const onDelete = () => {
        setIsDeleting(true);
        deleteBalance(userId, balanceId).then(() => {
            if (parentId) {
                router.push(`/balances/${parentId}`);
            } else {
                router.push(`/dashboard`);
            }
        });
    };
    return (
        <Button
            className="bg-gray-600 text-white hover:text-black"
            onClick={onDelete}
            disabled={isDeleting}
        >
            Delete Balance
        </Button>
    );
};
