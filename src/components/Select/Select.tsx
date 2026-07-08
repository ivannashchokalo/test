import type { SelectedValueType } from "../../App";

interface SelectProps {
  value: string;
  onSelectChange: (value: SelectedValueType) => void;
}

export default function Select({ value, onSelectChange }: SelectProps) {
  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) => {
    const value = e.target.value as SelectedValueType;
    onSelectChange(value);
  };
  return (
    <select value={value} onChange={handleSelectChange}>
      <option value="all">All</option>
      <option value="favorites">Favorites</option>
    </select>
  );
}
