import { Box, Typography, Button } from "@mui/material";
import SubscriptionList from "../SubscriptionList/SubscriptionList";
import SortSubscriptionSelect from "../SortSubscriptionSelect/SortSubscriptionSelect";
import SubscriptionSummary from "../SubscriptionSummary/SubscriptionSummary";

const SubscriptionSection = () => {
  return (
    <Box sx={{ p: 2, width: "100%", flex: 1 }}>
      <Typography variant="h4" align="center" gutterBottom>
        My Subscriptions
      </Typography>

      <SubscriptionSummary />
      <SortSubscriptionSelect />
      <SubscriptionList />
    </Box>
  );
};

export default SubscriptionSection;
