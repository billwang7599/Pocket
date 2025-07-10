import { ReactNode } from "react";

interface PopupOverlayProps {
    children: ReactNode;
    isVisible: boolean;
    onClose: () => void;
}

export const PopupOverlay = ({
    children,
    isVisible,
    onClose,
}: PopupOverlayProps) => {
    if (!isVisible) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            onClick={handleOverlayClick}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                zIndex: 1000,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col">
                <button onClick={onClose}>x</button>
                {children}
            </div>
        </div>
    );
};
