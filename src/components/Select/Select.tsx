interface SelectProps {
  value: string;
  onSelectChange: (value: string) => void;
}

export default function Select({ value, onSelectChange }: SelectProps) {
  return (
    <select value={value} onChange={(e) => onSelectChange(e.target.value)}>
      <option value="all">All</option>
      <option value="favorites">Favorites</option>
    </select>
  );
}
