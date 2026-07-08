import { useCartStore } from "../../stores/cart";
import CartList from "../CartList/CartList";

export default function Cart() {
  const { clearCart } = useCartStore();

  return (
    <>
      <button onClick={clearCart}>Clear</button>
      <CartList />
    </>
  );
}
