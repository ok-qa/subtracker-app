import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Chip from "@mui/material/Chip";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import { useSubscriptions } from "../../../../context/SubscriptionContext";
import AddSubscriptionBtn from "../../../../components/AddSubscriptionBtn/AddSubscriptionBtn";

const SubscriptionGrid = () => {
  const {
    subscriptions,
    deleteSubscription,
    pagination: { page, totalPages, totalItems },
    setPagination,
  } = useSubscriptions();

  const navigate = useNavigate();

  if (subscriptions.length === 0) {
    return (
      <Box
        sx={(theme) => ({
          bgcolor: theme.palette.mode === "dark" ? "#0F172A" : "#FFFFFF",
          color: theme.palette.mode === "dark" ? "#64748B" : "#0F172A",
          borderRadius: 1,
          border: "dashed, 1px",
          borderColor: "#F5F7FB",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          py: 6,
        })}
      >
        <Typography variant="h6" align="center" sx={{ fontWeight: 700 }}>
          No subscriptions yet
        </Typography>
        <Box sx={{ width: "50%", mt: 1, mb: 3 }}>
          <Typography variant="subtle" align="center">
            Add your first subscription and we'll keep track of renewals,
            totals, and upcoming charges for you.
          </Typography>
        </Box>
        <AddSubscriptionBtn />
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {subscriptions.map((subscription) => {
          const renewalDate = new Date(subscription.endDate);
          const formattedRenewalDate = renewalDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });

          const getDaysUntilRenewal = (date) => {
            const today = new Date();

            today.setHours(0, 0, 0, 0);
            const renewal = new Date(date);
            renewal.setHours(0, 0, 0, 0);

            return Math.ceil((renewal - today) / (1000 * 60 * 60 * 24));
          };

          const daysUntilRenewal = getDaysUntilRenewal(subscription.endDate);

          const renewalChip =
            daysUntilRenewal < 0
              ? {
                  text: "Expired",
                  color: "#EF4444",
                  bg: "rgba(239, 68, 68, 0.12)",
                }
              : daysUntilRenewal <= 7
                ? {
                    text:
                      daysUntilRenewal === 0
                        ? "Renews today"
                        : daysUntilRenewal === 1
                          ? "Renews tomorrow"
                          : `${daysUntilRenewal} days left`,
                    color: "#F59E0B",
                    bg: "rgba(245, 158, 11, 0.12)",
                  }
                : {
                    text: `${daysUntilRenewal} days left`,
                    color: "#10B981",
                    bg: "rgba(16, 185, 129, 0.12)",
                  };

          return (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={subscription._id}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {subscription.name}
                  </Typography>
                  <Chip
                    label={subscription.category?.name}
                    size="small"
                    variant="outlined"
                    sx={(theme) => ({
                      mb: 2,
                      fontWeight: 600,
                      color: "#64748B",

                      backgroundColor:
                        theme.palette.mode === "dark" ? "#0F172A" : "#F5F7FB",

                      borderColor: "#64748B",
                    })}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h4" fontWeight={700}>
                      ${subscription.price}
                    </Typography>
                    <Typography
                      variant="body"
                      fontWeight={600}
                      color={"text.secondary"}
                      sx={{ ml: 0.5, mb: 0.5 }}
                    >
                      / {subscription.term?.name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      mt: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      Next renewal
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {formattedRenewalDate}
                    </Typography>
                  </Box>

                  <Chip
                    size="small"
                    icon={<FiberManualRecordIcon />}
                    label={renewalChip.text}
                    sx={{
                      mt: 2,
                      color: renewalChip.color,
                      backgroundColor: renewalChip.bg,
                      fontWeight: 600,
                      "& .MuiChip-icon": {
                        fontSize: 12,
                        color: renewalChip.color,
                      },
                    }}
                  />
                </CardContent>
                <Divider sx={{ mx: 2, borderBottomWidth: 2 }}></Divider>
                <CardActions
                  sx={{
                    justifyContent: "flex-start",
                    p: 3,
                    py: 2,
                    gap: 1,
                  }}
                >
                  <Button
                    size="medium"
                    sx={(theme) => ({
                      color:
                        theme.palette.mode === "dark" ? "#FFFFFF" : "#0F172A",
                      "&:focus": { outline: "none" },
                      "&.Mui-focusVisible": {
                        outline: "none",
                        boxShadow: "none",
                      },
                    })}
                    startIcon={<EditOutlinedIcon />}
                    onClick={() => navigate(`/edit/${subscription._id}`)}
                  >
                    <Box
                      component="span"
                      sx={{
                        display: { xs: "none", sm: "inline" },
                        fontWeight: 700,
                      }}
                    >
                      Edit
                    </Box>
                  </Button>
                  <Button
                    size="medium"
                    sx={(theme) => ({
                      color:
                        theme.palette.mode === "dark" ? "#FFFFFF" : "#0F172A",
                      "&:focus": { outline: "none" },
                      "&.Mui-focusVisible": {
                        outline: "none",
                        boxShadow: "none",
                      },
                    })}
                    // color="error"
                    startIcon={<DeleteOutlineIcon />}
                    onClick={() => deleteSubscription(subscription._id)}
                  >
                    <Box
                      component="span"
                      sx={{
                        display: { xs: "none", sm: "inline" },
                        fontWeight: 700,
                      }}
                    >
                      Delete
                    </Box>
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
          onChange={(e, value) =>
            setPagination({ page: value, totalItems, totalPages })
          }
          color="primary"
        />
      </Box>
    </>
  );
};

export default SubscriptionGrid;
