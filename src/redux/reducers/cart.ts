import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CartState, MenuItemAction } from "../models/cart";

const initialState: CartState = {
  restaurant: "",
  items: [],
  orderCreated: false,
  orderItems: [],
  orderRestaurant: "",
  paymentMethod: "",
  promo_code_discount: 0,
};

/* Reducers */
const addItemReducer = (state: CartState, { payload }: MenuItemAction) => {
  state.restaurant = payload.restaurantName;

  const isHere = state.items.find((item) => item.title === payload.title);

  if (isHere) {
    const filteredItems = state.items.filter(
      (item) => item.title !== payload.title
    );

    state.items = [
      { ...isHere, quantity: isHere.quantity ? isHere.quantity + 1 : 1 },
      ...filteredItems,
    ];
  }

  if (!isHere) state.items = [...state.items, { ...payload, quantity: 1 }];
};

const removeItemReducer = (state: CartState, { payload }: MenuItemAction) => {
  state.restaurant = payload.restaurantName;

  const isHere = state.items.find((item) => item.title === payload.title);
  const filteredItems = state.items.filter(
    (item) => item.title !== payload.title
  );

  if (!isHere) state.items = state.items;

  if (isHere && isHere.quantity && isHere.quantity > 1) {
    state.items = [
      { ...isHere, quantity: isHere.quantity ? isHere.quantity - 1 : 1 },
      ...filteredItems,
    ];
  }

  if (isHere && isHere.quantity && isHere.quantity === 1) {
    state.items = [...filteredItems];
  }
};

const changePaymentMethodReducer = (
  state: CartState,
  { payload }: PaymentAction
) => {
  state.paymentMethod = payload;
};

const createOrderReducer = (state: CartState) => {
  state.orderCreated = true;
  state.orderItems = state.items;
  state.orderRestaurant = state.restaurant;
  state.items = [];
  state.restaurant = "";
};

const applyDiscountReducer = (state: CartState) => {
  state.promo_code_discount = 5;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: addItemReducer,
    removeItem: removeItemReducer,
    createOrder: createOrderReducer,
    changePaymentMethod: changePaymentMethodReducer,
    applyDiscount: applyDiscountReducer,
  },
});

interface PaymentAction {
  payload: "paypal" | "card";
}

export const {
  addItem,
  removeItem,
  changePaymentMethod,
  createOrder,
  applyDiscount,
} = cartSlice.actions;
export default cartSlice.reducer;
