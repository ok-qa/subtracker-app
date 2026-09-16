import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../localStorage";

const initialState = {
  token: getToken(),
  user: null,
  featureFlags: null,
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
    setFeatureFlags: (state, action) => {
      const parsedFlags = action.payload.reduce((acc, currentValue) => {
        acc[currentValue.name] = currentValue.value;
        return acc;
      }, {});
      state.featureFlags = parsedFlags;
    },
  },
});

export const { setToken, setUser, resetToken, setFeatureFlags } =
  appSlice.actions;
export default appSlice.reducer;
