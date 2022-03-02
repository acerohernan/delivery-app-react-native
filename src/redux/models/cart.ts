export interface CartState {
  restaurant: string;
  items: Array<IMenuItem>;
  orderCreated: boolean;
  orderItems: Array<IMenuItem>;
  orderRestaurant: string;
  paymentMethod: "" | "paypal" | "card";
  promo_code_discount: number;
}

export interface IMenuItem {
  title: string;
  description: string;
  price: string;
  image: string;
  quantity?: number;
  restaurantName: string;
}

export interface MenuItemAction {
  payload: IMenuItem;
}
