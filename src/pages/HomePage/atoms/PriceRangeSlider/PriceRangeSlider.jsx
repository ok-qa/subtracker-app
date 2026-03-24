import { Slider, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const PriceRangeSlider = ({ handleSlider }) => {
  const [value, setValue] = useState([0, 1500]);
  const [debouncedValue, setDebouncedValue] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);

  useEffect(() => {
    if (handleSlider) {
      handleSlider(debouncedValue);
    }
  }, [debouncedValue, handleSlider]);

  const formatPrice = (val) => `$${val}`;

  return (
    <Box sx={{ width: 300 }}>
      <Typography gutterBottom>
        Price: ${value[0]} - ${value[1]}
      </Typography>
      <Slider
        value={value}
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
