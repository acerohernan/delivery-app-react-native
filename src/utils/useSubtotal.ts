import { useState, useEffect } from "react";
import { useAppSelector } from "../redux";

export const useSubtotal = () => {
  const [subtotal, setSubtotal] = useState("");

  const { items } = useAppSelector((state) => state.cart);

  useEffect(() => {
    let value = 0;

    if (items.length > 0) {
      items.map((item) => {
        const price = Number(item.price.slice(1));
        value = value + price * (item.quantity ? item.quantity : 1);
      });
    }

    setSubtotal(value.toFixed(2));
  }, [items]);

  return subtotal;
};
