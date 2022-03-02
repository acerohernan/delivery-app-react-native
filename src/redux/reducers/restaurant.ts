import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../config";
import { RestaurantState } from "../models";

const initialState: RestaurantState = {
  category: "",
  items: [],
  status: "",
};

/* Thunk Get Restaurants*/
export const getRestaurants = createAsyncThunk<any, void>(
  "restaurant/get",
  async () => {
    const response = await fetchData(
      "6527pEhQpqET7QJ5nEXSRAlP4oQfpRI1sJQYt6CbEWDSUPMS17IudcbxbpVqpNUNbIfH94q9giPucxLFZxDXW7pP4__4jmixgDCp45VBS88s4cVbOGbSqul8skoRYnYx"
    ).get("/search?term=restaurants&location=LA");
    const dataResponse = (await response).data;
    return dataResponse.businesses;
  }
);

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRestaurants.pending, (state) => {
      state.status = "getRestaurants_loading";
    });
    builder.addCase(getRestaurants.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.status = "getRestaurants_success";
    });
    builder.addCase(getRestaurants.rejected, (state) => {
      state.status = "getRestaurants_rejected";
    });
  },
});

export default restaurantSlice.reducer;
