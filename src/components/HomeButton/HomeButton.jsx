import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton } from "@mui/material";

const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <IconButton
      onClick={() => navigate("/")}
      sx={{
        color: "inherit",
        padding: 0,
        "&:hover": {
          backgroundColor: "transparent",
        },
        "&:focus": { outline: "none" },
        "&:focus-visible": { outline: "none" },
        ml: 3,
      }}
      disableRipple
    >
      <HomeIcon />
    </IconButton>
  );
};

export default HomeButton;
