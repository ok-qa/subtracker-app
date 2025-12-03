import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../localStorage";

const initialState = {
  token: getToken(),
  user: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, setUser, resetToken } = appSlice.actions;
export default appSlice.reducer;
