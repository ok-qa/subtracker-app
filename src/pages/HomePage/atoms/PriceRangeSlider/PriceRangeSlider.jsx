import { Slider, Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSubscriptions } from "../../../../context/SubscriptionContext";

const PriceRangeSlider = () => {
  const {
    sliderValue,
    setSliderValue,
    debouncedSliderValue,
    setDebouncedSliderValue,
    handleSlider,
  } = useSubscriptions();

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSliderValue(sliderValue);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [sliderValue, setDebouncedSliderValue]);

  useEffect(() => {
    if (handleSlider) {
      handleSlider(debouncedSliderValue);
    }
  }, [debouncedSliderValue, handleSlider]);

  const formatPrice = (val) => `$${val}`;

  return (
    <Box sx={{ width: "auto" }}>
      <Typography gutterBottom>
        Price: ${sliderValue[0]} - ${sliderValue[1]}
      </Typography>
      <Slider
        value={sliderValue}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={formatPrice}
        min={0}
        max={1500}
        step={5}
        disableSwap
      />
    </Box>
  );
};

export default PriceRangeSlider;
