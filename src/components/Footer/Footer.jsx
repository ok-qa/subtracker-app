import { Link, useLocation } from "react-router-dom";
import { Settings } from "@mui/icons-material";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const Footer = () => {
  const location = useLocation();
  const showSettingsButton = location.pathname !== "/settings";
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 2,
        px: 3,
        position: "sticky",
        bottom: 0,
        backgroundColor: theme.palette.mode === "dark" ? "#0F172A" : "#F5F7FB",
        borderTop: "1px solid",
        borderColor: theme.palette.mode === "dark" ? "#64748B" : "#E2E8F0",
        zIndex: 100,
      })}
    >
      {showSettingsButton ? (
        <Button
          component={Link}
          to="/settings"
          variant="outlined"
          size="small"
          loadingIndicator={<CircularProgress color="inherit" size={16} />}
          loadingPosition="center"
          sx={(theme) => ({
            fontWeight: 700,
            borderRadius: "20px",

            borderColor: "#64748B",

            color: theme.palette.mode === "dark" ? "#FFFFFF" : "#0F172A",

            backgroundColor:
              theme.palette.mode === "dark" ? "#0F172A" : "#F5F7FB",

            "&:hover": {
              borderColor: "#4F46E5",

              backgroundColor:
                theme.palette.mode === "dark" ? "#1E293B" : "#E2E8F0",
            },
          })}
          startIcon={<SettingsOutlinedIcon />}
        >
          Settings
        </Button>
      ) : (
        <Box sx={{ width: 100 }} />
      )}
      <Typography variant="body2" color="text.secondary" fontSize="large">
        © {new Date().getFullYear()} SubTracker
      </Typography>
    </Box>
  );
};

export default Footer;
