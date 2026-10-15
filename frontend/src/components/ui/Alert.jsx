import { CheckCircle2, XCircle, X } from "lucide-react";

/**
 * Reusable alert/banner component.
 *
 * @param {"success" | "error"} type - determines color + icon
 * @param {string} message - text to display (component renders nothing if empty/falsy)
 * @param {function} [onClose] - optional close handler; if provided, a close (X) button is shown
 */
export default function Alert({ type = "success", message, onClose }) {
    if (!message) return null;

    const variants = {
        success: {
            background: "#dcfce7",
            color: "#166534",
            Icon: CheckCircle2,
        },
        error: {
            background: "#fee2e2",
            color: "#991b1b",
            Icon: XCircle,
        },
    };

    const { background, color, Icon } = variants[type] || variants.success;

    return (
        <div
            role="alert"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                padding: 12,
                marginBottom: 16,
                background,
                color,
                borderRadius: 8,
            }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                }}>
                <Icon size={18} style={{ flexShrink: 0 }} />
                <span>{message}</span>
            </div>

            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Dismiss"
                    style={{
                        border: "none",
                        background: "transparent",
                        color,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        padding: 2,
                    }}>
                    <X size={16} />
                </button>
            )}
        </div>
    );
}