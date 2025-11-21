/**
 * OrderControl: toggles sorting order (asc, desc, none)
 * Redesigned to match the Select component layout.
 */

import type { OrderControlProps } from "../../types/rm.types";

export function OrderControl({ sortOrder, onChange }: OrderControlProps) {
  const toggleOrder = () => {
    if (sortOrder === "none") return onChange("asc");
    if (sortOrder === "asc") return onChange("desc");
    return onChange("none");
  };

  const arrow =
    sortOrder === "asc" ? "↑" : sortOrder === "desc" ? "↓" : "↕";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      <label style={{ fontSize: "14px", fontWeight: 500 }}>
        Order by Name
      </label>

      <button
        onClick={toggleOrder}
        style={{
          padding: "8px 12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          background: "white",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "14px",
        }}
      >
        <span aria-label="order-label" style={{ opacity: 0.8 }}>
          {sortOrder === "none"
            ? "No order"
            : sortOrder === "asc"
            ? "Ascending"
            : "Descending"}
        </span>

        <span style={{ fontSize: "16px" }}>{arrow}</span>
      </button>
    </div>
  );
}
