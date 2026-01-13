import { Button } from "@mui/material";

// TODO: add shadow to the button
export const GoogleAuthBtn = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      fullWidth
      variant="outlined"
      sx={{
        textTransform: "none",
        borderColor: "#dadce0",
        color: "#3c4043",
        backgroundColor: "#fff",
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: 1.2,
        py: 1.2,
        fontSize: "0.95rem",
        "&:hover": {
          backgroundColor: "#f7f8f8",
          borderColor: "#dadce0",
        },
      }}
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="google logo"
        style={{ width: 20, height: 20 }}
      />
      Sign in with Google
    </Button>
  );
};
