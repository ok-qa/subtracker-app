import { createTheme } from "@mui/material";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

export default function getAppTheme(mode) {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode: mode,

      primary: {
        main: "#4F46E5",
        dark: "#4338CA",
      },

      background: {
        default: isDark ? "#0F172A" : "#F5F7FB",
        paper: isDark ? "#0F172A" : "#FFFFFF",
      },

      text: {
        primary: isDark ? "#F8FAFC" : "#0F172A",
        secondary: "#64748B",
      },
    },

    typography: {
      fontFamily: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        "sans-serif",
      ].join(","),

      h5: {
        fontWeight: 600,
      },

      button: {
        textTransform: "none",
        fontWeight: 500,
      },
    },

    shape: {
      borderRadius: 12,
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: "10px 16px",
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backgroundImage: "unset",
          },
        },
      },

      MuiTextField: {
        defaultProps: {
          variant: "outlined",
        },
        styleOverrides: {
          root: ({ theme }) => ({
            "input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px transparent inset",
              WebkitTextFillColor: `${theme.palette.text.primary} !important`,
              transition: "background-color 9999s ease-in-out 0s",
            },
          }),
        },
      },
    },
  });
}
