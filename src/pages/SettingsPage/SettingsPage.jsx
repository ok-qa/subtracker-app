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
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import Layout from "../../components/Layout/Layout";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { themeMode, setThemeMode } = useContext(ThemeContext);

  const [currency, setCurrency] = useState(
    () => localStorage.getItem("currency") || "usd",
  );

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved === null ? true : saved === "true";
  });

  const handleSave = () => {
    localStorage.setItem("currency", currency);
    localStorage.setItem("notifications", notifications.toString());

    navigate("/");
  };

  return (
    <Layout>
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
            value={themeMode}
            onChange={(e) => setThemeMode(e.target.value)}
          >
            <FormControlLabel value="light" control={<Radio />} label="Light" />
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
        <Button
          variant="outlined"
          onClick={handleSave}
          sx={{
            mt: 2,
            "&:focus": { outline: "none" },
            "&.Mui-focusVisible": {
              outline: "none",
            },
          }}
        >
          Save Settings
        </Button>
      </Box>
    </Layout>
  );
};

export default SettingsPage;
