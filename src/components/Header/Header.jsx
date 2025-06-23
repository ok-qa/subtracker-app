import SubscriptionSummary from "../SubscriptionSummary/SubscriptionSummary";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <h3 className={styles.title}>SubTracker</h3>
    </div>
  );
};

export default Header;
