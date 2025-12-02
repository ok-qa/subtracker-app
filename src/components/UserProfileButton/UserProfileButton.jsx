import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton, Tooltip } from "@mui/material";

const UserProfileButton = () => {
  const navigate = useNavigate();

  return (
    <Tooltip title="User Profile">
      <IconButton
        color="inherit"
        onClick={() => navigate("/profile")}
        sx={{
          color: "inherit",
          padding: 0,
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:focus": { outline: "none" },
          "&:focus-visible": { outline: "none" },
          mr: 2,
        }}
      >
        <AccountCircleIcon />
      </IconButton>
    </Tooltip>
  );
};

export default UserProfileButton;
