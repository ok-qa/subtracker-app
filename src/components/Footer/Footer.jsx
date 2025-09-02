import { Link, useLocation } from "react-router-dom";
import { Settings } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";

import styles from "./Footer.module.css";

const Footer = () => {
  const location = useLocation();
  const showSettingsButton = location.pathname !== "/settings";
  return (
    <div className={styles.footer}>
      {showSettingsButton ? (
        <Button
          component={Link}
          to="/settings"
          loadingIndicator={<CircularProgress color="inherit" size={16} />}
          loadingPosition="center"
          size="small"
          variant="outlined"
          sx={{
            borderRadius: "20px",
            marginLeft: "16px",
            color: "white",
            borderColor: "white",
          }}
          startIcon={<Settings />}
        >
          Settings
        </Button>
      ) : (
        <div style={{ width: "100px" }} />
      )}
      <p className={styles.text}>© 2025 SubTracker</p>
    </div>
  );
};

export default Footer;
