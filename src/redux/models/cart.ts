export interface CartState {
  restaurant: string;
  items: Array<IMenuItem>;
}

export interface IMenuItem {
  title: string;
  description: string;
  price: string;
  image: string;
  quantity?: number;
}

export interface MenuItemAction {
  payload: IMenuItem;
}
