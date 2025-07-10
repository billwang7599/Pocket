"use client";
import { Button } from "../ui/button";
import NewTransactionForm from "../forms/new-transaction-form";
import { PopupOverlay } from "../popup-overlay";
import { useState, useEffect } from "react";
import { getAllBalances } from "@/actions/balanceActions";
import { Balance } from "@/lib/generated/prisma";

export const TransactionFormPopupButton = ({
    userId,
    balanceId,
}: {
    userId: string;
    balanceId: string;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [balances, setBalances] = useState<Balance[]>([]);

    // Fetch balances when the component mounts
    useEffect(() => {
        const fetchBalances = async () => {
            const fetchedBalances = await getAllBalances(userId);
            setBalances(fetchedBalances);
        };

        fetchBalances();
    }, [userId]);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <Button onClick={handleOpen}>Add Transaction</Button>
            <PopupOverlay isVisible={isOpen} onClose={handleClose}>
                <div
                    style={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        padding: "20px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        maxWidth: "500px",
                        width: "100%",
                    }}
                >
                    <NewTransactionForm
                        userId={userId}
                        balanceId={balanceId}
                        balances={balances}
                        onClose={handleClose}
                    />
                </div>
            </PopupOverlay>
        </div>
    );
};
