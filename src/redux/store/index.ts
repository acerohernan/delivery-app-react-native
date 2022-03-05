import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";

//Slices
import userSlice from "../reducers/user";
import restaurantSlice from "../reducers/restaurant";
import cartSlice from "../reducers/cart";
import addressSlice from "../reducers/address";

const reducer = combineReducers({
  user: userSlice,
  restaurant: restaurantSlice,
  cart: cartSlice,
  address: addressSlice,
});

const persitConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "cart", "address"],
};

const persitedReducer = persistReducer(persitConfig, reducer);

export const store = configureStore({
  reducer: persitedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
