"use client";
import { Button } from "../ui/button";
import NewBalanceForm from "../forms/new-balance-form";
import { PopupOverlay } from "../popup-overlay";
import { useState } from "react";

export const BalanceFormPopupButton = ({
    userId,
    parentId,
}: {
    userId: string;
    parentId: string | null;
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
            <Button onClick={handleOpen}>Add New Balance</Button>
            <PopupOverlay isVisible={isOpen} onClose={handleClose}>
                <div
                    style={{
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        maxWidth: "500px",
                        width: "100%",
                    }}
                >
                    <NewBalanceForm
                        userId={userId}
                        parentId={parentId}
                        onClose={handleClose}
                    />
                </div>
            </PopupOverlay>
        </div>
    );
};
