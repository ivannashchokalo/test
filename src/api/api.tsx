import axios from "axios";
import type { Product } from "../types/product";

interface GetProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const getProducts = async () => {
  const { data } = await axios.get<GetProductsResponse>(
    "https://dummyjson.com/products",
  );
  return data;
};

export const getProductsBySearch = async (searchValue: string) => {
  const { data } = await axios.get<GetProductsResponse>(
    `https://dummyjson.com/products/search?q=${searchValue}`,
  );
  return data;
};
