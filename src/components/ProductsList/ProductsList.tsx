import { useState } from "react";
import { useFavoriteStore } from "../../stores/store";
import type { Product } from "../../types/product";
import Modal from "../Modal/Modal";

interface ProductsListProps {
  products: Product[];
}
export default function ProductsList({ products }: ProductsListProps) {
  const { favorites, toggleFavorite } = useFavoriteStore();
  const [id, setId] = useState<number | null>(null);

  return (
    <>
      <ul>
        {products.map(({ id, title, price, rating }) => {
          return (
            <li
              key={id}
              onClick={() => {
                setId(id);
              }}
            >
              <h2>{title}</h2>
              <p>{price}</p>
              <p>{rating}</p>
              <button onClick={() => toggleFavorite(id)}>
                {favorites.includes(id) ? "remove" : "add"}
              </button>
            </li>
          );
        })}
      </ul>
      {id && <Modal onClose={setId} id={id} />}
    </>
  );
}
