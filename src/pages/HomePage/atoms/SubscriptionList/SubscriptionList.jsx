import { useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  Card,
  Chip,
  Pagination,
  Button,
  CardActions,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSubscriptions } from "../../../../context/SubscriptionContext";

const SubscriptionList = () => {
  const {
    subscriptions,
    deleteSubscription,
    pagination: { page, totalPages, totalItems },
    setPagination,
  } = useSubscriptions();
  const navigate = useNavigate();

  return (
    <>
      <List>
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
            <ListItem key={subscription._id} sx={{ px: 0 }}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  pl: 2,
                  pr: 0.5,
                  py: 2,
                }}
              >
                <Box flex={5}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    sx={{ lineHeight: 1.5 }}
                  >
                    {subscription.name}
                  </Typography>

                  <Chip
                    label={subscription.category?.name}
                    size="small"
                    variant="outlined"
                    sx={(theme) => ({
                      fontWeight: 600,
                      color: "#64748B",
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#0F172A" : "#F5F7FB",
                      borderColor: "#64748B",
                      mt: 0.5,
                    })}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flex: 3,
                    alignItems: "center",
                    // mb: 2,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={700}>
                    ${subscription.price}
                  </Typography>
                  <Typography
                    variant="body"
                    fontWeight={600}
                    color={"text.secondary"}
                    sx={{ ml: 0.5, lineHeight: 1.75 }}
                  >
                    / {subscription.term?.name}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flex: 3,
                    flexDirection: "column",
                    justifyContent: "space-between",
                    // alignItems: "center",
                    alignItems: "baseline",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                      alignContent: "center",
                      // mt: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      Renews&nbsp;&nbsp;
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {" " + formattedRenewalDate}
                    </Typography>
                  </Box>
                  <Box>
                    <Chip
                      size="small"
                      icon={<FiberManualRecordIcon />}
                      label={renewalChip.text}
                      sx={{
                        color: renewalChip.color,
                        backgroundColor: renewalChip.bg,
                        fontWeight: 600,
                        "& .MuiChip-icon": {
                          fontSize: 12,
                          color: renewalChip.color,
                        },
                      }}
                    />
                  </Box>
                </Box>

                <CardActions
                  sx={{
                    justifyContent: "flex-end",
                    flex: 1,
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
                      px: 0.5,
                      py: 0,
                      minWidth: 0,
                    })}
                    startIcon={<EditOutlinedIcon />}
                    onClick={() => navigate(`/edit/${subscription._id}`)}
                  ></Button>
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
                      px: 0.5,
                      py: 0,
                      minWidth: 0,
                    })}
                    startIcon={<DeleteOutlineIcon />}
                    onClick={() => deleteSubscription(subscription._id)}
                  ></Button>
                </CardActions>
              </Card>
            </ListItem>
          );
        })}
      </List>
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

export default SubscriptionList;
