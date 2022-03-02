import { createSlice } from "@reduxjs/toolkit";
import { AddressState, IAddress, IAddressAction } from "../models/address";

const initialState: AddressState = {
  selectedAddress: {
    name_tag: "Home",
    address: "13A Havinr Street, New York",
  },
  items: [
    {
      name_tag: "Home",
      address: "13A Havinr Street, New York",
    },
  ],
};

/* Reducers */

const createAddressReducer = (
  state: AddressState,
  { payload }: IAddressAction
) => {
  state.items = [...state.items, payload];
};

interface UpdateAddressAction {
  payload: {
    addressToEditNameTag: string;
    newAddress: IAddress;
  };
}

const removeAddressReducer = (
  state: AddressState,
  { payload }: IAddressAction
) => {
  state.items = state.items.filter(
    (item) => item.name_tag !== payload.name_tag
  );
};

const selectAddressReducer = (
  state: AddressState,
  { payload }: IAddressAction
) => {
  state.selectedAddress = payload;
};
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    createAddress: createAddressReducer,
    removeAddress: removeAddressReducer,
    selectAddress: selectAddressReducer,
  },
});

export const { createAddress, removeAddress, selectAddress } =
  addressSlice.actions;
export default addressSlice.reducer;
