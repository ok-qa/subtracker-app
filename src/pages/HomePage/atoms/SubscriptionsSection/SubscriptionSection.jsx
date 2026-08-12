import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
// import ViewListIcon from "@mui/icons-material/ViewList";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import SubscriptionList from "../SubscriptionList/SubscriptionList";
import SubscriptionGrid from "../SubscriptionGrid/SubscriptionGrid";
import SortSubscriptionSelect from "../SortSubscriptionSelect/SortSubscriptionSelect";
import SubscriptionSummary from "../SubscriptionSummary/SubscriptionSummary";
import { useSubscriptions } from "../../../../context/SubscriptionContext";

const SubViewType = { GRID: 0, LIST: 1 };

const SubscriptionSection = () => {
  const {
    subscriptions,
    pagination: { totalItems },
  } = useSubscriptions();

  const [viewType, setViewType] = useState(SubViewType.GRID);
  const isGrid = viewType === SubViewType.GRID;
  const hasSubscriptions = totalItems > 0;

  return (
    <Box sx={{ py: 4, px: 6, flex: 1 }}>
      <Typography
        fontSize={26}
        fontWeight="700"
        color="text.primary"
        letterSpacing={-0.8}
      >
        My Subscriptions
      </Typography>
      <Typography
        fontSize={15}
        color="#64748B"
      >{`${totalItems} subscriptions · 11 inactive`}</Typography>

      <SubscriptionSummary />

      <Box
        sx={{
          mt: 4,
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary" fontWeight={600}>
          Showing {subscriptions.length} subscriptions
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          <SortSubscriptionSelect />
          <Box
            sx={(theme) => ({
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              p: 0.5,
              bgcolor: theme.palette.mode === "dark" ? "#0F172A" : "#FFFFFF",
            })}
          >
            <Tooltip title="Card View">
              <IconButton
                size="small"
                onClick={() => setViewType(SubViewType.GRID)}
                sx={(theme) => ({
                  bgcolor: isGrid ? theme.palette.primary.main : "transparent",
                  color: isGrid ? "#FFFFFF" : "#64748B",
                  "&:focus": { outline: "none" },
                  "&:hover": {
                    ...(isGrid && { bgcolor: theme.palette.primary.main }),
                  },
                  "&.Mui-focusVisible": {
                    outline: "none",
                  },
                  p: 1,
                })}
              >
                <GridViewIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Row View">
              <IconButton
                size="small"
                disabled={!hasSubscriptions}
                onClick={() => setViewType(SubViewType.LIST)}
                sx={(theme) => ({
                  bgcolor: !isGrid ? theme.palette.primary.main : "transparent",
                  color: !isGrid ? "#FFFFFF" : "#64748B",
                  "&:focus": { outline: "none" },
                  "&:hover": {
                    ...(!isGrid && { bgcolor: theme.palette.primary.main }),
                  },
                  "&.Mui-focusVisible": {
                    outline: "none",
                  },
                  p: 1,
                })}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      {isGrid ? <SubscriptionGrid /> : <SubscriptionList />}
    </Box>
  );
};

export default SubscriptionSection;
