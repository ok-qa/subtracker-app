const TOKEN_KEY = "token";
const THEME_KEY = "theme";

export const getTheme = () => {
  return localStorage.getItem(THEME_KEY) || "light";
};

export const setTheme = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
