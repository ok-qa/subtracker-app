import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import { useSubscriptions } from "../../../../context/SubscriptionContext";
import { format } from "date-fns";

const SubscriptionList = () => {
  const { subscriptions, deleteSubscription, totalPages, page, setPage } =
    useSubscriptions();

  const navigate = useNavigate();

  if (subscriptions.length === 0) {
    return (
      <Typography variant="h6" align="center">
        No subscriptions found.
      </Typography>
    );
  }

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 2, px: 2 }}>
        {subscriptions.map((subscription) => {
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={subscription._id}>
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
                    Category: {subscription.category?.name}
                  </Typography>
                  <Typography variant="body2">
                    Price: ${subscription.price}
                  </Typography>
                  <Typography variant="body2">
                    Term: {subscription.term?.name}
                  </Typography>
                  <Typography variant="body2">
                    Ends: {format(new Date(subscription.endDate), "MM/dd/yyyy")}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => navigate(`/edit/${subscription._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => deleteSubscription(subscription._id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </>
  );
};

export default SubscriptionList;
