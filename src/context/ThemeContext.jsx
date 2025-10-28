import { createContext, useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getTheme, setTheme } from "../localStorage";

export const ThemeContextProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    const currentTheme = getTheme();
    return currentTheme;
  });

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

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
