import { Slider, Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSubscriptions } from "../../../../context/SubscriptionContext";

const PriceRangeSlider = () => {
  const {
    priceSlider: { sliderValue, debouncedSliderValue },
    setPriceSlider,
    handleSlider,
  } = useSubscriptions();

  const handleChange = (event, newValue) => {
    setPriceSlider({ sliderValue: newValue, debouncedSliderValue });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPriceSlider({ sliderValue, debouncedSliderValue: sliderValue });
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [sliderValue, setPriceSlider]);

  useEffect(() => {
    if (handleSlider) {
      handleSlider(debouncedSliderValue);
    }
  }, [debouncedSliderValue, handleSlider]);

  const formatPrice = (val) => `$${val}`;

  return (
    <Box sx={{ width: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          gutterBottom
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
          Price:{" "}
        </Typography>
        <Typography
          gutterBottom
          variant="subtitle1"
          sx={(theme) => ({
            mb: 1,
            mt: 3,
            color: theme.palette.mode === "dark" ? "#64748B" : "#0F172A",
            fontWeight: 700,
            fontSize: "0.9rem",
            textTransform: "uppercase",
          })}
        >
          ${sliderValue[0]} - ${sliderValue[1]}
        </Typography>
      </Box>

      <Slider
        value={sliderValue}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={formatPrice}
        min={0}
        max={1500}
        step={5}
        disableSwap
        sx={{
          height: 8,
          "& .MuiSlider-rail": {
            bgcolor: "#64748b3b",
            border: "1px solid",
            borderColor: "#64748B",
            opacity: 0.5,
          },
          "& .MuiSlider-thumb": {
            height: 17,
            width: 17,
          },
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          gutterBottom
          variant="subtitle1"
          sx={{
            mb: 1,
            color: "#64748B",
            fontWeight: 700,
            fontSize: "0.9rem",
            textTransform: "uppercase",
          }}
        >
          $0
        </Typography>
        <Typography
          gutterBottom
          variant="subtitle1"
          sx={{
            mb: 1,
            color: "#64748B",
            fontWeight: 700,
            fontSize: "0.9rem",
            textTransform: "uppercase",
          }}
        >
          $1500
        </Typography>
      </Box>
    </Box>
  );
};

export default PriceRangeSlider;
