import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../localStorage";

const initialState = {
  token: getToken(),
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    resetToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, resetToken } = appSlice.actions;
export default appSlice.reducer;
