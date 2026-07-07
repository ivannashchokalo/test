import { useEffect, useMemo, useState } from "react";
import ProductsList from "./components/ProductsList/ProductsList";
import { getProducts, getProductsBySearch } from "./api/api";
import type { Product } from "./types/product";
import ProductsSearch from "./components/ProductsSearch/ProductsSearch";
import Select from "./components/Select/Select";
import { useFavoriteStore } from "./stores/store";

type SelectedValueType = "all" | "favorites";

function App() {
  const [products, setProducts] = useState<Product[]>();
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedValue, setSelectedValue] = useState<SelectedValueType>("all");
  const favorites = useFavoriteStore((state) => state.favorites);

  const filteredProducts = useMemo(() => {
    if (selectedValue === "all") {
      return products;
    } else {
      return products?.filter((product) => favorites.includes(product.id));
    }
  }, [products, favorites, selectedValue]);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        if (searchValue) {
          const products = await getProductsBySearch(searchValue);
          setProducts(products.products);
        } else {
          const products = await getProducts();
          setProducts(products.products);
        }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [searchValue]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      <Select value={selectedValue} onSelectChange={setSelectedValue} />
      <ProductsSearch searchValue={searchValue} onSearch={setSearchValue} />
      {filteredProducts && filteredProducts.length > 0 ? (
        <ProductsList products={filteredProducts} />
      ) : (
        <p>Not products</p>
      )}
    </>
  );
}

export default App;
