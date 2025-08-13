import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  Paper,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import styles from "./SettingsPage.module.css";

const SettingsPage = () => {
  const navigate = useNavigate();

  const [currency, setCurrency] = useState(
    () => localStorage.getItem("currency") || "usd"
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved === null ? true : saved === "true";
  });

  const handleSave = () => {
    localStorage.setItem("currency", currency);
    localStorage.setItem("theme", theme);
    localStorage.setItem("notifications", notifications.toString());

    navigate("/");
  };

  return (
    <div className={styles.settingsPage}>
      {/* {" "} */}
      <Header />
      <div className={styles.settingsContent}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Settings
          </Typography>

          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Currency
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="currency-label">Currency</InputLabel>
              <Select
                labelId="currency-label"
                value={currency}
                label="Currency"
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value="usd">USD ($)</MenuItem>
                <MenuItem value="eur">EUR (€)</MenuItem>
                <MenuItem value="uah">UAH (₴)</MenuItem>
              </Select>
            </FormControl>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Theme
            </Typography>
            <RadioGroup
              row
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <FormControlLabel
                value="light"
                control={<Radio />}
                label="Light"
              />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
            </RadioGroup>
          </Paper>

          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
              }
              label="Enable email reminders for upcoming payments"
            />
          </Paper>
          <Button variant="outlined" onClick={handleSave} sx={{ mt: 2 }}>
            Save Settings
          </Button>
        </Box>
      </div>
      <Footer />
    </div>
  );
};

export default SettingsPage;
