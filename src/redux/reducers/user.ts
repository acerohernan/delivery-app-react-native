import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserState } from "../models/user";

const initialState: UserState = {
  status: "",
  username: "",
  email: "",
  isLogin: false,
  showOnboard: true,
};

/* Reducers */
interface SignUpAction {
  payload: {
    username: string;
    email: string;
  };
}

const signUpReducer = (state: UserState, { payload }: SignUpAction) => {
  const { username, email } = payload;
  state.username = username;
  state.email = email;
  state.isLogin = true;
};

const disabledOnboardReducer = (state: UserState) => {
  state.showOnboard = false;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUp: signUpReducer,
    disabledOnboard: disabledOnboardReducer,
  },
});

export const { signUp, disabledOnboard } = userSlice.actions;
export default userSlice.reducer;
