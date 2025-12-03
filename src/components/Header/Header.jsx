import { useLocation } from "react-router-dom";
import AddSubscriptionBtn from "../AddSubscriptionBtn/AddSubscriptionBtn";
import UserProfileButton from "../UserProfileButton/UserProfileButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import styles from "./Header.module.css";
import HomeButton from "../HomeButton/HomeButton";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isProfilePage = location.pathname === "/profile";

  return (
    <div className={styles.header}>
      {!isHomePage && <HomeButton />}
      <h3 className={styles.title}>SubTracker</h3>
      <div className={styles.actions}>
        {isHomePage && <AddSubscriptionBtn />}
        {isProfilePage && <LogoutButton />}
        {!isProfilePage && <UserProfileButton />}
        {/* <UserProfileButton /> */}
      </div>
    </div>
  );
};

export default Header;
