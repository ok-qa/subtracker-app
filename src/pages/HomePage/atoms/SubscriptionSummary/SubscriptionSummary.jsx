import { Box, Typography } from "@mui/material";
import { useSubscriptions } from "../../../../assets/context/SubscriptionContext";


const SubscriptionSummary = () => {
  const { totalCostMonthly } = useSubscriptions();
  return (
    <Box sx={{ textAlign: "center", my: 2 }}>
      <Typography variant="h6">
        Total Monthly Cost: ${totalCostMonthly.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default SubscriptionSummary;