import { Button } from "@mui/material";

export const GoogleAuthBtn = ({ onClick, mode }) => {
  const btnLabel =
    mode === "signup" ? "Sign up with Google" : "Continue with Google";
  return (
    <Button
      onClick={onClick}
      fullWidth
      variant="outlined"
      sx={(theme) => ({
        textTransform: "none",
        borderColor: "#64748B",
        color:
          theme.palette.mode === "dark"
            ? theme.palette.text.primary
            : theme.palette.text.primary,
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.background.paper
            : theme.palette.background.paper,
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: 1.2,
        py: 1.2,
        fontSize: "0.95rem",
        "&:hover": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#273449" : "#EEF2FF",

          borderColor: theme.palette.mode === "dark" ? "#94A3B8" : "#4F46E5",
        },
      })}
    >
      <img
        src="src/icons/google-icon-logo-svgrepo-com.svg"
        alt="google logo"
        style={{ width: 16, height: 16 }}
      />
      {btnLabel}
    </Button>
  );
};
