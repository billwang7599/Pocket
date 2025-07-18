"use client";
import { Button } from "@/components/ui/button";
import { NewBalanceForm } from "@/components/forms/new-balance-form";
import { PopupOverlay } from "@/components/popup-overlay";
import { useState } from "react";

export const BalanceFormPopupButton = ({
    userId,
    parentId,
}: {
    userId: string;
    parentId?: string;
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
                className="bg-blue-600 text-white hover:text-black"
                onClick={handleOpen}
            >
                Add New Balance
            </Button>

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
