import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";

//Slices
import userSlice from "../reducers/user";
import restaurantSlice from "../reducers/restaurant";

const reducer = combineReducers({
  user: userSlice,
  restaurant: restaurantSlice,
});

const persitConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user"],
};

const persitedReducer = persistReducer(persitConfig, reducer);

export const store = configureStore({
  reducer: persitedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
