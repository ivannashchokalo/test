import { useState } from "react";
import type { Product } from "../../types/products";
import Modal from "../Modal/Modal";
import ProductCard from "../ProductCard/ProductCard";

interface ProductsListProps {
  products: Product[];
}
export default function ProductsList({ products }: ProductsListProps) {
  const [id, setId] = useState<number | null>(null);

  return (
    <>
      <ul>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onModalOpen={setId} />
        ))}
      </ul>
      {id && <Modal onClose={setId} id={id} />}
    </>
  );
}
