import {
  Box,
  Drawer,
  Typography,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";

import { useSubscriptions } from "../../../../context/SubscriptionContext";
import CategoryFilter from "../FilterByCategories/FilterByCategories";
import TermFilter from "../FilterByTerm/FilterByTerm";
import SearchByName from "../SearchByName/SearchByName";
import PriceRangeSlider from "../PriceRangeSlider/PriceRangeSlider";

const drawerWidth = 280;

const FilterSidebar = ({ open, setOpen }) => {
  const [categoryFilterOpen, setCategoryFilterOpen] = useState(false);
  const [termFilterOpen, setTermFilterOpen] = useState(false);
  const { handleSearch, clearAllFilters } = useSubscriptions();

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: open ? drawerWidth : 0,
        flexShrink: 0,
        transition: "width 0.3s ease",
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : 0,
          boxSizing: "border-box",
          p: open ? 2 : 0,
          overflow: "hidden",
          transition: "width 0.3s ease",
          padding: "0 24px",
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        paddingTop="16px"
      >
        <Typography variant="h6">Filters</Typography>
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Button
        variant="contained"
        sx={{ borderRadius: "20px", mb: 2 }}
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
        sx={{ borderRadius: "20px", mb: 2 }}
        startIcon={<FilterListIcon />}
        onClick={() => setTermFilterOpen(true)}
      >
        Filter by Terms
      </Button>

      <TermFilter
        open={termFilterOpen}
        onClose={() => setTermFilterOpen(false)}
      />

      <SearchByName onSearch={handleSearch} />

      <Divider sx={{ my: 2 }} />

      <PriceRangeSlider />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          mb: 3,
        }}
      >
        <Button variant="outlined" onClick={() => clearAllFilters()}>
          Clear All
        </Button>
      </Box>
    </Drawer>
  );
};

export default FilterSidebar;
