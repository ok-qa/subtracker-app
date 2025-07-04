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
import { categories } from "../../../../assets/constants/categories";
import { useSubscriptions } from "../../../../assets/context/SubscriptionContext";

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

    // <Drawer anchor="right" open={open}>
    //   <Box sx={{ width: 260, p: 2 }} role="presentation">
    //     <IconButton
    //       aria-label="close"
    //       onClick={onClose}
    //       sx={{
    //         position: "absolute",
    //         right: 8,
    //         top: 8,
    //       }}
    //     >
    //       <CloseIcon />
    //     </IconButton>
    //     <Typography variant="h6" mb={1}>
    //       Filter by Category
    //     </Typography>
    //     <List>
    //       {categories.map((cat) => (
    //         <ListItem
    //           key={cat}
    //           button
    //           onClick={() => toggleCategory(cat)}
    //           dense
    //         >
    //           <ListItemIcon>
    //             <Checkbox
    //               edge="start"
    //               checked={categoryFilters.includes(cat)}
    //               tabIndex={-1}
    //               disableRipple
    //               inputProps={{
    //                 "aria-labelledby": `checkbox-list-label-${cat}`,
    //               }}
    //             />
    //           </ListItemIcon>
    //           <ListItemText id={`checkbox-list-label-${cat}`} primary={cat} />
    //         </ListItem>
    //       ))}
    //     </List>

    //     <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={clearAll}>
    //       Clear All
    //     </Button>
    //   </Box>
    // </Drawer>
  );
};

export default CategoryFilter;
