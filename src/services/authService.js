import { resetToken, setToken } from "../store/slices/app";
import {
  signIn as loginRequest,
  signUp as signUpRequest,
  logout as logoutUser,
} from "../api";
import { removeToken, saveToken } from "../localStorage";

export const signIn = async (values, dispatch) => {
  const response = await loginRequest(values);
  const { accessToken } = response;

  saveToken(accessToken);

  dispatch(setToken(accessToken));
};

export const signUp = async (values, dispatch) => {
  const response = await signUpRequest(values);
  const { accessToken } = response;
  saveToken(accessToken);

  const user = response?.data?.user;

  dispatch(setToken(accessToken));

  return { accessToken, user };
};

export const logout = async (dispatch) => {
  try {
    await logoutUser();
    removeToken();
    dispatch(resetToken());
  } catch (error) {
    console.error("Logout failed: ", error);
  }
};
