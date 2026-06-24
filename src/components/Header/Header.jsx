import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import AddSubscriptionBtn from "../AddSubscriptionBtn/AddSubscriptionBtn";
import UserProfileButton from "../UserProfileButton/UserProfileButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import HomeButton from "../HomeButton/HomeButton";
import LogoTitleContainer from "../LogoTitleContainer/LogoTitleContainer";

const Header = ({ open, setOpen }) => {
  const location = useLocation();
  const user = useSelector((state) => state.app.user);

  const isHomePage = location.pathname === "/";
  const isProfilePage = location.pathname === "/profile";

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      sx={(theme) => ({
        borderBottom: "1px solid #ccc",
        borderRadius: 0,
        backgroundColor: theme.palette.mode === "dark" ? "#0F172A" : "#F5F7FB",
      })}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 2,
        }}
      >
        {!isHomePage && <HomeButton />}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {isHomePage && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              disableRipple
              sx={{
                ...(open && { display: "none" }),
                px: 3,

                "&:focus": {
                  outline: "none",
                },
                "&.Mui-focusVisible": {
                  outline: "none",
                },
                "&:hover": {
                  bgcolor: "transparent",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>

        <LogoTitleContainer styles={{ mb: 0 }} />

        <Box
          sx={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "12px",
          }}
        >
          {isHomePage && <AddSubscriptionBtn />}

          {isProfilePage && <LogoutButton />}

          {!isProfilePage && (
            <UserProfileButton userName={user?.name || "User"} />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
