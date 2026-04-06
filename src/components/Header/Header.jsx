import { useLocation } from "react-router-dom";
import AddSubscriptionBtn from "../AddSubscriptionBtn/AddSubscriptionBtn";
import UserProfileButton from "../UserProfileButton/UserProfileButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import HomeButton from "../HomeButton/HomeButton";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import styles from "./Header.module.css";

const Header = ({ open, setOpen }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isProfilePage = location.pathname === "/profile";

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <div className={styles.header}>
      {!isHomePage && <HomeButton />}
      <div className={styles.leftContainer}>
        {isHomePage && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </div>

      <div className={styles.titleContainer}>
        <h3 className={styles.title}>SubTracker</h3>
      </div>
      <div className={styles.actions}>
        {isHomePage && <AddSubscriptionBtn />}
        {isProfilePage && <LogoutButton />}
        {!isProfilePage && <UserProfileButton />}
      </div>
    </div>
  );
};

export default Header;
