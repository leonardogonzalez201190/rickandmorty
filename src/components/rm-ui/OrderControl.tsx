// OrderControl component: A simple UI control that toggles sorting order (asc/desc/none).
// Displays an up/down arrow and triggers a callback when the order changes.

import type { OrderControlProps } from "../../types/rm.types";

export function OrderControl({ sortOrder, onChange }: OrderControlProps) {
  const toggleOrder = () => {
    if (sortOrder === "none") return onChange("asc");
    if (sortOrder === "asc") return onChange("desc");
    return onChange("none");
  };

  const arrow = sortOrder === "asc"
    ? "↑"
    : sortOrder === "desc"
    ? "↓"
    : "↕"; // neutral symbol

  return (
    <button
      onClick={toggleOrder}
      className="order-control"
      style={{
        padding: "8px 12px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        background: "white",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "14px",
      }}
    >
      <span>Order by name</span>
      <span style={{ fontSize: "16px" }}>{arrow}</span>
    </button>
  );
}
