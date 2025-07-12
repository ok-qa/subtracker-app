import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

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
        sx={{ borderRadius: "20px" }}
        onClick={() => navigate("/add")}
      >
        Add Subscription
      </Button>
    </Box>
  );
}
