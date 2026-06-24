import { Button } from "@mui/material";

const AuthSubmitBtn = ({ disabled, title, onClick }) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      size="large"
      disabled={disabled}
      onClick={onClick}
      sx={{
        height: 52,
        mt: 3,
        borderRadius: 1,
        textTransform: "none",
        fontSize: 15,
        fontWeight: 600,
        background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
        boxShadow: "0 4px 12px -4px rgba(79,70,229,0.6)",
        "&:hover": {
          background: "linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)",
          boxShadow: "0 12px 24px -8px rgba(79,70,229,0.5)",
        },

        // Disabled state — overrides MUI default grey button
        "&.Mui-disabled": {
          background: (theme) =>
            theme.palette.mode === "dark" ? "#0E1426" : "#F8FAFC",
          color: (theme) =>
            theme.palette.mode === "dark" ? "#64748B" : "#94A3B8",
          border: (theme) =>
            ` 1px solid ${theme.palette.mode === "dark" ? "#252D4A" : "#64748B"}`,
          boxShadow: "none",
          opacity: 0.7,
          cursor: "not-allowed",
        },
      }}
    >
      {title}
    </Button>
  );
};

export default AuthSubmitBtn;
