"use client";
import { useState, useEffect } from "react";
import { renameBalance } from "@/actions/balanceActions";
import { Balance } from "@/lib/generated/prisma";

export const InputBalanceTitle = ({ balance }: { balance: Balance }) => {
    const [title, setTitle] = useState(balance.name);

    useEffect(() => {
        if (title.trim().length > 0) {
            renameBalance(balance.userId, balance.id, title);
        }
    }, [balance.userId, balance.id, title]);

    return (
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setTitle(title)}
            className="bg-transparent !text-4xl font-bold outline-none w-full hover:border-b-gray-900 hover:!border-1"
        />
    );
};
