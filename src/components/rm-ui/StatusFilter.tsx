/**
 * StatusFilter: filters characters by their life status (alive, dead, unknown).
 */
import { Select } from "../Select";

interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  const statusOptions = [
    { label: "Alive", value: "alive" },
    { label: "Dead", value: "dead" },
    { label: "Unknown", value: "unknown" },
  ];

  return (
    <Select
      label="Status"
      value={value}
      onChange={onChange}
      options={statusOptions}
      placeholder="Any status"
    />
  );
}
