import { Box, Typography } from "@mui/material";

const LogoTitleContainer = ({ styles }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: 3,
        ...styles,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 36,
          height: 36,
          borderRadius: "10px",
          backgroundColor: "#4F46E5",
          fontWeight: 700,
          color: "#FFFFFF",
        }}
      >
        S
      </Box>
      <Typography
        variant="body1"
        color="text.primary"
        sx={{ ml: 2, fontWeight: 700, display: { xs: "none", sm: "block" } }}
      >
        SubTracker
      </Typography>
    </Box>
  );
};

export default LogoTitleContainer;
