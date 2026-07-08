import { useCartStore } from "../../stores/cart";
import { useFavoriteStore } from "../../stores/favorites";
import type { Product } from "../../types/products";

interface ProductCardProps {
  product: Product;
  onModalOpen: (id: number) => void;
}

export default function ProductCard({
  product,
  onModalOpen,
}: ProductCardProps) {
  const { favorites, toggleFavorite } = useFavoriteStore();
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <li>
      <div
        onClick={() => {
          onModalOpen(product.id);
        }}
      >
        <h2>{product.title}</h2>
        <p>{product.price}</p>
        <p>{product.rating}</p>
      </div>

      <button onClick={() => toggleFavorite(product.id)}>
        {favorites.includes(product.id)
          ? "Remove from favorite"
          : "Add to favorite"}
      </button>
      <button onClick={() => addToCart(product)}>Add to cart</button>
    </li>
  );
}
