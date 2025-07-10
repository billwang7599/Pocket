"use client";
import { create } from "zustand";
import { getBalanceTotal } from "@/actions/balanceActions";

export type BalanceTotalMapping = {
    [id: string]: number;
};

interface BalanceTotalStore {
    data: BalanceTotalMapping;
    update: (userId: string, balanceId: string) => void;
    getTotalBalance: (id: string) => number | undefined;
}

export const useBalanceTotalStore = create<BalanceTotalStore>((set, get) => ({
    data: {}, // Initial state for data
    update: (userId, balanceId) => {
        getBalanceTotal(userId, balanceId).then((total) => {
            set((state) => ({
                // Fix 2: Correctly update the 'data' property of the state
                data: {
                    ...state.data, // Spread the existing data
                    [balanceId]: total, // Add/update the new balance total
                },
            }));
        });
    },

    getTotalBalance: (id) => get().data[id],
}));
