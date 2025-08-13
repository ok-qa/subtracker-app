import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { categories } from "../../../../constants/categories";
import { useSubscriptions } from "../../../../context/SubscriptionContext";

// import styles from "./SubscriptionFilter.module.css";

// const drawerWidth = 250;

const CategoryFilter = ({ open, onClose }) => {
  const { categoryFilters, setCategoryFilters } = useSubscriptions();

  const toggleCategory = (cat) => {
    setCategoryFilters((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const clearAll = () => setCategoryFilters([]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <Typography variant="h5">Filter by Categories</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <List>
          {categories.map((cat) => (
            <ListItem
              key={cat}
              button
              onClick={() => toggleCategory(cat)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={categoryFilters.includes(cat)}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={cat} />
            </ListItem>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
        <Button onClick={clearAll}>Clear All</Button>
        <Button onClick={onClose} variant="contained">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryFilter;
