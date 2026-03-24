import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";

const SearchByName = ({ onSearch }) => {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  return (
    <TextField
      fullWidth
      label="Search by Name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      sx={{ mt: 3 }}
      //   error={!name}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setValue("");
                onSearch("");
              }}
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchByName;
