import axios from "axios";
import type { Product } from "../types/products";

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const api = axios.create({
  baseURL: "https://dummyjson.com/products",
});

export const getProducts = async () => {
  const { data } = await api.get<ProductsResponse>("/");
  return data;
};

export const getProductsBySearch = async (searchValue: string) => {
  const { data } = await api.get<ProductsResponse>(`/search?q=${searchValue}`);
  return data;
};

export const getProductById = async (id: number) => {
  const { data } = await api.get<Product>(`/${id}`);
  return data;
};
