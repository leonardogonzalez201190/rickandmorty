/**
 * SpeciesFilter: filters characters by species.
 * Initial options can be expanded based on API usage.
 */
import { Select } from "../Select";

interface SpeciesFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function SpeciesFilter({ value, onChange }: SpeciesFilterProps) {
  const speciesOptions = [
    { label: "Human", value: "human" },
    { label: "Humanoid", value: "humanoid" },
    { label: "Alien", value: "alien" },
    { label: "Animal", value: "animal" },
    { label: "Robot", value: "robot" },
    { label: "Mythological", value: "mythological creature" },
    { label: "Unknown", value: "unknown" },
  ];

  return (
    <Select
      label="Species"
      value={value}
      onChange={onChange}
      options={speciesOptions}
      placeholder="Any species"
    />
  );
}
