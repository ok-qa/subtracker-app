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

const TermFilter = ({ open, onClose }) => {
  const { termFilter, setTermFilter, terms } = useSubscriptions();

  const clearAll = () => setTermFilter();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" autoFocus>
      <DialogTitle>
        <Typography variant="h5" component="span">
          Filter by Terms
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
          {terms.map((term) => (
            <ListItem disablePadding key={term.name}>
              <ListItemButton onClick={() => setTermFilter(term.name)} dense>
                <ListItemIcon>
                  {/* TODO: Change checkbox to radiobutton */}
                  <Checkbox
                    edge="start"
                    checked={termFilter === term.name}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={term.name} />
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

export default TermFilter;
