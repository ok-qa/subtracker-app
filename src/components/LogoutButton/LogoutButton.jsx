import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../services/authService";
import { useDispatch } from "react-redux";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logout(dispatch);
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <Button
      color="inherit"
      variant="outlined"
      startIcon={<LogoutIcon />}
      onClick={handleLogout}
      sx={{
        borderRadius: "8px",
        textTransform: "none",
        fontWeight: 500,
        ml: 2,
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
