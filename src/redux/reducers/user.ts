import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  token: string;
  email: string;
  first_name: string;
  last_name: string;
}

const initialState: UserState = {
  token: "",
  email: "",
  first_name: "",
  last_name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeName: (state, { payload }) => {
      state.first_name = payload;
    },
  },
});

export const { changeName } = userSlice.actions;
export default userSlice.reducer;
