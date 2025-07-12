import { useState } from "react";
import { IconButton, Box, Typography, Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SubscriptionList from "../SubscriptionList/SubscriptionList";
import SortSubscriptionSelect from "../SortSubscriptionSelect/SortSubscriptionSelect";
import SubscriptionSummary from "../SubscriptionSummary/SubscriptionSummary";
import CategoryFilter from "../SubscriptionFilter/SubscriptionFilter";

const SubscriptionSection = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        My Subscriptions
      </Typography>
      <Button
        variant="contained"
        sx={{ borderRadius: "20px" }}
        startIcon={<FilterListIcon />}
        onClick={() => setFilterOpen(true)}
      >
        Filter Subscriptions
      </Button>
      <CategoryFilter open={filterOpen} onClose={() => setFilterOpen(false)} />

      <SubscriptionSummary />
      <SortSubscriptionSelect />
      <SubscriptionList />
    </Box>
  );
};

export default SubscriptionSection;
