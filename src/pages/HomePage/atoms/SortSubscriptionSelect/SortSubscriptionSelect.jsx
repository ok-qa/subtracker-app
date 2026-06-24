import {
  Box,
  Button,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { sortOptions } from "../../../../constants";
import { useSubscriptions } from "../../../../context/SubscriptionContext";
import styles from "./SortSubscriptionSelect.module.css";
import { Check, ExpandMore } from "@mui/icons-material";
import { useState } from "react";

const SortSubscriptionSelect = () => {
  const { sortOption, setSortOption } = useSubscriptions();
  const [anchor, setAnchor] = useState();

  return (
    <Box>
      <Button
        onClick={(e) => setAnchor(e.currentTarget)}
        endIcon={<ExpandMore sx={{}} />}
        sx={(theme) => ({
          borderRadius: "20px",
          backgroundColor:
            theme.palette.mode === "dark" ? "#0F172A" : "#F5F7FB",
          border: "1px solid",
          borderColor: "#64748B",
          "&:hover": {
            borderColor: "#4F46E5",
          },
          "&:focus": { outline: "none" },
          "&.Mui-focusVisible": {
            outline: "none",
          },
          color: "#64748B",
          fontWeight: 600,
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseLine",
          }}
        >
          <Typography sx={{ fontSize: "small", fontWeight: 600 }}>
            Sort by:
          </Typography>
          <strong className={styles.selectOption}>
            {sortOptions.find((option) => option.value === sortOption).name}
          </strong>
        </Box>
      </Button>

      <Menu
        anchorEl={anchor}
        open={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: { pl: 1.5, pr: 1.5 } } }}
      >
        <ListSubheader
          sx={{
            textTransform: "uppercase",
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          Sort by
        </ListSubheader>
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === sortOption}
            onClick={() => {
              setSortOption(option.value);
              setAnchor(null);
            }}
            sx={{
              borderRadius: 1,
              "&:focus": {
                color: "#6566ef",
              },
            }}
          >
            <ListItemText primary={option.name} />
            {option.value === sortOption && <Check fontSize="small" />}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default SortSubscriptionSelect;
