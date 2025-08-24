"use client";
import React from "react";
import { Balance } from "@/lib/generated/prisma";
import { toggleBalance } from "@/actions/balanceActions";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ToggleBalanceButtonProps {
    userId: string;
    balance: Balance;
}

export function ToggleBalanceButton({
    userId,
    balance,
}: ToggleBalanceButtonProps) {
    const router = useRouter();
    const [isActive, setIsActive] = React.useState(balance.active);

    const handleToggle = async (checked: boolean) => {
        setIsActive(checked);
        try {
            await toggleBalance(userId, balance.id, checked);
            toast.success(
                checked
                    ? "Balance included in calculations"
                    : "Balance excluded from calculations",
                {
                    style: {
                        backgroundColor: checked ? "#dbeafe" : "#eff6ff",
                        color: "#1e40af",
                    },
                },
            );
            router.refresh();
        } catch (error) {
            console.error("Error toggling balance:", error);
            setIsActive(!checked); // Revert on error
            toast.error("Failed to update balance status", {
                style: { backgroundColor: "#fee2e2", color: "#b91c1c" },
            });
        }
    };

    return (
        <div className="flex items-center space-x-2 p-2 rounded-md">
            <Switch
                id="balance-active"
                checked={isActive}
                onCheckedChange={handleToggle}
            />
            <Label
                htmlFor="balance-active"
                className="text-sm font-medium text-blue-800 drop-shadow-sm"
            >
                Include in calculations
            </Label>
        </div>
    );
}
