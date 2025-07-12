import { useLocation } from "react-router-dom";
import AddSubscriptionBtn from "../AddSubscriptionBtn/AddSubscriptionBtn";
import styles from "./Header.module.css";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <div className={styles.header}>
      <h3 className={styles.title}>SubTracker</h3>
      {isHomePage && <AddSubscriptionBtn />}
    </div>
  );
};

export default Header;
