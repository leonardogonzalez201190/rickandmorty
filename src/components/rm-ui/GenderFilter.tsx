/**
 * GenderFilter: filters characters by their gender.
 */
import { Select } from "../Select";

interface GenderFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function GenderFilter({ value, onChange }: GenderFilterProps) {
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Genderless", value: "genderless" },
    { label: "Unknown", value: "unknown" },
  ];

  return (
    <Select
      label="Gender"
      value={value}
      onChange={onChange}
      options={genderOptions}
      placeholder="Any gender"
    />
  );
}
