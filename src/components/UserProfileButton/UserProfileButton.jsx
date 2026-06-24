import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton, Tooltip, Typography } from "@mui/material";

const UserProfileButton = ({ userName }) => {
  const navigate = useNavigate();
  const firstLetter = userName.charAt(0).toUpperCase();

  return (
    <Tooltip title="User Profile">
      <IconButton
        color="inherit"
        onClick={() => navigate("/profile")}
        sx={(theme) => ({
          width: 36,
          height: 36,
          borderRadius: "50%",

          color: "#FFFFFF",

          backgroundColor:
            theme.palette.mode === "dark" ? "#4338CA" : "#4F46E5",

          "&:hover": {
            backgroundColor:
              theme.palette.mode === "dark" ? "#4F46E5" : "#4338CA",
          },

          "&:focus": {
            outline: "none",
          },

          "&:focus-visible": {
            outline: "none",
          },

          mr: 2,
        })}
      >
        <Typography
          sx={{
            fontSize: "0.95rem",
            fontWeight: 600,
            lineHeight: 1,
          }}
        >
          {firstLetter}
        </Typography>
      </IconButton>
    </Tooltip>
  );
};

export default UserProfileButton;
