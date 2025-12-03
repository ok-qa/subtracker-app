import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import UserProfile from "./UserProfile";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  return (
    <div className={styles.ProfilePage}>
      <Header />
      <div className={styles.profileContent}>
        <UserProfile />
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
