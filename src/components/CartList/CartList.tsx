import { useCartStore } from "../../stores/cart";

export default function CartList() {
  const { products, removeFromCart, increase, decrease } = useCartStore();
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <p>{product.title}</p>
          <p>{product.price}</p>
          <p>{product.quantity}</p>
          <button onClick={() => increase(product.id)}>+</button>
          <button onClick={() => decrease(product.id)}>-</button>
          <button onClick={() => removeFromCart(product.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}
