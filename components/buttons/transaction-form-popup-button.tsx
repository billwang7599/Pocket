"use client";
import { Button } from "../ui/button";
import NewTransactionForm from "../forms/new-transaction-form";
import { PopupOverlay } from "../popup-overlay";
import { useState } from "react";

export const TransactionFormPopupButton = ({
    userId,
    balanceId,
}: {
    userId: string;
    balanceId?: string;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <Button
                onClick={handleOpen}
                className="bg-blue-600 text-white hover:text-black"
            >
                Add Transaction
            </Button>
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
                        onClose={handleClose}
                    />
                </div>
            </PopupOverlay>
        </div>
    );
};
