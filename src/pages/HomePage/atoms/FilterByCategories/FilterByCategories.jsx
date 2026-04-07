import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSubscriptions } from "../../../../context/SubscriptionContext";

const CategoryFilter = ({ open, onClose }) => {
  const { categoryFilters, setCategoryFilters, categories } =
    useSubscriptions();

  const toggleCategory = (filterId) => {
    setCategoryFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId],
    );
  };

  const clearAll = () => setCategoryFilters([]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" autoFocus>
      <DialogTitle>
        <Typography variant="h5" component="span">
          Filter by Categories
        </Typography>
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
            <ListItem disablePadding key={cat.filterId}>
              <ListItemButton
                onClick={() => toggleCategory(cat.filterId)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={categoryFilters.includes(cat.filterId)}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={cat.name} />
              </ListItemButton>
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
