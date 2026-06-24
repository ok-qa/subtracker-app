import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useSubscriptions } from "../../../../context/SubscriptionContext";

const SubscriptionSummary = () => {
  const {
    calculations: {
      monthlyCost,
      activeSubCount,
      subRenewingColor,
      upcomingRenewalNumber,
    },
  } = useSubscriptions();

  const getCurrentRenewalColor = () => {
    if (!upcomingRenewalNumber) {
      return "#10B981";
    } else if (subRenewingColor === "red") {
      return "#EF4444";
    }
    return "#F59E0B";
  };

  return (
    <Grid container spacing={3} sx={{ mt: 2, mb: 4, width: "100%" }}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card
          variant="outlined"
          elevation={0}
          sx={{
            width: "100%",
            height: { xs: "auto", sm: "100%" },
            minHeight: { xs: 120, sm: "100%" },
            flex: 1,
          }}
        >
          <CardContent sx={{ pb: 0, "&:last-child": { pb: 2 } }}>
            <Typography
              variant="subtitle"
              color="text.secondary"
              sx={{ textTransform: "uppercase", fontWeight: 700 }}
            >
              Monthly Cost
            </Typography>

            <Typography
              variant="h4"
              fontWeight={700}
              letterSpacing={-0.8}
              color="primary.main"
            >
              ${Number(monthlyCost || 0).toFixed(2)}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              ≈ ${(Number(monthlyCost || 0) * 12).toFixed(2)} / year
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card
          variant="outlined"
          elevation={0}
          sx={{
            width: "100%",
            height: { xs: "auto", sm: "100%" },
            minHeight: { xs: 120, sm: "100%" },
            flex: 1,
          }}
        >
          <CardContent sx={{ pb: 0, "&:last-child": { pb: 2 } }}>
            <Typography
              variant="subtitle"
              color="text.secondary"
              sx={{ textTransform: "uppercase", fontWeight: 700 }}
            >
              Subscriptions
            </Typography>

            <Typography variant="h4" fontWeight={700}>
              {activeSubCount}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Active services
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card
          variant="outlined"
          elevation={0}
          sx={{
            width: "100%",
            height: { xs: "auto", sm: "100%" },
            minHeight: { xs: 120, sm: "100%" },
            flex: 1,
          }}
        >
          <CardContent sx={{ pb: 0, "&:last-child": { pb: 2 } }}>
            <Typography
              variant="subtitle"
              color="text.secondary"
              sx={{ textTransform: "uppercase", fontWeight: 700 }}
            >
              Renewing This Week
            </Typography>

            <Typography
              variant="h4"
              fontWeight={600}
              letterSpacing={-0.8}
              color={getCurrentRenewalColor()}
            >
              {upcomingRenewalNumber}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Don't get charged by surprise
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SubscriptionSummary;
