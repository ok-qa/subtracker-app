import { useLocation } from "react-router-dom";
import AddSubscriptionBtn from "../AddSubscriptionBtn/AddSubscriptionBtn";
import LogoutButton from "../LogoutButton/LogoutButton";
import styles from "./Header.module.css";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <div className={styles.header}>
      <h3 className={styles.title}>SubTracker</h3>
      <div className={styles.actions}>
        {isHomePage && <AddSubscriptionBtn />}
        <LogoutButton />
      </div>
    </div>
  );
};

export default Header;
