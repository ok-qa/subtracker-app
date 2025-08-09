import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSubscriptions } from "../../../../context/SubscriptionContext";

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
      {subscriptions.map((subscription) => (
        <Grid item xs={12} sm={6} md={4} key={subscription.id}>
          <Card
            variant="outlined"
            sx={{
              height: 250,
              width: 250,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                {subscription.name}
              </Typography>
              <Typography variant="body2">
                Category: {subscription.category}
              </Typography>
              <Typography variant="body2">
                Price: ${subscription.price}
              </Typography>
              <Typography variant="body2">Term: {subscription.term}</Typography>
              <Typography variant="body2">
                Ends: {subscription.endDate}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => navigate(`/edit/${subscription.id}`)}
              >
                Edit
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() => deleteSubscription(subscription.id)}
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
