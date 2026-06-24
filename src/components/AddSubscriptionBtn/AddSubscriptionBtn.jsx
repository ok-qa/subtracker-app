import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AddSubscriptionBtn() {
  const navigate = useNavigate();

  return (
    <Box
      display="inline-flex"
      justifyContent="center"
      alignItems="center"
      // width="100%"
    >
      <Button
        variant="contained"
        color="primary"
        sx={{
          borderRadius: "20px",
          "&:focus": { outline: "none" },
          "&.Mui-focusVisible": {
            outline: "none",
          },
        }}
        onClick={() => navigate("/add")}
      >
        <AddIcon fontSize="small" />
        <Typography
          sx={{ ml: 1, fontWeight: 700, display: { xs: "none", sm: "block" } }}
        >
          Add subscription
        </Typography>
      </Button>
    </Box>
  );
}
