interface ProductsSearchProps {
  searchValue: string;
  onSearch: (value: string) => void;
}
export default function ProductsSearch({
  searchValue,
  onSearch,
}: ProductsSearchProps) {
  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    onSearch(e.target.value);
  };

  return <input value={searchValue} onChange={handleSearch} />;
}
