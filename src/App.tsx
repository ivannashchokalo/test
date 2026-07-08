import { useEffect, useMemo, useState } from "react";
import ProductsList from "./components/ProductsList/ProductsList";
import { getProducts, getProductsBySearch } from "./api/api";
import type { Product } from "./types/products";
import ProductsSearch from "./components/ProductsSearch/ProductsSearch";
import Select from "./components/Select/Select";
import { useFavoriteStore } from "./stores/favorites";
import Header from "./components/Header/Header";
import Cart from "./components/Cart/Cart";
import Loading from "./components/Loading/Loading";
import Error from "./components/Error/Error";

export type SelectedValueType = "all" | "favorites";

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
      <Header />
      {isLoading && <Loading />}
      {isError && <Error />}
      <Select value={selectedValue} onSelectChange={setSelectedValue} />
      <ProductsSearch searchValue={searchValue} onSearch={setSearchValue} />
      {filteredProducts && filteredProducts.length > 0 ? (
        <ProductsList products={filteredProducts} />
      ) : (
        <p>Not products</p>
      )}
      <h2>Cart</h2>
      <Cart />
    </>
  );
}

export default App;
