import { useEffect, useState } from "react";
import ProductsList from "./components/ProductsList/ProductsList";
import { getProducts, getProductsBySearch } from "./api/api";
import type { Product } from "./types/product";
import ProductsSearch from "./components/ProductsSearch/ProductsSearch";

function App() {
  const [products, setProducts] = useState<Product[]>();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();

      setProducts(products.products);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProductsBySearch = async () => {
      const products = await getProductsBySearch(searchValue);
      setProducts(products.products);
    };
    fetchProductsBySearch();
  }, [searchValue]);

  return (
    <>
      <ProductsSearch searchValue={searchValue} onSearch={setSearchValue} />
      {products && products.length > 0 && <ProductsList products={products} />}
    </>
  );
}

export default App;
