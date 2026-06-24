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
          overflow: "hidden",
          transition: "width 0.3s ease",
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        paddingTop="16px"
        sx={{ px: 3 }}
      >
        <Typography variant="h6">Filters</Typography>
        <IconButton
          sx={{
            color: "#64748B",
            "&:focus": {
              outline: "none",
            },
            "&.Mui-focusVisible": {
              outline: "none",
            },
          }}
          onClick={() => setOpen(false)}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ py: 0, px: 3 }}>
        <SearchByName onSearch={handleSearch} />

        <CategoryFilter
          open={categoryFilterOpen}
          onClose={() => setCategoryFilterOpen(false)}
        />

        <TermFilter />

        <PriceRangeSlider />
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          mb: 3,
          px: 3,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => clearAllFilters()}
          sx={(theme) => ({
            py: 0.5,
            px: 2,
            fontWeight: 700,
            borderRadius: "20px",
            borderColor: "#64748B",

            color: theme.palette.mode === "dark" ? "#FFFFFF" : "#0F172A",

            backgroundColor:
              theme.palette.mode === "dark" ? "#0F172A" : "#FFFFFF",

            "&:focus": { outline: "none" },
            "&.Mui-focusVisible": {
              outline: "none",
            },

            "&:hover": {
              borderColor: "#4F46E5",
              "&:focus": {
                outline: "none",
              },

              backgroundColor:
                theme.palette.mode === "dark" ? "#1E293B" : "#E2E8F0",
            },
          })}
        >
          Clear All
        </Button>
      </Box>
    </Drawer>
  );
};

export default FilterSidebar;
