import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSubscriptions } from "../../../../assets/context/SubscriptionContext";

const SubscriptionList = () => {
  const { subscriptions, deleteSubscription } = useSubscriptions();

  const navigate = useNavigate();

  if (subscriptions.length === 0) {
    return (
      <Typography variant="h6" align="center">
        No subscriptions found.
      </Typography>
    );
  }

  return (
    <Grid container spacing={2} sx={{ mt: 2, px: 2 }}>
      {subscriptions.map((sub) => (
        <Grid item xs={12} sm={6} md={4} key={sub.id}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {sub.name}
              </Typography>
              <Typography variant="body2">Category: {sub.category}</Typography>
              <Typography variant="body2">Price: ${sub.price}</Typography>
              <Typography variant="body2">Term: {sub.term}</Typography>
              <Typography variant="body2">Ends: {sub.endDate}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate(`/edit/${sub.id}`)}>
                Edit
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() => deleteSubscription(sub.id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SubscriptionList;
