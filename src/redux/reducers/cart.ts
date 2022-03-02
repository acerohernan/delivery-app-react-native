import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CartState, MenuItemAction } from "../models/cart";

const initialState: CartState = {
  restaurant: "",
  items: [],
  orderCreated: false,
  paymentMethod: "",
};

/* Reducers */
const addItemReducer = (state: CartState, { payload }: MenuItemAction) => {
  state.orderCreated = false;

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
  state.orderCreated = false;

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
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: addItemReducer,
    removeItem: removeItemReducer,
    createOrder: createOrderReducer,
    changePaymentMethod: changePaymentMethodReducer,
  },
});

interface PaymentAction {
  payload: "paypal" | "card";
}

export const { addItem, removeItem, changePaymentMethod, createOrder } =
  cartSlice.actions;
export default cartSlice.reducer;
