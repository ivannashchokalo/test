import { useCartStore } from "../../stores/cart";

export default function Header() {
  const products = useCartStore((state) => state.products);
  let productsQuantity = 0;
  let totalPrice = 0;

  for (const product of products) {
    productsQuantity += product.quantity;
    totalPrice += product.price * product.quantity;
  }
  return (
    <div>
      <p>Cart({productsQuantity})</p>
      <p>Total: ${totalPrice}</p>
    </div>
  );
}
