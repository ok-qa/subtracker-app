import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useSubscriptions } from "../../../../context/SubscriptionContext";

export default function TermFilter() {
  const {
    terms: { termsData, termFilter },
    setTerms,
  } = useSubscriptions();

  const handleChange = (_, newValue) => {
    if (newValue !== null) {
      setTerms({
        termsData,
        termFilter: newValue,
      });
    }
  };

  return (
    <Box>
      <Typography
        variant="subtitle1"
        sx={{
          mb: 1,
          mt: 3,
          color: "#64748B",
          fontWeight: 700,
          fontSize: "0.9rem",
          textTransform: "uppercase",
        }}
      >
        Billing Term
      </Typography>
      <Box
        sx={{
          display: "grid",
          py: 0.5,
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          bgcolor: "background.default",
        }}
      >
        <ToggleButtonGroup
          value={termFilter}
          exclusive
          onChange={handleChange}
          fullWidth
          sx={{
            bgcolor: "background.default",
            borderRadius: 1,

            "& .MuiToggleButton-root": {
              flex: 1,
              border: "none",
              outline: "none",
              borderRadius: 1,
              fontWeight: 600,
              color: "text.secondary",
              textTransform: "capitalize",
            },

            "& .Mui-selected": {
              bgcolor: "background.paper",
              color: "text.primary",
            },
          }}
        >
          {!!termsData.length &&
            termsData.map((term) => (
              <ToggleButton value={term.name}>{term.name}</ToggleButton>
            ))}
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
}
