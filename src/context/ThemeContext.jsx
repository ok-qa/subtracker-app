import { createContext, useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme, setTheme } from "../localStorage";
import getAppTheme from "../theme/AppTheme";

export const ThemeContextProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    const currentTheme = getTheme();

    return currentTheme;
  });

  const theme = getAppTheme(themeMode);

  useEffect(() => {
    setTheme(themeMode);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const ThemeContext = createContext();
