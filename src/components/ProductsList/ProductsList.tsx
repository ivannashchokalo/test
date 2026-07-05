import { useFavoriteStore } from "../../stores/store";
import type { Product } from "../../types/product";

interface ProductsListProps {
  products: Product[];
}
export default function ProductsList({ products }: ProductsListProps) {
  const { favorites, toggleFavorite } = useFavoriteStore();
  return (
    <ul>
      {products.map(({ id, title, price, rating }) => (
        <li key={id}>
          <h2>{title}</h2>
          <p>{price}</p>
          <p>{rating}</p>
          <button onClick={() => toggleFavorite(id)}>
            {favorites.includes(id) ? "remove" : "add"}
          </button>
        </li>
      ))}
    </ul>
  );
}
