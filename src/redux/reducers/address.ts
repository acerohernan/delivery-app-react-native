import { createSlice } from "@reduxjs/toolkit";
import { AddressState, IAddress, IAddressAction } from "../models/address";

const initialState: AddressState = {
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

const updateAddressReducer = (
  state: AddressState,
  { payload }: UpdateAddressAction
) => {
  const itemToEdit = state.items.find(
    (item) => item.name_tag === payload.addressToEditNameTag
  );
  const filteredItems = state.items.filter(
    (item) => item.name_tag !== payload.addressToEditNameTag
  );

  state.items = [...filteredItems, { ...payload.newAddress }];
};

const removeAddressReducer = (
  state: AddressState,
  { payload }: IAddressAction
) => {
  state.items = state.items.filter(
    (item) => item.name_tag !== payload.name_tag
  );
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    createAddress: createAddressReducer,
    updateAddress: updateAddressReducer,
    removeAddress: removeAddressReducer,
  },
});

export const { createAddress, updateAddress, removeAddress } =
  addressSlice.actions;
export default addressSlice.reducer;
