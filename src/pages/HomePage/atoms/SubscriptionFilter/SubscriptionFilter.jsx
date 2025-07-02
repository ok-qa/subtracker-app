
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
} from '@mui/material';
import { categories } from '../../../../assets/constants/categories';
import { useSubscriptions } from '../../../../assets/context/SubscriptionContext';

const drawerWidth = 250;

const CategoryFilter = () => {
  const { categoryFilters, setCategoryFilters } = useSubscriptions();

  const toggleCategory = (cat) => {
    setCategoryFilters((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const clearAll = () => setCategoryFilters([]);

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Categories
        </Typography>
        <List>
          {categories.map((cat) => (
            <ListItem key={cat} button onClick={() => toggleCategory(cat)} dense>
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
        <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={clearAll}>
          Clear All
        </Button>
      </Box>
    </Drawer>
  );
};


export default CategoryFilter;