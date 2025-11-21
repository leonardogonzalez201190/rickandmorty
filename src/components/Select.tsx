/**
 * Reusable Select component for filtering or choosing options.
 * Supports labeling, placeholder, disabled state, and controlled value.
 */

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  value: string;
  onChange: (newValue: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  disabled = false,
  className = "",
}: SelectProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "140px" }}>
      {label && <label style={{ fontSize: "14px", fontWeight: 500 }}>{label}</label>}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={className}
        style={{
          padding: "8px 12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          backgroundColor: disabled ? "#f5f5f5" : "white",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {/* Placeholder */}
        {value === "" && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {/* Options */}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
