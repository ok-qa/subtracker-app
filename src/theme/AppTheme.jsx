import { useContext, useMemo } from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";

export default function AppTheme({ children }) {
  const { themeMode } = useContext(ThemeContext);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          ...(themeMode === "dark"
            ? {
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
              }
            : {
                background: {
                  default: "#f5f5f5",
                  paper: "#ffffff",
                },
              }),
        },
      }),
    [themeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
