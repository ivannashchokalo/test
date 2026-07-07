import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getProductById } from "../../api/api";
import type { Product } from "../../types/product";

interface ModalProps {
  onClose: (v: number | null) => void;
  id: number;
}

export default function Modal({ onClose, id }: ModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const product = await getProductById(id);
        setProduct(product);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();

    const handleEscPress = (e: KeyboardEvent) => {
      if (e.code === "Escape") onClose(null);
    };

    document.addEventListener("keydown", handleEscPress);

    return () => {
      document.removeEventListener("keydown", handleEscPress);
    };
  }, [id, onClose]);

  return createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(null);
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "gray",
      }}
    >
      {isLoading && <p>Loading</p>}
      {isError && <p>Error</p>}
      <div style={{ width: 500, height: 500 }}>
        {product && (
          <>
            <img
              src={product.images[0]}
              alt="product"
              width={200}
              height={200}
            />
            <p>{product.description}</p>
            <p>{product.brand}</p>
            <p>{product.category}</p>
            <p>{product.price}</p>
            <p>{product.rating}</p>
          </>
        )}
        <button onClick={() => onClose(null)}>Close</button>
      </div>
    </div>,
    document.body,
  );
}
