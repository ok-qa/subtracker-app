import { Link, useLocation } from "react-router-dom";
import { Settings } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";

import SettingsPage from "../../pages/SettingsPage/SettingsPage";
import styles from "./Footer.module.css";

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <div className={styles.footer}>
      {isHomePage ? (
        <Button
          component={Link}
          to="/settings"
          loadingIndicator={<CircularProgress color="inherit" size={16} />}
          loadingPosition="center"
          size="small"
          variant="outlined"
          sx={{ borderRadius: "20px", marginLeft: "16px" }}
          startIcon={<Settings />}
        >
          Settings
        </Button>
      ) : (
        <div /> // Empty placeholder
      )}
      <p className={styles.text}>© 2025 SubTracker</p>
    </div>
  );
};

export default Footer;
