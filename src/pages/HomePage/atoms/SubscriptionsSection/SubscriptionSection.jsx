import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SubscriptionList from "../SubscriptionList/SubscriptionList";
import SortSubscriptionSelect from "../SortSubscriptionSelect/SortSubscriptionSelect";
import SubscriptionSummary from "../SubscriptionSummary/SubscriptionSummary";
import CategoryFilter from "../FilterByCategories/FilterByCategories";
import TermFilter from "../FilterByTerm/FilterByTerm";
import SearchByName from "../SearchByName/SearchByName";
import { useSubscriptions } from "../../../../context/SubscriptionContext";
import PriceRangeSlider from "../PriceRangeSlider/PriceRangeSlider";

const SubscriptionSection = () => {
  const [categoryFilterOpen, setCategoryFilterOpen] = useState(false);
  const [termFilterOpen, setTermFilterOpen] = useState(false);

  const { handleSearch, handleSlider } = useSubscriptions();

  return (
    <Box sx={{ p: 2, width: "100%", flex: 1 }}>
      <Typography variant="h4" align="center" gutterBottom>
        My Subscriptions
      </Typography>
      <Button
        variant="contained"
        sx={{ borderRadius: "20px", marginLeft: "16px" }}
        startIcon={<FilterListIcon />}
        onClick={() => setCategoryFilterOpen(true)}
      >
        Filter by Categories
      </Button>
      <CategoryFilter
        open={categoryFilterOpen}
        onClose={() => setCategoryFilterOpen(false)}
      />

      <Button
        variant="contained"
        sx={{ borderRadius: "20px", marginLeft: "16px" }}
        startIcon={<FilterListIcon />}
        onClick={() => setTermFilterOpen(true)}
      >
        Filter by Terms
      </Button>
      <TermFilter
        open={termFilterOpen}
        onClose={() => setTermFilterOpen(false)}
      />

      <PriceRangeSlider handleSlider={handleSlider} />

      <SearchByName onSearch={handleSearch} />

      <SubscriptionSummary />
      <SortSubscriptionSelect />
      <SubscriptionList />
    </Box>
  );
};

export default SubscriptionSection;
