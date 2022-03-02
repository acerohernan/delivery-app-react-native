import { useState, useEffect } from "react";
import { useAppSelector } from "../redux";

export const useSubtotal = () => {
  const [subtotal, setSubtotal] = useState("");
  const [subtotalOrder, setSubtotalOrder] = useState("");

  const { items, orderItems } = useAppSelector((state) => state.cart);

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

  useEffect(() => {
    let value = 0;

    if (orderItems.length > 0) {
      orderItems.map((item) => {
        const price = Number(item.price.slice(1));
        value = value + price * (item.quantity ? item.quantity : 1);
      });
    }

    setSubtotalOrder(value.toFixed(2));
  }, [orderItems]);

  return [subtotal, subtotalOrder];
};
